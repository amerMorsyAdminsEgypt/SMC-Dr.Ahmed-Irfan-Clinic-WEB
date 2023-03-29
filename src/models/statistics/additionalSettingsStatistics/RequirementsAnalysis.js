export default class RequirementsAnalysis {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountRequirementsAnalysis = 0;
    this.totalCountRequirementsAnalysisNotActive = 0;
    this.totalCountRequirementsAnalysisArchived = 0;
  }
  fillData(data) {
    this.totalCountRequirementsAnalysis = data.totalCountRequirementsAnalysis;
    this.totalCountRequirementsAnalysisNotActive =
      data.totalCountRequirementsAnalysisNotActive;
    this.totalCountRequirementsAnalysisArchived =
      data.totalCountRequirementsAnalysisArchived;
  }
}
