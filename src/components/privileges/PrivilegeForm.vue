<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="userPrivilegeData.usersPersonalData.employeeToken"
            :options="employeeTokenOptions"
            v-on:changeValue="
              userPrivilegeData.usersPersonalData.employeeToken = $event
            "
            :title="$t('selectEmployee')"
            :imgName="'employees.svg'"
          />
        </div>
      </div>

      <div v-if="userPrivilegeData.usersPersonalData.employeeToken">
        <UsersPrivilegeUsers
          :usersPrivilegeUsers="userPrivilegeData.usersPrivilegeUsers"
        />
        <UsersPrivilegeEmployees
          :usersPrivilegeEmployees="userPrivilegeData.usersPrivilegeEmployees"
        />
        <UsersPrivilegeServiceResponsibleBonuses
          :usersPrivilegeServiceResponsibleBonuses="
            userPrivilegeData.usersPrivilegeServiceResponsibleBonuses
          "
        />
        <UsersPrivilegeServicesReservationEmployeeBenefit
          :usersPrivilegeServicesReservationEmployeeBenefit="
            userPrivilegeData.usersPrivilegeServicesReservationEmployeeBenefit
          "
        />

        <!-- <UsersPrivilegeEmployeesAttendance
          :usersPrivilegeEmployeesAttendance="
            userPrivilegeData.usersPrivilegeEmployeesAttendance
          "
        />
        <UsersPrivilegeEmployeesMovement
          :usersPrivilegeEmployeesMovement="
            userPrivilegeData.usersPrivilegeEmployeesMovement
          "
        />
        <UsersPrivilegeEmployeesMovementMedai
          :usersPrivilegeEmployeesMovementMedai="
            userPrivilegeData.usersPrivilegeEmployeesMovementMedai
          "
        />
        <UsersPrivilegeEmployeesSettlementMovement
          :usersPrivilegeEmployeesSettlementMovement="
            userPrivilegeData.usersPrivilegeEmployeesSettlementMovement
          "
        />
        <UsersPirivilegeEmployeesMoveSlides
          :usersPirivilegeEmployeesMoveSlides="
            userPrivilegeData.usersPirivilegeEmployeesMoveSlides
          "
        />
        -->

        <!-- <UserPrivillegBranchesSettings
          :userPrivillegBranchesSettings="
            userPrivilegeData.userPrivillegBranchesSettings
          "
        /> -->
        <!-- <UsersPrivilegeEstablishmentsSettings
          :usersPrivilegeEstablishmentsSettings="
            userPrivilegeData.usersPrivilegeEstablishmentsSettings
          "
        /> -->

        <UsersPrivilegeClients
          :usersPrivilegeClients="userPrivilegeData.usersPrivilegeClients"
        />
        <UsersPrivilegeNews
          :usersPrivilegeNews="userPrivilegeData.usersPrivilegeNews"
        />
        <UsersPrivilegeOffers
          :usersPrivilegeOffers="userPrivilegeData.usersPrivilegeOffers"
        />

        <UsersPrivilegeBranches
          :usersPrivilegeBranches="userPrivilegeData.usersPrivilegeBranches"
        />
        <UsersPrivilegeOfficesTimes
          :usersPrivilegeOfficesTimes="
            userPrivilegeData.usersPrivilegeOfficesTimes
          "
        />

        <UsersPrivilegeServicesReservations
          :usersPrivilegeServicesReservations="
            userPrivilegeData.usersPrivilegeServicesReservations
          "
        />
        <UsersPrivilegeReport
          :usersPrivilegeReports="userPrivilegeData.usersPrivilegeReports"
        />
        <UsersPrivilegeStatistics
          :usersPrivilegeStatistics="userPrivilegeData.usersPrivilegeStatistics"
        />

        <UsersPrivilegeTreasuries
          :usersPrivilegeTreasuries="userPrivilegeData.usersPrivilegeTreasuries"
        />
        <UsersPrivilegeTreasuriesTransaction
          :usersPrivilegeTreasuriesTransaction="
            userPrivilegeData.usersPrivilegeTreasuriesTransaction
          "
        />
        <UsersPrivilegeExpenses
          :usersPrivilegeExpenses="userPrivilegeData.usersPrivilegeExpenses"
        />
        <UsersPrivilegeRevenus
          :usersPrivilegeRevenus="userPrivilegeData.usersPrivilegeRevenus"
        />

        <UsersPrivilegAdditionalSettings
          :usersPrivilegAdditionalSettings="
            userPrivilegeData.usersPrivilegAdditionalSettings
          "
        />

        <UsersPrivilegeServiceReservationMedia
          :usersPrivilegeServiceReservationMedia="
            userPrivilegeData.usersPrivilegeServiceReservationMedia
          "
        />

        <UsersPrivilegeServicesReservationAddedServices
          :usersPrivilegeServicesReservationAddedServices="
            userPrivilegeData.usersPrivilegeServicesReservationAddedServices
          "
        />

        <UsersPrivilegeHistoricalPlans :userPrivilegeData="userPrivilegeData" />

        <div class="form-footer">
          <button
            name="submit"
            type="submit"
            class="btn btn-submit"
            @click.prevent="updateUserPrivilege"
          >
            {{ submitName }}
          </button>
          <router-link to="/employees" class="btn btn-cancel">
            {{ $t("cancel") }}
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import axios from "axios";
import { STATUS } from "@/utils/constants";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import UsersPrivilegeUsers from "@/components/privileges/UsersPrivilegeUsers.vue";
import UsersPrivilegeEmployees from "@/components/privileges/UsersPrivilegeEmployees.vue";
import UsersPrivilegeServiceResponsibleBonuses from "@/components/privileges/UsersPrivilegeServiceResponsibleBonuses.vue";
import UsersPrivilegeServicesReservationEmployeeBenefit from "@/components/privileges/UsersPrivilegeServicesReservationEmployeeBenefit.vue";
// import UsersPrivilegeEmployeesAttendance from "@/components/privileges/UsersPrivilegeEmployeesAttendance.vue";
// import UsersPrivilegeEmployeesMovement from "@/components/privileges/UsersPrivilegeEmployeesMovement.vue";
// import UsersPrivilegeEmployeesMovementMedai from "@/components/privileges/UsersPrivilegeEmployeesMovementMedai.vue";
// import UsersPrivilegeEmployeesSettlementMovement from "@/components/privileges/UsersPrivilegeEmployeesSettlementMovement.vue";
// import UsersPirivilegeEmployeesMoveSlides from "@/components/privileges/UsersPirivilegeEmployeesMoveSlides.vue";
// import UserPrivillegBranchesSettings from "@/components/privileges/UserPrivillegBranchesSettings.vue";
// import UsersPrivilegeEstablishmentsSettings from "@/components/privileges/UsersPrivilegeEstablishmentsSettings.vue";
import UsersPrivilegeClients from "@/components/privileges/UsersPrivilegeClients.vue";
import UsersPrivilegeNews from "@/components/privileges/UsersPrivilegeNews.vue";
import UsersPrivilegeOffers from "@/components/privileges/UsersPrivilegeOffers.vue";
import UsersPrivilegeBranches from "@/components/privileges/UsersPrivilegeBranches.vue";
import UsersPrivilegeOfficesTimes from "@/components/privileges/UsersPrivilegeOfficesTimes.vue";
import UsersPrivilegeServicesReservations from "@/components/privileges/UsersPrivilegeServicesReservations.vue";
import UsersPrivilegeReport from "@/components/privileges/UsersPrivilegeReport.vue";
import UsersPrivilegeStatistics from "@/components/privileges/UsersPrivilegeStatistics.vue";
import UsersPrivilegeTreasuries from "@/components/privileges/UsersPrivilegeTreasuries.vue";
import UsersPrivilegeTreasuriesTransaction from "@/components/privileges/UsersPrivilegeTreasuriesTransaction.vue";
import UsersPrivilegeExpenses from "@/components/privileges/UsersPrivilegeExpenses.vue";
import UsersPrivilegeRevenus from "@/components/privileges/UsersPrivilegeRevenus.vue";
import UsersPrivilegAdditionalSettings from "@/components/privileges/UsersPrivilegAdditionalSettings.vue";
import UsersPrivilegeServiceReservationMedia from "@/components/privileges/UsersPrivilegeServiceReservationMedia";
import UsersPrivilegeServicesReservationAddedServices from "@/components/privileges/UsersPrivilegeServicesReservationAddedServices";
import UsersPrivilegeHistoricalPlans from "@/components/privileges/UsersPrivilegeHistoricalPlans";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "PrivilegeForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomSelectBox,
    UsersPrivilegeUsers,
    UsersPrivilegeEmployees,
    UsersPrivilegeServiceResponsibleBonuses,
    UsersPrivilegeServicesReservationEmployeeBenefit,
    // UsersPrivilegeEmployeesAttendance,
    // UsersPrivilegeEmployeesMovement,
    // UsersPrivilegeEmployeesMovementMedai,
    // UsersPrivilegeEmployeesSettlementMovement,
    // UsersPirivilegeEmployeesMoveSlides,
    // UserPrivillegBranchesSettings,
    // UsersPrivilegeEstablishmentsSettings,
    UsersPrivilegeClients,
    UsersPrivilegeNews,
    UsersPrivilegeOffers,
    UsersPrivilegeBranches,
    UsersPrivilegeOfficesTimes,
    UsersPrivilegeServicesReservations,
    UsersPrivilegeReport,
    UsersPrivilegeStatistics,
    UsersPrivilegeTreasuries,
    UsersPrivilegeTreasuriesTransaction,
    UsersPrivilegeExpenses,
    UsersPrivilegeRevenus,
    UsersPrivilegAdditionalSettings,
    UsersPrivilegeServiceReservationMedia,
    UsersPrivilegeServicesReservationAddedServices,
    UsersPrivilegeHistoricalPlans,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      employeeTokenOptions: [],
    };
  },
  props: ["userPrivilegeData", "submitName"],
  methods: {
    async getDialogOfEmployees() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployee"),
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
    async getUserPrivilege() {
      this.isLoading = true;
      try {
        let response = await this.userPrivilegeData.getUserPrivilege(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.userPrivilegeData.fillData(response.data.userPrivilegeData);
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
    async updateUserPrivilege() {
      this.$emit("updateUserPrivilege");
    },
  },
  async created() {
    this.getDialogOfEmployees();
  },
  watch: {
    "userPrivilegeData.usersPersonalData.employeeToken": function () {
      this.getUserPrivilege();
    },
  },
};
</script>

<style scoped lang="scss"></style>
