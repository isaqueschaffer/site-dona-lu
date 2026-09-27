import glob

replacements = [
    (
        '/assets/images/products/multiuso-lavanda-500ml.jpg',
        'https://www.startquimica.com.br/storage/PIM_76895740-f026-445c-b539-a23528d2ec57.webp'
    ),
    (
        '/assets/images/products/desengordurante-cozinha-1l.jpg',
        'https://www.startquimica.com.br/storage/PIM_79620d92-7910-43a1-80a6-a15e7734f514.webp'
    ),
    (
        '/assets/images/products/sabao-liquido-roupas-3l.jpg',
        'https://www.startquimica.com.br/storage/PIM_4f176fc4-9079-470f-9b2d-a72dc305d8b4.webp'
    ),
    (
        '/assets/images/products/desengordurante-1l.jpg',
        'https://www.startquimica.com.br/storage/PIM_79620d92-7910-43a1-80a6-a15e7734f514.webp'
    ),
    (
        '/assets/images/products/sabao-roupas-3l.jpg',
        'https://www.startquimica.com.br/storage/PIM_4f176fc4-9079-470f-9b2d-a72dc305d8b4.webp'
    )
]

html_files = glob.glob('**/*.html', recursive=True)
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
