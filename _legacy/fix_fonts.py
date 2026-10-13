import os
import glob
import re

target_dir = r"c:\Users\amand\OneDrive\Área de Trabalho\Site lucimara"

old_font_link = r'<link href="https://fonts.googleapis.com/css2\?family=Roboto\+Slab:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">'
new_font_link = '<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'

html_files = glob.glob(os.path.join(target_dir, "**", "*.html"), recursive=True)

count = 0
for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = re.sub(old_font_link, new_font_link, content)
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
    except Exception as e:
        print(f"Error on {file_path}: {e}")

print(f"Fixed fonts in {count} HTML files.")
