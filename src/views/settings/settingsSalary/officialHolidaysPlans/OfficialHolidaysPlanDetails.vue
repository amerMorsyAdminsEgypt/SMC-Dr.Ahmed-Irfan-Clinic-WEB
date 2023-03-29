<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="officialHolidaysPlanData">
      <OfficialHolidaysPlanNameTable
        :officialHolidaysPlanData="officialHolidaysPlanData"
      />

      <OfficialHolidaysPlanDetailsTable
        :officialHolidaysPlansSlidesDetailsData="
          officialHolidaysPlanData.officialHolidaysPlansSlidesDetailsData
        "
        v-on:setOfficialHolidaysPlansSlideDetailsData="
          officialHolidaysPlansSlideDetailsData.fillData($event)
        "
        :officialHolidaysPlansSlideDetailsData="
          officialHolidaysPlansSlideDetailsData
        "
      />

      <!-- <OfficialHolidaysPlanDetailsInfo
        :officialHolidaysPlansSlideDetailsData="
          officialHolidaysPlansSlideDetailsData
        "
      /> -->

      <OfficialHolidaysPlanDetailsDelete
        :officialHolidaysPlansSlideDetailsData="
          officialHolidaysPlansSlideDetailsData
        "
        v-on:refresh="getOfficialHolidaysPlanDetails()"
      />
    </div>

    <OfficialHolidaysPlanDetailsFloatBtns
      :officialHolidaysPlansToken="officialHolidaysPlansToken"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OfficialHolidaysPlanNameTable from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanNameTable.vue";
import OfficialHolidaysPlanDetailsTable from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetailsTable.vue";
// import OfficialHolidaysPlanDetailsInfo from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetailsInfo.vue";
import OfficialHolidaysPlanDetailsDelete from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetailsDelete.vue";
import OfficialHolidaysPlanDetailsFloatBtns from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetailsFloatBtns.vue";
import OfficialHolidaysPlan from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlan";
import OfficialHolidaysPlansSlideDetails from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficialHolidaysPlanDetails",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidaysPlanNameTable,
    OfficialHolidaysPlanDetailsTable,
    // OfficialHolidaysPlanDetailsInfo,
    OfficialHolidaysPlanDetailsDelete,
    OfficialHolidaysPlanDetailsFloatBtns,
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
      officialHolidaysPlansData: null,
      officialHolidaysPlanData: new OfficialHolidaysPlan(),
      officialHolidaysPlansSlideDetailsData:
        new OfficialHolidaysPlansSlideDetails(),
      officialHolidaysPlansToken: this.$route.params.officialHolidaysPlansToken,
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getOfficialHolidaysPlanDetails();
    },
    search(text) {
      this.textSearch = text;
      this.getOfficialHolidaysPlanDetails();
    },
    async getOfficialHolidaysPlanDetails() {
      this.isLoading = true;
      this.officialHolidaysPlanData.officialHolidaysPlansToken =
        this.officialHolidaysPlansToken;
      try {
        let response =
          await this.officialHolidaysPlanData.getOfficialHolidaysPlanDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.officialHolidaysPlanData.fillData(
            response.data.officialHolidaysPlansData
          );
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.officialHolidaysPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.officialHolidaysPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.officialHolidaysPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officialHolidaysPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getOfficialHolidaysPlanDetails();
  },
};
</script>
