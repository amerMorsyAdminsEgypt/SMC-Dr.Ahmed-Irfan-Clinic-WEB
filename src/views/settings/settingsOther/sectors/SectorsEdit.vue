<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <SectorForm
      v-if="!isLoading"
      :sectorData="sectorData"
      :submitName="$t('edit')"
      v-on:addOrUpdateSector="updateSector()"
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
  name: "EmployeeEdit",
  components: {
    PreLoader,
    ExceptionWithImg,
    SectorForm,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      sectorToken: this.$route.params.sectorToken,
      sectorData: {},
    };
  },
  methods: {
    async getSectorDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Sectors/GetSectorDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&sectorToken=${this.sectorToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.sectorData = response.data.sectorData;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async updateSector() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        branchToken: this.sectorData.branchToken,
        sectorToken: this.sectorToken,
        sectorNameEn: this.sectorData.sectorNameEn,
        sectorNameAr: this.sectorData.sectorNameAr,
        sectorNotes: this.sectorData.sectorNotes,
      };

      try {
        const response = await axios.post(`/Sectors/UpdateSector`, data);
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
  async created() {
    this.getSectorDetails();
  },
};
</script>

<style scoped lang="scss"></style>
