import './commands'

declare global 
{
    namespace Cypress 
    {
        interface Chainable 
        {
            getByTestId(testId: string): Chainable<void>;
            clickOn(...values: Array<string>): Chainable;
            writeInputText(testId: string, value: string): Chainable<void>;
            login(username: string, password: string): Chainable<void>;
            getSessionStorage(...values: Array<string>): Chainable;
            setSessionStorage(...values: Array<string>): Chainable;
        }
    }
}