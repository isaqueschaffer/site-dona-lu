import os
import glob
import shutil
import re

# 1. Rename the files in produto/
file_map = {
    'produto/multiuso-lavanda-500ml.html': 'produto/multiuso-azulim-cremoso.html',
    'produto/desengordurante-cozinha-1l.html': 'produto/desengordurante-azulim.html',
    'produto/sabao-liquido-roupas-3l.html': 'produto/amaciante-tuff.html'
}

for old, new in file_map.items():
    if os.path.exists(old):
        shutil.move(old, new)

# 2. Update links in all HTML files
html_files = glob.glob('**/*.html', recursive=True)
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the URLs globally
    new_content = content.replace('multiuso-lavanda-500ml.html', 'multiuso-azulim-cremoso.html')
    new_content = new_content.replace('desengordurante-cozinha-1l.html', 'desengordurante-azulim.html')
    new_content = new_content.replace('sabao-liquido-roupas-3l.html', 'amaciante-tuff.html')
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)

# 3. Update the content inside the 3 product pages
def update_product_page(filepath, replacements):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_product_page('produto/multiuso-azulim-cremoso.html', [
    ('Limpador Multiuso Lavanda — Dona Lu', 'Multiuso Azulim Cremoso Limão — Dona Lu'),
    ('Multiuso Lavanda 500ml', 'Multiuso Azulim Cremoso Limão'),
    ('Limpador Multiuso Lavanda 500ml', 'Multiuso Azulim Cremoso Limão'),
    ('src="/assets/images/products/multiuso-lavanda-500ml.jpg"', 'src="https://www.startquimica.com.br/storage/PIM_76895740-f026-445c-b539-a23528d2ec57.webp"'),
    ('DL-MUL-LAV-500', 'START-MUL-AZU'),
    ('Produto de limpeza coringa para ter sempre à mão. Formulado com tensoativos biodegradáveis, remove manchas, gorduras leves, poeira e marcas de dedo de quase qualquer superfície lavável.', 'Produto de limpeza coringa para ter sempre à mão. O Multiuso Azulim Cremoso Limão é formulado com tensoativos biodegradáveis, ideal para limpar e desengordurar superfícies laváveis sem esforço, proporcionando um perfume refrescante.'),
    ('Pode ser usado em azulejos, esmaltados, fórmica, pias, bancadas, fogões, plásticos e superfícies pintadas.', 'Pode ser usado em azulejos, esmaltados, fórmica, pias, bancadas, fogões, plásticos e superfícies pintadas, garantindo brilho e limpeza profunda.'),
    ('Borrife o Multiuso Lavanda', 'Borrife o Multiuso Azulim Cremoso')
])

update_product_page('produto/desengordurante-azulim.html', [
    ('Desengordurante para Cozinha 1L — Dona Lu', 'Desengordurante Azulim Limpeza Pesada — Dona Lu'),
    ('Desengordurante Cozinha 1L', 'Desengordurante Azulim Limpeza Pesada'),
    ('Desengordurante Profissional Cozinha 1L', 'Desengordurante Azulim Limpeza Pesada'),
    ('src="/assets/images/products/desengordurante-1l.jpg"', 'src="https://www.startquimica.com.br/storage/PIM_79620d92-7910-43a1-80a6-a15e7734f514.webp"'),
    ('DL-DES-COZ-1000', 'START-DES-AZU'),
    ('Solução alcalina concentrada desenvolvida especificamente para a remoção de gorduras carbonizadas e óleos incrustados. Ideal para cozinhas industriais, restaurantes e praças de alimentação.', 'O Desengordurante Azulim Limpeza Pesada é uma solução desenvolvida especificamente para a remoção de gorduras carbonizadas e óleos incrustados. Ideal para cozinhas, fogões, coifas, fornos e superfícies engorduradas.'),
    ('Aplicações principais: Chapas, coifas, fornos, grelhas e pisos engordurados. Não utilizar em alumínio polido sem teste prévio.', 'Aplicações principais: Chapas, coifas, fornos, grelhas e pisos engordurados. Sua fórmula avançada dissolve a sujeira sem exigir muito esforço físico.'),
    ('Para limpeza pesada', 'Para a remoção de sujeiras pesadas')
])

update_product_page('produto/amaciante-tuff.html', [
    ('Sabão Líquido Roupas 3L — Dona Lu', 'Amaciante de Roupas Tuff Spring — Dona Lu'),
    ('Sabão Líquido Roupas 3L', 'Amaciante de Roupas Tuff Spring'),
    ('Sabão Líquido Profissional Roupas 3L', 'Amaciante de Roupas Tuff Spring'),
    ('src="/assets/images/products/sabao-roupas-3l.jpg"', 'src="https://www.startquimica.com.br/storage/PIM_4f176fc4-9079-470f-9b2d-a72dc305d8b4.webp"'),
    ('DL-SAB-LIQ-3000', 'START-AMA-TUF'),
    ('Detergente líquido concentrado para roupas, com enzimas ativas que removem manchas difíceis sem agredir as fibras do tecido.', 'O Amaciante de Roupas Concentrado Tuff Spring conta com microcápsulas de perfume que liberam um aroma agradável prolongado. Sua fórmula penetra nas fibras, deixando as roupas mais macias e fáceis de passar.'),
    ('Rende até 30 lavagens completas. Possui agente anti-transferência de cores, permitindo lavagem conjunta com maior segurança.', 'Rende muito mais. Protege as cores e as fibras do desgaste natural da lavagem, prolongando a vida útil das suas roupas favoritas.'),
    ('Na máquina: Utilize 100ml (uma tampa cheia)', 'Na máquina: Utilize 1/2 tampa para cada máquina cheia')
])

print("Completed product updates.")
