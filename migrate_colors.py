import os
import glob
import re

css_dir = r"c:\Users\amand\OneDrive\Área de Trabalho\Site lucimara\assets\css"
css_files = glob.glob(os.path.join(css_dir, "**/*.css"), recursive=True)

# Replacements to migrate to the new color scheme
replacements = {
    r"var\(--color-green\)": "var(--color-primary)",
    r"var\(--color-green-dark\)": "var(--color-secondary-dark)",
    r"var\(--color-green-light\)": "var(--color-primary-light)",
    r"var\(--color-green-mid\)": "var(--color-primary-light)",
    
    r"var\(--color-blue\)": "var(--color-secondary)",
    r"var\(--color-blue-dark\)": "var(--color-secondary-dark)",
    r"var\(--color-blue-light\)": "var(--color-bg-tertiary)",
    r"var\(--color-blue-mid\)": "var(--color-border)",

    r"var\(--color-purple\)": "var(--color-yellow)",
    r"var\(--color-purple-dark\)": "var(--color-yellow)",
    r"var\(--color-purple-light\)": "var(--color-yellow)",
    r"var\(--color-purple-mid\)": "var(--color-yellow)",
}

for file in css_files:
    if "tokens.css" in file:
        continue # we already did this manually
    
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = content
    for pattern, rep in replacements.items():
        new_content = re.sub(pattern, rep, new_content)
        
    if content != new_content:
        with open(file, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {file}")

print("Done migrating colors.")
