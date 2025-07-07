describe('Eventos', () => 
{

    const navigateToEvents = () => 
    {
        cy.clickOn('events-nav-btn');
        cy.clickOn('create-event-events-btn');
    }

    beforeEach(() => 
    {
        //Given
        cy.login('admin', '123');
        navigateToEvents();
    });

    it('Should create an event successfully', () => 
    {      
        //When
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

        //Then
        cy.url().should('eq', 'http://localhost:3000/Events');
        cy.getByTestId('create-event-toast-success')
            .should('be.visible')
            .should('have.text', 'Evento criado com sucesso');
        cy.getByTestId('event-table-row-0_name').should('have.text', 'casamento1');
        cy.getByTestId('event-table-row-0_type').should('have.text', 'Casamento');
        cy.getByTestId('event-table-row-0_clientName').should('have.text', 'Vaas Montenegro');
        cy.getByTestId('event-table-row-0_startDate').should('have.text', '05/05/2027');
        cy.getByTestId('event-table-row-0_endDate').should('have.text', '06/05/2027');
        cy.getByTestId('event-table-row-0_estimatedAudience').should('have.text', '200');
        cy.getByTestId('event-table-row-0_totalAmount').should('contain.text', '50,00');
        // cy.getByTestId('event-table-row-0_totalAmount')
        //     .invoke('text').then((text) => {
        //         expect(text.replace(/\u00a0/g, ' ')).equal('R$ 50,00');
        //     })
    });

    afterEach(() => 
    {
        // cy.get(':nth-child(9) > .lucide').click();
        // cy.clickOn('confirm-delete-event-modal-btn');
    });
})