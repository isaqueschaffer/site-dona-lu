document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featured-products-grid');
    if (!featuredGrid) return;

    fetch('/products_data.json')
        .then(res => res.json())
        .then(data => {
            // Pick 4 featured products (we can use known IDs or pick randomly, let's use exact ones to keep it consistent but allow up to 4)
            const featuredIds = ['prod_28', 'prod_32', 'prod_1', 'prod_10'];
            
            // Fallback to first 4 products if those IDs don't exist
            let featuredProducts = data.filter(p => featuredIds.includes(p.id));
            if (featuredProducts.length < 4) {
                const missing = 4 - featuredProducts.length;
                const otherProducts = data.filter(p => !featuredIds.includes(p.id)).slice(0, missing);
                featuredProducts = featuredProducts.concat(otherProducts);
            }
            
            // Limit to exactly 4
            featuredProducts = featuredProducts.slice(0, 4);
            
            renderFeatured(featuredProducts);
        })
        .catch(err => {
            console.error('Error fetching featured products:', err);
            featuredGrid.innerHTML = '<p style="text-align:center;width:100%;color:red;">Erro ao carregar produtos em destaque.</p>';
        });

    function renderFeatured(products) {
        let html = '';
        products.forEach((p, index) => {
            const waText = encodeURIComponent(`Olá! Tenho interesse no produto ${p.name}, no valor de R$ ${p.price.toFixed(2).replace('.', ',')}. Gostaria de mais informações.`);
            const waUrl = `https://wa.me/5517981144002?text=${waText}`;
            
            let badgesHTML = '';
            if (index === 0) badgesHTML = '<span class="badge badge-new">Novo</span>';
            if (index === 1) badgesHTML = '<span class="badge badge-hit">Mais Vendido</span>';
            if (index === 2) badgesHTML = '<span class="badge badge-sale">Promoção</span>';

            html += `
            <article class="product-card" itemscope itemtype="https://schema.org/Product">
              <div class="product-card__img">
                <div class="product-card__badges">
                  ${badgesHTML}
                </div>
                <a href="/produto.html?id=${p.id}">
                  <img src="${p.image}" alt="${p.name}" width="400" height="400" loading="lazy" decoding="async" itemprop="image">
                </a>
              </div>
              <div class="product-card__body">
                <span class="product-card__cat" itemprop="category">${p.category || 'Geral'}</span>
                <h3 class="product-card__name" itemprop="name">
                  <a href="/produto.html?id=${p.id}" style="text-decoration:none;color:inherit;">${p.name}</a>
                </h3>
                <div class="product-card__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                  <meta itemprop="priceCurrency" content="BRL">
                  <meta itemprop="availability" content="https://schema.org/InStock">
                  <span class="price-current" itemprop="price" content="${p.price.toFixed(2)}">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="product-card__actions">
                  <a href="${waUrl}" target="_blank" class="btn-wa">Pedir via WhatsApp</a>
                  <a href="/produto.html?id=${p.id}" class="btn-detail">Ver</a>
                </div>
              </div>
            </article>
            `;
        });
        featuredGrid.innerHTML = html;
        
        // Adjust grid for 4 items if needed
        featuredGrid.style.display = 'grid';
        featuredGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
        featuredGrid.style.gap = '24px';
    }
});
