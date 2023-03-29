<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="scientificDegreesData">
      <ScientificDegreesTable
        :scientificDegreesData="scientificDegreesData"
        :scientificDegreeData="scientificDegreeData"
        v-on:setScientificDegreeData="scientificDegreeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ScientificDegreeInfo :scientificDegreeData="scientificDegreeData" />
      <ScientificDegreeDelete
        :scientificDegreeData="scientificDegreeData"
        v-on:refresh="getAllScientificDegrees()"
      />
    </div>

    <ScientificDegreeBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import ScientificDegreesTable from "@/components/settings/settingsOther/scientificDegrees/ScientificDegreesTable.vue";
import ScientificDegreeInfo from "@/components/settings/settingsOther/scientificDegrees/ScientificDegreeInfo.vue";
import ScientificDegreeDelete from "@/components/settings/settingsOther/scientificDegrees/ScientificDegreeDelete.vue";
import ScientificDegreeBtns from "@/components/settings/settingsOther/scientificDegrees/ScientificDegreeBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ScientificDegree from "@/models/settings/settingsOther/scientificDegrees/ScientificDegree";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ScientificDegrees",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ScientificDegreesTable,
    ScientificDegreeInfo,
    ScientificDegreeDelete,
    ScientificDegreeBtns,
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
      scientificDegreesData: null,
      scientificDegreeData: new ScientificDegree(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllScientificDegrees();
    },
    search(text) {
      this.textSearch = text;
      this.getAllScientificDegrees();
    },
    async getAllScientificDegrees() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/ScientificDegrees/GetAllScientificDegrees/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.scientificDegreesPagination.totalPages,
            totalItems: response.data.scientificDegreesPagination.totalItems,
            countItemsInPage:
              response.data.scientificDegreesPagination.countItemsInPage,
            selfPage: response.data.scientificDegreesPagination.selfPage,
          };
          this.scientificDegreesData =
            response.data.scientificDegreesPagination.scientificDegreesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.scientificDegreesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.scientificDegreesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.scientificDegreesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.scientificDegreesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllScientificDegrees();
  },
};
</script>
