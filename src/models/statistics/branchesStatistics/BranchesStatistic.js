import Branches from "./Branches";
import Buildings from "./Buildings";
import Floors from "./Floors";
import Chambers from "./Chambers";
import Offices from "./Offices";
import OfficesTimes from "./OfficesTimes";
import axios from "axios";

export default class BranchesStatistic {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.branches = new Branches();
    this.buildings = new Buildings();
    this.floors = new Floors();
    this.chambers = new Chambers();
    this.offices = new Offices();
    this.officesTimes = new OfficesTimes();
  }
  fillData(data) {
    this.branches.fillData(data.branches);
    this.buildings.fillData(data.buildings);
    this.floors.fillData(data.floors);
    this.chambers.fillData(data.chambers);
    this.offices.fillData(data.offices);
    this.officesTimes.fillData(data.officesTimes);
  }

  async getBranchesInformationStatistics(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Statistics/GetBranchesInformationStatistics?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
