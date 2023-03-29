<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post">
      <b-button
        v-b-toggle.employeesSalarySettingData
        class="btn btn-lg btn-collapse"
      >
        {{ $t("employeesSalarySettingData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="employeesSalarySettingData">
        <div class="my-card">
          <div class="row">
            <TextArea
              :className="'col-md-6 col-lg-4'"
              :id="'employeeSalarySettingDescriptionAr'"
              :value="
                employeeSalarySettingData.employeeSalarySettingDescriptionAr
              "
              v-on:changeValue="
                employeeSalarySettingData.employeeSalarySettingDescriptionAr =
                  $event
              "
              :title="$t('employeeSalarySettingDescriptionAr')"
              :imgName="'employee-salary-setting.svg'"
            />
            <TextArea
              :className="'col-md-6 col-lg-4'"
              :id="'employeeSalarySettingDescriptionEn'"
              :value="
                employeeSalarySettingData.employeeSalarySettingDescriptionEn
              "
              v-on:changeValue="
                employeeSalarySettingData.employeeSalarySettingDescriptionEn =
                  $event
              "
              :title="$t('employeeSalarySettingDescriptionEn')"
              :imgName="'employee-salary-setting.svg'"
            />
            <TextArea
              :className="'col-md-6 col-lg-4'"
              :id="'employeeSalarySettingDescriptionUnd'"
              :value="
                employeeSalarySettingData.employeeSalarySettingDescriptionUnd
              "
              v-on:changeValue="
                employeeSalarySettingData.employeeSalarySettingDescriptionUnd =
                  $event
              "
              :title="$t('employeeSalarySettingDescriptionUnd')"
              :imgName="'employee-salary-setting.svg'"
            />

            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'employeeBasicSalary'"
              :value="employeeSalarySettingData.employeeBasicSalary"
              v-on:changeValue="
                employeeSalarySettingData.employeeBasicSalary = $event
              "
              :title="$t('employeeBasicSalary')"
              :imgName="'money.svg'"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'employeeVariableSalary'"
              :value="employeeSalarySettingData.employeeVariableSalary"
              v-on:changeValue="
                employeeSalarySettingData.employeeVariableSalary = $event
              "
              :title="$t('employeeVariableSalary')"
              :imgName="'money.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6 col-lg-4'"
              :value="
                parseFloat(
                  employeeSalarySettingData.employeeBasicSalary
                    ? employeeSalarySettingData.employeeBasicSalary
                    : 0
                ) +
                parseFloat(
                  employeeSalarySettingData.employeeVariableSalary
                    ? employeeSalarySettingData.employeeVariableSalary
                    : 0
                )
              "
              :title="$t('employeeTotalSalary')"
              :imgName="'money.svg'"
            />

            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'employeeWorkDaysNumberPerMonth'"
              :value="employeeSalarySettingData.employeeWorkDaysNumberPerMonth"
              v-on:changeValue="
                employeeSalarySettingData.employeeWorkDaysNumberPerMonth =
                  $event
              "
              :title="$t('employeeWorkDaysNumberPerMonth')"
              :imgName="'days.svg'"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'employeeWorkHoursNumberPerDay'"
              :value="employeeSalarySettingData.employeeWorkHoursNumberPerDay"
              v-on:changeValue="
                employeeSalarySettingData.employeeWorkHoursNumberPerDay = $event
              "
              :title="
                $t('employeeWorkHoursNumberPerDay') +
                ' (' +
                $t('HH:MM:SS') +
                ')'
              "
              :imgName="'hours.svg'"
            />
            <CustomCheckbox
              :className="'col-md-12 col-lg-4'"
              :value="
                employeeSalarySettingData.employeeSalarySettingActivationStatus
              "
              v-on:changeValue="
                employeeSalarySettingData.employeeSalarySettingActivationStatus =
                  $event
              "
              :title="$t('employeeSalarySettingActivationStatus')"
            />

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumAllowedAttendLateInDay")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="'employeeMaximumAllowedAttendLateInDayByHours24'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInDayByHours24
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInDayByHours24 =
                      $event
                  "
                  :title="$t('time') + ' (' + $t('HH:MM:SS') + ')'"
                  :imgName="'hours.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-6'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInDayStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInDayStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumAllowedAttendLateInMonth")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-4'"
                  :id="'employeeMaximumAllowedAttendLateInMonthByDays'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthByDays
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthByDays =
                      $event
                  "
                  :title="$t('day')"
                  :imgName="'days.svg'"
                />
                <CustomInput
                  :className="'col-md-4'"
                  :id="'employeeMaximumAllowedAttendLateInMonthByHours24'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthByHours24
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthByHours24 =
                      $event
                  "
                  :title="$t('time') + ' (' + $t('HH:MM:SS') + ')'"
                  :imgName="'hours.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-4'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedAttendLateInMonthStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumAllowedEarlyDepartureInDay")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-4'"
                  :id="'employeeMaximumAllowedEarlyDepartureInDayByHours24'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInDayByHours24
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInDayByHours24 =
                      $event
                  "
                  :title="$t('time') + ' (' + $t('HH:MM:SS') + ')'"
                  :imgName="'hours.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-6'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInDayStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInDayStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumAllowedEarlyDepartureInMonth")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-4'"
                  :id="'employeeMaximumAllowedEarlyDepartureInMonthByDays'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthByDays
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthByDays =
                      $event
                  "
                  :title="$t('day')"
                  :imgName="'days.svg'"
                />
                <CustomInput
                  :className="'col-md-4'"
                  :id="'employeeMaximumAllowedEarlyDepartureInMonthByHours24'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthByHours24
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthByHours24 =
                      $event
                  "
                  :title="$t('time') + ' (' + $t('HH:MM:SS') + ')'"
                  :imgName="'hours.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-4'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedEarlyDepartureInMonthStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumAllowedOverTimeInDay")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="'employeeMaximumAllowedOverTimeInDayByHours24'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInDayByHours24
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInDayByHours24 =
                      $event
                  "
                  :title="$t('time') + ' (' + $t('HH:MM:SS') + ')'"
                  :imgName="'hours.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-6'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInDayStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInDayStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumAllowedOverTimeInMonth")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-4'"
                  :id="'employeeMaximumAllowedOverTimeInMonthByDays'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthByDays
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthByDays =
                      $event
                  "
                  :title="$t('day')"
                  :imgName="'days.svg'"
                />
                <CustomInput
                  :className="'col-md-4'"
                  :id="'employeeMaximumAllowedOverTimeInMonthByHours24'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthByHours24
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthByHours24 =
                      $event
                  "
                  :title="$t('time') + ' (' + $t('HH:MM:SS') + ')'"
                  :imgName="'hours.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-4'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedOverTimeInMonthStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("employeeOverTimeStartInDay")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="'employeeOverTimeStartInDayByHours24'"
                  :value="
                    employeeSalarySettingData.employeeOverTimeStartInDayByHours24
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeOverTimeStartInDayByHours24 =
                      $event
                  "
                  :title="$t('time') + ' (' + $t('HH:MM:SS') + ')'"
                  :imgName="'hours.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-6'"
                  :value="
                    employeeSalarySettingData.employeeOverTimeStartInDayStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeOverTimeStartInDayStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumAllowedShiftAbsenceUntillSalaryStop")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="'employeeMaximumAllowedShiftAbsenceUntillSalaryStop'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedShiftAbsenceUntillSalaryStop
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedShiftAbsenceUntillSalaryStop =
                      $event
                  "
                  :title="$t('theNumber')"
                  :imgName="'number.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-4'"
                  :value="
                    employeeSalarySettingData.employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeMaximumAllowedShiftAbsenceUntillSalaryStopStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("employeeDeductionFactorValueCaseLate")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="'employeeDeductionFactorValueCaseLate'"
                  :value="
                    employeeSalarySettingData.employeeDeductionFactorValueCaseLate
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeDeductionFactorValueCaseLate =
                      $event
                  "
                  :title="$t('theNumber')"
                  :imgName="'number.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-4'"
                  :value="
                    employeeSalarySettingData.employeeDeductionPriceCaseLateStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeDeductionPriceCaseLateStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("employeeDeductionFactorValueCaseEarlyDeparture")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="'employeeDeductionFactorValueCaseEarlyDeparture'"
                  :value="
                    employeeSalarySettingData.employeeDeductionFactorValueCaseEarlyDeparture
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeDeductionFactorValueCaseEarlyDeparture =
                      $event
                  "
                  :title="$t('theNumber')"
                  :imgName="'number.svg'"
                />

                <CustomCheckbox
                  :className="'col-md-4'"
                  :value="
                    employeeSalarySettingData.employeeDeductionFactorValueCaseEarlyDepartureStatus
                  "
                  v-on:changeValue="
                    employeeSalarySettingData.employeeDeductionFactorValueCaseEarlyDepartureStatus =
                      $event
                  "
                  :title="$t('activationStatus')"
                />
              </div>
            </div>

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeSalarySettingData.employeeBalancePlanToken"
                :options="employeeBalancesPlansTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/balances-plans.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeSalarySettingData.employeeAbsencePlanToken"
                :options="employeeAbsencePlansTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/absence-plans.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeSalarySettingData.employeeAllowancePlanToken"
                :options="employeeAllowancesPlansTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/allowances-plans.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="
                  employeeSalarySettingData.employeeMonthAllowancesPlanToken
                "
                :options="employeeMonthAllowancesPlansTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/month-allowances-plans.svg" />
            </div>

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeSalarySettingData.employeeOverTimePlanToken"
                :options="employeeOverTimePlansTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/overtime-plans.svg" />
            </div>

            <TextArea
              :className="'col-md-6'"
              :id="'employeeSalarySettingNotes'"
              :value="employeeSalarySettingData.employeeSalarySettingNotes"
              v-on:changeValue="
                employeeSalarySettingData.employeeSalarySettingNotes = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </div>
        </div>
      </b-collapse>

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
          @click.prevent="addOrUpdateEmployeeSalarySetting"
        >
          {{ submitName }}
        </button>

        <router-link
          v-if="submitName == $t('edit')"
          :to="`/employee-salary-settings/${employeeSalarySettingData.employeeToken}`"
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
                v-model="employeeSalarySettingData.employeeTokenList"
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
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import TextArea from "@/components/general/TextArea.vue";
import BalancesPlan from "@/models/settings/settingsSalary/balancesPlans/BalancesPlan";
import AllowancesPlan from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlan";
import MonthAllowancesPlan from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlan";
import AbsencePlan from "@/models/settings/settingsSalary/absencePlans/AbsencePlan";
import OverTimePlan from "@/models/settings/settingsSalary/overTimePlans/OverTimePlan";
import EmployeeFloatBtns from "@/components/employees/employees/EmployeeFloatBtns.vue";

