<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="addictiveStuffClientsData">
      <AddictiveStuffClientsTable
        v-on:setAddictiveStuffClientData="
          addictiveStuffClientData.fillData($event)
        "
        v-on:downlaodTreatmentPlan="downlaodTreatmentPlan"
        :addictiveStuffClientsData="addictiveStuffClientsData"
        :addictiveStuffClientData="addictiveStuffClientData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterAddictiveStuffClientData.paginationData"
        v-on:changePage="changePage"
      />

      <AddictiveStuffClientDelete
        :filterAddictiveStuffClientData="addictiveStuffClientData"
        v-on:refresh="getAddictiveStuffClients()"
      />

      <AddictiveStuffClientInfo
        :addictiveStuffClientData="addictiveStuffClientData"
      />
    </div>

    <AddictiveStuffClientFloatBtns
      :filterAddictiveStuffClientData="filterAddictiveStuffClientData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { downloadFileFromServer } from "@/utils/functions";
import AddictiveStuffClientsTable from "@/components/historicalPlans/addictiveStuffClients/AddictiveStuffClientsTable.vue";
import AddictiveStuffClientDelete from "@/components/historicalPlans/addictiveStuffClients/AddictiveStuffClientDelete.vue";
import AddictiveStuffClientInfo from "@/components/historicalPlans/addictiveStuffClients/AddictiveStuffClientInfo.vue";
import AddictiveStuffClientFloatBtns from "@/components/historicalPlans/addictiveStuffClients/AddictiveStuffClientFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import AddictiveStuffClient from "@/models/historicalPlans/addictiveStuffClients/AddictiveStuffClient";
import createToastMixin from "@/utils/create-toast-mixin";
import { ADDICTIVESTUFFS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "AddictiveStuffClientsHabits",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AddictiveStuffClientsTable,
    AddictiveStuffClientDelete,
    AddictiveStuffClientInfo,
    AddictiveStuffClientFloatBtns,
    Pagination,
  },
  props: [],
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      addictiveStuffTypeToken: ADDICTIVESTUFFS_TYPE_TOKENS.Habits,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      addictiveStuffClientsData: null,
      addictiveStuffClientData: new AddictiveStuffClient(),
      filterAddictiveStuffClientData: new AddictiveStuffClient(),
    };
  },
  methods: {
    changePage(page) {
      this.filterAddictiveStuffClientData.paginationData.selfPage = page;
      this.getAddictiveStuffClients();
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
      this.filterAddictiveStuffClientData.fillData(data);
      this.addictiveStuffClientsData = null;
      this.getAddictiveStuffClients();
    },
    async getAddictiveStuffClients() {
      this.isLoading = true;
      try {
        let response =
          await this.filterAddictiveStuffClientData.getAddictiveStuffClients(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.addictiveStuffClientsData =
            response.data.addictiveStuffientPagination.addictiveStuffClientData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.addictiveStuffClientsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.addictiveStuffClientsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.addictiveStuffClientsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.addictiveStuffClientsData = null;
      }
      this.isLoading = false;
    },
    async downlaodTreatmentPlan(data) {
      this.isLoading = true;
      this.addictiveStuffClientData.treatmentPlanToken =
        data.treatmentPlanToken;
      try {
        let response =
          await this.addictiveStuffClientData.getAddictiveStuffClientReport(
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
    setFilter() {
      this.filterAddictiveStuffClientData.clientToken = this.$store.getters
        .historicalPlans.clientToken
        ? this.$store.getters.historicalPlans.clientToken
        : "";
      this.filterAddictiveStuffClientData.addictiveStuffTypeToken =
        this.addictiveStuffTypeToken;
    },
  },
  computed: {},
  // watch: {
  //   storedCurrentTab: function () {
  //     this.setFilter();
  //   },
  // },
  async created() {
    this.setFilter();
    this.getAddictiveStuffClients();
  },
};
</script>
