<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <b-tabs v-if="reservationStatusOptions" content-class="mt-4">
      <b-tab
        v-for="(option, index) in reservationStatusOptions"
        :key="index"
        @click="filterBy(option.itemToken)"
        title-item-class="tab-container-media"
      >
        <template #title>
          <span v-b-popover.hover.bottomright="`${option.itemName}`">
            <b-badge variant="danger" class="count-notifications">{{
              option.itemTotalInnerCount
            }}</b-badge>
            <img
              :src="baseUrl + option.itemImagePath"
              :onerror="`this.src='${defaultIcon}'`"
              class="icon-tab"
            />
            <span>{{ option.itemName }}</span></span
          >
        </template>
      </b-tab>
    </b-tabs>
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="servicesReservationsData" class="">
      <ServicesReservationsCards
        v-on:setServicesReservationData="setServicesReservationData($event)"
        v-on:goToReservationsFollowed="goToReservationsFollowed($event)"
        :servicesReservationsData="servicesReservationsData"
        v-on:setClientData="clientData.fillData($event)"
        v-on:newPayment="newPayment($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterServicesReservationData.paginationData"
        v-on:changePage="changePage"
      />
    </div>

    <ClientReservationInfo :servicesReservationData="servicesReservationData" />
    <ClientInfo :clientData="clientData" />
    <ClientQRCode :clientData="servicesReservationData" />
    <ServicesReservationsNewPayment
      :servicesReservationPayData="servicesReservationPayData"
      :clientData="clientData"
      v-on:refresh="refresh"
    />
    <CancelServicesReservation
      :servicesReservationCancelData="servicesReservationCancelData"
      v-on:refresh="refresh"
    />
    <ApproveCancelServicesReservation
      :servicesReservationCancelData="servicesReservationCancelData"
      v-on:refresh="refresh"
    />
    <ApproveOnServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <AttendServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <EnterServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <WaitForComeBackServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <FinishServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <ServicesReservationReceipt
      :servicesReservationData="servicesReservationData"
    />
    <ServicesReservationReceipt
      :servicesReservationData="servicesReservationData"
      :withTaxStatus="true"
    />

    <ServicesReservationFloatBtns
      v-if="!isLoading"
      :filterServicesReservationData="filterServicesReservationData"
      v-on:search="refresh"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import { EMPLOYEE_TYPE } from "@/utils/constantLists";
// import ServicesReservationsTable from "@/components/servicesReservations/ServicesReservationsTable.vue";
import ServicesReservationsCards from "@/components/servicesReservations/ServicesReservationsCards.vue";
import ServicesReservationsNewPayment from "@/components/servicesReservations/ServicesReservationsNewPayment.vue";
import CancelServicesReservation from "@/components/servicesReservations/CancelServicesReservation.vue";
import ApproveCancelServicesReservation from "@/components/servicesReservations/ApproveCancelServicesReservation.vue";
import ApproveOnServicesReservation from "@/components/servicesReservations/ApproveOnServicesReservation.vue";
import AttendServicesReservation from "@/components/servicesReservations/AttendServicesReservation.vue";
import EnterServicesReservation from "@/components/servicesReservations/EnterServicesReservation.vue";
import WaitForComeBackServicesReservation from "@/components/servicesReservations/WaitForComeBackServicesReservation.vue";
import FinishServicesReservation from "@/components/servicesReservations/FinishServicesReservation.vue";
import ServicesReservationReceipt from "@/components/servicesReservations/ServicesReservationReceipt.vue";
import ServicesReservationFloatBtns from "@/components/servicesReservations/ServicesReservationFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import ClientReservationInfo from "@/components/servicesReservations/ClientReservationInfo.vue";
import ClientInfo from "@/components/clients/ClientInfo.vue";
import ClientQRCode from "@/components/clients/ClientQRCode.vue";
import DEFAULT_ICON from "@/assets/images/services-reservations.svg";
import ServicesReservationsGeneralMixin from "./ServicesReservationsGeneralMixin";

export default {
  name: "ServicesReservations",
  mixins: [ServicesReservationsGeneralMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    // ServicesReservationsTable,
    ServicesReservationsCards,
    ServicesReservationsNewPayment,
    CancelServicesReservation,
    ApproveCancelServicesReservation,
    ApproveOnServicesReservation,
    AttendServicesReservation,
    EnterServicesReservation,
    WaitForComeBackServicesReservation,
    FinishServicesReservation,
    ServicesReservationReceipt,
    ServicesReservationFloatBtns,
    Pagination,
    ClientReservationInfo,
    ClientInfo,
    ClientQRCode,
  },
  data() {
    return {
      baseUrl: BASE_URL,
      defaultIcon: DEFAULT_ICON,
      reservationStatusOptions: null,
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      servicesReservationsData: null,
      clientServicesReservationData: null,
      filterServicesReservationData: new ServicesReservation(),
      // currentReservationStatusToken: "",
    };
  },
  methods: {
    filterBy(reservationStatusToken) {
      this.filterServicesReservationData.reservationStatusToken =
        reservationStatusToken;
      this.getAllServicesReservations();
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
    async getDialogOfReservationStatus() {
      this.isLoading = true;
      try {
        const response =
          await this.filterServicesReservationData.getDialogOfReservationStatus(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.reservationStatusOptions = response.data.generalStaticList;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.reservationStatusOptions = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.reservationStatusOptions = null;
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.reservationStatusOptions = null;
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
    changePage(page) {
      this.filterServicesReservationData.paginationData.selfPage = page;
      this.getAllServicesReservations();
    },
    async getAllServicesReservations() {
      this.isLoading = true;
      try {
        let response =
          await this.filterServicesReservationData.getAllServicesReservations(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.servicesReservationsData =
            response.data.servicesReservationPagination.servicesReservationData;
          if (response.data.generalStaticList)
            this.reservationStatusOptions = response.data.generalStaticList;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.servicesReservationsData = null;
          this.exceptionMsg = response.data.msg;
          if (response.data.generalStaticList)
            this.reservationStatusOptions = response.data.generalStaticList;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.servicesReservationsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.servicesReservationsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
          if (response.data.generalStaticList)
            this.reservationStatusOptions = response.data.generalStaticList;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesReservationsData = null;
      }
      this.isLoading = false;
    },
    setFilter() {
      this.filterServicesReservationData.clientToken = this.$store.getters
        .reservations.clientToken
        ? this.$store.getters.reservations.clientToken
        : "";
      this.filterServicesReservationData.followToreseRvationToken = this.$store
        .getters.reservations.followToreseRvationToken
        ? this.$store.getters.reservations.followToreseRvationToken
        : "";
      this.filterServicesReservationData.reservationTypeToken = this.$store
        .getters.reservations.reservationTypeToken
        ? this.$store.getters.reservations.reservationTypeToken
        : "";
      // this.filterServicesReservationData.reservationStatusToken =
      //   this.currentReservationStatusToken;
    },
  },
  computed: {},
  async created() {
    this.setFilter();
    await this.getDialogOfReservationStatus();
    this.filterServicesReservationData.reservationStatusToken =
      this.reservationStatusOptions[0].itemToken;

    if (this.employeeTypeToken == EMPLOYEE_TYPE.Doctor)
      this.filterServicesReservationData.employeeToken =
        this.$store.getters.userData.employeePersonalData.employeeToken;

    this.getAllServicesReservations();
  },
};
</script>
