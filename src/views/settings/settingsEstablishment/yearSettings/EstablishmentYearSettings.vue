<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="establishmentYearSettingsData">
      <EstablishmentYearSettingsTable
        v-on:setEstablishmentYearSettingData="
          establishmentYearSettingData.fillData($event)
        "
        :establishmentYearSettingsData="establishmentYearSettingsData"
        :establishmentYearSettingData="establishmentYearSettingData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EstablishmentYearSettingInfo
        :establishmentYearSettingData="establishmentYearSettingData"
      />
      <EstablishmentYearSettingDelete
        :establishmentYearSettingData="establishmentYearSettingData"
        v-on:refresh="getAllEstablishmentYearSettings()"
      />
    </div>

    <EstablishmentYearSettingFloatBtns
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import EstablishmentYearSettingsTable from "@/components/settings/settingsEstablishment/yearSettings/EstablishmentYearSettingsTable.vue";
import EstablishmentYearSettingInfo from "@/components/settings/settingsEstablishment/yearSettings/EstablishmentYearSettingInfo.vue";
import EstablishmentYearSettingDelete from "@/components/settings/settingsEstablishment/yearSettings/EstablishmentYearSettingDelete.vue";
import EstablishmentYearSettingFloatBtns from "@/components/settings/settingsEstablishment/yearSettings/EstablishmentYearSettingFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import EstablishmentYearSetting from "@/models/settings/settingsEstablishment/yearSettings/EstablishmentYearSetting";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EstablishmentYearSettings",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EstablishmentYearSettingsTable,
    EstablishmentYearSettingInfo,
    EstablishmentYearSettingDelete,
    EstablishmentYearSettingFloatBtns,
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
      establishmentYearSettingsData: null,
      establishmentYearSettingData: new EstablishmentYearSetting(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEstablishmentYearSettings();
    },
    search(text) {
      this.textSearch = text;
      this.getAllEstablishmentYearSettings();
    },
    async getAllEstablishmentYearSettings() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EstablishmentYearSetting/GetAllEstablishmentYearSetting?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.establishmentYearSettingPagination.totalPages,
            totalItems:
              response.data.establishmentYearSettingPagination.totalItems,
            countItemsInPage:
              response.data.establishmentYearSettingPagination.countItemsInPage,
            selfPage: response.data.establishmentYearSettingPagination.selfPage,
          };
          this.establishmentYearSettingsData =
            response.data.establishmentYearSettingPagination.establishmentYearSettingData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.establishmentYearSettingsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.establishmentYearSettingsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.establishmentYearSettingsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.establishmentYearSettingsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllEstablishmentYearSettings();
  },
};
</script>
