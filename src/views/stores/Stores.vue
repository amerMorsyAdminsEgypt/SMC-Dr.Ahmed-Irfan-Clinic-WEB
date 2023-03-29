<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="storesData">
      <div class="row">
        <StoreCard
          v-for="store in storesData"
          :key="store.storeToken"
          :storeData="store"
          v-on:setStoreData="storeData.fillData($event)"
        />
      </div>
      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <StoreInfo :storeData="storeData" />
      <StoreDelete :storeData="storeData" v-on:refresh="getAllStores()" />
    </div>

    <StoreFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import StoreCard from "@/components/stores/StoreCard.vue";
import StoreInfo from "@/components/stores/StoreInfo.vue";
import StoreDelete from "@/components/stores/StoreDelete.vue";
import StoreFloatBtns from "@/components/stores/StoreFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Store from "@/models/stores/Store";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Stores",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    StoreCard,
    StoreInfo,
    StoreDelete,
    StoreFloatBtns,
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
      storesData: null,
      storeData: new Store(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllStores();
    },
    search(text) {
      this.textSearch = text;
      this.getAllStores();
    },
    async getAllStores() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Stores/GetAllStores?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.storesPagination.totalPages,
            totalItems: response.data.storesPagination.totalItems,
            countItemsInPage: response.data.storesPagination.countItemsInPage,
            selfPage: response.data.storesPagination.selfPage,
          };
          this.storesData = response.data.storesPagination.storesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.storesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.storesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.storesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.storesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllStores();
  },
};
</script>
