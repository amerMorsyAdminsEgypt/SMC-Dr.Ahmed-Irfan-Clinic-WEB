<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="absencePlanData">
      <AbsencePlanNameTable :absencePlanData="absencePlanData" />

      <AbsencePlanDetailsTable
        :absencePlansSlidesDetailsData="
          absencePlanData.absencePlansSlidesDetailsData
        "
        v-on:setAbsencePlansSlideDetailsData="
          absencePlansSlideDetailsData.fillData($event)
        "
        :absencePlansSlideDetailsData="absencePlansSlideDetailsData"
      />

      <!-- <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      /> -->
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AbsencePlanNameTable from "@/components/settings/settingsSalary/absencePlans/AbsencePlanNameTable.vue";
import AbsencePlanDetailsTable from "@/components/settings/settingsSalary/absencePlans/AbsencePlanDetailsTable.vue";
// import Pagination from "@/components/general/Pagination.vue";
import AbsencePlan from "@/models/settings/settingsSalary/absencePlans/AbsencePlan";
import AbsencePlansSlideDetails from "@/models/settings/settingsSalary/absencePlans/AbsencePlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AbsencePlanDetails",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AbsencePlanNameTable,
    AbsencePlanDetailsTable,
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
      absencePlansData: null,
      absencePlanData: new AbsencePlan(),
      absencePlansSlideDetailsData: new AbsencePlansSlideDetails(),
      absencePlansToken: this.$route.params.absencePlansToken,
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAbsencePlanDetails();
    },
    search(text) {
      this.textSearch = text;
      this.getAbsencePlanDetails();
    },
    async getAbsencePlanDetails() {
      this.isLoading = true;
      this.absencePlanData.absencePlansToken = this.absencePlansToken;
      try {
        let response = await this.absencePlanData.getAbsencePlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.absencePlanData.fillData(response.data.absencePlansData);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.absencePlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.absencePlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.absencePlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.absencePlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAbsencePlanDetails();
  },
};
</script>
