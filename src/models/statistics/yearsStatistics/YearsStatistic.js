import axios from "axios";

export default class YearsStatistic {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.year = 0;
    this.sumClients = 0;
    this.sumCountReservations = 0;
    this.sumCountMainReservation = 0;
    this.sumCountFollowingReservation = 0;
    this.sumPaid = 0;
    this.sumPaidMainReservation = 0;
    this.sumPaidFollowingReservation = 0;
    this.sumRemainingAmount = 0;
    this.sumRemainingAmountMainReservation = 0;
    this.sumRemainingAmountFollowingReservation = 0;
    this.sumRefoundValue = 0;
    this.sumRefoundValueMainReservation = 0;
    this.sumRefoundValueFollowingReservation = 0;
    this.countMonth = 0;
    this.month = [];
  }
  fillData(data) {
    this.diagnosisPlanToken = data.diagnosisPlanToken;
    this.year = data.year;
    this.sumClients = data.sumClients;
    this.sumCountReservations = data.sumCountReservations;
    this.sumCountMainReservation = data.sumCountMainReservation;
    this.sumCountFollowingReservation = data.sumCountFollowingReservation;
    this.sumPaid = data.sumPaid;
    this.sumPaidMainReservation = data.sumPaidMainReservation;
    this.sumPaidFollowingReservation = data.sumPaidFollowingReservation;
    this.sumRemainingAmount = data.sumRemainingAmount;
    this.sumRemainingAmountMainReservation =
      data.sumRemainingAmountMainReservation;
    this.sumRemainingAmountFollowingReservation =
      data.sumRemainingAmountFollowingReservation;
    this.sumRefoundValue = data.sumRefoundValue;
    this.sumRefoundValueMainReservation = data.sumRefoundValueMainReservation;
    this.sumRefoundValueFollowingReservation =
      data.sumRefoundValueFollowingReservation;
    this.countMonth = data.countMonth;
    this.month = data.month;
  }

  async getYearsStatistics(language, userAuthorizeToken, filterData) {
    try {
      let response = await axios.get(
        `/Statistics/GetStatisticsYearsServicesReservations?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&employeeToken=${filterData.employeeToken}&clientToken=${filterData.clientToken}&serviceToken=${filterData.serviceToken}&reservationStatusToken=${filterData.reservationStatusToken}&branchToken=${filterData.branchToken}&buildingToken=${filterData.buildingToken}&chamberToken=${filterData.chamberToken}&floorToken=${filterData.floorToken}&officeTimeToken=${filterData.officeTimeToken}&officeToken=${filterData.officeToken}&dayToken=${filterData.dayToken}&specialSpecialtyToken=${filterData.specialSpecialtyToken}&generalSpecialtyToken=${filterData.generalSpecialtyToken}&feesTypeToken=${filterData.feesTypeToken}&dateFrom=${filterData.dateFrom}&dateTo=${filterData.dateTo}&textSearch=${filterData.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
