<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="specialSpecialtiesData">
      <SpecialSpecialtiesTable
        :generalSpecialtiesData="generalSpecialtiesData"
        :specialSpecialtiesData="specialSpecialtiesData"
        :specialSpecialtyData="specialSpecialtyData"
        v-on:setSpecialSpecialtyData="specialSpecialtyData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <SpecialSpecialtyInfo :specialSpecialtyData="specialSpecialtyData" />
      <SpecialSpecialtyDelete
        :specialSpecialtyData="specialSpecialtyData"
        v-on:refresh="getAllSpecialSpecialties()"
      />
    </div>

    <SpecialSpecialtyBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import SpecialSpecialtiesTable from "@/components/settings/settingsOther/specialSpecialties/SpecialSpecialtiesTable.vue";
import SpecialSpecialtyInfo from "@/components/settings/settingsOther/specialSpecialties/SpecialSpecialtyInfo.vue";
import SpecialSpecialtyDelete from "@/components/settings/settingsOther/specialSpecialties/SpecialSpecialtyDelete.vue";
import SpecialSpecialtyBtns from "@/components/settings/settingsOther/specialSpecialties/SpecialSpecialtyBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
// import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import SpecialSpecialty from "@/models/settings/settingsOther/specialSpecialties/SpecialSpecialty";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "SpecialSpecialties",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SpecialSpecialtiesTable,
    SpecialSpecialtyInfo,
    SpecialSpecialtyDelete,
    SpecialSpecialtyBtns,
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
      generalSpecialtiesData: null,
      specialSpecialtiesData: null,
      // generalSpecialtyData: new GeneralSpecialty(),
      specialSpecialtyData: new SpecialSpecialty(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllSpecialSpecialties();
    },
    search(text) {
      this.textSearch = text;
      this.getAllSpecialSpecialties();
    },
    async getAllSpecialSpecialties() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/SpecialSpecialties/GetAllSpecialSpecialties/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.specialSpecialtiesPagination.totalPages,
            totalItems: response.data.specialSpecialtiesPagination.totalItems,
            countItemsInPage:
              response.data.specialSpecialtiesPagination.countItemsInPage,
            selfPage: response.data.specialSpecialtiesPagination.selfPage,
          };
          this.specialSpecialtiesData =
            response.data.specialSpecialtiesPagination.specialSpecialtiesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.specialSpecialtiesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.specialSpecialtiesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.specialSpecialtiesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.specialSpecialtiesData = null;
      }
      this.isLoading = false;
    },
    async getAllGeneralSpecialties() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/GeneralSpecialties/GetAllGeneralSpecialties/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.generalSpecialtiesData =
            response.data.generalSpecialtiesPagination.generalSpecialtiesData;
          // console.log(this.generalSpecialtiesData);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.generalSpecialtiesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.generalSpecialtiesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.generalSpecialtiesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.generalSpecialtiesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllGeneralSpecialties();
    this.getAllSpecialSpecialties();
  },
};
</script>
