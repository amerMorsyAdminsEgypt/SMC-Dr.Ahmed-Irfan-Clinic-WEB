<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post">
      <div class="my-card">
        <div class="row">
          <!-- <div class="form-label-group col-md-12">
            <b-form-select
              v-model="
                employeeOfficialHolidaysPlanData.employeeBalancePlanToken
              "
              :options="employeeBalancesPlansTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/balances-plans.svg" />
          </div> -->

          <CustomInput
            :className="'col-md-6'"
            :id="'employeeOfficialHolidaysPlansCode'"
            :value="
              employeeOfficialHolidaysPlanData.employeeOfficialHolidaysPlansCode
            "
            :title="$t('employeeOfficialHolidaysPlansCode')"
            :imgName="'number.svg'"
            v-on:changeValue="
              employeeOfficialHolidaysPlanData.employeeOfficialHolidaysPlansCode =
                $event
            "
          />

          <TextArea
            :className="'col-md-6'"
            :id="'employeeSalarySettingNotes'"
            :value="employeeOfficialHolidaysPlanData.employeeSalarySettingNotes"
            v-on:changeValue="
              employeeOfficialHolidaysPlanData.employeeSalarySettingNotes =
                $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="my-card">
        <div class="row">
          <b-form-group
            :label="$t('WorkPlanShiftsSelect')"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-checkbox-group
              v-model="
                employeeOfficialHolidaysPlanData.officialHolidaysPlansTokenList
              "
              :options="officialHolidaysPlansTokenOptions"
              :aria-describedby="ariaDescribedby"
              switches
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>

      <div class="form-footer">
        <div v-if="submitName == $t('add')">
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
          @click.prevent="addEmployeeOfficialHolidaysPlans"
        >
          {{ submitName }}
        </button>

        <router-link
          v-if="submitName == $t('edit')"
          :to="`/employee-salary-settings/${employeeOfficialHolidaysPlanData.employeeToken}`"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>

    <div v-if="employeesData && submitName == $t('add')">
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
                v-model="employeeOfficialHolidaysPlanData.employeeTokenList"
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
      v-if="submitName == $t('add')"
      :filterOnly="true"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/user.jpg";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import axios from "axios";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import OfficialHolidaysPlan from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlan";
import EmployeeFloatBtns from "@/components/employees/employees/EmployeeFloatBtns.vue";

export default {
  name: "EmployeeSalarySettingForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    TextArea,
    EmployeeFloatBtns,
  },
  data() {
    return {
      isLoading: false,
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

      officialHolidaysPlanData: new OfficialHolidaysPlan(),
      officialHolidaysPlansTokenOptions: [],
    };
  },
  props: ["employeeOfficialHolidaysPlanData", "submitName"],
  methods: {
    selectAll() {
      this.allSelected = !this.allSelected;
      this.employeeOfficialHolidaysPlanData.employeeTokenList = [];

      if (this.allSelected) {
        for (let employee in this.employeesData) {
          this.employeeOfficialHolidaysPlanData.employeeTokenList.push(
            this.employeesData[employee].employeeToken
          );
        }
      }
    },
    select() {
      if (
        this.employeesData.length ==
        this.employeeOfficialHolidaysPlanData.employeeTokenList.length
      )
        this.allSelected = true;
      else this.allSelected = false;
    },
    search(text, employeeTypeToken) {
      this.textSearch = text;
      this.typeToken = employeeTypeToken;
      this.getAllEmployees();
    },
    async addEmployeeOfficialHolidaysPlans() {
      this.$emit("addEmployeeOfficialHolidaysPlans");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
    async getDialogOfOfficialHolidaysPlans() {
      this.isLoading = true;
      try {
        let response =
          await this.officialHolidaysPlanData.getDialogOfOfficialHolidaysPlans(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.officialHolidaysPlansTokenOptions.push({
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
  },
  watch: {
    employeeTokenList: function (val) {
      if (this.employeesData.length == val.length) this.allSelected = true;
      else this.allSelected = false;
    },
  },
  async created() {
    if (this.submitName == this.$t("add")) this.getAllEmployees();
    this.getDialogOfOfficialHolidaysPlans();
  },
};
</script>

<style lang="scss"></style>
