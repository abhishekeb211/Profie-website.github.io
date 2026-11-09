import asyncio
import time
import requests
import cv2
import numpy as np
from playwright.async_api import async_playwright

LIVE_URL = "https://abhishekeb211.github.io/Profie-website.github.io/"
CSS_URL = f"{LIVE_URL}css/components.css"
TARGET_IMG = r"D:\Abhishek Website\images\website-uiux-terminal-prismatic-spectrum.jpg"
OUT_SCREENSHOT = r"C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\live_final_verification.png"
OUT_COMPARISON = r"C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\visual_audit_final_comparison.jpg"

def wait_for_cdn():
    print("Checking live CDN for latest commit (q-cyan)...")
    for attempt in range(1, 20):
        try:
            r = requests.get(f"{CSS_URL}?cache_bust={time.time()}", timeout=10)
            if "q-cyan" in r.text:
                print(f"CDN updated on attempt {attempt}!")
                return True
        except Exception as e:
            print(f"Attempt {attempt} error: {e}")
        time.sleep(6)
    print("Timed out waiting for CDN.")
    return False

async def capture_live():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await context.new_page()
        # Navigate to live website with cache-bust
        url = f"{LIVE_URL}?cb={int(time.time())}"
        await page.goto(url, wait_until='networkidle')
        await asyncio.sleep(2)
        await page.screenshot(path=OUT_SCREENSHOT, full_page=False)
        print("Live screenshot captured!")
        await browser.close()

def generate_comparison():
    img_target = cv2.imread(TARGET_IMG)
    img_live = cv2.imread(OUT_SCREENSHOT)
    
    h, w, _ = img_target.shape
    img_live_resized = cv2.resize(img_live, (w, h))
    
    # Luminance
    gray_t = cv2.cvtColor(img_target, cv2.COLOR_BGR2GRAY)
    gray_l = cv2.cvtColor(img_live_resized, cv2.COLOR_BGR2GRAY)
    lum_t = np.mean(gray_t)
    lum_l = np.mean(gray_l)
    
    # Histogram correlations
    hsv_t = cv2.cvtColor(img_target, cv2.COLOR_BGR2HSV)
    hsv_l = cv2.cvtColor(img_live_resized, cv2.COLOR_BGR2HSV)
    hist_t = cv2.calcHist([hsv_t], [0, 1], None, [50, 60], [0, 180, 0, 256])
    hist_l = cv2.calcHist([hsv_l], [0, 1], None, [50, 60], [0, 180, 0, 256])
    cv2.normalize(hist_t, hist_t, 0, 1, cv2.NORM_MINMAX)
    cv2.normalize(hist_l, hist_l, 0, 1, cv2.NORM_MINMAX)
    hsv_corr = cv2.compareHist(hist_t, hist_l, cv2.HISTCMP_CORREL)
    
    rgb_corrs = []
    for i in range(3):
        ht = cv2.calcHist([img_target], [i], None, [256], [0, 256])
        hl = cv2.calcHist([img_live_resized], [i], None, [256], [0, 256])
        cv2.normalize(ht, ht, 0, 1, cv2.NORM_MINMAX)
        cv2.normalize(hl, hl, 0, 1, cv2.NORM_MINMAX)
        rgb_corrs.append(cv2.compareHist(ht, hl, cv2.HISTCMP_CORREL))
    avg_rgb_corr = np.mean(rgb_corrs)
    
    print(f"Target Luminance: {lum_t:.2f}/255")
    print(f"Live Luminance: {lum_l:.2f}/255")
    print(f"HSV Correlation: {hsv_corr*100:.2f}%")
    print(f"RGB Correlation: {avg_rgb_corr*100:.2f}%")
    
    # Composite
    target_h, target_w = 600, int(600 * w / h)
    live_h, live_w = 600, int(600 * img_live.shape[1] / img_live.shape[0])
    
    t_small = cv2.resize(img_target, (target_w, target_h))
    l_small = cv2.resize(img_live, (live_w, live_h))
    
    composite = np.zeros((670, target_w + live_w + 40, 3), dtype=np.uint8)
    composite[:] = (12, 12, 18)
    
    composite[55:655, 10:10+target_w] = t_small
    composite[55:655, 30+target_w:30+target_w+live_w] = l_small
    
    cv2.putText(composite, "TARGET MOCKUP (Prismatic Quantum)", (20, 38), cv2.FONT_HERSHEY_SIMPLEX, 0.72, (0, 255, 255), 2)
    cv2.putText(composite, f"LIVE DEPLOYED WEBSITE ({avg_rgb_corr*100:.1f}% Match)", (40+target_w, 38), cv2.FONT_HERSHEY_SIMPLEX, 0.72, (0, 255, 128), 2)
    
    cv2.imwrite(OUT_COMPARISON, composite)
    print("Saved final visual audit comparison image!")

if __name__ == "__main__":
    wait_for_cdn()
    asyncio.run(capture_live())
    generate_comparison()
