describe('GET /pets', () => {
    it('deve retornar lista de pets com status 200', () => {
      cy.request('/pets').then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.be.an('array')
      })
    })
  
    it('deve criar pet e retornar campos corretos', () => {
      const user = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', user).its('body.id').then((idUsuario) => {
        const pet = { nome: 'PetTeste', raca: 'ViraLata', usuarioId: idUsuario }
        cy.request('POST', '/pets', pet).then((res) => {
          expect(res.status).to.eq(201)
          expect(res.body).to.have.all.keys('id','nome','raca','usuarioId')
        })
      })
    })
  
    it('deve retornar pet existente com GET /pets/:id', () => {
      const user = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', user).its('body.id').then((idUsuario) => {
        const pet = { nome: 'PetGet', raca: 'Bulldog', usuarioId: idUsuario }
        cy.request('POST', '/pets', pet).its('body.id').then((idPet) => {
          cy.request(`/pets/${idPet}`).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.have.all.keys('id','nome','raca','usuarioId')
          })
        })
      })
    })
  
    it('deve atualizar pet com PUT /pets/:id e retornar dados atualizados', () => {
      const user = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', user).its('body.id').then((idUsuario) => {
        const pet = { nome: 'PetOld', raca: 'SRD', usuarioId: idUsuario }
        cy.request('POST', '/pets', pet).its('body.id').then((idPet) => {
          const atual = { nome: 'PetNovo', raca: 'SRD', usuarioId: idUsuario }
          cy.request('PUT', `/pets/${idPet}`, atual).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.nome).to.eq(atual.nome)
          })
        })
      })
    })
  
    it('deve deletar pet com DELETE /pets/:id', () => {
      const user = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', user).its('body.id').then((idUsuario) => {
        const pet = { nome: 'PetDel', raca: 'Labrador', usuarioId: idUsuario }
        cy.request('POST', '/pets', pet).its('body.id').then((idPet) => {
          cy.request('DELETE', `/pets/${idPet}`).then((res) => {
            expect([200,204]).to.include(res.status)
          })
        })
      })
    })
  
    it('deve retornar 400 para POST /pets com dados incompletos', () => {
      cy.request({ method: 'POST', url: '/pets', body: { nome: 'SemRaca', usuarioId: 1 }, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.eq(400)
      })
    })
  
    it('deve retornar produtos de um pet com GET /pets/:id/produtos', () => {
      const user = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', user).its('body.id').then((idUsuario) => {
        const pet = { nome: 'PetProd', raca: 'Siamês', usuarioId: idUsuario }
        cy.request('POST', '/pets', pet).its('body.id').then((idPet) => {
          const prod = { nome: `Produto${Date.now()}`, tipo: 'Brinquedo', preco: 59.9, petId: idPet }
          cy.request('POST', '/produtos', prod).then(() => {
            cy.request(`/pets/${idPet}/produtos`).then((res) => {
              expect(res.status).to.eq(200)
              expect(res.body).to.be.an('array')
            })
          })
        })
      })
    })
  })
  