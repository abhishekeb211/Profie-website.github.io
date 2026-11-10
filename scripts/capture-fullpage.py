import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        page = await b.new_page(viewport={'width': 1440, 'height': 900})
        await page.goto('https://abhishekeb211.github.io/Profie-website.github.io/', wait_until='networkidle')
        
        # Switch to light
        await page.evaluate('''() => {
            const btn = document.getElementById('theme-light-btn');
            if (btn) btn.click();
            const dot = document.querySelector('.cursor-dot');
            const outline = document.querySelector('.cursor-outline');
            if (dot) dot.style.display = 'none';
            if (outline) outline.style.display = 'none';
        }''')
        await asyncio.sleep(1.5)
        
        # Full page screenshot
        out_path = r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\live_white_fullpage.png'
        await page.screenshot(path=out_path, full_page=True)
        print('Captured live_white_fullpage.png successfully!')
        await b.close()

if __name__ == '__main__':
    asyncio.run(run())
