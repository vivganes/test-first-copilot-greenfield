from behave import given, then, when
from behave.api.async_step import async_run_until_complete


from pages.google_page import GooglePage

@given(u'Raj is on the Google search page')
@async_run_until_complete
async def is_on_google_search_page(context):
    context.google_page = GooglePage(context.page)
    await context.google_page.navigate_to("https://www.google.com")


@when(u'he searches for "{term}"')
@async_run_until_complete
async def searching_for_term(context, term):
    await context.google_page.search(term)


@then(u'he sees search results related to "{term}"')
@async_run_until_complete
async def sees_search_results(context, term):
    results = await context.google_page.get_search_results()
    assert results is not None
    assert term in results