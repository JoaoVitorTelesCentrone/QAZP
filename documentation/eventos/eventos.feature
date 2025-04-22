Feature: Eventos

Scenario: Should create an event successfully

Given the user is logged in
And the user is on the 'http://localhost:3000/Events' page
And the user clicked on the 'Criar Evento' button 
And the user is redirected to the 'http://localhost:3000/CreateEvent'
And the 'Criar evento' form is displayed
When the user click on the 'Tipo' dropdown field
And the user select the 'Casamento' option/index
And the user types 'Casamento1' on the 'Título' field
And the user clicks on the 'Cliente' field 
And the user select the 'Vaas Montenegro' option /index
And the user types the '03506-000' on the 'CEP' field
And the user clicks on the 'Search' svg button
And the user types '100' on the 'Número' field 
And the user types '200' on the 'Público' field
And the user clicks on the 'Data inicial' field
And the user select '05/05/2027' on the ant-picker-date-panel
And the user clicks on the 'Horário inicial' field 
And the user clicks on '20' on the hour section 
And the user clicks on 'OK' button
And the user clicks on the 'Data final' field
And the user select '05/06/2027' on the ant-picker-date-panel
And the user clicks on '05' on the hour section 
And the user clicks on 'OK' button
And the user clicks on the 'Categoria' field 
And the user select the 'Comida' option/index
And the user clicks on the 'Material' field 
And the user select the 'Bolos de diversos sabores' option
And the user types '1' on the 'Quantidade' field 
And the user clicks on 'Adicionar' button 
And the user clicks on 'Criar evento' button
Then the user is redirected back to the 'http://localhost:3000/Events'
And a toast is displayed 
And the toast message is 'Evento criado com sucesso'
And the event is listed on the table 
And the title of the event is 'casamento1'
And the type of the event is 'Casamento'
And the client name is 'Kauê Vitor Teixeira'
And the inicial date is '05/05/2027'
And the ending date is '05/06/2027'
And the estimated public is '200'
And the total equals 'R$50,00'


Scenario: Should edit an event successfully 
#Ordem do dos campos data final e horário inicial é invertido xD

Scenario: Should delete an event 
Given the user is logged in 
And the user is on the 'http://localhost:3000/Events' page
And an event exists 
And the title of the event is 'casamento1'
And the type of the event is 'Casamento'
And the client name is 'Kauê Vitor Teixeira'
And the inicial date is '05/05/2027'
And the ending date is '05/06/2027'
And the estimated public is '200'
And the total equals 'R$50,00'
When the user clicks on the 'Trash' button of the event
And the 'Confirm Delete' modal is opened 
And the user clicks on 'Confirm' button
Then the user sees that the event is deleted of the table
