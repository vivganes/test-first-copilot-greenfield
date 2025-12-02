from playwright.async_api import async_playwright
from behave.api.async_step import async_run_until_complete
import allure

from helpers.db_helper import DBHelper

def before_all(context):
    context.db_helper = DBHelper()
    # Reset database before we start
    context.db_helper.execute_query_from_file("db_scripts/cleanup.sql")
    context.db_helper.execute_query_from_file("../db/tables.sql")

@async_run_until_complete
async def before_scenario(context, scenario):
    context.p = await async_playwright().start()

    if scenario.tags.__contains__("e2e"):
        browser = await context.p.chromium.launch(headless=False, channel="chrome")
        context.page = await browser.new_page()


@async_run_until_complete
async def after_scenario(context, scenario):
    await context.p.stop()

# Take screenshot if scenario fails
@async_run_until_complete
async def after_step(context, step):
    print(context._runner.formatters)
    if step.status == "failed":
        print(f"Step failed: {step.name}")
        screenshot_path = f"test-results/reports/html/screenshots/{step.name.replace(' ', '_').replace('\"', '')}.png"
        await context.page.screenshot(path=screenshot_path)
        print(f"Screenshot taken: {screenshot_path}")
        for formatter in context._runner.formatters:
            if formatter.name == "html-pretty":
                context.embed = formatter.embed           
            context.embed(mime_type="image/png", data=screenshot_path, caption="Screenshot")
        with open(screenshot_path, "rb") as f:
            allure.attach(f.read(), name="Screenshot", attachment_type=allure.attachment_type.PNG)
