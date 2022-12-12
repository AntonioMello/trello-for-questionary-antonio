describe('Interagir com Trello via API', () => {
    context('Teste', () => {

        var key = "2c24cf0d8f75c2c205413a89e253b989";
        var token = "97cc50a039dbcb7979fc455869485d6bc21768c38a98c0abfbf11ae13296c0c7";

        it('Cadastrar um board', () => {
            var boardName = "teste-board-Antonio";


            // Request POST para criação de board do zero
            cy.request({
                method: 'POST',
                url: `https://api.trello.com/1/boards/?name=${boardName}&key=${key}&token=${token}`,
            })
                .its('body')
                .should('deep.contain', {
                    "name": boardName,
                    "closed": false
                });
        });

        it('Cadastrar um card', () => {
            var cardEntry = "teste-card-Antonio";


            // Registrando alias para resgatar id do primeiro board ativo
            cy.request({
                method: 'GET',
                url: `https://api.trello.com/1/members/me/boards?&key=${key}&token=${token}`,
            }).as('getBoardId');

            // Utilizando alias para resgatar o id do primeiro board
            cy.get('@getBoardId').then((a) => {
                let idBoard = a.body[0].id;
                cy.log(a.body[0].id);

                // Registrando alias para resgatar id da primeira lista do primeiro board
                cy.request({
                    method: 'GET',
                    url: `https://api.trello.com/1/boards/${idBoard}/lists?key=${key}&token=${token}`,
                }).as('getListId');
            });

            // Utilizando alias para resgatar o id da primeira lista do primeiro board
            cy.get('@getListId').then((b) => {
                let idList = b.body[0].id;
                cy.log(idList);

                // Execução da request de criação do card e validação da response
                cy.request({
                    method: 'POST',
                    url: `https://api.trello.com/1/cards?idList=${idList}&key=${key}&token=${token}`,
                    body: {
                        name: cardEntry,
                    }
                })
                    .its('body')
                    .should('deep.contain', {
                        "name": cardEntry,
                        "closed": false
                    });
            });
        });

        it('Excluir um card', () => {

            // Registrando alias para resgatar id do primeiro board ativo
            cy.request({
                method: 'GET',
                url: `https://api.trello.com/1/members/me/boards?&key=${key}&token=${token}`,
            }).as('getBoardId');

            // Utilizando alias para resgatar o id do primeiro board
            cy.get('@getBoardId').then((a) => {
                let idBoard = a.body[0].id;
                cy.log(a.body[0].id);

                // Registrando alias para resgatar id do primeiro card do primeiro board
                cy.request({
                    method: 'GET',
                    url: `https://api.trello.com/1/boards/${idBoard}/cards?key=${key}&token=${token}`,
                }).as('getCardId');
            });

            // Utilizando alias para resgatar o id do primeiro card do primeiro board
            cy.get('@getCardId').then((c) => {
                let idCard = c.body[0].id;
                cy.log(idCard);

                // Execução da request de deleção do card e validação do response
                cy.request({
                    method: 'DELETE',
                    url: `https://api.trello.com/1/cards/${idCard}?key=${key}&token=${token}`,
                })
                    .its('body')
                    .should('deep.contain', {
                        "limits": {},
                    });
            });
        });

        it('Excluir um board', () => {

            // Registrando alias para resgatar id do primeiro board ativo
            cy.request({
                method: 'GET',
                url: `https://api.trello.com/1/members/me/boards?&key=${key}&token=${token}`,
            }).as('getBoardId');

            // Utilizando alias para resgatar o id do primeiro board
            cy.get('@getBoardId').then((a) => {
                let idBoard = a.body[0].id;

                // Execução da request de deleção do board e validação do response
                cy.request({
                    method: 'DELETE',
                    url: `https://api.trello.com/1/boards/${idBoard}?key=${key}&token=${token}`,
                })
                    .its('body')
                    .should('deep.contain', {
                        "_value": null,
                    });
            });
        });
    });
});