# GH Copilot code - starts

# GH Copilot code - starts

from behave import given, when, then
from behave.api.async_step import async_run_until_complete
from pages.registration_page import RegistrationPage

# GH Copilot code - starts

@given('the ShopSphere registration page is available')
@async_run_until_complete
async def step_registration_page_available(context):
    context.registration_page = RegistrationPage(context.page)
    import os
    url = os.getenv('STOREFRONT_URL', 'http://localhost:4001/registration')
    await context.registration_page.navigate_to(url)

@when('I register with:')
@async_run_until_complete
async def step_register_with_details(context):
    details = {row['email'] if 'email' in row else row['name']: row[list(row.keys())[1]] for row in context.table}
    await context.registration_page.fill_registration_form(details)
    await context.registration_page.submit_registration()

@then('I see a message "Please check your email to verify your account"')
@async_run_until_complete
async def step_see_verification_message(context):
    message = await context.registration_page.get_verification_message()
    assert message == "Please check your email to verify your account"

@then('my account is created with role "Customer"')
@async_run_until_complete
async def step_account_role_customer(context):
    email = context.table[0]['email'] if hasattr(context, 'table') and context.table else None
    assert email, "Email not found in registration table."
    # Get user id from User table
    user_row = context.db_helper.fetch_query("SELECT id FROM User WHERE email = ?", (email,))
    assert user_row, f"No user found with email {email}"
    user_id = user_row[0][0]
    # Check role in UserRole table
    role_row = context.db_helper.fetch_query("SELECT role FROM UserRole WHERE userId = ?", (user_id,))
    assert role_row and role_row[0][0] == "Customer", f"User role is not Customer: {role_row}"

@then('my account is created with status "Active"')
@async_run_until_complete
async def step_account_status_active(context):
    email = context.table[0]['email'] if hasattr(context, 'table') and context.table else None
    assert email, "Email not found in registration table."
    user_row = context.db_helper.fetch_query("SELECT status FROM User WHERE email = ?", (email,))
    assert user_row and user_row[0][0] == "Active", f"User status is not Active: {user_row}"

@then('my account creation timestamp is recorded')
@async_run_until_complete
async def step_account_creation_timestamp(context):
    email = context.table[0]['email'] if hasattr(context, 'table') and context.table else None
    assert email, "Email not found in registration table."
    user_row = context.db_helper.fetch_query("SELECT createdAt FROM User WHERE email = ?", (email,))
    assert user_row and user_row[0][0], f"User creation timestamp not recorded: {user_row}"

@then('my account has emailVerified set to false')
@async_run_until_complete
async def step_email_verified_false(context):
    email = context.table[0]['email'] if hasattr(context, 'table') and context.table else None
    assert email, "Email not found in registration table."
    user_row = context.db_helper.fetch_query("SELECT emailVerified FROM User WHERE email = ?", (email,))
    assert user_row and user_row[0][0] == 0, f"User emailVerified is not false: {user_row}"

@then('I cannot log in until email is verified')
@async_run_until_complete
async def step_cannot_login_until_verified(context):
    raise NotImplementedError("Step 'I cannot log in until email is verified' is not implemented.")
# GH Copilot code - end
# GH Copilot code - end
