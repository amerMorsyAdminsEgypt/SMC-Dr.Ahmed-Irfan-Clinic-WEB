import {
  PAY_TYPE,
  RESERVATION_TYPES,
  EMPLOYEE_TYPE,
} from "@/utils/constantLists";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import ServicesReservationCancel from "@/models/servicesReservations/ServicesReservationCancel";
import ServicesReservationPay from "@/models/servicesPayments/ServicesReservationPay";
import Client from "@/models/clients/Client";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationsCalender",
  mixins: [createToastMixin],
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      employeeTypeToken:
        this.$store.getters.userData.employeePersonalData.employeeTypeToken ||
        null,
      EMPLOYEE_TYPE,
      language: localStorage.getItem("userLanguage") || "ar",
      servicesReservationData: new ServicesReservation(),
      servicesReservationPayData: new ServicesReservationPay(),
      servicesReservationCancelData: new ServicesReservationCancel(),
      clientData: new Client(),
    };
  },
  methods: {
    setServicesReservationData(data) {
      this.servicesReservationData.note = "";
      this.servicesReservationData.fillData(data);
      this.servicesReservationPayData.setInitialValue();
      this.servicesReservationPayData.reservationToken = data.reservationToken;
      this.servicesReservationPayData.methodPaidValue = data.remainingAmount;
      this.servicesReservationPayData.payTypeToken = PAY_TYPE.reservation;
      this.servicesReservationCancelData.reservationToken =
        data.reservationToken;
      this.servicesReservationCancelData.totalPaid = data.totalPaid;
      this.servicesReservationCancelData.refundPercentageFromPaid = "";
      this.servicesReservationCancelData.refoundValue = "";
    },
    newPayment(value) {
      this.setServicesReservationData(value.servicesReservationData);
      this.clientData.fillData(value.clientData);
    },
    goToReservationsFollowed(data) {
      this.filterServicesReservationData.clientToken = data.clientToken;
      this.filterServicesReservationData.followToreseRvationToken =
        data.reservationToken;
      this.filterServicesReservationData.reservationTypeToken =
        RESERVATION_TYPES.followingReservation;
      this.refresh();
    },
    refresh() {
      this.$store.dispatch(
        "updateReservationsClientToken",
        this.filterServicesReservationData.clientToken
      );
      this.$store.dispatch(
        "updateReservationsfollowToReservationToken",
        this.filterServicesReservationData.followToreseRvationToken
      );
      this.$store.dispatch(
        "updateReservationsTypeToken",
        this.filterServicesReservationData.reservationTypeToken
      );
      this.servicesReservationsData = null;
      this.getAllServicesReservations();
    },
  },
};
