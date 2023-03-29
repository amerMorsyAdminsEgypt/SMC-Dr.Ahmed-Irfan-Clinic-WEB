<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ServicesReservationAddedServiceForm
      v-if="!isLoading"
      v-on:addServicesReservationAddedService="
        addServicesReservationAddedService()
      "
      :servicesReservationAddedServiceData="servicesReservationAddedServiceData"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServicesReservationAddedServiceForm from "@/components/servicesReservationAddedServices/ServicesReservationAddedServiceForm";
import ServicesReservationAddedService from "@/models/servicesReservationAddedServices/ServicesReservationAddedService";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationAddedServiceAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesReservationAddedServiceForm,
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
      servicesReservationAddedServiceData:
        new ServicesReservationAddedService(),
    };
  },
  methods: {
    async addServicesReservationAddedService() {
      this.isLoading = true;
      try {
        let response =
          await this.servicesReservationAddedServiceData.addServicesReservationAddedService(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router
            .push({
              name: "ServicesReservationAddedServices",
              params: {
                clientToken:
                  this.servicesReservationAddedServiceData.clientToken,
                reservationToken:
                  this.servicesReservationAddedServiceData.reservationToken,
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
      this.servicesReservationAddedServiceData.clientToken = this.$store.getters
        .servicesReservationAddedServices.clientToken
        ? this.$store.getters.servicesReservationAddedServices.clientToken
        : "";
      this.servicesReservationAddedServiceData.reservationToken = this.$store
        .getters.servicesReservationAddedServices.reservationToken
        ? this.$store.getters.servicesReservationAddedServices.reservationToken
        : "";
      this.servicesReservationAddedServiceData.addInsuranceCompanyDiscountPercentageStatus = true;
      // this.servicesReservationAddedServiceData.calculateTaxesStatus = true;
    },
  },
  async created() {
    this.setFilter();
  },
};
</script>

<style scoped lang="scss"></style>
