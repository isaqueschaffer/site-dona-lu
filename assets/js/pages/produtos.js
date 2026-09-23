/**
 * DONA LU — Filtros de Produto
 * Filtragem client-side por categoria, preço e marca
 * URL atualizada sem reload para deep-linking
 */

(function () {
  'use strict';

  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;

  let cards = Array.from(grid.querySelectorAll('[data-product-card]'));

  const filterCatBtns  = document.querySelectorAll('[data-filter-category]');
  const filterBrandChk = document.querySelectorAll('[data-filter-brand]');
  const priceMinRange  = document.querySelector('[data-filter-price-min]');
  const priceMaxRange  = document.querySelector('[data-filter-price-max]');
  const priceMinLabel  = document.querySelector('[data-price-min-val]');
  const priceMaxLabel  = document.querySelector('[data-price-max-val]');
  const clearBtn       = document.querySelector('[data-filter-clear]');
  const countLabel     = document.querySelector('[data-product-count]');
  const sortSelect     = document.querySelector('[data-filter-sort]');

  let state = { category: 'all', brands: [], priceMin: 0, priceMax: 9999 };

  function readFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('categoria')) state.category = params.get('categoria');
    if (params.get('preco_min')) state.priceMin = Number(params.get('preco_min'));
    if (params.get('preco_max')) state.priceMax = Number(params.get('preco_max'));
    if (params.get('marca'))     state.brands   = params.get('marca').split(',');
  }

  function writeToURL() {
    const params = new URLSearchParams();
    if (state.category !== 'all') params.set('categoria', state.category);
    if (state.priceMin > 0)        params.set('preco_min', state.priceMin);
    if (state.priceMax < 9999)     params.set('preco_max', state.priceMax);
    if (state.brands.length)       params.set('marca', state.brands.join(','));
    const newURL = params.toString() ? window.location.pathname + '?' + params : window.location.pathname;
    history.replaceState(null, '', newURL);
  }

  function applyFilters() {
    let visibleCount = 0;
    cards.forEach(function(card) {
      const cat   = card.dataset.category || '';
      const brand = card.dataset.brand    || '';
      const price = parseFloat(card.dataset.price || '0');
      const catMatch   = state.category === 'all' || cat === state.category;
      const brandMatch = state.brands.length === 0 || state.brands.indexOf(brand) !== -1;
      const priceMatch = price >= state.priceMin && price <= state.priceMax;
      const visible    = catMatch && brandMatch && priceMatch;
      card.style.display = visible ? '' : 'none';
      card.setAttribute('aria-hidden', visible ? 'false' : 'true');
      if (visible) visibleCount++;
    });
    if (countLabel) {
      countLabel.textContent = visibleCount + ' produto' + (visibleCount !== 1 ? 's' : '') + ' encontrado' + (visibleCount !== 1 ? 's' : '');
    }
    writeToURL();
    updateActiveUI();
  }

  function updateActiveUI() {
    filterCatBtns.forEach(function(btn) {
      btn.classList.toggle('is-active', btn.dataset.filterCategory === state.category);
      btn.setAttribute('aria-pressed', btn.dataset.filterCategory === state.category ? 'true' : 'false');
    });
    filterBrandChk.forEach(function(chk) { chk.checked = state.brands.indexOf(chk.value) !== -1; });
    if (priceMinRange) priceMinRange.value = state.priceMin;
    if (priceMaxRange) priceMaxRange.value = state.priceMax;
    if (priceMinLabel) priceMinLabel.textContent = 'R$ ' + state.priceMin;
    if (priceMaxLabel) priceMaxLabel.textContent = state.priceMax >= 9999 ? 'Sem limite' : 'R$ ' + state.priceMax;
  }

  filterCatBtns.forEach(function(btn) {
    btn.addEventListener('click', function() { state.category = btn.dataset.filterCategory; applyFilters(); });
  });

  filterBrandChk.forEach(function(chk) {
    chk.addEventListener('change', function() {
      if (chk.checked) { if (state.brands.indexOf(chk.value) === -1) state.brands.push(chk.value); }
      else { state.brands = state.brands.filter(function(b) { return b !== chk.value; }); }
      applyFilters();
    });
  });

  if (priceMinRange) priceMinRange.addEventListener('input', function() { state.priceMin = Number(priceMinRange.value); applyFilters(); });
  if (priceMaxRange) priceMaxRange.addEventListener('input', function() { state.priceMax = Number(priceMaxRange.value); applyFilters(); });

  if (clearBtn) clearBtn.addEventListener('click', function() { state = { category: 'all', brands: [], priceMin: 0, priceMax: 9999 }; applyFilters(); });

  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const val = sortSelect.value;
      cards.sort(function(a, b) {
        const pa = parseFloat(a.dataset.price || '0'), pb = parseFloat(b.dataset.price || '0');
        if (val === 'price-asc')  return pa - pb;
        if (val === 'price-desc') return pb - pa;
        if (val === 'name-asc')   return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        return 0;
      });
      cards.forEach(function(card) { grid.appendChild(card); });
    });
  }

  readFromURL();
  applyFilters();

})();
