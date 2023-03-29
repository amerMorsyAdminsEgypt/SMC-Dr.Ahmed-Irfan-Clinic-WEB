<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="measurementRoomsData">
      <MeasurementRoomsTable
        :measurementRoomsData="measurementRoomsData"
        :measurementRoomData="measurementRoomData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterMeasurementRoomtData.paginationData"
        v-on:changePage="changePage"
      />
    </div>

    <!-- v-if="isMeasurmentNotExist" -->
    <MeasurementRoomFloatBtns
      :filterMeasurementRoomtData="filterMeasurementRoomtData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MeasurementRoomsTable from "@/components/historicalPlans/measurementRooms/MeasurementRoomsTable.vue";
import MeasurementRoomFloatBtns from "@/components/historicalPlans/measurementRooms/MeasurementRoomFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MeasurementRoom from "@/models/historicalPlans/measurementRooms/MeasurementRoom";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MeasurementRooms",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MeasurementRoomsTable,
    MeasurementRoomFloatBtns,
    Pagination,
  },
  data() {
    return {
      // isMeasurmentNotExist: false,
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
      measurementRoomsData: null,
      measurementRoomData: new MeasurementRoom(),
      filterMeasurementRoomtData: new MeasurementRoom(),
    };
  },
  methods: {
    changePage(page) {
      this.filterMeasurementRoomtData.paginationData.selfPage = page;
      this.getAllMeasurementRooms();
    },
    search(data) {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        data.clientToken
      );
      this.$store.dispatch(
        "updateHistoricalPlansReservationToken",
        data.reservationToken
      );
      this.filterMeasurementRoomtData.fillData(data);
      this.measurementRoomsData = null;
      this.getAllMeasurementRooms();
    },
    async getAllMeasurementRooms() {
      this.isLoading = true;
      try {
        let response =
          await this.filterMeasurementRoomtData.getAllMeasurementRooms(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.measurementRoomsData =
            response.data.servicesReservationMeasurementRoomPagination.servicesReservationMeasurementRoomData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.measurementRoomsData = null;
          // this.isMeasurmentNotExist = true;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.measurementRoomsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.measurementRoomsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.measurementRoomsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.filterMeasurementRoomtData.clientToken = this.$store.getters
      .historicalPlans.clientToken
      ? this.$store.getters.historicalPlans.clientToken
      : "";
    this.filterMeasurementRoomtData.reservationToken = this.$store.getters
      .historicalPlans.reservationToken
      ? this.$store.getters.historicalPlans.reservationToken
      : "";
    this.getAllMeasurementRooms();
  },
};
</script>
