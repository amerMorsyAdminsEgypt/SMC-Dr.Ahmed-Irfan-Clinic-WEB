<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MeasurementRoomForm
      v-if="!isLoading"
      v-on:addOrUpdateMeasurementRoom="addOrUpdateMeasurementRoom()"
      :measurementRoomData="measurementRoomData"
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MeasurementRoomForm from "@/components/historicalPlans/measurementRooms/MeasurementRoomForm.vue";
import MeasurementRoom from "@/models/historicalPlans/measurementRooms/MeasurementRoom";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationTreatmentPlanAdd",
  mixins: [createToastMixin],
  props: ["clientToken", "reservationToken", "measurementRoomToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    MeasurementRoomForm,
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
      measurementRoomData: new MeasurementRoom(),
    };
  },
  methods: {
    async getMeasurementRoomDetails() {
      this.isLoading = true;
      try {
        let response = await this.measurementRoomData.getMeasurementRoomDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.measurementRoomData.fillData(
            response.data.servicesReservationMeasurementRoomData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.measurementRoomData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.measurementRoomData = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateMeasurementRoom() {
      this.isLoading = true;
      try {
        let response =
          await this.measurementRoomData.addOrUpdateMeasurementRoom(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.measurementRoomData.setInitialValue();
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
    this.measurementRoomData.clientToken = this.clientToken
      ? this.clientToken
      : "";
    this.measurementRoomData.reservationToken = this.reservationToken
      ? this.reservationToken
      : "";
    this.measurementRoomData.measurementRoomToken = this.measurementRoomToken
      ? this.measurementRoomToken
      : "";
    this.getMeasurementRoomDetails();
  },
};
</script>

<style scoped lang="scss"></style>
