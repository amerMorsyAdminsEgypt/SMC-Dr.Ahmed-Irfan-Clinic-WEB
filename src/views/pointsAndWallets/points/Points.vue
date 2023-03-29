<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="pointsData">
      <PointsTable
        :pointsData="pointsData"
        :pointData="pointData"
        v-on:setPointData="pointData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterPointData.paginationData"
        v-on:changePage="changePage"
      />
      <PointInfo :pointData="pointData" />
    </div>

    <PointFloatBtns
      :filterPointData="filterPointData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import PointsTable from "@/components/pointsAndWallets/points/PointsTable.vue";
import PointInfo from "@/components/pointsAndWallets/points/PointInfo.vue";
import PointFloatBtns from "@/components/pointsAndWallets/points/PointFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Point from "@/models/pointsAndWallets/points/Point";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Points",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    PointsTable,
    PointInfo,
    PointFloatBtns,
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
      pointsData: null,
      pointData: new Point(),
      filterPointData: new Point(),
    };
  },
  methods: {
    changePage(page) {
      this.filterPointData.paginationData.selfPage = page;
      this.getAllTransactionPointsHistory();
    },
    search(data) {
      this.$store.dispatch("updatePointsClientToken", data.clientToken);
      this.filterPointData.fillData(data);
      this.pointsData = null;
      this.getAllTransactionPointsHistory();
    },
    async getAllTransactionPointsHistory() {
      this.isLoading = true;
      try {
        let response =
          await this.filterPointData.getAllTransactionPointsHistory(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.pointsData =
            response.data.transactionPointsHistorysPagination.transactionPointsHistoryData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.pointsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.pointsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.pointsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesReservationsData = null;
      }
      this.isLoading = false;
    },
    filter() {
      this.filterPointData.clientToken = this.$store.getters.points.clientToken
        ? this.$store.getters.points.clientToken
        : "";
    },
  },
  computed: {},
  async created() {
    this.filter();
    this.getAllTransactionPointsHistory();
  },
};
</script>
