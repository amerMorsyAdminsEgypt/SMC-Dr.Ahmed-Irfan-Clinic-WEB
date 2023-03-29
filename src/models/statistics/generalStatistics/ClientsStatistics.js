export default class ClientsStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountClients = 0;
    this.totalCountClientsActive = 0;
    this.totalCountClientsNotActive = 0;
    this.totalCountClientsArchived = 0;
  }
  fillData(data) {
    this.totalCountClients = data.totalCountClients;
    this.totalCountClientsActive = data.totalCountClientsActive;
    this.totalCountClientsNotActive = data.totalCountClientsNotActive;
    this.totalCountClientsArchived = data.totalCountClientsArchived;
  }
}
