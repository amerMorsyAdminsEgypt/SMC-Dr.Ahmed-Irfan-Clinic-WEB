<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <OperationForm
      v-if="!isLoading"
      v-on:addOrUpdateMedicalOperation="updateOperation()"
      :operationData="operationData"
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import OperationForm from "@/components/historicalPlans/operations/OperationForm.vue";
import Operation from "@/models/historicalPlans/operations/Operation";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OperationEdit",
  mixins: [createToastMixin],
  props: [
    "surgeryHistoryClientToken",
    "reservationToken",
    "surgeryHistoryToken",
  ],
  components: {
    PreLoader,
    ExceptionWithImg,
    OperationForm,
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
      operationData: new Operation(),
    };
  },
  methods: {
    async getMedicalOperationDetalis() {
      this.isLoading = true;
      try {
        let response = await this.operationData.getMedicalOperationDetalis(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.operationData.fillData(response.data.SurgriesHistoryData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.$router
            .push({
              name: "Operations",
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
            name: "Operations",
            params: {
              clientToken: this.clientToken,
              reservationToken: this.reservationToken,
            },
          })
          .catch(() => {});
      }
      this.isLoading = false;
    },
    async updateOperation() {
      this.isLoading = true;
      try {
        let response = await this.operationData.addOrUpdateMedicalOperation(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.operationData.setInitialValue();
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
      this.operationData.surgeryHistoryClientToken = this
        .surgeryHistoryClientToken
        ? this.surgeryHistoryClientToken
        : "";
      this.operationData.reservationToken = this.reservationToken
        ? this.reservationToken
        : "";
      this.operationData.surgeryHistoryToken = this.surgeryHistoryToken
        ? this.surgeryHistoryToken
        : "";
    },
  },
  async created() {
    this.setFilter();
    this.getMedicalOperationDetalis();
  },
};
</script>

<style scoped lang="scss"></style>
