import Vue from "vue";
import VueRouter from "vue-router";
import { ifAuthenticated, ifNotAuthenticated } from "../utils/functions";
import i18n from "@/i18n/index.js";

import Test from "../views/user/Test.vue";
import Home from "../views/home/Home.vue";
import Login from "../views/user/Login.vue";
// import ForgetPassword from "../views/user/ForgetPassword.vue";

import EmployeesRoute from "./employees/employees";

import Reports from "../views/reports/Reports.vue";
import StatisticsRoute from "./statistics";

import Privileges from "../views/privileges/Privileges.vue";

import Branches from "../views/branches/Branches.vue";
import BranchAdd from "../views/branches/BranchAdd.vue";
import BranchEdit from "../views/branches/BranchEdit.vue";

import BranchesTimes from "../views/branchesTimes/BranchesTimes.vue";
import BranchTimeAdd from "../views/branchesTimes/BranchTimeAdd.vue";
import BranchTimeEdit from "../views/branchesTimes/BranchTimeEdit.vue";

import Treasuries from "../views/finance/treasuries/Treasuries.vue";
import TreasuryAdd from "../views/finance/treasuries/TreasuryAdd.vue";
import TreasuryEdit from "../views/finance/treasuries/TreasuryEdit.vue";

import ServicesReservations from "../views/servicesReservations/ServicesReservations.vue";
import ServicesReservationsCalendar from "../views/servicesReservations/ServicesReservationsCalendar.vue";
import ServicesReservationAdd from "../views/servicesReservations/ServicesReservationAdd.vue";

import ServicesPayments from "../views/servicesPayments/ServicesPayments.vue";

import ServicesReservationTreatmentPlans from "../views/servicesReservationTreatmentPlans/ServicesReservationTreatmentPlans.vue";
import ServicesReservationTreatmentPlanAdd from "../views/servicesReservationTreatmentPlans/ServicesReservationTreatmentPlanAdd.vue";

import News from "../views/news/News.vue";
import NewsAdd from "../views/news/NewsAdd.vue";
import NewsEdit from "../views/news/NewsEdit.vue";
import NewsItem from "../views/news/NewsItem.vue";

import Offers from "../views/offers/Offers.vue";
import OfferAdd from "../views/offers/OfferAdd.vue";
import OfferEdit from "../views/offers/OfferEdit.vue";
import OfferItem from "../views/offers/OfferItem.vue";

import TreasuriesTransactions from "../views/finance/treasuriesTransactions/TreasuriesTransactions.vue";
import TreasuryTransactionAdd from "../views/finance/treasuriesTransactions/TreasuryTransactionAdd.vue";

import Revenues from "../views/finance/revenues/Revenues.vue";
import RevenueAdd from "../views/finance/revenues/RevenueAdd.vue";

import Expenses from "../views/finance/expenses/Expenses.vue";
import ExpenseAdd from "../views/finance/expenses/ExpenseAdd.vue";

import ClientsOperations from "../views/clients/ClientsOperations.vue";

import Clients from "../views/clients/Clients.vue";
import ClientAdd from "../views/clients/ClientAdd.vue";
import ClientEdit from "../views/clients/ClientEdit.vue";

import SettingsBranch from "../views/settings/settingsBranch/SettingsBranch.vue";

import SettingsOther from "../views/settings/settingsOther/SettingsOther.vue";

import Sectors from "../views/settings/settingsOther/sectors/Sectors.vue";
import SectorsAdd from "../views/settings/settingsOther/sectors/SectorsAdd.vue";
import SectorsEdit from "../views/settings/settingsOther/sectors/SectorsEdit.vue";

import Jobs from "../views/settings/settingsOther/jobs/Jobs.vue";
import JobsAdd from "../views/settings/settingsOther/jobs/JobsAdd.vue";
import JobsEdit from "../views/settings/settingsOther/jobs/JobsEdit.vue";

import Qualifications from "../views/settings/settingsOther/qualifications/Qualifications.vue";
import QualificationsAdd from "../views/settings/settingsOther/qualifications/QualificationsAdd.vue";
import QualificationsEdit from "../views/settings/settingsOther/qualifications/QualificationsEdit.vue";

import RevenuesTypes from "../views/settings/settingsOther/revenuesTypes/RevenuesTypes.vue";
import RevenueTypeAdd from "../views/settings/settingsOther/revenuesTypes/RevenueTypeAdd.vue";
import RevenueTypeEdit from "../views/settings/settingsOther/revenuesTypes/RevenueTypeEdit.vue";

import ExpensesTypes from "../views/settings/settingsOther/expensesTypes/ExpensesTypes.vue";
import ExpenseTypeAdd from "../views/settings/settingsOther/expensesTypes/ExpenseTypeAdd.vue";
import ExpenseTypeEdit from "../views/settings/settingsOther/expensesTypes/ExpenseTypeEdit.vue";

import ServicesTypes from "../views/settings/settingsOther/servicesTypes/ServicesTypes.vue";
import ServicesTypeAdd from "../views/settings/settingsOther/servicesTypes/ServicesTypeAdd.vue";
import ServiceTypeEdit from "../views/settings/settingsOther/servicesTypes/ServiceTypeEdit.vue";

import BodyAnatomyTypes from "../views/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypes.vue";
import BodyAnatomyTypeAdd from "../views/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypeAdd.vue";
import BodyAnatomyTypeEdit from "../views/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypeEdit.vue";

import BodyAnatomies from "../views/settings/settingsOther/bodyAnatomies/BodyAnatomies.vue";
import BodyAnatomyAdd from "../views/settings/settingsOther/bodyAnatomies/BodyAnatomyAdd.vue";
import BodyAnatomyEdit from "../views/settings/settingsOther/bodyAnatomies/BodyAnatomyEdit.vue";

import Surgeries from "../views/settings/settingsOther/surgeries/Surgeries.vue";
import SurgeryAdd from "../views/settings/settingsOther/surgeries/SurgeryAdd.vue";
import SurgeryEdit from "../views/settings/settingsOther/surgeries/SurgeryEdit.vue";

import ActiveSubstances from "../views/settings/settingsOther/activeSubstances/ActiveSubstances.vue";
import ActiveSubstanceAdd from "../views/settings/settingsOther/activeSubstances/ActiveSubstanceAdd.vue";
import ActiveSubstanceEdit from "../views/settings/settingsOther/activeSubstances/ActiveSubstanceEdit.vue";

import Colors from "../views/settings/settingsOther/colors/Colors.vue";
import ColorAdd from "../views/settings/settingsOther/colors/ColorAdd.vue";
import ColorEdit from "../views/settings/settingsOther/colors/ColorEdit.vue";

import MealsTypes from "../views/settings/settingsOther/mealsTypes/MealsTypes.vue";
import MealsTypeAdd from "../views/settings/settingsOther/mealsTypes/MealsTypeAdd.vue";
import MealsTypeEdit from "../views/settings/settingsOther/mealsTypes/MealsTypeEdit.vue";

import QuestionsTypes from "../views/settings/settingsOther/questionsTypes/QuestionsTypes.vue";
import QuestionsTypeAdd from "../views/settings/settingsOther/questionsTypes/QuestionsTypeAdd.vue";
import QuestionsTypeEdit from "../views/settings/settingsOther/questionsTypes/QuestionsTypeEdit.vue";

import Meals from "../views/settings/settingsOther/meals/Meals.vue";
import MealAdd from "../views/settings/settingsOther/meals/MealAdd.vue";
import MealEdit from "../views/settings/settingsOther/meals/MealEdit.vue";

import Questions from "../views/settings/settingsOther/questions/Questions.vue";
import QuestionAdd from "../views/settings/settingsOther/questions/QuestionAdd.vue";
import QuestionEdit from "../views/settings/settingsOther/questions/QuestionEdit.vue";

import NewsCategories from "../views/settings/settingsOther/newsCategories/NewsCategories.vue";
import NewsCategoryAdd from "../views/settings/settingsOther/newsCategories/NewsCategoryAdd.vue";
import NewsCategoryEdit from "../views/settings/settingsOther/newsCategories/NewsCategoryEdit.vue";

import SpecialSpecialties from "../views/settings/settingsOther/specialSpecialties/SpecialSpecialties.vue";
import SpecialSpecialtyAdd from "../views/settings/settingsOther/specialSpecialties/SpecialSpecialtyAdd.vue";
import SpecialSpecialtyEdit from "../views/settings/settingsOther/specialSpecialties/SpecialSpecialtyEdit.vue";

import Services from "../views/settings/settingsOther/services/Services.vue";
import ServiceAdd from "../views/settings/settingsOther/services/ServiceAdd.vue";
import ServiceEdit from "../views/settings/settingsOther/services/ServiceEdit.vue";

// import SettingsSalary from "../views/settings/settingsSalary/SettingsSalary.vue";

// import WorkShifts from "../views/settings/settingsSalary/workShifts/WorkShifts.vue";
// import WorkShiftAdd from "../views/settings/settingsSalary/workShifts/WorkShiftAdd.vue";
// import WorkShiftEdit from "../views/settings/settingsSalary/workShifts/WorkShiftEdit.vue";

// import WorkPlans from "../views/settings/settingsSalary/workPlans/WorkPlans.vue";
// import WorkPlanAdd from "../views/settings/settingsSalary/workPlans/WorkPlanAdd.vue";
// import WorkPlanEdit from "../views/settings/settingsSalary/workPlans/WorkPlanEdit.vue";

