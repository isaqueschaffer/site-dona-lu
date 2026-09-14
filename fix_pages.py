import os
import re

base_dir = r"c:\Users\amand\OneDrive\Área de Trabalho\Site lucimara"

with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
    content = f.read()

# Extract top up to <main>
head_match = re.search(r'(.*?<main>)', content, re.DOTALL)
head = head_match.group(1) if head_match else ""

# Extract from </main> to the end
tail_match = re.search(r'(</main>.*)', content, re.DOTALL)
tail = tail_match.group(1) if tail_match else ""

pages = {
    "produtos.html": "Produtos",
    "locacao.html": "Locação de Máquinas",
    "solucoes.html": "Soluções",
    "empresa.html": "Empresa",
    "contato.html": "Contato"
}

for filename, title in pages.items():
    page_content = head + f"""
    <section style="padding: 100px 20px; text-align: center; min-height: 50vh;">
      <div class="container">
        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">{title}</h1>
        <p style="font-size: 1.2rem; color: #666;">Esta página está em construção. Volte em breve!</p>
      </div>
    </section>
    """ + tail
    
    # Fix the title tag
    page_content = re.sub(r'<title>.*?</title>', f'<title>Dona Lu — {title}</title>', page_content)
    # Fix the aria-current="page"
    page_content = page_content.replace('aria-current="page"', '')
    page_content = page_content.replace(f'href="/{filename}"', f'href="/{filename}" aria-current="page"')

    with open(os.path.join(base_dir, filename), "w", encoding="utf-8") as f:
        f.write(page_content)

print("Pages populated!")
