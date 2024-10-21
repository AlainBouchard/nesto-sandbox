# nesto-sandbox

This is a sandbox playing with Nesto's QA environment.

## Test Plan

### 1. **Login Page Load**

| **ID** | **What to Test**                  | **How to Test**                                                                                                                                             |
|--------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1      | Page Load                         | Verify that the login page loads successfully by visiting the login URL. Ensure all elements (email, password, options, login button) are displayed correctly. |

### 2. **Email Field Tests**

| **ID** | **What to Test**                  | **How to Test**                                                                                                                                             |
|--------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 2      | Email Field - Empty               | Try submitting the login form with the email field left empty. Verify that an appropriate error message is shown (e.g., "Email is required").                |
| *3      | Email Field - Valid Email         | Enter a valid email (e.g., "test@example.com"). Verify that no error is displayed, and form submission proceeds correctly (if password is also valid).        |
| 4      | Email Field - Invalid Email Format| Enter invalid email formats (e.g., "test@", "test.com", "test@com"). Verify that an appropriate error message is displayed (e.g., "Invalid email address").   |
| 5      | Email Field - Long Email          | Enter an extremely long email address (e.g., 255+ characters). Verify that the system handles it appropriately and the correct error message is displayed.    |
| 6      | Email Field - Special Characters  | Enter email addresses with special characters (e.g., "user+test@example.com", "test_user@example.com"). Verify that these formats are accepted.              |

### 3. **Password Field Tests**

| **ID** | **What to Test**                  | **How to Test**                                                                                                                                             |
|--------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 7      | Password Field - Empty            | Try submitting the login form with the password field left empty. Verify that an appropriate error message is shown (e.g., "Password is required").          |
| *8      | Password Field - Valid Password   | Enter a valid password (e.g., meeting length requirements). Verify that the login form can be successfully submitted (if the email is also valid).           |
| 9      | Password Field - Invalid (Too Short)| Enter a password that is too short (e.g., less than the minimum length). Verify that an appropriate error message is shown (e.g., "Password is too short").  |
| 10     | Password Field - Special Characters| Enter a password with special characters (e.g., "@!#%"). Verify that these are accepted as part of the password.                                            |
| 11     | Password Field - Long Password    | Enter an extremely long password (e.g., 255+ characters). Verify that the system handles it appropriately and the correct error message is displayed.        |

### 4. **"Forgot Your Password?" Option**

| **ID** | **What to Test**                  | **How to Test**                                                                                                                                             |
|--------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 12     | "Forgot Your Password?" - Click   | Click on the "Forgot your password?" link. Verify that it redirects to the password reset page and the reset form is displayed.                              |
| 13     | "Forgot Your Password?" - Valid Email | Enter a valid email address and submit the password reset form. Verify that an email is sent to the user with instructions to reset the password.            |
| 14     | "Forgot Your Password?" - Invalid Email | Enter an invalid or non-existent email address on the password reset form. Verify that an appropriate error message is shown (e.g., "Email not found").      |
| 15     | "Forgot Your Password?" - Empty Email  | Try submitting the password reset form with the email field left empty. Verify that an error message is displayed (e.g., "Email is required").               |

### 5. **Login Button Tests**

| **ID** | **What to Test**                  | **How to Test**                                                                                                                                             |
|--------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 16     | Login Button - Valid Credentials  | Enter a valid email and password, and click the login button. Verify that the user is successfully logged in and redirected to the appropriate page.         |
| 17     | Login Button - Invalid Email      | Enter an invalid email (e.g., incorrect format or non-registered) and a valid password, then click the login button. Verify that an error message is shown.  |
| 18     | Login Button - Invalid Password   | Enter a valid email and an incorrect password, then click the login button. Verify that an error message is shown (e.g., "Invalid email or password").       |
| 19     | Login Button - Both Fields Invalid| Enter an invalid email and incorrect password, then click the login button. Verify that an error message is shown (e.g., "Invalid email or password").       |
| 20     | Login Button - Empty Fields       | Try clicking the login button with both the email and password fields left empty. Verify that appropriate error messages are shown for both fields.          |
| 21     | Login Button - Special Characters in Fields | Enter special characters in both email and password fields. Verify that the system handles special characters appropriately, rejecting invalid formats.      |

### 6. **"Don't Have an Account?" Option**

| **ID** | **What to Test**                  | **How to Test**                                                                                                                                             |
|--------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 22     | "Don't Have an Account?" - Click  | Click on the "Don’t have an account?" link. Verify that it redirects to the account creation/registration page.                                              |

### 7. **Session and Security Tests**

| **ID** | **What to Test**                  | **How to Test**                                                                                                                                             |
|--------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 23     | Login - Session Management        | After logging in successfully, verify that a session or token is created and is valid by checking the browser’s local storage or cookies.                    |
| 24     | Login - Failed Attempts Lockout   | Enter invalid credentials multiple times (e.g., 5 consecutive times). Verify that the account gets locked after a certain number of failed attempts.         |
| 25     | Login - Cross-Site Scripting (XSS)| Try injecting scripts into the email or password fields. Verify that the system properly escapes and rejects malicious scripts.                              |

---
