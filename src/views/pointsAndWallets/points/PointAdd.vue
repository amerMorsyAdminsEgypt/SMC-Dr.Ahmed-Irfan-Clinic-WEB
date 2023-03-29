<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <PointForm
      v-if="!isLoading"
      :filterPointData="filterPointData"
      :submitName="$t('update')"
      v-on:updateTransactionPointsHistory="addPoint"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import PointForm from "@/components/pointsAndWallets/points/PointForm.vue";
import Point from "@/models/pointsAndWallets/points/Point";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "PointAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    PointForm,
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
      filterPointData: new Point(),
    };
  },
  methods: {
    async addPoint() {
      this.isLoading = true;
      try {
        let response =
          await this.filterPointData.updateTransactionPointsHistory(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.filterPointData.setInitialValue();
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
    filter() {
      this.filterPointData.clientToken = this.$store.getters.points.clientToken
        ? this.$store.getters.points.clientToken
        : "";
    },
  },
  async created() {
    await this.filter();
  },
};
</script>

<style scoped lang="scss"></style>
