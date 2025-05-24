import {GaragePage, FuelExpensesPage} from '../support/poms'

describe('Add a car', () => {
  const email = Cypress.env('defaultUserEmail');
  const password = Cypress.env('defaultUserPassword');
  const garagePage = new GaragePage();
  
  beforeEach(() => {
    cy.visit('');
    cy.login(email, password);  
  });
  
  it('should add a car successfully (Audi/TT/50000)', () => { 
    garagePage.openAddCarModal();
    garagePage.selectCarBrand('Audi').should('have.value', '0: 1');
    garagePage.selectCarModel('TT').should('have.value', '0: 1');
    garagePage.enterMileage('50000').should('have.value', '50000');
    garagePage.submitAddCarForm();
    cy.get('p.car_name.h2').should('contain.text', 'Audi TT');
  });

  it('should add a second car successfully (BMW//5/100000)', () => { 
    garagePage.openAddCarModal();
    garagePage.selectCarBrand('BMW').should('have.value', '1: 2');
    garagePage.selectCarModel('5').should('have.value', '6: 7');
    garagePage.enterMileage('100000').should('have.value', '100000');
    garagePage.submitAddCarForm();
    cy.get('p.car_name.h2').should('contain.text', 'BMW 5');
  });
  
  it('should show error if mileage is more than 999999', () => { 
    garagePage.openAddCarModal();
    garagePage.selectCarBrand('Ford').should('have.value', '2: 3');
    garagePage.selectCarModel('Fusion').should('have.value', '7: 13');
    garagePage.enterMileage('1111111').should('have.value', '1111111').focus().blur();
    garagePage.checkSubmitButtonDisabled();
    garagePage.errorMessageInvalidMileage.should('be.visible');
  });


  it('should show error if mileage is empty', () => {
    garagePage.openAddCarModal();
    garagePage.selectCarBrand('Audi').should('have.value', '0: 1');
    garagePage.selectCarModel('TT').should('have.value', '0: 1');
    garagePage.clickMileage();
    garagePage.checkSubmitButtonDisabled();
    garagePage.errorMessageEmptyMileage.should('be.visible');
  });
  
  it('should close the modal when the close button is clicked', () => {
    garagePage.openAddCarModal();
    garagePage.closeModal();
    cy.get('.modal').should('not.exist');
  });

  it('should cancel the action when the cancel button is clicked', () => {
    garagePage.openAddCarModal();
    garagePage.cancelAddCar();
    cy.get('.modal').should('not.exist');
  });
});
  
