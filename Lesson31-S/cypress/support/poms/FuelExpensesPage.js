export default class FuelExpensesPage {
  pageUrl = '/panel/expenses';
    
  // Elements
  get fuelExpensesNavButton() {
    return cy.get('a[routerlink="/panel/expenses"]').contains('Fuel expenses'); // Fuel expenses navigation menu button  
  }

  get fuelExpensesSidebarButton() {
    return cy.get('a[routerlink="expenses"]').contains('Fuel expenses'); // Fuel expenses sidebar button  
  }

  get carSelectDropdownButton() {
    return cy.get('#carSelectDropdown');  // Dropdown button for car selection
  }
    
  get carSelectDropdownOptions() {
    return cy.get('.dropdown-menu .dropdown-item');  // Options in the dropdown
  }
    
  get deleteExpenseButton() {
    return cy.get('button.btn.btn-delete');  // Delete button for expense
  }  

  get removeExpenseInModalButton() {
    return cy.get('button.btn.btn-danger').contains('Remove') // Remove button for expense in modal
  }
    
  get editExpenseButton() {
    return cy.get('.btn.btn-edit');  // Edit button for expense
  }
    
  get addExpenseButton() {
    return cy.contains('button', 'Add an expense');  // "Add an expense" button
  }
    
  get carSelectInModal() {
    return cy.get('select[name="carId"]');  // Car selection dropdown in the modal
  }
    
  get reportDateInput() {
    return cy.get('#addExpenseDate');  // Report date input field
  }
    
  get mileageInput() {
    return cy.get('input[name="mileage"]');  // Mileage input field
  }
    
  get litersInput() {
    return cy.get('input[name="liters"]');  // Liters input field
  }
    
  get totalCostInput() {
    return cy.get('input[name="totalCost"]');  // Total cost input field
  }
    
  get addButtonInModal() {
    return cy.get('app-add-expense-modal button.btn.btn-primary').contains('Add');  // Submit button in modal
  }
    
  get closeButtonInModal() {
    return cy.get('button.close');  // Close button in modal
  }
    
  get cancelButtonInModal() {
    return cy.get('button.btn.btn-secondary').contains('Cancel');  // Cancel button in modal
  }
    
  get errorMessageEmptyLiters() {
    return cy.contains('p', 'Liters required');  // Error message for empty liters
  }
    
  get errorMessageEmptyTotalCost() {
    return cy.contains('p', 'Total cost required');  // Error message for empty total cost
  }
    
  get errorMessageInvalidLiters() {
    return cy.contains('p', 'Liters has to be from 0.01 to 999');  // Error message for invalid liters
  }
    
  get errorMessageInvalidTotalCost() {
    return cy.contains('p', 'Total cost has to be from 0.01 to 1000000');  // Error message for invalid total cost
  }
    
  // Actions
  openFuelExpensesNav() {
    this.fuelExpensesNavButton.should('be.visible').click();  
    return this;  
  }

  openFuelExpensesSidebar() {
    this.fuelExpensesSidebarButton.should('be.visible').click();
    return this;
  }

  openAddExpenseModal() {
    this.addExpenseButton.click(); 
    return this;
  }
    
  selectCarFromDropdown(carName) {
    this.carSelectDropdownButton.click();  
    this.carSelectDropdownOptions.contains(carName).click();  
    return this.carSelectDropdownButton.should('have.text', carName);  
  }
    
  selectCarInModalDropdown(carName) {
    this.carSelectInModal.select(carName);  
    return this.carSelectInModal.find('option:selected')
      .should('have.text', carName);  
  }
    
  enterReportDate(reportDate) { 
    return this.reportDateInput.clear().type(reportDate); 
  }
        
  enterMileage(mileage) {
    this.mileageInput.clear().type(mileage); 
    return this.mileageInput; 
  }
    
  enterLiters(liters) {
    this.litersInput.clear().type(liters); 
    return this.litersInput;
  }
    
  enterTotalCost(cost) {
    this.totalCostInput.clear().type(cost); 
    return this.totalCostInput; 
  }
    
  submitAddExpenseForm() {
    this.addButtonInModal.click();  
    return this;
  }
    
  cancelAddExpense() {
    this.cancelButtonInModal.click(); 
    return this;
  }
    
  closeModal() {
    this.closeButtonInModal.click();  
    return this;
  }

  deleteExpense() {
    this.deleteExpenseButton.click({ force: true });
    this.removeExpenseInModalButton.click();
    return this;
  }
    
  checkLitersInputValidation() {
    this.litersInput.should('have.class', 'ng-invalid')
      .should('have.class', 'ng-touched')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)');  
    return this;
  }
    
  checkTotalCostInputValidation() {
    this.totalCostInput.should('have.class', 'ng-invalid')
      .should('have.class', 'ng-touched')
      .should('have.css', 'border-color')
      .and('eq', 'rgb(220, 53, 69)');
    return this;
  }
}
