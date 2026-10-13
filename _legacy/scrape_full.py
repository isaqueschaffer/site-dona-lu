import urllib.request
import re
import json
import time

segments = {
    'casa': 'https://www.startquimica.com.br/pt-BR/produtos?setor=para_casa',
    'empresa': 'https://www.startquimica.com.br/pt-BR/produtos?setor=para_empresa',
    'voce': 'https://www.startquimica.com.br/pt-BR/produtos?setor=para_voce'
}

headers = {'User-Agent': 'Mozilla/5.0'}
all_links = set()
link_segment_map = {}

# We will collect up to 15 links per segment
for segment, url in segments.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        links = re.findall(r'href="(https://www.startquimica.com.br/pt-BR/produtos/[^"]+)"', html)
        # Avoid pagination links or weird things, keep only real product links
        # A real product link usually has /produtos/category-name/product-name--hash
        product_links = [l for l in links if '--' in l]
        # De-duplicate
        product_links = list(set(product_links))[:15] # 15 max per segment to save time
        
        for l in product_links:
            all_links.add(l)
            link_segment_map[l] = segment
    except Exception as e:
        print('Error getting segment', segment, e)

products = []

print(f"Total links to scrape: {len(all_links)}")
for idx, url in enumerate(all_links):
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # Name (og:title or title)
        title_match = re.search(r'<title>([^<]+)</title>', html)
        name = title_match.group(1).split('|')[0].strip() if title_match else 'Produto Start'
        if name.endswith(' - Start Química') or name.endswith(' - Start'):
            name = name.replace(' - Start Química', '').replace(' - Start', '').strip()
            
        # Image
        imgs = re.findall(r'https://www.startquimica.com.br/storage/[^"\'\s]+\.(?:webp|png|jpg)', html)
        image = ''
        if imgs:
            for img in imgs:
                if 'PIM_' in img or 'produtos' in img.lower():
                    image = img
                    break
            if not image: image = imgs[0]
            
        # Description (meta description)
        desc_match = re.search(r'name="description"\s*content="([^"]+)"', html)
        desc = desc_match.group(1) if desc_match else ''
        
        # We can extract text from paragraphs inside the body
        # specifically look for "MODO DE USO", etc.
        body_text = re.sub(r'<[^>]+>', ' ', html)
        body_text = re.sub(r'\s+', ' ', body_text)
        
        modo_uso = ''
        if 'MODO DE USO' in html or 'Modo de usar' in html or 'Modo de Uso' in html:
            # Try to grab the next few sentences
            # Just a rough extraction
            pass
            
        # Generating a fake price based on segment
        segment = link_segment_map[url]
        import random
        if segment == 'casa':
            price = round(random.uniform(9.90, 39.90), 2)
        elif segment == 'empresa':
            price = round(random.uniform(49.90, 199.90), 2)
        else:
            price = round(random.uniform(14.90, 59.90), 2)
            
        brand = 'Azulim'
        if 'tuff' in name.lower(): brand = 'Tuff'
        elif 'pedrex' in name.lower(): brand = 'Pedrex'
        elif 'asseptgel' in name.lower(): brand = 'Asseptgel'
        
        category = 'Limpadores'
        if 'amaciante' in name.lower() or 'lava roupas' in name.lower(): category = 'Lavanderia'
        elif 'desinfetante' in name.lower(): category = 'Desinfetantes'
        
        products.append({
            'id': f'prod_{idx}',
            'name': name,
            'image': image,
            'description': desc,
            'segment': segment,
            'brand': brand,
            'category': category,
            'price': price,
            'url': url
        })
        time.sleep(0.5)
    except Exception as e:
        print('Error on', url, e)

with open('products_data.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

print("Scraping finished. Data saved to products_data.json.")
