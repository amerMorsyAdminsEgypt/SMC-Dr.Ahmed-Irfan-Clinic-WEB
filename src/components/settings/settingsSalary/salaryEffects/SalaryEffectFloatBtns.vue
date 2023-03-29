<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link to="/add-salary-effect" class="">
            {{ $t("salaryEffectAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link to="/add-salary-effect" class="">
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
            v-model="employeeSalaryEffectType"
            :options="employeeSalaryEffectTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div>
        <div class="form-label-group col-12">
          <b-form-select
            v-model="calculationMethodType"
            :options="calculationMethodTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div>
        <div class="form-label-group col-12">
          <b-form-select
            v-model="employeeSalaryEffectFeeType"
            :options="employeeSalaryEffectFeeTypeTokenOptions"
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
import { setDataMultiLang } from "@/utils/functions";

export default {
  name: "SalaryEffectFloatBtns",
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    employeeSalaryEffectTypeToken: {
      type: String,
      default: "",
    },
    calculationMethodTypeToken: {
      type: String,
      default: "",
    },
    employeeSalaryEffectFeeTypeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: this.textSearch,
      employeeSalaryEffectType: this.employeeSalaryEffectTypeToken,
      calculationMethodType: this.calculationMethodTypeToken,
      employeeSalaryEffectFeeType: this.employeeSalaryEffectFeeTypeToken,
      employeeSalaryEffectTypeTokenOptions: [],
      calculationMethodTypeTokenOptions: [],
      employeeSalaryEffectFeeTypeTokenOptions: [],
    };
  },
  components: {},
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
        this.employeeSalaryEffectType,
        this.calculationMethodType,
        this.employeeSalaryEffectFeeType
      );
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    async getDialogOfSalaryEffectType() {
      this.isLoading = true;
      this.employeeSalaryEffectTypeTokenOptions = [];
      this.employeeSalaryEffectTypeTokenOptions.push({
        value: "",
        text: this.$t("selectSalaryEffectType"),
      });
      let items =
        this.$store.getters.userData.constantLists.listEmployeeAttendanceType;
      for (let item in items) {
        this.employeeSalaryEffectTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfCalculationMethodType() {
      this.isLoading = true;
      this.calculationMethodTypeTokenOptions = [];
      this.calculationMethodTypeTokenOptions.push({
        value: "",
        text: this.$t("selectCalculationMethodType"),
      });
      let items =
        this.$store.getters.userData.constantLists.listCalculationMethodType;
      for (let item in items) {
        this.calculationMethodTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfFeesType() {
      this.isLoading = true;
      this.employeeSalaryEffectFeeTypeTokenOptions = [];
      this.employeeSalaryEffectFeeTypeTokenOptions.push({
        value: "",
        text: this.$t("selectSalaryEffectFeeType"),
      });
      let items = this.$store.getters.userData.constantLists.listFeesType;
      for (let item in items) {
        this.employeeSalaryEffectFeeTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getDialogOfSalaryEffectType();
    this.getDialogOfCalculationMethodType();
    this.getDialogOfFeesType();
  },
};
</script>
