describe('Client API Tests', () => {
    it('GET client', () => {
        cy.request
            ({
                method: 'GET',
                url: 'http://localhost:5196/api/Client'
            }).then(response => {
                expect(response).not.be.empty;
                expect(response.status).to.be.equal(200);
                expect(response.duration).to.be.lessThan(1000);
            })
    });


    it('POST client', () => {
        cy.request
            ({
                method: 'POST',
                url: 'http://localhost:5196/api/Client',
                body:
                {
                    "id": "b26a8cb2-1c21-423f-9628-929bb1edf3dc",
                    "fullName": "Camila Isabel da Paz",
                    "documentId": "59507420444",
                    "phoneNumber": "54987886505",
                    "email": "camilaisabeldapaz@hellokitty.com",
                    "zipCode": "95045288",
                    "addressName": "Rua Julita Bernardete Tedesco Pinto",
                    "addressNumber": "775",
                    "addressComplement": "Teste",
                    "district": "Nossa Senhora do Rosário",
                    "state": "RS",
                    "city": "Caxias do Sul "

                }
            }).then(response => {
                expect(response.status).to.be.equal(201);
                expect(response.body.documentId).be.eq('59507420444');
                expect(response.body.fullName).be.eq('Camila Isabel da Paz');
            })
    });

    it('DELETE client', () =>
    {
        cy.request
            ({
                method: 'DELETE',
                url: 'http://localhost:5196/api/Client/b26a8cb2-1c21-423f-9628-929bb1edf3dc'
            }).then(response => {
                expect(response.status).to.be.equal(204);

                cy.request
                ({
                    method: 'GET',
                    url: 'http://localhost:5196/api/Client'
                }).then(response => {
                    const clients = response.body
                    clients.forEach((client: { documentId: any; fullName: any; }) => {
                        expect(client.documentId).not.be.eq('59507420444');
                        expect(client.fullName).not.be.eq('Camila Isabel da Paz');
                    });
                })
            });
    });
});