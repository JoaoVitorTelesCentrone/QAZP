Feature: Solicitação de orçamento

Scenario: Should create a quote successfully
    Given the user clicked on 'Solicite um orçamento' button
    And the 'Solicite um orçamento' modal is opened
    When the user types the 'John Doe' on the 'Nome completo' field
    And the user types the 'johndoe@gmail.com' on the 'Email' field 
    And the user types '00123456789' on the 'Telefone' field 
    And the user clicks on 'Tipo do evento' field 
    And the user selects 'Casamento' among the options 
    And the user types '300' on the 'Público estimado' field 
    And the user clicks on the 'Enviar solicitação' field 
    Then 

Scenario: Should display the mandatory field validations when the user doesn't insert any data on the 'Solicite um orçamento' form
    Given the user clicked on 'Solicite um orçamento' button
    And the 'Solicite um orçamento' modal is opened
    When the user clicks on the 'Enviar solicitação' field 
    Then the 'Nome completo' border field is red 
    And the 'Campo obrigatório *' label is displayed as red below the 'Nome completo' field
    And the 'Email' border field is red 
    And the 'Campo obrigatório *' label is displayed as red below the 'Email' field
    And the 'Telefone' border field is red 
    And the 'Campo obrigatório *' label is displayed as red below the 'Telefone' field
    And the 'Tipo de evento' border field is red 
    And the 'Campo obrigatório *' label is displayed as red below the 'Tipo de evento' field
    And the 'Público estimado' border field is red 
    And the 'Campo obrigatório *' label is displayed as red below the 'Público estimado' field


