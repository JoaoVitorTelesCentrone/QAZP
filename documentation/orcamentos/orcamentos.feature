Feature: Orçamentos 

Scenario: Should display the quote on the Orçamentos page

Given the a quote was created on the landing page
And the quote name is 'Anastasia' 
And the quote email is 'anastasia@g.com'  
And the quote cellphone is '(11) 12345-6789'
And the quote type is 'Festa' 
And the quote public is '100'
And the user is logged in 
When the user clicks on 'Orçamentos' on the nav
Then the user should see that the name is 'Anastasia' on the 'Name' column 
And the email is 'anastasia@g.com' on the 'Email' column 
And the cellphone is '(11) 12345-6789' on the 'Celular' column
And the type is 'Festa' on the 'Tipo' column 
And the public is '100' on the 'Público' column 

Scenario: Should delete a quote

Given there is a quote created 
And the user is logged in 
And the user is on the 'http://localhost:3000/quote' page 
And the user clicks on 'Trash' button on a quote 
And the 'Deletar Cliente' pop-up is opened
When the user clicks on 'Deletar' button 
Then the quote should be deleted of the table

Scenario: Should filter the quote by name

Given the user is logged in 
And there is a quote created with the 'Anastasia' name
And there is a quote create with the 'Zunir' name
When the user types the 'Zunir' name on the 'Filtrar por nome' field 
Then the user sees that the table is filtered 
And the only quote displayed is the 'Zunir' quote