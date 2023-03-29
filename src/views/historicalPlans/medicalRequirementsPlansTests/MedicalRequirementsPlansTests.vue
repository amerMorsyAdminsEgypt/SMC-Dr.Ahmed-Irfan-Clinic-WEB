<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="medicalRequirementsPlansData">
      <MedicalRequirementsPlansTable
        v-on:setMedicalRequirementsPlanData="
          medicalRequirementsPlanData.fillData($event)
        "
        :medicalRequirementsPlansData="medicalRequirementsPlansData"
        :medicalRequirementsPlanData="medicalRequirementsPlanData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterMedicalRequirementsPlanData.paginationData"
        v-on:changePage="changePage"
      />

      <MedicalRequirementsPlanDelete
        :filterMedicalRequirementsPlanData="medicalRequirementsPlanData"
        v-on:refresh="getMedicalRequirementsPlans()"
      />
      <MedicalRequirementsPlanDownload
        :filterMedicalRequirementsPlanData="medicalRequirementsPlanData"
        v-on:refresh="getMedicalRequirementsPlans()"
      />
    </div>

    <MedicalRequirementsPlanFloatBtns
      :filterMedicalRequirementsPlanData="filterMedicalRequirementsPlanData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicalRequirementsPlansTable from "@/components/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlansTable.vue";
import MedicalRequirementsPlanDelete from "@/components/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlanDelete.vue";
import MedicalRequirementsPlanDownload from "@/components/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlanDownload.vue";
import MedicalRequirementsPlanFloatBtns from "@/components/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MedicalRequirementsPlan from "@/models/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlan";
import createToastMixin from "@/utils/create-toast-mixin";
import { REQUIREMENTS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "MedicalRequirementsPlansTests",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicalRequirementsPlansTable,
    MedicalRequirementsPlanDelete,
    MedicalRequirementsPlanDownload,
    MedicalRequirementsPlanFloatBtns,
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
      requirementTypeToken: REQUIREMENTS_TYPE_TOKENS.MedicalTests,
      storedCurrentTab:
        this.$store.getters.currentTab || REQUIREMENTS_TYPE_TOKENS.Rays,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      medicalRequirementsPlansData: null,
      medicalRequirementsPlanData: new MedicalRequirementsPlan(),
      filterMedicalRequirementsPlanData: new MedicalRequirementsPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.filterMedicalRequirementsPlanData.paginationData.selfPage = page;
      this.getMedicalRequirementsPlans();
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
      this.filterMedicalRequirementsPlanData.fillData(data);
      this.medicalRequirementsPlansData = null;
      this.getMedicalRequirementsPlans();
    },
    async getMedicalRequirementsPlans() {
      this.isLoading = true;
      try {
        let response =
          await this.filterMedicalRequirementsPlanData.getMedicalRequirementsPlans(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.medicalRequirementsPlansData =
            response.data.medicalRequirementsPlansDataPagination.medicalRequirementsPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.medicalRequirementsPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.medicalRequirementsPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.medicalRequirementsPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.medicalRequirementsPlansData = null;
      }
      this.isLoading = false;
    },

    setFilter() {
      this.filterMedicalRequirementsPlanData.clientToken = this.$store.getters
        .historicalPlans.clientToken
        ? this.$store.getters.historicalPlans.clientToken
        : "";
      this.filterMedicalRequirementsPlanData.reservationToken = this.$store
        .getters.historicalPlans.reservationToken
        ? this.$store.getters.historicalPlans.reservationToken
        : "";
      this.filterMedicalRequirementsPlanData.requirementTypeToken =
        this.requirementTypeToken;
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
    this.getMedicalRequirementsPlans();
  },
};
</script>
