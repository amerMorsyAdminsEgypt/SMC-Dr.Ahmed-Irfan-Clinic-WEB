<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <TreasuryForm
      v-if="!isLoading"
      :treasuryData="treasuryData"
      :submitName="$t('edit')"
      v-on:addOrUpdateTreasury="updateTreasury"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import TreasuryForm from "@/components/finance/treasuries/TreasuryForm.vue";
import Treasury from "@/models/finance/treasuries/Treasury";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "TreasuryEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TreasuryForm,
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
      treasuryData: new Treasury(),
      treasuryToken: this.$route.params.treasuryToken,
    };
  },
  methods: {
    async getTreasuryDetails() {
      this.isLoading = true;
      this.treasuryData.treasuryToken = this.treasuryToken;
      try {
        let response = await this.treasuryData.getTreasuryDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.treasuryData.fillData(response.data.treasuryData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.treasuryData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.treasuryData = null;
      }
      this.isLoading = false;
    },
    async updateTreasury() {
      this.isLoading = true;
      try {
        let response = await this.treasuryData.addOrUpdateTreasury(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/treasuries");
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
    this.getTreasuryDetails();
  },
};
</script>

<style scoped lang="scss"></style>
