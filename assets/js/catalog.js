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

    // Create segment tabs
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'segment-tabs';
    tabsContainer.innerHTML = `
        <button class="segment-tab active" data-segment="casa">Para Casa</button>
        <button class="segment-tab" data-segment="empresa">Para Empresa</button>
        <button class="segment-tab" data-segment="voce">Para Você</button>
    `;
    
    // Insert tabs before the toolbar
    const toolbar = document.querySelector('.produtos-toolbar');
    if (toolbar) {
        toolbar.parentNode.insertBefore(tabsContainer, toolbar);
    }

    // Modal structure
    const modalHTML = `
    <div id="product-modal" class="modal-overlay hidden">
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-gallery">
                    <img id="modal-img" src="" alt="">
                </div>
                <div class="modal-info">
                    <span id="modal-cat" class="product-card__cat"></span>
                    <h2 id="modal-title"></h2>
                    <p id="modal-brand" style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1rem;"></p>
                    <div id="modal-price" class="product-card__price"></div>
                    <p id="modal-desc" style="margin-bottom: 1rem; line-height: 1.6; color: var(--color-text-secondary);"></p>
                    <div class="modal-actions">
                        <a id="modal-wa" href="#" class="btn-wa" target="_blank" style="display:inline-block; padding: 12px 24px;">Pedir no WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.modal-close');

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

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
    fetch('/products_data.json')
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            renderFilters();
            filterAndRender();
        })
        .catch(err => console.error('Error loading products:', err));

    // Listeners
    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('segment-tab')) {
            document.querySelectorAll('.segment-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentSegment = e.target.dataset.segment;
            currentCategory = '';
            currentBrand = '';
            renderFilters();
            filterAndRender();
        }
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
        
        const segmentProducts = allProducts.filter(p => p.segment === currentSegment);
        
        // Extract unique categories and brands
        const categories = [...new Set(segmentProducts.map(p => p.category))].filter(Boolean);
        const brands = [...new Set(segmentProducts.map(p => p.brand))].filter(Boolean);
        
        let html = '';
        
        if (categories.length > 0) {
            html += \`
                <div class="filter-group">
                    <h3 class="filter-group__label">Categoria</h3>
                    <select id="cat-select" class="form-select" style="width:100%; padding: 8px;">
                        <option value="">Todas as categorias</option>
                        \${categories.map(c => \`<option value="\${c}">\${c}</option>\`).join('')}
                    </select>
                </div>
            \`;
        }
        
        if (brands.length > 0) {
            html += \`
                <div class="filter-group" style="margin-top: 24px;">
                    <h3 class="filter-group__label">Marca</h3>
                    <select id="brand-select" class="form-select" style="width:100%; padding: 8px;">
                        <option value="">Todas as marcas</option>
                        \${brands.map(b => \`<option value="\${b}">\${b}</option>\`).join('')}
                    </select>
                </div>
            \`;
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
        
        let filtered = allProducts.filter(p => p.segment === currentSegment);
        
        if (currentCategory) {
            filtered = filtered.filter(p => p.category === currentCategory);
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
            countEl.textContent = \`\${filtered.length} produtos encontrados\`;
        }

        grid.innerHTML = '';
        
        if (filtered.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">Nenhum produto encontrado para estes filtros.</p>';
            return;
        }

        filtered.forEach(p => {
            const waText = encodeURIComponent(\`Olá! Tenho interesse no produto \${p.name}, no valor de R$ \${p.price.toFixed(2).replace('.', ',')}. Gostaria de mais informações.\`);
            const waUrl = \`https://wa.me/5517981144002?text=\${waText}\`;
            
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = \`
                <div class="product-card__img">
                  <a href="#" class="open-modal" data-id="\${p.id}">
                    <img src="\${p.image}" alt="\${p.name}" width="400" height="400" loading="lazy">
                  </a>
                </div>
                <div class="product-card__body">
                  <span class="product-card__cat">\${p.category || 'Geral'}</span>
                  <h3 class="product-card__name"><a href="#" class="open-modal" data-id="\${p.id}" style="text-decoration:none;color:inherit;">\${p.name}</a></h3>
                  <p style="font-size:0.8rem; color:var(--color-text-muted); margin-top:-4px; margin-bottom:8px;">\${p.brand || ''}</p>
                  <div class="product-card__price">
                    <span class="price-current">R$ \${p.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div class="product-card__actions">
                    <a href="\${waUrl}" target="_blank" class="btn-wa">Pedir no WhatsApp</a>
                    <a href="#" class="btn-detail open-modal" data-id="\${p.id}">Ver</a>
                  </div>
                </div>
            \`;
            grid.appendChild(card);
        });

        // Add modal listeners
        document.querySelectorAll('.open-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.currentTarget.dataset.id;
                const prod = allProducts.find(x => x.id === id);
                if (prod) openModal(prod);
            });
        });
    }

    function openModal(prod) {
        document.getElementById('modal-img').src = prod.image;
        document.getElementById('modal-title').textContent = prod.name;
        document.getElementById('modal-cat').textContent = prod.category || 'Geral';
        document.getElementById('modal-brand').textContent = prod.brand ? \`Marca: \${prod.brand}\` : '';
        document.getElementById('modal-price').textContent = \`R$ \${prod.price.toFixed(2).replace('.', ',')}\`;
        document.getElementById('modal-desc').innerHTML = prod.description || 'Descrição não disponível no momento.';
        
        const waText = encodeURIComponent(\`Olá! Tenho interesse no produto \${prod.name}, no valor de R$ \${prod.price.toFixed(2).replace('.', ',')}. Gostaria de mais informações.\`);
        document.getElementById('modal-wa').href = \`https://wa.me/5517981144002?text=\${waText}\`;
        
        modal.classList.remove('hidden');
    }
});
