<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="overTimePlanData">
      <OverTimePlanNameTable :overTimePlanData="overTimePlanData" />

      <OverTimePlanDetailsTable
        :overTimePlansSlidesDetailsData="
          overTimePlanData.overTimePlansSlidesDetailsData
        "
        v-on:setOverTimePlansSlideDetailsData="
          overTimePlansSlideDetailsData.fillData($event)
        "
        :overTimePlansSlideDetailsData="overTimePlansSlideDetailsData"
      />

      <!-- <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      /> -->

      <OverTimePlanDetailsInfo
        :overTimePlansSlideDetailsData="overTimePlansSlideDetailsData"
      />
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OverTimePlanNameTable from "@/components/settings/settingsSalary/overTimePlans/OverTimePlanNameTable.vue";
import OverTimePlanDetailsTable from "@/components/settings/settingsSalary/overTimePlans/OverTimePlanDetailsTable.vue";
import OverTimePlanDetailsInfo from "@/components/settings/settingsSalary/overTimePlans/OverTimePlanDetailsInfo.vue";
// import Pagination from "@/components/general/Pagination.vue";
import OverTimePlan from "@/models/settings/settingsSalary/overTimePlans/OverTimePlan";
import OverTimePlansSlideDetails from "@/models/settings/settingsSalary/overTimePlans/OverTimePlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OverTimePlanDetails",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OverTimePlanNameTable,
    OverTimePlanDetailsTable,
    OverTimePlanDetailsInfo,
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
      overTimePlansData: null,
      overTimePlanData: new OverTimePlan(),
      overTimePlansSlideDetailsData: new OverTimePlansSlideDetails(),
      overTimePlansToken: this.$route.params.overTimePlansToken,
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getOverTimePlanDetails();
    },
    search(text) {
      this.textSearch = text;
      this.getOverTimePlanDetails();
    },
    async getOverTimePlanDetails() {
      this.isLoading = true;
      this.overTimePlanData.overTimePlansToken = this.overTimePlansToken;
      try {
        let response = await this.overTimePlanData.getOverTimePlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.overTimePlanData.fillData(response.data.overTimePlansData);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.overTimePlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.overTimePlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.overTimePlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.overTimePlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getOverTimePlanDetails();
  },
};
</script>