describe('Add fuel expenses', () => {
  const fuelExpensesPage = new FuelExpensesPage(); 
  const garagePage = new GaragePage(); 
  const email = Cypress.env('defaultUserEmail');
  const password = Cypress.env('defaultUserPassword');

  beforeEach(() => {
    cy.visit('');
    cy.login(email, password);  
  });

  context('Adding and Deleting Expense Tests', () => {
    afterEach(() => {
      fuelExpensesPage.deleteExpense();
      cy.get('p.panel-empty_message')
        .should('be.visible')
        .and('contain.text', 'You don’t have any fuel expenses filed in');
    });
  
    it('should successfully add a fuel expense via button next to car', () => {
      garagePage.clickAddFuelExpenseButton('Audi TT'); 
      fuelExpensesPage.enterMileage('50001')
        .should('have.value', '50001'); 
      fuelExpensesPage.enterLiters('20')
        .should('have.value', '20'); 
      fuelExpensesPage.enterTotalCost('100')
        .should('have.value', '100'); 
      fuelExpensesPage.submitAddExpenseForm(); 
      cy.url().should('include', '/panel/expenses');
      cy.get('table').find('tr').should('have.length.greaterThan', 1); 
    });

    it('should successfully add fuel expenses for another car from drop-down', () => {
      garagePage.clickAddFuelExpenseButton('Audi TT');
      fuelExpensesPage.selectCarInModalDropdown('BMW 5'); 
      fuelExpensesPage.enterMileage('100001')
        .should('have.value', '100001');  
      fuelExpensesPage.enterLiters('50')
        .should('have.value', '50');  
      fuelExpensesPage.enterTotalCost('300')
        .should('have.value', '300');  
      fuelExpensesPage.submitAddExpenseForm();
      cy.url().should('include', '/panel/expenses');
      fuelExpensesPage.selectCarFromDropdown('BMW 5');
      cy.get('table').find('tr').should('have.length.greaterThan', 1);
    });

    it('should successfully add fuel expense for a car via navigation button', () => {
      fuelExpensesPage.openFuelExpensesNav();
      fuelExpensesPage.carSelectDropdownButton.should('have.text', 'BMW 5');
      fuelExpensesPage.openAddExpenseModal();
      fuelExpensesPage.enterMileage('100001')
        .should('have.value', '100001');  
      fuelExpensesPage.enterLiters('50')
        .should('have.value', '50');  
      fuelExpensesPage.enterTotalCost('300')
        .should('have.value', '300');  
      fuelExpensesPage.submitAddExpenseForm();
      cy.url().should('include', '/panel/expenses');
      cy.get('table').find('tr').should('have.length.greaterThan', 1);
    });

    it('should successfully add fuel expense for a car via sidebar button', () => {
      fuelExpensesPage.openFuelExpensesSidebar();
      fuelExpensesPage.selectCarFromDropdown('Audi TT');
      fuelExpensesPage.openAddExpenseModal();
      fuelExpensesPage.enterMileage('50001')
        .should('have.value', '50001');  
      fuelExpensesPage.enterLiters('20')
        .should('have.value', '20');  
      fuelExpensesPage.enterTotalCost('100')
        .should('have.value', '100');  
      fuelExpensesPage.submitAddExpenseForm();
      cy.url().should('include', '/panel/expenses');
      cy.get('table').find('tr').should('have.length.greaterThan', 1);
      fuelExpensesPage.deleteExpense();
    });
  });


  it('should show error if liters and total cost are 0', () => {
    garagePage.clickAddFuelExpenseButton('Audi TT');
    fuelExpensesPage.enterMileage('50001')
      .should('have.value', '50001'); 
    fuelExpensesPage.enterLiters('0')
      .should('have.value', '0');
    fuelExpensesPage.enterTotalCost('0')
      .should('have.value', '0')
      .blur(); 
    fuelExpensesPage.checkLitersInputValidation();
    fuelExpensesPage.errorMessageInvalidLiters.should('be.visible');
    fuelExpensesPage.checkTotalCostInputValidation();
    fuelExpensesPage.errorMessageInvalidTotalCost.should('be.visible');
  });

  it('should show error if liters and total cost are empty', () => {
    garagePage.clickAddFuelExpenseButton('Audi TT');
    fuelExpensesPage.enterMileage('50001')
      .should('have.value', '50001'); 
    fuelExpensesPage.litersInput.focus().blur(); 
    fuelExpensesPage.totalCostInput.focus().blur(); 
    fuelExpensesPage.checkLitersInputValidation();
    fuelExpensesPage.errorMessageEmptyLiters.should('be.visible');
    fuelExpensesPage.checkTotalCostInputValidation();
    fuelExpensesPage.errorMessageEmptyTotalCost.should('be.visible');
  });

  it('should successfully change report date in modal', () => {
    garagePage.clickAddFuelExpenseButton('Audi TT');
    fuelExpensesPage.enterReportDate('03.04.2025')  
      .should('have.value', '03.04.2025'); 
  });

  it('should close modal when close button is clicked', () => {
    garagePage.clickAddFuelExpenseButton('Audi TT'); 
    fuelExpensesPage.closeModal();
    cy.get('.modal').should('not.exist');
  });

  it('should close modal when cancel button is clicked', () => {
    garagePage.clickAddFuelExpenseButton('Audi TT'); 
    fuelExpensesPage.cancelAddExpense();
    cy.get('.modal').should('not.exist');
  });
});