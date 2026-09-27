document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('product-container').innerHTML = '<div class="container" style="text-align:center; padding: 40px 0;"><h2>Produto não encontrado.</h2><a href="/produtos.html" class="btn btn--primary" style="margin-top: 20px;">Voltar aos produtos</a></div>';
        return;
    }

    fetch('/products_data.json')
        .then(res => res.json())
        .then(data => {
            const product = data.find(p => p.id === productId);
            if (!product) {
                document.getElementById('product-container').innerHTML = '<div class="container" style="text-align:center; padding: 40px 0;"><h2>Produto não encontrado.</h2><a href="/produtos.html" class="btn btn--primary" style="margin-top: 20px;">Voltar aos produtos</a></div>';
                return;
            }
            renderProduct(product, data);
        })
        .catch(err => {
            console.error('Error fetching product data:', err);
            document.getElementById('product-container').innerHTML = '<div class="container" style="text-align:center; padding: 40px 0;"><h2>Erro ao carregar o produto.</h2></div>';
        });

    function renderProduct(p, allData) {
        // Update breadcrumb and title
        document.title = `${p.name} | Dona Lu`;
        document.getElementById('bc-cat').textContent = p.category || 'Geral';
        document.getElementById('bc-name').textContent = p.name;

        const waText = encodeURIComponent(`Olá! Tenho interesse no produto ${p.name}, no valor de R$ ${p.price.toFixed(2).replace('.', ',')}. Gostaria de mais informações.`);
        const waUrl = `https://wa.me/5517981144002?text=${waText}`;

        // Get some related products (same category, different ID)
        let related = allData.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
        if (related.length === 0) related = allData.filter(x => x.id !== p.id).slice(0, 4);

        const html = `
      <div class="container">
        <div class="product-page-grid">
          <div class="product-page__gallery">
            <img src="${p.image}" alt="${p.name}" width="500" height="500" fetchpriority="high" decoding="async">
            <div style="margin-top:var(--space-4);">
              <span class="badge badge-hit" style="margin-right:var(--space-2);">Mais Vendido</span>
              <span style="font-size:var(--font-size-xs);color:var(--color-text-muted);">Referência: REF-${p.id}</span>
            </div>
          </div>

          <div class="product-page__info">
            <span class="product-card__cat" style="font-size:var(--font-size-xs);">${p.category || 'Geral'} · ${p.brand || 'Marca não informada'}</span>
            <h1>${p.name}</h1>

            <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-4);">
              <div style="color:#F59E0B;font-size:18px;">★★★★★</div>
              <span style="font-size:var(--font-size-sm);font-weight:600;color:var(--color-secondary);">5,0</span>
              <span style="font-size:var(--font-size-sm);color:var(--color-text-muted);">(Avaliações)</span>
            </div>

            <div class="product-page__price">
              <span class="price-current">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
            </div>

            <p class="product-page__desc">
              ${p.description || 'Produto de alta qualidade para limpeza profissional e doméstica. Excelente rendimento e eficiência contra as sujeiras mais difíceis.'}
            </p>

            <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-6);">
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--font-size-sm);">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Qualidade <strong>Comprovada</strong></span>
              </div>
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--font-size-sm);">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Uso <strong>Profissional ou Doméstico</strong></span>
              </div>
            </div>

            <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;">
              <a href="${waUrl}" target="_blank" class="btn-wa" style="flex:1;min-width:200px;padding:14px 20px;font-size:var(--font-size-base);">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.522 5.857L.057 23.882l6.182-1.621A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.013-1.377l-.36-.214-3.67.963.98-3.576-.235-.37A9.818 9.818 0 0 1 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.419-4.398 9.818-9.818 9.818z"/></svg>
                Comprar via WhatsApp
              </a>
              <a href="/contato.html" class="btn-detail" style="padding:14px 20px;">Orçamento</a>
            </div>
            <p style="font-size:var(--font-size-xs);color:var(--color-text-muted);margin-top:var(--space-4);">⚠️ Preços ilustrativos. Consulte disponibilidade via WhatsApp.</p>
          </div>
        </div>

        <div class="product-tabs">
          <div class="tab-list" role="tablist">
            <button class="tab-btn is-active" role="tab" aria-selected="true" aria-controls="tab-desc" id="btn-desc" type="button">Descrição</button>
            <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-uso" id="btn-uso" type="button">Modo de Uso</button>
          </div>
          <div id="tab-desc" class="tab-panel is-active" role="tabpanel" aria-labelledby="btn-desc">
            <p style="color:var(--color-text-secondary);line-height:1.85;margin-bottom:var(--space-4);">
              ${p.description ? p.description.replace(/\\n/g, '<br>') : 'Descrição completa não fornecida.'}
            </p>
          </div>
          <div id="tab-uso" class="tab-panel" role="tabpanel" aria-labelledby="btn-uso">
            <p style="color:var(--color-text-secondary);line-height:1.85;margin-bottom:var(--space-4);">
              ${p.usage ? p.usage.replace(/\\n/g, '<br>') : 'Para instruções de uso detalhadas, consulte o rótulo do produto ou entre em contato com nossa equipe técnica.'}
            </p>
            <div style="background:#FFF3CD;border-radius:var(--radius-lg);padding:var(--space-5);margin-top:var(--space-6);border-left:4px solid #F59E0B;">
              <p style="color:#92400E;font-size:var(--font-size-sm);font-weight:600;margin-bottom:var(--space-2);">⚠️ Atenção</p>
              <p style="color:#92400E;font-size:var(--font-size-sm);line-height:1.7;">Consulte sempre o rótulo. Utilize os EPIs necessários. Mantenha fora do alcance de crianças.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Produtos relacionados -->
      <section class="section" style="background:var(--color-gray-50); margin-top: 60px;">
        <div class="container">
          <div class="section-lead"><span class="section-label">Veja Também</span><h2>Produtos <span>Relacionados</span></h2></div>
          <div class="product-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 300px)); gap: 24px; justify-content: center;">
            ${related.map(r => {
                const rWaText = encodeURIComponent(`Olá! Tenho interesse no produto ${r.name}, no valor de R$ ${r.price.toFixed(2).replace('.', ',')}. Gostaria de mais informações.`);
                return \`
                <article class="product-card">
                  <div class="product-card__img">
                    <a href="/produto.html?id=\${r.id}"><img src="\${r.image}" alt="\${r.name}" width="400" height="400" loading="lazy"></a>
                  </div>
                  <div class="product-card__body">
                    <span class="product-card__cat">\${r.category || 'Geral'}</span>
                    <h3 class="product-card__name"><a href="/produto.html?id=\${r.id}" style="text-decoration:none;color:inherit;">\${r.name}</a></h3>
                    <div class="product-card__price"><span class="price-current">R$ \${r.price.toFixed(2).replace('.', ',')}</span></div>
                    <div class="product-card__actions">
                      <a href="https://wa.me/5517981144002?text=\${rWaText}" target="_blank" class="btn-wa">Pedir</a>
                      <a href="/produto.html?id=\${r.id}" class="btn-detail">Ver</a>
                    </div>
                  </div>
                </article>
                \`;
            }).join('')}
          </div>
        </div>
      </section>
        `;

        document.getElementById('product-container').innerHTML = html;

        // Add event listeners for the tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('is-active'));
                tabPanels.forEach(p => p.classList.remove('is-active'));
                
                btn.classList.add('is-active');
                document.getElementById(btn.getAttribute('aria-controls')).classList.add('is-active');
            });
        });
    }
});
