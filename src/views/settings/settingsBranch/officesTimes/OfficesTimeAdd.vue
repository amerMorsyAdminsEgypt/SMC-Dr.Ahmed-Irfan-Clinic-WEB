<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OfficesTimeForm
      v-if="!isLoading"
      :officesTimeData="officesTimeData"
      :submitName="$t('add')"
      v-on:addOrUpdateOfficeTime="addOrUpdateOfficeTime"
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
  name: "OfficesTimeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficesTimeForm,
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

      officesTimeData: new OfficesTime(),
    };
  },
  methods: {
    async addOrUpdateOfficeTime() {
      this.isLoading = true;
      try {
        let response = await this.officesTimeData.addOrUpdateOfficeTime(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
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
    this.officesTimeData.reservationShowStatus = true;
  },
};
</script>

<style scoped lang="scss"></style>
