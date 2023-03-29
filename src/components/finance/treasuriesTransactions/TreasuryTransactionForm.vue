<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addTreasuryProcess">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="treasuryTransactionData.treasuryToken"
              :options="treasuryTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/treasuries.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="treasuryTransactionData.transactionTypeToken"
              :options="transactionTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>

          <CustomInput
            :className="'col-md-6'"
            :id="'transactionCode'"
            :value="treasuryTransactionData.transactionCode"
            :title="$t('transactionCode')"
            :imgName="'number.svg'"
            v-on:changeValue="treasuryTransactionData.transactionCode = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'transactionSerialNumber'"
            :value="treasuryTransactionData.transactionSerialNumber"
            :title="$t('transactionSerialNumber')"
            :imgName="'number.svg'"
            v-on:changeValue="
              treasuryTransactionData.transactionSerialNumber = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'transactionMoney'"
            :value="treasuryTransactionData.transactionMoney"
            :title="$t('money')"
            :imgName="'money.svg'"
            v-on:changeValue="treasuryTransactionData.transactionMoney = $event"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'transactionDate'"
            :value="treasuryTransactionData.transactionDate"
            :title="$t('date')"
            :language="language"
            v-on:changeValue="treasuryTransactionData.transactionDate = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'transactionNote'"
            :value="treasuryTransactionData.transactionNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="treasuryTransactionData.transactionNote = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/treasuries-transactions" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { setDataMultiLang } from "@/utils/functions";
import axios from "axios";
import CustomInput from "@/components/general/CustomInput.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "TreasuryForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    DatePicker,
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
      treasuryTokenOptions: [],
      transactionTypeTokenOptions: [],
    };
  },
  props: ["treasuryTransactionData", "submitName"],
  methods: {
    async getDialogOfTreasuries() {
      this.isLoading = true;
      this.treasuryTokenOptions = [];
      this.treasuryTokenOptions.push({
        value: "",
        text: this.$t("selectTreasury"),
      });
      try {
        const response = await axios.get(
          `/Treasuries/GetDialogOfTreasuries?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.treasuryTokenOptions.push({
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
    async getDialogOfTransactionsTypes() {
      this.isLoading = true;
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
      this.isLoading = false;
    },
    async addTreasuryProcess() {
      this.$emit("addTreasuryProcess");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  watch: {},
  async created() {
    this.getDialogOfTreasuries();
    this.getDialogOfTransactionsTypes();
  },
};
</script>

<style lang="scss"></style>
