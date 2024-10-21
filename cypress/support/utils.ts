import { faker } from '@faker-js/faker'; 

/** 
 * Handle the Cookies Banner by waiting for it and clicking on Agree.
 * Nothing will be done if it doesn't appear after 10 seconds.
 */
export function handleCookiesBanner() {
    cy.window().its('document.readyState').should('eq', 'complete');

    cy.get('[data-testid="notice"]', { timeout: 3000 }).then((notice) => {
        if (notice.length > 0) {
            cy.get('[data-testid="notice"]').should('be.visible');
            cy.get('#didomi-notice-agree-button').click();
        } else {
            cy.log('Notice did not appear, proceeding without notice...');
        }
    });
};

/**
 * Sends a POST request to create a new user with a random email and password.
 * If the request succeeds with a 201 status and the email matches, returns the email and password.
 * Otherwise, returns null.
 *
 * @returns {Cypress.Chainable<null | { email: string, password: string }>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUserFromApi(): Cypress.Chainable<any> {
    const email: string = `test+${faker.number.int({ min: 1000000000, max: 9999999999 })}@test.com`;
    const password: string = 'Patate1234##'; 
    const baseUrl: string | null = Cypress.config('baseUrl');

    const jsonData: Record<string, string | number | boolean | null> = {
        'province': 'QC',
        'firstName': 'Jon',
        'lastName': 'Snow',
        'email': email,
        'phone': '514-555-5555',
        'password': password,
        'passwordConfirm': password,
        'leadDistributeConsentAgreement': false,
        'partnerAgreement': false,
        'emailConsent': false,
        'region': 'QC',
        'language': 'en',
        'partialPostalCode': '',
        'passwordSpecified': true,
        'createdAt': 'LOGIN',
        'gaClientId': '547014281.1729179296',
        'anonymousAccountId': '5UM5BROl7MKpOIPs4QfKaO97ZbXJnJpxhFzX',
        'marketingChannel': 'Direct',
        'utmSource': '(direct)',
        'utmMedium': '(none)',
        'utmCampaign': '(not set)',
        'impressionsTrackingId': null,
        'impressionsTrackingIdSpecified': false,
        'partner': 'nesto',
        'subPartnerId': 0,
        'fbp': 'fb.1.1729198008783.650542646670434606',
        'direct': true,
        'social': false
    };

    return cy.request({
        method: 'POST',
        url: `${baseUrl}/api/accounts`,
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 201 && response.body.account.email === email) {
            return cy.wrap({ email, password });
        } else {
            return null;
        }
    });
}
