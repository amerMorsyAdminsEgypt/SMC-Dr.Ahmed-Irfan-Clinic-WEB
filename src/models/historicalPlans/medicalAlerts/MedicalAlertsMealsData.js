export default class MedicalAlertsMealsData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalAlertsMealsToken = "";
    this.medicalAlertToken = "";
    this.mealsTypeToken = "";
    this.mealsTypeNameCurrent = "";
    this.mealToken = "";
    this.mealNameCurrent = "";
    this.mealImagePath = "";
    this.medicalAlertsMealsNotes = "";
    this.medicalAlertsMealsArchiveStatus = "";
  }
  fillData(data) {
    this.medicalAlertsMealsToken = data.medicalAlertsMealsToken;
    this.medicalAlertToken = data.medicalAlertToken;
    this.mealsTypeToken = data.mealsTypeToken;
    this.mealsTypeNameCurrent = data.mealsTypeNameCurrent;
    this.mealToken = data.mealToken;
    this.mealNameCurrent = data.mealNameCurrent;
    this.mealImagePath = data.mealImagePath;
    this.medicalAlertsMealsNotes = data.medicalAlertsMealsNotes;
    this.medicalAlertsMealsArchiveStatus = data.medicalAlertsMealsArchiveStatus;
  }
}
