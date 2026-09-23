import os
import glob

def inject_script():
    files = glob.glob('**/*.html', recursive=True)
    script_tag = '<script src="/assets/js/components/whatsapp.js" defer></script>'
    
    count = 0
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if script_tag in content:
            print(f"Already in {file}")
            continue
            
        if '</body>' in content:
            content = content.replace('</body>', script_tag + '\n</body>')
        else:
            content += '\n' + script_tag
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected into {file}")
        count += 1
    
    print(f"Injected into {count} files total.")

if __name__ == '__main__':
    inject_script()
