<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateSalaryEffect"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'employeeSalaryEffectNameAr'"
            :value="salaryEffectData.employeeSalaryEffectNameAr"
            :title="$t('nameAr')"
            :imgName="'salary-effects.svg'"
            v-on:changeValue="
              salaryEffectData.employeeSalaryEffectNameAr = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'employeeSalaryEffectNameEn'"
            :value="salaryEffectData.employeeSalaryEffectNameEn"
            :title="$t('nameEn')"
            :imgName="'salary-effects.svg'"
            v-on:changeValue="
              salaryEffectData.employeeSalaryEffectNameEn = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'employeeSalaryEffectNameUnd'"
            :value="salaryEffectData.employeeSalaryEffectNameUnd"
            :title="$t('nameUnd')"
            :imgName="'salary-effects.svg'"
            v-on:changeValue="
              salaryEffectData.employeeSalaryEffectNameUnd = $event
            "
          />

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="salaryEffectData.employeeSalaryEffectTypeToken"
              :options="employeeSalaryEffectTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="salaryEffectData.calculationMethodTypeToken"
              :options="calculationMethodTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="salaryEffectData.employeeSalaryEffectFeeTypeToken"
              :options="employeeSalaryEffectFeeTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>

          <CustomInput
            :className="'col-md-6'"
            :id="'defaultValue'"
            :value="salaryEffectData.defaultValue"
            :title="$t('defaultValue')"
            :imgName="'number.svg'"
            v-on:changeValue="salaryEffectData.defaultValue = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'employeeSalaryEffectNotes'"
            :value="salaryEffectData.employeeSalaryEffectNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              salaryEffectData.employeeSalaryEffectNotes = $event
            "
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/salary-effects" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import { setDataMultiLang } from "@/utils/functions";

export default {
  name: "SalaryEffectForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
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
      employeeSalaryEffectTypeTokenOptions: [],
      calculationMethodTypeTokenOptions: [],
      employeeSalaryEffectFeeTypeTokenOptions: [],
    };
  },
  props: ["salaryEffectData", "submitName"],
  methods: {
    async addOrUpdateSalaryEffect() {
      this.$emit("addOrUpdateSalaryEffect");
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
  watch: {},
  async created() {
    this.getDialogOfSalaryEffectType();
    this.getDialogOfCalculationMethodType();
    this.getDialogOfFeesType();
  },
};
</script>

<style lang="scss"></style>
