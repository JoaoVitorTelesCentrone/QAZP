export class LoginPage {
    visitForm(): void {
        cy.visit('http://localhost:3000/')
        cy.getByTestId('header-login-button').click()
    }

    submit(user: string, password: string): void {

        if (user && password !== '') {
            cy.getByTestId('login-modal-username-field').type(user)
            cy.getByTestId('login-modal-password-field').type(password)
        }

        cy.getByTestId('login-button').click()
    }

    requiredFieldsError(testId: string, message: string): void {
        cy.getByTestId(testId).should('contain.text', message)
    }
}
