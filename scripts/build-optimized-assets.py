"""
Build script to:
1. Generate WebP formats for all portfolio images.
2. Generate PWA app icons (192x192, 512x512) from Suits Abhishek.png.
3. Report payload savings.
"""
import os
from PIL import Image

def build_assets():
    base_dir = r"D:\Abhishek Website"
    img_dir = os.path.join(base_dir, "images")
    
    # 1. PWA Icons Generation
    src_suit = os.path.join(img_dir, "Suits Abhishek.png")
    if os.path.exists(src_suit):
        suit_img = Image.open(src_suit).convert("RGBA")
        # Center square crop focused on upper chest and head
        # Source is 1254x1254
        icon_512 = suit_img.resize((512, 512), Image.Resampling.LANCZOS)
        icon_192 = suit_img.resize((192, 192), Image.Resampling.LANCZOS)
        
        path_512 = os.path.join(img_dir, "icon-512.png")
        path_192 = os.path.join(img_dir, "icon-192.png")
        
        icon_512.save(path_512, "PNG", optimize=True)
        icon_192.save(path_192, "PNG", optimize=True)
        print(f"Generated PWA icons: {path_192}, {path_512}")
    
    # 2. WebP Conversions
    targets = [
        ("hero-abhishek-prismatic.png", 92),
        ("ANHACK.jpg", 85),
        ("frontend-showcase-dashboard.jpg", 85),
        ("frontend-showcase-code-ui.jpg", 85),
        ("7103052.jpg", 85),
        ("11154101.jpg", 85),
        ("71030401.jpg", 85),
        ("money-heist-professor.jpg", 85)
    ]
    
    total_orig = 0
    total_webp = 0
    
    for filename, quality in targets:
        src = os.path.join(img_dir, filename)
        if not os.path.exists(src):
            continue
            
        base_name, _ = os.path.splitext(filename)
        dest = os.path.join(img_dir, f"{base_name}.webp")
        
        im = Image.open(src)
        im.save(dest, "WEBP", quality=quality, method=6)
        
        orig_sz = os.path.getsize(src) / 1024
        webp_sz = os.path.getsize(dest) / 1024
        total_orig += orig_sz
        total_webp += webp_sz
        savings = (1 - webp_sz / orig_sz) * 100
        print(f"Optimized: {filename} ({orig_sz:.1f} KB) -> {base_name}.webp ({webp_sz:.1f} KB) [{savings:.1f}% saved]")
        
    print(f"\nTOTAL SAVINGS: {total_orig:.1f} KB -> {total_webp:.1f} KB ({(1 - total_webp / total_orig) * 100:.1f}% total bandwidth reduction)")

if __name__ == "__main__":
    build_assets()
