<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <DiagnosisPlanForm
      v-if="!isLoading"
      v-on:addOrUpdateDiagnosisPlan="updateDiagnosisPlan()"
      :diagnosisPlanData="diagnosisPlanData"
      :clientToken="clientToken"
      :reservationToken="reservationToken"
      :submitName="$t('edit')"
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
  name: "DiagnosisPlanEdit",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken", "diagnosisPlanToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    DiagnosisPlanForm,
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
      diagnosisPlanData: new DiagnosisPlan(),
    };
  },
  methods: {
    async getDiagnosisPlanDetails() {
      this.isLoading = true;
      this.diagnosisPlanData.diagnosisPlanToken = this.diagnosisPlanToken;
      try {
        let response = await this.diagnosisPlanData.getDiagnosisPlanDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.diagnosisPlanData.fillData(response.data.diagnosisPlansData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.$router
            .push({
              name: "DiagnosisPlans",
              params: {
                clientToken: this.clientToken,
                reservationToken: this.reservationToken,
              },
            })
            .catch(() => {});
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.$router
          .push({
            name: "DiagnosisPlans",
            params: {
              clientToken: this.clientToken,
              reservationToken: this.reservationToken,
            },
          })
          .catch(() => {});
      }
      this.isLoading = false;
    },
    async updateDiagnosisPlan() {
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
                clientToken: this.clientToken,
                reservationToken: this.reservationToken,
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
  },
  async created() {
    this.getDiagnosisPlanDetails();
  },
};
</script>

<style scoped lang="scss"></style>
