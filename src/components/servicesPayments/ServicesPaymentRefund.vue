<template>
  <b-modal id="ServicesPaymentRefund" scrollable size="lg" centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/refund.svg" class="icon-lg" />
        {{ $t("refundPayment") }}
      </h3>
    </template>
    <form autocomplete="off" method="post">
      <div class="row">
        <TextArea
          :className="'col-md-6'"
          :id="'refundReasonAr'"
          :value="paymentData.refundReasonAr"
          :title="$t('refundReasonAr')"
          :imgName="'reason.svg'"
          v-on:changeValue="paymentData.refundReasonAr = $event"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'refundReasonEn'"
          :value="paymentData.refundReasonEn"
          :title="$t('refundReasonEn')"
          :imgName="'reason.svg'"
          v-on:changeValue="paymentData.refundReasonEn = $event"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'refundReasonUnd'"
          :value="paymentData.refundReasonUnd"
          :title="$t('refundReasonUnd')"
          :imgName="'reason.svg'"
          v-on:changeValue="paymentData.refundReasonUnd = $event"
        />

        <TextArea
          :className="'col-md-6'"
          :id="'refundNotes'"
          :value="paymentData.refundNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
          v-on:changeValue="paymentData.refundNotes = $event"
        />
      </div>
      <div class="modal-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="refundPayment"
        >
          {{ $t("refund") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-cancel"
          @click.prevent="$bvModal.hide('ServicesPaymentRefund')"
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
import TextArea from "@/components/general/TextArea.vue";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesPaymentRefund",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TextArea,
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
      methodPaidData: new MethodPaid(),
      methodPaidTokenOptions: [],
    };
  },
  methods: {
    async refundPayment() {
      this.isLoading = true;
      try {
        let response = await this.paymentData.refundPayment(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ServicesPaymentRefund");
          this.$emit("refresh");
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
    async getDialogOfMethodPaid() {
      this.isLoading = true;
      this.methodPaidTokenOptions = [];
      this.methodPaidTokenOptions.push({
        value: "",
        text: this.$t("selectMethodPaid"),
      });
      try {
        let response = await this.methodPaidData.getDialogOfMethodPaid(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.methodPaidTokenOptions.push({
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
  },
  props: ["paymentData"],
  computed: {},
  async created() {
    this.getDialogOfMethodPaid();
  },
};
</script>

<style scoped lang="scss"></style>
