export default class ServiceResponsibleBonusesDetailsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.serviceResponsibleBonusesDetailsToken = "";
    this.serviceToken = "";
    this.serviceNameCurrent = "";
    this.serviceResponsibleBonuseToken = "";
    this.discountPercentage = "";
    this.serviceResponsibleBonusesDetailsArchiveStatus = "";
  }
  fillData(data) {
    if (data) {
      this.serviceResponsibleBonusesDetailsToken =
        data.serviceResponsibleBonusesDetailsToken ?? "";
      this.serviceToken = data.serviceToken ?? "";
      this.serviceNameCurrent = data.serviceNameCurrent ?? "";
      this.serviceResponsibleBonuseToken =
        data.serviceResponsibleBonuseToken ?? "";
      this.discountPercentage = data.discountPercentage ?? "";
      this.serviceResponsibleBonusesDetailsArchiveStatus =
        data.serviceResponsibleBonusesDetailsArchiveStatus ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
