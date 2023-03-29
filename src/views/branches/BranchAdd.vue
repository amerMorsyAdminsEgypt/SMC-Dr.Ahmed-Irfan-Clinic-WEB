<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BranchForm
      v-if="!isLoading"
      :branchData="branchData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateBranch="addBranch"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DEFAULT_IMG_BRANCH from "@/assets/images/branches.svg";
import BranchForm from "@/components/branches/BranchForm.vue";
import Branch from "@/models/branches/Branch";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BranchAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BranchForm,
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
      imageSrc: DEFAULT_IMG_BRANCH,
      branchData: new Branch(),
    };
  },
  methods: {
    async addBranch() {
      this.isLoading = true;
      try {
        let response = await this.branchData.addOrUpdateBranch(
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
