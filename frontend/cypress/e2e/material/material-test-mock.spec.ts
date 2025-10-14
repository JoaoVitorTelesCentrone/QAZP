describe('Login with mock', () => {
     it('Should see users table with many elements', () => {
         cy.visit('http://localhost:3000/')
         cy.get('.p-8 > .ant-btn').click()
         cy.intercept('POST', '/api/User/login', {
             fixture: 'login-success.json'
            }).as('postLogin');
         cy.get('input[id="username"]').type('maria.souza');
         cy.get('input[id="password"]').type('senhaSegura123');
         cy.get('[data-testid="login-button"]').click()

         cy.wait('@postLogin');
         cy.intercept('GET', '/api/Material/active-materials', {
             fixture: 'material.json'
         }).as('getMaterial');
         cy.visit('http://localhost:3000/Materials');
         }
)})