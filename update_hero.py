import os
import re

def update_hero_section(filepath, new_section_start, h1_color_update, p_color_update):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We will just replace the specific sections manually to ensure correctness
    pass

# For categoria/limpeza-geral.html
with open('categoria/limpeza-geral.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    '<h1 style="font-family:var(--font-family-heading);font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.2;margin-bottom:var(--space-4);">Limpeza Geral</h1>',
    '<h1 style="font-family:var(--font-family-heading);font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.2;margin-bottom:var(--space-4);color:white;">Limpeza Geral</h1>'
)
with open('categoria/limpeza-geral.html', 'w', encoding='utf-8') as f:
    f.write(content)

# For categoria/pos-obra.html
with open('categoria/pos-obra.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    '<h1 style="font-family:var(--font-family-heading);font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.2;margin-bottom:var(--space-4);">Limpeza Pós Obra</h1>',
    '<h1 style="font-family:var(--font-family-heading);font-size:clamp(28px,4vw,44px);font-weight:700;line-height:1.2;margin-bottom:var(--space-4);color:white;">Limpeza Pós Obra</h1>'
)
with open('categoria/pos-obra.html', 'w', encoding='utf-8') as f:
    f.write(content)

# For locacao.html
with open('locacao.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    '<section class="hero-page fade-in">',
    '<section class="hero-page fade-in" style="background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-secondary-dark) 100%);padding:clamp(48px,8vw,80px) 0;color:#fff;">'
)
content = content.replace(
    '<p>Alugue equipamentos de alta performance e aumente a produtividade da sua equipe sem o custo de aquisição. Opções para todos os tamanhos de áreas.</p>',
    '<p style="color:rgba(255,255,255,0.9); font-size:1.1rem; max-width: 600px;">Alugue equipamentos de alta performance e aumente a produtividade da sua equipe sem o custo de aquisição. Opções para todos os tamanhos de áreas.</p>'
)
with open('locacao.html', 'w', encoding='utf-8') as f:
    f.write(content)

# For produtos.html
with open('produtos.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    '<section class="section" style="padding-bottom:0">',
    '<section class="section" style="background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-secondary-dark) 100%);padding:clamp(48px,8vw,80px) 0;color:#fff;">'
)
content = content.replace(
    '<h1 style="font-family:var(--font-family-heading);font-size:clamp(28px,4vw,40px);color:var(--color-secondary);margin-bottom:var(--space-4);">Catálogo de Produtos de Limpeza</h1>',
    '<h1 style="font-family:var(--font-family-heading);font-size:clamp(28px,4vw,40px);color:white;margin-bottom:var(--space-4);">Catálogo de Produtos de Limpeza</h1>'
)
content = content.replace(
    'color:var(--color-text-secondary);',
    'color:rgba(255,255,255,0.9);'
)
with open('produtos.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
