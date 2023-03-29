<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="branchesData">
      <div class="row">
        <BranchCard
          v-for="branch in branchesData"
          :key="branch.branchToken"
          :branchData="branch"
          v-on:setBranchData="branchData.fillData($event)"
        />
      </div>
      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <BranchInfo :branchData="branchData" />
      <BranchDelete :branchData="branchData" v-on:refresh="getAllBranches()" />
    </div>

    <BranchFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import BranchCard from "@/components/branches/BranchCard.vue";
import BranchInfo from "@/components/branches/BranchInfo.vue";
import BranchDelete from "@/components/branches/BranchDelete.vue";
import BranchFloatBtns from "@/components/branches/BranchFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Branch from "@/models/branches/Branch";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Branches",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BranchCard,
    BranchInfo,
    BranchDelete,
    BranchFloatBtns,
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
      branchesData: null,
      branchData: new Branch(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllBranches();
    },
    search(text) {
      this.textSearch = text;
      this.getAllBranches();
    },
    async getAllBranches() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Branches/GetAllBranches?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.branchesPagination.totalPages,
            totalItems: response.data.branchesPagination.totalItems,
            countItemsInPage: response.data.branchesPagination.countItemsInPage,
            selfPage: response.data.branchesPagination.selfPage,
          };
          this.branchesData = response.data.branchesPagination.branchesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.branchesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.branchesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.branchesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.branchesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllBranches();
  },
};
</script>
