<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="servicesTypesData">
      <ServicesTypesTable
        :servicesTypesData="servicesTypesData"
        :servicesTypeData="servicesTypeData"
        v-on:setServicesTypeData="servicesTypeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ServicesTypeInfo :servicesTypeData="servicesTypeData" />
      <ServicesTypeDelete
        :servicesTypeData="servicesTypeData"
        v-on:refresh="getAllServicesTypes()"
      />
    </div>

    <ServicesTypeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import ServicesTypesTable from "@/components/settings/settingsOther/servicesTypes/ServicesTypesTable.vue";
import ServicesTypeInfo from "@/components/settings/settingsOther/servicesTypes/ServicesTypeInfo.vue";
import ServicesTypeDelete from "@/components/settings/settingsOther/servicesTypes/ServicesTypeDelete.vue";
import ServicesTypeFloatBtns from "@/components/settings/settingsOther/servicesTypes/ServicesTypeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ServicesType from "@/models/settings/settingsOther/servicesTypes/ServicesType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesTypesTable,
    ServicesTypeInfo,
    ServicesTypeDelete,
    ServicesTypeFloatBtns,
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
      servicesTypesData: null,
      servicesTypeData: new ServicesType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllServicesTypes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllServicesTypes();
    },
    async getAllServicesTypes() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/ServicesTypes/GetAllServicesTypes/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.servicesTypesPagination.totalPages,
            totalItems: response.data.servicesTypesPagination.totalItems,
            countItemsInPage:
              response.data.servicesTypesPagination.countItemsInPage,
            selfPage: response.data.servicesTypesPagination.selfPage,
          };
          this.servicesTypesData =
            response.data.servicesTypesPagination.servicesTypesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.servicesTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.servicesTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.servicesTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllServicesTypes();
  },
};
</script>
