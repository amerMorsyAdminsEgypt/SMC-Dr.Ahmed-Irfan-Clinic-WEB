<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div class="reports-cards">
      <div class="reports-card">
        <a @click="openAttendanceDialog" class="">
          <img src="@/assets/images/attendance.svg" />{{ $t("attendance") }}
        </a>
      </div>

      <div class="reports-card">
        <router-link to="/calculate-payroll" class="">
          <img src="@/assets/images/payroll.svg" />
          {{ $t("calculatePayroll") }}
        </router-link>
      </div>

      <!-- <div class="reports-card">
        <a @click="openMovementDialog" class="">
          <img src="@/assets/images/movement.svg" />{{ $t("movement") }}
        </a>
      </div>

      <div class="reports-card">
        <a @click="openPointsDialog" class="">
          <img src="@/assets/images/points.svg" />{{ $t("points") }}
        </a>
      </div> -->
    </div>

    <vue-bottom-sheet ref="filterDialog">
      <div class="row">
        <div class="form-label-group col-12">
          <input
            name="textSearch"
            id="textSearch"
            type="text"
            v-model="textSearch"
            class="form-control"
            placeholder=" "
            maxlength="50"
          />
          <label for="textSearch">{{ $t("search") }}</label>
          <img src="@/assets/images/search.svg" />
        </div>

        <div class="form-label-group col-md-12">
          <b-form-select
            v-model="employeeToken"
            :options="employeeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/man.svg" />
        </div>

        <div
          v-if="attendanceDialog || movementDialog"
          class="form-label-group col-md-6"
        >
          <b-form-datepicker
            v-model="dateSearchFrom"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            }"
            v-bind="labels[language] || {}"
            :placeholder="$t('from')"
            :locale="language"
            today-button
            reset-button
            class="form-control"
          ></b-form-datepicker>
        </div>

        <div
          v-if="attendanceDialog || movementDialog"
          class="form-label-group col-md-6"
        >
          <b-form-datepicker
            v-model="dateSearchTo"
            :date-format-options="{
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            }"
            v-bind="labels[language] || {}"
            :placeholder="$t('to')"
            :locale="language"
            today-button
            reset-button
            class="form-control"
          ></b-form-datepicker>
        </div>

        <div v-if="pointsDialog" class="form-label-group col-md-6">
          <input
            name="settlementMonth"
            id="settlementMonth"
            type="text"
            v-model="settlementMonth"
            class="form-control"
            placeholder=" "
            maxlength="2"
          />
          <label for="settlementMonth">{{ $t("month") }}</label>
          <img src="@/assets/images/date.svg" />
        </div>

        <div v-if="pointsDialog" class="form-label-group col-md-6">
          <input
            name="settlementYear"
            id="settlementYear"
            type="text"
            v-model="settlementYear"
            class="form-control"
            placeholder=" "
            maxlength="4"
          />
          <label for="settlementYear">{{ $t("year") }}</label>
          <img src="@/assets/images/year.svg" />
        </div>

        <div class="form-label-group col-12">
          <input
            name="sendTo"
            id="sendTo"
            type="text"
            v-model="sendTo"
            class="form-control"
            placeholder=" "
            maxlength="50"
          />
          <label for="sendTo">{{ $t("email") }}</label>
          <img src="@/assets/images/email.svg" />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="downloadReport"
        >
          {{ $t("viewAndSend") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import axios from "axios";
// import PrivilegeForm from "@/components/privilege/PrivilegeForm.vue";

export default {
  name: "Reports",
  components: {
    PreLoader,
    ExceptionWithImg,
    // PrivilegeForm,
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
      textSearch: "",
      employeeToken: "",
      employeeTokenOptions: [],
      dateSearchFrom: "",
      dateSearchTo: "",
      settlementYear: "",
      settlementMonth: "",
      sendTo: "",
      attendanceDialog: false,
      movementDialog: false,
      pointsDialog: false,

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
        },
      },
    };
  },
  methods: {
    openAttendanceDialog() {
      this.attendanceDialog = true;
      this.movementDialog = false;
      this.pointsDialog = false;
      this.$refs.filterDialog.open();
    },
    openMovementDialog() {
      this.attendanceDialog = false;
      this.movementDialog = true;
      this.pointsDialog = false;
      this.$refs.filterDialog.open();
    },
    openPointsDialog() {
      this.attendanceDialog = false;
      this.movementDialog = false;
      this.pointsDialog = true;
      this.$refs.filterDialog.open();
    },
    close() {
      this.$refs.filterDialog.close();
    },
    async downloadReport() {
      this.isLoading = true;
      this.close();
      try {
        let response = "";
        if (this.attendanceDialog) {
          response = await axios.get(
            `/EmployeesAttendanceReport/GetA4AttendanceReport?language=${
              this.language
            }&userAuthorizeToken=${this.userAuthorizeToken}&textSearch=${
              this.textSearch
            }&employeeToken=${
              this.employeeToken
            }&dateSearchFrom=${this.date2slash(
              this.dateSearchFrom
            )}&dateSearchTo=${this.date2slash(
              this.dateSearchTo
            )}&filterStatus=true&textSearch=${this.textSearch}&sendTo=${
              this.sendTo
            }`
          );
        } else if (this.movementDialog) {
          response = await axios.get(
            `/EmployeesMovementReport/GetA4EmployeesMovement?language=${
              this.language
            }&userAuthorizeToken=${this.userAuthorizeToken}&textSearch=${
              this.textSearch
            }&employeeToken=${
              this.employeeToken
            }&dateSearchFrom=${this.date2slash(
              this.dateSearchFrom
            )}&dateSearchTo=${this.date2slash(
              this.dateSearchTo
            )}&filterStatus=true&textSearch=${this.textSearch}&sendTo=${
              this.sendTo
            }`
          );
        } else {
          response = await axios.get(
            `/EmployeesSettlementMovementReport/GetA4EmployeesSettlementMovement?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&textSearch=${this.textSearch}&employeeToken=${this.employeeToken}&settlementYear=${this.settlementYear}&settlementMonth=${this.settlementMonth}&filterStatus=true&textSearch=${this.textSearch}&sendTo=${this.sendTo}`
          );
        }

        if (response.data.status == STATUS.SUCCESS) {
          window.open(`${BASE_URL}/${response.data.data}`);
          this.exceptionMsg = null;
          this.showMsg(response.data.msg, true);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesData = null;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async getDialogOfEmployees() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("allEmployees"),
      });
      try {
        const response = await axios.get(
          `/Employees/GetDialogOfEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
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
    date2slash(date) {
      if (date.indexOf("-") > -1) return date.replace(/-/g, "/");
      else return date;
    },
    date2dash(date) {
      if (date.indexOf("/") > -1) return date.replace(/\//g, "-");
      else return date;
    },
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
  },
  async created() {
    this.getDialogOfEmployees();
  },
};
</script>

<style scoped lang="scss"></style>
