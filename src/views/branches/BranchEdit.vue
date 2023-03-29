<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BranchForm
      v-if="!isLoading"
      :branchData="branchData"
      :imageSrc="imageSrc"
      :submitName="$t('edit')"
      v-on:addOrUpdateBranch="updateBranch"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG_BRANCH from "@/assets/images/branches.svg";
// import { date2slash, date2dash, timeTo12, timeTo24 } from "@/utils/functions";
import BranchForm from "@/components/branches/BranchForm.vue";
import Branch from "@/models/branches/Branch";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BranchEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BranchForm,
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
      imageSrc: DEFAULT_IMG_BRANCH,
      branchData: new Branch(),
      branchToken: this.$route.params.branchToken,
    };
  },
  methods: {
    async getBranchDetails() {
      this.isLoading = true;
      this.branchData.branchToken = this.branchToken;
      try {
        let response = await this.branchData.getBranchDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.branchData.fillData(response.data.branchData);
          this.branchData.image = "";
          this.imageSrc = BASE_URL + this.branchData.branchImagePath;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.branchData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.branchData = null;
      }
      this.isLoading = false;
    },
    async updateBranch() {
      this.isLoading = true;
      try {
        let response = await this.branchData.addOrUpdateBranch(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/branches");
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
    this.getBranchDetails();
  },
};
</script>

<style scoped lang="scss"></style>
