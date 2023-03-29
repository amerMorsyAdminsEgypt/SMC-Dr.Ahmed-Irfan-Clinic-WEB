export default class AddictiveStuffHabits {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountAddictiveStuffHabits = 0;
    this.totalCountAddictiveStuffHabitsNotActive = 0;
    this.totalCountAddictiveStuffHabitsArchived = 0;
  }
  fillData(data) {
    this.totalCountAddictiveStuffHabits = data.totalCountAddictiveStuffHabits;
    this.totalCountAddictiveStuffHabitsNotActive =
      data.totalCountAddictiveStuffHabitsNotActive;
    this.totalCountAddictiveStuffHabitsArchived =
      data.totalCountAddictiveStuffHabitsArchived;
  }
}
