<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="establishmentsSettingsData">
      <MonthsEstablishmentSettingsTable
        :establishmentsSettingsData="establishmentsSettingsData"
        :establishmentSettingsData="establishmentSettingsData"
        v-on:setSettingsData="establishmentSettingsData = $event"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MonthsEstablishmentSettingDelete
        :establishmentSettingsData="establishmentSettingsData"
        v-on:refresh="getAllEstablishmentsSettings()"
      />
    </div>

    <MonthsEstablishmentSettingFloatBtns
      :settlementYear="settlementYear"
      :settlementMonth="settlementMonth"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import { mapGetters } from "vuex";
import MonthsEstablishmentSettingsTable from "@/components/settings/settingsEstablishment/monthsSettings/MonthsEstablishmentSettingsTable.vue";
import MonthsEstablishmentSettingDelete from "@/components/settings/settingsEstablishment/monthsSettings/MonthsEstablishmentSettingDelete.vue";
import MonthsEstablishmentSettingFloatBtns from "@/components/settings/settingsEstablishment/monthsSettings/MonthsEstablishmentSettingFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "MonthsEstablishmentSettings",
  components: {
    PreLoader,
    ExceptionWithImg,
    MonthsEstablishmentSettingsTable,
    MonthsEstablishmentSettingDelete,
    MonthsEstablishmentSettingFloatBtns,
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
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      settlementYear: new Date().getFullYear(),
      settlementMonth: new Date().getMonth() + 1,
      establishmentsSettingsData: null,
      establishmentSettingsData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEstablishmentsSettings();
    },
    search(year, month) {
      this.settlementYear = year;
      this.settlementMonth = month;
      this.getAllEstablishmentsSettings();
    },
    async getAllEstablishmentsSettings() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EstablishmentsSettings/GetAllEstablishmentsSettings?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.establishmentsSettingsPagination.totalPages,
            totalItems:
              response.data.establishmentsSettingsPagination.totalItems,
            countItemsInPage:
              response.data.establishmentsSettingsPagination.countItemsInPage,
            selfPage: response.data.establishmentsSettingsPagination.selfPage,
          };
          this.establishmentsSettingsData =
            response.data.establishmentsSettingsPagination.establishmentsSettingsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.establishmentsSettingsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.establishmentsSettingsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.establishmentsSettingsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.establishmentsSettingsData = null;
      }
      this.isLoading = false;
    },
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
    getNow: function (monthAgo = 0) {
      if (monthAgo < 0) monthAgo = 0;
      var d = new Date();
      d.toLocaleDateString();
      d.setMonth(d.getMonth() - monthAgo);
      d.toLocaleDateString();
      var month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("/");
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  async created() {
    this.getAllEstablishmentsSettings();
  },
};
</script>

<style lang="scss"></style>
