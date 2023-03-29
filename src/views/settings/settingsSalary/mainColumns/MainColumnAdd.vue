<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MainColumnForm
      v-if="!isLoading"
      :mainColumnData="mainColumnData"
      :submitName="$t('add')"
      v-on:addOrUpdateMainColumn="addMainColumn"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MainColumnForm from "@/components/settings/settingsSalary/mainColumns/MainColumnForm.vue";
import MainColumn from "@/models/settings/settingsSalary/mainColumns/MainColumn";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MainColumnAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MainColumnForm,
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
      mainColumnData: new MainColumn(),
    };
  },
  methods: {
    async addMainColumn() {
      this.isLoading = true;
      try {
        let response = await this.mainColumnData.addOrUpdateMainColumn(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.mainColumnData.setInitialValue();
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
