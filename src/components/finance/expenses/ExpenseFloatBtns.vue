<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link to="/add-expense" class="">
            {{ $t("expenseAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link to="/add-expense" class="">
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
        <div class="form-label-group col-md-6">
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

        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="expensesType"
            :options="expensesTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/expenses-types.svg" />
        </div>
        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="treasury"
            :options="treasuryTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/treasuries.svg" />
        </div>

        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="branch"
            :options="branchTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/branches.svg" />
        </div>

        <DatePicker
          :className="'col-md-6'"
          :id="'from'"
          :value="from"
          :title="$t('from')"
          :language="language"
          v-on:changeValue="from = $event"
        />
        <DatePicker
          :className="'col-md-6'"
          :id="'to'"
          :value="to"
          :title="$t('to')"
          :language="language"
          v-on:changeValue="to = $event"
        />
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
import axios from "axios";
import DatePicker from "@/components/general/DatePicker.vue";

export default {
  name: "ExpenseFloatBtns",
  components: {
    DatePicker,
  },
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    branchToken: {
      type: String,
      default: "",
    },
    treasuryToken: {
      type: String,
      default: "",
    },
    expensesTypeToken: {
      type: String,
      default: "",
    },
    dateFrom: {
      type: String,
      default: "",
    },
    dateTo: {
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
      branch: this.branchToken,
      treasury: this.treasuryToken,
      expensesType: this.expensesTypeToken,
      from: this.dateFrom,
      to: this.dateTo,
      expensesTypeTokenOptions: [],
      treasuryTokenOptions: [],
      branchTokenOptions: [],
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
      this.$emit(
        "search",
        this.text,
        this.branch,
        this.treasury,
        this.expensesType,
        this.from,
        this.to
      );
    },
    async getDialogOfExpensesTypes() {
      this.isLoading = true;
      this.expensesTypeTokenOptions = [];
      this.expensesTypeTokenOptions.push({
        value: "",
        text: this.$t("selectExpenseType"),
      });
      try {
        const response = await axios.get(
          `/ExpensesTypes/GetDialogOfExpensesTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.expensesTypeTokenOptions.push({
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
    async getDialogOfBranches() {
      this.isLoading = true;
      this.branchTokenOptions = [];
      this.branchTokenOptions.push({
        value: "",
        text: this.$t("selectBranch"),
      });
      try {
        const response = await axios.get(
          `/Branches/GetDialogOfBranches?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.branchTokenOptions.push({
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
  async created() {
    this.getDialogOfExpensesTypes();
    this.getDialogOfTreasuries();
    this.getDialogOfBranches();
  },
};
</script>
