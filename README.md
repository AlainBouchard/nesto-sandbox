# nesto-sandbox

## What?

This is a sandbox to play with Nesto's QA environment and Cypress.  It is using Cypress, Typescript, ESLint, Faker, etc.

The Nesto QA URL is: https://app.qa.nesto.ca/

## How?

Clone the project from this GitHub link: [nesto-sandbox](https://github.com/AlainBouchard/nesto-sandbox)

### With Docker Image

It's easy to use in order to avoid Node.JS local configuration, and in order to run as it would run in CI pipeline.

Instructions:

1. Make sure to have Docker installed on your computer: [Docker Get Started](https://www.docker.com/get-started/)
2. From CLI: 
    ```sh
    % docker build -t nesto-sandbox:latest .
    ````
3. Verify the docker image availability:
    ```sh
    % docker images
    ```

    ```text
    REPOSITORY      TAG       IMAGE ID       CREATED        SIZE
    nesto-sandbox   latest    3184648fa500   11 hours ago   1.91GB
    ```
4. Run the Cypress Tests using the docker image:
    ```sh
    % docker run -e LANG=en -it nesto-sandbox:latest
    ```
    Where LANG is the environment variable for the language, use either `fr` or `en` values.
5. Wait for the test to run and complete.

### With Node.js

This method is better in order to modify the test suite.

The `node` and `npm` versions used for this project are:

```sh
% node --version
v22.9.0

% npm --version
10.8.3
```

Instructions:

1. Install Node.js by following the instructions: [node.js installation](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
2. Install the dependencies:
    ```sh
    % npm ci
    ```
    Using `npm ci` instead of `npm install` will make the tests more stable since it will use the versions from the `package-lock.json` file.  It is better for reproducibility.

3. Run the tests:

    Run the tests with the English UI (default) language:
    ```sh
    % npm run cypress:run:en
    ```

    Or with the French UI language:
    ```sh
    % npm run cypress:run:fr
    ```

4. Wait for the test to run and complete.

## What? (Test Plan)

This is a limited subset of tests and use cases and more tests could be added.  For example, this sandbox does assume that the Login Page to SignUp page flow was tested earlier in the test strategy.

Criteria for this project:

1. Automate positive and negative test cases that you could think of for
the Signup page
2. Add coverage for fields, labels
3. Validate that the API for the account creation returns 201 status
code and validate that the body response contains the entered
information in the form
4. Handle ability to run your test suite against selected language from
the UI
5. Use typescript in cypress if you have experience (is a bonus)
6. If you discover any bugs, please create a report (attach .txt file or
Google Doc)

### SignUp Page - Load

| ID   | What                                                                 | How                                                                                                                                                                                                                         |
|------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID-11 | Validate that all required `data-test-id` elements exist on the page | Verify that the following elements are present: `firstName`, `lastName`, `email`, `phone`, `passwordConfirm`, `select_label-province`, `leadDistributeConsentAgreement`, `createYourAccount`, etc., using `cy.getDataTestId()`. |
| ID-12 | Validate that the page title is displayed and matches the expected text | Use the fixture to load the page title and assert that the element `form_signup_title` is visible and has the correct text, based on the language.                                                                            |
| ID-13 | Validate that the UI language changes when language is toggled       | Toggle the language between English and French using `cy.nestoToggleLanguage()`, then assert that the title matches the expected text ("Create a nesto account" for English, "Créez un compte nesto" for French).             |
| ID-14 | Validate that the form data remains after switching language         | Input "Jon" in the `firstName` field, toggle the language from French to English using `cy.nestoToggleLanguage()`, and assert that the input value remains the same after the language switch.                                 |

### SignUp Page - Fields Validation

| ID        | What                                                                                  | How                                                                                                                                                    |
|-----------|---------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID-21.1   | Validate that the first name field accepts valid input                                | Verify no validation errors for the `firstName` field when a valid name (e.g., 'Jon') is entered.                                                      |
| ID-21.2   | Validate first name field with valid and invalid lengths                              | Test the `firstName` field with 63, 64 (valid), and 65 (invalid) characters, and assert validation for character limit (`tooLong` error).               |
| ID-21.3   | Validate first name field with special characters                                     | Test the `firstName` field with special characters (e.g., '@John', 'J#ohn') and check for validation error (`Invalid first name`).                      |
| ID-22.1   | Validate that the last name field accepts valid input                                 | Verify no validation errors for the `lastName` field when a valid name (e.g., 'Snow') is entered.                                                      |
| ID-22.2   | Validate last name field with valid and invalid lengths                               | Test the `lastName` field with 63, 64 (valid), and 65 (invalid) characters, and assert validation for character limit (`tooLong` error).                |
| ID-22.3   | Validate last name field with special characters                                      | Test the `lastName` field with special characters (e.g., '@Snow', 'S#now') and check for validation error (`Invalid last name`).                        |
| ID-23.1   | Validate email field with multiple invalid email formats                              | Test the `email` field with invalid formats (e.g., 'test@', 'test.com') and assert validation error (`Invalid email`).                                  |
| ID-23.2   | Validate email field with valid email                                                 | Test the `email` field with a valid email (e.g., 'jon.snow@test.com') and ensure no validation errors.                                                  |
| ID-23.3   | Validate email field with edge cases for character length                             | Test the `email` field with 128 characters (valid) and 129 characters (invalid), and assert no error for 128 chars but show a `tooLong` error for 129.  |
| ID-24.1   | Validate phone field with multiple invalid phone number formats                       | Test the `phone` field with invalid phone numbers (e.g., '555-555-555', 'ABC-DEF-GHIJ') and assert validation error (`Invalid phone`).                  |
| ID-24.2   | Validate phone field with valid phone number                                          | Test the `phone` field with a valid phone number (e.g., '514-1234567') and ensure no validation errors.                                                 |
| ID-25.1   | Validate password field with invalid passwords                                        | Test the `password` field with invalid passwords (e.g., 'Short1Short', 'alllowercase12') and assert validation error (`Invalid password`).              |
| ID-25.2   | Validate password field with valid passwords                                          | Test the `password` field with valid passwords (e.g., 'ValidPass123') and ensure no validation errors.                                                  |
| ID-26     | Validate password confirmation field with mismatched passwords                       | Test the `passwordConfirm` field with mismatched passwords and assert validation error (`Passwords must match`).                                         |
| ID-27     | Validate the province field with valid inputs                                         | Test the `province` field with valid provinces (e.g., 'Ontario', 'Quebec') and ensure the correct value is selected.                                    |
| ID-28     | Validate the `leadDistributeConsentAgreement` checkbox can be checked/unchecked       | Check and uncheck the `leadDistributeConsentAgreement` checkbox and verify its checked/unchecked state.                                                 |

### SignUp Page - Form Submission

| ID        | What                                                                                  | How                                                                                                                                                         |
|-----------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ID-31     | Fill the form with valid values and submit                                            | Intercept the API call to `/api/accounts`. Fill the form with valid values, submit it, and verify the response (status code 201 and correct account data).   |
| ID-32     | Submit the form for an existing user and expect a conflict                            | Intercept the API call to `/api/accounts`. Fill the form with data for an existing user, submit it, and verify a conflict response (status code 409).        |

## Issues Report

The following are issues from this test suite. Some may be expected by PO (or PM).  It should be discussed within the team so that either the feature or the test can be fixed and the issue closed. Every organization will have their own best practices and guidelines.

| Issue ID | Test Case ID | Summary | Steps to Reproduce | Expected Behavior | Actual Behavior | Priority |
|----------|--------------|---------|--------------------|-------------------|-----------------|----------|
| ISSUE-001 | ID-14 | Form data is cleared when switching languages | 1. Go to the signup page <br> 2. Toggle the language to French <br> 3. Enter a first name <br> 4. Toggle the language back to English | The form data should persist after switching languages | The form data is deleted when toggling languages | Low |
| ISSUE-002 | ID-21.3 | Special characters are accepted in the first name field | 1. Go to the signup page <br> 2. Toggle the language to French <br> 3. Enter a first name with special characters (e.g., `@John`, `J#ohn`, `Joh%n`) <br> 4. Submit the form | The system should not allow special characters in the first name and show an error message | Special characters are allowed in the first name | Low |
| ISSUE-003 | ID-22.3 | Special characters are accepted in the last name field | 1. Go to the signup page <br> 2. Toggle the language to French <br> 3. Enter a last name with special characters (e.g., `@Snow`, `S#now`, `Sn%ow`) <br> 4. Submit the form | The system should not allow special characters in the last name and show an error message | Special characters are allowed in the last name | Low |
| ISSUE-004 | ID-24.1 | Partial phone numbers are accepted by the UI | 1. Go to the signup page <br> 2. Toggle the language to French <br> 3. Enter partial or invalid phone numbers (e.g., `5`, `555-555-555`, `ABC-DEF-GHIJ`, `555-555-555A`) <br> 4. Submit the form | The system should validate and reject incomplete phone numbers | Partial phone numbers are accepted by the UI, and the form proceeds without error | High |

## Then?

Many tests could be added, like Security Tests.  I've added a `Cypress Custom Command` that is using API instead of UI.  The plan was to add Security Tests (e.g., `SQL injection`) using the API but I've thought that could be breaking the QA environment and it wasn't part of the scope of this sandbox project.  Since Cypress Custom Command is already there the it would be quite easy and quick to add.
