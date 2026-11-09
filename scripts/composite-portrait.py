import cv2
import numpy as np
from PIL import Image

def create_photoshop_grade_portrait():
    orig_path = r"D:\Abhishek Website\images\hero-abhishek-white-bg-skyblue-shirt.jpg"
    mask_source_path = r"D:\Abhishek Website\images\hero-abhishek-transparent.png"
    
    orig_img = Image.open(orig_path).convert("RGB")
    cutout_img = Image.open(mask_source_path).convert("RGBA")
    
    w, h = orig_img.size # 1024 x 1024
    
    # Extract alpha
    _, _, _, alpha = cutout_img.split()
    alpha_np = np.array(alpha).astype(np.float32) / 255.0

    # 1. Defringe Edge: slight erosion to kill white halo from original studio backdrop
    kernel_defringe = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    alpha_clean = cv2.erode(alpha_np, kernel_defringe, iterations=1)
    # Smooth alpha boundary
    alpha_clean = cv2.GaussianBlur(alpha_clean, (3, 3), 0)
    
    orig_np = np.array(orig_img).astype(np.float32) / 255.0
    
    # 2. Skin vs Suit Masking (Photoshop Color Range / Select & Mask)
    # Convert to YCrCb for precise skin detection
    orig_8u = (orig_np * 255).astype(np.uint8)
    ycrcb = cv2.cvtColor(orig_8u, cv2.COLOR_RGB2YCrCb)
    cr = ycrcb[:, :, 1]
    cb = ycrcb[:, :, 2]
    # Skin color range: Cr in [133, 173], Cb in [77, 127]
    skin_mask = (cr >= 130) & (cr <= 175) & (cb >= 75) & (cb <= 130)
    skin_mask = cv2.GaussianBlur(skin_mask.astype(np.float32), (15, 15), 0)
    
    # Suit mask: Dark areas that are NOT skin, within the body silhouette
    lum = 0.299 * orig_np[:, :, 0] + 0.587 * orig_np[:, :, 1] + 0.114 * orig_np[:, :, 2]
    suit_mask = (lum < 0.40) & (alpha_clean > 0.5) & (skin_mask < 0.2)
    suit_mask = cv2.GaussianBlur(suit_mask.astype(np.float32), (9, 9), 0)
    
    # Deepen suit blacks without touching skin
    graded_np = orig_np.copy()
    # Suit darkening: smooth power curve
    suit_darkened = np.power(graded_np, 1.3) * 0.72
    graded_np = graded_np * (1.0 - suit_mask[:, :, None]) + suit_darkened * suit_mask[:, :, None]

    # 3. Multi-Spectral Volumetric Inner Rim Light (Photoshop Inner Shadow / Inner Glow)
    # Erode alpha to isolate inner edge boundary
    kernel_tight = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    kernel_wide = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    
    eroded_tight = cv2.erode(alpha_clean, kernel_tight, iterations=1)
    eroded_wide = cv2.erode(alpha_clean, kernel_wide, iterations=1)
    
    rim_tight = cv2.GaussianBlur(np.clip(alpha_clean - eroded_tight, 0, 1), (7, 7), 0)
    rim_wide = cv2.GaussianBlur(np.clip(alpha_clean - eroded_wide, 0, 1), (21, 21), 0)
    
    # Combine tight edge + soft volumetric falloff
    rim_intensity = np.clip(rim_tight * 0.75 + rim_wide * 0.55, 0, 1)

    # Multi-Spectral Color Gradient Map
    yy, xx = np.mgrid[0:h, 0:w]
    x_norm = xx / float(w)
    y_norm = yy / float(h)
    
    # Center of portrait
    angle = np.arctan2(y_norm - 0.45, x_norm - 0.5)
    
    color_r = np.zeros((h, w), dtype=np.float32)
    color_g = np.zeros((h, w), dtype=np.float32)
    color_b = np.zeros((h, w), dtype=np.float32)
    
    # Left (Cyan / Electric Blue): angle around -2.6
    cyan_w = np.clip(np.cos(angle - (-2.6)), 0, 1) ** 2
    color_r += cyan_w * 0.05
    color_g += cyan_w * 0.90
    color_b += cyan_w * 1.00
    
    # Top (Violet / Indigo): angle around -1.57 (-pi/2)
    violet_w = np.clip(np.cos(angle - (-np.pi / 2)), 0, 1) ** 2
    color_r += violet_w * 0.65
    color_g += violet_w * 0.25
    color_b += violet_w * 1.00
    
    # Right-Top (Magenta / Rose): angle around -0.7
    magenta_w = np.clip(np.cos(angle - (-0.7)), 0, 1) ** 2
    color_r += magenta_w * 1.00
    color_g += magenta_w * 0.15
    color_b += magenta_w * 0.70
    
    # Right-Shoulder (Amber / Gold): angle around 0.4
    amber_w = np.clip(np.cos(angle - (0.4)), 0, 1) ** 2
    color_r += amber_w * 1.00
    color_g += amber_w * 0.68
    color_b += amber_w * 0.10
    
    max_c = np.maximum(np.maximum(color_r, color_g), color_b) + 1e-6
    color_r /= max_c
    color_g /= max_c
    color_b /= max_c
    
    spectral_map = np.stack([color_r, color_g, color_b], axis=-1)
    
    # Blend Inner Rim Light onto Subject using Screen Blend Mode
    # Screen: 1 - (1 - Base) * (1 - Glow)
    inner_glow = spectral_map * rim_intensity[:, :, None] * 0.75
    # Less rim light on center face, full rim light on silhouette edges & hair
    subject_rimmed = 1.0 - (1.0 - graded_np) * (1.0 - np.clip(inner_glow, 0, 1))

    # 4. Soft Prismatic Optical Caustic on Right Shoulder (matches reference mockup)
    # Subtle angled rainbow shimmer
    diag = (x_norm * 0.75 + y_norm * 0.65) * 12.0
    caustic_stripes = (np.sin(diag) * 0.5 + 0.5) ** 3
    # Confine strictly to right suit shoulder
    shoulder_zone = np.exp(-((x_norm - 0.70)**2 / 0.04 + (y_norm - 0.64)**2 / 0.04))
    caustic_amp = shoulder_zone * caustic_stripes * suit_mask * 0.45
    
    caustic_spec = np.stack([
        np.sin(diag) * 0.5 + 0.5,
        np.sin(diag + 2.0) * 0.5 + 0.5,
        np.sin(diag + 4.0) * 0.5 + 0.5
    ], axis=-1)
    
    subject_rimmed = 1.0 - (1.0 - subject_rimmed) * (1.0 - caustic_spec * caustic_amp[:, :, None])

    # 5. Natural Photographic Vignette Submersion (Cosine S-Curve Falloff)
    # Upper body solid from 0 to 570
    # Dissolves completely into 0 alpha from 570 to 960
    fade_start = 570
    fade_end = 960
    falloff = np.ones(h, dtype=np.float32)
    y_idx = np.arange(h)
    mask_range = (y_idx >= fade_start) & (y_idx <= fade_end)
    progress = (y_idx[mask_range] - fade_start) / float(fade_end - fade_start)
    # Cosine S-curve: completely smooth derivative at both start and end
    falloff[mask_range] = (np.cos(progress * np.pi) * 0.5 + 0.5)
    falloff[y_idx > fade_end] = 0.0
    
    final_alpha = alpha_clean * falloff[:, None]
    
    # 6. Export Master Clean RGBA PNG
    r_out = (np.clip(subject_rimmed[:, :, 0], 0, 1) * 255).astype(np.uint8)
    g_out = (np.clip(subject_rimmed[:, :, 1], 0, 1) * 255).astype(np.uint8)
    b_out = (np.clip(subject_rimmed[:, :, 2], 0, 1) * 255).astype(np.uint8)
    a_out = (np.clip(final_alpha, 0, 1) * 255).astype(np.uint8)
    
    master_rgba = np.dstack([r_out, g_out, b_out, a_out])
    master_pil = Image.fromarray(master_rgba, mode="RGBA")
    
    out_master_path = r"D:\Abhishek Website\images\hero-abhishek-prismatic.png"
    master_pil.save(out_master_path, format="PNG", optimize=True)
    print(f"Master clean portrait saved to: {out_master_path}")
    
    # Generate test preview on actual Dark Space and Light Mode canvases
    dark_canvas = np.zeros((h, w, 3), dtype=np.uint8)
    dark_canvas[:] = (6, 11, 18) # #060b12 (RGB)
    light_canvas = np.zeros((h, w, 3), dtype=np.uint8)
    light_canvas[:] = (248, 250, 252) # #f8fafc (RGB)
    
    a_norm = a_out[:, :, None].astype(np.float32) / 255.0
    comp_dark = (master_rgba[:, :, :3] * a_norm + dark_canvas * (1.0 - a_norm)).astype(np.uint8)
    comp_light = (master_rgba[:, :, :3] * a_norm + light_canvas * (1.0 - a_norm)).astype(np.uint8)
    
    # Load target crop for comparison
    target_crop = Image.open(r"C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\target_portrait_crop.jpg")
    t_w, t_h = target_crop.size
    
    comp_d_pil = Image.fromarray(comp_dark).resize((int(t_h * w / h), t_h), Image.Resampling.LANCZOS)
    comp_l_pil = Image.fromarray(comp_light).resize((int(t_h * w / h), t_h), Image.Resampling.LANCZOS)
    
    total_w = t_w + comp_d_pil.width + comp_l_pil.width
    three_panel = Image.new("RGB", (total_w, t_h))
    three_panel.paste(target_crop, (0, 0))
    three_panel.paste(comp_d_pil, (t_w, 0))
    three_panel.paste(comp_l_pil, (t_w + comp_d_pil.width, 0))
    
    preview_path = r"C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\photoshop_compositing_comparison.jpg"
    three_panel.save(preview_path, format="JPEG", quality=95)
    print(f"Updated 3-Panel Preview saved to: {preview_path}")

if __name__ == "__main__":
    create_photoshop_grade_portrait()
