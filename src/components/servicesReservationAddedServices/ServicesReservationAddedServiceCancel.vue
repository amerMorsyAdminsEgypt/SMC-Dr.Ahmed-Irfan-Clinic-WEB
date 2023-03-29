<template>
  <b-modal
    id="ServicesReservationAddedServiceCancel"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("ServicesReservationAddedServices.cancel") }}
      </h3>
    </template>

    <form autocomplete="off" method="post">
      <div class="row">
        <TextArea
          :className="'col-md-6'"
          :id="'refoundReasonAr'"
          :value="servicesReservationAddedServiceData.refoundReasonAr"
          v-on:changeValue="
            servicesReservationAddedServiceData.refoundReasonAr = $event
          "
          :title="$t('cancelReasonAr')"
          :imgName="'reason.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'refoundReasonEn'"
          :value="servicesReservationAddedServiceData.refoundReasonEn"
          v-on:changeValue="
            servicesReservationAddedServiceData.refoundReasonEn = $event
          "
          :title="$t('cancelReasonEn')"
          :imgName="'reason.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'refoundReasonUnd'"
          :value="servicesReservationAddedServiceData.refoundReasonUnd"
          v-on:changeValue="
            servicesReservationAddedServiceData.refoundReasonUnd = $event
          "
          :title="$t('cancelReasonUnd')"
          :imgName="'reason.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'refoundTreasuryToken'"
          :value="servicesReservationAddedServiceData.refoundTreasuryToken"
          :options="treasuryTokenOptions"
          v-on:changeValue="
            servicesReservationAddedServiceData.refoundTreasuryToken = $event
          "
          :title="$t('selectTreasury')"
          :imgName="'treasuries.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'refoundMethodPaidToken'"
          :value="servicesReservationAddedServiceData.refoundMethodPaidToken"
          :options="methodPaidTokenOptions"
          v-on:changeValue="
            servicesReservationAddedServiceData.refoundMethodPaidToken = $event
          "
          :title="$t('selectMethodPaid')"
          :imgName="'payment-method.svg'"
        />
        <CustomInputFloat
          :className="'col-md-6'"
          :id="'refundPercentageFromPaid'"
          :value="servicesReservationAddedServiceData.refundPercentageFromPaid"
          v-on:changeValue="
            servicesReservationAddedServiceData.refundPercentageFromPaid =
              $event
          "
          :title="$t('refundPercentageFromPaid')"
          :imgName="'percentage.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="servicesReservationAddedServiceData.totalPaid"
          :title="$t('paidMoney')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="servicesReservationAddedServiceData.refoundValue"
          :title="$t('refundAmount')"
          :imgName="'refund.svg'"
        />
      </div>

      <div class="modal-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="cancelServicesReservationAddedServices"
        >
          {{ $t("ok") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-cancel"
          @click.prevent="
            $bvModal.hide('ServicesReservationAddedServiceCancel')
          "
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
import Treasury from "@/models/finance/treasuries/Treasury";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import TextArea from "@/components/general/TextArea.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationAddedServiceCancel",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomSelectBox,
    CustomInputFloat,
    TextArea,
    DataLabelGroup,
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
      treasuryData: new Treasury(),
      treasuryTokenOptions: [],
      methodPaidData: new MethodPaid(),
      methodPaidTokenOptions: [],
    };
  },
  methods: {
    async cancelServicesReservationAddedServices() {
      this.isLoading = true;
      try {
        let response =
          await this.servicesReservationAddedServiceData.cancelServicesReservationAddedServices(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ServicesReservationAddedServiceCancel");
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
  props: ["servicesReservationAddedServiceData"],
  computed: {},
  watch: {
    "servicesReservationAddedServiceData.refundPercentageFromPaid": function (
      val
    ) {
      this.servicesReservationAddedServiceData.refoundValue =
        (this.servicesReservationAddedServiceData.totalPaid * val) / 100;
    },
  },
  async created() {
    this.getDialogOfTreasuries();
    this.getDialogOfMethodPaid();
  },
};
</script>

<style scoped lang="scss"></style>
