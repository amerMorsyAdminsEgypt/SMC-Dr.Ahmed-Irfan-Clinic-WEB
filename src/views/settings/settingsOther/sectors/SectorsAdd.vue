<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <SectorForm
      v-if="!isLoading"
      :sectorData="sectorData"
      :submitName="$t('add')"
      v-on:addOrUpdateSector="addSector()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import SectorForm from "@/components/settings/settingsOther/sectors/SectorForm.vue";

export default {
  name: "SectorsAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    SectorForm,
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
      sectorData: {
        branchToken: "BRN-1",
        sectorNameEn: "",
        sectorNameAr: "",
        sectorNotes: "",
      },
    };
  },
  methods: {
    async addSector() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        branchToken: this.sectorData.branchToken,
        sectorNameEn: this.sectorData.sectorNameEn,
        sectorNameAr: this.sectorData.sectorNameAr,
        sectorNotes: this.sectorData.sectorNotes,
      };

      try {
        const response = await axios.post(`/Sectors/AddSector`, data);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/sectors");
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
