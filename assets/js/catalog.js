document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('[data-product-grid]');
    const countEl = document.querySelector('[data-product-count]');
    const filterContainer = document.querySelector('.produtos-sidebar');
    const searchInput = document.getElementById('catalog-search');
    const sortSelect = document.getElementById('sort-select');
    
    let allProducts = [];
    let currentSegment = 'casa';
    let currentCategory = '';
    let currentBrand = '';
    let searchQuery = '';

    // Modal logic removed

    // Add CSS for Tabs and Modal
    const style = document.createElement('style');
    style.innerHTML = `
        .segment-tabs { display: flex; gap: 10px; margin-bottom: 24px; border-bottom: 2px solid var(--color-border); padding-bottom: 10px; overflow-x: auto; }
        .segment-tab { background: none; border: none; font-size: 1.1rem; font-weight: 600; color: var(--color-text-muted); cursor: pointer; padding: 8px 16px; border-radius: 8px; transition: 0.3s; white-space: nowrap; }
        .segment-tab:hover { background: var(--color-gray-50); color: var(--color-secondary); }
        .segment-tab.active { background: var(--color-secondary); color: white; }
        
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 1; transition: opacity 0.3s; }
        .modal-overlay.hidden { opacity: 0; pointer-events: none; }
        .modal-content { background: white; border-radius: 12px; width: 90%; max-width: 900px; max-height: 90vh; overflow-y: auto; position: relative; padding: 32px; }
        .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 28px; cursor: pointer; color: var(--color-text-secondary); }
        .modal-body { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .modal-gallery img { width: 100%; height: auto; border-radius: 8px; object-fit: contain; max-height: 400px; }
        
        @media(max-width: 768px) {
            .modal-body { grid-template-columns: 1fr; }
        }
    `;
    document.head.appendChild(style);

    // Fetch products
    fetch('products_data.json')
        .then(res => {
            if (!res.ok) throw new Error('HTTP error ' + res.status);
            return res.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Data is not an array');
            allProducts = data;
            renderFilters();
            filterAndRender();
        })
        .catch(err => {
            console.error('Error loading products:', err);
            if (countEl) countEl.textContent = 'Erro ao carregar produtos.';
            if (grid) grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: red;">Não foi possível carregar o catálogo. Verifique sua conexão ou tente novamente.</p>';
        });

    // Category Pill Buttons logic
    const catButtons = document.querySelectorAll('.filter-cat-btn');
    catButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            catButtons.forEach(b => b.classList.remove('is-active', 'aria-pressed'));
            catButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
            
            // Add active to clicked
            e.currentTarget.classList.add('is-active');
            e.currentTarget.setAttribute('aria-pressed', 'true');
            
            // Update filter
            const filterVal = e.currentTarget.dataset.filterCategory;
            if (filterVal === 'all') {
                currentCategory = '';
            } else if (filterVal === 'pos-obra') {
                currentCategory = 'Pós-Obra'; // Ensure this matches JSON data
            } else if (filterVal === 'limpeza-geral') {
                currentCategory = 'Limpeza Geral';
            } else {
                currentCategory = filterVal;
            }
            
            // Update sidebar select to match (if it exists)
            const catSelect = document.getElementById('cat-select');
            if (catSelect) {
                // Try to find matching option
                const option = Array.from(catSelect.options).find(opt => opt.value.toLowerCase().includes(currentCategory.toLowerCase()));
                if (option) {
                    catSelect.value = option.value;
                    currentCategory = option.value; // Sync exact casing
                } else {
                    catSelect.value = "";
                }
            }
            
            filterAndRender();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            filterAndRender();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            filterAndRender();
        });
    }

    function renderFilters() {
        if (!filterContainer) return;
        
        const categories = [...new Set(allProducts.map(p => p.category))].filter(Boolean);
        const brands = [...new Set(allProducts.map(p => p.brand))].filter(Boolean);
        
        let html = '';
        
        if (categories.length > 0) {
            html += `
                <div class="filter-group">
                    <h3 class="filter-group__label">Categoria</h3>
                    <select id="cat-select" class="form-select" style="width:100%; padding: 8px;">
                        <option value="">Todas as categorias</option>
                        ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                </div>
            `;
        }
        
        if (brands.length > 0) {
            html += `
                <div class="filter-group" style="margin-top: 24px;">
                    <h3 class="filter-group__label">Marca</h3>
                    <select id="brand-select" class="form-select" style="width:100%; padding: 8px;">
                        <option value="">Todas as marcas</option>
                        ${brands.map(b => `<option value="${b}">${b}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        filterContainer.innerHTML = html;
        
        const catSelect = document.getElementById('cat-select');
        const brandSelect = document.getElementById('brand-select');
        
        if (catSelect) {
            catSelect.addEventListener('change', (e) => {
                currentCategory = e.target.value;
                filterAndRender();
            });
        }
        if (brandSelect) {
            brandSelect.addEventListener('change', (e) => {
                currentBrand = e.target.value;
                filterAndRender();
            });
        }
    }

    function filterAndRender() {
        if (!grid) return;
        
        let filtered = allProducts;
        
        if (currentCategory) {
            filtered = filtered.filter(p => p.category && p.category.toLowerCase().includes(currentCategory.toLowerCase()));
        }
        
        if (currentBrand) {
            filtered = filtered.filter(p => p.brand === currentBrand);
        }
        
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchQuery) || 
                p.description.toLowerCase().includes(searchQuery) ||
                (p.category && p.category.toLowerCase().includes(searchQuery)) ||
                (p.brand && p.brand.toLowerCase().includes(searchQuery))
            );
        }

        // Sorting
        if (sortSelect) {
            const sortVal = sortSelect.value;
            if (sortVal === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortVal === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sortVal === 'name-asc') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            }
        }

        if (countEl) {
            countEl.textContent = `${filtered.length} produtos encontrados`;
        }

        grid.innerHTML = '';
        
        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">Nenhum produto encontrado para estes filtros.</p>';
            return;
        }

        filtered.forEach(p => {
            const waText = encodeURIComponent(`Olá! Tenho interesse no produto ${p.name}, no valor de R$ ${p.price.toFixed(2).replace('.', ',')}. Gostaria de mais informações.`);
            const waUrl = `https://wa.me/5517981144002?text=${waText}`;
            
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-card__img">
                  <a href="/produto.html?id=${p.id}">
                    <img src="${p.image}" alt="${p.name}" width="400" height="400" loading="lazy">
                  </a>
                </div>
                <div class="product-card__body">
                  <span class="product-card__cat">${p.category || 'Geral'}</span>
                  <h3 class="product-card__name"><a href="/produto.html?id=${p.id}" style="text-decoration:none;color:inherit;">${p.name}</a></h3>
                  <p style="font-size:0.8rem; color:var(--color-text-muted); margin-top:-4px; margin-bottom:8px;">${p.brand || ''}</p>
                  <div class="product-card__price">
                    <span class="price-current">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div class="product-card__actions">
                    <a href="${waUrl}" target="_blank" class="btn-wa">Pedir no WhatsApp</a>
                    <a href="/produto.html?id=${p.id}" class="btn-detail">Ver</a>
                  </div>
                </div>
            `;
            grid.appendChild(card);
        });

    }
});
