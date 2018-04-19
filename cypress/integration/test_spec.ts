beforeEach(() => {
    cy.viewport('iphone-6');
});

describe('The home page', () => {
    it('should open the app', () => {
        cy.visit('http://localhost:4200');
    });

    it('should login in', () => {
        cy.get('#sideMenuBtn').click();
        cy.get('#sideMenuLinkSignIn').click();
        cy.get('#mainToolbar').contains('Sign In');
        cy.get('.signin-btn').should('be.disabled');
        cy.get('form').within(() => {
            cy.get('#email').type('sebastian.denis@outlook.com');
            cy.get('.signin-btn').should('be.disabled');
            cy.get('#password').type('marcoruas');
        });
        cy.get('.signin-btn').should('be.enabled');
        cy.get('.signin-btn').click();
        cy.server();
        cy.get('#sideMenuBtn').click();
        cy.get('#sideMenuLinkDashboard').click();
    });
});
