<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="reservationTreatmentsData">
      <ServicesReservationTreatmentPlansTable
        v-on:setReservationTreatmentData="
          reservationTreatmentData.fillData($event)
        "
        v-on:downlaodTreatmentPlan="downlaodTreatmentPlan"
        :reservationTreatmentsData="reservationTreatmentsData"
        :reservationTreatmentData="reservationTreatmentData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterReservationTreatmentData.paginationData"
        v-on:changePage="changePage"
      />
      <!-- <ServicesPaymentInfo :reservationTreatmentData="reservationTreatmentData" /> -->
      <!-- <ServicesPaymentRefund
        :reservationTreatmentData="reservationTreatmentData"
        v-on:refresh="getServicesReservationTreatmentPlans()"
      /> -->
    </div>

    <ServicesReservationTreatmentPlanFloatBtns
      :filterReservationTreatmentData="filterReservationTreatmentData"
      v-on:search="getServicesReservationTreatmentPlans()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { downloadFileFromServer } from "@/utils/functions";
import ServicesReservationTreatmentPlansTable from "@/components/servicesReservationTreatmentPlans/ServicesReservationTreatmentPlansTable.vue";
// import ServicesPaymentInfo from "@/components/servicesReservationTreatmentPlans/ServicesPaymentInfo.vue";
// import ServicesPaymentRefund from "@/components/servicesReservationTreatmentPlans/ServicesPaymentRefund.vue";
import ServicesReservationTreatmentPlanFloatBtns from "@/components/servicesReservationTreatmentPlans/ServicesReservationTreatmentPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ServicesReservationTreatmentPlan from "@/models/servicesReservationTreatmentPlans/ServicesReservationTreatmentPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationTreatmentPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesReservationTreatmentPlansTable,
    // ServicesPaymentInfo,
    // ServicesPaymentRefund,
    ServicesReservationTreatmentPlanFloatBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      reservationTreatmentsData: null,
      reservationTreatmentData: new ServicesReservationTreatmentPlan(),
      filterReservationTreatmentData: new ServicesReservationTreatmentPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.filterReservationTreatmentData.paginationData.selfPage = page;
      this.getServicesReservationTreatmentPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getServicesReservationTreatmentPlans();
    },
    async getServicesReservationTreatmentPlans() {
      this.isLoading = true;
      try {
        let response =
          await this.filterReservationTreatmentData.getServicesReservationTreatmentPlans(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.reservationTreatmentsData =
            response.data.servicesReservationFinishPagination.servicesReservationTreatmentPlanData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.reservationTreatmentsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.reservationTreatmentsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.reservationTreatmentsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesReservationsData = null;
      }
      this.isLoading = false;
    },
    async downlaodTreatmentPlan(data) {
      this.isLoading = true;
      this.reservationTreatmentData.treatmentPlanToken =
        data.treatmentPlanToken;
      try {
        let response =
          await this.reservationTreatmentData.getServicesReservationTreatmentPlanReport(
            this.language,
            this.userAuthorizeToken
          );
        if (
          response.data.status == STATUS.SUCCESS &&
          response.data.isHaveMedicine === true
        ) {
          this.showMsg(response.data.msg, true);
          downloadFileFromServer(
            this.language,
            this.userAuthorizeToken,
            response.data.reportPathMedicine
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.filterReservationTreatmentData.clientToken = this.$route.params
      .clientToken
      ? this.$route.params.clientToken
      : "";
    this.filterReservationTreatmentData.reservationToken = this.$route.params
      .reservationToken
      ? this.$route.params.reservationToken
      : "";
    this.getServicesReservationTreatmentPlans();
  },
};
</script>
