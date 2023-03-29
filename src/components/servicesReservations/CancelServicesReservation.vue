<template>
  <b-modal
    id="CancelServicesReservation"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/cancel-reservation.svg" class="icon-lg" />
        {{ $t("cancelServicesReservation") }}
      </h3>
    </template>
    <form autocomplete="off" method="post">
      <div class="row">
        <CustomSelectBox
          :className="'col-md-12'"
          :id="'treasuryToken'"
          :value="servicesReservationCancelData.treasuryToken"
          :options="treasuryTokenOptions"
          v-on:changeValue="
            servicesReservationCancelData.treasuryToken = $event
          "
          :title="$t('selectTreasury')"
          :imgName="'treasuries.svg'"
        />
        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="servicesReservationCancelData.methodPaidToken"
            :options="methodPaidTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/payment-method.svg" />
        </div>
        <CustomInputFloat
          :className="'col-md-6'"
          :id="'refundPercentageFromPaid'"
          :value="servicesReservationCancelData.refundPercentageFromPaid"
          v-on:changeValue="
            servicesReservationCancelData.refundPercentageFromPaid = $event
          "
          :title="$t('refundPercentageFromPaid')"
          :imgName="'percentage.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="servicesReservationCancelData.totalPaid"
          :title="$t('paidMoney')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="servicesReservationCancelData.refoundValue"
          :title="$t('refundAmount')"
          :imgName="'refund.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'cancelReasonAr'"
          :value="servicesReservationCancelData.cancelReasonAr"
          v-on:changeValue="
            servicesReservationCancelData.cancelReasonAr = $event
          "
          :title="$t('cancelReasonAr')"
          :imgName="'reason.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'cancelReasonEn'"
          :value="servicesReservationCancelData.cancelReasonEn"
          v-on:changeValue="
            servicesReservationCancelData.cancelReasonEn = $event
          "
          :title="$t('cancelReasonEn')"
          :imgName="'reason.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'cancelReasonUnd'"
          :value="servicesReservationCancelData.cancelReasonUnd"
          v-on:changeValue="
            servicesReservationCancelData.cancelReasonUnd = $event
          "
          :title="$t('cancelReasonUnd')"
          :imgName="'reason.svg'"
        />

        <TextArea
          :className="'col-md-6'"
          :id="'note'"
          :value="servicesReservationCancelData.note"
          v-on:changeValue="servicesReservationCancelData.note = $event"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </div>
      <div class="modal-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="cancelServicesReservation"
        >
          {{ $t("ok") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-cancel"
          @click.prevent="$bvModal.hide('CancelServicesReservation')"
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
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import createToastMixin from "@/utils/create-toast-mixin";
import Treasury from "@/models/finance/treasuries/Treasury";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";

export default {
  name: "CancelServicesReservation",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TextArea,
    CustomInputFloat,
    DataLabelGroup,
    CustomSelectBox,
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
      treasuryData: new Treasury(),
      treasuryTokenOptions: [],
    };
  },
  methods: {
    async cancelServicesReservation() {
      this.isLoading = true;
      try {
        let response =
          await this.servicesReservationCancelData.cancelServicesReservation(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("CancelServicesReservation");
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
    async getDialogOfTreasuries() {
      this.isLoading = true;
      try {
        this.treasuryTokenOptions =
          await this.treasuryData.getDialogOfTreasuries(
            this.language,
            this.userAuthorizeToken
          );
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  props: ["servicesReservationCancelData"],
  computed: {},
  watch: {
    "servicesReservationCancelData.refundPercentageFromPaid": function (val) {
      this.servicesReservationCancelData.refoundValue =
        (this.servicesReservationCancelData.totalPaid * val) / 100;
    },
  },
  async created() {
    this.getDialogOfMethodPaid();
    this.getDialogOfTreasuries();
  },
};
</script>

<style scoped lang="scss"></style>
