<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ServicesReservationForm
      :servicesReservationData="servicesReservationData"
      :submitName="$t('reserve')"
      v-on:addRequestServicesReservation="addRequestServicesReservation"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServicesReservationForm from "@/components/servicesReservations/ServicesReservationForm.vue";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import createToastMixin from "@/utils/create-toast-mixin";
import { RESERVATION_TYPES } from "@/utils/constantLists";

export default {
  name: "ServicesReservationAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesReservationForm,
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
      servicesReservationData: new ServicesReservation(),
    };
  },
  methods: {
    async addRequestServicesReservation() {
      this.isLoading = true;
      try {
        let response =
          await this.servicesReservationData.addRequestServicesReservation(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.servicesReservationData.setInitialValue();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        console.log(e);
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.servicesReservationData.clientToken = this.$store.getters.reservations
      .clientToken
      ? this.$store.getters.reservations.clientToken
      : "";
    this.servicesReservationData.followToreseRvationToken = this.$store.getters
      .reservations.followToreseRvationToken
      ? this.$store.getters.reservations.followToreseRvationToken
      : "";
    this.servicesReservationData.reservationTypeToken = this.$store.getters
      .reservations.reservationTypeToken
      ? this.$store.getters.reservations.reservationTypeToken
      : RESERVATION_TYPES.mainReservation;
    this.servicesReservationData.addInsuranceCompanyDiscountPercentageStatus = true;
    // this.servicesReservationData.calculateTaxesStatus = true;
  },
};
</script>

<style scoped lang="scss"></style>
