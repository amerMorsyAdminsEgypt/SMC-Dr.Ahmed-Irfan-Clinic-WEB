<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="updateTransactionPointsHistory"
    >
      <div class="my-card">
        <div class="row">
          <div class="col-md-12 client-add">
            <CustomSelectBox
              v-if="clientTokenOptions.length > 0"
              :className="'col-md-11'"
              :id="'clientToken'"
              :value="filterPointData.clientToken"
              :options="clientTokenOptions"
              v-on:changeValue="filterPointData.clientToken = $event"
              :title="$t('selectClient')"
              :imgName="'clients.svg'"
              :isSync="true"
              v-on:synchronization="getDialogOfClientsWithImageAndPoint()"
              :imgStatus="true"
            />
            <button
              v-b-modal.ServicesReservationAddClient
              class="btn"
              @click.prevent=""
              :title="$t('addClient')"
            >
              <img src="@/assets/images/plus.svg" class="icon-lg" />
            </button>
          </div>

          <CustomInput
            :className="'col-md-12'"
            :id="'transactionPointsHistoryCode'"
            :value="filterPointData.transactionPointsHistoryCode"
            :title="$t('pointsAndWallets.points.code')"
            :imgName="'number.svg'"
            v-on:changeValue="
              filterPointData.transactionPointsHistoryCode = $event
            "
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'transactionPointsTypeToken'"
            :value="filterPointData.transactionPointsTypeToken"
            :options="walletTransactionTypeTokenOptions"
            v-on:changeValue="
              filterPointData.transactionPointsTypeToken = $event
            "
            :title="$t('pointsAndWallets.wallets.selectTransactionType')"
            :imgName="'payment-method.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="'transactionPointsValue'"
            :value="filterPointData.transactionPointsValue"
            :title="$t('pointsAndWallets.points.points')"
            :imgName="'number.svg'"
            v-on:changeValue="filterPointData.transactionPointsValue = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'transactionPointsReasonAr'"
            :value="filterPointData.transactionPointsReasonAr"
            :maxRows="maxRows"
            :title="$t('pointsAndWallets.points.reasonAr')"
            :imgName="'reason.svg'"
            v-on:changeValue="
              filterPointData.transactionPointsReasonAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'transactionPointsReasonEn'"
            :value="filterPointData.transactionPointsReasonEn"
            :maxRows="maxRows"
            :title="$t('pointsAndWallets.points.reasonEn')"
            :imgName="'reason.svg'"
            v-on:changeValue="
              filterPointData.transactionPointsReasonEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'transactionPointsReasonUnd'"
            :value="filterPointData.transactionPointsReasonUnd"
            :maxRows="maxRows"
            :title="$t('pointsAndWallets.points.reasonUnd')"
            :imgName="'reason.svg'"
            v-on:changeValue="
              filterPointData.transactionPointsReasonUnd = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'notes'"
            :value="filterPointData.notes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="filterPointData.notes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          :to="{ name: 'PointsTransactions' }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>

    <ServicesReservationAddClient
      v-on:clientAdded="getDialogOfClientsWithImageAndPoint()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import DEFAULT_IMG from "@/assets/images/wallet.svg";
import Client from "@/models/clients/Client";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import TextArea from "@/components/general/TextArea.vue";
import {
  STATUS,
  TEXT_MAX_LENGTH_SUPER,
  MAX_ROWS_TEXTAREA,
} from "@/utils/constants";
import { WALLET_TRANSACTIONS_TYPE_TOKEN_OPTIONS } from "@/utils/constantLists";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import ServicesReservationAddClient from "@/components/servicesReservations/ServicesReservationAddClient.vue";

export default {
  name: "WalletForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomInputFloat,
    TextArea,
    CustomSelectBox,
    ServicesReservationAddClient,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      textAreaMaxLenght: TEXT_MAX_LENGTH_SUPER,
      maxRows: MAX_ROWS_TEXTAREA,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      defaultImg: DEFAULT_IMG,
      clientData: new Client(),
      clientTokenOptions: [],
      methodPaidData: new MethodPaid(),
      methodPaidTokenOptions: [],
      walletTransactionTypeTokenOptions: WALLET_TRANSACTIONS_TYPE_TOKEN_OPTIONS,
    };
  },
  props: ["filterPointData", "submitName"],
  methods: {
    async updateTransactionPointsHistory() {
      this.$emit("updateTransactionPointsHistory");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
    async getDialogOfClientsWithImageAndPoint() {
      this.isLoading = true;
      try {
        this.clientTokenOptions =
          await this.clientData.getDialogOfClientsWithImageAndPoint(
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
  watch: {},
  async created() {
    await this.getDialogOfClientsWithImageAndPoint();
    this.getDialogOfMethodPaid();
  },
};
</script>

<style lang="scss"></style>
