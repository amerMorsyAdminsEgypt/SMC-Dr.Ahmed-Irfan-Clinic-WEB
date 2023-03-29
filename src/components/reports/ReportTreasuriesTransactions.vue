<template>
  <div>
    <PreLoader v-if="isLoading" />
    <div class="reports-card">
      <a
        v-b-modal.ReportTreasuriesTransactions
        @click="getAllDialogs()"
        class=""
      >
        <img src="@/assets/images/treasuries-transactions.svg" />{{
          $t("treasuriesTransactions")
        }}
      </a>
    </div>

    <b-modal
      id="ReportTreasuriesTransactions"
      scrollable
      centered
      size="lg"
      hide-footer
    >
      <template #modal-title>
        <h3>
          <img
            src="@/assets/images/treasuries-transactions.svg"
            class="icon-lg"
          />
          {{ $t("treasuriesTransactions") }}
        </h3>
      </template>

      <form autocomplete="off" method="post">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'treasuryToken'"
            :value="treasuryTransactionData.treasuryToken"
            :options="treasuryTokenOptions"
            v-on:changeValue="treasuryTransactionData.treasuryToken = $event"
            :title="$t('selectTreasury')"
            :imgName="'treasuries.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'transactionTypeToken'"
            :value="treasuryTransactionData.transactionTypeToken"
            :options="transactionTypeTokenOptions"
            v-on:changeValue="
              treasuryTransactionData.transactionTypeToken = $event
            "
            :title="$t('selectTransactionType')"
            :imgName="'type.svg'"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'dateFrom'"
            :value="treasuryTransactionData.dateFrom"
            v-on:changeValue="treasuryTransactionData.dateFrom = $event"
            :title="$t('dateFrom')"
            :language="language"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'dateTo'"
            :value="treasuryTransactionData.dateTo"
            v-on:changeValue="treasuryTransactionData.dateTo = $event"
            :title="$t('dateTo')"
            :language="language"
          />

          <CustomInput
            :className="'col-md-12'"
            :id="'sendTo'"
            :value="treasuryTransactionData.sendTo"
            v-on:changeValue="treasuryTransactionData.sendTo = $event"
            :title="$t('email')"
            :imgName="'email.svg'"
          />
          <CustomInput
            :className="'col-md-12'"
            :id="'textSearch'"
            :value="treasuryTransactionData.textSearch"
            v-on:changeValue="treasuryTransactionData.textSearch = $event"
            :title="$t('search')"
            :imgName="'search.svg'"
          />
        </div>

        <div class="modal-footer">
          <button
            name="submit"
            type="submit"
            class="btn btn-submit"
            @click.prevent="getTreasuriesTransactionsReport()"
          >
            {{ $t("viewAndSend") }}
          </button>
          <button
            name="submit"
            type="submit"
            class="btn btn-cancel"
            @click.prevent="$bvModal.hide('ReportTreasuriesTransactions')"
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
import TreasuryTransaction from "@/models/finance/treasuriesTransactions/TreasuryTransaction";
import Treasury from "@/models/finance/treasuries/Treasury";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ReportTreasuriesTransactions",
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
      treasuryTransactionData: new TreasuryTransaction(),
      treasuryData: new Treasury(),
      treasuryTokenOptions: [],
      transactionTypeTokenOptions: [],
    };
  },
  methods: {
    async getTreasuriesTransactionsReport() {
      this.isLoading = true;
      try {
        let response =
          await this.treasuryTransactionData.getTreasuriesTransactionsReport(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ReportTreasuriesTransactions");
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
    async getDialogOfTransactionsTypes() {
      this.transactionTypeTokenOptions = [];
      this.transactionTypeTokenOptions.push({
        value: "",
        text: this.$t("selectTransactionType"),
      });
      let transactionsTypes =
        this.$store.getters.userData.constantLists.listTransactionType;
      this.transactionTypeTokenOptions.push({
        value: transactionsTypes[0]["itemToken"],
        text: this.setDataMultiLang(
          this.language,
          transactionsTypes[0]["itemNameAr"],
          transactionsTypes[0]["itemNameEn"]
        ),
      });
      this.transactionTypeTokenOptions.push({
        value: transactionsTypes[1]["itemToken"],
        text: this.setDataMultiLang(
          this.language,
          transactionsTypes[1]["itemNameAr"],
          transactionsTypes[1]["itemNameEn"]
        ),
      });
    },
    getAllDialogs() {
      if (!this.opendStatus) {
        this.opendStatus = true;
        this.getDialogOfTreasuries();
        this.getDialogOfTransactionsTypes();
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
