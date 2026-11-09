import asyncio
import os
from PIL import Image
from playwright.async_api import async_playwright

async def capture_local():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # Desktop context
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await context.new_page()
        
        file_url = 'file:///' + os.path.abspath('index.html').replace('\\', '/')
        print(f'Navigating to {file_url}...')
        await page.goto(file_url, wait_until='networkidle')
        await asyncio.sleep(1)

        # Move mouse off screen & hide cursor dot
        await page.mouse.move(0, 0)
        await page.evaluate('''() => {
            const dot = document.querySelector('.cursor-dot');
            const outline = document.querySelector('.cursor-outline');
            if (dot) dot.style.display = 'none';
            if (outline) outline.style.display = 'none';
        }''')

        # 1. Ensure Hacker Mode is active
        hacker_btn = page.locator('#theme-hacker-btn')
        if await hacker_btn.count() > 0:
            await hacker_btn.click()
            await asyncio.sleep(0.8)
        else:
            await page.evaluate('''() => {
                document.body.classList.remove('light-theme', 'dark-theme');
                document.body.classList.add('hacker-theme');
                document.documentElement.setAttribute('data-theme', 'hacker');
            }''')
            await asyncio.sleep(0.8)

        hacker_path = r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\local_hacker_mode.png'
        await page.screenshot(path=hacker_path, full_page=False)
        print('Captured Local Hacker Mode!')

        # 2. Click Light / White Mode button
        light_btn = page.locator('#theme-light-btn')
        if await light_btn.count() > 0:
            await light_btn.click()
            await asyncio.sleep(0.8)
        else:
            await page.evaluate('''() => {
                document.body.classList.remove('hacker-theme');
                document.body.classList.add('light-theme');
                document.documentElement.setAttribute('data-theme', 'light');
            }''')
            await asyncio.sleep(0.8)

        white_path = r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\local_white_mode.png'
        await page.screenshot(path=white_path, full_page=False)
        print('Captured Local White Mode!')

        # 3. Mobile Viewport (390 x 844)
        mobile_context = await browser.new_context(viewport={'width': 390, 'height': 844})
        m_page = await mobile_context.new_page()
        await m_page.goto(file_url, wait_until='networkidle')
        await asyncio.sleep(1)

        await m_page.evaluate('''() => {
            const dot = document.querySelector('.cursor-dot');
            const outline = document.querySelector('.cursor-outline');
            if (dot) dot.style.display = 'none';
            if (outline) outline.style.display = 'none';
            const hBtn = document.getElementById('theme-hacker-btn');
            if (hBtn) hBtn.click();
        }''')
        await asyncio.sleep(0.5)
        await m_page.screenshot(
            path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\mobile_hacker_mode.png',
            full_page=False
        )
        print('Captured Mobile Hacker Mode!')

        await m_page.evaluate('''() => {
            const lBtn = document.getElementById('theme-light-btn');
            if (lBtn) lBtn.click();
        }''')
        await asyncio.sleep(0.5)
        await m_page.screenshot(
            path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\mobile_white_mode.png',
            full_page=False
        )
        print('Captured Mobile White Mode!')

        # Build side-by-side comparison
        im_hacker = Image.open(hacker_path)
        im_white = Image.open(white_path)
        w, h = im_hacker.size
        combo = Image.new('RGB', (w, h * 2))
        combo.paste(im_hacker, (0, 0))
        combo.paste(im_white, (0, h))
        combo.save(
            r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\hacker_vs_white_comparison.jpg',
            quality=92
        )
        print('Saved Hacker vs White comparison image!')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(capture_local())
