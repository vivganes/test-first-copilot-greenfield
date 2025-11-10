# GH Copilot code - starts
from pages.base_page import BasePage

# GH Copilot code - starts
class RegistrationPage(BasePage):
    def fill_registration_form(self, details):
        # Example: Use text labels to interact with UI fields
        self.enter_text('Email', details['email'])
        self.enter_text('Password', details['password'])
        self.enter_text('Name', details['name'])
        self.enter_text('Address Line 1', details['addressLine1'])
        self.enter_text('Address Line 2', details['addressLine2'])
        self.enter_text('City', details['city'])
        self.enter_text('State', details['state'])
        self.enter_text('Postal Code', details['postalCode'])
        self.enter_text('Country', details['country'])
        self.enter_text('Phone Number', details['phoneNumber'])

    def submit_registration(self):
        # Click the button with text label 'Register'
        self.click_button('Register')

    def get_verification_message(self):
        # Get the message displayed with text label
        return self.get_text('Please check your email to verify your account')
# GH Copilot code - end
# GH Copilot code - end
