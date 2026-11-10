"""
CSS Bundler & Minifier
Combines variables.css, base.css, layout.css, and components.css into bundle.min.css
"""
import os
import re

def build_css():
    base_dir = r"D:\Abhishek Website\css"
    files = ["variables.css", "base.css", "layout.css", "components.css"]
    
    combined = ""
    for f in files:
        file_path = os.path.join(base_dir, f)
        with open(file_path, "r", encoding="utf-8") as fp:
            combined += fp.read() + "\n"
            
    # Strip comments
    minified = re.sub(r"/\*[\s\S]*?\*/", "", combined)
    # Collapse whitespace
    minified = re.sub(r"\s+", " ", minified)
    # Remove space around delimiters
    minified = re.sub(r"\s*([\{\}\:\;\,\>])\s*", r"\1", minified)
    # Clean trailing semicolons
    minified = minified.replace(";}", "}").strip()
    
    out_path = os.path.join(base_dir, "bundle.min.css")
    with open(out_path, "w", encoding="utf-8") as out:
        out.write(minified)
        
    orig_kb = len(combined) / 1024
    min_kb = len(minified) / 1024
    print(f"CSS Bundle created: {orig_kb:.1f} KB -> {min_kb:.1f} KB ({(1 - min_kb/orig_kb)*100:.1f}% reduction)")

if __name__ == "__main__":
    build_css()
