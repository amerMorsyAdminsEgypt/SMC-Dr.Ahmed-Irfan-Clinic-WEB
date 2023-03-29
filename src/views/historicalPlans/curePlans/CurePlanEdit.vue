<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <CurePlanForm
      v-if="!isLoading"
      v-on:addOrUpdateCurePlan="updateCurePlan()"
      :curePlanData="curePlanData"
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import CurePlanForm from "@/components/historicalPlans/curePlans/CurePlanForm.vue";
import CurePlan from "@/models/historicalPlans/curePlans/CurePlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "CurePlanEdit",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken", "curePlanToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    CurePlanForm,
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
      curePlanData: new CurePlan(),
    };
  },
  methods: {
    async getCurePlanDetails() {
      this.isLoading = true;
      try {
        let response = await this.curePlanData.getCurePlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.curePlanData.fillData(response.data.curePlanData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.curePlanData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.curePlanData = null;
      }
      this.isLoading = false;
    },
    async updateCurePlan() {
      this.isLoading = true;
      try {
        let response = await this.curePlanData.addOrUpdateCurePlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.curePlanData.setInitialValue();
          this.setFilter();
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
    setFilter() {
      this.curePlanData.clientToken = this.clientToken ? this.clientToken : "";
      this.curePlanData.reservationToken = this.reservationToken
        ? this.reservationToken
        : "";
      this.curePlanData.curePlanToken = this.curePlanToken
        ? this.curePlanToken
        : "";
    },
  },
  async created() {
    this.setFilter();
    this.getCurePlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
