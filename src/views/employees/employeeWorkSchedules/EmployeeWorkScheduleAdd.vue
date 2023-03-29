<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div div class="my-card">
      <div class="row">
        <DatePicker
          :className="'col-md-6 col-md-6'"
          :id="'employeeWorkScheduleActiveStart'"
          :value="employeeWorkScheduleData.employeeWorkScheduleActiveStart"
          :title="$t('activationStartDate')"
          :language="language"
          v-on:changeValue="
            employeeWorkScheduleData.employeeWorkScheduleActiveStart = $event
          "
        />

        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="employeeWorkScheduleData.workPlanToken"
            :options="workPlanTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/man.svg" />
        </div>

        <TextArea
          :className="'col-md-12'"
          :id="'employeeWorkScheduleNotes'"
          :value="employeeWorkScheduleData.employeeWorkScheduleNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
          v-on:changeValue="
            employeeWorkScheduleData.employeeWorkScheduleNotes = $event
          "
        />
      </div>
    </div>

    <div v-if="employeesData" class="form-footer">
      <div>
        <input
          type="checkbox"
          id="selectAll"
          @click="selectAll"
          v-model="allSelected"
          class="checkbox"
        />
        <label class="mt-1 ml-2" for="selectAll">{{ $t("selectAll") }}</label>
      </div>

      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="addEmployeeWorkSchedule"
      >
        {{ $t("add") }}
      </button>
    </div>

    <div v-if="employeesData">
      <div class="row">
        <div
          class="flip-card col-12 col-sm-6 col-md-4 col-lg-3"
          v-for="employee in employeesData"
          :key="employee.employeeToken"
        >
          <div class="card-inner">
            <div class="card-front">
              <div class="flip-card-title-top">
                <h6 class="cut-1line">{{ employee.employeeCode }}</h6>
              </div>
              <img
                :src="baseUrl + employee.employeeImagePath"
                :onerror="`this.src='${defaultImg}'`"
                alt="Image"
              />
              <div class="flip-card-title">
                <h4 class="cut-1line">
                  {{
                    language == "ar"
                      ? employee.employeeNameAr
                      : employee.employeeNameEn
                  }}
                </h4>
              </div>
              <input
                type="checkbox"
                v-model="employeeTokenList"
                @click="select"
                :value="employee.employeeToken"
                class="checkbox item-right-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <EmployeeFloatBtns
      :filterOnly="true"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/user.jpg";
import axios from "axios";
import EmployeeWorkSchedule from "@/models/employees/employeeWorkSchedules/EmployeeWorkSchedule";
import WorkPlan from "@/models/settings/settingsSalary/workPlans/WorkPlan";
import DatePicker from "@/components/general/DatePicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import EmployeeFloatBtns from "@/components/employees/employees/EmployeeFloatBtns.vue";

export default {
  name: "EmployeeWorkScheduleAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    DatePicker,
    TextArea,
    EmployeeFloatBtns,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      typeToken: "",
      baseUrl: BASE_URL,
      defaultImg: DEFAULT_IMG,
      employeesData: null,
      allSelected: false,
      employeeTokenList: [],
      workPlanTokenOptions: [],
      workPlanData: new WorkPlan(),
      employeeWorkScheduleData: new EmployeeWorkSchedule(),
    };
  },
  methods: {
    selectAll() {
      this.allSelected = !this.allSelected;
      this.employeeTokenList = [];

      if (this.allSelected) {
        for (let employee in this.employeesData) {
          this.employeeTokenList.push(
            this.employeesData[employee].employeeToken
          );
        }
      }
    },
    select() {
      if (this.employeesData.length == this.employeeTokenList.length)
        this.allSelected = true;
      else this.allSelected = false;
    },
    search(text, employeeTypeToken) {
      this.textSearch = text;
      this.typeToken = employeeTypeToken;
      this.getAllEmployees();
    },
    async getDialogOfWorkPlans() {
      this.isLoading = true;
      this.workPlanTokenOptions = [];
      this.workPlanTokenOptions.push({
        value: "",
        text: this.$t("selectWorkPlan"),
      });
      try {
        let response = await this.workPlanData.getDialogOfWorkPlans(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.workPlanTokenOptions.push({
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
    async getAllEmployees() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Employees/GetAllEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&paginationStatus=false&employeeTypeToken=${this.typeToken}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.employeesData = response.data.employeesPagination.employeesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async addEmployeeWorkSchedule() {
      this.isLoading = true;
      try {
        let response =
          await this.employeeWorkScheduleData.addEmployeeWorkSchedule(
            this.language,
            this.userAuthorizeToken,
            this.employeeTokenList
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeeTokenList = [];
          this.getAllEmployees();
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
  computed: {},
  watch: {
    employeeTokenList: function (val) {
      if (this.employeesData.length == val.length) this.allSelected = true;
      else this.allSelected = false;
    },
  },
  async created() {
    this.getAllEmployees();
    this.getDialogOfWorkPlans();
  },
};
</script>

<style scoped lang="scss"></style>
