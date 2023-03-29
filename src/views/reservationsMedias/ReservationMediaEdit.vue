<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ReservationMediaForm
      v-if="!isLoading"
      :reservationMediaData="reservationMediaData"
      :mediaSrc="mediaSrc"
      :submitName="$t('edit')"
      v-on:addOrUpdateReservationMedia="updateReservationMedia"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import ReservationMediaForm from "@/components/reservationsMedias/ReservationMediaForm.vue";
import ReservationsMedias from "@/models/reservationsMedias/ReservationsMedias";
import ReservationMedia from "@/models/reservationsMedias/ReservationMedia";
import DEFAULT_IMG from "@/assets/images/media.svg";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ReservationMediaEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ReservationMediaForm,
  },
  props: ["clientToken", "reservationMediaToken"],
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      reservationsMedias: new ReservationsMedias(),
      reservationMediaData: new ReservationMedia(),
    };
  },
  methods: {
    async getReservationMediaDetails() {
      this.isLoading = true;
      try {
        let response =
          await this.reservationMediaData.getReservationMediaDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.reservationMediaData.fillData(
            response.data.servicesReservationsMediaData
          );
          this.reservationMediaData.media = "";
          if (this.reservationMediaData.reservationMediaPath) {
            this.mediaSrc =
              BASE_URL + this.reservationMediaData.reservationMediaPath;
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.reservationMediaData.fillData(null);
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.reservationMediaData.fillData(null);
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
    async updateReservationMedia() {
      this.isLoading = true;
      try {
        let response =
          await this.reservationMediaData.addOrUpdateReservationMedia(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push({
            name: "ReservationsMedias",
            params: {
              clientToken: this.reservationMediaData.clientToken,
              reservationMediaToken: this.reservationMediaData.reservationToken,
            },
          });
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser");
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
      this.reservationsMedias.filterData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.reservationMediaData.reservationMediaToken = this
        .reservationMediaToken
        ? this.reservationMediaToken
        : "";
      this.reservationMediaData.clientToken = this.clientToken
        ? this.clientToken
        : "";
    },
  },
  computed: {
    mediaSrc: function () {
      if (this.reservationMediaData.reservationMediaPath) {
        return BASE_URL + this.reservationMediaData.reservationMediaPath;
      }
      return DEFAULT_IMG;
    },
  },
  async created() {
    this.setFilter();
    this.getReservationMediaDetails();
  },
};
</script>

<style scoped lang="scss"></style>
