<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="requirementsData">
      <RequirementsTable
        :requirementsData="requirementsData"
        :requirementData="requirementData"
        v-on:setRequirementData="requirementData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <RequirementInfo :requirementData="requirementData" />
      <RequirementDelete
        :requirementData="requirementData"
        v-on:refresh="getAllRequirements()"
      />
    </div>

    <RequirementBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import RequirementsTable from "@/components/settings/settingsOther/requirements/RequirementsTable.vue";
import RequirementInfo from "@/components/settings/settingsOther/requirements/RequirementInfo.vue";
import RequirementDelete from "@/components/settings/settingsOther/requirements/RequirementDelete.vue";
import RequirementBtns from "@/components/settings/settingsOther/requirements/RequirementBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Requirement from "@/models/settings/settingsOther/requirements/Requirement";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Requirements",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    RequirementsTable,
    RequirementInfo,
    RequirementDelete,
    RequirementBtns,
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
      requirementsData: null,
      requirementData: new Requirement(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllRequirements();
    },
    search(text) {
      this.textSearch = text;
      this.getAllRequirements();
    },
    async getAllRequirements() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Requirements/GetAllRequirements?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.requirementsPagination.totalPages,
            totalItems: response.data.requirementsPagination.totalItems,
            countItemsInPage:
              response.data.requirementsPagination.countItemsInPage,
            selfPage: response.data.requirementsPagination.selfPage,
          };
          this.requirementsData =
            response.data.requirementsPagination.requirementsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.requirementsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.requirementsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.requirementsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.requirementsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllRequirements();
  },
};
</script>
