<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="bloodTypesData">
      <BloodTypesTable
        :bloodTypesData="bloodTypesData"
        :bloodTypeData="bloodTypeData"
        v-on:setBloodTypeData="bloodTypeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <BloodTypeInfo :bloodTypeData="bloodTypeData" />
      <BloodTypeDelete
        :bloodTypeData="bloodTypeData"
        v-on:refresh="getAllBloodTypes()"
      />
    </div>

    <BloodTypeBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import BloodTypesTable from "@/components/settings/settingsOther/bloodTypes/BloodTypesTable.vue";
import BloodTypeInfo from "@/components/settings/settingsOther/bloodTypes/BloodTypeInfo.vue";
import BloodTypeDelete from "@/components/settings/settingsOther/bloodTypes/BloodTypeDelete.vue";
import BloodTypeBtns from "@/components/settings/settingsOther/bloodTypes/BloodTypeBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import BloodType from "@/models/settings/settingsOther/bloodTypes/BloodType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BloodTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BloodTypesTable,
    BloodTypeInfo,
    BloodTypeDelete,
    BloodTypeBtns,
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
      bloodTypesData: null,
      bloodTypeData: new BloodType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllBloodTypes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllBloodTypes();
    },
    async getAllBloodTypes() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/BloodTypes/GetAllBloodTypes/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.bloodTypesPagination.totalPages,
            totalItems: response.data.bloodTypesPagination.totalItems,
            countItemsInPage:
              response.data.bloodTypesPagination.countItemsInPage,
            selfPage: response.data.bloodTypesPagination.selfPage,
          };
          this.bloodTypesData =
            response.data.bloodTypesPagination.bloodTypesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.bloodTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.bloodTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.bloodTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.bloodTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllBloodTypes();
  },
};
</script>
