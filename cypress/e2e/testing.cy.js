describe('Interagir com o Trello', () => {
    context('teste', () => {

        var boardName = 'teste';
        var cardContent = 'cardTest'

        beforeEach(() => {
            cy.viewport(1366, 1200);
            cy.visit('https://trello.com/login');
            cy.get('#login-form #user').type("fabionog2020@gmail.com");
            cy.get('#login-form #login').click();
            cy.wait(3000);
            cy.origin('https://id.atlassian.com', () => {
                cy.get('#password').type("@trello2022");
                cy.get('button').contains('Entrar').click();
            });
            cy.get('.home-container').should('be.visible');
        });

        // beforeEach(() => {
        //     cy.get('a[aria-label="Voltar ao Início"]').should('be.visible').click();
        // });

        it('Cadastrar um board', () => {

            cy.get('.board-tile.mod-add').click();
            cy.get('input[data-testid="create-board-title-input"]').type(boardName);
            cy.get('button[data-testid="create-board-submit-button"]').click();
            cy.get('h1.board-header-btn-text').should('be.visible');

        });

        it.only('Cadastrar um card', () => {
            cy.get('.board-tile-details-name div').should('contain',boardName).click();
            cy.wait(4000);
            cy.get('.open-card-composer').first().click();
            cy.get('textarea.list-card-composer-textarea').type(cardContent);
            cy.get('input.confirm').click();
            cy.get('.list-card-details > span').should(($p) => {
                expect($p).to.contain(cardContent);
            });
        });

        it.only('Excluir um card', () => {
            cy.get('.board-tile-details-name div').should('contain',boardName).click();
            cy.wait(4000);
            cy.get('.badges').prev().contains(cardContent).click();
            cy.get('span[title="Arquivar"]').click();
            cy.get('.js-delete-card').click();
            cy.get('input[value="Excluir"]').click();
            cy.contains(cardContent).should('not.exist');
        });

        // it('Excluir um board', () => {
        //     cy.get('.board-tile-details-name div').should('contain',boardName).click();
        //     cy.get('a').contains(boardName).next();

        // });

        // after(() => {
            // cy.wait(8000);
            // cy.get('button[aria-label="Abrir Menu de Membros"]').click();
            // cy.get('button[data-testid="header-member-menu-logout"]').click();
            // cy.wait(3000);
            // cy.origin('https://id.atlassian.com', () => {
            //     cy.get('button[data-testid="logout-button"]').click();
            // });
        // });


    });
});