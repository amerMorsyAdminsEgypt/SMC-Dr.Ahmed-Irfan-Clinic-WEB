<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="monthAllowancesPlanData">
      <MonthAllowancesPlanNameTable
        :monthAllowancesPlanData="monthAllowancesPlanData"
      />

      <MonthAllowancesPlanDetailsTable
        :monthAllowancesPlansSlidesDetailsData="
          monthAllowancesPlanData.monthAllowancesPlansSlidesDetailsData
        "
        v-on:setMonthAllowancesPlansSlideDetailsData="
          monthAllowancesPlansSlideDetailsData.fillData($event)
        "
        :monthAllowancesPlansSlideDetailsData="
          monthAllowancesPlansSlideDetailsData
        "
      />

      <!-- <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      /> -->

      <MonthAllowancesPlanDetailsInfo
        :monthAllowancesPlansSlideDetailsData="
          monthAllowancesPlansSlideDetailsData
        "
      />
      <MonthAllowancesPlanDetailsDelete
        :monthAllowancesPlansSlideDetailsData="
          monthAllowancesPlansSlideDetailsData
        "
        v-on:refresh="getMonthAllowancesPlanDetails()"
      />
    </div>

    <MonthAllowancesPlanDetailsFloatBtns
      :monthAllowancesPlansToken="monthAllowancesPlansToken"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MonthAllowancesPlanNameTable from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanNameTable.vue";
import MonthAllowancesPlanDetailsTable from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetailsTable.vue";
import MonthAllowancesPlanDetailsInfo from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetailsInfo.vue";
import MonthAllowancesPlanDetailsDelete from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetailsDelete.vue";
import MonthAllowancesPlanDetailsFloatBtns from "@/components/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetailsFloatBtns.vue";
// import Pagination from "@/components/general/Pagination.vue";
import MonthAllowancesPlan from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlan";
import MonthAllowancesPlansSlideDetails from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MonthAllowancesPlanDetails",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MonthAllowancesPlanNameTable,
    MonthAllowancesPlanDetailsTable,
    MonthAllowancesPlanDetailsInfo,
    MonthAllowancesPlanDetailsDelete,
    MonthAllowancesPlanDetailsFloatBtns,
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
      monthAllowancesPlansData: null,
      monthAllowancesPlanData: new MonthAllowancesPlan(),
      monthAllowancesPlansSlideDetailsData:
        new MonthAllowancesPlansSlideDetails(),
      monthAllowancesPlansToken: this.$route.params.monthAllowancesPlansToken,
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getMonthAllowancesPlanDetails();
    },
    search(text) {
      this.textSearch = text;
      this.getMonthAllowancesPlanDetails();
    },
    async getMonthAllowancesPlanDetails() {
      this.isLoading = true;
      this.monthAllowancesPlanData.monthAllowancesPlansToken =
        this.monthAllowancesPlansToken;
      try {
        let response =
          await this.monthAllowancesPlanData.getMonthAllowancesPlanDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.monthAllowancesPlanData.fillData(
            response.data.monthAllowancesPlansData
          );
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.monthAllowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.monthAllowancesPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.monthAllowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.monthAllowancesPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getMonthAllowancesPlanDetails();
  },
};
</script>
