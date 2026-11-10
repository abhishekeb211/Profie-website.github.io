"""
Photoshop-Grade Studio Portrait Compositing Pipeline
Processes 'images/Suits Abhishek.png' into 'images/hero-abhishek-prismatic.png'
with skin-protecting color grading, edge decontamination, multi-spectral rim lighting,
and cubic Hermite S-curve vignette submersion.
"""
import cv2
import numpy as np
from PIL import Image
import os

def composite_abhishek_portrait():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_path = os.path.join(base_dir, "images", "Suits Abhishek.png")
    out_master_path = os.path.join(base_dir, "images", "hero-abhishek-prismatic.png")
    
    print(f"Loading source portrait from: {src_path}")
    raw_img = Image.open(src_path).convert("RGB")
    arr_full = np.array(raw_img).astype(np.float32) / 255.0
    h_orig, w_orig, _ = arr_full.shape
    
    # 1. Optimal Cropping:
    # Hair starts at y = 62.
    # Crop y from 30 to 1240 (giving 32px top breathing room for aura/rim light)
    # Center horizontally on Abhishek's face/body (width 1214)
    crop_y1 = 30
    crop_y2 = 1240
    crop_x1 = 20
    crop_x2 = 1234
    
    arr = arr_full[crop_y1:crop_y2, crop_x1:crop_x2]
    h, w, _ = arr.shape
    print(f"Cropped stage dimension: {w}x{h}")
    
    # 2. Studio Matte Extraction:
    # Floodfill from top border to isolate the pure white studio backdrop
    mask_work = np.zeros((h + 2, w + 2), np.uint8)
    arr_8u = (arr * 255).astype(np.uint8)
    
    for x in range(0, w, 20):
        if mask_work[1, x + 1] == 0 and np.all(arr_8u[0, x] >= 245):
            cv2.floodFill(arr_8u.copy(), mask_work, (x, 0), 255, 
                          loDiff=(3, 3, 3), upDiff=(3, 3, 3), 
                          flags=4 | (255 << 8) | cv2.FLOODFILL_MASK_ONLY)
            
    fg_mask_raw = (mask_work[1:-1, 1:-1] == 0).astype(np.float32)
    
    # 3. Photoshop Defringe & Edge Color Decontamination (Remove White Matte):
    # Erode outer 2px boundary to eliminate white edge halo
    k_erode = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    mask_eroded = cv2.erode(fg_mask_raw, k_erode, iterations=1)
    
    # Isolate the 3px edge transition zone
    k_inner = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    mask_inner = cv2.erode(fg_mask_raw, k_inner, iterations=1)
    edge_zone = (fg_mask_raw > 0.05) & (mask_inner < 0.95)
    
    # Propagate authentic interior colors (skin tone, beard, dark hair, suit black)
    # outward into the edge zone using Telea inpainting
    inpaint_target = cv2.dilate(edge_zone.astype(np.uint8), k_erode) * 255
    color_decontaminated = cv2.inpaint(arr_8u, inpaint_target, 4, cv2.INPAINT_TELEA).astype(np.float32) / 255.0
    
    # High-fidelity sub-pixel anti-aliased alpha
    alpha_clean = cv2.GaussianBlur(mask_eroded, (3, 3), 0.6)
    
    base_color = arr.copy()
    base_color[edge_zone] = color_decontaminated[edge_zone]
    
    # 4. Skin vs Suit Segmentation & Tonal Enhancement:
    # Protect face & neck skin in YCrCb color space
    ycrcb = cv2.cvtColor(arr_8u, cv2.COLOR_RGB2YCrCb)
    cr = ycrcb[:, :, 1]
    cb = ycrcb[:, :, 2]
    skin_mask = (cr >= 130) & (cr <= 175) & (cb >= 75) & (cb <= 130) & (alpha_clean > 0.5)
    skin_mask = cv2.GaussianBlur(skin_mask.astype(np.float32), (17, 17), 0)
    
    # Suit mask: low luminance, non-skin body
    lum = 0.299 * base_color[:, :, 0] + 0.587 * base_color[:, :, 1] + 0.114 * base_color[:, :, 2]
    suit_mask = (lum < 0.35) & (alpha_clean > 0.5) & (skin_mask < 0.15)
    suit_mask = cv2.GaussianBlur(suit_mask.astype(np.float32), (9, 9), 0)
    
    # Deepen suit blacks slightly for premium luxury look
    graded = base_color.copy()
    suit_darkened = np.power(graded, 1.20) * 0.82
    graded = graded * (1.0 - suit_mask[:, :, None]) + suit_darkened * suit_mask[:, :, None]
    
    # 5. Multi-Spectral Volumetric Inner Rim Lighting:
    k_tight = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    k_wide = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (19, 19))
    eroded_tight = cv2.erode(alpha_clean, k_tight)
    eroded_wide = cv2.erode(alpha_clean, k_wide)
    
    rim_tight = cv2.GaussianBlur(np.clip(alpha_clean - eroded_tight, 0, 1), (7, 7), 0)
    rim_wide = cv2.GaussianBlur(np.clip(alpha_clean - eroded_wide, 0, 1), (21, 21), 0)
    rim_intensity = np.clip(rim_tight * 0.75 + rim_wide * 0.45, 0, 1)
    
    yy, xx = np.mgrid[0:h, 0:w]
    x_norm = xx / float(w)
    y_norm = yy / float(h)
    angle = np.arctan2(y_norm - 0.38, x_norm - 0.5)
    
    col_r = np.zeros((h, w), dtype=np.float32)
    col_g = np.zeros((h, w), dtype=np.float32)
    col_b = np.zeros((h, w), dtype=np.float32)
    
    # Left: Electric Cyan / Sky Blue (angle ~ -2.6)
    cyan_w = np.clip(np.cos(angle - (-2.6)), 0, 1) ** 2.2
    col_r += cyan_w * 0.05
    col_g += cyan_w * 0.90
    col_b += cyan_w * 1.00
    
    # Top: Indigo / Violet (angle ~ -1.57)
    violet_w = np.clip(np.cos(angle - (-np.pi / 2)), 0, 1) ** 2.0
    col_r += violet_w * 0.70
    col_g += violet_w * 0.20
    col_b += violet_w * 1.00
    
    # Right-Top: Vivid Rose / Coral (angle ~ -0.7)
    magenta_w = np.clip(np.cos(angle - (-0.7)), 0, 1) ** 2.0
    col_r += magenta_w * 1.00
    col_g += magenta_w * 0.18
    col_b += magenta_w * 0.70
    
    # Right-Shoulder: Warm Amber / Gold (angle ~ 0.35)
    amber_w = np.clip(np.cos(angle - (0.35)), 0, 1) ** 2.0
    col_r += amber_w * 1.00
    col_g += amber_w * 0.65
    col_b += amber_w * 0.10
    
    max_c = np.maximum(np.maximum(col_r, col_g), col_b) + 1e-6
    col_r /= max_c
    col_g /= max_c
    col_b /= max_c
    spectral_map = np.stack([col_r, col_g, col_b], axis=-1)
    
    # Protect face skin from rim coloring
    edge_weight = rim_intensity * (1.0 - skin_mask * 0.80)
    inner_glow = spectral_map * edge_weight[:, :, None] * 0.70
    
    # Screen blend mode
    subject_rimmed = 1.0 - (1.0 - graded) * (1.0 - np.clip(inner_glow, 0, 1))
    
    # 6. Subtle Prismatic Anamorphic Caustic on Right Shoulder:
    diag = (x_norm * 0.75 + y_norm * 0.65) * 14.0
    caustic_stripes = (np.sin(diag) * 0.5 + 0.5) ** 3
    shoulder_zone = np.exp(-((x_norm - 0.72) ** 2 / 0.05 + (y_norm - 0.70) ** 2 / 0.05))
    caustic_amp = shoulder_zone * caustic_stripes * suit_mask * 0.40
    
    caustic_spec = np.stack([
        np.sin(diag) * 0.5 + 0.5,
        np.sin(diag + 2.0) * 0.5 + 0.5,
        np.sin(diag + 4.0) * 0.5 + 0.5
    ], axis=-1)
    subject_rimmed = 1.0 - (1.0 - subject_rimmed) * (1.0 - caustic_spec * caustic_amp[:, :, None])
    
    # 7. Cubic Hermite S-Curve Torso Submersion Falloff:
    fade_start = 850
    fade_end = 1170
    falloff_y = np.ones(h, dtype=np.float32)
    y_idx = np.arange(h)
    fade_range = (y_idx >= fade_start) & (y_idx <= fade_end)
    prog = (y_idx[fade_range] - fade_start) / float(fade_end - fade_start)
    hermite = 1.0 - (3.0 * prog ** 2 - 2.0 * prog ** 3)
    falloff_y[fade_range] = hermite
    falloff_y[y_idx > fade_end] = 0.0
    
    # Lateral corner taper at the bottom so lower suit softens towards corners
    corner_taper = np.ones((h, w), dtype=np.float32)
    for y_val in range(fade_start, h):
        factor = (y_val - fade_start) / float(h - fade_start)
        taper_width = int(240 * factor)
        if taper_width > 0:
            left_prog = np.linspace(0, 1, taper_width)
            corner_taper[y_val, :taper_width] *= (3.0 * left_prog ** 2 - 2.0 * left_prog ** 3)
            right_prog = np.linspace(1, 0, taper_width)
            corner_taper[y_val, -taper_width:] *= (3.0 * right_prog ** 2 - 2.0 * right_prog ** 3)
            
    final_alpha = alpha_clean * falloff_y[:, None] * corner_taper
    
    # 8. Export Master RGBA PNG:
    r_out = (np.clip(subject_rimmed[:, :, 0], 0, 1) * 255).astype(np.uint8)
    g_out = (np.clip(subject_rimmed[:, :, 1], 0, 1) * 255).astype(np.uint8)
    b_out = (np.clip(subject_rimmed[:, :, 2], 0, 1) * 255).astype(np.uint8)
    a_out = (np.clip(final_alpha, 0, 1) * 255).astype(np.uint8)
    
    master_rgba = np.dstack([r_out, g_out, b_out, a_out])
    master_pil = Image.fromarray(master_rgba, mode="RGBA")
    
    master_pil.save(out_master_path, format="PNG", optimize=True)
    print(f"Master clean portrait saved to: {out_master_path} ({master_pil.size})")
    
    # 9. Dual-Theme Visual Preview Generation:
    dark_bg = np.array([6, 2, 5], dtype=np.uint8) # #060205 Hacker Carbon
    white_bg = np.array([255, 255, 255], dtype=np.uint8) # #FFFFFF Pure White
    
    a_norm = a_out[:, :, None].astype(np.float32) / 255.0
    comp_dark = (master_rgba[:, :, :3] * a_norm + dark_bg * (1.0 - a_norm)).astype(np.uint8)
    comp_white = (master_rgba[:, :, :3] * a_norm + white_bg * (1.0 - a_norm)).astype(np.uint8)
    
    preview_w, preview_h = 580, int(580 * h / w)
    p_dark = Image.fromarray(comp_dark).resize((preview_w, preview_h), Image.Resampling.LANCZOS)
    p_white = Image.fromarray(comp_white).resize((preview_w, preview_h), Image.Resampling.LANCZOS)
    
    side_by_side = Image.new("RGB", (preview_w * 2 + 10, preview_h), (35, 35, 35))
    side_by_side.paste(p_dark, (0, 0))
    side_by_side.paste(p_white, (preview_w + 10, 0))
    
    preview_path = os.path.join(r"C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64", 
                                "photoshop_compositing_comparison.jpg")
    side_by_side.save(preview_path, format="JPEG", quality=95)
    print(f"Comparison preview saved to: {preview_path}")

if __name__ == "__main__":
    composite_abhishek_portrait()
