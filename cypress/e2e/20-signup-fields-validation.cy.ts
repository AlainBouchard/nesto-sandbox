/// <reference types="cypress" />
import { SignupPageElements } from '../support/SignupPageElements';

describe('SignUp Page -> Fields validation', () => {
    let text: Record<string, Record<string, string>>;
    const language: string = Cypress.env('language') || 'en';

    before(() => {
        cy.fixture(`languages/signup/${language}`).then((loadedText) => {
            text = loadedText;
        });
    });
    
    beforeEach(() => {
        cy.nestoGoToSignupPage();
        cy.nestoToggleLanguage();
        cy.getDataTestId('createYourAccount').click();
    });
  
    it('ID-21.1: Should input a valid first name and verify no validation errors are displayed', () => {
        // Arrange
        const firstName: string = 'Jon';
        const inputLabelFirstName: string = text['fields']['firstName'];
        const errorMessage: string = text['labels']['required'];
        
        cy.getDataTestId(SignupPageElements.InputLabelFirstName)
            .should('have.text', inputLabelFirstName);

        cy.getDataTestId(SignupPageElements.FormErrorFirstName)
            .should('be.visible')
            .and('have.text', errorMessage);

        // Act
        cy.getDataTestId(SignupPageElements.FirstName)
            .clear()
            .type(firstName);

        // Assert
        cy.getDataTestId(SignupPageElements.FormErrorFirstName, 'not.exist');
    });

    it('ID-21.2: Should input valid and invalid first name lengths and verify validation errors', () => {
        // Arrange
        const tooLongMessage: string = text['labels']['tooLong'];
        const testCases = [
            { length: 63, valid: true },  // Valid case
            { length: 64, valid: true },  // Valid case
            { length: 65, valid: false }  // Invalid case
        ];
    
        testCases.forEach(({ length, valid }) => {
            // Act
            const firstName = 'a'.repeat(length);
            cy.getDataTestId(SignupPageElements.FirstName).clear().type(firstName);
    
            // Assert
            if (valid) {
                cy.getDataTestId(SignupPageElements.FormErrorFirstName, 'not.exist');
            } else {
                cy.getDataTestId(SignupPageElements.ValidationErrorsTooLong)
                    .should('be.visible')
                    .should('have.text', tooLongMessage);
            }
        });
    });

    /**
     * Failing: to validate with PO.
     * Expectations: No special characters (e.g., !@#$...) should be accepted for the first name
     *   and UI should give an error to the customer.
     * Current behaviors: Special characters can be added to the first name.
     * Priority: low
     * */ 
    it('ID-21.3: Should validate that special characters in the first name', () => {
        // Arrange
        const specialCharacterNames = ['@John', 'J#ohn', 'Joh%n'];
        const invalidFirstNameErrorMessage = 'Invalid first name';
    
        specialCharacterNames.forEach((name) => {
            // Act
            cy.getDataTestId(SignupPageElements.FirstName)
                .clear()
                .type(name);
    
            // Assert: Validation error for special characters
            cy.getDataTestId(SignupPageElements.ValidationErrorsIsRequired)
                .should('be.visible')
                .and('have.text', invalidFirstNameErrorMessage);
        });
    });    

    it('ID-22.1: Should input a valid last name and verify no validation errors are displayed', () => {
        // Arrange
        const inputLabelLastName: string = text['fields']['lastName']; 
        const formErrorLastName: string = text['labels']['required'];
        const lastName: string = 'Snow';

        cy.getDataTestId(SignupPageElements.InputLabelLastName)
            .should('have.text', inputLabelLastName);

        cy.getDataTestId(SignupPageElements.FormErrorLastName)
            .should('be.visible')
            .should('have.text', formErrorLastName);

        // Act
        cy.getDataTestId(SignupPageElements.LastName)
            .clear()
            .type(lastName);

        // Assert
        cy.getDataTestId(SignupPageElements.FormErrorLastName, 'not.exist');
    });

    it('ID-22.2: Should input valid and invalid last name lengths and verify validation errors', () => {
        // Arrange
        const tooLongMessage: string = text['labels']['tooLong'];
        const testCases = [
            { length: 63, valid: true },  // Valid case
            { length: 64, valid: true },  // Valid case
            { length: 65, valid: false }  // Invalid case
        ];
    
        testCases.forEach(({ length, valid }) => {
            // Act
            const lastName = 'a'.repeat(length);
            cy.getDataTestId(SignupPageElements.LastName).clear().type(lastName);
    
            // Assert
            if (valid) {
                cy.getDataTestId(SignupPageElements.FormErrorLastName, 'not.exist');
            } else {
                cy.getDataTestId(SignupPageElements.ValidationErrorsTooLong)
                    .should('be.visible')
                    .should('have.text', tooLongMessage);
            }
        });
    });

    /**
     * Failing: to validate with PO.
     * Expectations: No special characters (e.g., !@#$...) should be accepted for the last name
     *   and UI should give an error to the customer.
     * Current behaviors: Special characters can be added to the last name.
     * Priority: low
     * */ 
    it('ID-22.3: Should validate that special characters in the last name', () => {
        // Arrange
        const specialCharacterNames = ['@Snow', 'S#now', 'Sn%ow'];
        const invalidLastNameErrorMessage = 'Invalid last name';
    
        specialCharacterNames.forEach((name) => {
            // Act
            cy.getDataTestId(SignupPageElements.LastName)
                .clear()
                .type(name);
    
            // Assert
            cy.getDataTestId(SignupPageElements.FormErrorLastName)
                .should('be.visible')
                .and('have.text', invalidLastNameErrorMessage);
        });
    });
     
    it('ID-23.1: Should validate email field with multiple invalid formats email', () => {
        // Arrange
        // Adding an SQL Injection Test - TODO: create a spec file with injection tests.
        const invalidEmails: string[] = ['test@', 'test.com', 'test@com', '@test.com', 'test@.com', 'test@@test.com', ' OR \'1\'=\'1\'; --@test.com']; 
        const inputLabelEmail: string = text['fields']['email'];
        const requiredEmailMessage: string = text['labels']['required'];
        const invalidEmailMessage: string = text['labels']['invalidEmail'];

        cy.getDataTestId(SignupPageElements.InputLabelEmail)
            .should('have.text', inputLabelEmail);
        
        cy.getDataTestId(SignupPageElements.FormErrorEmail)
            .should('be.visible')
            .and('have.text', requiredEmailMessage);
    
        invalidEmails.forEach((invalidEmail) => {
            // Act
            cy.getDataTestId(SignupPageElements.Email)
                .clear()
                .type(invalidEmail);

            // Assert
            cy.getDataTestId(SignupPageElements.FormErrorEmail)
                .should('be.visible')
                .and('have.text', invalidEmailMessage);
        });
    });

    it('ID-23.2: Should validate email field with valid email', () => {
        // Arrange
        const validEmail: string = 'jon.snow@test.com';
        const requiredEmailMessage: string = text['labels']['required'];
                
        cy.getDataTestId(SignupPageElements.FormErrorEmail)
            .should('be.visible')
            .and('have.text', requiredEmailMessage);
        
        // Act
        cy.getDataTestId(SignupPageElements.Email)
            .clear()
            .type(validEmail);

        // Assert    
        cy.getDataTestId(SignupPageElements.FormErrorEmail, 'not.exist');
    });

    it('ID-23.3: Should validate that 128 character emails are accepted and 129 character emails show a too long error', () => {
        // Arrange
        const validEmail: string = `jon.snow+test${'a'.repeat(106)}@test.com`;  // 128 characters
        const invalidEmail: string = `jon.snow+test${'a'.repeat(107)}@test.com`;  // 129 characters
        const tooLongErrorMessage: string = text['labels']['tooLong'];
    
        // Act: Input 128 character email (valid)
        cy.getDataTestId(SignupPageElements.Email)
            .clear()
            .type(validEmail);
    
        // Assert: No validation error should appear for 128 characters
        cy.getDataTestId(SignupPageElements.ValidationErrorsTooLong, 'not.exist');
    
        // Act: Input 129 character email (invalid)
        cy.getDataTestId(SignupPageElements.Email)
            .clear()
            .type(invalidEmail);
    
        // Assert: Validation error for 129 characters
        cy.getDataTestId(SignupPageElements.ValidationErrorsTooLong)
            .should('be.visible')
            .and('have.text', tooLongErrorMessage);
    });

    /**
     * Failing: to validate with PO.
     * Expectations: The phone field UI should ensure the phone number is complete and valid.
     * Current behaviors: A partial phone number is accepted by UI.
     * Priority: high
     * */ 
    it('ID-24.1: Should validate mobile field with multiple invalid mobile phone formats', () => {
        const invalidPhones: string[] = ['5', '555-555-555', 'ABC-DEF-GHIJ', '555-555-555A'];
        const invalidPhoneMessage: string = text['labels']['invalidPhone'];
    
        // The UI field or mask isn't handling errors properly when phone number is incomplete, to verify with PO.     
        invalidPhones.forEach((invalidPhone) => {
            cy.getDataTestId(SignupPageElements.Phone)
                .clear()
                .type(invalidPhone);
    
            cy.getDataTestId(SignupPageElements.FormErrorPhone)
                .should('be.visible')
                .and('have.text', invalidPhoneMessage);
        });
    });

    it('ID-24.2: Should validate mobile field with valid mobile number', () => {
        // Arrange
        const validPhone: string = '514-1234567';
        const inputLabelPhone: string = text['fields']['phone'];
        const requiredPhoneMessage: string = text['labels']['required'];

        cy.getDataTestId(SignupPageElements.InputLabelPhone)
            .should('have.text', inputLabelPhone);
        
        cy.getDataTestId(SignupPageElements.FormErrorPhone)
            .should('be.visible')
            .and('have.text', requiredPhoneMessage);
    
        // Act
        cy.getDataTestId(SignupPageElements.Phone)
            .clear()
            .type(validPhone);

        // Assert
        cy.getDataTestId(SignupPageElements.FormErrorPhone, 'not.exist');
    });

    it('ID-25.1: Should validate password field with invalid passwords', () => {
        // Arrange
        const invalidPasswordMessage: string = text['labels']['invalidPassword'];
        const invalidPasswords: string[] = [
            'Short1Short',              // Edge case 11 chars
            'alllowercase12',           // No uppercase letter
            'ALLUPPERCASE12',           // No lowercase letter
            'NoNumbersHere',            // No number
            '123456789012'              // No letters, only numbers
        ];
    
        invalidPasswords.forEach((invalidPassword) => {
            // Act
            cy.getDataTestId(SignupPageElements.Password)
                .clear()
                .type(invalidPassword);
            
            // Assert
            cy.getDataTestId(SignupPageElements.ValidationErrorsInvalidPassword)
                .should('be.visible')
                .and('have.text', invalidPasswordMessage);
        });
    });

    it('ID-25.2: Should validate password field with valid passwords', () => {
        // Arrange
        const inputPassword: string = text['fields']['password'];
        const requiredPasswordMessage: string = text['labels']['required'];
        const passwordComplexityMessage: string = text['labels']['passwordComplexity'];
        const validPasswords: string[] = [
            'ValidPass123', // Edge case 12 chars
            'ValidPass123ValidPass123ValidPas' // Edge case 32 chars
        ];

        cy.getDataTestId(SignupPageElements.InputLabelPassword)
            .should('have.text', inputPassword);

        cy.getDataTestId(SignupPageElements.FormWarnPasswordComplexity)
            .should('be.visible')
            .and('have.text', passwordComplexityMessage);

        cy.getDataTestId(SignupPageElements.FormErrorPassword)
            .should('be.visible')
            .and('have.text', requiredPasswordMessage);

        validPasswords.forEach((validPassword) => {
            // Act
            cy.getDataTestId(SignupPageElements.Password)
                .clear()
                .type(validPassword);

            // Assert
            cy.getDataTestId(SignupPageElements.ValidationErrorsInvalidPassword, 'not.exist');
        });
    });

    it('ID-26: Should validate password confirmation field with same value as password field', () => {
        type TestData = {
            password: string,
            passwordConfirmation: string
        };

        const invalidPasswords: TestData[] = [
            { password: 'password', passwordConfirmation: 'wrong' },
            { password: 'password', passwordConfirmation: 'passwor' },
            { password: '', passwordConfirmation: 'password' }
        ];

        // Arrange
        const validPassword: string = 'ValidPass123'; 
        const inputPasswordConfirm: string = text['fields']['passwordConfirm'];
        const requiredPasswordConfirmMessage: string = text['labels']['required'];
        const invalidPasswordConfigMessage: string = text['labels']['invalidPasswordConfirmation'];

        cy.getDataTestId(SignupPageElements.InputLabelPasswordConfirm)
            .should('have.text', inputPasswordConfirm);
        
        cy.getDataTestId(SignupPageElements.FormErrorPasswordConfirm)
            .should('be.visible')
            .and('have.text', requiredPasswordConfirmMessage);

        invalidPasswords.forEach((invalidPassword) => {
            // Arrange
            cy.getDataTestId(SignupPageElements.PasswordConfirm)
                .clear();
            cy.getDataTestId(SignupPageElements.Password)
                .clear();
            cy.getDataTestId(SignupPageElements.ValidationErrorsPasswordsMustMatch, 'not.exist');
    
            // Act
            if (invalidPassword.password.length > 0) {
                cy.getDataTestId(SignupPageElements.Password)
                    .type(invalidPassword.password);
            }

            cy.getDataTestId(SignupPageElements.PasswordConfirm)
                .type(invalidPassword.passwordConfirmation);

            // Assert
            cy.getDataTestId(SignupPageElements.ValidationErrorsPasswordsMustMatch)
                .should('be.visible')
                .and('have.text', invalidPasswordConfigMessage);
        });
    
        // Assert
        cy.getDataTestId(SignupPageElements.Password)
            .clear()
            .type(validPassword);

        cy.getDataTestId(SignupPageElements.PasswordConfirm)
            .clear()
            .type(validPassword);
            
        cy.getDataTestId(SignupPageElements.ValidationErrorsPasswordsMustMatch, 'not.exist');
    });

    it('ID-27: Should validate the province field with same ', () => {
        type TestData = {
            province: string,
            expected: string
        };

        // Arrange
        const provinces: TestData[] = [
            { province: 'ontario', expected: 'Ontario' },
            { province: 'qu', expected: text['fields']['provinceQuebec'] },
        ];
        
        const inputProvince: string = text['fields']['province'];

        cy.getDataTestId(SignupPageElements.SelectLabelProvince)
            .should('have.text', inputProvince);

        provinces.forEach((province) => {
            // Act
            cy.getDataTestId(SignupPageElements.Province)
                .type(`${province.province}{enter}`);

            // Assert
            cy.get('#select_province')
                .should('exist')
                .and('have.text', province.expected);
        });
    });

    it('ID-28: Should check and uncheck the leadDistributeConsentAgreement checkbox', () => {        
        // Arrange
        const agreementMessage: string = text['labels']['agreement'];
        const policyMessage: string = text['labels']['policy'];

        cy.getDataTestId(SignupPageElements.GetAQuoteShortPartnerAgreementAndEmailV3)
            .should('have.text', agreementMessage);
        
        cy.getDataTestId(SignupPageElements.ReadOurPolicyV2)
            .should('have.text', policyMessage);

        // Act and Assert
        cy.getDataTestId(SignupPageElements.LeadDistributeConsentAgreement)
            .check()
            .should('be.checked');
    
        cy.getDataTestId(SignupPageElements.LeadDistributeConsentAgreement)
            .uncheck({force: true}) // object is covered and lower elements don't have data-test-id attributes.
            .should('not.be.checked');
    });
});
