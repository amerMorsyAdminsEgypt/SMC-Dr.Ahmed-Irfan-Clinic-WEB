<template>
  <b-modal
    :id="
      withTaxStatus
        ? 'ServicesReservationReceiptWithTax'
        : 'ServicesReservationReceipt'
    "
    scrollable
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img
          v-if="withTaxStatus"
          src="@/assets/images/receiptWithTax.svg"
          class="icon-lg"
        />
        <img v-else src="@/assets/images/receipt.svg" class="icon-lg" />
        {{ withTaxStatus ? $t("receiptWithTax") : $t("receipt") }}
      </h3>
    </template>

    <form autocomplete="off" method="post">
      <div class="row">
        <CustomInput
          :className="'col-md-12'"
          :id="'sendTo'"
          :value="servicesReservationData.sendTo"
          v-on:changeValue="servicesReservationData.sendTo = $event"
          :title="$t('email')"
          :imgName="'email.svg'"
        />
      </div>

      <div class="modal-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="getServicesReservationsReport"
        >
          {{ $t("viewAndSend") }}
        </button>
        <button
          name="submit"
          type="submit"
          @click.prevent="
            $bvModal.hide('ServicesReservationReceiptWithTax');
            $bvModal.hide('ServicesReservationReceipt');
          "
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import CustomInput from "@/components/general/CustomInput.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationReceipt",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
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
    };
  },
  methods: {
    async getServicesReservationsReport() {
      this.isLoading = true;
      let response;
      try {
        if (this.withTaxStatus) {
          response =
            await this.servicesReservationData.getServicesReservationsReportWithTax(
              this.language,
              this.userAuthorizeToken
            );
        } else {
          response =
            await this.servicesReservationData.getServicesReservationsReport(
              this.language,
              this.userAuthorizeToken
            );
        }
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ServicesReservationReceiptWithTax");
          this.$bvModal.hide("ServicesReservationReceipt");
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
      this.servicesReservationData.sendTo = "";
      this.isLoading = false;
    },
  },
  props: {
    servicesReservationData: { type: Object },
    withTaxStatus: { type: Boolean, default: false },
  },
};
</script>
