export{};

declare global {
  namespace Cypress {
    interface Chainable {
        getByTestId(testId: string): Chainable<void>
        writeInputText(testId: string, value: string): Chainable<void>
        clickOn(testId: string): Chainable<void>
        login(username: string, password: string): Chainable<void>
    }
  }
}