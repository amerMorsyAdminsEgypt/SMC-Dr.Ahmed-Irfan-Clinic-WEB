<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <SpecialSpecialtyForm
      v-if="!isLoading"
      :specialSpecialtyData="specialSpecialtyData"
      :submitName="$t('add')"
      v-on:addOrUpdateSpecialSpecialty="addOrUpdateSpecialSpecialty"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import SpecialSpecialtyForm from "@/components/settings/settingsOther/specialSpecialties/SpecialSpecialtyForm.vue";
import SpecialSpecialty from "@/models/settings/settingsOther/specialSpecialties/SpecialSpecialty";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "SpecialSpecialtAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SpecialSpecialtyForm,
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

      specialSpecialtyData: new SpecialSpecialty(),
    };
  },
  methods: {
    async addOrUpdateSpecialSpecialty() {
      this.isLoading = true;
      try {
        let response =
          await this.specialSpecialtyData.addOrUpdateSpecialSpecialty(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.specialSpecialtyData.setInitialValue();
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
