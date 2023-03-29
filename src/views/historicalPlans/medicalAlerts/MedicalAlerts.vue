<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="medicalAlertsData">
      <MedicalAlertsTable
        v-on:setMedicalAlertData="medicalAlertData.fillData($event)"
        :medicalAlertsData="medicalAlertsData"
        :medicalAlertData="medicalAlertData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterMedicalAlertData.paginationData"
        v-on:changePage="changePage"
      />

      <MedicalAlertDelete
        :filterMedicalAlertData="medicalAlertData"
        v-on:refresh="getMedicalAlerts()"
      />
      <MedicalAlertDownload
        :filterMedicalAlertData="medicalAlertData"
        v-on:refresh="getMedicalAlerts()"
      />
    </div>

    <MedicalAlertFloatBtns
      :filterMedicalAlertData="filterMedicalAlertData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicalAlertsTable from "@/components/historicalPlans/medicalAlerts/MedicalAlertsTable.vue";
import MedicalAlertDelete from "@/components/historicalPlans/medicalAlerts/MedicalAlertDelete.vue";
import MedicalAlertDownload from "@/components/historicalPlans/medicalAlerts/MedicalAlertDownload.vue";
import MedicalAlertFloatBtns from "@/components/historicalPlans/medicalAlerts/MedicalAlertFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MedicalAlert from "@/models/historicalPlans/medicalAlerts/MedicalAlert";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicalAlerts",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicalAlertsTable,
    MedicalAlertDelete,
    MedicalAlertDownload,
    MedicalAlertFloatBtns,
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
      medicalAlertsData: null,
      medicalAlertData: new MedicalAlert(),
      filterMedicalAlertData: new MedicalAlert(),
    };
  },
  methods: {
    changePage(page) {
      this.filterMedicalAlertData.paginationData.selfPage = page;
      this.getMedicalAlerts();
    },
    search(data) {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        data.clientToken
      );
      this.$store.dispatch(
        "updateHistoricalPlansReservationToken",
        data.reservationToken
      );
      this.filterMedicalAlertData.fillData(data);
      this.medicalAlertsData = null;
      this.getMedicalAlerts();
    },
    async getMedicalAlerts() {
      this.isLoading = true;
      try {
        let response = await this.filterMedicalAlertData.getMedicalAlerts(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.medicalAlertsData =
            response.data.medicalAlertsPagination.medicalAlertsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.medicalAlertsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.medicalAlertsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.medicalAlertsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.medicalAlertsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.filterMedicalAlertData.clientToken = this.$store.getters
      .historicalPlans.clientToken
      ? this.$store.getters.historicalPlans.clientToken
      : "";
    this.filterMedicalAlertData.reservationToken = this.$store.getters
      .historicalPlans.reservationToken
      ? this.$store.getters.historicalPlans.reservationToken
      : "";
    this.getMedicalAlerts();
  },
};
</script>
