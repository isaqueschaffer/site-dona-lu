#!/usr/bin/env python3
"""
DONA LU — injeta os partials globais (topbar, header, footer) em todas as páginas.

Os blocos ficam entre marcadores em cada HTML:

    <!-- partial:topbar --> ... <!-- /partial:topbar -->
    <!-- partial:header --> ... <!-- /partial:header -->
    <!-- partial:footer --> ... <!-- /partial:footer -->   (inclui o FAB do WhatsApp)

Fonte única: /partials/topbar.html, /partials/header.html, /partials/footer.html.
Edite os partials e rode:

    python tools/build_partials.py          # aplica em todas as páginas
    python tools/build_partials.py --check  # só verifica (exit 1 se algo estiver desatualizado)

Na primeira execução, se a página ainda não tiver marcadores, o script substitui o
markup antigo (<div class="topbar">, <header class="header">, <footer class="footer">
+ <a class="whatsapp-fab">) pelos marcadores. Páginas sem topbar/FAB ganham os blocos.

O link ativo do menu é marcado conforme o caminho da página:
  - página exata  -> class="nav__link is-active" aria-current="page"
  - seção (ex.: /produto/x.html dentro de Produtos) -> aria-current="true"
Nada fora dos marcadores (head, JSON-LD, <main>, scripts) é alterado.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIALS_DIR = ROOT / "partials"
PAGE_DIRS = ["", "blog", "categoria", "produto"]
PARTIAL_NAMES = ["topbar", "header", "footer"]


# ---------------------------------------------------------------------------
# Link ativo
# ---------------------------------------------------------------------------
def active_link(rel: str) -> tuple[str | None, str | None]:
    """Retorna (href do menu, valor de aria-current) para a página."""
    exact = {
        "index.html": "/index.html",
        "produtos.html": "/produtos.html",
        "locacao.html": "/locacao.html",
        "solucoes.html": "/solucoes.html",
        "empresa.html": "/empresa.html",
        "contato.html": "/contato.html",
        "blog/index.html": "/blog/index.html",
    }
    if rel in exact:
        return exact[rel], "page"
    if rel == "produto.html" or rel.startswith(("produto/", "categoria/")):
        return "/produtos.html", "true"
    if rel.startswith("blog/"):
        return "/blog/index.html", "true"
    return None, None  # privacidade, trocas etc.: nenhum item ativo


def mark_active(header_html: str, href: str | None, current: str | None) -> str:
    if not href:
        return header_html
    link = f'<a href="{href}" class="nav__link">'
    if link in header_html:
        return header_html.replace(
            link, f'<a href="{href}" class="nav__link is-active" aria-current="{current}">', 1
        )
    btn = f'<a href="{href}" class="nav__btn">'
    if btn in header_html:
        return header_html.replace(btn, f'<a href="{href}" class="nav__btn" aria-current="{current}">', 1)
    return header_html


# ---------------------------------------------------------------------------
# Localização do markup antigo (primeira execução)
# ---------------------------------------------------------------------------
def find_balanced_div(text: str, start: int) -> int:
    """Dado o índice de um '<div', retorna o índice logo após o '</div>' correspondente."""
    depth = 0
    for m in re.compile(r"<div\b|</div>", re.I).finditer(text, start):
        depth += 1 if m.group(0).lower().startswith("<div") else -1
        if depth == 0:
            return m.end()
    raise ValueError("div sem fechamento")


def legacy_span(text: str, name: str) -> tuple[int, int] | None:
    if name == "topbar":
        i = text.find('<div class="topbar">')
        return (i, find_balanced_div(text, i)) if i != -1 else None
    if name == "header":
        m = re.search(r'<header class="header"[^>]*>.*?</header>', text, re.S)
        return m.span() if m else None
    if name == "footer":
        m = re.search(r'<footer class="footer"[^>]*>.*?</footer>', text, re.S)
        if not m:
            return None
        end = m.end()
        fab = re.compile(
            r'(?:\s*<!-- WhatsApp FAB -->)?\s*<a [^>]*class="whatsapp-fab"[^>]*>.*?</a>', re.S
        ).match(text, end)
        if fab:
            end = fab.end()
        return m.start(), end
    return None


def marker_block(name: str, content: str) -> str:
    return f"<!-- partial:{name} -->\n{content.rstrip()}\n  <!-- /partial:{name} -->"


def inject(text: str, name: str, content: str) -> str:
    pattern = re.compile(
        rf"<!-- partial:{name} -->.*?<!-- /partial:{name} -->", re.S
    )
    block = marker_block(name, content)
    if pattern.search(text):
        return pattern.sub(lambda _m: block, text, count=1)

    span = legacy_span(text, name)
    if span:
        start, end = span
        return text[:start] + block + text[end:]

    # Página sem o bloco: insere em posição canônica
    if name == "topbar":
        anchor = text.find("<!-- partial:header -->")
        if anchor == -1:
            anchor = text.find('<header class="header"')
        if anchor == -1:
            raise ValueError("header não encontrado para posicionar a topbar")
        return text[:anchor] + block + "\n\n  " + text[anchor:]
    if name == "footer":
        anchor = text.rfind("</main>")
        if anchor == -1:
            raise ValueError("</main> não encontrado para posicionar o footer")
        anchor += len("</main>")
        return text[:anchor] + "\n\n  " + block + text[anchor:]
    raise ValueError(f"bloco '{name}' não encontrado")


# ---------------------------------------------------------------------------
def pages() -> list[Path]:
    found: list[Path] = []
    for d in PAGE_DIRS:
        folder = ROOT / d if d else ROOT
        found.extend(sorted(folder.glob("*.html")))
    return found


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")  # console do Windows (cp1252)
    check_only = "--check" in sys.argv
    partials = {
        n: (PARTIALS_DIR / f"{n}.html").read_text(encoding="utf-8") for n in PARTIAL_NAMES
    }
    changed: list[str] = []

    for path in pages():
        rel = path.relative_to(ROOT).as_posix()
        with path.open(encoding="utf-8", newline="") as fh:
            original = fh.read()

        href, current = active_link(rel)
        text = original
        for name in PARTIAL_NAMES:
            content = partials[name]
            if name == "header":
                content = mark_active(content, href, current)
            text = inject(text, name, content)

        # Sanidade: um único header/footer/FAB por página
        for needle in ('<header class="header"', '<footer class="footer"', 'class="whatsapp-fab"'):
            count = text.count(needle)
            if count != 1:
                raise SystemExit(f"[erro] {rel}: '{needle}' aparece {count}x")

        if text != original:
            changed.append(rel)
            if not check_only:
                with path.open("w", encoding="utf-8", newline="") as fh:
                    fh.write(text)

    label = "desatualizadas" if check_only else "atualizadas"
    print(f"{len(pages())} páginas verificadas; {len(changed)} {label}.")
    for rel in changed:
        print(f"  - {rel}")
    return 1 if (check_only and changed) else 0


if __name__ == "__main__":
    sys.exit(main())
