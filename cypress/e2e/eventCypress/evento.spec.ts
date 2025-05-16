describe('Eventos', () => 
{

    const loginAndNavigateToEvents = () => 
    {
        cy.visit('http://localhost:3000/');
        cy.clickOn('login-button');
        cy.writeInputText('username-loginInput-form', 'admin');
        cy.writeInputText('password-loginInput-form', '123');
        cy.clickOn('enter-login-form-btn');
        cy.clickOn('events-nav-btn');
        cy.clickOn('create-event-events-btn');
    }

    beforeEach(() => 
    {
        loginAndNavigateToEvents();
    });

    it('Should create an event successfully', () => 
    {      
        //Act
        cy.clickOn('type-create-event');
        cy.clickOn('type-event-option-0');
        cy.getByTestId('event-create-title-form')
            .click()
            .type('casamento1');
        cy.clickOn('client-create-event');
        cy.clickOn('client-create-event-option-4');
        cy.getByTestId('cep-create-event-form')
            .click()
            .type('03506000');
        cy.clickOn('search-createEvent');
        cy.writeInputText('numero-createEvent', '100');
        cy.writeInputText('publico-createEvent', '200');
        cy.getByTestId('inicialDate-event-form')
            .click()
            .type('2027/05/05');
        cy.getByTestId('inicialTimePicker-createEvent')
            .click()
            .type('20:00');
        cy.getByTestId('finalDate-createEvent')
            .click()
            .type('2027/05/06');
        cy.getByTestId('finalTimePicker-createEvent')
            .click()
            .type('05:00');
        cy.clickOn('category-createEvent');
        cy.clickOn('category-createEvent-option-0');
        cy.clickOn('material-createEvent-trigger');
        cy.clickOn('material-createEvent-option-0');
        cy.getByTestId('quantity-createEvent')
            .click()
            .type('1');
        cy.clickOn('insertMaterial-createEvent');
        cy.clickOn('createEvent-form-btn');

        //Assert
        cy.url().should('equal', 'http://localhost:3000/Events');
        //toast needed
        cy.getByTestId('event-table-row-0_name').should('equal', 'casamento1');
        cy.getByTestId('event-table-row-0_type').should('equal', 'Casamento');
        cy.getByTestId('event-table-row-0_clientName').should('equal', 'Vaas Montenegro');
        cy.getByTestId('event-table-row-0_startDate').should('equal', '05/05/2027');
        cy.getByTestId('event-table-row-0_endDate').should('equal', '06/05/2027');
        cy.getByTestId('event-table-row-0_estimatedAudience').should('equal', '200');
        cy.getByTestId('event-table-row-0_totalAmount').should('equal', '50,00')
    });

    afterEach(() => 
    {
        cy.get(':nth-child(9) > .lucide').click();
        cy.clickOn('confirm-delete-event-modal-btn');
    });
})