export default class UsersPrivilegeServiceResponsibleBonuses {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.serviceResponsibleBonusesView = false;
    this.serviceResponsibleBonusesUpdate = false;
  }
  fillData(data) {
    if (data) {
      this.serviceResponsibleBonusesView = data.serviceResponsibleBonusesView;
      this.serviceResponsibleBonusesUpdate =
        data.serviceResponsibleBonusesUpdate;
    } else {
      this.setInitialValue();
    }
  }
}