// import WorkPlanDays from "../views/settings/settingsSalary/workPlanDays/WorkPlanDays.vue";

// import SalaryEffects from "../views/settings/settingsSalary/salaryEffects/SalaryEffects.vue";
// import SalaryEffectAdd from "../views/settings/settingsSalary/salaryEffects/SalaryEffectAdd.vue";
// import SalaryEffectEdit from "../views/settings/settingsSalary/salaryEffects/SalaryEffectEdit.vue";

// import OfficialHolidays from "../views/settings/settingsSalary/officialHolidays/OfficialHolidays.vue";
// import OfficialHolidayAdd from "../views/settings/settingsSalary/officialHolidays/OfficialHolidayAdd.vue";
// import OfficialHolidayEdit from "../views/settings/settingsSalary/officialHolidays/OfficialHolidayEdit.vue";

// import BalancesPlans from "../views/settings/settingsSalary/balancesPlans/BalancesPlans.vue";
// import BalancesPlanAdd from "../views/settings/settingsSalary/balancesPlans/BalancesPlanAdd.vue";
// import BalancesPlanEdit from "../views/settings/settingsSalary/balancesPlans/BalancesPlanEdit.vue";
// import BalancesPlanDetails from "../views/settings/settingsSalary/balancesPlans/BalancesPlanDetails.vue";
// import BalancesPlanDetailsAdd from "../views/settings/settingsSalary/balancesPlans/BalancesPlanDetailsAdd.vue";
// import BalancesPlanDetailsEdit from "../views/settings/settingsSalary/balancesPlans/BalancesPlanDetailsEdit.vue";

// import Allowances from "../views/settings/settingsSalary/allowances/Allowances.vue";
// import AllowanceAdd from "../views/settings/settingsSalary/allowances/AllowanceAdd.vue";
// import AllowanceEdit from "../views/settings/settingsSalary/allowances/AllowanceEdit.vue";

// import AllowancesPlans from "../views/settings/settingsSalary/allowancesPlans/AllowancesPlans.vue";
// import AllowancesPlanAdd from "../views/settings/settingsSalary/allowancesPlans/AllowancesPlanAdd.vue";
// import AllowancesPlanEdit from "../views/settings/settingsSalary/allowancesPlans/AllowancesPlanEdit.vue";
// import AllowancesPlanDetails from "../views/settings/settingsSalary/allowancesPlans/AllowancesPlanDetails.vue";
// import AllowancesPlanDetailsAdd from "../views/settings/settingsSalary/allowancesPlans/AllowancesPlanDetailsAdd.vue";
// import AllowancesPlanDetailsEdit from "../views/settings/settingsSalary/allowancesPlans/AllowancesPlanDetailsEdit.vue";

// import MonthAllowancesPlans from "../views/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlans.vue";
// import MonthAllowancesPlanAdd from "../views/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanAdd.vue";
// import MonthAllowancesPlanEdit from "../views/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanEdit.vue";
// import MonthAllowancesPlanDetails from "../views/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetails.vue";
// import MonthAllowancesPlanDetailsAdd from "../views/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetailsAdd.vue";
// import MonthAllowancesPlanDetailsEdit from "../views/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlanDetailsEdit.vue";

// import OverTimePlans from "../views/settings/settingsSalary/overTimePlans/OverTimePlans.vue";
// import OverTimePlanAdd from "../views/settings/settingsSalary/overTimePlans/OverTimePlanAdd.vue";
// import OverTimePlanEdit from "../views/settings/settingsSalary/overTimePlans/OverTimePlanEdit.vue";
// import OverTimePlanDetails from "../views/settings/settingsSalary/overTimePlans/OverTimePlanDetails.vue";

// import AbsencePlans from "../views/settings/settingsSalary/absencePlans/AbsencePlans.vue";
// import AbsencePlanAdd from "../views/settings/settingsSalary/absencePlans/AbsencePlanAdd.vue";
// import AbsencePlanEdit from "../views/settings/settingsSalary/absencePlans/AbsencePlanEdit.vue";
// import AbsencePlanDetails from "../views/settings/settingsSalary/absencePlans/AbsencePlanDetails.vue";

// import MainColumns from "../views/settings/settingsSalary/mainColumns/MainColumns.vue";
// import MainColumnAdd from "../views/settings/settingsSalary/mainColumns/MainColumnAdd.vue";
// import MainColumnEdit from "../views/settings/settingsSalary/mainColumns/MainColumnEdit.vue";

// import InsurancesPlans from "../views/settings/settingsSalary/insurancesPlans/InsurancesPlans.vue";
// import InsurancesPlanAdd from "../views/settings/settingsSalary/insurancesPlans/InsurancesPlanAdd.vue";
// import InsurancesPlanEdit from "../views/settings/settingsSalary/insurancesPlans/InsurancesPlanEdit.vue";
// import InsurancesPlanDetails from "../views/settings/settingsSalary/insurancesPlans/InsurancesPlanDetails.vue";
// import InsurancesPlanDetailsAdd from "../views/settings/settingsSalary/insurancesPlans/InsurancesPlanDetailsAdd.vue";
// import InsurancesPlanDetailsEdit from "../views/settings/settingsSalary/insurancesPlans/InsurancesPlanDetailsEdit.vue";

// import OfficialHolidaysPlans from "../views/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlans.vue";
// import OfficialHolidaysPlanAdd from "../views/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanAdd.vue";
// import OfficialHolidaysPlanEdit from "../views/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanEdit.vue";
// import OfficialHolidaysPlanDetails from "../views/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetails.vue";
// import OfficialHolidaysPlanDetailsAdd from "../views/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetailsAdd.vue";
// import OfficialHolidaysPlanDetailsEdit from "../views/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDetailsEdit.vue";

// import CalculatePayroll from "../views/settings/settingsSalary/calculatePayroll/CalculatePayroll.vue";

import Buildings from "../views/settings/settingsBranch/buildings/Buildings.vue";
import BuildingAdd from "../views/settings/settingsBranch/buildings/BuildingAdd.vue";
import BuildingEdit from "../views/settings/settingsBranch/buildings/BuildingEdit.vue";

import Floors from "../views/settings/settingsBranch/floors/Floors.vue";
import FloorAdd from "../views/settings/settingsBranch/floors/FloorAdd.vue";
import FloorEdit from "../views/settings/settingsBranch/floors/FloorEdit.vue";

import Chambers from "../views/settings/settingsBranch/chambers/Chambers.vue";
import ChamberAdd from "../views/settings/settingsBranch/chambers/ChamberAdd.vue";
import ChamberEdit from "../views/settings/settingsBranch/chambers/ChamberEdit.vue";

import Offices from "../views/settings/settingsBranch/offices/Offices.vue";
import OfficeAdd from "../views/settings/settingsBranch/offices/OfficeAdd.vue";
import OfficeEdit from "../views/settings/settingsBranch/offices/OfficeEdit.vue";

import OfficesTimes from "../views/settings/settingsBranch/officesTimes/OfficesTimes.vue";
import OfficesTimeAdd from "../views/settings/settingsBranch/officesTimes/OfficesTimeAdd.vue";
import OfficesTimeEdit from "../views/settings/settingsBranch/officesTimes/OfficesTimeEdit.vue";

import MedicinesTypes from "../views/settings/settingsOther/medicinesTypes/MedicinesTypes.vue";
import MedicinesTypeAdd from "../views/settings/settingsOther/medicinesTypes/MedicinesTypeAdd.vue";
import MedicinesTypeEdit from "../views/settings/settingsOther/medicinesTypes/MedicinesTypeEdit.vue";

import Medicines from "../views/settings/settingsOther/medicines/Medicines.vue";
import MedicineAdd from "../views/settings/settingsOther/medicines/MedicineAdd.vue";
import MedicineEdit from "../views/settings/settingsOther/medicines/MedicineEdit.vue";

import Requirements from "../views/settings/settingsOther/requirements/Requirements.vue";
import RequirementAdd from "../views/settings/settingsOther/requirements/RequirementAdd.vue";
import RequirementEdit from "../views/settings/settingsOther/requirements/RequirementEdit.vue";

import AddictiveStuffs from "../views/settings/settingsOther/addictiveStuffs/AddictiveStuffs.vue";
import AddictiveStuffAdd from "../views/settings/settingsOther/addictiveStuffs/AddictiveStuffAdd.vue";
import AddictiveStuffEdit from "../views/settings/settingsOther/addictiveStuffs/AddictiveStuffEdit.vue";

import BloodTypes from "../views/settings/settingsOther/bloodTypes/BloodTypes.vue";
import BloodTypeAdd from "../views/settings/settingsOther/bloodTypes/BloodTypeAdd.vue";
import BloodTypeEdit from "../views/settings/settingsOther/bloodTypes/BloodTypeEdit.vue";

import MethodPaids from "../views/settings/settingsOther/methodPaids/MethodPaids.vue";
import MethodPaidAdd from "../views/settings/settingsOther/methodPaids/MethodPaidAdd.vue";
import MethodPaidEdit from "../views/settings/settingsOther/methodPaids/MethodPaidEdit.vue";

import ScientificDegrees from "../views/settings/settingsOther/scientificDegrees/ScientificDegrees.vue";
import ScientificDegreeAdd from "../views/settings/settingsOther/scientificDegrees/ScientificDegreeAdd.vue";
import ScientificDegreeEdit from "../views/settings/settingsOther/scientificDegrees/ScientificDegreeEdit.vue";

