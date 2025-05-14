describe('GET /produtos', () => {
    it('deve retornar lista de produtos com status 200', () => {
      cy.request('/produtos').then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.be.an('array')
      })
    })
  
    it('deve criar produto e retornar campos corretos', () => {
      const novo = { nome: `Produto${Date.now()}`, tipo: 'Brinquedo', preco: 49.9, petId: 1 }
      cy.request('POST', '/produtos', novo).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.body).to.have.all.keys('id','nome','tipo','preco','petId')
      })
    })
  
    it('deve retornar produto existente com GET /produtos/:id', () => {
      const novo = { nome: `Produto${Date.now()}`, tipo: 'Alimento', preco: 29.9, petId: 1 }
      cy.request('POST', '/produtos', novo).its('body.id').then((id) => {
        cy.request(`/produtos/${id}`).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body).to.have.all.keys('id','nome','tipo','preco','petId')
        })
      })
    })
  
    it('deve atualizar produto com PUT /produtos/:id e retornar dados atualizados', () => {
      const novo = { nome: `Produto${Date.now()}`, tipo: 'Brinquedo', preco: 39.9, petId: 1 }
      cy.request('POST', '/produtos', novo).its('body.id').then((id) => {
        const atual = { nome: 'Atualizado', tipo: 'Brinquedo', preco: 59.9, petId: 1 }
        cy.request('PUT', `/produtos/${id}`, atual).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.preco).to.eq(atual.preco)
        })
      })
    })
  
    it('deve deletar produto com DELETE /produtos/:id', () => {
      const novo = { nome: `Produto${Date.now()}`, tipo: 'Brinquedo', preco: 19.9, petId: 1 }
      cy.request('POST', '/produtos', novo).its('body.id').then((id) => {
        cy.request('DELETE', `/produtos/${id}`).then((res) => {
          expect([200,204]).to.include(res.status)
        })
      })
    })
  
    it('deve retornar 400 para POST /produtos com dados incompletos', () => {
      cy.request({ method: 'POST', url: '/produtos', body: { nome: 'SemTipo' }, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.eq(400)
      })
    })
  
    it('deve retornar 409 para POST /produtos com nome duplicado', () => {
      const dup = { nome: `Produto${Date.now()}`, tipo: 'Acessório', preco: 19.9, petId: 1 }
      cy.request('POST', '/produtos', dup).then(() => {
        cy.request({ method: 'POST', url: '/produtos', body: dup, failOnStatusCode: false }).then((res) => {
          expect(res.status).to.eq(409)
        })
      })
    })
  
    it('deve retornar pet associado com GET /produtos/:id/pet', () => {
      const user = { nome: `Usuario${Date.now()}`, email: `user${Date.now()}@ex.com`, senha: 'senha123' }
      cy.request('POST', '/usuarios', user).its('body.id').then((idUsuario) => {
        const pet = { nome: 'PetLink', raca: 'Poodle', usuarioId: idUsuario }
        cy.request('POST', '/pets', pet).its('body.id').then((idPet) => {
          const prod = { nome: `Produto${Date.now()}`, tipo: 'Acessório', preco: 29.9, petId: idPet }
          cy.request('POST', '/produtos', prod).its('body.id').then((idProd) => {
            cy.request(`/produtos/${idProd}/pet`).then((res) => {
              expect(res.status).to.eq(200)
              expect(res.body).to.have.all.keys('id','nome','raca','usuarioId')
            })
          })
        })
      })
    })
  })
  