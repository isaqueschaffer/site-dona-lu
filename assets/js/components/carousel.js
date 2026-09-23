/**
 * DONA LU — Hero Carousel
 * Máx. 3 slides | Autoplay mínimo 6s | Pause no hover e focus
 * Sem CLS: dimensões definidas no CSS via aspect-ratio
 * Acessível: aria-live, aria-label, teclado completo
 */

(function () {
  'use strict';

  const AUTOPLAY_DELAY = 7000; // mínimo 6s — usando 7s por segurança
  const TRANSITION_MS  = 500;

  function initCarousel(carousel) {
    const track   = carousel.querySelector('[data-carousel-track]');
    const slides  = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');

    if (!track || slides.length === 0) return;

    let current   = 0;
    let timer     = null;
    let isHovered = false;
    let dots      = [];

    /* ---- Criar dots ---- */
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel__dot';
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    function updateDots() {
      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
        d.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    }

    function goTo(index, skipTransition) {
      slides[current].classList.remove('is-active');
      slides[current].setAttribute('aria-hidden', 'true');

      current = (index + slides.length) % slides.length;

      slides[current].classList.add('is-active');
      slides[current].setAttribute('aria-hidden', 'false');
      track.style.transform = `translateX(-${current * 100}%)`;

      updateDots();

      // Lazy load next slide image
      const nextIndex = (current + 1) % slides.length;
      const lazyImg = slides[nextIndex].querySelector('img[loading="lazy"]');
      if (lazyImg && lazyImg.dataset.src) {
        lazyImg.src = lazyImg.dataset.src;
        delete lazyImg.dataset.src;
      }
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!isHovered) next();
      }, AUTOPLAY_DELAY);
    }

    function stopTimer() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    /* ---- Inicializar ---- */
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
      if (i === 0) slide.classList.add('is-active');
    });
    updateDots();

    /* ---- Controles ---- */
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });

    /* ---- Teclado ---- */
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { prev(); startTimer(); }
      if (e.key === 'ArrowRight') { next(); startTimer(); }
    });

    /* ---- Pause no hover/focus ---- */
    carousel.addEventListener('mouseenter', () => { isHovered = true; });
    carousel.addEventListener('mouseleave', () => { isHovered = false; });
    carousel.addEventListener('focusin',    () => { isHovered = true; });
    carousel.addEventListener('focusout',   () => { isHovered = false; });

    /* ---- Swipe touch ---- */
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startTimer(); }
    }, { passive: true });

    /* ---- Autoplay ---- */
    startTimer();

    /* ---- Pause se página não visível (Page Visibility API) ---- */
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stopTimer() : startTimer();
    });
  }

  /* Inicializar todos os carrosséis na página */
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);

})();
