describe('Teste de API', () => {
    it('deve retornar a lista de usuários com status 200', () => {
     cy.request('GET', 'http://localhost:5196/api/User/')
       .should((response) => {
         expect(response.status).to.eq(200)
         expect(response.body).to.have.length(1)
       })
   })
   it('deve retornar a lista de materiais com status 200', () => {
     cy.request('GET', 'http://localhost:5196/api/Material/')
       .should((response) => {
         expect(response.status).to.eq(200)
         expect(response.body).to.have.length(247)
       })
   })
    it('deve retornar a lista de materiais com status 200', () => {
     cy.request('GET', 'http://localhost:5196/api/Material/')
       .should((response) => {
         expect(response.status).to.eq(200)
         expect(response.body).to.have.length(247)
         expect(response.isOkStatusCode).to.be.true
        expect(response.headers).to.have.property('content-type').and.include('application/json')
        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)
        expect(response.duration).to.be.lessThan(100) 
        expect(response.body[0]).to.have.all.keys('id', 'name', 'category', 'price', 'eventMaterials', 'createdDate')      
	  })
   })
})
