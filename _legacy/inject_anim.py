import glob

def inject_animations():
    files = ['empresa.html', 'locacao.html', 'solucoes.html', 'contato.html']
    script_tag = '<script src="/assets/js/components/animations.js" defer></script>'
    
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if script_tag in content:
            print(f"Already in {file}")
            continue
            
        if '</body>' in content:
            content = content.replace('</body>', script_tag + '\n</body>')
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Injected into {file}")

if __name__ == '__main__':
    inject_animations()
