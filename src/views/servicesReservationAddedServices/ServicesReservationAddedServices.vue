<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div
      v-if="
        servicesReservationAddedServices.servicesReservationAddedServicesData
      "
    >
      <ServicesReservationAddedServicesTable
        v-on:setServicesReservationAddedServiceData="
          servicesReservationAddedServices.servicesReservationAddedService.fillData(
            $event
          )
        "
        :servicesReservationAddedServices="servicesReservationAddedServices"
        v-on:newPayment="newPayment($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="servicesReservationAddedServices.pagination"
        v-on:changePage="changePage"
      />

      <ServicesReservationAddedServiceInfo
        :servicesReservationAddedServiceData="
          servicesReservationAddedServices.servicesReservationAddedService
        "
      />
      <ServicesReservationAddedServiceCancel
        :servicesReservationAddedServiceData="
          servicesReservationAddedServices.servicesReservationAddedService
        "
        v-on:refresh="getAllServicesReservationAddedServices()"
      />
      <ServicesReservationsAddedNewPayment
        :servicesReservationPayData="servicesReservationPayData"
        v-on:refresh="getAllServicesReservationAddedServices()"
      />
      <ServicesReservationAddedServiceReceipt
        :servicesReservationAddedServiceData="
          servicesReservationAddedServices.servicesReservationAddedService
        "
        :theFilterData="servicesReservationAddedServices.filterData"
      />
      <ServicesReservationAddedServiceReceipt
        :servicesReservationAddedServiceData="
          servicesReservationAddedServices.servicesReservationAddedService
        "
        :theFilterData="servicesReservationAddedServices.filterData"
        :withTaxStatus="true"
      />
    </div>

    <ServicesReservationAddedServiceFloatBtns
      :theFilterData="servicesReservationAddedServices.filterData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServicesReservationAddedServicesTable from "@/components/servicesReservationAddedServices/ServicesReservationAddedServicesTable.vue";
import ServicesReservationsAddedNewPayment from "@/components/servicesReservationAddedServices/ServicesReservationsAddedNewPayment.vue";
import ServicesReservationAddedServiceInfo from "@/components/servicesReservationAddedServices/ServicesReservationAddedServiceInfo.vue";
import ServicesReservationAddedServiceCancel from "@/components/servicesReservationAddedServices/ServicesReservationAddedServiceCancel.vue";
import ServicesReservationAddedServiceReceipt from "@/components/servicesReservationAddedServices/ServicesReservationAddedServiceReceipt.vue";
import ServicesReservationAddedServiceFloatBtns from "@/components/servicesReservationAddedServices/ServicesReservationAddedServiceFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ServicesReservationAddedServices from "@/models/servicesReservationAddedServices/ServicesReservationAddedServices";
import { PAY_TYPE } from "@/utils/constantLists";
import ServicesReservationPay from "@/models/servicesPayments/ServicesReservationPay";

export default {
  name: "ServicesReservationAddedServices",
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesReservationAddedServicesTable,
    ServicesReservationsAddedNewPayment,
    ServicesReservationAddedServiceInfo,
    ServicesReservationAddedServiceCancel,
    ServicesReservationAddedServiceReceipt,
    ServicesReservationAddedServiceFloatBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      servicesReservationAddedServices: new ServicesReservationAddedServices(),
      servicesReservationPayData: new ServicesReservationPay(),
    };
  },
  methods: {
    newPayment(data) {
      // console.log(value);
      this.servicesReservationPayData.setInitialValue();
      this.servicesReservationPayData.reservationAddedServicesToken =
        data.reservationAddedServicesToken;
      this.servicesReservationPayData.methodPaidValue = data.remainingAmount;
      this.servicesReservationPayData.payTypeToken =
        PAY_TYPE.reservationAddedServices;
      this.$bvModal.show("ServicesReservationsAddedNewPayment");
    },
    changePage(page) {
      this.servicesReservationAddedServices.pagination.selfPage = page;
      this.getAllServicesReservationAddedServices();
    },
    search(data) {
      this.$store.dispatch(
        "updateServicesReservationAddedServicesClientToken",
        data.clientToken
      );
      this.$store.dispatch(
        "updateServicesReservationAddedServicesReservationToken",
        data.reservationToken
      );
      this.servicesReservationAddedServices.filterData.fillData(data);
      this.servicesReservationAddedServices.servicesReservationAddedServicesData =
        null;
      this.getAllServicesReservationAddedServices();
    },
    async getAllServicesReservationAddedServices() {
      this.isLoading = true;
      try {
        const response =
          await this.servicesReservationAddedServices.servicesReservationAddedService.getAllServicesReservationAddedServices(
            this.language,
            this.userAuthorizeToken,
            this.servicesReservationAddedServices.pagination,
            this.servicesReservationAddedServices.filterData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.servicesReservationAddedServices.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.servicesReservationAddedServices.servicesReservationAddedServicesData =
            null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.servicesReservationAddedServices.servicesReservationAddedServicesData =
            null;
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.servicesReservationAddedServices.servicesReservationAddedServicesData =
            null;
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.servicesReservationAddedServices.servicesReservationAddedServicesData =
          null;
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.servicesReservationAddedServices.filterData.clientToken = this.$store
      .getters.servicesReservationAddedServices.clientToken
      ? this.$store.getters.servicesReservationAddedServices.clientToken
      : "";
    this.servicesReservationAddedServices.filterData.reservationToken = this
      .$store.getters.servicesReservationAddedServices.reservationToken
      ? this.$store.getters.servicesReservationAddedServices.reservationToken
      : "";
    this.getAllServicesReservationAddedServices();
  },
};
</script>