import Countries from "../views/settings/settingsOther/countries/Countries.vue";
import CountryAdd from "../views/settings/settingsOther/countries/CountryAdd.vue";
import CountryEdit from "../views/settings/settingsOther/countries/CountryEdit.vue";

import Governates from "../views/settings/settingsOther/governates/Governates.vue";
import GovernateAdd from "../views/settings/settingsOther/governates/GovernateAdd.vue";
import GovernateEdit from "../views/settings/settingsOther/governates/GovernateEdit.vue";

import Cities from "../views/settings/settingsOther/cities/Cities.vue";
import CityAdd from "../views/settings/settingsOther/cities/CityAdd.vue";
import CityEdit from "../views/settings/settingsOther/cities/CityEdit.vue";

import Districts from "../views/settings/settingsOther/districts/Districts.vue";
import DistrictAdd from "../views/settings/settingsOther/districts/DistrictAdd.vue";
import DistrictEdit from "../views/settings/settingsOther/districts/DistrictEdit.vue";

import InsuranceCompanies from "../views/settings/settingsOther/insuranceCompanies/InsuranceCompanies.vue";
import InsuranceCompanyAdd from "../views/settings/settingsOther/insuranceCompanies/InsuranceCompanyAdd.vue";
import InsuranceCompanyEdit from "../views/settings/settingsOther/insuranceCompanies/InsuranceCompanyEdit.vue";

import InsuranceCompanyServices from "../views/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServices.vue";
import InsuranceCompanyServiceAdd from "../views/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServiceAdd.vue";
import InsuranceCompanyServiceEdit from "../views/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServiceEdit.vue";

import ServiceResponsibleBonuses from "../views/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonuses.vue";
import ServiceResponsibleBonuseEdit from "../views/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonuseEdit.vue";

import ServicesReservationEmployeeBenefits from "../views/servicesReservationEmployeeBenefits/ServicesReservationEmployeeBenefits.vue";

import MedicalInsuranceLevels from "../views/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevels.vue";
import MedicalInsuranceLevelAdd from "../views/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelAdd.vue";
import MedicalInsuranceLevelEdit from "../views/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelEdit.vue";

import Notifications from "../views/notifications/Notifications.vue";

import HistoricalPlansRoutes from "./historicalPlans/historicalPlans";
import PointsAndWalletsRoutes from "./pointsAndWallets/pointsAndWallets";
import ServicesReservationAddedServicesRoutes from "./servicesReservationAddedServices";

