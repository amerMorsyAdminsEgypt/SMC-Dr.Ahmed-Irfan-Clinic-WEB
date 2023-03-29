<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="diagnosisPlans.diagnosisPlansData">
      <DiagnosisPlansTable
        v-on:setDiagnosisPlanData="
          diagnosisPlans.diagnosisPlan.fillData($event)
        "
        :diagnosisPlans="diagnosisPlans"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="diagnosisPlans.pagination"
        v-on:changePage="changePage"
      />
      <DiagnosisPlanDelete
        :diagnosisPlanData="diagnosisPlans.diagnosisPlan"
        v-on:refresh="getAllDiagnosisPlans()"
      />
      <DiagnosisPlanDownload
        :diagnosisPlanData="diagnosisPlans.diagnosisPlan"
        v-on:refresh="getAllDiagnosisPlans()"
      />
    </div>

    <DiagnosisPlanFloatBtns
      :theFilterData="diagnosisPlans.filterData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DiagnosisPlansTable from "@/components/historicalPlans/diagnosisPlans/DiagnosisPlansTable.vue";
import DiagnosisPlanDelete from "@/components/historicalPlans/diagnosisPlans/DiagnosisPlanDelete.vue";
import DiagnosisPlanDownload from "@/components/historicalPlans/diagnosisPlans/DiagnosisPlanDownload.vue";
import DiagnosisPlanFloatBtns from "@/components/historicalPlans/diagnosisPlans/DiagnosisPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import DiagnosisPlans from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlans";

export default {
  name: "DiagnosisPlans",
  components: {
    PreLoader,
    ExceptionWithImg,
    DiagnosisPlansTable,
    DiagnosisPlanDelete,
    DiagnosisPlanDownload,
    DiagnosisPlanFloatBtns,
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
      diagnosisPlans: new DiagnosisPlans(),
    };
  },
  methods: {
    changePage(page) {
      this.diagnosisPlans.pagination.selfPage = page;
      this.getAllDiagnosisPlans();
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
      this.diagnosisPlans.filterData.fillData(data);
      this.diagnosisPlans.diagnosisPlansData = null;
      this.getAllDiagnosisPlans();
    },
    async getAllDiagnosisPlans() {
      this.isLoading = true;
      try {
        const response =
          await this.diagnosisPlans.diagnosisPlan.getAllDiagnosisPlans(
            this.language,
            this.userAuthorizeToken,
            this.diagnosisPlans.pagination,
            this.diagnosisPlans.filterData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.diagnosisPlans.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.diagnosisPlans.diagnosisPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.diagnosisPlans.diagnosisPlansData = null;
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.diagnosisPlans.diagnosisPlansData = null;
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.diagnosisPlans.diagnosisPlansData = null;
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.diagnosisPlans.filterData.clientToken = this.$store.getters
      .historicalPlans.clientToken
      ? this.$store.getters.historicalPlans.clientToken
      : "";
    this.diagnosisPlans.filterData.reservationToken = this.$store.getters
      .historicalPlans.reservationToken
      ? this.$store.getters.historicalPlans.reservationToken
      : "";
    this.getAllDiagnosisPlans();
  },
};
</script>
