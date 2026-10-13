import os
import glob

replacements = [
    (
        'Multiuso Lavanda 500ml',
        'Multiuso Azulim Cremoso Limão'
    ),
    (
        'https://via.placeholder.com/400x300/F1F3F5/6C757D?text=Multiuso',
        'https://www.startquimica.com.br/storage/PIM_76895740-f026-445c-b539-a23528d2ec57.webp'
    ),
    (
        'Desengordurante Cozinha 1L',
        'Desengordurante Azulim Limpeza Pesada'
    ),
    (
        'https://via.placeholder.com/400x300/F1F3F5/6C757D?text=Desengordurante',
        'https://www.startquimica.com.br/storage/PIM_79620d92-7910-43a1-80a6-a15e7734f514.webp'
    ),
    (
        'Sabão Líquido Roupas 3L',
        'Amaciante de Roupas Tuff Spring'
    ),
    (
        'https://via.placeholder.com/400x300/F1F3F5/6C757D?text=Sabao+Liquido',
        'https://www.startquimica.com.br/storage/PIM_4f176fc4-9079-470f-9b2d-a72dc305d8b4.webp'
    ),
    (
        'Removedor de Cimento 1L',
        'Limpa Pedras Pedrex'
    ),
    (
        'https://via.placeholder.com/400x300/F1F3F5/6C757D?text=Removedor+Cimento',
        'https://www.startquimica.com.br/storage/PIM_4b356751-d074-4de2-b4b4-7232c97be599.webp'
    ),
    (
        'Detergente Antiferrugem 5L',
        'Tira Ferrugem Azulim 50mL'
    ),
    (
        'https://via.placeholder.com/400x300/F1F3F5/6C757D?text=Antiferrugem',
        'https://www.startquimica.com.br/storage/PIM_ef2c7ecd-004b-42d2-bf7e-672d7d769dee.webp'
    ),
    (
        'Desinfetante Hospitalar 2L',
        'Desinfetante Perfumado Azulim'
    ),
    (
        'https://via.placeholder.com/400x300/F1F3F5/6C757D?text=Desinfetante',
        'https://www.startquimica.com.br/storage/PIM_7fa9a39a-9850-4054-9633-5556da3e0c2c.webp'
    )
]

for file in ['produtos.html', 'index.html', 'categoria/pos-obra.html', 'categoria/limpeza-geral.html']:
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
