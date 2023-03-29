<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="newsCategoriesData">
      <NewsCategoriesTable
        :newsCategoriesData="newsCategoriesData"
        :newsCategoryData="newsCategoryData"
        v-on:setNewsCategoryData="newsCategoryData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <NewsCategoryInfo :newsCategoryData="newsCategoryData" />
      <NewsCategoryDelete
        :newsCategoryData="newsCategoryData"
        v-on:refresh="getAllNewsCategories()"
      />
    </div>

    <NewsCategoryBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import NewsCategoriesTable from "@/components/settings/settingsOther/newsCategories/NewsCategoriesTable.vue";
import NewsCategoryInfo from "@/components/settings/settingsOther/newsCategories/NewsCategoryInfo.vue";
import NewsCategoryDelete from "@/components/settings/settingsOther/newsCategories/NewsCategoryDelete.vue";
import NewsCategoryBtns from "@/components/settings/settingsOther/newsCategories/NewsCategoryBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import NewsCategory from "@/models/settings/settingsOther/newsCategories/NewsCategory";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "NewsCategories",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    NewsCategoriesTable,
    NewsCategoryInfo,
    NewsCategoryDelete,
    NewsCategoryBtns,
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
      newsCategoriesData: null,
      newsCategoryData: new NewsCategory(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllNewsCategories();
    },
    search(text) {
      this.textSearch = text;
      this.getAllNewsCategories();
    },
    async getAllNewsCategories() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/NewsCategories/GetAllNewsCategories/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.newsCategoriesPagination.totalPages,
            totalItems: response.data.newsCategoriesPagination.totalItems,
            countItemsInPage:
              response.data.newsCategoriesPagination.countItemsInPage,
            selfPage: response.data.newsCategoriesPagination.selfPage,
          };
          this.newsCategoriesData =
            response.data.newsCategoriesPagination.newsCategoriesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.newsCategoriesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.newsCategoriesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.newsCategoriesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.newsCategoriesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllNewsCategories();
  },
};
</script>
