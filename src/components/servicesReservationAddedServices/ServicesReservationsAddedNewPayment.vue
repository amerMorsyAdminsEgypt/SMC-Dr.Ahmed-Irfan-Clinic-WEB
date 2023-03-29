<template>
  <b-modal
    id="ServicesReservationsAddedNewPayment"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/pay.svg" class="icon-lg" />
        {{ $t("newPayment") }}
      </h3>
    </template>
    <form autocomplete="off" method="post">
      <div class="row">
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'treasuryToken'"
          :value="servicesReservationPayData.treasuryToken"
          :options="treasuryTokenOptions"
          v-on:changeValue="servicesReservationPayData.treasuryToken = $event"
          :title="$t('selectTreasury')"
          :imgName="'treasuries.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'methodPaidToken'"
          :value="servicesReservationPayData.methodPaidToken"
          :options="methodPaidTokenOptions"
          v-on:changeValue="servicesReservationPayData.methodPaidToken = $event"
          :title="$t('selectMethodPaid')"
          :imgName="'payment-method.svg'"
        />
        <CustomInputFloat
          :className="'col-md-6'"
          :id="'methodPaidValue'"
          :value="servicesReservationPayData.methodPaidValue"
          :title="$t('paidMoney')"
          :imgName="'money.svg'"
          v-on:changeValue="servicesReservationPayData.methodPaidValue = $event"
        />

        <TextArea
          :className="'col-md-6'"
          :id="'payNote'"
          :value="servicesReservationPayData.payNote"
          :title="$t('notes')"
          :imgName="'notes.svg'"
          v-on:changeValue="servicesReservationPayData.payNote = $event"
        />
      </div>
      <div class="modal-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="newPayment"
        >
          {{ $t("pay") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-cancel"
          @click.prevent="$bvModal.hide('ServicesReservationsAddedNewPayment')"
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
// import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import TextArea from "@/components/general/TextArea.vue";
import Treasury from "@/models/finance/treasuries/Treasury";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import { moneyFormat } from "@/utils/functions";
import createToastMixin from "@/utils/create-toast-mixin";
// import Client from "@/models/clients/Client";

export default {
  name: "ServicesReservationsAddedNewPayment",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    // DataLabelGroup,
    CustomSelectBox,
    CustomInputFloat,
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
      // clientData: new Client(),
      treasuryData: new Treasury(),
      treasuryTokenOptions: [],
      methodPaidData: new MethodPaid(),
      methodPaidTokenOptions: [],
      totalPointsPaid: 0,
    };
  },
  watch: {
    // servicesReservationPayData() {
    //   this.getClientDetails();
    // },
    // "servicesReservationPayData.pointsValue": function (val) {
    //   this.totalPointsPaid =
    //     this.servicesReservationPayData.onePointEqualValue * val;
    // },
    // "servicesReservationPayData.onePointEqualValue": function (val) {
    //   this.totalPointsPaid = this.servicesReservationPayData.pointsValue * val;
    // },
  },
  methods: {
    async newPayment() {
      this.isLoading = true;
      try {
        let response = await this.servicesReservationPayData.newPayment(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ServicesReservationsAddedNewPayment");
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
    moneyFormat(money) {
      return moneyFormat(money);
    },
  },
  props: ["servicesReservationPayData"],
  computed: {},
  async created() {
    this.getDialogOfTreasuries();
    this.getDialogOfMethodPaid();
  },
};
</script>

<style scoped lang="scss"></style>
