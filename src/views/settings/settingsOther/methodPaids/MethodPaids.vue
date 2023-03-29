<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="methodPaidsData">
      <MethodPaidsTable
        :methodPaidsData="methodPaidsData"
        :methodPaidData="methodPaidData"
        v-on:setMethodPaidData="methodPaidData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MethodPaidInfo :methodPaidData="methodPaidData" />
      <MethodPaidDelete
        :methodPaidData="methodPaidData"
        v-on:refresh="getAllMethodPaid()"
      />
    </div>

    <MethodPaidBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import MethodPaidsTable from "@/components/settings/settingsOther/methodPaids/MethodPaidsTable.vue";
import MethodPaidInfo from "@/components/settings/settingsOther/methodPaids/MethodPaidInfo.vue";
import MethodPaidDelete from "@/components/settings/settingsOther/methodPaids/MethodPaidDelete.vue";
import MethodPaidBtns from "@/components/settings/settingsOther/methodPaids/MethodPaidBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MethodPaids",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MethodPaidsTable,
    MethodPaidInfo,
    MethodPaidDelete,
    MethodPaidBtns,
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
      methodPaidsData: null,
      methodPaidData: new MethodPaid(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllMethodPaid();
    },
    search(text) {
      this.textSearch = text;
      this.getAllMethodPaid();
    },
    async getAllMethodPaid() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/MethodPaids/GetAllMethodPaid?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.methodPaidPagination.totalPages,
            totalItems: response.data.methodPaidPagination.totalItems,
            countItemsInPage:
              response.data.methodPaidPagination.countItemsInPage,
            selfPage: response.data.methodPaidPagination.selfPage,
          };
          this.methodPaidsData =
            response.data.methodPaidPagination.methodPaidData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.methodPaidsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.methodPaidsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.methodPaidsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.methodPaidsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllMethodPaid();
  },
};
</script>
