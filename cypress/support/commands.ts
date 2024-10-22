/// <reference types="cypress" />
import { createUserFromApi, handleCookiesBanner } from './utils';

Cypress.Commands.add('nestoGoToSignupPage', () => {
    cy.visit('/signup').then(() =>
        handleCookiesBanner()
    );
});

Cypress.Commands.add('findDataTestId', { prevSubject: true }, (subject, id: string) => {
    return cy.wrap(subject).find(`[data-test-id="${id}"]`);
});

Cypress.Commands.add('getDataTestId', (id: string, shouldAssertion: string = 'exist') => {
    return cy.get(`[data-test-id="${id}"]`).should(shouldAssertion);
});

Cypress.Commands.add('nestoCreateUserFromApi', () => {
    return createUserFromApi().then((user) => {
        if (user) {
            cy.log(`User created with email: ${user.email}`);
            return cy.wrap(user);
        } else {
            cy.log('User creation failed');
            return null;
        }
    });
});

Cypress.Commands.add('nestoToggleLanguage', (language?: string) => {
    const newLanguage = language || Cypress.env('language') || 'en';

    cy.getDataTestId('toggle-language').then((element) => {
        const toggleLanguage: string = element.text().trim().toLowerCase();

        if(toggleLanguage === newLanguage) {
            cy.wrap(element).click();
        } else {
            cy.log('No need to toggle language.');
        }
    });
});
