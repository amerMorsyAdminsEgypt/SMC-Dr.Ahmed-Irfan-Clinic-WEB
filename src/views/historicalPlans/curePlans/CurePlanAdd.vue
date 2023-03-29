<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <CurePlanForm
      v-if="!isLoading"
      v-on:addOrUpdateCurePlan="addCurePlan()"
      :curePlanData="curePlanData"
      :submitName="$t('add')"
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
  name: "CurePlanAdd",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken"],
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
    async addCurePlan() {
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
    },
  },
  async created() {
    this.setFilter();
  },
};
</script>

<style scoped lang="scss"></style>
