export default class AddictiveStuffChronicDiseases {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountAddictiveStuffChronicDiseases = 0;
    this.totalCountAddictiveStuffChronicDiseasesNotActive = 0;
    this.totalCountAddictiveStuffChronicDiseasesArchived = 0;
  }
  fillData(data) {
    this.totalCountAddictiveStuffChronicDiseases =
      data.totalCountAddictiveStuffChronicDiseases;
    this.totalCountAddictiveStuffChronicDiseasesNotActive =
      data.totalCountAddictiveStuffChronicDiseasesNotActive;
    this.totalCountAddictiveStuffChronicDiseasesArchived =
      data.totalCountAddictiveStuffChronicDiseasesArchived;
  }
}
