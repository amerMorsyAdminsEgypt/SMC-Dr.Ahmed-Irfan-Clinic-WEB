<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicalAlertForm
      v-if="!isLoading"
      v-on:addOrUpdateMedicalAlert="updateMedicalAlert()"
      :medicalAlertData="medicalAlertData"
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicalAlertForm from "@/components/historicalPlans/medicalAlerts/MedicalAlertForm.vue";
import MedicalAlert from "@/models/historicalPlans/medicalAlerts/MedicalAlert";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicalAlertEdit",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken", "medicalAlertToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicalAlertForm,
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
      medicalAlertData: new MedicalAlert(),
    };
  },
  methods: {
    async getMedicalAlertDetails() {
      this.isLoading = true;
      try {
        let response = await this.medicalAlertData.getMedicalAlertDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.medicalAlertData.fillData(response.data.medicalAlertData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.$router
            .push({
              name: "MedicalAlerts",
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
            name: "MedicalAlerts",
            params: {
              clientToken: this.clientToken,
              reservationToken: this.reservationToken,
            },
          })
          .catch(() => {});
      }
      this.isLoading = false;
    },
    async updateMedicalAlert() {
      this.isLoading = true;
      try {
        let response = await this.medicalAlertData.addOrUpdateMedicalAlert(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.medicalAlertData.setInitialValue();
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
      this.medicalAlertData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.medicalAlertData.reservationToken = this.reservationToken
        ? this.reservationToken
        : "";
      this.medicalAlertData.medicalAlertToken = this.medicalAlertToken
        ? this.medicalAlertToken
        : "";
    },
  },
  async created() {
    this.setFilter();
    this.getMedicalAlertDetails();
  },
};
</script>

<style scoped lang="scss"></style>
