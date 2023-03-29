<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MonthsEstablishmentSettingForm
      :settingData="settingData"
      :submitName="$t('add')"
      v-on:addEstablishmentSetting="addEstablishmentSetting"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import MonthsEstablishmentSettingForm from "@/components/settings/settingsEstablishment/monthsSettings/MonthsEstablishmentSettingForm.vue";

export default {
  name: "SettingsGeneralAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    MonthsEstablishmentSettingForm,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      settingData: {
        settingNameAr: "",
        settingNameEn: "",
        settingDayStartOrEnd: "1",
        settingDayFromEndMonth: "",
        settingDayInMonth: "",
        settingDay: "",
        settingDayFromEndMonthStatus: "",
        settingDayInMonthStatus: "",
        settingActiveStart: "",
        settingNotes: "",
      },
    };
  },
  methods: {
    async addEstablishmentSetting() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        establishmentToken: "EST-1",
        settingNameAr: this.settingData.settingNameAr,
        settingNameEn: this.settingData.settingNameEn,
        settingDayFromEndMonth: this.settingData.settingDay,
        settingDayInMonth: this.settingData.settingDay,
        settingDayFromEndMonthStatus:
          this.settingData.settingDayStartOrEnd == 2 ? true : false,
        settingDayInMonthStatus:
          this.settingData.settingDayStartOrEnd == 1 ? true : false,
        settingActiveStart: this.date2slash(
          this.settingData.settingActiveStart
        ),
        settingNotes: this.settingData.settingNotes,
      };

      try {
        const response = await axios.post(
          `/EstablishmentsSettings/AddEstablishmentSetting`,
          data
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeeData = {
            settingNameEn: "",
            settingNameAr: "",
            settingDay: "",
            settingDayFromEndMonth: "",
            settingDayInMonth: "",
            settingDayFromEndMonthStatus: "",
            settingDayInMonthStatus: "",
            settingActiveStart: "",
            settingNotes: "",
          };
          this.$router.push("/months-establishment-settings");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    date2slash(date) {
      if (date.indexOf("-") > -1) return date.replace(/-/g, "/");
      else return date;
    },
    date2dash(date) {
      if (date.indexOf("/") > -1) return date.replace(/\//g, "-");
      else return date;
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
  },
};
</script>

<style scoped lang="scss"></style>
