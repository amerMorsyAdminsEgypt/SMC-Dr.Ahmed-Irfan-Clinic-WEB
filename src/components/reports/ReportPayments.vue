<template>
  <div>
    <PreLoader v-if="isLoading" />
    <div class="reports-card">
      <a v-b-modal.ReportPayments @click="getAllDialogs()" class="">
        <img src="@/assets/images/services-payments.svg" />{{
          $t("servicesPayments")
        }}
      </a>
    </div>

    <b-modal id="ReportPayments" scrollable centered size="lg" hide-footer>
      <template #modal-title>
        <h3>
          <img src="@/assets/images/services-payments.svg" class="icon-lg" />
          {{ $t("servicesPayments") }}
        </h3>
      </template>

      <form autocomplete="off" method="post">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="paymentData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="changeReservations($event)"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="paymentData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="paymentData.reservationToken = $event"
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'dateFrom'"
            :value="paymentData.dateFrom"
            v-on:changeValue="paymentData.dateFrom = $event"
            :title="$t('dateFrom')"
            :language="language"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'dateTo'"
            :value="paymentData.dateTo"
            v-on:changeValue="paymentData.dateTo = $event"
            :title="$t('dateTo')"
            :language="language"
          />

          <CustomInput
            :className="'col-md-12'"
            :id="'sendTo'"
            :value="paymentData.sendTo"
            v-on:changeValue="paymentData.sendTo = $event"
            :title="$t('email')"
            :imgName="'email.svg'"
          />
          <CustomInput
            :className="'col-md-12'"
            :id="'textSearch'"
            :value="paymentData.textSearch"
            v-on:changeValue="paymentData.textSearch = $event"
            :title="$t('search')"
            :imgName="'search.svg'"
          />
        </div>

        <div class="modal-footer">
          <button
            name="submit"
            type="submit"
            class="btn btn-submit"
            @click.prevent="getAllPaymentReport()"
          >
            {{ $t("viewAndSend") }}
          </button>
          <button
            name="submit"
            type="submit"
            class="btn btn-cancel"
            @click.prevent="$bvModal.hide('ReportPayments')"
          >
            {{ $t("cancel") }}
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import { STATUS } from "@/utils/constants";
import { setDataMultiLang } from "@/utils/functions";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import ServicesReservationPay from "@/models/servicesPayments/ServicesReservationPay";
import Client from "@/models/clients/Client";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ReportPayments",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomSelectBox,
    DatePicker,
  },
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      opendStatus: false,
      paymentData: new ServicesReservationPay(),
      clientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
    };
  },
  methods: {
    async getAllPaymentReport() {
      this.isLoading = true;
      try {
        let response = await this.paymentData.getAllPaymentReport(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ReportPayments");
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
    async getDialogOfClients() {
      this.isLoading = true;
      this.clientTokenOptions = [];
      this.clientTokenOptions.push({
        value: "",
        text: this.$t("selectClient"),
      });
      try {
        let response = await this.clientData.getDialogOfClients(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken = this.paymentData.clientToken;
      try {
        let response =
          await this.reservationData.getDialogOfServicesReservations(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.reservationTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    changeReservations(data) {
      this.paymentData.clientToken = data;
      this.paymentData.reservationToken = "";
      this.getDialogOfServicesReservations();
    },
    getAllDialogs() {
      if (!this.opendStatus) {
        this.opendStatus = true;
        this.getDialogOfClients();
        this.getDialogOfServicesReservations();
      }
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  computed: {},
  async created() {},
};
</script>
