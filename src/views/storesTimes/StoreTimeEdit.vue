<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <BranchTimeForm
      v-if="!isLoading"
      :brancTimehData="brancTimehData"
      :submitName="$t('edit')"
      v-on:addOrUpdateBranchTime="updateBranchTime"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { timeTo24 } from "@/utils/functions";
// import { date2slash, date2dash, timeTo12, timeTo24 } from "@/utils/functions";
import BranchTimeForm from "@/components/branchesTimes/BranchTimeForm.vue";
import BranchTime from "@/models/branchesTimes/BranchTime";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BranchTimeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BranchTimeForm,
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
      brancTimehData: new BranchTime(),
      branchTimeToken: this.$route.params.branchTimeToken,
    };
  },
  methods: {
    async getBranchTimeDetails() {
      this.isLoading = true;
      this.brancTimehData.branchTimeToken = this.branchTimeToken;
      try {
        let response = await this.brancTimehData.getBranchTimeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          // this.brancTimehData.fillData(response.data.brancTimehData);
          this.brancTimehData.fillData(response.data.branchData);
          this.brancTimehData.branchOpenTime = timeTo24(
            response.data.branchData.branchOpenTime
          );
          this.brancTimehData.branchCloseTime = timeTo24(
            response.data.branchData.branchCloseTime
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.brancTimehData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.brancTimehData = null;
      }
      this.isLoading = false;
    },
    async updateBranchTime() {
      this.isLoading = true;
      try {
        let response = await this.brancTimehData.addOrUpdateBranchTime(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/branches-times");
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
    this.getBranchTimeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
