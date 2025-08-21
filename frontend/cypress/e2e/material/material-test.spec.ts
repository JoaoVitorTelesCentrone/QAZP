describe('Login with mock', () => {
    // it('Should see users table with many elements', () => {
    //     cy.visit('http://localhost:3000/')
    //     cy.get('.p-8 > .ant-btn').click()
    //     cy.intercept('POST', '/api/User/login', {
    //         fixture: 'login-success.json'
    //     }).as('postLogin');
    //     cy.get('input[id="username"]').type('maria.souza');
    //     cy.get('input[id="password"]').type('senhaSegura123');
    //     cy.get('[data-testid="login-button"]').click()

    //     cy.wait('@postLogin');
    //     cy.intercept('GET', '/api/Material/active-materials', {
    //         fixture: 'material.json'
    //     }).as('getMaterial');
    //     cy.visit('http://localhost:3000/Materials');

    })
it('should create one material', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.p-8 > .ant-btn').click();
    cy.get('input[id="username"]').type('admin');
    cy.get('input[id="password"]').type('123');
    cy.get('[data-testid="login-button"]').click();

    cy.visit('http://localhost:3000/Materials');
    cy.get('[data-testid="material-modal-button"]').click();
    cy.get('[data-testid="material-modal-name"]').type('Teste2');
    cy.get('[data-testid="material-modal-price"]').type('400', { force: true });

    // Abre o dropdown
    cy.get('[data-testid="material-dropdown-full"]').click();
    
    cy.get('[data-testid="material-dropdown-2"]').click({ force: true });

    cy.get('[datatest-id="create-material-modal-button"]').click();
    cy.get('[datatest-id="toast-create-material-error"]').should('be.visible');
});
// })