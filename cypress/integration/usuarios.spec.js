describe('GET /usuarios', () => {
    it('deve retornar lista de usuários com status 200', () => {
      cy.request('/usuarios').then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.be.an('array')
      })
    })
  
    it('deve criar usuário e retornar campos corretos', () => {
      const novo = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', novo).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.body).to.have.all.keys('id','nome','email','senha')
      })
    })
  
    it('deve retornar usuário existente com GET /usuarios/:id', () => {
      const novo = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', novo).its('body.id').then((id) => {
        cy.request(`/usuarios/${id}`).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body).to.have.all.keys('id','nome','email','senha')
        })
      })
    })
  
    it('deve atualizar usuário com PUT /usuarios/:id e retornar dados atualizados', () => {
      const novo = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', novo).its('body.id').then((id) => {
        const atual = { nome: 'NomeAtualizado', email: `upd${Date.now()}@ex.com`, senha: 'novaSenha' }
        cy.request('PUT', `/usuarios/${id}`, atual).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.nome).to.eq(atual.nome)
        })
      })
    })
  
    it('deve deletar usuário com DELETE /usuarios/:id', () => {
      const novo = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', novo).its('body.id').then((id) => {
        cy.request('DELETE', `/usuarios/${id}`).then((res) => {
          expect([200,204]).to.include(res.status)
        })
      })
    })
  
    it('deve retornar 404 para GET /usuarios/:id inexistente', () => {
      cy.request({ url: '/usuarios/999999', failOnStatusCode: false }).then((res) => {
        expect(res.status).to.eq(404)
      })
    })
  
    it('deve retornar 400 para POST /usuarios com dados incompletos', () => {
      cy.request({ method: 'POST', url: '/usuarios', body: { email: 'noName@ex.com' }, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.eq(400)
      })
    })
  
    it('deve retornar 409 para POST /usuarios com email duplicado', () => {
      const dup = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', dup).then(() => {
        cy.request({ method: 'POST', url: '/usuarios', body: dup, failOnStatusCode: false }).then((res) => {
          expect(res.status).to.eq(409)
        })
      })
    })
  
    it('deve retornar lista de pets de um usuário com GET /usuarios/:id/pets', () => {
      const user = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', user).its('body.id').then((idUsuario) => {
        const pet = { nome: 'PetTeste', raca: 'ViraLata', usuarioId: idUsuario }
        cy.request('POST', '/pets', pet).then(() => {
          cy.request(`/usuarios/${idUsuario}/pets`).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an('array')
          })
        })
      })
    })
  })
  