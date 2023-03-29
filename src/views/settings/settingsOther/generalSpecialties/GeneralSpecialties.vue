<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="generalSpecialtiesData">
      <GeneralSpecialtiesTable
        :generalSpecialtiesData="generalSpecialtiesData"
        :generalSpecialtyData="generalSpecialtyData"
        v-on:setGeneralSpecialtyData="generalSpecialtyData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <GeneralSpecialtyInfo :generalSpecialtyData="generalSpecialtyData" />
      <GeneralSpecialtyDelete
        :generalSpecialtyData="generalSpecialtyData"
        v-on:refresh="getAllGeneralSpecialties()"
      />
    </div>

    <GeneralSpecialtyBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import GeneralSpecialtiesTable from "@/components/settings/settingsOther/generalSpecialties/GeneralSpecialtiesTable.vue";
import GeneralSpecialtyInfo from "@/components/settings/settingsOther/generalSpecialties/GeneralSpecialtyInfo.vue";
import GeneralSpecialtyDelete from "@/components/settings/settingsOther/generalSpecialties/GeneralSpecialtyDelete.vue";
import GeneralSpecialtyBtns from "@/components/settings/settingsOther/generalSpecialties/GeneralSpecialtyBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "GeneralSpecialties",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    GeneralSpecialtiesTable,
    GeneralSpecialtyInfo,
    GeneralSpecialtyDelete,
    GeneralSpecialtyBtns,
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
      generalSpecialtyData: new GeneralSpecialty(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllGeneralSpecialties();
    },
    search(text) {
      this.textSearch = text;
      this.getAllGeneralSpecialties();
    },
    async getAllGeneralSpecialties() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/GeneralSpecialties/GetAllGeneralSpecialties/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.generalSpecialtiesPagination.totalPages,
            totalItems: response.data.generalSpecialtiesPagination.totalItems,
            countItemsInPage:
              response.data.generalSpecialtiesPagination.countItemsInPage,
            selfPage: response.data.generalSpecialtiesPagination.selfPage,
          };
          this.generalSpecialtiesData =
            response.data.generalSpecialtiesPagination.generalSpecialtiesData;
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
  },
};
</script>
