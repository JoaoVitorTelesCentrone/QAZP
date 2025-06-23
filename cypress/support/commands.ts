export {};

Cypress.Commands.add('getByTestId', (testId: string ) => 
{
    cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('writeInputText', (testId: string, value: string ) => 
{
    cy.getByTestId(testId).type(value);
});

Cypress.Commands.add('clickOn', (...values: Array<string>) => 
{
    const base = composeBaseId(values);
    cy.get(base).click();
});

function composeBaseId(values: Array<string>): string 
{
    let base = '';
    for (const value of values) 
    {
        base = `${base} [data-testid="${value}"]`;
    }
    return base;
}

Cypress.Commands.add('login', (username: string, password: string) => 
{
    cy.visit('http://localhost:3000/')
        .clickOn('login-button')
        .writeInputText('username-loginInput-form', username)
        .writeInputText('password-loginInput-form', password)
        .clickOn('enter-login-form-btn');
});

Cypress.Commands.add('getSessionStorage', (key) => 
{
    cy.window().then((window) => window.sessionStorage.getItem(key));
});

Cypress.Commands.add('setSessionStorage', (key, value) => 
{
    cy.window().then((window) => 
    {
        window.sessionStorage.setItem(key, value)
    })
})