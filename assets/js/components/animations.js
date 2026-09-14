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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', initFadeIn);

})();
