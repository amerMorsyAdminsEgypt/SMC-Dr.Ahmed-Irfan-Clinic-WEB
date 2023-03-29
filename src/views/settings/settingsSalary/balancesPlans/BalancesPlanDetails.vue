<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="balancesPlanData">
      <BalancesPlanNameTable :balancesPlanData="balancesPlanData" />

      <BalancesPlanDetailsTable
        :balancesPlansSlidesDetailsData="
          balancesPlanData.balancesPlansSlidesDetailsData
        "
        v-on:setBalancesPlansSlideDetailsData="
          balancesPlansSlideDetailsData.fillData($event)
        "
        :balancesPlansSlideDetailsData="balancesPlansSlideDetailsData"
      />

      <!-- <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      /> -->

      <BalancesPlanDetailsInfo
        :balancesPlansSlideDetailsData="balancesPlansSlideDetailsData"
      />
      <BalancesPlanDetailsDelete
        :balancesPlansSlideDetailsData="balancesPlansSlideDetailsData"
        v-on:refresh="getBalancesPlanDetails()"
      />
    </div>

    <BalancesPlanDetailsFloatBtns
      :balancesPlansToken="balancesPlansToken"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BalancesPlanNameTable from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanNameTable.vue";
import BalancesPlanDetailsTable from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanDetailsTable.vue";
import BalancesPlanDetailsInfo from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanDetailsInfo.vue";
import BalancesPlanDetailsDelete from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanDetailsDelete.vue";
import BalancesPlanDetailsFloatBtns from "@/components/settings/settingsSalary/balancesPlans/BalancesPlanDetailsFloatBtns.vue";
// import Pagination from "@/components/general/Pagination.vue";
import BalancesPlan from "@/models/settings/settingsSalary/balancesPlans/BalancesPlan";
import BalancesPlansSlideDetails from "@/models/settings/settingsSalary/balancesPlans/BalancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BalancesPlanDetails",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BalancesPlanNameTable,
    BalancesPlanDetailsTable,
    BalancesPlanDetailsInfo,
    BalancesPlanDetailsDelete,
    BalancesPlanDetailsFloatBtns,
    // Pagination,
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
      balancesPlansData: null,
      balancesPlanData: new BalancesPlan(),
      balancesPlansSlideDetailsData: new BalancesPlansSlideDetails(),
      balancesPlansToken: this.$route.params.balancesPlansToken,
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getBalancesPlanDetails();
    },
    search(text) {
      this.textSearch = text;
      this.getBalancesPlanDetails();
    },
    async getBalancesPlanDetails() {
      this.isLoading = true;
      this.balancesPlanData.balancesPlansToken = this.balancesPlansToken;
      try {
        let response = await this.balancesPlanData.getBalancesPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.balancesPlanData.fillData(response.data.balancesPlansData);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.balancesPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.balancesPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.balancesPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.balancesPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getBalancesPlanDetails();
  },
};
</script>
