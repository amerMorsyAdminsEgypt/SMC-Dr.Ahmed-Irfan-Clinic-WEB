<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="employeeData.attendedBranchToken"
              :options="branchTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/branches.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="employeeData.attendanceTypeToken"
              :options="attendanceTypeTokenOptions"
              @change="changeAttendanceType()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="employeeData.employeeSalaryEffectToken"
              :options="employeeSalaryEffectTokenOptions"
              @change="changeSalaryEffect()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/salary-effects.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="employeeData.calculationMethodTypeToken"
              :options="calculationMethodTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="employeeData.employeeSalaryEffectFeeTypeToken"
              :options="employeeSalaryEffectFeeTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <input
              name="employeeSalaryEffectValue"
              id="employeeSalaryEffectValue"
              type="text"
              v-model="employeeData.employeeSalaryEffectValue"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="employeeSalaryEffectValue">{{
              $t("employeeSalaryEffectValue")
            }}</label>
            <img src="@/assets/images/money.svg" />
          </div>

          <div class="col-12 text-center">
            <label>{{ $t("dataOfStart") }}</label>
          </div>
          <div class="form-label-group col-md-6">
            <b-form-datepicker
              v-model="employeeData.attendedDate"
              :date-format-options="{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'short',
              }"
              v-bind="labels[language] || {}"
              :placeholder="$t('date')"
              :locale="language"
              today-button
              reset-button
              class="form-control"
            ></b-form-datepicker>
          </div>
          <div class="form-label-group col-md-6">
            <b-form-timepicker
              v-model="employeeData.attendedTime"
              v-bind="labels[language] || {}"
              :placeholder="$t('time')"
              :locale="language"
              now-button
              reset-button
              no-close-button
            ></b-form-timepicker>
          </div>
          <TextArea
            :className="'col-12'"
            :id="'attendedNote'"
            :value="employeeData.attendedNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="employeeData.attendedNote = $event"
          />

          <div class="col-12 text-center">
            <label>{{ $t("dataOfEnd") }}</label>
          </div>
          <div class="form-label-group col-md-6">
            <b-form-datepicker
              v-model="employeeData.departureDate"
              :date-format-options="{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'short',
              }"
              v-bind="labels[language] || {}"
              :placeholder="$t('date')"
              :locale="language"
              today-button
              reset-button
              class="form-control"
            ></b-form-datepicker>
          </div>
          <div class="form-label-group col-md-6">
            <b-form-timepicker
              v-model="employeeData.departureTime"
              v-bind="labels[language] || {}"
              :placeholder="$t('time')"
              :locale="language"
              now-button
              reset-button
              no-close-button
            ></b-form-timepicker>
          </div>
          <TextArea
            :className="'col-12'"
            :id="'departureNote'"
            :value="employeeData.departureNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="employeeData.departureNote = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateEmployeeAttendance"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="'/attendance-employee/' + employeeData.employeeToken"
          class="btn btn-cancel"
        >
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
import axios from "axios";
import TextArea from "@/components/general/TextArea.vue";
import { setDataMultiLang } from "@/utils/functions";

