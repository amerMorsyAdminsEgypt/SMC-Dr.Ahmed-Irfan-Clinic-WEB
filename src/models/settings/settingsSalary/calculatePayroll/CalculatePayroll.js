import axios from "axios";

export default class CalculatePayroll {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeeToken = "";
    this.month = "";
    this.year = "";
  }
  fillData(data) {
    this.employeeToken = data.employeeToken;
    this.month = data.month;
    this.year = data.year;
  }

  async getEmployeePayroll(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/EmployeesPayroll/GetEmployeePayroll?language=${language}&userAuthorizeToken=${userAuthorizeToken}&employeeToken=${this.employeeToken}&month=${this.month}&year=${this.year}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
