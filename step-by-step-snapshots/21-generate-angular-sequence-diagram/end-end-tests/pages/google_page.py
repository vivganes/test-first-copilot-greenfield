from playwright.async_api import Page

from pages.base_page import BasePage

class GooglePage(BasePage):
    def __init__(self, page: Page):
        super().__init__(page)
        self.search_box = page.locator("[name='q']")

    async def enter_search_query(self, query: str):
        await self.search_box.fill(query)

    async def press_enter_key(self):
        await self.search_box.press("Enter")

    async def search(self, query: str):
        await self.enter_search_query(query)
        await self.press_enter_key()
    
    async def get_search_results(self):
        return await self.page.content()