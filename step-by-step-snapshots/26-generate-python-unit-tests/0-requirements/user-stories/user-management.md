# User Stories: User Management

Below is a numbered list of user stories for the User Management feature in ShopSphere, derived from the requirements and system context.

1. **As a new user, I want to register with my email, password, name, address, and phone number so that I can create an account on ShopSphere.**
	- Registration requires email, password, name, address, and phone number; all fields are mandatory.
	- Email must be unique and a verification email is sent upon registration.
	- Password is securely hashed and not stored in plain text.
	- Upon successful registration, the user account is created with status 'Active' and the user can log in after verifying their email.
2. **As a user, I want to securely log in and log out so that I can access my account and protect my information.**
3. **As a user, I want to recover my password via email with a secure reset link that expires in 24 hours so that I can regain access if I forget my password.**
4. **As a customer, I want to optionally sign up or log in using my Google or Facebook account so that I can access ShopSphere easily.**
5. **As a user, I want to update my profile details (name, address, phone number) so that my account information stays current.**
6. **As a user, I want to view my order history so that I can track my past purchases.**
7. **As a user, I want to delete my account and have my data anonymized after 30 days so that I can control my privacy in compliance with regulations.**
8. **As an admin, I want to manage (view, update, suspend, or delete) user accounts so that I can maintain platform integrity and security.**
9. **As a seller, I want to be verified before accessing seller features so that only authorized sellers can manage products.**
10. **As a user, I want my email to be verified before I can fully use my account so that my account is secure and communication is reliable.**
11. **As a user, I want my role (Customer, Seller, Admin) to determine what features and data I can access so that permissions are enforced.**
12. **As a user, I want to receive notifications (e.g., for password reset, verification, account changes) so that I am informed about important account activities.**

---

*These user stories are based on the requirements in `requirements.md`, the system context, and the user/entity model. They cover registration, authentication, role-based access, profile management, account deletion, and compliance.*
