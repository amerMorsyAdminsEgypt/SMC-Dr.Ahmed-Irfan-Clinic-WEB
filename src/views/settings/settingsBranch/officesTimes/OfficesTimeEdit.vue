<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficesTimeForm
      v-if="!isLoading"
      :officesTimeData="officesTimeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateOfficeTime="updateOfficesTime"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OfficesTimeForm from "@/components/settings/settingsBranch/officesTimes/OfficesTimeForm.vue";
import OfficesTime from "@/models/settings/settingsBranch/officesTimes/OfficeTime";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficesCEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficesTimeForm,
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
      officesTimeData: new OfficesTime(),
      officeTimeToken: this.$route.params.officeTimeToken,
    };
  },
  methods: {
    async getOfficeTimeDetails() {
      this.isLoading = true;
      this.officesTimeData.officeTimeToken = this.officeTimeToken;
      try {
        let response = await this.officesTimeData.getOfficeTimeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.officesTimeData.fillData(response.data.officesTimesData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.officesTimeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officesTimeData = null;
      }
      this.isLoading = false;
    },
    async updateOfficesTime() {
      this.isLoading = true;
      try {
        let response = await this.officesTimeData.addOrUpdateOfficeTime(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/offices-times");
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
  },
  async created() {
    this.getOfficeTimeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
