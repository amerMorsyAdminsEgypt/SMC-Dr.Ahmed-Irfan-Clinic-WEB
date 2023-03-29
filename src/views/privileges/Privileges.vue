<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <PrivilegeForm
      v-if="!isLoading"
      :userPrivilegeData="userPrivilegeData"
      :submitName="$t('edit')"
      v-on:updateUserPrivilege="updateUserPrivilege"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import PrivilegeForm from "@/components/privileges/PrivilegeForm.vue";
import UserPrivilege from "@/models/privileges/UserPrivilege";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Privilege",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    PrivilegeForm,
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
      userPrivilegeData: new UserPrivilege(),
    };
  },
  methods: {
    async updateUserPrivilege() {
      this.isLoading = true;
      try {
        let response = await this.userPrivilegeData.updateUserPrivilege();
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.userPrivilegeData.setInitialValue();
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
};
</script>

<style scoped lang="scss"></style>
