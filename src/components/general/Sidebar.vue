<template>
  <ul>
    <!-- <li>
      <router-link to="/" :class="currentPage == 'home' ? 'active' : ''">
        <span class="icon"><img src="@/assets/images/homepage.svg" /></span>
        <span class="title">{{ $t("homePage") }}</span>
      </router-link>
    </li> -->
    <li v-if="checkPrivilege(usersPrivilegeData.usersPrivilegeNews.newsView)">
      <router-link to="/news" :class="currentPage == 'news' ? 'active' : ''">
        <span class="icon"><img src="@/assets/images/news.svg" /></span>
        <span class="title">{{ $t("news") }}</span>
      </router-link>
    </li>
    <li
      v-if="checkPrivilege(usersPrivilegeData.usersPrivilegeOffers.offersView)"
    >
      <router-link
        to="/offers"
        :class="currentPage == 'offers' ? 'active' : ''"
      >
        <span class="icon"><img src="@/assets/images/offers.svg" /></span>
        <span class="title">{{ $t("offers") }}</span>
      </router-link>
    </li>

    <li
      class="sub-menu"
      v-if="
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeServicesReservations
            .servicesReservationView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeServicesReservations
            .servicesReservationViewPay
        )
      "
    >
      <a
        v-b-toggle.reservationsAndPayments
        :class="currentPage == 'reservations-payments' ? 'active' : ''"
      >
        <span class="icon"
          ><img src="@/assets/images/services-reservations.svg"
        /></span>
        <span class="title">
          {{ $t("reservationsAndPayments") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="reservationsAndPayments">
        <ul>
          <template
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeServicesReservations
                  .servicesReservationView
              )
            "
          >
            <li>
              <a
                :class="
                  currentSubPage == 'services-reservations' ? 'active' : ''
                "
                @click="goToServicesReservations()"
              >
                <span class="icon"
                  ><img src="@/assets/images/services-reservations.svg"
                /></span>
                <span class="title">{{ $t("servicesReservations") }}</span>
              </a>
            </li>
            <li>
              <router-link
                :to="{ name: 'ServicesReservationsCalendar' }"
                :class="
                  currentSubPage == 'ServicesReservationsCalendar'
                    ? 'active'
                    : ''
                "
              >
                <span class="icon"
                  ><img src="@/assets/images/ServicesReservationsCalendar.svg"
                /></span>
                <span class="title">{{
                  $t("ServicesReservationsCalendar.modelName")
                }}</span>
              </router-link>
            </li>
          </template>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeServicesReservations
                  .servicesReservationViewPay
              )
            "
          >
            <a
              :class="currentSubPage == 'services-payments' ? 'active' : ''"
              @click="goToPayments()"
            >
              <span class="icon"
                ><img src="@/assets/images/services-payments.svg"
              /></span>
              <span class="title">{{ $t("servicesPayments") }}</span>
            </a>
          </li>
        </ul>
      </b-collapse>
    </li>

    <li>
      <a
        :class="currentPage == 'historical-plans' ? 'active' : ''"
        @click="goToHistoricalPlan()"
      >
        <span class="icon"
          ><img src="@/assets/images/historicalPlans.svg"
        /></span>
        <span class="title">{{ $t("historicalPlans.modelName") }}</span>
      </a>
    </li>

    <li
      class="sub-menu"
      v-if="
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeWalletTransaction
            .walletTransactionView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeTransactionPointsHistory
            .transactionPointsHistoryView
        )
      "
    >
      <a
        v-b-toggle.pointsAndWallets
        :class="currentPage == 'points-wallets' ? 'active' : ''"
      >
        <span class="icon"
          ><img src="@/assets/images/points-wallets.svg"
        /></span>
        <span class="title">
          {{ $t("pointsAndWallets.modelName") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="pointsAndWallets">
        <ul>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeWalletTransaction
                  .walletTransactionView
              )
            "
          >
            <router-link
              :to="{ name: 'Wallets' }"
              :class="currentSubPage == 'wallets' ? 'active' : ''"
            >
              <span class="icon"><img src="@/assets/images/wallet.svg" /></span>
              <span class="title">{{
                $t("pointsAndWallets.wallets.modelName")
              }}</span>
            </router-link>
          </li>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeTransactionPointsHistory
                  .transactionPointsHistoryView
              )
            "
          >
            <router-link
              :to="{ name: 'PointsTransactions' }"
              :class="currentSubPage == 'points-transactions' ? 'active' : ''"
            >
              <span class="icon"><img src="@/assets/images/points.svg" /></span>
              <span class="title">{{
                $t("pointsAndWallets.points.modelName")
              }}</span>
            </router-link>
          </li>
        </ul>
      </b-collapse>
    </li>

    <li
      class="sub-menu"
      v-if="
        checkPrivilege(usersPrivilegeData.usersPrivilegeClients.clientsView)
      "
    >
      <a
        v-b-toggle.theClients
        :class="currentPage == 'theClients' ? 'active' : ''"
      >
        <span class="icon"><img src="@/assets/images/clients.svg" /></span>
        <span class="title">
          {{ $t("theClients") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="theClients">
        <ul>
          <li>
            <router-link
              to="/clients"
              :class="currentSubPage == 'clients' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/clients.svg"
              /></span>
              <span class="title">{{ $t("clients") }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                name: 'ClientsOperations',
              }"
              :class="currentSubPage == 'clientsOperations' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/medical-operations.svg"
              /></span>
              <span class="title">{{ $t("clientsOperations") }}</span>
            </router-link>
          </li>
        </ul>
      </b-collapse>
    </li>

    <li
      class="sub-menu"
      v-if="
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeTreasuries.treasuriesView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeTreasuriesTransaction
            .treasuriesTransactionsView
        ) ||
        checkPrivilege(usersPrivilegeData.usersPrivilegeRevenus.revenuesView) ||
        checkPrivilege(usersPrivilegeData.usersPrivilegeExpenses.expensesView)
      "
    >
      <a v-b-toggle.finance :class="currentPage == 'finance' ? 'active' : ''">
        <span class="icon"><img src="@/assets/images/finance.svg" /></span>
        <span class="title">
          {{ $t("finance") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="finance">
        <ul>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeTreasuries.treasuriesView
              )
            "
          >
            <router-link
              to="/treasuries"
              :class="currentSubPage == 'treasuries' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/treasuries.svg"
              /></span>
              <span class="title">{{ $t("theTreasuries") }}</span>
            </router-link>
          </li>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeTreasuriesTransaction
                  .treasuriesTransactionsView
              )
            "
          >
            <router-link
              to="/treasuries-transactions"
              :class="
                currentSubPage == 'treasuries-transactions' ? 'active' : ''
              "
            >
              <span class="icon"
                ><img src="@/assets/images/treasuries-transactions.svg"
              /></span>
              <span class="title">{{ $t("treasuriesTransactions") }}</span>
            </router-link>
          </li>

          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeRevenus.revenuesView
              )
            "
          >
            <router-link
              to="/revenues"
              :class="currentSubPage == 'revenues' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/revenues.svg"
              /></span>
              <span class="title">{{ $t("revenues") }}</span>
            </router-link>
          </li>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeExpenses.expensesView
              )
            "
          >
            <router-link
              to="/expenses"
              :class="currentSubPage == 'expenses' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/expenses.svg"
              /></span>
              <span class="title">{{ $t("expenses") }}</span>
            </router-link>
          </li>
        </ul>
      </b-collapse>
    </li>

    <li
      class="sub-menu"
      v-if="
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeEmployees.employeesView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeServicesReservationEmployeeBenefit
            .servicesReservationEmployeeBenefitView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeUsers.usersPrivilegeView
        )
      "
    >
      <a
        v-b-toggle.theEmployees
        :class="currentPage == 'theEmployees' ? 'active' : ''"
      >
        <span class="icon"><img src="@/assets/images/employees.svg" /></span>
        <span class="title">
          {{ $t("theEmployees") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="theEmployees">
        <ul>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeEmployees.employeesView
              )
            "
          >
            <router-link
              to="/employees"
              :class="currentSubPage == 'employees' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/employees.svg"
              /></span>
              <span class="title">{{ $t("theEmployees") }}</span>
            </router-link>
          </li>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData
                  .usersPrivilegeServicesReservationEmployeeBenefit
                  .servicesReservationEmployeeBenefitView
              )
            "
          >
            <router-link
              :to="{
                name: 'ServicesReservationEmployeeBenefits',
              }"
              :class="currentSubPage == 'employeesBenefits' ? 'active' : ''"
            >
              <span class="icon"
                ><img
                  src="@/assets/images/servicesReservationEmployeeBenefit.svg"
              /></span>
              <span class="title">{{
                $t("servicesReservationEmployeeBenefits.modelName")
              }}</span>
            </router-link>
          </li>

          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeUsers.usersPrivilegeView
              )
            "
          >
            <router-link
              to="/privileges"
              :class="currentSubPage == 'privileges' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/privileges.svg"
              /></span>
              <span class="title">{{ $t("privileges") }}</span>
            </router-link>
          </li>
          <!-- <li>
            <router-link
              to="/add-employee-salary-setting"
              :class="currentSubPage == 'employeeSalarySetting' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/employee-salary-setting.svg"
              /></span>
              <span class="title">{{ $t("EmployeeSalarySettingAdd") }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/add-employee-work-schedule"
              :class="currentSubPage == 'employeeWorkSchedule' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/work-schedule.svg"
              /></span>
              <span class="title">{{ $t("EmployeeWorkScheduleAdd") }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/add-employee-official-holidays-plan"
              :class="
                currentSubPage == 'employeeOfficialHolidaysPlan' ? 'active' : ''
              "
            >
              <span class="icon"
                ><img src="@/assets/images/holiday.svg"
              /></span>
              <span class="title">{{
                $t("EmployeeOfficialHolidaysPlanAdd")
              }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/employees-input-sheets-attendance"
              :class="
                currentSubPage == 'employeesInputSheetsAttendance'
                  ? 'active'
                  : ''
              "
            >
              <span class="icon"><img src="@/assets/images/sheets.svg" /></span>
              <span class="title">{{
                $t("employeesInputSheetsAttendance")
              }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/employees-input-sheet-attendance-merges"
              :class="
                currentSubPage == 'employeesInputSheetAttendanceMerges'
                  ? 'active'
                  : ''
              "
            >
              <span class="icon"><img src="@/assets/images/merge.svg" /></span>
              <span class="title">{{
                $t("employeesInputSheetAttendanceMerges")
              }}</span>
            </router-link>
          </li> -->
        </ul>
      </b-collapse>
    </li>
    <li
      class="sub-menu"
      v-if="
        checkPrivilege(usersPrivilegeData.usersPrivilegeBranches.branchesView)
      "
    >
      <a
        v-b-toggle.theBranches
        :class="currentPage == 'branches' ? 'active' : ''"
      >
        <span class="icon"><img src="@/assets/images/branches.svg" /></span>
        <span class="title">
          {{ $t("theBranches") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="theBranches">
        <ul>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeBranches.branchesView
              )
            "
          >
            <router-link
              to="/branches"
              :class="currentSubPage == 'branches' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/branches.svg"
              /></span>
              <span class="title">{{ $t("theBranches") }}</span>
            </router-link>
          </li>

          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegAdditionalSettings
                  .additionalSettingsView
              )
            "
          >
            <router-link
              to="/settings-branch"
              :class="currentSubPage == 'SettingsBranch' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/branches.svg"
              /></span>
              <span class="title">{{ $t("settingsBranch") }}</span>
            </router-link>
          </li>
        </ul>
      </b-collapse>
    </li>

    <!-- <li class="sub-menu">
      <a
        v-b-toggle.attendance
        :class="currentPage == 'attendance' ? 'active' : ''"
      >
        <span class="icon"><img src="@/assets/images/attendance.svg" /></span>
        <span class="title">
          {{ $t("attendanceAndDeparture") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="attendance">
        <ul>
          <li>
            <router-link
              to="/add-attendance"
              :class="currentSubPage == 'add-attendance' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/add-attendance.svg"
              /></span>
              <span class="title">{{ $t("checkIn") }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/add-departure"
              :class="currentSubPage == 'add-departure' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/add-departure.svg"
              /></span>
              <span class="title">{{ $t("checkOut") }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/attendance-history"
              :class="currentSubPage == 'attendance-history' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/attendanceHistory.svg"
              /></span>
              <span class="title">{{
                $t("attendanceAndDepartureHistory")
              }}</span>
            </router-link>
          </li>
        </ul>
      </b-collapse>
    </li> -->
    <!-- <li>
      <router-link
        to="/points"
        :class="currentPage == 'points' ? 'active' : ''"
      >
        <span class="icon"><img src="@/assets/images/points.svg" /></span>
        <span class="title">{{ $t("points") }}</span>
      </router-link>
    </li> -->
    <li
      v-if="
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeReports.paymentReportView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeReports
            .treasuriesTransactionsReportView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeReports
            .servicesReservationsReportView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeStatistics
            .servicesReservationStatisticsView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeStatistics.generalStatisticsView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeStatistics
            .branchesInformationStatisticsView
        ) ||
        checkPrivilege(
          usersPrivilegeData.usersPrivilegeStatistics
            .additionalSettingsStatisticsView
        )
      "
    >
      <a
        v-b-toggle.reportsAndStatistics
        :class="currentPage == 'reportsAndStatistics' ? 'active' : ''"
      >
        <span class="icon"
          ><img src="@/assets/images/reportsAndStatistics.svg"
        /></span>
        <span class="title">
          {{ $t("reportsAndStatistics.modelName") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="reportsAndStatistics">
        <ul>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeReports.paymentReportView
              ) ||
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeReports
                  .treasuriesTransactionsReportView
              ) ||
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeReports
                  .servicesReservationsReportView
              )
            "
          >
            <router-link
              to="/reports"
              :class="currentSubPage == 'reports' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/reports.svg"
              /></span>
              <span class="title">{{ $t("reports") }}</span>
            </router-link>
          </li>
          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeStatistics
                  .servicesReservationStatisticsView
              ) ||
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeStatistics
                  .generalStatisticsView
              ) ||
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeStatistics
                  .branchesInformationStatisticsView
              ) ||
              checkPrivilege(
                usersPrivilegeData.usersPrivilegeStatistics
                  .additionalSettingsStatisticsView
              )
            "
          >
            <router-link
              to="/statistics"
              :class="currentSubPage == 'statistics' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/statistics.svg"
              /></span>
              <span class="title">{{ $t("statistics.modelName") }}</span>
            </router-link>
          </li>
        </ul>
      </b-collapse>
    </li>

    <!-- <li>
      <router-link
        to="/stores"
        :class="currentPage == 'stores' ? 'active' : ''"
      >
        <span class="icon"><img src="@/assets/images/stores.svg" /></span>
        <span class="title">{{ $t("theStores") }}</span>
      </router-link>
    </li> -->

    <li
      class="sub-menu"
      v-if="
        checkPrivilege(
          usersPrivilegeData.usersPrivilegAdditionalSettings
            .additionalSettingsView
        )
      "
    >
      <a v-b-toggle.settings :class="currentPage == 'settings' ? 'active' : ''">
        <span class="icon"><img src="@/assets/images/settings.svg" /></span>
        <span class="title">
          {{ $t("settings") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
      <b-collapse id="settings">
        <ul>
          <!-- <li>
            <router-link
              to="/settings-establishment"
              :class="
                currentSubPage == 'settings-establishment' ? 'active' : ''
              "
            >
              <span class="icon"
                ><img src="@/assets/images/settings-establishment.svg"
              /></span>
              <span class="title">{{ $t("settings-establishment") }}</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings-salary"
              :class="currentSubPage == 'settings-salary' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/settings-salary.svg"
              /></span>
              <span class="title">{{ $t("settings-salary") }}</span>
            </router-link>
          </li> -->

          <li
            v-if="
              checkPrivilege(
                usersPrivilegeData.usersPrivilegAdditionalSettings
                  .additionalSettingsView
              )
            "
          >
            <router-link
              to="/settings-other"
              :class="currentSubPage == 'settings-other' ? 'active' : ''"
            >
              <span class="icon"
                ><img src="@/assets/images/settings-other.svg"
              /></span>
              <span class="title">{{ $t("settings-other") }}</span>
            </router-link>
          </li>
        </ul>
      </b-collapse>
    </li>
  </ul>
</template>

<script>
import { checkPrivilege } from "@/utils/functions";
import UserPrivilege from "@/models/privileges/UserPrivilege";

export default {
  name: "Sidebar",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      usersPrivilegeData:
        this.$store.getters.usersPrivilegeData || new UserPrivilege(),
      currentPage: "",
      currentSubPage: "",
    };
  },
  methods: {
    getPageInfo() {
      this.currentPage = this.$route.meta.currentPage || "";
      this.currentSubPage = this.$route.meta.currentSubPage || "";
    },
    checkPrivilege(privilegeStatus) {
      return checkPrivilege(privilegeStatus);
    },
    goToServicesReservations() {
      this.$store.dispatch("updateReservationsClientToken", "");
      this.$router.push({ name: "ServicesReservations" }).catch(() => {});
    },
    goToPayments() {
      this.$store.dispatch("updatePaymentsClientToken", "");
      this.$store.dispatch("updatePaymentsReservationToken", "");
      this.$router.push({ name: "ServicesPayments" }).catch(() => {});
    },
    goToHistoricalPlan() {
      this.$store.dispatch("updateHistoricalPlansClientToken", "");
      this.$store.dispatch("updateHistoricalPlansReservationToken", "");
      this.$router.push({ name: "DiagnosisPlans" }).catch(() => {});
    },
  },
  watch: {
    $route() {
      this.getPageInfo();
    },
  },
  async created() {
    this.getPageInfo();
  },
};
</script>
