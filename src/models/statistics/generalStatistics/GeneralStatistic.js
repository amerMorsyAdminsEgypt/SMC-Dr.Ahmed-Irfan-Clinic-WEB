import EmployeesStatistics from "./EmployeesStatistics";
import ClientsStatistics from "./ClientsStatistics";
import TreasuriesStatistics from "./TreasuriesStatistics";
import NewsStatistics from "./NewsStatistics";
import OffersStatistics from "./OffersStatistics";
import axios from "axios";

export default class GeneralStatistic {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeesStatistics = new EmployeesStatistics();
    this.clientsStatistics = new ClientsStatistics();
    this.treasuriesStatistics = new TreasuriesStatistics();
    this.newsStatistics = new NewsStatistics();
    this.offersStatistics = new OffersStatistics();
  }
  fillData(data) {
    this.employeesStatistics.fillData(data.employeesStatistics);
    this.clientsStatistics.fillData(data.clientsStatistics);
    this.treasuriesStatistics.fillData(data.treasuriesStatistics);
    this.newsStatistics.fillData(data.newsStatistics);
    this.offersStatistics.fillData(data.offersStatistics);
  }

  async getGeneralStatistics(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Statistics/GetGeneralStatistics?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
