export default class GaragePage {
  pageUrl = '/panel/garage';

  // Elements
  get addCarButton() {
    return cy.contains('button', 'Add car'); // Add car button 
  }
  get carBrandSelect() {
    return cy.get('#addCarBrand'); // Select car brand from drop-down
  }

  get carModelSelect() {
    return cy.get('select[formcontrolname="model"]'); // Select car model from drop-down
  }

  get mileageInput() {
    return cy.get('input[name="mileage"]'); // Mileage imput field
  }

  get submitButton() {
    return cy.get('app-add-car-modal button.btn.btn-primary'); // Add car button in modal
  }

  get errorMessageInvalidMileage() {
    return cy.get('p').contains('Mileage has to be from 0 to 999999'); // Error message for invalid mileage input
  }

  get errorMessageEmptyMileage() {
    return cy.get('p').contains('Mileage cost required'); // Error message for empty mileage
  }

  get closeButton() {
    return cy.get('button.close'); // Cross icon in modal
  }

  get cancelButton() {
    return cy.get('button.btn.btn-secondary').contains('Cancel'); // Cancel button in modal
  }

  getAddExpenseButton(carName) {
    return cy.get('p.car_name.h2')
      .contains(carName) 
      .parents('.car-item') 
      .find('button') 
      .contains('Add fuel expense'); // Add expense button
  }

  // Actions
  openAddCarModal() {
    this.addCarButton.click();
    return this;
  }

  selectCarBrand(brand) {
    const carBrandSelect = this.carBrandSelect;
    carBrandSelect.select(brand); 
    return carBrandSelect; 
  }

  selectCarModel(model) {
    const carModelSelect = this.carModelSelect;
    carModelSelect.select(model); 
    return carModelSelect; 
  }

  clickMileage() {
    this.mileageInput.focus().blur();
    return this.mileageInput; 
  }

  enterMileage(mileage) {
    this.mileageInput.type(mileage); 
    return this.mileageInput; 
  }

  submitAddCarForm() {
    this.submitButton.click();
    return this;
  }

  closeModal() {
    this.closeButton.click();
    return this;
  }

  cancelAddCar() {
    this.cancelButton.click();
    return this;
  }

  checkSubmitButtonDisabled() {
    this.submitButton.should('be.disabled');
    return this;
  }

  checkMileageInputValidation() {
    this.mileageInput.should('have.class', 'ng-invalid')
      .should('have.class', 'ng-touched')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)'); 
    return this;
  }

  clickAddFuelExpenseButton(carName) {
    this.getAddExpenseButton(carName).click(); 
    return this;
  }
}
