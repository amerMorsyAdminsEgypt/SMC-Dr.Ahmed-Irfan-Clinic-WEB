<template>
  <div>
    <PreLoader v-if="isLoading" />

    <div class="image-container">
      <img
        :src="`${baseUrl}${servicesReservationData.clientImagePath}`"
        :onerror="`this.src='${defaultImg}'`"
        alt="Image"
        class="client-img"
      />
      <div class="actions">
        <ul>
          <li>
            <button
              class="btn p-0"
              :title="$t('infoClient')"
              @click="setClientData(servicesReservationData.clientToken)"
            >
              <img src="@/assets/images/info.svg" class="icon-lg" />
            </button>
          </li>

          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                  reservationStatus.pending &&
                servicesReservationData.reservationStatusToken !=
                  reservationStatus.current &&
                servicesReservationData.reservationStatusToken !=
                  reservationStatus.attended &&
                servicesReservationData.reservationStatusToken !=
                  reservationStatus.entered &&
                servicesReservationData.reservationStatusToken !=
                  reservationStatus.waitingReEntry
              "
              v-b-modal.CancelServicesReservation
              class="btn p-0"
              :title="$t('cancelServicesReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img
                src="@/assets/images/cancel-reservation.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                reservationStatus.waitingApprovalCancel
              "
              v-b-modal.ApproveCancelServicesReservation
              class="btn p-0"
              :title="$t('approveCancelServicesReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img
                src="@/assets/images/approve-cancel-reservation.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                reservationStatus.pending
              "
              v-b-modal.ApproveOnServicesReservation
              class="btn p-0"
              :title="$t('approveOnServicesReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img
                src="@/assets/images/approve-reservation.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                reservationStatus.current
              "
              v-b-modal.AttendServicesReservation
              class="btn p-0"
              :title="$t('attendServicesReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img
                src="@/assets/images/attend-reservation.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                  reservationStatus.attended &&
                servicesReservationData.reservationStatusToken !=
                  reservationStatus.waitingReEntry
              "
              v-b-modal.EnterServicesReservation
              class="btn p-0"
              :title="$t('enterServicesReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img
                src="@/assets/images/enter-reservation.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                reservationStatus.entered
              "
              v-b-modal.WaitForComeBackServicesReservation
              class="btn p-0"
              :title="$t('waitForComeBackServicesReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img src="@/assets/images/waiting-back.svg" class="icon-lg" />
            </button>
          </li>
          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                reservationStatus.entered
              "
              v-b-modal.FinishServicesReservation
              class="btn p-0"
              :title="$t('finishServicesReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img
                src="@/assets/images/finish-reservation.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <router-link
              :to="{
                name: 'ReservationsMedias',
                params: {
                  clientToken: servicesReservationData.clientToken,
                  reservationToken: servicesReservationData.reservationToken,
                },
              }"
              :title="$t('reservationsMedias.modelName')"
            >
              <img src="@/assets/images/media.svg" class="icon-lg" />
            </router-link>
          </li>
          <li>
            <button
              class="btn p-0"
              :title="$t('historicalPlans.modelName')"
              @click="goToHistoricalPlan(servicesReservationData)"
            >
              <img src="@/assets/images/historicalPlans.svg" class="icon-lg" />
            </button>
          </li>

          <li>
            <button
              class="btn p-0"
              :title="$t('ServicesReservationAddedServices.modelName')"
              @click="
                goToServicesReservationAddedServices(servicesReservationData)
              "
            >
              <img
                src="@/assets/images/added-services-add.svg"
                class="icon-lg"
              />
            </button>
          </li>
          <li>
            <button
              :disabled="servicesReservationData.reservationCountFollowing <= 0"
              class="btn p-0"
              :title="$t('reservationsFollowed.modelName')"
              @click="goToReservationsFollowed(servicesReservationData)"
            >
              <img
                src="@/assets/images/reservations-followed.svg"
                class="icon-lg"
              />
            </button>
          </li>
          <li>
            <button
              :disabled="
                servicesReservationData.reservationStatusToken !=
                reservationStatus.finished
              "
              class="btn p-0"
              :title="$t('reservationsFollowed.add')"
              @click="goToAddReservationsFollowed(servicesReservationData)"
            >
              <img
                src="@/assets/images/reservations-followed-add.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <button
              v-b-modal.ClientInfo
              class="btn p-0"
              :title="$t('servicesPayments')"
              @click="goToPayments(servicesReservationData)"
            >
              <img
                src="@/assets/images/services-payments.svg"
                class="icon-lg"
              />
            </button>
          </li>

          <li>
            <button
              :disabled="servicesReservationData.remainingAmount == 0"
              class="btn p-0"
              :title="$t('newPayment')"
              @click="newPayment(servicesReservationData)"
            >
              <img src="@/assets/images/pay.svg" class="icon-lg" />
            </button>
          </li>

          <li>
            <button
              v-b-modal.ServicesReservationReceipt
              class="btn p-0"
              :title="$t('receipt')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img src="@/assets/images/receipt.svg" class="icon-lg" />
            </button>
          </li>
          <li>
            <button
              v-b-modal.ServicesReservationReceiptWithTax
              class="btn p-0"
              :title="$t('receiptWithTax')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img src="@/assets/images/receiptWithTax.svg" class="icon-lg" />
            </button>
          </li>

          <li>
            <button
              v-b-modal.ClientReservationInfo
              class="btn p-0"
              :title="$t('infoReservation')"
              @click="setServicesReservationData(servicesReservationData)"
            >
              <img src="@/assets/images/info-dark.svg" class="icon-lg" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import {
  REQUIREMENTS_TYPE_TOKENS,
  RESERVATION_STATUS,
  RESERVATION_TYPES,
} from "@/utils/constantLists";
import {
  setDataMultiLang,
  timeToLang,
  isDataExist,
  formateDateTimeLang,
} from "@/utils/functions";
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/clients.svg";
import Client from "@/models/clients/Client";
import createToastMixin from "@/utils/create-toast-mixin";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";

