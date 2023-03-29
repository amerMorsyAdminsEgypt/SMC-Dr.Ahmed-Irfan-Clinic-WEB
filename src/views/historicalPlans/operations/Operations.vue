<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="operationsData">
      <OperationsTable
        v-on:setOperationData="operationData.fillData($event)"
        v-on:downlaodOperation="downlaodOperation"
        :operationsData="operationsData"
        :operationData="operationData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterOperationData.paginationData"
        v-on:changePage="changePage"
      />

      <OperationDelete
        :filterOperationData="operationData"
        v-on:refresh="getAllMedicalOperations()"
      />

      <OperationDownload
        :filterOperationData="operationData"
        v-on:refresh="getAllMedicalOperations()"
      />
    </div>

    <OperationFloatBtns
      :filterOperationData="filterOperationData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { viewFileFromServer } from "@/utils/functions";
import OperationsTable from "@/components/historicalPlans/operations/OperationsTable.vue";
import OperationDelete from "@/components/historicalPlans/operations/OperationDelete.vue";
import OperationDownload from "@/components/historicalPlans/operations/OperationDownload.vue";
import OperationFloatBtns from "@/components/historicalPlans/operations/OperationFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Operation from "@/models/historicalPlans/operations/Operation";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Operations",
  // props: {
  //   surgeryPlaceTypeToken: {
  //     type: String,
  //     default: "",
  //   },
  //   clientToken: {
  //     type: String,
  //     default: "",
  //   },
  // },
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OperationsTable,
    OperationDelete,
    OperationDownload,
    OperationFloatBtns,
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
      operationsData: null,
      operationData: new Operation(),
      filterOperationData: new Operation(),
    };
  },
  methods: {
    changePage(page) {
      this.filterOperationData.paginationData.selfPage = page;
      this.getAllMedicalOperations();
    },
    search(data) {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        data.surgeryHistoryClientToken
      );
      this.$store.dispatch(
        "updateHistoricalPlansSurgeryPlaceTypeToken",
        data.surgeryPlaceTypeToken
      );
      this.$store.dispatch(
        "updateHistoricalPlansReservationToken",
        data.reservationToken
      );
      this.filterOperationData.fillData(data);

      this.operationsData = null;
      this.getAllMedicalOperations();
    },
    async getAllMedicalOperations() {
      this.isLoading = true;

      try {
        let response = await this.filterOperationData.getAllMedicalOperations(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.operationsData =
            response.data.surgriesHistoryDataPagination.surgriesHistoryData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.operationsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.operationsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.operationsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.operationsData = null;
      }
      this.isLoading = false;
    },
    async downlaodOperation(data) {
      this.isLoading = true;
      this.filterOperationData.surgeryHistoryToken = data.surgeryHistoryToken;
      try {
        let response = await this.filterOperationData.getMedicalOperationReport(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          viewFileFromServer(response.data.reportPathMedicine);
          // downloadFileFromServer(
          //   this.language,
          //   this.userAuthorizeToken,
          //   response.data.reportPathMedicine
          // );
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
    // async updateFilter() {
    //   let clientToken = this.clientToken || this.$route.params.clientToken;
    //   this.$store.dispatch("updateHistoricalPlansClientToken", clientToken);

    //   let surgeryPlaceTypeToken =
    //     this.surgeryPlaceTypeToken || this.$route.params.surgeryPlaceTypeToken;
    //   this.$store.dispatch(
    //     "updateHistoricalPlansSurgeryPlaceTypeToken",
    //     surgeryPlaceTypeToken
    //   );
    // },
    async setFilter() {
      this.filterOperationData.surgeryHistoryClientToken = this.$store.getters
        .historicalPlans.clientToken
        ? this.$store.getters.historicalPlans.clientToken
        : "";

      this.filterOperationData.surgeryPlaceTypeToken = this.$store.getters
        .historicalPlans.surgeryPlaceTypeToken
        ? this.$store.getters.historicalPlans.surgeryPlaceTypeToken
        : "";

      this.filterOperationData.reservationToken = this.$store.getters
        .historicalPlans.reservationToken
        ? this.$store.getters.historicalPlans.reservationToken
        : "";
    },
  },
  computed: {},
  async created() {
    // set filter
    await this.setFilter();

    await this.getAllMedicalOperations();
  },
};
</script>
