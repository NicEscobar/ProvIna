/* eslint-disable jest/valid-expect */
/// <reference types="cypress"/>

describe('Testando as telas', () => {

    it('Cenario de Teste: Navegação das páginas',()=> {
        
        cy.visit('http://localhost:3000/register');

        cy.get('[data-cy=reg-nome]').type('Aluno');
        cy.get('[data-cy=reg-email]').type('aluno@');
        cy.get('[data-cy=reg-senha]').type('123');

        cy.get('[data-cy=btn-registrar]').click();

        cy.get('[data-cy=email]').type('aluno@');
        cy.get('[data-cy="senha"]').type('123');

        cy.get('[data-cy=btn-entrar]').click();

        cy.get('[data-cy=btn_upload]').click();

        cy.get('[data-cy="nomeArquivo"]').type('Arquivo1');
        cy.get('[data-cy="categoriaArquivo"]').type('Calculo');

        cy.get('[data-cy="btn-enviar"]').click();

        cy.visit('http://localhost:3000/');
    });

    it('Cenario de Teste: Cadastrando um Aluno não existente no banco',()=> {

        cy.visit('http://localhost:3000/register');

        cy.get('[data-cy=reg-nome]').type('Aluno5');
        cy.get('[data-cy=reg-email]').type('al5@');
        cy.get('[data-cy=reg-senha]').type('123');

     
        cy.server()
        cy.route('POST','**/Cadastro').as('cadastrarAluno');

        cy.get('[data-cy=btn-registrar]').click();

        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.wait('@cadastrarAluno').then((xhr) => {     
            // eslint-disable-next-line no-unused-expressions
            expect(xhr.response.body).is.not.null;
            expect(xhr.response.body).has.property('Parametro').be.eq(0);   
        })
        
    });

    it('Cenario de Teste: Cadastrando um Aluno existente no banco',()=> {
        
        cy.visit('http://localhost:3000/register');

        cy.get('[data-cy=reg-nome]').type('Nicole');
        cy.get('[data-cy=reg-email]').type('ni@');
        cy.get('[data-cy=reg-senha]').type('123');

     
        cy.server()
        cy.route('POST','**/Cadastro').as('cadastrarAluno');

        cy.get('[data-cy=btn-registrar]').click();

        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.wait('@cadastrarAluno').then((xhr) => {     
            // eslint-disable-next-line no-unused-expressions
            expect(xhr.response.body).is.not.null;
            expect(xhr.response.body).has.property('Parametro').be.eq(1);   
        })
        
    });

    it('Cenario de Teste: Logar um Aluno já cadastrado no banco',()=> {

        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/login',
            body:{
            	"Email": "ni@",
	            "Senha": "123"
            } 
        }).then(response => {
        
            // eslint-disable-next-line no-unused-expressions
            expect(response.body.auth).is.not.null;
            cy.log(response.body.token)
        })

    });
    it('Cenario de Teste: Logar um Aluno não cadastrado no banco',()=> {

        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/login',
            body:{
            	"Email": "teste@",
	            "Senha": "123"
            } 
        }).then(response => {
        
            // eslint-disable-next-line no-unused-expressions
            expect(response.body.auth).is.false;
            cy.log(response.body.token)
        })

    });
    it('Cenario de Teste: Inserir Arquivo no banco',()=> {
        
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.request({
            method: 'POST',
            url: 'http://localhost:3333/arquivo',
            body:{
                "IdAluno_Arquivos": 3,
                "NomeArquivo": "ProvaAlgebra",
                "Categoria": "PDF",
                "URls": "url@",
                "NumeroCurtidas": 34,
                "Tipo": "pdf"
            }
        }).then(response => {
        
            cy.log(response.body)
        })
      
    });
})
