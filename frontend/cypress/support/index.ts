export{};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<void>
      getByClass(className: string): Chainable<void>
      selectEventType(eventType: string): Chainable<void>
    }
  }
}