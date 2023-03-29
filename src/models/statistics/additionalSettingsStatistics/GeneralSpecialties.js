export default class GeneralSpecialties {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountGeneralSpecialties = 0;
    this.totalCountGeneralSpecialtiesNotActive = 0;
    this.totalCountGeneralSpecialtiesArchived = 0;
  }
  fillData(data) {
    this.totalCountGeneralSpecialties = data.totalCountGeneralSpecialties;
    this.totalCountGeneralSpecialtiesNotActive =
      data.totalCountGeneralSpecialtiesNotActive;
    this.totalCountGeneralSpecialtiesArchived =
      data.totalCountGeneralSpecialtiesArchived;
  }
}
