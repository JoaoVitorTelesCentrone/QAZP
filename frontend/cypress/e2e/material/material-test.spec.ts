describe('Create Material', () => {
    })
it('should create one material', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.p-8 > .ant-btn').click();
    cy.get('input[id="username"]').type('admin');
    cy.get('input[id="password"]').type('123');
    cy.get('[data-testid="login-button"]').click();

    cy.visit('http://localhost:3000/Materials');
    cy.get('[data-testid="material-modal-button"]').click();
    cy.get('[data-testid="material-modal-name"]').type('Teste4');
    cy.get('[data-testid="material-modal-price"]').type('600', { force: true });

    cy.get('[data-testid="material-dropdown-full"]').click();
    
    cy.get('[data-testid="material-dropdown-2"]').click({ force: true });

    cy.get('[datatest-id="create-material-modal-button"]').click();
    cy.get('[datatest-id="toast-create-material-success"]').should('be.visible');
    cy.get('[datatest-id="toast-create-material-success"]').eq(0).should('have.text', 'Material criado');
});