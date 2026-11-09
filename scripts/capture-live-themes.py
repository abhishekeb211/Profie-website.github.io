import asyncio
import time
from PIL import Image
from playwright.async_api import async_playwright

async def capture_live_both():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await context.new_page()
        
        live_url = f'https://abhishekeb211.github.io/Profie-website.github.io/?v={int(time.time())}'
        print(f'Loading live {live_url}...')
        await page.goto(live_url, wait_until='networkidle')
        await asyncio.sleep(2)

        # Hide cursor dot for clean screenshot
        await page.mouse.move(0, 0)
        await page.evaluate('''() => {
            const dot = document.querySelector('.cursor-dot');
            const outline = document.querySelector('.cursor-outline');
            if (dot) dot.style.display = 'none';
            if (outline) outline.style.display = 'none';
        }''')
        
        # 1. Switch to Hacker Mode on live page and capture
        await page.evaluate('''() => {
            const hBtn = document.getElementById('theme-hacker-btn') || document.getElementById('theme-dark-btn');
            if (hBtn) hBtn.click();
        }''')
        await asyncio.sleep(1)
        hacker_path = r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\live_hacker_mode.png'
        await page.screenshot(path=hacker_path, full_page=False)
        print('Live Hacker Mode captured!')
        
        # 2. Switch to Light / White Mode on live page and capture
        await page.evaluate('''() => {
            const lBtn = document.getElementById('theme-light-btn');
            if (lBtn) lBtn.click();
        }''')
        await asyncio.sleep(1)
        white_path = r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\live_white_mode.png'
        await page.screenshot(path=white_path, full_page=False)
        print('Live White Mode captured!')

        # Build comparison
        im_h = Image.open(hacker_path)
        im_w = Image.open(white_path)
        w, h = im_h.size
        combo = Image.new('RGB', (w, h * 2))
        combo.paste(im_h, (0, 0))
        combo.paste(im_w, (0, h))
        combo.save(
            r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\live_hacker_vs_white_comparison.jpg',
            quality=92
        )
        print('Saved Live Hacker vs White comparison image!')
        
        await browser.close()

if __name__ == '__main__':
    asyncio.run(capture_live_both())
