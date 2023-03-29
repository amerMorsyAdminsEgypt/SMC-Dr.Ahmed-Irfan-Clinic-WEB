export default class SpecialSpecialties {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountSpecialSpecialties = 0;
    this.totalCountSpecialSpecialtiesNotActive = 0;
    this.totalCountSpecialSpecialtiesArchived = 0;
  }
  fillData(data) {
    this.totalCountSpecialSpecialties = data.totalCountSpecialSpecialties;
    this.totalCountSpecialSpecialtiesNotActive =
      data.totalCountSpecialSpecialtiesNotActive;
    this.totalCountSpecialSpecialtiesArchived =
      data.totalCountSpecialSpecialtiesArchived;
  }
}
