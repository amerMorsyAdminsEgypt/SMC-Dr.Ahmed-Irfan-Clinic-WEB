<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="addictiveStuffsData">
      <AddictiveStuffsTable
        :addictiveStuffsData="addictiveStuffsData"
        :addictiveStuffData="addictiveStuffData"
        v-on:setAddictiveStuffData="addictiveStuffData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <AddictiveStuffInfo :addictiveStuffData="addictiveStuffData" />
      <AddictiveStuffDelete
        :addictiveStuffData="addictiveStuffData"
        v-on:refresh="getAllAddictiveStuffs()"
      />
    </div>

    <AddictiveStuffBtns
      :addictiveStuffTypeToken="addictiveStuffData.addictiveStuffTypeToken"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AddictiveStuffsTable from "@/components/settings/settingsOther/addictiveStuffs/AddictiveStuffsTable.vue";
import AddictiveStuffInfo from "@/components/settings/settingsOther/addictiveStuffs/AddictiveStuffInfo.vue";
import AddictiveStuffDelete from "@/components/settings/settingsOther/addictiveStuffs/AddictiveStuffDelete.vue";
import AddictiveStuffBtns from "@/components/settings/settingsOther/addictiveStuffs/AddictiveStuffBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import AddictiveStuff from "@/models/settings/settingsOther/addictiveStuffs/AddictiveStuff";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AddictiveStuffs",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AddictiveStuffsTable,
    AddictiveStuffInfo,
    AddictiveStuffDelete,
    AddictiveStuffBtns,
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
      addictiveStuffsData: null,
      addictiveStuffData: new AddictiveStuff(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllAddictiveStuffs();
    },
    search(addictiveStuffTypeToken, text) {
      this.addictiveStuffData.addictiveStuffTypeToken = addictiveStuffTypeToken;
      this.textSearch = text;
      this.getAllAddictiveStuffs();
    },
    async getAllAddictiveStuffs() {
      this.isLoading = true;
      try {
        const response = await this.addictiveStuffData.getAllAddictiveStuffs(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.addictiveStuffPagination.totalPages,
            totalItems: response.data.addictiveStuffPagination.totalItems,
            countItemsInPage:
              response.data.addictiveStuffPagination.countItemsInPage,
            selfPage: response.data.addictiveStuffPagination.selfPage,
          };
          this.addictiveStuffsData =
            response.data.addictiveStuffPagination.addictiveStuffData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.addictiveStuffsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.addictiveStuffsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.addictiveStuffsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.addictiveStuffsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllAddictiveStuffs();
  },
};
</script>
