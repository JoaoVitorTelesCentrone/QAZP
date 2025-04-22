Feature: Clientes 

Scenario: Should create a Client successfully 

Given the user is logged in 
And the user is on 'http://localhost:3000/clients' page
And the user clicked on 'Criar cliente' button 
When the user types 'Vaas Montenegro' on the 'Nome Completo' field 
And the user types '68006841802' on the 'Documento' field 
And the user types '11999584020' on the 'Telefone' field 
And the user types 'vaas@g.com' on the 'Email' field 
And the user types '08310250' on the 'CEP' field 
And the user clicks on 'Search' svg button 
And the user types '90' on the 'Número' field 
And the user types 'Bloco A1' on the 'Complemento' field 
And the user clicks on 'Criar cliente' button 
Then a toast is displayed 
And the toast message is 'Cliente criado com sucesso'
And the client is added to the top of the table 

Scenario: Should edit a Client 

Scenario: Should delete a Client

Scenario: Should filter by Document

Scenario: Should filter by name