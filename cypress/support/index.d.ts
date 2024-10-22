declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to find a child element by data-test-id within a parent element.
         * @param id The value of the data-test-id attribute to find.
         */
        findDataTestId(id: string): Chainable<JQuery<HTMLElement>>;

        /**
         * Custom command to select a DOM element by data-test-id attribute and apply a Cypress 'should' assertion.
         * @param id The value of the data-test-id attribute to select.
         * @param shouldAssertion Optional Cypress 'should' assertion (e.g., 'exist', 'not.exist', 'be.visible'). Defaults to 'exist'.
         */
        getDataTestId(id: string, shouldAssertion?: string): Chainable<JQuery<HTMLElement>>;

        /**
         * Custom command to visit the SignUp page and handle the cookies modal.
         */
        nestoGoToSignupPage(): Chainable<void>;

        /**
         * Custom command to create a user via API.
         * @returns {Chainable<{ email: string, password: string } | null>}
         */
        nestoCreateUserFromApi(): Chainable<{ email: string, password: string } | null>;

        /**
         * Toggle UI language.
         * @param language the UI language to use for the test, can be "en", "fr" or null, null will obtain language from Env.
         */
        nestoToggleLanguage(language?: string): Chainable<void>;
    }
}