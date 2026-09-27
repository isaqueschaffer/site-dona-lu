/**
 * DONA LU — Animations Component JS
 *
 * Micro-animações via IntersectionObserver.
 * Fade-in suave de elementos quando entram na viewport.
 * Respeita prefers-reduced-motion.
 */

(function () {
  'use strict';

  /**
   * Verifica se o usuário prefere menos movimento.
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Inicializa o IntersectionObserver para elementos .fade-in.
   */
  function initFadeIn() {
    // Adiciona fade-in dinamicamente a elementos principais se ainda não tiverem
    const elementsToAnimate = document.querySelectorAll(
      '.product-card, .section-title, .category-card, .blog-card, .footer__col, .features__item, .hero-carousel__content h2, .hero-carousel__content p, .cta-banner'
    );
    elementsToAnimate.forEach(function(el) {
      if (!el.classList.contains('fade-in')) {
        el.classList.add('fade-in');
      }
    });

    if (prefersReducedMotion()) {
      // Torna todos visíveis imediatamente sem animação
      document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores sem suporte
      document.querySelectorAll('.fade-in').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target); // Executa apenas uma vez
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', initFadeIn);

})();