export default {
  name: "ServicesReservationsCards",
  mixins: [createToastMixin],
  components: {
    PreLoader,
  },
  data() {
    return {
      requirementsTypeTokens: REQUIREMENTS_TYPE_TOKENS,
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      reservationStatus: RESERVATION_STATUS,
      defaultImg: DEFAULT_IMG,
      baseUrl: BASE_URL,
      clientData: new Client(),
      clientToken: "",
      theClientData: "",
      serviceReservation: new ServicesReservation(),
      cancelServicesReservationsData: null,
    };
  },
  props: ["servicesReservationData"],
  methods: {
    async setClientData(clientToken) {
      this.clientToken = clientToken;
      await this.getClientDetails();
      this.$emit("setClientData", this.theClientData);
      this.$bvModal.show("ClientInfo");
    },
    setClientServicesReservationData(servicesReservationData) {
      this.$emit("setClientServicesReservationData", servicesReservationData);
    },
    async newPayment(servicesReservationData) {
      this.clientToken = servicesReservationData.clientToken;
      await this.getClientDetails();
      this.$emit("newPayment", {
        servicesReservationData: servicesReservationData,
        clientData: this.theClientData,
      });
      this.$bvModal.show("ServicesReservationsNewPayment");
    },
    async getClientDetails() {
      this.isLoading = true;
      this.clientData.clientToken = this.clientToken;
      try {
        let response = await this.clientData.getClientDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.theClientData = response.data.clientData;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.clientData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.clientData = null;
      }
      this.isLoading = false;
    },
    async getAllReservationCancel(servicesReservationData) {
      this.isLoading = true;
      this.serviceReservation.reservationToken =
        servicesReservationData.reservationToken;
      try {
        let response = await this.serviceReservation.getAllReservationCancel(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.cancelServicesReservationsData =
            response.data.servicesReservationCancelPagination.servicesReservationCancelData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.cancelServicesReservationsData = null;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.cancelServicesReservationsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.cancelServicesReservationsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.cancelServicesReservationsData = null;
      }

      this.isLoading = false;
    },
    async setServicesReservationData(servicesReservationData) {
      if (servicesReservationData.cancelStatus) {
        await this.getAllReservationCancel(servicesReservationData);
      }
      servicesReservationData.cancelServicesReservationsData =
        this.cancelServicesReservationsData;

      this.$emit("setServicesReservationData", servicesReservationData);
    },
    goToReservationsFollowed(servicesReservationData) {
      this.$emit("goToReservationsFollowed", servicesReservationData);
    },
    goToHistoricalPlan(data) {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        data.clientToken
      );
      this.$store.dispatch(
        "updateHistoricalPlansReservationToken",
        data.reservationToken
      );
      this.$router.push({ name: "DiagnosisPlans" }).catch(() => {});
    },
    goToServicesReservationAddedServices(data) {
      this.$store.dispatch(
        "updateServicesReservationAddedServicesClientToken",
        data.clientToken
      );
      this.$store.dispatch(
        "updateServicesReservationAddedServicesReservationToken",
        data.reservationToken
      );
      this.$router
        .push({ name: "ServicesReservationAddedServices" })
        .catch(() => {});
    },
    goToAddReservationsFollowed(data) {
      this.$store.dispatch("updateReservationsClientToken", data.clientToken);
      this.$store.dispatch(
        "updateReservationsfollowToReservationToken",
        data.reservationToken
      );
      this.$store.dispatch(
        "updateReservationsTypeToken",
        RESERVATION_TYPES.followingReservation
      );
      this.$router.push({ name: "ServicesReservationAdd" }).catch(() => {});
    },
    goToPayments(data) {
      this.$store.dispatch("updatePaymentsClientToken", data.clientToken);
      this.$store.dispatch(
        "updatePaymentsReservationToken",
        data.reservationToken
      );
      this.$router.push({ name: "ServicesPayments" }).catch(() => {});
    },
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
};
</script>
