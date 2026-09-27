import re

with open('produtos.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace the filters panel
sidebar_pattern = re.compile(r'<aside class="produtos-sidebar">.*?</aside>', re.DOTALL)
new_sidebar = """<aside class="produtos-sidebar">
  <div class="filters-panel">
    <div class="filter-group">
      <h3 class="filter-group__label">Pesquisar</h3>
      <input type="text" id="catalog-search" class="form-input" placeholder="Buscar produto..." style="width:100%;">
    </div>
    <!-- Inject by JS -->
  </div>
</aside>"""
content = sidebar_pattern.sub(new_sidebar, content)

# 2. Replace the main grid area
main_pattern = re.compile(r'<div class="produtos-main">.*?</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)
new_main = """<div class="produtos-main">
  <div class="produtos-toolbar">
    <p class="produtos-count" data-product-count>Carregando produtos...</p>
    <div style="display:flex;align-items:center;gap:var(--space-3);">
      <label for="sort-select" class="sr-only">Ordenar por</label>
      <select id="sort-select" data-filter-sort class="form-select" style="padding:8px 36px 8px 12px;min-width:160px;">
        <option value="default">Relevância</option>
        <option value="price-asc">Menor preço</option>
        <option value="price-desc">Maior preço</option>
        <option value="name-asc">A–Z</option>
      </select>
    </div>
  </div>
  <div class="product-grid" data-product-grid>
    <!-- Rendered by catalog.js -->
  </div>
</div>
      </div>
    </div>
  </section>"""
content = main_pattern.sub(new_main, content)

# 3. Replace the script
content = content.replace('<script src="/assets/js/pages/produtos.js"></script>', '<script src="/assets/js/catalog.js"></script>')

with open('produtos.html', 'w', encoding='utf-8') as f:
    f.write(content)
