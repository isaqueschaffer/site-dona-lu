import urllib.request
import re

url = 'https://www.startquimica.com.br/pt-BR/produtos?setor=para_casa'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    if 'wire:initial-data' in html:
        print('Livewire detected')
    
    links = set(re.findall(r'href="(https://www.startquimica.com.br/pt-BR/produtos/[^"]+)"', html))
    print(f'Found {len(links)} product links.')
    for l in list(links)[:10]:
        print(l)
except Exception as e:
    print('Error:', e)
