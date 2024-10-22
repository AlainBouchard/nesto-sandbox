/// <reference types="cypress" />
import { faker } from '@faker-js/faker'; 
import { SignupPageElements } from '../support/SignupPageElements';

// Define a type for form data
type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    province: string;
    leadDistributeConsentAgreement: boolean;
};

// Define a type for the API response
type AccountResponse = {
    account: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        region: string;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        [key: string]: any;  // Additional properties can be added if needed
    };
    token: {
        accessToken: string;
        tokenType: string;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        [key: string]: any;  // Additional properties can be added if needed
    };
};

describe('SignUp Page -> From submission', () => {
    let formData: FormData;

    beforeEach(() => {
        cy.nestoGoToSignupPage();
        cy.nestoToggleLanguage();
    });


    before(() => {
        formData = {
            firstName: 'Jon',
            lastName: 'Snow',
            email: `jon.snow+test${faker.number.int({ min: 10000000, max: 99999999 })}@test.com`,
            phone: '514-555-1234',
            password: 'ValidPass123',
            province: 'QC',
            leadDistributeConsentAgreement: true
        };    
    });

    it('ID-31: Should fill the form with valid values and submit', () => {
        // Arrange
        cy.intercept('POST', '/api/accounts').as('createAccount');
    
        cy.getDataTestId(SignupPageElements.FirstName).clear().type(formData.firstName);
        cy.getDataTestId(SignupPageElements.LastName).clear().type(formData.lastName);
        cy.getDataTestId(SignupPageElements.Email).clear().type(formData.email);
        cy.getDataTestId(SignupPageElements.Phone).clear().type(formData.phone);
        cy.getDataTestId(SignupPageElements.Password).clear().type(formData.password);
        cy.getDataTestId(SignupPageElements.PasswordConfirm).clear().type(formData.password);
        cy.getDataTestId(SignupPageElements.Province).type(`${formData.province}{enter}`);
    
        if(formData.leadDistributeConsentAgreement) {
            cy.getDataTestId(SignupPageElements.LeadDistributeConsentAgreement)
                .check();
        } else {
            cy.getDataTestId(SignupPageElements.LeadDistributeConsentAgreement)
                .uncheck();
        }

        // Act
        cy.getDataTestId(SignupPageElements.CreateYourAccount)
            .click();

        // Assert
        cy.wait('@createAccount').then((interception) => {
            let response: AccountResponse;
            if (interception.response) {
                expect(interception.response.statusCode).to.eq(201);
                response = interception.response.body;
            } else {
                // Handle the case where the response is missing
                throw new Error('API response was undefined');
            }

            const account = response.account;
            expect(account.email).to.eq(formData.email);
            expect(account.firstName).to.eq(formData.firstName);
            expect(account.lastName).to.eq(formData.lastName);
            expect(account.phone).to.eq(formData.phone);
            expect(account.region).to.eq(formData.province);
            expect(account.leadDistributeConsentAgreement).to.eq(formData.leadDistributeConsentAgreement);
        
            const token = response.token;
            expect(token).to.have.property('accessToken');
            expect(token.tokenType).to.eq('Bearer');

            const expectedUrl = `${Cypress.config('baseUrl')}/getaquote`;
            cy.url().should('eq', expectedUrl);

            // TODO: Validate the Confirmation Email if any is sent.
        });    
    });    

    it('ID-32: Should fill the form with existing user and submit then expect a conflict', () => {
        // Arrange
        cy.intercept('POST', '/api/accounts').as('createAccount');
    
        cy.getDataTestId(SignupPageElements.FirstName).clear().type(formData.firstName);
        cy.getDataTestId(SignupPageElements.LastName).clear().type(formData.lastName);
        cy.getDataTestId(SignupPageElements.Email).clear().type(formData.email);
        cy.getDataTestId(SignupPageElements.Phone).clear().type(formData.phone);
        cy.getDataTestId(SignupPageElements.Password).clear().type(formData.password);
        cy.getDataTestId(SignupPageElements.PasswordConfirm).clear().type(formData.password);
        cy.getDataTestId(SignupPageElements.Province).type(`${formData.province}{enter}`);
    
        if(formData.leadDistributeConsentAgreement) {
            cy.getDataTestId(SignupPageElements.LeadDistributeConsentAgreement)
                .check();
        } else {
            cy.getDataTestId(SignupPageElements.LeadDistributeConsentAgreement)
                .uncheck();
        }

        // Act
        cy.getDataTestId(SignupPageElements.ToastDuplicateActionTitle, 'not.exist');
        cy.getDataTestId(SignupPageElements.CreateYourAccount)
            .click();

        // Assert
        cy.wait('@createAccount').then((interception) => {
            if (interception.response) {
                expect(interception.response.statusCode).to.eq(409);
            } else {
                // Handle the case where the response is missing
                throw new Error('API response was undefined');
            }
        });
        
        cy.getDataTestId(SignupPageElements.ToastDuplicateActionTitle, 'exist');            
    });    
});
    