export default class Medicines {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountMedicines = 0;
    this.totalCountMedicinesNotActive = 0;
    this.totalCountMedicinesArchived = 0;
  }
  fillData(data) {
    this.totalCountMedicines = data.totalCountMedicines;
    this.totalCountMedicinesNotActive = data.totalCountMedicinesNotActive;
    this.totalCountMedicinesArchived = data.totalCountMedicinesArchived;
  }
}
