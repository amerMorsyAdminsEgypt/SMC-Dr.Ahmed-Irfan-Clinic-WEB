import PaginationData from "@/models/general/PaginationData";
import ServicesReservationAddedService from "@/models/servicesReservationAddedServices/ServicesReservationAddedService";
import ServicesReservationAddedServicesFilter from "@/models/servicesReservationAddedServices/ServicesReservationAddedServicesFilter";

export default class ServicesReservationAddedServices {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.servicesReservationAddedServicesData = [];
    this.servicesReservationAddedService =
      new ServicesReservationAddedService();
    this.filterData = new ServicesReservationAddedServicesFilter();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.pagination.fillData(data.servicesReservationAddedServicesPagination);
    this.servicesReservationAddedServicesData =
      data.servicesReservationAddedServicesPagination.servicesReservationAddedServicesData;
  }
}
