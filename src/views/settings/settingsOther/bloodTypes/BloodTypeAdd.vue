<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BloodTypeForm
      v-if="!isLoading"
      :bloodTypeData="bloodTypeData"
      :submitName="$t('add')"
      v-on:addOrUpdateBloodType="addOrUpdateBloodType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BloodTypeForm from "@/components/settings/settingsOther/bloodTypes/BloodTypeForm.vue";
import BloodType from "@/models/settings/settingsOther/bloodTypes/BloodType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BloodTypeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BloodTypeForm,
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

      bloodTypeData: new BloodType(),
    };
  },
  methods: {
    async addOrUpdateBloodType() {
      this.isLoading = true;
      try {
        let response = await this.bloodTypeData.addOrUpdateBloodType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.bloodTypeData.setInitialValue();
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
