<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="paymentsData">
      <ServicesPaymentsTable
        :paymentsData="paymentsData"
        :paymentData="paymentData"
        v-on:setPaymentData="paymentData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterPaymentData.paginationData"
        v-on:changePage="changePage"
      />
      <ServicesPaymentInfo :paymentData="paymentData" />
      <ServicesPaymentRefund
        :paymentData="paymentData"
        v-on:refresh="getAllPayments()"
      />
      <ServicesPaymentReceipt :paymentData="paymentData" />
    </div>

    <ServicesPaymentFloatBtns
      :filterPaymentData="filterPaymentData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServicesPaymentsTable from "@/components/servicesPayments/ServicesPaymentsTable.vue";
import ServicesPaymentInfo from "@/components/servicesPayments/ServicesPaymentInfo.vue";
import ServicesPaymentRefund from "@/components/servicesPayments/ServicesPaymentRefund.vue";
import ServicesPaymentReceipt from "@/components/servicesPayments/ServicesPaymentReceipt.vue";
import ServicesPaymentFloatBtns from "@/components/servicesPayments/ServicesPaymentFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ServicesReservationPay from "@/models/servicesPayments/ServicesReservationPay";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesPayments",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServicesPaymentsTable,
    ServicesPaymentInfo,
    ServicesPaymentRefund,
    ServicesPaymentReceipt,
    ServicesPaymentFloatBtns,
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
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      paymentsData: null,
      paymentData: new ServicesReservationPay(),
      filterPaymentData: new ServicesReservationPay(),
    };
  },
  methods: {
    changePage(page) {
      this.filterPaymentData.paginationData.selfPage = page;
      this.getAllPayments();
    },
    search(data) {
      this.$store.dispatch("updatePaymentsClientToken", data.clientToken);
      this.$store.dispatch(
        "updatePaymentsReservationToken",
        data.reservationToken
      );
      this.filterPaymentData.fillData(data);
      this.paymentsData = null;
      this.getAllPayments();
    },
    async getAllPayments() {
      this.isLoading = true;
      this.paymentsData = null;
      try {
        let response = await this.filterPaymentData.getAllPayments(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paymentsData =
            response.data.servicesReservationPayPagination.servicesReservationPayDatas;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.filterPaymentData.clientToken = this.$store.getters.payments
      .clientToken
      ? this.$store.getters.payments.clientToken
      : "";
    this.filterPaymentData.reservationToken = this.$store.getters.payments
      .reservationToken
      ? this.$store.getters.payments.reservationToken
      : "";
    this.getAllPayments();
  },
};
</script>
