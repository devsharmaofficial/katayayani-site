import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace the words
    new_content = content.replace('Katayayani', 'Kataayani')
    new_content = new_content.replace('katayayani', 'kataayani')
    new_content = new_content.replace('katayayani-enterprises-logo', 'kataayani-enterprises-logo')
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.html', '.md')):
            replace_in_file(os.path.join(root, file))

for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.css', '.html', '.md')):
            replace_in_file(os.path.join(root, file))
