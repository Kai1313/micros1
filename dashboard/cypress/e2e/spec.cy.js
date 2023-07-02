describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.6:3001'); // Assuming '/dashboard' is the URL for your Dashboard page
  });

  it('displays data on Card 1', () => {
    cy.request('http://127.0.0.1:3000/users/api/getJson')
      .its('body')
      .then((response) => {
        const { count, message } = response;
        cy.get('[data-testid="card1"]').should('not.contain', 'Loading...');
        cy.get('[data-testid="card1"]').should('contain', `${message} ${count}`);
      });
  
    cy.request('http://127.0.0.1:3000/users/api/getInner')
      .its('body')
      .then((response) => {
        const { count, message } = response;
        cy.get('[data-testid="card2"]').should('not.contain', 'Loading...');
        cy.get('[data-testid="card2"]').should('contain', `${message} ${count}`);
      });
  
    // Listen for uncaught exceptions
    cy.on('uncaught:exception', (err, runnable) => {
      // Handle the error if the request fails
      console.error('Error fetching data:', err);
      return false; // Return false to prevent the error from failing the test
    });
  });
  
  it('inputs value into Card 2 and clicks submit', () => {
    // Input value into Card 2
    cy.get('[data-testid="inputValue"]').type('10');
    
    // Click the submit button
    cy.get('[data-testid="btnPrepare"]').click();

    // Wait for the SweetAlert dialog to appear
    cy.get('.swal-modal').should('be.visible');
    
    // Assert the SweetAlert content
    cy.get('.swal-modal')
      .should('contain', 'Preparing Data')
      .and('contain', 'Processing...');
    
    // // Wait for the SweetAlert dialog to disappear
    // cy.get('.swal-modal').should('not.be.visible');
    
    // // Assert the updated content of Card 1
    // cy.get('[data-testid="card1"]').should('not.contain', 'Loading...');
    // cy.get('[data-testid="card1"]').should('contain', 'remaining available data 10');
  });
});