export default {
  name: "EmployeeSalarySettingForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    DataLabelGroup,
    CustomCheckbox,
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

      balancesPlanData: new BalancesPlan(),
      absencePlanData: new AbsencePlan(),
      allowancesPlanData: new AllowancesPlan(),
      monthAllowancesPlanData: new MonthAllowancesPlan(),
      overTimePlanData: new OverTimePlan(),
      employeeBalancesPlansTokenOptions: [],
      employeeAbsencePlansTokenOptions: [],
      employeeAllowancesPlansTokenOptions: [],
      employeeMonthAllowancesPlansTokenOptions: [],
      employeeOverTimePlansTokenOptions: [],
    };
  },
  props: ["employeeSalarySettingData", "submitName"],
  methods: {
    selectAll() {
      this.allSelected = !this.allSelected;
      this.employeeSalarySettingData.employeeTokenList = [];

      if (this.allSelected) {
        for (let employee in this.employeesData) {
          this.employeeSalarySettingData.employeeTokenList.push(
            this.employeesData[employee].employeeToken
          );
        }
      }
    },
    select() {
      if (
        this.employeesData.length ==
        this.employeeSalarySettingData.employeeTokenList.length
      )
        this.allSelected = true;
      else this.allSelected = false;
    },
    search(text, employeeTypeToken) {
      this.textSearch = text;
      this.typeToken = employeeTypeToken;
      this.getAllEmployees();
    },
    async addOrUpdateEmployeeSalarySetting() {
      this.$emit("addOrUpdateEmployeeSalarySetting");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
    async getDialogOfBalancesPlans() {
      this.isLoading = true;
      this.employeeBalancesPlansTokenOptions = [];
      this.employeeBalancesPlansTokenOptions.push({
        value: "",
        text: this.$t("selectBalancesPlan"),
      });
      try {
        let response = await this.balancesPlanData.getDialogOfBalancesPlans(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeBalancesPlansTokenOptions.push({
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
    async getDialogOfAbsencePlans() {
      this.isLoading = true;
      this.employeeAbsencePlansTokenOptions = [];
      this.employeeAbsencePlansTokenOptions.push({
        value: "",
        text: this.$t("selectAbsencePlan"),
      });
      try {
        let response = await this.absencePlanData.getDialogOfAbsencePlans(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeAbsencePlansTokenOptions.push({
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
    async getDialogOfAllowancesPlans() {
      this.isLoading = true;
      this.employeeAllowancesPlansTokenOptions = [];
      this.employeeAllowancesPlansTokenOptions.push({
        value: "",
        text: this.$t("selectAllowancesPlan"),
      });
      try {
        let response = await this.allowancesPlanData.getDialogOfAllowancesPlans(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeAllowancesPlansTokenOptions.push({
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
    async getDialogOfMonthAllowancesPlans() {
      this.isLoading = true;
      this.employeeMonthAllowancesPlansTokenOptions = [];
      this.employeeMonthAllowancesPlansTokenOptions.push({
        value: "",
        text: this.$t("selectMonthAllowancesPlan"),
      });
      try {
        let response =
          await this.monthAllowancesPlanData.getDialogOfMonthAllowancesPlans(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeMonthAllowancesPlansTokenOptions.push({
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
    async getDialogOfOverTimePlans() {
      this.isLoading = true;
      this.employeeOverTimePlansTokenOptions = [];
      this.employeeOverTimePlansTokenOptions.push({
        value: "",
        text: this.$t("selectOverTimePlan"),
      });
      try {
        let response = await this.overTimePlanData.getDialogOfOverTimePlans(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeOverTimePlansTokenOptions.push({
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
    this.getDialogOfBalancesPlans();
    this.getDialogOfAbsencePlans();
    this.getDialogOfAllowancesPlans();
    this.getDialogOfMonthAllowancesPlans();
    this.getDialogOfOverTimePlans();
  },
};
</script>

<style lang="scss"></style>
