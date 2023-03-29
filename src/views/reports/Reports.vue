<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div class="reports-cards">
      <ReportTreasuriesTransactions />
      <ReportReservations />
      <ReportPayments />
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import ReportTreasuriesTransactions from "@/components/reports/ReportTreasuriesTransactions.vue";
import ReportReservations from "@/components/reports/ReportReservations.vue";
import ReportPayments from "@/components/reports/ReportPayments.vue";

export default {
  name: "Reports",
  components: {
    PreLoader,
    ExceptionWithImg,
    ReportTreasuriesTransactions,
    ReportReservations,
    ReportPayments,
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
      textSearch: "",
      employeeToken: "",
      employeeTokenOptions: [],
      dateSearchFrom: "",
      dateSearchTo: "",
      settlementYear: "",
      settlementMonth: "",
      sendTo: "",
    };
  },
  methods: {},
  async created() {},
};
</script>

<style scoped lang="scss"></style>
