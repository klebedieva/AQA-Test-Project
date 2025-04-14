import { GaragePage, FuelExpensesPage } from '../support/poms';

describe('Add and verify car via UI and API', function () {
  const garagePage = new GaragePage();
  let accessToken;
  let createdCarId;

  before(() => {
    cy.apiLogin().then((token) => {
      accessToken = token;
    });
  });

  it('should add a car successfully (Audi/TT/50000)', () => {
    cy.intercept('POST', '/api/cars').as('createCar');

    cy.visit('/');
    garagePage.openAddCarModal();
    garagePage.selectCarBrand('Audi').should('have.value', '0: 1');
    garagePage.selectCarModel('TT').should('have.value', '0: 1');
    garagePage.enterMileage('50000').should('have.value', '50000');
    garagePage.submitAddCarForm();

    cy.wait('@createCar').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      createdCarId = interception.response.body.data.id;
      cy.writeFile('cypress/fixtures/car.json', { carId: createdCarId });
    });

    cy.get('p.car_name.h2').should('contain.text', 'Audi TT');
  });

  it('should validate that created car exists in GET /cars response', () => {
    const expectedBrand = 'Audi';
    const expectedModel = 'TT';
    const expectedMileage = 50000;
  
    cy.apiLogin().then((token) => {
      cy.readFile('cypress/fixtures/car.json').then((data) => {
        const carId = data.carId;
  
        cy.request({
          method: 'GET',
          url: '/api/cars',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          const cars = response.body.data;
          const createdCar = cars.find((car) => car.id === carId);
  
          expect(createdCar).to.exist;
          expect(createdCar.brand).to.eq(expectedBrand);
          expect(createdCar.model).to.eq(expectedModel);
          expect(createdCar.mileage).to.eq(expectedMileage);
        });
      });
    });
  });
});


describe('Create and validate expense via API', function () {
  before(function () {
    cy.apiLogin().then((token) => {
      this.token = token;
    });

    cy.fixture('car.json').then((data) => {
      this.carId = data.carId;
    });
  });

  it('should create expense via API and validate response', function () {
    const expenseData = {
      reportedAt: '2025-04-14',
      mileage: 50001,
      liters: 20,
      totalCost: 100,
      forceMileage: false,
    };
    cy.createExpense(this.token, this.carId, expenseData).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.eq('ok');

      const data = res.body.data;
      expect(data.carId).to.eq(this.carId);
      expect(data.reportedAt).to.eq(expenseData.reportedAt);
      expect(data.mileage).to.eq(expenseData.mileage);
      expect(data.liters).to.eq(expenseData.liters);
      expect(data.totalCost).to.eq(expenseData.totalCost);
      expect(data.id).to.be.a('number');
    });
  });
});


describe('Validate expense in UI', () => {
  const fuelExpensesPage = new FuelExpensesPage(); 
  const garagePage = new GaragePage(); 
  const email = Cypress.env('defaultUserEmail');
  const password = Cypress.env('defaultUserPassword');
  
  const expectedExpense = {
    reportedAt: '14.04.2025',
    mileage: '50001',
    liters: '20L',
    totalCost: '100.00 USD',
  };
  
  beforeEach(() => {
    cy.visit('');
    cy.login(email, password);
  });
  
  it('should find created expense for correct car in UI', () => {
    fuelExpensesPage.openFuelExpensesSidebar();
    cy.get('#carSelectDropdown').should('be.visible').and('contain.text', 'Audi TT');
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain', expectedExpense.reportedAt);
      cy.get('td').eq(1).should('contain', expectedExpense.mileage);
      cy.get('td').eq(2).should('contain', expectedExpense.liters);
      cy.get('td').eq(3).should('contain', expectedExpense.totalCost);
    });
  });
});