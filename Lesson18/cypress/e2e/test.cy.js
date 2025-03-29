describe('Qauto Header and Footer Tests', () => {
  beforeEach(() => {
    cy.visit('https://qauto.forstudy.space/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      }
    });
  });

  it('should find and click "Home" link', () => {
    cy.contains('a.header-link', 'Home') 
      .should('be.visible')
      .click();
    cy.url().should('include', '/');
  });


  it('should find and click "About" link', () => {
    cy.get('button[appscrollto="aboutSection"]')
      .should('be.visible')
      .contains('About')
      .click();
  });

  it('should find and click "Contacts" link', () => {
    cy.get('button[appscrollto="contactsSection"]')
      .should('be.visible') 
      .contains('Contacts') 
      .click(); 

    cy.contains('h2', 'Contacts').should('be.visible');
  });
  

  it('should find and click "Guest log in" button', () => {
    cy.contains('button.header-link.-guest', 'Guest log in')
      .should('be.visible')
      .click();

    cy.url().should('include', '/garage');
    cy.contains('Garage').should('be.visible');
  });


  it('should find and click "Sign In" button', () => {
    cy.contains('button.header_signin', 'Sign In') 
      .should('be.visible') 
      .click(); 
  
    // Verifying that all elements are present on the Log in form
    cy.contains('Log in').should('be.visible');
    cy.get('#signinEmail').should('be.visible');
    cy.get('#signinPassword').should('be.visible');
    cy.contains('button', 'Registration').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
    cy.contains('button', 'Forgot password').should('be.visible');
    cy.get('input[type="checkbox"]#remember')
      .should('be.visible')
      .and('have.attr', 'type', 'checkbox')   
      .and('not.be.checked');                 
  });

  it('should find and click "Sign up" button', () => {
    cy.get('button.hero-descriptor_btn.btn.btn-primary') 
      .contains('Sign up')
      .should('be.visible')
      .click();  

    // Verifying that all elements are present on the Registration form
    cy.contains('Registration').should('be.visible');
    cy.get('#signupName').should('be.visible');
    cy.get('#signupLastName').should('be.visible');
    cy.get('#signupEmail').should('be.visible');
    cy.get('#signupPassword').should('be.visible');
    cy.get('#signupRepeatPassword').should('be.visible');
    cy.get('button').contains('Register').should('be.visible');
    cy.get('button.close').should('be.visible');
  });

  it('should find and click "Facebook" icon', () => {
    cy.get('a.socials_link[href*="facebook.com"]') 
      .should('be.visible') 
      .find('.icon-facebook') 
      .should('exist') 
      .click(); 
  });


  it('should find and click "Telegram" icon', () => {
    cy.get('a.socials_link[href*="t.me"]') 
      .find('.icon-telegram')  
      .should('be.visible')  
      .click();  

  });


  it('should find and click "Youtube" icon', () => {
    cy.get('.socials_link')
      .filter('[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]')  
      .should('be.visible')  
      .find('.icon-youtube')  
      .should('be.visible')  
      .click();  
  });


  it('should find and click "Instagram" icon', () => {
    cy.get('a.socials_link[href*="instagram.com"]')  
      .should('be.visible') 
      .invoke('attr', 'href') 
      .should('include', 'instagram.com'); 
    cy.get('a.socials_link[href*="instagram.com"]') 
      .click(); 
  });


  it('should find and click "LinkedIn" icon', () => {
    cy.get('.contacts_socials a').eq(4) 
      .should('have.attr', 'href') 
      .and('include', 'linkedin.com') 
  });

  
  it('should find and click "ithillel.ua" link', () => {
    cy.get('a.contacts_link[href="https://ithillel.ua"]').contains('ithillel.ua').click();
  });

  it('should find and verify email address', () => {
    cy.get('a[href^="mailto:"]')
      .should('have.attr', 'href')
      .and('include', '@ithillel.ua');
  });

});