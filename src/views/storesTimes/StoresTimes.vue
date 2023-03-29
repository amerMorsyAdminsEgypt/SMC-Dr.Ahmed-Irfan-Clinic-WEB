<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="branchesTimesData">
      <BranchesTimesTable
        :branchesTimesData="branchesTimesData"
        :branchTimeData="branchTimeData"
        v-on:setBranchTimeData="branchTimeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <BranchTimeDelete
        :branchTimeData="branchTimeData"
        v-on:refresh="getAllBranchesTimes()"
      />
    </div>

    <BranchTimeFloatBtns
      :textSearch="textSearch"
      :dayToken="dayToken"
      :branchToken="branchToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import BranchesTimesTable from "@/components/branchesTimes/BranchesTimesTable.vue";
import BranchTimeDelete from "@/components/branchesTimes/BranchTimeDelete.vue";
import BranchTimeFloatBtns from "@/components/branchesTimes/BranchTimeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import BranchTime from "@/models/branchesTimes/BranchTime";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BranchesTimes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BranchesTimesTable,
    BranchTimeDelete,
    BranchTimeFloatBtns,
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
      dayToken: "",
      branchToken: this.$store.getters.branchToken,
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      branchesTimesData: null,
      branchTimeData: new BranchTime(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllBranchesTimes();
    },
    search(text, dayToken, branchToken) {
      this.textSearch = text;
      this.dayToken = dayToken;
      this.branchToken = branchToken;
      this.getAllBranchesTimes();
    },
    async getAllBranchesTimes() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/BranchesTimes/getAllBranchesTimes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&dayToken=${this.dayToken}&branchToken=${this.branchToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.branchesTimesPagination.totalPages,
            totalItems: response.data.branchesTimesPagination.totalItems,
            countItemsInPage:
              response.data.branchesTimesPagination.countItemsInPage,
            selfPage: response.data.branchesTimesPagination.selfPage,
          };
          this.branchesTimesData =
            response.data.branchesTimesPagination.branchesTimesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.branchesTimesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.branchesTimesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.branchesTimesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.branchesTimesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllBranchesTimes();
  },
};
</script>
