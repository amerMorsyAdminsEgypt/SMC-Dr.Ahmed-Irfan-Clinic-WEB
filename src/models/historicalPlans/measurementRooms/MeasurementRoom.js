import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import PaginationData from "@/models/general/PaginationData";

export default class measurementRoom {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.measurementRoomToken = "";
    this.reservationToken = "";
    this.reservationCode = "";
    this.reservationDate = "";
    this.clientToken = "";
    this.clientNameCurrent = "";
    this.clientCode = "";
    this.clientPhone = "";
    this.clientCountryCode = "";
    this.clientPhoneWithCC = "";
    this.clientImagePath = "";
    this.employeeToken = "";
    this.employeeCode = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.employeeNameCurrent = "";
    this.employeeImagePath = "";
    this.jobToken = "";
    this.jobNameCurrent = "";
    this.measurementRoomEmployeeToken = "";
    this.measurementRoomEmployeeNameCurrent = "";
    this.measurementRoomDateTime = "";
    this.measurementRoomDate = "";
    this.measurementRoomTime = "";
    this.measurementRoomLength = "";
    this.measurementRoomWeight = "";
    this.measurementRoomPressure = "";
    this.measurementRoomBreathingRate = "";
    this.measurementRoomPulseRate = "";
    this.measurementRoomTemperature = "";
    this.measurementRoomSuger = "";
    this.measurementRoomBmr = "";
    this.measurementRoomHeartRate = "";
    this.measurementRoomNote = "";
    this.measurementRoomArchiveStatus = "";
    this.paginationData = new PaginationData();
    this.textSearch = "";
  }
  fillData(data) {
    this.measurementRoomToken = data.measurementRoomToken;
    this.reservationToken = data.reservationToken;
    this.reservationCode = data.reservationCode;
    this.reservationDate = data.reservationDate;
    this.clientToken = data.clientToken;
    this.clientNameCurrent = data.clientNameCurrent;
    this.clientCode = data.clientCode;
    this.clientPhone = data.clientPhone;
    this.clientCountryCode = data.clientCountryCode;
    this.clientPhoneWithCC = data.clientPhoneWithCC;
    this.clientImagePath = data.clientImagePath;
    this.employeeToken = data.employeeToken;
    this.employeeCode = data.employeeCode;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.employeeNameCurrent = data.employeeNameCurrent;
    this.employeeImagePath = data.employeeImagePath;
    this.jobToken = data.jobToken;
    this.jobNameCurrent = data.jobNameCurrent;
    this.measurementRoomEmployeeToken = data.measurementRoomEmployeeToken;
    this.measurementRoomEmployeeNameCurrent =
      data.measurementRoomEmployeeNameCurrent;
    this.measurementRoomDateTime = data.measurementRoomDateTime;
    this.measurementRoomDate = data.measurementRoomDate;
    this.measurementRoomTime = data.measurementRoomTime;
    this.measurementRoomLength = data.measurementRoomLength;
    this.measurementRoomWeight = data.measurementRoomWeight;
    this.measurementRoomPressure = data.measurementRoomPressure;
    this.measurementRoomBreathingRate = data.measurementRoomBreathingRate;
    this.measurementRoomPulseRate = data.measurementRoomPulseRate;
    this.measurementRoomTemperature = data.measurementRoomTemperature;
    this.measurementRoomSuger = data.measurementRoomSuger;
    this.measurementRoomBmr = data.measurementRoomBmr;
    this.measurementRoomHeartRate = data.measurementRoomHeartRate;
    this.measurementRoomNote = data.measurementRoomNote;
    this.measurementRoomArchiveStatus = data.measurementRoomArchiveStatus;
  }

  async getAllMeasurementRooms(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationMeasurementRoom/GetAllServicesReservationMeasurementRoom?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&measurementRoomToken=${this.measurementRoomToken}&clientToken=${this.clientToken}&textSearch=${this.textSearch}`
      );
      this.paginationData = {
        totalPages:
          response.data.servicesReservationMeasurementRoomPagination.totalPages,
        totalItems:
          response.data.servicesReservationMeasurementRoomPagination.totalItems,
        countItemsInPage:
          response.data.servicesReservationMeasurementRoomPagination
            .countItemsInPage,
        selfPage:
          response.data.servicesReservationMeasurementRoomPagination.selfPage,
      };
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMeasurementRoomDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationMeasurementRoom/GetServicesReservationMeasurementRoomDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&measurementRoomToken=${this.measurementRoomToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMeasurementRoom(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      measurementRoomToken: this.measurementRoomToken,
      reservationToken: this.reservationToken,
      measurementRoomLength: this.measurementRoomLength,
      measurementRoomWeight: this.measurementRoomWeight,
      measurementRoomPressure: this.measurementRoomPressure,
      measurementRoomBreathingRate: this.measurementRoomBreathingRate,
      measurementRoomPulseRate: this.measurementRoomPulseRate,
      measurementRoomTemperature: this.measurementRoomTemperature,
      measurementRoomSuger: this.measurementRoomSuger,
      measurementRoomBmr: this.measurementRoomBmr,
      measurementRoomHeartRate: this.measurementRoomHeartRate,
      measurementRoomNote: this.measurementRoomNote,
    };

    try {
      let response = "";
      if (
        this.measurementRoomToken == "" ||
        this.measurementRoomToken == undefined
      ) {
        response = await axios.post(
          `/ServicesReservationMeasurementRoom/AddServicesReservationMeasurementRoom`,
          data
        );
      } else {
        response = await axios.post(
          `/ServicesReservationMeasurementRoom/UpdateServicesReservationMeasurementRoom`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