import ReservationsMedias from "../views/reservationsMedias/ReservationsMedias.vue";
import ReservationMediaAdd from "../views/reservationsMedias/ReservationMediaAdd.vue";
import ReservationMediaEdit from "../views/reservationsMedias/ReservationMediaEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/test",
    name: "Test",
    component: Test,
    meta: {
      pageName: i18n.t("homePage"),
      pageIcon: "homepage.svg",
      currentPage: "home",
      currentSubPage: "",
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated,
    meta: {
      pageName: i18n.t("homePage"),
      pageIcon: "homepage.svg",
      currentPage: "home",
      currentSubPage: "",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifAuthenticated,
    meta: {
      pageName: i18n.t("login"),
      pageIcon: "homepage.svg",
      currentPage: "home",
      currentSubPage: "",
    },
  },
  // {
  //   path: "/forget-password",
  //   name: "ForgetPassword",
  //   component: ForgetPassword,
  //   beforeEnter: ifAuthenticated,
  // },

  ...EmployeesRoute,

  // {
  //   path: "/employee-salary-settings/:employeeToken",
  //   name: "EmployeeSalarySettings",
  //   component: () => import("../views/employees/employeeSalarySettings/EmployeeSalarySettings.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("EmployeeSalarySetting"),
  //     pageIcon: "employee-salary-setting.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employees",
  //   },
  // },
  // {
  //   path: "/add-employee-salary-setting",
  //   name: "EmployeeSalarySettingAdd",
  //   component: () => import("../views/employees/employeeSalarySettings/EmployeeSalarySettingAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("EmployeeSalarySettingAdd"),
  //     pageIcon: "employee-salary-setting.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeeSalarySetting",
  //   },
  // },
  // {
  //   path: "/edit-employee-salary-setting/:employeeSalarySettingToken",
  //   name: "EmployeeSalarySettingEdit",
  //   component: () => import("../views/employees/employeeSalarySettings/EmployeeSalarySettingEdit.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("EmployeeSalarySettingEdit"),
  //     pageIcon: "employee-salary-setting.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeeSalarySetting",
  //   },
  // },

  // {
  //   path: "/employee-work-schedules/:employeeToken",
  //   name: "EmployeeWorkSchedules",
  //   component: () => import("../views/employees/employeeWorkSchedules/EmployeeWorkSchedules.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("EmployeeWorkSchedule"),
  //     pageIcon: "work-schedule.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employees",
  //   },
  // },
  // {
  //   path: "/add-employee-work-schedule",
  //   name: "EmployeeWorkScheduleAdd",
  //   component: () => import("../views/employees/employeeWorkSchedules/EmployeeWorkScheduleAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("EmployeeWorkScheduleAdd"),
  //     pageIcon: "work-schedule.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeeWorkSchedule",
  //   },
  // },

  // {
  //   path: "/employee-official-holidays-plans/:employeeToken",
  //   name: "EmployeeOfficialHolidaysPlans",
  //   component: () => import("../views/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlans.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("EmployeeOfficialHolidaysPlans"),
  //     pageIcon: "holiday.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employees",
  //   },
  // },
  // {
  //   path: "/add-employee-official-holidays-plan",
  //   name: "EmployeeOfficialHolidaysPlanAdd",
  //   component: () => import("../views/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlanAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("EmployeeOfficialHolidaysPlanAdd"),
  //     pageIcon: "holiday.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeeOfficialHolidaysPlan",
  //   },
  // },

  // {
  //   path: "/employees-input-sheets-attendance",
  //   name: "EmployeesInputSheetsAttendance",
  //   component: () => import("../views/employees/employeesInputSheetsAttendance/EmployeesInputSheetsAttendance.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("employeesInputSheetsAttendance"),
  //     pageIcon: "sheets.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeesInputSheetsAttendance",
  //   },
  // },
  // {
  //   path: "/add-employees-input-sheet-attendance",
  //   name: "EmployeesInputSheetAttendanceAdd",
  //   component: () => import("../views/employees/employeesInputSheetsAttendance/EmployeesInputSheetAttendanceAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("employeesInputSheetAttendanceAdd"),
  //     pageIcon: "sheets.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeesInputSheetsAttendance",
  //   },
  // },

  // {
  //   path: "/employees-input-sheet-attendance-merges",
  //   name: "EmployeesInputSheetAttendanceMerges",
  //   component: () => import("../views/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMerges.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("employeesInputSheetAttendanceMerges"),
  //     pageIcon: "merge.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeesInputSheetAttendanceMerges",
  //   },
  // },
  // {
  //   path: "/add-employees-input-sheet-attendance-merge",
  //   name: "EmployeesInputSheetAttendanceMergeAdd",
  //   component: () => import("../views/employees/employeesInputSheetAttendanceMerges/EmployeesInputSheetAttendanceMergeAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("employeesInputSheetAttendanceMergeAdd"),
  //     pageIcon: "merge.svg",
  //     currentPage: "theEmployees",
  //     currentSubPage: "employeesInputSheetAttendanceMerges",
  //   },
  // },

  // {
  //   path: "/attendance-employee/:employeeToken",
  //   name: "EmployeeAttendance",
  //   component: () => import("../views/employeesAttendance/EmployeeAttendance.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("attendanceHistory"),
  //     pageIcon: "attendance.svg",
  //     currentPage: "employeeAttendance",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/add-attendance-employee/:employeeToken",
  //   name: "EmployeeAttendanceAdd",
  //   component: () => import("../views/employeesAttendance/EmployeeAttendanceAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("attendanceAdd"),
  //     pageIcon: "plus.svg",
  //     currentPage: "employeeAttendance",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/edit-attendance-employee/:employeeToken/:attendanceToken",
  //   name: "EmployeeAttendanceEdit",
  //   component: () => import("../views/employeesAttendance/EmployeeAttendanceEdit.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("attendanceEdit"),
  //     pageIcon: "pencil.svg",
  //     currentPage: "employeeAttendance",
  //     currentSubPage: "",
  //   },
  // },

  // {
  //   path: "/movement-employee/:attendanceToken",
  //   name: "EmployeeMovement",
  //   component: () => import("../views/employeesMovement/EmployeeMovement.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("employeeMovement"),
  //     pageIcon: "address.svg",
  //     currentPage: "employeeMovement",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/add-movement-employee/:attendanceToken",
  //   name: "EmployeeMovementAdd",
  //   component: () => import("../views/employeesMovement/EmployeeMovementAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("movementAdd"),
  //     pageIcon: "plus.svg",
  //     currentPage: "employeeMovement",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/edit-movement-employee/:attendanceToken/:movementToken",
  //   name: "EmployeeMovementEdit",
  //   component: () => import("../views/employeesMovement/EmployeeMovementEdit.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("movementEdit"),
  //     pageIcon: "pencil.svg",
  //     currentPage: "employeeMovement",
  //     currentSubPage: "",
  //   },
  // },

  // {
  //   path: "/employee-movement-media/:movementToken",
  //   name: "EmployeeMovementMedia",
  //   component: () => import("../views/employeesMovementMedia/EmployeeMovementMedia.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("media"),
  //     pageIcon: "media.svg",
  //     currentPage: "employeeMovementMedia",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/employee-movement-media-info/:movementMediaToken",
  //   name: "EmployeeMovementMediaInfo",
  //   component: () => import("../views/employeesMovementMedia/EmployeeMovementMediaInfo.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("media"),
  //     pageIcon: "media.svg",
  //     currentPage: "employeeMovementMedia",
  //     currentSubPage: "",
  //   },
  // },

  // {
  //   path: "/attendance-history",
  //   name: "AttendanceHistory",
  //   component: () => import("../views/attendance/AttendanceHistory.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("attendanceAndDepartureHistory"),
  //     pageIcon: "attendanceHistory.svg",
  //     currentPage: "attendance",
  //     currentSubPage: "attendance-history",
  //   },
  // },
  // {
  //   path: "/add-attendance",
  //   name: "AttendanceAttend",
  //   component: () => import("../views/attendance/AttendanceAttend.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("checkIn"),
  //     pageIcon: "add-attendance.svg",
  //     currentPage: "attendance",
  //     currentSubPage: "add-attendance",
  //   },
  // },
  // {
  //   path: "/add-departure",
  //   name: "AttendanceDeparture",
  //   component: () => import("../views/attendance/AttendanceDeparture.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("checkOut"),
  //     pageIcon: "add-departure.svg",
  //     currentPage: "attendance",
  //     currentSubPage: "add-departure",
  //   },
  // },

  // {
  //   path: "/points",
  //   name: "Points",
  //   component: () => import("../views/points/Points.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("points"),
  //     pageIcon: "points.svg",
  //     currentPage: "points",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/employee-points/:employeeToken",
  //   name: "EmployeePoints",
  //   component: () => import("../views/points/EmployeePoints.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("employeePoints"),
  //     pageIcon: "points.svg",
  //     currentPage: "employeePoints",
  //     currentSubPage: "",
  //   },
  // },

  // {
  //   path: "/employee-slices/:employeeToken",
  //   name: "EmployeeSlices",
  //   component: () => import("../views/slices/EmployeeSlices.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("slices"),
  //     pageIcon: "slices.svg",
  //     currentPage: "employeeSlices",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/add-employee-slice/:employeeToken",
  //   name: "EmployeeSlicesAdd",
  //   component: () => import("../views/slices/EmployeeSlicesAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("addSlice"),
  //     pageIcon: "slices.svg",
  //     currentPage: "employeeSlices",
  //     currentSubPage: "",
  //   },
  // },

  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("reports"),
      pageIcon: "reports.svg",
      currentPage: "reportsAndStatistics",
      currentSubPage: "reports",
    },
  },
  ...StatisticsRoute,

  {
    path: "/privileges",
    name: "Privileges",
    component: Privileges,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("privileges"),
      pageIcon: "privileges.svg",
      currentPage: "theEmployees",
      currentSubPage: "privileges",
    },
  },

  {
    path: "/branches",
    name: "Branches",
    component: Branches,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("theBranches"),
      pageIcon: "branches.svg",
      currentPage: "branches",
      currentSubPage: "branches",
    },
  },
  {
    path: "/add-branch",
    name: "BranchAdd",
    component: BranchAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("branchAdd"),
      pageIcon: "branches.svg",
      currentPage: "branches",
      currentSubPage: "branches",
    },
  },
  {
    path: "/edit-branch/:branchToken",
    name: "BranchEdit",
    component: BranchEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("branchEdit"),
      pageIcon: "branches.svg",
      currentPage: "branches",
      currentSubPage: "branches",
    },
  },

  {
    path: "/branches-times",
    name: "BranchesTimes",
    component: BranchesTimes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("branchesTimes"),
      pageIcon: "time.svg",
      currentPage: "branches",
      currentSubPage: "",
    },
  },
  {
    path: "/add-branch-time",
    name: "BranchTimeAdd",
    component: BranchTimeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("branchTimeAdd"),
      pageIcon: "time.svg",
      currentPage: "branches",
      currentSubPage: "",
    },
  },
  {
    path: "/edit-branch-time/:branchTimeToken",
    name: "BranchTimeEdit",
    component: BranchTimeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("branchTimeEdit"),
      pageIcon: "time.svg",
      currentPage: "branches",
      currentSubPage: "",
    },
  },

  // {
  //   path: "/stores",
  //   name: "Stores",
  //   component: () => import("../views/stores/Stores.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("theStores"),
  //     pageIcon: "stores.svg",
  //     currentPage: "stores",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/add-store",
  //   name: "StoreAdd",
  //   component: () => import("../views/stores/StoreAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("storeAdd"),
  //     pageIcon: "stores.svg",
  //     currentPage: "stores",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/edit-store/:storeToken",
  //   name: "StoreEdit",
  //   component: () => import("../views/stores/StoreEdit.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("storeEdit"),
  //     pageIcon: "stores.svg",
  //     currentPage: "stores",
  //     currentSubPage: "",
  //   },
  // },

  // {
  //   path: "/stores-times",
  //   name: "StoresTimes",
  //   component: () => import("../views/storesTimes/StoresTimes.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("storesTimes"),
  //     pageIcon: "time.svg",
  //     currentPage: "stores",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/add-store-time",
  //   name: "StoreTimeAdd",
  //   component: () => import("../views/storesTimes/StoreTimeAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("storeTimeAdd"),
  //     pageIcon: "time.svg",
  //     currentPage: "stores",
  //     currentSubPage: "",
  //   },
  // },
  // {
  //   path: "/edit-store-time/:storeTimeToken",
  //   name: "StoreTimeEdit",
  //   component: () => import("../views/storesTimes/StoreTimeEdit.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("storeTimeEdit"),
  //     pageIcon: "time.svg",
  //     currentPage: "stores",
  //     currentSubPage: "",
  //   },
  // },

  {
    path: "/treasuries",
    name: "Treasuries",
    component: Treasuries,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("theTreasuries"),
      pageIcon: "treasuries.svg",
      currentPage: "finance",
      currentSubPage: "treasuries",
    },
  },
  {
    path: "/add-treasury",
    name: "TreasuryAdd",
    component: TreasuryAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("treasuryAdd"),
      pageIcon: "treasuries.svg",
      currentPage: "finance",
      currentSubPage: "treasuries",
    },
  },
  {
    path: "/edit-treasury/:treasuryToken",
    name: "TreasuryEdit",
    component: TreasuryEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("treasuryEdit"),
      pageIcon: "treasuries.svg",
      currentPage: "finance",
      currentSubPage: "treasuries",
    },
  },

  {
    path: "/services-reservations/",
    name: "ServicesReservations",
    component: ServicesReservations,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("servicesReservations"),
      pageIcon: "services-reservations.svg",
      currentPage: "reservations-payments",
      currentSubPage: "services-reservations",
    },
  },
  {
    path: "/services-reservations-calendar/",
    name: "ServicesReservationsCalendar",
    component: ServicesReservationsCalendar,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("ServicesReservationsCalendar.modelName"),
      pageIcon: "ServicesReservationsCalendar.svg",
      currentPage: "reservations-payments",
      currentSubPage: "ServicesReservationsCalendar",
    },
  },
  {
    path: "/add-services-reservation",
    name: "ServicesReservationAdd",
    component: ServicesReservationAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("servicesReservationAdd"),
      pageIcon: "services-reservations.svg",
      currentPage: "reservations-payments",
      currentSubPage: "services-reservations",
    },
  },

  {
    path: "/services-payments/:clientToken?/:reservationToken?",
    name: "ServicesPayments",
    component: ServicesPayments,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("servicesPayments"),
      pageIcon: "services-payments.svg",
      currentPage: "reservations-payments",
      currentSubPage: "services-payments",
    },
  },

  {
    path: "/treatments-reservation/:clientToken?/:reservationToken?",
    name: "ServicesReservationTreatmentPlans",
    component: ServicesReservationTreatmentPlans,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("homePage"),
      pageIcon: "homepage.svg",
      currentPage: "reservations-payments",
      currentSubPage: "services-reservations",
    },
  },
  {
    path: "/add-treatments-reservation/:clientToken?/:reservationToken?",
    name: "ServicesReservationTreatmentPlanAdd",
    component: ServicesReservationTreatmentPlanAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("homePage"),
      pageIcon: "homepage.svg",
      currentPage: "reservations-payments",
      currentSubPage: "services-reservations",
    },
  },

  {
    path: "/news",
    name: "News",
    component: News,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("news"),
      pageIcon: "news.svg",
      currentPage: "news",
      currentSubPage: "",
    },
  },
  {
    path: "/add-news",
    name: "NewsAdd",
    component: NewsAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("newsAdd"),
      pageIcon: "news.svg",
      currentPage: "news",
      currentSubPage: "",
    },
  },
  {
    path: "/edit-news/:newsToken",
    name: "NewsEdit",
    component: NewsEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("newsEdit"),
      pageIcon: "news.svg",
      currentPage: "news",
      currentSubPage: "",
    },
  },
  {
    path: "/news-item/:newsToken",
    name: "NewsItem",
    component: NewsItem,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("info"),
      pageIcon: "news.svg",
      currentPage: "news",
      currentSubPage: "",
    },
  },

  {
    path: "/offers",
    name: "Offers",
    component: Offers,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("offers"),
      pageIcon: "offers.svg",
      currentPage: "offers",
      currentSubPage: "",
    },
  },
  {
    path: "/add-offer",
    name: "OfferAdd",
    component: OfferAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("offerAdd"),
      pageIcon: "offers.svg",
      currentPage: "offers",
      currentSubPage: "",
    },
  },
  {
    path: "/edit-offer/:offerToken",
    name: "OfferEdit",
    component: OfferEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("offerEdit"),
      pageIcon: "offers.svg",
      currentPage: "offers",
      currentSubPage: "",
    },
  },
  {
    path: "/offer-item/:offerToken",
    name: "OfferItem",
    component: OfferItem,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("info"),
      pageIcon: "offers.svg",
      currentPage: "offers",
      currentSubPage: "",
    },
  },

  {
    path: "/treasuries-transactions",
    name: "TreasuriesTransactions",
    component: TreasuriesTransactions,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("treasuriesTransactions"),
      pageIcon: "treasuries-transactions.svg",
      currentPage: "finance",
      currentSubPage: "treasuries-transactions",
    },
  },
  {
    path: "/add-treasury-transaction",
    name: "TreasuryTransactionAdd",
    component: TreasuryTransactionAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("treasuryTransactionAdd"),
      pageIcon: "treasuries-transactions.svg",
      currentPage: "finance",
      currentSubPage: "treasuries-transactions",
    },
  },

  {
    path: "/revenues",
    name: "Revenues",
    component: Revenues,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("revenues"),
      pageIcon: "revenues.svg",
      currentPage: "finance",
      currentSubPage: "revenues",
    },
  },
  {
    path: "/add-revenue",
    name: "RevenueAdd",
    component: RevenueAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("revenueAdd"),
      pageIcon: "revenues.svg",
      currentPage: "finance",
      currentSubPage: "revenues",
    },
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: Expenses,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("expenses"),
      pageIcon: "expenses.svg",
      currentPage: "finance",
      currentSubPage: "expenses",
    },
  },
  {
    path: "/add-expense",
    name: "ExpenseAdd",
    component: ExpenseAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("expenseAdd"),
      pageIcon: "expenses.svg",
      currentPage: "finance",
      currentSubPage: "expenses",
    },
  },

  {
    path: "/clients-operations",
    name: "ClientsOperations",
    component: ClientsOperations,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("clientsOperations"),
      pageIcon: "medical-operations.svg",
      currentPage: "theClients",
      currentSubPage: "clientsOperations",
    },
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("clients"),
      pageIcon: "clients.svg",
      currentPage: "theClients",
      currentSubPage: "clients",
    },
  },
  {
    path: "/add-client",
    name: "ClientAdd",
    component: ClientAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("clientAdd"),
      pageIcon: "clients.svg",
      currentPage: "theClients",
      currentSubPage: "clients",
    },
  },
  {
    path: "/edit-client/:clientToken",
    name: "ClientEdit",
    component: ClientEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("clientEdit"),
      pageIcon: "clients.svg",
      currentPage: "theClients",
      currentSubPage: "clients",
    },
  },

  {
    path: "/settings-branch",
    name: "SettingsBranch",
    component: SettingsBranch,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("settingsBranch"),
      pageIcon: "branches.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },

  // {
  //   path: "/settings-establishment",
  //   name: "SettingsEstablishment",
  //   component: () => import("../views/settings/settingsEstablishment/SettingsEstablishment.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("settings-establishment"),
  //     pageIcon: "settings-establishment.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-establishment",
  //   },
  // },

  // {
  //   path: "/months-establishment-settings",
  //   name: "MonthsEstablishmentSettings",
  //   component: () => import("../views/settings/settingsEstablishment/monthsSettings/MonthsEstablishmentSettings.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("establishmentMonthsSettings"),
  //     pageIcon: "months-settings.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-establishment",
  //   },
  // },
  // {
  //   path: "/add-months-establishment-setting",
  //   name: "MonthsEstablishmentSettingAdd",
  //   component: () => import("../views/settings/settingsEstablishment/monthsSettings/MonthsEstablishmentSettingAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("establishmentMonthsSettingAdd"),
  //     pageIcon: "months-settings.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-establishment",
  //   },
  // },

  // {
  //   path: "/year-establishment-settings",
  //   name: "EstablishmentYearSettings",
  //   component: () => import("../views/settings/settingsEstablishment/yearSettings/EstablishmentYearSettings.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("establishmentYearSettings"),
  //     pageIcon: "year-settings.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-establishment",
  //   },
  // },
  // {
  //   path: "/add-year-establishment-setting",
  //   name: "EstablishmentYearSettingAdd",
  //   component: () => import("../views/settings/settingsEstablishment/yearSettings/EstablishmentYearSettingAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("establishmentYearSettingAdd"),
  //     pageIcon: "year-settings.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-establishment",
  //   },
  // },
  // {
  //   path: "/edit-year-establishment-setting/:establishmentYearSettingToken",
  //   name: "EstablishmentYearSettingEdit",
  //   component: () => import("../views/settings/settingsEstablishment/yearSettings/EstablishmentYearSettingEdit.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("establishmentYearSettingEdit"),
  //     pageIcon: "year-settings.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-establishment",
  //   },
  // },

  {
    path: "/settings-other",
    name: "SettingsOther",
    component: SettingsOther,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("settings-other"),
      pageIcon: "settings-other.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/sectors",
    name: "Sectors",
    component: Sectors,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("sectors"),
      pageIcon: "sectors.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-sector",
    name: "SectorsAdd",
    component: SectorsAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("add"),
      pageIcon: "sectors.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-sector/:sectorToken",
    name: "SectorsEdit",
    component: SectorsEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("edit"),
      pageIcon: "sectors.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("jobs"),
      pageIcon: "jobs.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-job",
    name: "JobsAdd",
    component: JobsAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("add"),
      pageIcon: "jobs.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-job/:jobToken",
    name: "JobsEdit",
    component: JobsEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("edit"),
      pageIcon: "jobs.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/qualifications",
    name: "Qualifications",
    component: Qualifications,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("qualifications"),
      pageIcon: "qualifications.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-qualification",
    name: "QualificationsAdd",
    component: QualificationsAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("add"),
      pageIcon: "qualifications.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-qualification/:qualificationToken",
    name: "QualificationsEdit",
    component: QualificationsEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("edit"),
      pageIcon: "qualifications.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/revenues-types",
    name: "RevenuesTypes",
    component: RevenuesTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("revenuesTypes"),
      pageIcon: "revenues-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-revenue-type",
    name: "RevenueTypeAdd",
    component: RevenueTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("revenueTypeAdd"),
      pageIcon: "revenues-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-revenue-type/:revenuesTypeToken",
    name: "RevenueTypeEdit",
    component: RevenueTypeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("revenueTypeEdit"),
      pageIcon: "revenues-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/expenses-types",
    name: "ExpensesTypes",
    component: ExpensesTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("expensesTypes"),
      pageIcon: "expenses-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-expense-type",
    name: "ExpenseTypeAdd",
    component: ExpenseTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("expenseTypeAdd"),
      pageIcon: "expenses-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-expense-type/:expensesTypeToken",
    name: "ExpenseTypeEdit",
    component: ExpenseTypeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("expenseTypeEdit"),
      pageIcon: "expenses-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/services-types",
    name: "ServicesTypes",
    component: ServicesTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("servicesTypes"),
      pageIcon: "services-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-services-type",
    name: "ServicesTypeAdd",
    component: ServicesTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("servicesTypeAdd"),
      pageIcon: "services-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-services-type/:serviceTypeToken",
    name: "ServiceTypeEdit",
    component: ServiceTypeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("servicesTypeEdit"),
      pageIcon: "services-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/body-anatomy-types",
    name: "BodyAnatomyTypes",
    component: BodyAnatomyTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bodyAnatomyTypes.modelName"),
      pageIcon: "anatomy-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-body-anatomy-type",
    name: "BodyAnatomyTypeAdd",
    component: BodyAnatomyTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bodyAnatomyTypes.add"),
      pageIcon: "anatomy-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-body-anatomy-type/:bodyAnatomyTypeToken",
    name: "BodyAnatomyTypeEdit",
    component: BodyAnatomyTypeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bodyAnatomyTypes.edit"),
      pageIcon: "anatomy-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/body-anatomies/:bodyAnatomyTypeToken?",
    name: "BodyAnatomies",
    component: BodyAnatomies,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bodyAnatomies.modelName"),
      pageIcon: "anatomy.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-body-anatomy",
    name: "BodyAnatomyAdd",
    component: BodyAnatomyAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bodyAnatomies.add"),
      pageIcon: "anatomy.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-body-anatomy/:bodyAnatomyToken",
    name: "BodyAnatomyEdit",
    component: BodyAnatomyEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bodyAnatomies.edit"),
      pageIcon: "anatomy.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  // {
  //   path: "/general-specialties",
  //   name: "GeneralSpecialties",
  //   component: () => import("../views/settings/settingsOther/generalSpecialties/GeneralSpecialties.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("generalSpecialties"),
  //     pageIcon: "general-specialities.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-other",
  //   },
  // },
  // {
  //   path: "/add-general-specialty",
  //   name: "GeneralSpecialtyAdd",
  //   component: () => import("../views/settings/settingsOther/generalSpecialties/GeneralSpecialtyAdd.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("generalSpecialtyAdd"),
  //     pageIcon: "general-specialities.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-other",
  //   },
  // },
  // {
  //   path: "/edit-general-specialty/:generalSpecialtyToken",
  //   name: "GeneralSpecialtyEdit",
  //   component: () => import("../views/settings/settingsOther/generalSpecialties/GeneralSpecialtyEdit.vue"),
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("generalSpecialtyEdit"),
  //     pageIcon: "general-specialities.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-other",
  //   },
  // },

  {
    path: "/surgeries",
    name: "Surgeries",
    component: Surgeries,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("surgeries.modelName"),
      pageIcon: "medical-operations.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-surgery",
    name: "SurgeryAdd",
    component: SurgeryAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("surgeries.add"),
      pageIcon: "medical-operations.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-surgery/",
    name: "SurgeryEdit",
    component: SurgeryEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("surgeries.edit"),
      pageIcon: "medical-operations.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  // {
  //   path: "/active-substances",
  //   name: "ActiveSubstances",
  //   component: ActiveSubstances,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("activeSubstances.modelName"),
  //     pageIcon: "active-substance.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-other",
  //   },
  // },
  // {
  //   path: "/add-active-substance",
  //   name: "ActiveSubstanceAdd",
  //   component: ActiveSubstanceAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("activeSubstances.add"),
  //     pageIcon: "active-substance.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-other",
  //   },
  // },
  // {
  //   path: "/edit-active-substance/",
  //   name: "ActiveSubstanceEdit",
  //   component: ActiveSubstanceEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   props(route) {
  //     return route.params || {};
  //   },
  //   meta: {
  //     pageName: i18n.t("activeSubstances.edit"),
  //     pageIcon: "active-substance.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-other",
  //   },
  // },
  // colors
  {
    path: "/colors",
    name: "Colors",
    component: Colors,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("colors.modelName"),
      pageIcon: "colors.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-color",
    name: "ColorAdd",
    component: ColorAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("colors.add"),
      pageIcon: "colors.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-color/",
    name: "ColorEdit",
    component: ColorEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("colors.edit"),
      pageIcon: "colors.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/active-substances",
    name: "ActiveSubstances",
    component: ActiveSubstances,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("activeSubstances.modelName"),
      pageIcon: "active-substance.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-active-substance",
    name: "ActiveSubstanceAdd",
    component: ActiveSubstanceAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("activeSubstances.add"),
      pageIcon: "active-substance.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-active-substance/",
    name: "ActiveSubstanceEdit",
    component: ActiveSubstanceEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("activeSubstances.edit"),
      pageIcon: "active-substance.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/meals-types",
    name: "MealsTypes",
    component: MealsTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("mealsTypes.modelName"),
      pageIcon: "meals-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-meals-type",
    name: "MealsTypeAdd",
    component: MealsTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("mealsTypes.add"),
      pageIcon: "meals-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-meals-type/",
    name: "MealsTypeEdit",
    component: MealsTypeEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("mealsTypes.edit"),
      pageIcon: "meals-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/questions-types",
    name: "QuestionsTypes",
    component: QuestionsTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("questionsTypes.modelName"),
      pageIcon: "questions.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-questions-type",
    name: "QuestionsTypeAdd",
    component: QuestionsTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("questionsTypes.add"),
      pageIcon: "questions.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-questions-type/",
    name: "QuestionsTypeEdit",
    component: QuestionsTypeEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("questionsTypes.edit"),
      pageIcon: "questions.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/meals",
    name: "Meals",
    component: Meals,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("meals.modelName"),
      pageIcon: "meal.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-meal",
    name: "MealAdd",
    component: MealAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("meals.add"),
      pageIcon: "meal.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-meal/",
    name: "MealEdit",
    component: MealEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("meals.edit"),
      pageIcon: "meal.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/questions",
    name: "Questions",
    component: Questions,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("questions.modelName"),
      pageIcon: "questions.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-question",
    name: "QuestionAdd",
    component: QuestionAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("questions.add"),
      pageIcon: "questions.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-question/",
    name: "QuestionEdit",
    component: QuestionEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("questions.edit"),
      pageIcon: "questions.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/news-categories",
    name: "NewsCategories",
    component: NewsCategories,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("newsCategories"),
      pageIcon: "category.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-news-category",
    name: "NewsCategoryAdd",
    component: NewsCategoryAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("newsCategoryAdd"),
      pageIcon: "category.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-news-category/:newsCategoryToken",
    name: "NewsCategoryEdit",
    component: NewsCategoryEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("newsCategoryEdit"),
      pageIcon: "category.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/special-specialties",
    name: "SpecialSpecialties",
    component: SpecialSpecialties,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("specialSpecialties"),
      pageIcon: "special-spcialities.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-special-specialty",
    name: "SpecialSpecialtyAdd",
    component: SpecialSpecialtyAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("specialSpecialtyAdd"),
      pageIcon: "special-spcialities.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-special-specialty/:specialSpecialtyToken",
    name: "SpecialSpecialtyEdit",
    component: SpecialSpecialtyEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("specialSpecialtyEdit"),
      pageIcon: "special-spcialities.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/services",
    name: "Services",
    component: Services,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("services"),
      pageIcon: "services.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-service",
    name: "ServiceAdd",
    component: ServiceAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("serviceAdd"),
      pageIcon: "services.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-service/:serviceToken",
    name: "ServiceEdit",
    component: ServiceEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("serviceEdit"),
      pageIcon: "services.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  // {
  //   path: "/settings-salary",
  //   name: "SettingsSalary",
  //   component: SettingsSalary,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("settings-salary"),
  //     pageIcon: "settings-salary.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/work-shifts",
  //   name: "WorkShifts",
  //   component: WorkShifts,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("workShifts"),
  //     pageIcon: "work-shifts.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-work-shift",
  //   name: "WorkShiftAdd",
  //   component: WorkShiftAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("workShiftAdd"),
  //     pageIcon: "work-shifts.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-work-shift/:workShiftToken",
  //   name: "WorkShiftEdit",
  //   component: WorkShiftEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("workShiftEdit"),
  //     pageIcon: "work-shifts.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/work-plans",
  //   name: "WorkPlans",
  //   component: WorkPlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("workPlans"),
  //     pageIcon: "work-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-work-plan",
  //   name: "WorkPlanAdd",
  //   component: WorkPlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("workPlanAdd"),
  //     pageIcon: "work-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-work-plan/:workPlanToken",
  //   name: "WorkPlanEdit",
  //   component: WorkPlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("workPlanEdit"),
  //     pageIcon: "work-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/work-plan-days/:workPlanToken",
  //   name: "WorkPlanDays",
  //   component: WorkPlanDays,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("workPlanDays"),
  //     pageIcon: "work-plan-days.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/salary-effects",
  //   name: "SalaryEffects",
  //   component: SalaryEffects,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("salaryEffects"),
  //     pageIcon: "salary-effects.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-salary-effect",
  //   name: "SalaryEffectAdd",
  //   component: SalaryEffectAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("salaryEffectAdd"),
  //     pageIcon: "salary-effects.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-salary-effect/:employeeSalaryEffectToken",
  //   name: "SalaryEffectEdit",
  //   component: SalaryEffectEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("salaryEffectEdit"),
  //     pageIcon: "salary-effects.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/official-holidays",
  //   name: "OfficialHolidays",
  //   component: OfficialHolidays,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidays"),
  //     pageIcon: "holiday.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-official-holiday",
  //   name: "OfficialHolidayAdd",
  //   component: OfficialHolidayAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidayAdd"),
  //     pageIcon: "holiday.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-official-holiday/:officialHolidayToken",
  //   name: "OfficialHolidayEdit",
  //   component: OfficialHolidayEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidayEdit"),
  //     pageIcon: "holiday.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/balances-plans",
  //   name: "BalancesPlans",
  //   component: BalancesPlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("balancesPlans"),
  //     pageIcon: "balances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-balances-plan",
  //   name: "BalancesPlanAdd",
  //   component: BalancesPlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("balancesPlanAdd"),
  //     pageIcon: "balances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-balances-plan/:balancesPlansToken",
  //   name: "BalancesPlanEdit",
  //   component: BalancesPlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("balancesPlanEdit"),
  //     pageIcon: "balances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/balances-plan-details/:balancesPlansToken",
  //   name: "BalancesPlanDetails",
  //   component: BalancesPlanDetails,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("balancesPlanDetails"),
  //     pageIcon: "balances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-balances-plan-details/:balancesPlansToken",
  //   name: "BalancesPlanDetailsAdd",
  //   component: BalancesPlanDetailsAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("balancesPlanDetailsAdd"),
  //     pageIcon: "balances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-balances-plan-details/:balancesPlansSlidesDetailsToken",
  //   name: "BalancesPlanDetailsEdit",
  //   component: BalancesPlanDetailsEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("balancesPlanDetailsEdit"),
  //     pageIcon: "balances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/allowances",
  //   name: "Allowances",
  //   component: Allowances,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowances"),
  //     pageIcon: "allowances.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-allowance",
  //   name: "AllowanceAdd",
  //   component: AllowanceAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowanceAdd"),
  //     pageIcon: "allowances.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-allowance/:allowanceToken",
  //   name: "AllowanceEdit",
  //   component: AllowanceEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowanceEdit"),
  //     pageIcon: "allowances.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/allowances-plans",
  //   name: "AllowancesPlans",
  //   component: AllowancesPlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowancesPlans"),
  //     pageIcon: "allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-allowances-plan",
  //   name: "AllowancesPlanAdd",
  //   component: AllowancesPlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowancesPlanAdd"),
  //     pageIcon: "allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-allowances-plan/:allowancesPlansToken",
  //   name: "AllowancesPlanEdit",
  //   component: AllowancesPlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowancesPlanEdit"),
  //     pageIcon: "allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/allowances-plan-details/:allowancesPlansToken",
  //   name: "AllowancesPlanDetails",
  //   component: AllowancesPlanDetails,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowancesPlanDetails"),
  //     pageIcon: "allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-allowances-plan-details/:allowancesPlansToken",
  //   name: "AllowancesPlanDetailsAdd",
  //   component: AllowancesPlanDetailsAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowancesPlanDetailsAdd"),
  //     pageIcon: "allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-allowances-plan-details/:allowancesPlansSlidesDetailsToken",
  //   name: "AllowancesPlanDetailsEdit",
  //   component: AllowancesPlanDetailsEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("allowancesPlanDetailsEdit"),
  //     pageIcon: "allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/month-allowances-plans",
  //   name: "MonthAllowancesPlans",
  //   component: MonthAllowancesPlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("monthAllowancesPlans"),
  //     pageIcon: "month-allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-month-allowances-plan",
  //   name: "MonthAllowancesPlanAdd",
  //   component: MonthAllowancesPlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("monthAllowancesPlanAdd"),
  //     pageIcon: "month-allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-month-allowances-plan/:monthAllowancesPlansToken",
  //   name: "MonthAllowancesPlanEdit",
  //   component: MonthAllowancesPlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("monthAllowancesPlanEdit"),
  //     pageIcon: "month-allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/month-allowances-plan-details/:monthAllowancesPlansToken",
  //   name: "MonthAllowancesPlanDetails",
  //   component: MonthAllowancesPlanDetails,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("monthAllowancesPlanDetails"),
  //     pageIcon: "month-allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-month-allowances-plan-details/:monthAllowancesPlansToken",
  //   name: "MonthAllowancesPlanDetailsAdd",
  //   component: MonthAllowancesPlanDetailsAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("monthAllowancesPlanDetailsAdd"),
  //     pageIcon: "month-allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-month-allowances-plan-details/:monthAllowancesPlansSlidesDetailsToken",
  //   name: "MonthAllowancesPlanDetailsEdit",
  //   component: MonthAllowancesPlanDetailsEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("monthAllowancesPlanDetailsEdit"),
  //     pageIcon: "month-allowances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/overtime-plans",
  //   name: "OverTimePlans",
  //   component: OverTimePlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("overTimePlans"),
  //     pageIcon: "overtime-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-overtime-plan",
  //   name: "OverTimePlanAdd",
  //   component: OverTimePlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("overTimePlanAdd"),
  //     pageIcon: "overtime-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-overtime-plan/:overTimePlansToken",
  //   name: "OverTimePlanEdit",
  //   component: OverTimePlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("edit"),
  //     pageIcon: "overtime-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/overtime-plan-details/:overTimePlansToken",
  //   name: "OverTimePlanDetails",
  //   component: OverTimePlanDetails,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("overTimePlanDetails"),
  //     pageIcon: "overtime-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/absence-plans",
  //   name: "AbsencePlans",
  //   component: AbsencePlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("absencePlans"),
  //     pageIcon: "absence-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-absence-plan",
  //   name: "AbsencePlanAdd",
  //   component: AbsencePlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("absencePlanAdd"),
  //     pageIcon: "absence-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-absence-plan/:absencePlansToken",
  //   name: "AbsencePlanEdit",
  //   component: AbsencePlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("edit"),
  //     pageIcon: "absence-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/absence-plan-details/:absencePlansToken",
  //   name: "AbsencePlanDetails",
  //   component: AbsencePlanDetails,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("absencePlanDetails"),
  //     pageIcon: "absence-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/main-columns",
  //   name: "MainColumns",
  //   component: MainColumns,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("mainColumns"),
  //     pageIcon: "main-columns.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-main-column",
  //   name: "MainColumnAdd",
  //   component: MainColumnAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("mainColumnAdd"),
  //     pageIcon: "main-columns.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-main-column/:mainColumnToken",
  //   name: "MainColumnEdit",
  //   component: MainColumnEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("mainColumnEdit"),
  //     pageIcon: "main-columns.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/insurances-plans",
  //   name: "InsurancesPlans",
  //   component: InsurancesPlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("insurancesPlans"),
  //     pageIcon: "insurances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-insurances-plan",
  //   name: "InsurancesPlanAdd",
  //   component: InsurancesPlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("insurancesPlanAdd"),
  //     pageIcon: "insurances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-insurances-plan/:insurancesPlansToken",
  //   name: "InsurancesPlanEdit",
  //   component: InsurancesPlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("insurancesPlanEdit"),
  //     pageIcon: "insurances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/insurances-plan-details/:insurancesPlansToken",
  //   name: "InsurancesPlanDetails",
  //   component: InsurancesPlanDetails,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("insurancesPlanDetails"),
  //     pageIcon: "insurances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-insurances-plan-details/:insurancesPlansToken",
  //   name: "InsurancesPlanDetailsAdd",
  //   component: InsurancesPlanDetailsAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("insurancesPlanDetailsAdd"),
  //     pageIcon: "insurances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-insurances-plan-details/:insurancesPlansSlidesDetailsToken",
  //   name: "InsurancesPlanDetailsEdit",
  //   component: InsurancesPlanDetailsEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("insurancesPlanDetailsEdit"),
  //     pageIcon: "insurances-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/official-holidays-plans",
  //   name: "OfficialHolidaysPlans",
  //   component: OfficialHolidaysPlans,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidaysPlans"),
  //     pageIcon: "official-holidays-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-official-holidays-plan",
  //   name: "OfficialHolidaysPlanAdd",
  //   component: OfficialHolidaysPlanAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidaysPlanAdd"),
  //     pageIcon: "official-holidays-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-official-holidays-plan/:officialHolidaysPlansToken",
  //   name: "OfficialHolidaysPlanEdit",
  //   component: OfficialHolidaysPlanEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidaysPlanEdit"),
  //     pageIcon: "official-holidays-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/official-holidays-plan-details/:officialHolidaysPlansToken",
  //   name: "OfficialHolidaysPlanDetails",
  //   component: OfficialHolidaysPlanDetails,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidaysPlanDetails"),
  //     pageIcon: "official-holidays-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/add-official-holidays-plan-details/:officialHolidaysPlansToken",
  //   name: "OfficialHolidaysPlanDetailsAdd",
  //   component: OfficialHolidaysPlanDetailsAdd,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidaysPlanDetailsAdd"),
  //     pageIcon: "official-holidays-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },
  // {
  //   path: "/edit-official-holidays-plan-details/:officialHolidaysPlansSlidesDetailsToken",
  //   name: "OfficialHolidaysPlanDetailsEdit",
  //   component: OfficialHolidaysPlanDetailsEdit,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("officialHolidaysPlanDetailsEdit"),
  //     pageIcon: "official-holidays-plans.svg",
  //     currentPage: "settings",
  //     currentSubPage: "settings-salary",
  //   },
  // },

  // {
  //   path: "/calculate-payroll",
  //   name: "CalculatePayroll",
  //   component: CalculatePayroll,
  //   beforeEnter: ifNotAuthenticated,
  //   meta: {
  //     pageName: i18n.t("calculatePayroll"),
  //     pageIcon: "payroll.svg",
  //     currentPage: "reports",
  //     currentSubPage: "",
  //   },
  // },

  {
    path: "/buildings",
    name: "Buildings",
    component: Buildings,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("buildings"),
      pageIcon: "buildings.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/add-building",
    name: "BuildingAdd",
    component: BuildingAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("buildingAdd"),
      pageIcon: "buildings.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/edit-building/:buildingToken",
    name: "BuildingEdit",
    component: BuildingEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("buildingEdit"),
      pageIcon: "buildings.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },

  {
    path: "/floors",
    name: "Floors",
    component: Floors,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("floors"),
      pageIcon: "floors.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/add-floor",
    name: "FloorAdd",
    component: FloorAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("floorAdd"),
      pageIcon: "floors.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/edit-floor/:floorToken",
    name: "FloorEdit",
    component: FloorEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("floorEdit"),
      pageIcon: "floors.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },

  {
    path: "/chambers",
    name: "Chambers",
    component: Chambers,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("chambers"),
      pageIcon: "chambers.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/add-chamber",
    name: "ChamberAdd",
    component: ChamberAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("chamberAdd"),
      pageIcon: "chambers.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/edit-chamber/:chamberToken",
    name: "ChamberEdit",
    component: ChamberEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("chamberEdit"),
      pageIcon: "chambers.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },

  {
    path: "/offices",
    name: "Offices",
    component: Offices,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("offices"),
      pageIcon: "office.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/add-office",
    name: "OfficeAdd",
    component: OfficeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("officeAdd"),
      pageIcon: "office.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/edit-office/:officeToken",
    name: "OfficeEdit",
    component: OfficeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("officeEdit"),
      pageIcon: "office.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },

  {
    path: "/offices-times",
    name: "OfficesTimes",
    component: OfficesTimes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("officesTimes"),
      pageIcon: "time.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/add-offices-time",
    name: "OfficesTimeAdd",
    component: OfficesTimeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("officesTimeAdd"),
      pageIcon: "time.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },
  {
    path: "/edit-offices-time/:officeTimeToken",
    name: "OfficesTimeEdit",
    component: OfficesTimeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("officesTimeEdit"),
      pageIcon: "time.svg",
      currentPage: "branches",
      currentSubPage: "SettingsBranch",
    },
  },

  {
    path: "/medicines-types",
    name: "MedicinesTypes",
    component: MedicinesTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("medicinesTyps"),
      pageIcon: "medicines-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-medicines-type",
    name: "MedicinesTypeAdd",
    component: MedicinesTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("medicinesTypeAdd"),
      pageIcon: "medicines-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-medicines-type/:medicinesTypeToken",
    name: "MedicinesTypeEdit",
    component: MedicinesTypeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("medicinesTypeEdit"),
      pageIcon: "medicines-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/medicines",
    name: "Medicines",
    component: Medicines,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("medicines"),
      pageIcon: "medicines.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-medicine",
    name: "MedicineAdd",
    component: MedicineAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("medicineAdd"),
      pageIcon: "medicines.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-medicine/:medicineToken",
    name: "MedicineEdit",
    component: MedicineEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("medicineEdit"),
      pageIcon: "medicines.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/requirements",
    name: "Requirements",
    component: Requirements,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("requirements"),
      pageIcon: "requirements.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-requirement",
    name: "RequirementAdd",
    component: RequirementAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("requirementAdd"),
      pageIcon: "requirements.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-requirement/:requirementToken",
    name: "RequirementEdit",
    component: RequirementEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("requirementEdit"),
      pageIcon: "requirements.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/addictive-stuffs",
    name: "AddictiveStuffs",
    component: AddictiveStuffs,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("addictiveStuffs.modelName"),
      pageIcon: "habits.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-addictive-stuff",
    name: "AddictiveStuffAdd",
    component: AddictiveStuffAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("addictiveStuffs.add"),
      pageIcon: "habits.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-addictive-stuff/:addictiveStuffToken",
    name: "AddictiveStuffEdit",
    component: AddictiveStuffEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("addictiveStuffs.edit"),
      pageIcon: "habits.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/blood-types",
    name: "BloodTypes",
    component: BloodTypes,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bloodTypes"),
      pageIcon: "blood-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-blood-type",
    name: "BloodTypeAdd",
    component: BloodTypeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bloodTypeAdd"),
      pageIcon: "blood-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-blood-type/:bloodTypeToken",
    name: "BloodTypeEdit",
    component: BloodTypeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("bloodTypeEdit"),
      pageIcon: "blood-types.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/method-paids",
    name: "MethodPaids",
    component: MethodPaids,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("methodPaids"),
      pageIcon: "method-paids.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-method-paid",
    name: "MethodPaidAdd",
    component: MethodPaidAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("methodPaidAdd"),
      pageIcon: "method-paids.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-method-paid/:methodPaidToken",
    name: "MethodPaidEdit",
    component: MethodPaidEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("methodPaidEdit"),
      pageIcon: "method-paids.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/scientific-degrees",
    name: "scientificDegrees",
    component: ScientificDegrees,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("scientificDegrees"),
      pageIcon: "scientific-degrees.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-scientific-degree",
    name: "scientificDegreeAdd",
    component: ScientificDegreeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("scientificDegreeAdd"),
      pageIcon: "scientific-degrees.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-scientific-degree/:scientificDegreeToken",
    name: "scientificDegreeEdit",
    component: ScientificDegreeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("scientificDegreeEdit"),
      pageIcon: "scientific-degrees.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/countries",
    name: "Countries",
    component: Countries,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("setting.others.countries"),
      pageIcon: "country.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-country",
    name: "CountryAdd",
    component: CountryAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("countries.add"),
      pageIcon: "country.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-country/:countryToken",
    name: "CountryEdit",
    component: CountryEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("countries.edit"),
      pageIcon: "country.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/governates",
    name: "Governates",
    component: Governates,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("setting.others.governates"),
      pageIcon: "governate.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-governate",
    name: "GovernateAdd",
    component: GovernateAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("governates.add"),
      pageIcon: "governate.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-governate/:governateToken",
    name: "GovernateEdit",
    component: GovernateEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("governates.edit"),
      pageIcon: "governate.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/cities",
    name: "Cities",
    component: Cities,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("setting.others.cities"),
      pageIcon: "city.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-city",
    name: "CityAdd",
    component: CityAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("cities.add"),
      pageIcon: "city.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-city/:cityToken",
    name: "CityEdit",
    component: CityEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("cities.edit"),
      pageIcon: "city.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/districts",
    name: "Districts",
    component: Districts,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("setting.others.districts"),
      pageIcon: "district.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-district",
    name: "DistrictAdd",
    component: DistrictAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("districts.add"),
      pageIcon: "district.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-district/:districtToken",
    name: "DistrictEdit",
    component: DistrictEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("districts.edit"),
      pageIcon: "district.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/services-reservation-employee-benefits/:employeeToken?",
    name: "ServicesReservationEmployeeBenefits",
    component: ServicesReservationEmployeeBenefits,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("servicesReservationEmployeeBenefits.modelName"),
      pageIcon: "servicesReservationEmployeeBenefit.svg",
      currentPage: "theEmployees",
      currentSubPage: "employeesBenefits",
    },
  },

  {
    path: "/medical-insurance-levels/:insuranceCompanyToken?",
    name: "MedicalInsuranceLevels",
    component: MedicalInsuranceLevels,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("medicalInsuranceLevels.modelName"),
      pageIcon: "medicalInsuranceLevel.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-medical-insurance-level/:insuranceCompanyToken?",
    name: "MedicalInsuranceLevelAdd",
    component: MedicalInsuranceLevelAdd,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("medicalInsuranceLevels.add"),
      pageIcon: "medicalInsuranceLevel.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-medical-insurance-level/:medicalInsuranceLevelToken/:insuranceCompanyToken?",
    name: "MedicalInsuranceLevelEdit",
    component: MedicalInsuranceLevelEdit,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("medicalInsuranceLevels.edit"),
      pageIcon: "medicalInsuranceLevel.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/service-responsible-bonuses/:employeeToken?",
    name: "ServiceResponsibleBonuses",
    component: ServiceResponsibleBonuses,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("serviceResponsibleBonuses.modelName"),
      pageIcon: "serviceResponsibleBonuse.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-service-responsible-bonuse/:employeeToken?",
    name: "ServiceResponsibleBonuseEdit",
    component: ServiceResponsibleBonuseEdit,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("serviceResponsibleBonuses.edit"),
      pageIcon: "serviceResponsibleBonuse.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/insurance-company-services/:insuranceCompanyToken?",
    name: "InsuranceCompanyServices",
    component: InsuranceCompanyServices,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("insuranceCompanyServices.modelName"),
      pageIcon: "insuranceCompanyService.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-insurance-company-service/:insuranceCompanyToken?",
    name: "InsuranceCompanyServiceAdd",
    component: InsuranceCompanyServiceAdd,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("insuranceCompanyServices.add"),
      pageIcon: "insuranceCompanyService.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-insurance-company-service/:insuranceCompanyToken?",
    name: "InsuranceCompanyServiceEdit",
    component: InsuranceCompanyServiceEdit,
    beforeEnter: ifNotAuthenticated,
    props: true,
    meta: {
      pageName: i18n.t("insuranceCompanyServices.edit"),
      pageIcon: "insuranceCompanyService.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/insurance-companies",
    name: "InsuranceCompanies",
    component: InsuranceCompanies,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("setting.others.insuranceCompanies"),
      pageIcon: "insurance-companies.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/add-insurance-company",
    name: "InsuranceCompanyAdd",
    component: InsuranceCompanyAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("insuranceCompanies.add"),
      pageIcon: "insurance-companies.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },
  {
    path: "/edit-insurance-company/:insuranceCompanyToken",
    name: "InsuranceCompanyEdit",
    component: InsuranceCompanyEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("insuranceCompanies.edit"),
      pageIcon: "insurance-companies.svg",
      currentPage: "settings",
      currentSubPage: "settings-other",
    },
  },

  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("notifications.modelName"),
      pageIcon: "notifications.svg",
      currentPage: "notifications",
      currentSubPage: "",
    },
  },

  ...HistoricalPlansRoutes,
  ...PointsAndWalletsRoutes,
  ...ServicesReservationAddedServicesRoutes,

  {
    path: "/reservations-medias/",
    name: "ReservationsMedias",
    component: ReservationsMedias,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("reservationsMedias.modelName"),
      pageIcon: "media.svg",
      currentPage: "",
      currentSubPage: "",
    },
  },
  {
    path: "/add-reservation-media/",
    name: "ReservationMediaAdd",
    component: ReservationMediaAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("reservationsMedias.add"),
      pageIcon: "media.svg",
      currentPage: "settings",
      currentSubPage: "",
    },
  },
  {
    path: "/edit-reservation-media/",
    name: "ReservationMediaEdit",
    component: ReservationMediaEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("reservationsMedias.edit"),
      pageIcon: "media.svg",
      currentPage: "settings",
      currentSubPage: "",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
