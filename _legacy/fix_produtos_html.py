import re

with open('produtos.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the sidebar
sidebar_start = content.find('<aside class="produtos-sidebar">')
if sidebar_start != -1:
    sidebar_end = content.find('</aside>', sidebar_start) + len('</aside>')
    new_sidebar = """<aside class="produtos-sidebar">
            <div class="filters-panel">
              <div class="filter-group">
                <h3 class="filter-group__label">Pesquisar</h3>
                <input type="text" id="catalog-search" class="form-input" placeholder="Buscar produto..." style="width:100%;">
              </div>
            </div>
          </aside>"""
    content = content[:sidebar_start] + new_sidebar + content[sidebar_end:]

# Replace the main area
main_start = content.find('<div class="produtos-main">')
if main_start != -1:
    # Find the closing div of produtos-main
    # It's inside a `<div class="container" style="display:grid;...">`, let's just use string replace for the whole section
    pass

# We will just replace everything between `<div class="produtos-main">` and `</section>` (which closes the grid layout section)
main_pattern = re.compile(r'<div class="produtos-main">.*?</section>', re.DOTALL)
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

content = content.replace('<script src="/assets/js/pages/produtos.js"></script>', '<script src="/assets/js/catalog.js"></script>')

with open('produtos.html', 'w', encoding='utf-8') as f:
    f.write(content)
