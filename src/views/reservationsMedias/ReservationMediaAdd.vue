<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ReservationMediaForm
      v-if="!isLoading"
      :reservationMediaData="reservationMediaData"
      :mediaSrc="mediaSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateReservationMedia="addReservationMedia"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ReservationMediaForm from "@/components/reservationsMedias/ReservationMediaForm.vue";
import ReservationMedia from "@/models/reservationsMedias/ReservationMedia";
import DEFAULT_IMG from "@/assets/images/media.svg";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ReservationMediaAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ReservationMediaForm,
  },
  props: ["clientToken", "reservationToken"],
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      reservationMediaData: new ReservationMedia(),
      mediaSrc: DEFAULT_IMG,
    };
  },
  methods: {
    async addReservationMedia() {
      this.isLoading = true;
      try {
        let response =
          await this.reservationMediaData.addOrUpdateReservationMedia(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.reservationMediaData.setInitialValue();
          this.reservationMediaData.reservationToken =
            this.$route.params.reservationToken;
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
  },
  async created() {
    this.reservationMediaData.clientToken = this.clientToken
      ? this.clientToken
      : "";
    this.reservationMediaData.reservationToken = this.reservationToken
      ? this.reservationToken
      : "";
  },
};
</script>

<style scoped lang="scss"></style>
