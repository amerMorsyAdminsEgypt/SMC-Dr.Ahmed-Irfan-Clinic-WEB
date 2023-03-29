export default class EmployeesStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountEmployees = 0;
    this.totalCountEmployeesActive = 0;
    this.totalCountEmployeesNotActive = 0;
    this.totalCountEmployeesArchived = 0;
  }
  fillData(data) {
    this.totalCountEmployees = data.totalCountEmployees;
    this.totalCountEmployeesActive = data.totalCountEmployeesActive;
    this.totalCountEmployeesNotActive = data.totalCountEmployeesNotActive;
    this.totalCountEmployeesArchived = data.totalCountEmployeesArchived;
  }
}
