<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="medicationPlansData">
      <MedicationPlansTable
        v-on:setMedicationPlanData="medicationPlanData.fillData($event)"
        :medicationPlansData="medicationPlansData"
        :medicationPlanData="medicationPlanData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterMedicationPlanData.paginationData"
        v-on:changePage="changePage"
      />

      <MedicationPlanDelete
        :filterMedicationPlanData="medicationPlanData"
        v-on:refresh="getMedicationPlans()"
      />
      <MedicationPlanDownload
        :filterMedicationPlanData="medicationPlanData"
        v-on:refresh="getMedicationPlans()"
      />
    </div>

    <MedicationPlanFloatBtns
      :filterMedicationPlanData="filterMedicationPlanData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicationPlansTable from "@/components/historicalPlans/medicationPlans/MedicationPlansTable.vue";
import MedicationPlanDelete from "@/components/historicalPlans/medicationPlans/MedicationPlanDelete.vue";
import MedicationPlanDownload from "@/components/historicalPlans/medicationPlans/MedicationPlanDownload.vue";
import MedicationPlanFloatBtns from "@/components/historicalPlans/medicationPlans/MedicationPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MedicationPlan from "@/models/historicalPlans/medicationPlans/MedicationPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicationPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicationPlansTable,
    MedicationPlanDelete,
    MedicationPlanDownload,
    MedicationPlanFloatBtns,
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
      medicationPlansData: null,
      medicationPlanData: new MedicationPlan(),
      filterMedicationPlanData: new MedicationPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.filterMedicationPlanData.paginationData.selfPage = page;
      this.getMedicationPlans();
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
      this.filterMedicationPlanData.fillData(data);
      this.medicationPlansData = null;
      this.getMedicationPlans();
    },
    async getMedicationPlans() {
      this.isLoading = true;
      try {
        let response = await this.filterMedicationPlanData.getMedicationPlans(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.medicationPlansData =
            response.data.medicationPlanDataPagination.medicationPlanData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.medicationPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.medicationPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.medicationPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.medicationPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.filterMedicationPlanData.clientToken = this.$store.getters
      .historicalPlans.clientToken
      ? this.$store.getters.historicalPlans.clientToken
      : "";
    this.filterMedicationPlanData.reservationToken = this.$store.getters
      .historicalPlans.reservationToken
      ? this.$store.getters.historicalPlans.reservationToken
      : "";
    this.getMedicationPlans();
  },
};
</script>
