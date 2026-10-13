/**
 * DONA LU — Header & Navigation Component
 * - Menu hambúrguer acessível (aria-expanded, fecha com Esc, clique fora ou em link).
 * - Header sticky: ganha a classe .is-scrolled após rolar (fundo branco + sombra).
 *   Na home (body.page-home) o header começa transparente sobre o carrossel.
 * - Rodapé: garante as colunas <details> abertas a partir de 768px
 *   (reforço para navegadores sem suporte a ::details-content; no mobile é acordeão sem JS).
 */

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    const header = document.querySelector(".header");

    // ---------- Estado "rolado" do header ----------
    if (header) {
        const SCROLL_THRESHOLD = 24;
        let ticking = false;

        const updateScrolled = () => {
            header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrolled);
                ticking = true;
            }
        }, { passive: true });

        updateScrolled();
    }

    // ---------- Rodapé: colunas abertas no tablet/desktop ----------
    const footerCols = document.querySelectorAll(".footer__col");
    if (footerCols.length && window.matchMedia) {
        const desktopMq = window.matchMedia("(min-width: 768px)");
        // No desktop o <summary> é inerte: fora da ordem de tabulação, anunciado como desabilitado
        // e o <details> não pode ser fechado (listener "toggle" reabre).
        const syncFooter = () => {
            const isDesktop = desktopMq.matches;
            footerCols.forEach((col) => {
                const summary = col.querySelector("summary");
                if (isDesktop) {
                    col.open = true;
                    if (summary) {
                        summary.setAttribute("tabindex", "-1");
                        summary.setAttribute("aria-disabled", "true");
                    }
                } else if (summary) {
                    summary.removeAttribute("tabindex");
                    summary.removeAttribute("aria-disabled");
                }
            });
        };
        footerCols.forEach((col) => {
            col.addEventListener("toggle", () => {
                if (desktopMq.matches && !col.open) col.open = true;
            });
        });
        syncFooter();
        if (desktopMq.addEventListener) {
            desktopMq.addEventListener("change", syncFooter);
        }
    }

    // ---------- Menu mobile ----------
    if (!toggle || !nav) return;

    const LABEL_OPEN = "Abrir menu de navegação";
    const LABEL_CLOSE = "Fechar menu de navegação";

    function openMenu() {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", LABEL_CLOSE);
        nav.classList.add("is-open");
        if (header) header.classList.add("menu-open");
    }

    function closeMenu() {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", LABEL_OPEN);
        nav.classList.remove("is-open");
        if (header) header.classList.remove("menu-open");
    }

    function toggleMenu() {
        if (nav.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fechar ao clicar em qualquer link de navegação
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener("click", (e) => {
        if (nav.classList.contains("is-open")) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // Fechar ao pressionar Esc e devolver o foco ao botão
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
            closeMenu();
            toggle.focus();
        }
    });

    // Fechar se a tela for redimensionada para desktop (> 991px)
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991 && nav.classList.contains("is-open")) {
            closeMenu();
        }
    });
});
