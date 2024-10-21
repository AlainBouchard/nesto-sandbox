import './commands';

// Instructions from Nesto team.
beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Cypress.on('uncaught:exception', (err, runnable) => {
        // Returning false here prevents Cypress from failing the test
        return false;
    });
});
