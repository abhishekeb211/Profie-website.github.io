import asyncio
import os
from playwright.async_api import async_playwright

async def capture_local():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        page = await context.new_page()
        
        file_url = 'file:///' + os.path.abspath('index.html').replace('\\', '/')
        await page.goto(file_url, wait_until='networkidle')
        await asyncio.sleep(1.5)
        
        # 1. Capture Dark Mode (Default)
        await page.screenshot(
            path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\local_dual_dark.png',
            full_page=False
        )
        print('Captured Local Dark Mode!')
        
        # 2. Click the Light Mode button on the new toggle pill
        light_btn = page.locator('#theme-light-btn')
        if await light_btn.count() > 0:
            await light_btn.click()
            await asyncio.sleep(1)
        else:
            await page.evaluate("""() => {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                document.documentElement.setAttribute('data-theme', 'light');
            }""")
            await asyncio.sleep(1)
            
        await page.screenshot(
            path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\local_dual_light.png',
            full_page=False
        )
        print('Captured Local Light Mode!')
        
        # Also capture zoomed hero section
        hero = page.locator('.hero-prismatic-stage')
        if await hero.count() > 0:
            await hero.screenshot(
                path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\local_hero_light_zoom.png'
            )
            print('Captured Hero Light Zoom!')
            
        # Switch back to dark to capture dark hero zoom
        dark_btn = page.locator('#theme-dark-btn')
        if await dark_btn.count() > 0:
            await dark_btn.click()
            await asyncio.sleep(1)
            if await hero.count() > 0:
                await hero.screenshot(
                    path=r'C:\Users\Abhis\.gemini\antigravity\brain\c4c63715-5705-4a12-be1d-04e0adb03b64\local_hero_dark_zoom.png'
                )
                print('Captured Hero Dark Zoom!')
                
        await browser.close()

if __name__ == '__main__':
    asyncio.run(capture_local())
