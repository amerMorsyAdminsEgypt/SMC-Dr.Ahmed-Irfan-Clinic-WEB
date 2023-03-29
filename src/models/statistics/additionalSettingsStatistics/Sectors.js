export default class Sectors {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountSectors = 0;
    this.totalCountSectorsNotActive = 0;
    this.totalCountSectorsArchived = 0;
  }
  fillData(data) {
    this.totalCountSectors = data.totalCountSectors;
    this.totalCountSectorsNotActive = data.totalCountSectorsNotActive;
    this.totalCountSectorsArchived = data.totalCountSectorsArchived;
  }
}
