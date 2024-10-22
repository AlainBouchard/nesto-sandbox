/// <reference types="cypress" />
import { SignupPageElements } from '../support/SignupPageElements';

describe('SignUp Page -> Page load and layout', () => {
    let text: Record<string, string>;
    const language: string = Cypress.env('language') || 'en';

    before(() => {
        cy.fixture(`languages/signup/${language}`).then((loadedText) => {
            text = loadedText as Record<string, string>;
        });
    });
    
    beforeEach(() => {
        cy.nestoGoToSignupPage();
        cy.nestoToggleLanguage();
    });
  
    it('ID-11: Should validate that all required data-test-id elements exist on the page', () => {
        // Arrange
        const testIds: string[] = [
            SignupPageElements.FirstName,
            SignupPageElements.LastName,
            SignupPageElements.Email,
            SignupPageElements.Phone,
            SignupPageElements.PasswordConfirm,
            SignupPageElements.Province,
            SignupPageElements.LeadDistributeConsentAgreement,
            SignupPageElements.CreateYourAccount,
            SignupPageElements.CreateAccountPageLogin,
            SignupPageElements.ToggleLanguage,
            SignupPageElements.InputLabelFirstName,
            SignupPageElements.InputLabelLastName,
            SignupPageElements.InputLabelEmail,
            SignupPageElements.InputLabelPassword,
            SignupPageElements.InputLabelPasswordConfirm,
            SignupPageElements.FormWarnPasswordComplexity,
            SignupPageElements.FormSignupCreateYourAccount,
            SignupPageElements.GetAQuoteShortPartnerAgreementAndEmailV3,
            SignupPageElements.ReadOurPolicyV2,
            SignupPageElements.FormSignupTitle,
            SignupPageElements.CreateAccountAgreement
        ];
        
        // No Action

        // Assert
        testIds.forEach((testId: string) => {
            cy.getDataTestId(testId);
        });
    });

    it('ID-12: Should validate that the page title is displayed and matches the expected text', () => {
        // Arrange
        const title: string = text['title'];
        
        // No Action

        // Assert
        cy.getDataTestId(SignupPageElements.FormSignupTitle)
          .should('be.visible')
          .and('have.text', title);
    });
    
    it('ID-13: Should validate that the UI language changes when language is toggled', () => {        
        // Arrange
        type TestData = {language: string, expect: string};
        const testData: TestData[] = [
            // Fixture isn't used, only for this test, to validate that languages toggle works.
            { language: 'en', expect: 'Create a nesto account' },
            { language: 'fr', expect: 'Créez un compte nesto' }
        ]; 
        
        testData.forEach((testData: TestData) => {
            // Act
            cy.nestoToggleLanguage(testData.language);
            
            // Assert
            cy.getDataTestId(SignupPageElements.FormSignupTitle)
                .should('be.visible')
                .and('have.text', testData.expect);
        });
    });

    /**
     * Failing: to validate with PO.
     * Expectations: The user information should stay in the Fields when toggling languages.
     * Current behaviors: The user information is deleted when toggling languages, which can be irritating for a customer.
     * Priority: low
     * */ 
    it('ID-14: Should validate that the form data stay after switching language', () => {        
        // Arrange
        const firstName: string = 'Jon';
        
        cy.nestoToggleLanguage('fr');

        cy.getDataTestId(SignupPageElements.FirstName)
            .clear()
            .type(firstName);

        // Act
        cy.nestoToggleLanguage('en');

        // Assert
        cy.getDataTestId(SignupPageElements.FirstName)
            .invoke('val')
            .then((inputValue) => {
                expect(inputValue).to.equal(firstName);
            });
    });
});
    