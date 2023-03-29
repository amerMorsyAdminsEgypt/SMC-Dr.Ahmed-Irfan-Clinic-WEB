<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="clientData.clientNameCurrent">
            {{ clientData.clientNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-back-icons">
          <button
            v-b-modal.ClientInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setClientData"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="'/edit-client/' + clientData.clientToken"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>

          <button
            class="btn p-0"
            :title="$t('servicesReservations')"
            @click="goToServicesReservations()"
          >
            <img
              src="@/assets/images/services-reservations.svg"
              class="icon-lg"
            />
          </button>
          <button
            class="btn p-0"
            :title="$t('historicalPlans.modelName')"
            @click="goToHistoricalPlan()"
          >
            <img src="@/assets/images/historicalPlans.svg" class="icon-lg" />
          </button>

          <button
            class="btn p-0"
            :title="$t('servicesPayments')"
            @click="goToPayments()"
          >
            <img src="@/assets/images/services-payments.svg" class="icon-lg" />
          </button>

          <router-link
            :to="{
              name: 'ReservationsMedias',
              params: {
                clientToken: clientData.clientToken,
              },
            }"
            :title="$t('reservationsMedias.modelName')"
          >
            <img src="@/assets/images/media.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.ClientQRCode
            class="btn p-0"
            :title="$t('QRcode')"
            @click="setClientData"
          >
            <!-- <img src="@/assets/images/cancel.svg" class="icon-lg" /> -->
            <qrcode-vue
              class="icon-lg"
              :value="clientData.clientCode"
              :size="40"
              level="H"
            />
          </button>
          <!-- <br /> -->
          <button
            v-b-modal.ClientDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setClientData"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <!-- <button @click="goToFamily()" :title="$t('family')">
            <img src="@/assets/images/family.svg" class="icon-lg" />
          </button> -->
        </div>
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="clientData.clientNameCurrent">
            {{ clientData.clientNameCurrent }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG_CLIENT from "@/assets/images/clients.svg";
import QrcodeVue from "qrcode.vue";
import { REQUIREMENTS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "ClientCard",
  components: {
    QrcodeVue,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG_CLIENT,
      requirementsTypeTokens: REQUIREMENTS_TYPE_TOKENS,
    };
  },
  props: ["clientData"],
  methods: {
    setClientData() {
      this.$emit("setClientData", this.clientData);
    },
    goToFamily() {
      this.$store.dispatch("updateClientToken", this.clientData.clientToken);
      this.$router.push("/client-family").catch(() => {});
    },
    goToServicesReservations() {
      this.$store.dispatch(
        "updateReservationsClientToken",
        this.clientData.clientToken
      );
      this.$router.push({ name: "ServicesReservations" }).catch(() => {});
    },
    goToPayments() {
      this.$store.dispatch(
        "updatePaymentsClientToken",
        this.clientData.clientToken
      );
      this.$store.dispatch("updatePaymentsReservationToken", "");
      this.$router.push({ name: "ServicesPayments" }).catch(() => {});
    },
    goToHistoricalPlan() {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        this.clientData.clientToken
      );
      this.$store.dispatch("updateHistoricalPlansReservationToken", "");
      this.$router.push({ name: "DiagnosisPlans" }).catch(() => {});
    },
  },
  computed: {
    imgSrc: function () {
      return BASE_URL + this.clientData.clientImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
