describe('Eventos', () => 
{

    const loginAndNavigateToEvents = () => 
    {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="login-button"]').click();
        cy.get('[data-testid="username-login-form"]').type('admin');
        cy.get('[data-testid="password-login-form"').type('123');
        cy.get('[data-testid="enter-form-btn"]').click();
        cy.getByTestId('events-nav-btn').click();
        cy.get('[data-testid="create-event-events-btn"]').click();
    }

    beforeEach(() => 
    {
        loginAndNavigateToEvents();
    });

    it('Criando um evento sucessivamente', () => 
    {      
        //Act
        cy.get('[data-testid="type-create-event"]').click();
        cy.get('[data-testid=type-event-option-0]').click();
        cy.get('[data-testid="event-create-title-form"]')
            .click()
            .type('casamento1');
        cy.get('[data-testid="client-create-event"]').click();
        cy.contains('[role="menuitem"]', 'Vaas Montenegro').click();
        cy.get('[data-testid="cep-create-event-form"]')
            .click()
            .type('03506000');
        cy.get('[data-testid="search-createEvent"]').click();
        cy.get('[data-testid="numero-createEvent"]').type('100');
        cy.get('[data-testid="publico-createEvent"]').type('200');
        cy.get('[data-testid="inicialDate-event-form"]')
            .click()
            .type('2027/05/05');
        cy.get('[data-testid="inicialTimePicker-createEvent"]')
            .click()
            .type('20:00');
        cy.get('[data-testid="finalDate-createEvent"]')
            .click()
            .type('2027/05/06');
        cy.get('[data-testid="finalTimePicker-createEvent"]')
            .click()
            .type('05:00');
        cy.get('[data-testid="category-createEvent"]').click();
        cy.contains('[role="menuitem"]', 'Comida').click();
        cy.get('[data-testid="material-createEvent-trigger"]').click();
        cy.contains('[role="menuitem"]', 'Bolos de diversos sabores').click();
        cy.get('[data-testid="quantity-createEvent"]')
            .click()
            .type('1');
        cy.get('[data-testid="insertMaterial-createEvent"]').click();
        cy.get('[data-testid="createEvent-form-btn"]').click();

        //Assert
        cy.url().should('equal', 'http://localhost:3000/Events');
        //toast needed
        cy.get("tbody td").eq(0).should('contain', 'casamento1');
        cy.get("tbody td").eq(1).should('contain', 'Casamento');
        cy.get("tbody td").eq(2).should('contain', 'Vaas Montenegro');
        cy.get("tbody td").eq(3).should('contain', '05/05/2027');
        cy.get("tbody td").eq(4).should('contain', '06/05/2027');
        cy.get("tbody td").eq(5).should('contain', '200');
        cy.get("tbody td").eq(6).should('contain', '50,00');
    })

    afterEach(() => 
    {
        cy.get(':nth-child(9) > .lucide').click();
        cy.get('[data-testid="confirm-delete-event-modal-btn"]').click();
    });
})