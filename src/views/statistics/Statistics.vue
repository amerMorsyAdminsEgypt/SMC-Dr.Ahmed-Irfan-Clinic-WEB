<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="!isLoading">
      <YearsStatisticsComponent
        v-if="
          checkPrivilege(
            usersPrivilegeData.usersPrivilegeStatistics
              .servicesReservationStatisticsView
          )
        "
        :yearsData="statistics.allStatisticsData.yearsData"
      />

      <GeneralStatisticsComponent
        v-if="
          checkPrivilege(
            usersPrivilegeData.usersPrivilegeStatistics.generalStatisticsView
          )
        "
        :generalStatisticsData="
          statistics.allStatisticsData.generalStatisticsData
        "
      />

      <BranchesStatisticsComponent
        v-if="
          checkPrivilege(
            usersPrivilegeData.usersPrivilegeStatistics
              .branchesInformationStatisticsView
          )
        "
        :branchesInformationStatisticsData="
          statistics.allStatisticsData.branchesInformationStatisticsData
        "
      />

      <AdditionalSettingsStatisticsComponent
        v-if="
          checkPrivilege(
            usersPrivilegeData.usersPrivilegeStatistics
              .additionalSettingsStatisticsView
          )
        "
        :additionalSettingsStatisticsData="
          statistics.allStatisticsData.additionalSettingsStatisticsData
        "
      />
    </div>

    <ServicesReservationFloatBtns
      v-if="!isLoading"
      :filterServicesReservationData="statistics.filterData"
      :hideAddBtn="true"
      v-on:search="refresh"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import Statistics from "@/models/statistics/Statistics";
import GeneralStatisticsComponent from "@/components/statistics/generalStatistics/GeneralStatistics.vue";
import BranchesStatisticsComponent from "@/components/statistics/branchesStatistics/BranchesStatistics.vue";
import AdditionalSettingsStatisticsComponent from "@/components/statistics/additionalSettingsStatistics/AdditionalSettingsStatistics.vue";
import YearsStatisticsComponent from "@/components/statistics/yearsStatistics/YearsStatistics.vue";
import ServicesReservationFloatBtns from "@/components/servicesReservations/ServicesReservationFloatBtns.vue";
import { checkPrivilege } from "@/utils/functions";
import UserPrivilege from "@/models/privileges/UserPrivilege";

export default {
  name: "Statistics",
  components: {
    PreLoader,
    ExceptionWithImg,
    GeneralStatisticsComponent,
    BranchesStatisticsComponent,
    AdditionalSettingsStatisticsComponent,
    YearsStatisticsComponent,
    ServicesReservationFloatBtns,
  },
  data() {
    return {
      usersPrivilegeData:
        this.$store.getters.usersPrivilegeData || new UserPrivilege(),
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      statistics: new Statistics(),
    };
  },
  methods: {
    checkPrivilege(privilegeStatus) {
      return checkPrivilege(privilegeStatus);
    },
    async getAllStatistics() {
      this.isLoading = true;
      try {
        const response =
          await this.statistics.allStatisticsData.getAllStatistics(
            this.language,
            this.userAuthorizeToken,
            this.statistics.filterData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.statistics.fillData(response.data);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.statistics.allStatisticsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.statistics.allStatisticsData = null;
          this.$store.dispatch("logoutUser");
          this.$router.push("/").catch(() => {});
        } else {
          this.statistics.allStatisticsData = null;
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.statistics.allStatisticsData = null;
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
    refresh() {
      this.servicesReservationsData = null;
      this.getAllStatistics();
    },
  },
  created() {
    this.getAllStatistics();
  },
};
</script>

<style scoped lang="scss"></style>
