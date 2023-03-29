<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <DiagnosisPlanForm
      v-if="!isLoading"
      v-on:addOrUpdateDiagnosisPlan="addDiagnosisPlan()"
      :diagnosisPlanData="diagnosisPlanData"
      :clientToken="clientToken"
      :reservationToken="reservationToken"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DiagnosisPlanForm from "@/components/historicalPlans/diagnosisPlans/DiagnosisPlanForm";
import DiagnosisPlan from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "DiagnosisPlanAdd",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    DiagnosisPlanForm,
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
      diagnosisPlanData: new DiagnosisPlan(),
    };
  },
  methods: {
    async addDiagnosisPlan() {
      this.isLoading = true;
      try {
        let response = await this.diagnosisPlanData.addOrUpdateDiagnosisPlan(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router
            .push({
              name: "DiagnosisPlans",
              params: {
                clientToken: this.diagnosisPlanData.clientToken,
                reservationToken: this.diagnosisPlanData.reservationToken,
              },
            })
            .catch(() => {});
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
      this.diagnosisPlanData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.diagnosisPlanData.reservationToken = this.reservationToken
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
