<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="allowancesPlanData">
      <AllowancesPlanNameTable :allowancesPlanData="allowancesPlanData" />

      <AllowancesPlanDetailsTable
        :allowancesPlansSlidesDetailsData="
          allowancesPlanData.allowancesPlansSlidesDetailsData
        "
        v-on:setAllowancesPlansSlideDetailsData="
          allowancesPlansSlideDetailsData.fillData($event)
        "
        :allowancesPlansSlideDetailsData="allowancesPlansSlideDetailsData"
      />

      <!-- <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      /> -->

      <AllowancesPlanDetailsInfo
        :allowancesPlansSlideDetailsData="allowancesPlansSlideDetailsData"
      />
      <AllowancesPlanDetailsDelete
        :allowancesPlansSlideDetailsData="allowancesPlansSlideDetailsData"
        v-on:refresh="getAllowancesPlanDetails()"
      />
    </div>

    <AllowancesPlanDetailsFloatBtns
      :allowancesPlansToken="allowancesPlansToken"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AllowancesPlanNameTable from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanNameTable.vue";
import AllowancesPlanDetailsTable from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanDetailsTable.vue";
import AllowancesPlanDetailsInfo from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanDetailsInfo.vue";
import AllowancesPlanDetailsDelete from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanDetailsDelete.vue";
import AllowancesPlanDetailsFloatBtns from "@/components/settings/settingsSalary/allowancesPlans/AllowancesPlanDetailsFloatBtns.vue";
// import Pagination from "@/components/general/Pagination.vue";
import AllowancesPlan from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlan";
import AllowancesPlansSlideDetails from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AllowancesPlanDetails",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AllowancesPlanNameTable,
    AllowancesPlanDetailsTable,
    AllowancesPlanDetailsInfo,
    AllowancesPlanDetailsDelete,
    AllowancesPlanDetailsFloatBtns,
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
      allowancesPlansData: null,
      allowancesPlanData: new AllowancesPlan(),
      allowancesPlansSlideDetailsData: new AllowancesPlansSlideDetails(),
      allowancesPlansToken: this.$route.params.allowancesPlansToken,
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllowancesPlanDetails();
    },
    search(text) {
      this.textSearch = text;
      this.getAllowancesPlanDetails();
    },
    async getAllowancesPlanDetails() {
      this.isLoading = true;
      this.allowancesPlanData.allowancesPlansToken = this.allowancesPlansToken;
      try {
        let response = await this.allowancesPlanData.getAllowancesPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.allowancesPlanData.fillData(response.data.allowancesPlansData);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.allowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.allowancesPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.allowancesPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.allowancesPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllowancesPlanDetails();
  },
};
</script>
