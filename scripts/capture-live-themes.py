import asyncio
import time
from playwright.async_api import async_playwright

async def capture_live_both():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await context.new_page()
        live_url = f'https://abhishekeb211.github.io/Profie-website.github.io/?cb={int(time.time())}'
        await page.goto(live_url, wait_until='networkidle')
        await asyncio.sleep(2)
        
        # 1. Capture Live Dark
        await page.screenshot(path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\live_submerged_dark.png', full_page=False)
        print('Live Dark captured!')
        
        # 2. Switch to Light Mode on live page
        await page.evaluate("""() => {
            document.body.classList.remove('dark-theme', 'hacker-theme', 'glass-theme');
            document.body.classList.add('light-theme');
            document.documentElement.setAttribute('data-theme', 'light');
        }""")
        await asyncio.sleep(1)
        await page.screenshot(path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\live_submerged_light.png', full_page=False)
        print('Live Light captured!')
        
        await browser.close()

if __name__ == '__main__':
    asyncio.run(capture_live_both())