export default {
  name: "EmployeeAttendanceForm",
  components: {
    PreLoader,
    ExceptionWithImg,
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
      attendanceTypeTokenOptions: [],
      branchTokenOptions: [],
      employeeSalaryEffectTokenOptions: [],
      calculationMethodTypeTokenOptions: [],
      employeeSalaryEffectFeeTypeTokenOptions: [],

      labels: {
        ar: {
          weekdayHeaderFormat: "narrow",
          labelPrevDecade: "العقد السابق",
          labelPrevYear: "العام السابق",
          labelPrevMonth: "الشهر السابق",
          labelCurrentMonth: "الشهر الحالي",
          labelNextMonth: "الشهر المقبل",
          labelNextYear: "العام المقبل",
          labelNextDecade: "العقد القادم",
          labelToday: "اليوم",
          labelSelected: "التاريخ المحدد",
          labelNoDateSelected: "لم يتم اختيار تاريخ",
          labelCalendar: "التقويم",
          labelNav: "الملاحة التقويم",
          labelHelp: "استخدم مفاتيح المؤشر للتنقل في التواريخ",
          labelTodayButton: "اليوم",
          labelResetButton: "حذف",

          labelHours: "ساعات",
          labelMinutes: "الدقائق",
          labelSeconds: "ثواني",
          labelAmpm: "صباحا مساء",
          labelAm: "ص",
          labelPm: "م",
          labelIncrement: "زيادة",
          labelDecrement: "إنقاص",
          // labelSelected: "الوقت المحدد",
          labelNoTimeSelected: "لم يتم اختيار وقت",
          labelCloseButton: "إغلاق",
          labelNowButton: "الآن",
        },
      },
    };
  },
  props: ["employeeData", "submitName"],
  methods: {
    async addOrUpdateEmployeeAttendance() {
      this.$emit("addOrUpdateEmployeeAttendance");
    },
    async changeAttendanceType() {
      this.employeeData.employeeSalaryEffectToken = "";
      this.employeeData.calculationMethodTypeToken = "";
      this.employeeData.employeeSalaryEffectFeeTypeToken = "";
      this.employeeData.employeeSalaryEffectValue = "";
      this.getDialogOfEmployeeSalaryEffect(
        this.employeeData.attendanceTypeToken
      );
    },
    async changeSalaryEffect() {
      this.isLoading = true;
      try {
        let response = await axios.get(
          `/EmployeeSalaryEffect/GetEmployeeSalaryEffectDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&employeeSalaryEffectToken=${this.employeeData.employeeSalaryEffectToken}`
        );
        let employeeSalaryEffectData = response.data.employeeSalaryEffectData;
        if (response.data.status == STATUS.SUCCESS) {
          this.employeeData.calculationMethodTypeToken =
            employeeSalaryEffectData.calculationMethodTypeToken;
          this.employeeData.employeeSalaryEffectFeeTypeToken =
            employeeSalaryEffectData.employeeSalaryEffectFeeTypeToken;
          this.employeeData.employeeSalaryEffectValue =
            employeeSalaryEffectData.defaultValue;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
    },
    async getDialogOfEmployeeAttendanceTypes() {
      this.isLoading = true;
      this.attendanceTypeTokenOptions = [];
      this.attendanceTypeTokenOptions.push({
        value: "",
        text: this.$t("selectOperationType"),
      });
      let items =
        this.$store.getters.userData.constantLists.listEmployeeAttendanceType;
      for (let item in items) {
        this.attendanceTypeTokenOptions.push({
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
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async getDialogOfEmployeeSalaryEffect(employeeSalaryEffectTypeToken) {
      this.isLoading = true;
      employeeSalaryEffectTypeToken = employeeSalaryEffectTypeToken
        ? employeeSalaryEffectTypeToken
        : "";
      this.employeeSalaryEffectTokenOptions = [];
      this.employeeSalaryEffectTokenOptions.push({
        value: "",
        text: this.$t("selectSalaryEffect"),
      });
      try {
        const response = await axios.get(
          `/EmployeeSalaryEffect/GetDialogOfEmployeeSalaryEffect?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&employeeSalaryEffectTypeToken=${employeeSalaryEffectTypeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeSalaryEffectTokenOptions.push({
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
        this.employeesData = null;
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
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
  },
  async created() {
    this.getDialogOfEmployeeAttendanceTypes();
    this.getDialogOfBranches();
    this.getDialogOfEmployeeSalaryEffect();
    this.getDialogOfCalculationMethodType();
    this.getDialogOfFeesType();
    setTimeout(
      () =>
        this.getDialogOfEmployeeSalaryEffect(
          this.employeeData.attendanceTypeToken
        ),
      2000
    );
  },
};
</script>

<style scoped; lang="scss"></style>
