describe('Registration Form Tests', () => {
  const email = 'dinwinchester060402@gmail.com';
  const password = 'Password1';
  const name = 'Din';
  const lastName = 'Winchester';
    
  beforeEach(() => {
    cy.visit('');
    cy.get('button').contains('Sign up').should('be.visible').click();
    cy.get('#signupName', { timeout: 10000 }).should('be.visible');  
  });
  
  
  it('should show error if name and last name are less than 2 characters', () => {
    cy.get('#signupName').type('A'); 
    cy.get('#signupLastName').type('B'); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupName')
      .parent().contains('Name has to be from 2 to 20 characters long')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupLastName')
      .parent().contains('Last name has to be from 2 to 20 characters long')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if name and last name are more than 20 characters', () => {
    cy.get('#signupName').type('aaaaaaaaaaaaaaaaaaaaa'); 
    cy.get('#signupLastName').type('aaaaaaaaaaaaaaaaaaaaa'); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupName')
      .parent()
      .contains('Name has to be from 2 to 20 characters long')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupLastName')
      .parent()
      .contains('Last name has to be from 2 to 20 characters long')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if name and last name are empty', () => {
    cy.get('#signupName').click(); 
    cy.get('#signupLastName').click(); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupName')
      .parent()
      .contains('Name required')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupLastName')
      .parent()
      .contains('Last name required')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if name and last name are numbers', () => {
    cy.get('#signupName').type('123'); 
    cy.get('#signupLastName').type('123'); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupName')
      .parent()
      .contains('Name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupLastName')
      .parent().contains('Last name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if name and last name are not english letters', () => {
    cy.get('#signupName').type('фф'); 
    cy.get('#signupLastName').type('фф'); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupName')
      .parent()
      .contains('Name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupLastName')
      .parent().contains('Last name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if email is without @', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type('test');
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupEmail')
      .parent()
      .contains('Email is incorrect')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if email is with unvalid domain', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type('test@test');
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupEmail')
      .parent()
      .contains('Email is incorrect')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if email, password and re-enter password are empty', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').focus();  
    cy.get('#signupPassword').focus();
    cy.get('#signupRepeatPassword').focus().blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupEmail')
      .parent()
      .contains('Email required')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupPassword')
      .parent()
      .contains('Password required')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Re-enter password required')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if name and last name are with space', () => {
    cy.get('#signupName').type('a_a'); 
    cy.get('#signupLastName').type('a_a'); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupName')
      .parent()
      .contains('Name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupLastName')
      .parent().
      contains('Last name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('should show error if name and last name are with hyphen', () => {
    cy.get('#signupName').type('a-a'); 
    cy.get('#signupLastName').type('a-a'); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password);
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupName')
      .parent().
      contains('Name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#signupLastName')
      .parent().
      contains('Last name is invalid')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
  
  it('shoud show error if password and re-enter password do not match', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password);
    cy.get('#signupRepeatPassword').type(password + '1').blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Passwords do not match')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
  });
  
  it('should show error if password is less than 8 characters', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type('Passwo1');
    cy.get('#signupRepeatPassword').type('Passwo1').blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .scrollIntoView()
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
  });
  
  it('should show error if password is more than 15 characters', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type('Password11111111');
    cy.get('#signupRepeatPassword').type('Password11111111').blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .scrollIntoView()
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
  });
  
  it('should show error if password is without capital letter', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type('password1');
    cy.get('#signupRepeatPassword').type('password1').blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .scrollIntoView()
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');   
  });
  
  it('should show error if password is without small letter', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type('PASSWORD1');
    cy.get('#signupRepeatPassword').type('PASSWORD1').blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .scrollIntoView()
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
  });
  
  it('should show error if password is without number', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type('Password');
    cy.get('#signupRepeatPassword').type('Password').blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .scrollIntoView()
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
  });
  
  it('should show error if password is only numbers', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(12345678);
    cy.get('#signupRepeatPassword').type(12345678).blur();
    cy.get('button').contains('Register').should('be.disabled');
    cy.get('#signupPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
    cy.get('#signupRepeatPassword')
      .parent()
      .contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
      .scrollIntoView()
      .should('be.visible')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)'); 
  });
  
  it('should successfully sign up with valid details', () => {
    cy.get('#signupName').type(name); 
    cy.get('#signupLastName').type(lastName); 
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(password, { sensitive: true });
    cy.get('button').contains('Register').should('be.enabled').click();
    cy.url().should('include', '/garage');
    cy.contains('Garage').should('be.visible');
  });
});
  
  
describe('Login tests', () => {
  const email = 'dinwinchester060402@gmail.com';
  const password = 'Password1';
  const name = 'Din';
  const lastName = 'Winchester';
  
  beforeEach(() => {
    cy.visit('');
  });
  
  it('should successfully sign in using custom command', () => {
    cy.login(email, password);
    cy.get('#signinPassword').should('have.value', password);
    //  Verify that the name and last name are correctly displayed in Profile
    cy.get('nav.sidebar')  
      .find('a.btn-sidebar')  
      .filter('[routerlink="profile"]')  
      .should('be.visible')  
      .click();
    cy.get('p.profile_name.display-4')  
      .should('contain', name)           
      .and('contain', lastName);         
  });
});