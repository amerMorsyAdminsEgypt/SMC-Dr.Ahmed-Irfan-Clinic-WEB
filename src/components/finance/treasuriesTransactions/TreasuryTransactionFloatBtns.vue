<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link to="/add-treasury-transaction" class="">
            {{ $t("treasuryTransactionAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link to="/add-treasury-transaction" class="">
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="EmployeeBottomSheet">
      <div class="row">
        <div class="form-label-group col-12">
          <input
            name="textSearch"
            id="textSearch"
            type="text"
            v-model="text"
            class="form-control"
            placeholder=" "
            maxlength="50"
          />
          <label for="textSearch">{{ $t("search") }}</label>
          <img src="@/assets/images/search.svg" />
        </div>

        <div class="form-label-group col-12">
          <b-form-select
            v-model="treasury"
            :options="treasuryTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/treasuries.svg" />
        </div>
        <div class="form-label-group col-12">
          <b-form-select
            v-model="transactionType"
            :options="transactionTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="search"
        >
          {{ $t("search") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { STATUS } from "@/utils/constants";
import { setDataMultiLang } from "@/utils/functions";
import axios from "axios";

export default {
  name: "RevenueFloatBtns",
  components: {},
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    treasuryToken: {
      type: String,
      default: "",
    },
    transactionTypeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      text: this.textSearch,
      treasury: this.treasuryToken,
      transactionType: this.transactionTypeToken,
      treasuryTokenOptions: [],
      transactionTypeTokenOptions: [],
    };
  },
  methods: {
    open() {
      this.$refs.EmployeeBottomSheet.open();
    },
    close() {
      this.$refs.EmployeeBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit("search", this.text, this.treasury, this.transactionType);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
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
  },
  async created() {
    this.getDialogOfTreasuries();
    this.getDialogOfTransactionsTypes();
  },
};
</script>
