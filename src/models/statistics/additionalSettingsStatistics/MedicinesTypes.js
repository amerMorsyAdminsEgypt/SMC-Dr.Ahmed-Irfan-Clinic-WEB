export default class MedicinesTypes {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountMedicinesTypes = 0;
    this.totalCountMedicinesTypesNotActive = 0;
    this.totalCountMedicinesTypesArchived = 0;
  }
  fillData(data) {
    this.totalCountMedicinesTypes = data.totalCountMedicinesTypes;
    this.totalCountMedicinesTypesNotActive =
      data.totalCountMedicinesTypesNotActive;
    this.totalCountMedicinesTypesArchived =
      data.totalCountMedicinesTypesArchived;
  }
}
