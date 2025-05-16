describe('Login and visit each page', () => 
{

    beforeEach(() => 
    {
        cy.login('admin', '123');
    });

    it('Should visit Orçamentos page', () => 
    {
        cy.clickOn('quote-nav-btn');
        cy.url().should('equal', 'http://localhost:3000/quote');
    });
    
    it('Should visit Clientes page', () => 
    {
        cy.clickOn('clients-nav-btn');
        cy.url().should('equal', 'http://localhost:3000/clients');
    });

    it('Should visit Materiais page', () => 
    {
        cy.clickOn('materials-nav-btn');
        cy.url().should('equal', 'http://localhost:3000/Materials');
    });

    it('Should visit Eventos page', () => 
    {
        cy.clickOn('events-nav-btn');
        cy.url().should('equal', 'http://localhost:3000/Events');
    });
    
    it('Should visit Usuários page', () => 
    {
        cy.clickOn('users-nav-btn');
        cy.url().should('equal', 'http://localhost:3000/Users');
    });

    afterEach(() => 
    {
        cy.clickOn('logout-button');
    });
})