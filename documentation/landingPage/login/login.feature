Feature: Login 

Scenario: Should login successfully

Given the user is on the 'http://localhost:3000'
And the user is registered on the database 
And the user clicked on the 'Login' button
And the 'Faça seu Login' modal is opened
When the user types 'admin' on the 'Usuário' field 
And the user types '123' on the 'Senha' field
And the user clicks on the 'Entrar' button
Then the user sees that the 'Faça seu login' modal is closed 
And a toast is displayed 
And the toast message is 'Bem-vindo, Administrador!'
And the user is redirected to other page 
And the page URL is 'http://localhost:3000/dashboard'


Scenario: Deveria exibir as validações de campos obrigatórios não preenchidos

Given the user is on the 'http://localhost:3000'
And the user clicked on the 'Login' button 
And the 'Faça seu Login' modal is opened
When the user clicks on the 'Entrar' button
Then the user sees that the border of the 'Usuário' field is red 
And the label 'Campo obrigatório *' is displayed below the 'Usuário' field 
And the border of the 'Senha' field is red 
And the label 'Campo obrigatório *' is displayed below the 'Senha' field

Scenario: Deveria exibir validações quando eu insiro usuário e senha que não existem 

Given the user is on the 'http://localhost:3000' page
And the user is not registered on the database 
And the user clicked on the 'Login' button 
And the 'Faça seu Login' modal is opened
When the user types 'user0' on the 'Usuário' field 
And the user types 'peteca' on the 'Senha' field 
And the user clicks on the 'Entrar' button
Then the user sees that a toast is displayed
And the toast message is 'Usuário ou senha incorretos. Verifique as informações e tente novamente'
