<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="colorsData">
      <ColorsTable
        :colorsData="colorsData"
        :colorData="colorData"
        v-on:setColorData="colorData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ColorDelete :colorData="colorData" v-on:refresh="getAllColors()" />
    </div>

    <ColorBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ColorsTable from "@/components/settings/settingsOther/colors/ColorsTable.vue";
import ColorDelete from "@/components/settings/settingsOther/colors/ColorDelete.vue";
import ColorBtns from "@/components/settings/settingsOther/colors/ColorBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Color from "@/models/settings/settingsOther/colors/Color";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Colors",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ColorsTable,
    ColorDelete,
    ColorBtns,
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
      colorsData: null,
      colorData: new Color(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllColors();
    },
    search(text) {
      this.textSearch = text;
      this.getAllColors();
    },
    async getAllColors() {
      this.isLoading = true;
      try {
        const response = await this.colorData.getAllColors(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.colorsPagination.totalPages,
            totalItems: response.data.colorsPagination.totalItems,
            countItemsInPage: response.data.colorsPagination.countItemsInPage,
            selfPage: response.data.colorsPagination.selfPage,
          };
          this.colorsData = response.data.colorsPagination.colorsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.colorsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.colorsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.colorsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.colorsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllColors();
  },
};
</script>
