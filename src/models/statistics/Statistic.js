import axios from "axios";
import GeneralStatistic from "./generalStatistics/GeneralStatistic";
import BranchesStatistic from "./branchesStatistics/BranchesStatistic";
import AdditionalSettingsStatistic from "./additionalSettingsStatistics/AdditionalSettingsStatistic";

export default class Statistic {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.generalStatisticsData = new GeneralStatistic();
    this.branchesInformationStatisticsData = new BranchesStatistic();
    this.additionalSettingsStatisticsData = new AdditionalSettingsStatistic();
    this.yearsData = [];
  }
  fillData(data) {
    this.generalStatisticsData.fillData(data.generalStatisticsData);
    this.branchesInformationStatisticsData.fillData(
      data.branchesInformationStatisticsData
    );
    this.additionalSettingsStatisticsData.fillData(
      data.additionalSettingsStatisticsData
    );
    this.yearsData = data.yearsData;
  }

  async getAllStatistics(language, userAuthorizeToken, filterData) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      servicesReservationDataSearch: {
        filterStatus: true,
        dateFrom: filterData.dateFrom,
        dateTo: filterData.dateTo,
        timeFrom: filterData.timeFrom,
        timeTo: filterData.timeTo,
        serviceToken: filterData.serviceToken,
        reservationStatusToken: filterData.reservationStatusToken,
        employeeToken: filterData.employeeToken,
        clientToken: filterData.clientToken,
        branchToken: filterData.branchToken,
        buildingToken: filterData.buildingToken,
        chamberToken: filterData.chamberToken,
        floorToken: filterData.floorToken,
        officeTimeToken: filterData.officeTimeToken,
        officeToken: filterData.officeToken,
        dayToken: filterData.dayToken,
        specialSpecialtyToken: filterData.specialSpecialtyToken,
        generalSpecialtyToken: filterData.generalSpecialtyToken,
        feesTypeToken: filterData.feesTypeToken,
        textSearch: filterData.textSearch,
      },
    };

    try {
      let response = await axios.post(`/Statistics/GetAllStatistics`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
