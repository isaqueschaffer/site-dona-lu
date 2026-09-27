import urllib.request
import re

urls = [
    'https://www.startquimica.com.br/pt-BR/produtos/multiuso-azulim-cremoso/multiuso-azulim-cremoso-limao-300ml--bcdeb69e',
    'https://www.startquimica.com.br/pt-BR/produtos/desengordurante-azulim-limpeza-pesada/desengordurante-azulim-limpeza-pesada-500ml--a5934830',
    'https://www.startquimica.com.br/pt-BR/produtos/amaciante-de-roupas-concentrado-perfumes-do-mundo/amaciante-de-roupas-concentrado-tuff-winter-15l--ae824ef9',
    'https://www.startquimica.com.br/pt-BR/produtos/limpa-pedras-pedrex-start/limpa-pedras-pedrex--ade43c87',
    'https://www.startquimica.com.br/pt-BR/produtos/tira-ferrugem-azulim/tira-ferrugem-azulim-50ml-blister--36896e75',
    'https://www.startquimica.com.br/pt-BR/produtos/desinfetante-perfumado-azulim/desinfetante-perfumado-azulim-absolute-1l--e16c39ab'
]

headers = {'User-Agent': 'Mozilla/5.0'}

for url in urls:
    req = urllib.request.Request(url, headers=headers)
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Find any storage webp/png image
        imgs = re.findall(r'https://www.startquimica.com.br/storage/[^"\'\s]+\.(?:webp|png|jpg)', html)
        if imgs:
            # We filter out generic icons if possible
            for img in imgs:
                if 'PIM_' in img or 'produtos' in img.lower():
                    print(f'IMG: {url} -> {img}')
                    break
            else:
                print(f'IMG: {url} -> {imgs[0]}')
        else:
            print('No image found for', url)
    except Exception as e:
        print('Error for URL', url, ':', e)
