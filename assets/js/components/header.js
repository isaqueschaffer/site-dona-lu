/**
 * DONA LU — Header & Navigation Component
 * Suporte a menu hambúrguer responsivo para tablets e celulares.
 * Acessível, fechamento ao clicar fora, em links ou pressionar ESC.
 */

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    const header = document.querySelector(".header");

    if (!toggle || !nav) return;

    function openMenu() {
        toggle.setAttribute("aria-expanded", "true");
        nav.classList.add("is-open");
        if (header) header.classList.add("menu-open");
    }

    function closeMenu() {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        if (header) header.classList.remove("menu-open");
    }

    // Gerenciamento de rolagem para o cabeçalho sobreposto (Home):
    // Some suavemente ao rolar para baixo e só volta ao retornar ao topo (banner)
    if (header) {
        function handleScroll() {
            const isHome = document.body.classList.contains("page-home") || 
                           window.location.pathname === "/" || 
                           window.location.pathname.endsWith("/index.html");

            if (isHome) {
                if (window.scrollY > 40) {
                    header.classList.add("is-hidden");
                    if (nav && nav.classList.contains("is-open")) {
                        closeMenu();
                    }
                } else {
                    header.classList.remove("is-hidden");
                }
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
    }

    function toggleMenu() {
        const isOpen = nav.classList.contains("is-open");
        if (isOpen) {
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

    // Fechar ao clicar fora do cabeçalho
    document.addEventListener("click", (e) => {
        if (nav.classList.contains("is-open")) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // Fechar ao pressionar a tecla ESC
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
