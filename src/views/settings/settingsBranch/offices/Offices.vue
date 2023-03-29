<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="officesData">
      <OfficesTable
        :officesData="officesData"
        :officeData="officeData"
        v-on:setOfficeData="officeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <OfficeInfo :officeData="officeData" />
      <OfficeDelete :officeData="officeData" v-on:refresh="getAllOffices()" />
    </div>

    <OfficeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OfficesTable from "@/components/settings/settingsBranch/offices/OfficesTable.vue";
import OfficeInfo from "@/components/settings/settingsBranch/offices/OfficeInfo.vue";
import OfficeDelete from "@/components/settings/settingsBranch/offices/OfficeDelete.vue";
import OfficeFloatBtns from "@/components/settings/settingsBranch/offices/OfficeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Office from "@/models/settings/settingsBranch/offices/Office";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Offices",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficesTable,
    OfficeInfo,
    OfficeDelete,
    OfficeFloatBtns,
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
      officesData: null,
      officeData: new Office(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllOffices();
    },
    search(text) {
      this.textSearch = text;
      this.getAllOffices();
    },
    async getAllOffices() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Office/GetAllOffices/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.officesPagination.totalPages,
            totalItems: response.data.officesPagination.totalItems,
            countItemsInPage: response.data.officesPagination.countItemsInPage,
            selfPage: response.data.officesPagination.selfPage,
          };
          this.officesData = response.data.officesPagination.officesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.officesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.officesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.officesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllOffices();
  },
};
</script>
