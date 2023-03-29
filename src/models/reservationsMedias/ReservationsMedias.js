import PaginationData from "@/models/general/PaginationData";
import ReservationMedia from "@/models/reservationsMedias/ReservationMedia";
import ReservationsMediasFilter from "@/models/reservationsMedias/ReservationsMediasFilter";

export default class ReservationsMedias {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.pagination = new PaginationData();
    this.reservationsMediasData = [];
    this.reservationMedia = new ReservationMedia();
    this.filterData = new ReservationsMediasFilter();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.pagination.fillData(data.servicesReservationsMediaPagination);
    this.reservationsMediasData =
      data.servicesReservationsMediaPagination.servicesReservationsMediaData;
  }
}
