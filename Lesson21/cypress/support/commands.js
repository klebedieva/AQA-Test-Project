// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (email, password) => {
  cy.contains('button.header_signin', 'Sign In')
    .should('be.visible')
    .click();
  cy.get('#signinEmail').clear().type(email); 
  cy.get('#signinPassword').clear().type(password, { sensitive: true }); 
  cy.contains('button', 'Login').click(); 
});

Cypress.Commands.add('apiLogin', () => {
  return cy.request({
    method: 'POST',
    url: '/api/auth/signin',
    body: {
      email: Cypress.env('defaultUserEmail'),
      password: Cypress.env('defaultUserPassword')
    }
  }).then(res => res.body.data.accessToken);
});

Cypress.Commands.add('createExpense', (token, carId, expenseData) => {
  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      carId,
      ...expenseData,
    },
  });
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }
  return originalFn(element, text, options)
})

Cypress.Commands.overwrite('visit', (originalFn, ...args) => {
  originalFn(args[0],
    {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
      ...args
    })
})