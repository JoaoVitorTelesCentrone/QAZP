describe('Intercept com fixture - POST /User', () => {

    const fazerLogin = () => {
        cy.visit('http://localhost:3000/')
        cy.get('.p-8 > .ant-btn').click()
        cy.get('[id="username"]').type('admin')
        cy.get('[id="password"]').type('123')
        cy.get('[data-testid="login-button"]').click()
    }
    beforeEach(() => {
        fazerLogin()
    })

    beforeEach(() => {

    })
})

it('deve simular criação de usuário usando fixture', () => {
    cy.fixture('post-user').then((usuarioMockado) => {
        cy.intercept('POST', 'http://localhost:5196/api/User/', {
            statusCode: 201,
            body: usuarioMockado
        }).as('postUser')
        cy.visit('http://localhost:3000/Users')

        cy.get('[data-testid="modal-button-user-creation"]').click();
        cy.get('[data-testid="modal-button-user-name"]').type("Maria");
        cy.get('[data-testid="modal-button-user-username"]').type("Maria");
        cy.get('[data-testid="modal-button-user-password"]').type("123");
        cy.get('[data-testid="modal-button-user-confirm-password"]').type("123");
        cy.get('[data-testid="modal-button-create-user"]').click();

        cy.wait('@postUser').then((interception) => {
            expect(interception.response!.statusCode).to.eq(201)
            expect(interception.response!.body.name).to.eq('Maria')
        })
        cy.contains('Usuário criado com sucesso')
    })
})