import axios from "axios";
import {
  STATUS,
  SERVICES_RESERVATIONS_CALENDAR_INTERVAL,
} from "@/utils/constants";
import { EMPLOYEE_TYPE, RESERVATION_STATUS } from "@/utils/constantLists";
import { addOrSubSecondsToDateTime } from "@/utils/functions";
import Client from "@/models/clients/Client";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import ServicesReservationsGeneralMixin from "./ServicesReservationsGeneralMixin";

export default {
  name: "ServicesReservationsCalender",
  mixins: [ServicesReservationsGeneralMixin],
  data() {
    return {
      servicesReservationsData: [],
      filterServicesReservationData: new ServicesReservation(),
      reservationToken: "",
      splitDays: [
        {
          class: "pending",
          id: RESERVATION_STATUS.pending,
          count: 4,
          label: this.$t("ReservationStatus.pending"),
        },
        {
          class: "current",
          id: RESERVATION_STATUS.current,
          count: 5,
          label: this.$t("ReservationStatus.current"),
          hide: false,
        },
        {
          class: "attended",
          id: RESERVATION_STATUS.attended,
          count: 3,
          label: this.$t("ReservationStatus.attended"),
        },
        {
          class: "entered",
          id: RESERVATION_STATUS.entered,
          count: 3,
          label: this.$t("ReservationStatus.entered"),
        },
        {
          class: "waitingReEntry",
          id: RESERVATION_STATUS.waitingReEntry,
          count: 4,
          label: this.$t("ReservationStatus.waitingReEntry"),
        },
        {
          class: "finished",
          id: RESERVATION_STATUS.finished,
          count: 1,
          label: this.$t("ReservationStatus.finished"),
        },
        {
          class: "waitingApprovalCancel",
          id: RESERVATION_STATUS.waitingApprovalCancel,
          count: 0,
          label: this.$t("ReservationStatus.waitingApprovalCancel"),
        },
        // {
        //   class: "canceledBeforeApproval",
        //   id: RESERVATION_STATUS.canceledBeforeApproval,
        //   label: this.$t("ReservationStatus.canceledBeforeApproval"),
        // },
        // {
        //   class: "canceledAfterApproval",
        //   id: RESERVATION_STATUS.canceledAfterApproval,
        //   label: this.$t("ReservationStatus.canceledAfterApproval"),
        // },
      ],
      today: new Date().toDateString(),
      timeCellHeight: 50,
      clientData: new Client(),
      clientTokenOptions: [],
      employeeTokenOptions: [],
    };
  },
  methods: {
    async getAllServicesReservations() {
      this.isLoading = true;
      this.servicesReservationsData = [];
      try {
        let response =
          await this.filterServicesReservationData.getAllServicesReservationsCalendar(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.servicesReservationsData =
            response.data.servicesReservationCalenderPagination.servicesReservationCalenderData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          // this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
    openServicesReservationCalendarInfo(event, e) {
      e.stopPropagation();
      this.reservationToken = event.reservationToken;
      this.openBottomSheet("ServicesReservationCalendarInfo");
    },
    viewChanged(event) {
      this.filterServicesReservationData.dateTimeStartSearch = new Date(
        event.startDate
      ).toLocaleString("en");
      this.filterServicesReservationData.dateTimeEndSearch = new Date(
        event.endDate
      ).toLocaleString("en");
      this.getAllServicesReservations();
    },

    async getDialogOfClients() {
      this.isLoading = true;
      this.clientTokenOptions = [];
      this.clientTokenOptions.push({
        value: "",
        text: this.$t("selectClient"),
      });
      try {
        let response = await this.clientData.getDialogOfClients(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfDoctors() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("selectDoctor"),
      });
      try {
        const response = await axios.get(
          `/Employees/GetDialogOfEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&employeeTypeToken=${EMPLOYEE_TYPE.Doctor}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {
    servicesReservationsCalendarData: function () {
      // let days = this.servicesReservationsData
      //   ? this.servicesReservationsData
      //       .filter(
      //         (reservation) =>
      //           reservation.servicesReservationCalenderData.length > 0
      //       )
      //       .map((reservation) => ({
      //         date: reservation.dateTime,
      //         servicesReservationCalenderData:
      //           reservation.servicesReservationCalenderData,
      //       }))
      //   : [];

      let from = this.filterServicesReservationData.dateTimeStartSearch;
      let to = this.filterServicesReservationData.dateTimeEndSearch;
      let arr = [];
      if (
        this.servicesReservationsData != undefined &&
        this.servicesReservationsData.length != 0
      ) {
        this.servicesReservationsData.forEach(function (reservation) {
          if (
            reservation.reservationStatusToken !=
              RESERVATION_STATUS.canceledBeforeApproval &&
            reservation.reservationStatusToken !=
              RESERVATION_STATUS.canceledAfterApproval
          ) {
            let obj = {
              reservationToken: reservation.reservationToken,
              split: reservation.reservationStatusToken,
              // start: reservation.estimatedDateTimeArrival,
              // end: reservation.estimatedDateTimeEnter,
              // end: addOrSubSecondsToDateTime(
              //   reservation.estimatedDateTimeArrival,
              //   SERVICES_RESERVATIONS_CALENDAR_INTERVAL
              // ),
              start: "",
              end: "",
              title: `${reservation.clientCode} - ${reservation.clientNameCurrent}`,
            };

            switch (reservation.reservationStatusToken) {
              case RESERVATION_STATUS.attended:
                if (reservation.attendanceDateTime) {
                  obj.start = reservation.attendanceDateTime;
                  obj.end = addOrSubSecondsToDateTime(
                    reservation.attendanceDateTime,
                    SERVICES_RESERVATIONS_CALENDAR_INTERVAL
                  );
                } else {
                  obj.start = reservation.estimatedDateTimeArrival;
                  obj.end = addOrSubSecondsToDateTime(
                    reservation.estimatedDateTimeArrival,
                    SERVICES_RESERVATIONS_CALENDAR_INTERVAL
                  );
                }
                break;
              case RESERVATION_STATUS.entered:
              case RESERVATION_STATUS.waitingReEntry:
                if (reservation.entreeDateTime) {
                  obj.start = reservation.entreeDateTime;
                  obj.end = addOrSubSecondsToDateTime(
                    reservation.entreeDateTime,
                    SERVICES_RESERVATIONS_CALENDAR_INTERVAL
                  );
                } else {
                  obj.start = reservation.estimatedDateTimeArrival;
                  obj.end = addOrSubSecondsToDateTime(
                    reservation.estimatedDateTimeArrival,
                    SERVICES_RESERVATIONS_CALENDAR_INTERVAL
                  );
                }
                break;
              case RESERVATION_STATUS.finished:
                if (reservation.dateTimeFinish) {
                  obj.start = reservation.dateTimeFinish;
                  obj.end = addOrSubSecondsToDateTime(
                    reservation.dateTimeFinish,
                    SERVICES_RESERVATIONS_CALENDAR_INTERVAL
                  );
                } else {
                  obj.start = reservation.estimatedDateTimeArrival;
                  obj.end = addOrSubSecondsToDateTime(
                    reservation.estimatedDateTimeArrival,
                    SERVICES_RESERVATIONS_CALENDAR_INTERVAL
                  );
                }
                break;
              case RESERVATION_STATUS.pending:
              case RESERVATION_STATUS.current:
              case RESERVATION_STATUS.waitingApprovalCancel:
              case RESERVATION_STATUS.canceledBeforeApproval:
              case RESERVATION_STATUS.canceledAfterApproval:
              default:
                obj.start = reservation.estimatedDateTimeArrival;
                obj.end = addOrSubSecondsToDateTime(
                  reservation.estimatedDateTimeArrival,
                  SERVICES_RESERVATIONS_CALENDAR_INTERVAL
                );
                break;
            }

            if (
              new Date(obj.start) > new Date(from) &&
              new Date(obj.start) < new Date(to)
            )
              arr.push(obj);
          }
        });
      }

      return arr;
    },
    reservationsStatistics: function () {
      let obj = {
        pending: 0,
        current: 0,
        attended: 0,
        entered: 0,
        waitingReEntry: 0,
        finished: 0,
        waitingApprovalCancel: 0,
        // canceledBeforeApproval: 0,
        // canceledAfterApproval: 0,
      };
      obj.pending = this.servicesReservationsCalendarData.filter(
        (reservation) => reservation.split == RESERVATION_STATUS.pending
      ).length;
      obj.current = this.servicesReservationsCalendarData.filter(
        (reservation) => reservation.split == RESERVATION_STATUS.current
      ).length;
      obj.attended = this.servicesReservationsCalendarData.filter(
        (reservation) => reservation.split == RESERVATION_STATUS.attended
      ).length;
      obj.entered = this.servicesReservationsCalendarData.filter(
        (reservation) => reservation.split == RESERVATION_STATUS.entered
      ).length;
      obj.waitingReEntry = this.servicesReservationsCalendarData.filter(
        (reservation) => reservation.split == RESERVATION_STATUS.waitingReEntry
      ).length;
      obj.finished = this.servicesReservationsCalendarData.filter(
        (reservation) => reservation.split == RESERVATION_STATUS.finished
      ).length;
      obj.waitingApprovalCancel = this.servicesReservationsCalendarData.filter(
        (reservation) =>
          reservation.split == RESERVATION_STATUS.waitingApprovalCancel
      ).length;
      // obj.canceledBeforeApproval = this.servicesReservationsCalendarData.filter(
      //   (reservation) =>
      //     reservation.split == RESERVATION_STATUS.canceledBeforeApproval
      // ).length;
      // obj.canceledAfterApproval = this.servicesReservationsCalendarData.filter(
      //   (reservation) =>
      //     reservation.split == RESERVATION_STATUS.canceledAfterApproval
      // ).length;

      // return this.servicesReservationsCalendarData.length;
      return obj;
    },
  },
  filters: {
    addZero(val) {
      return val < 10 ? "0" : "";
    },
  },
  created() {
    if (this.employeeTypeToken == EMPLOYEE_TYPE.Doctor)
      this.filterServicesReservationData.employeeToken =
        this.$store.getters.userData.employeePersonalData.employeeToken;

    this.filterServicesReservationData.dateTimeStartSearch =
      this.today + ", 12:00:00 AM";
    this.filterServicesReservationData.dateTimeEndSearch =
      this.today + ", 11:59:59 PM";
    this.getAllServicesReservations();
    this.getDialogOfClients();
    this.getDialogOfDoctors();
  },
};
