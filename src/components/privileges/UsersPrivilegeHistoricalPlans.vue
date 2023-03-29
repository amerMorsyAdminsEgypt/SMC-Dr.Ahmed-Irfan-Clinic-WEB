<template>
  <div class="my-card">
    <b-button v-b-toggle.historicalPlans class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="historicalPlans">
      <div class="my-card">
        <UsersPrivilegeDiagnosisPlan
          :usersPrivilegeDiagnosisPlan="
            userPrivilegeData.usersPrivilegeDiagnosisPlan
          "
        />

        <UsersPrivilegeMedicationPlan
          :usersPrivilegeMedicationPlan="
            userPrivilegeData.usersPrivilegeMedicationPlan
          "
        />

        <UsersPrivilegeMeasurements
          :usersPrivilegeMeasurements="
            userPrivilegeData.usersPrivilegeServicesReservations
          "
        />

        <UsersPrivilegeMedicalRequirementsPlan
          :usersPrivilegeMedicalRequirementsPlan="
            userPrivilegeData.usersPrivilegeMedicalRequirementsPlan
          "
        />

        <UsersPrivilegeAddictiveStuffClient
          :usersPrivilegeAddictiveStuffClient="
            userPrivilegeData.usersPrivilegeAddictiveStuffClient
          "
        />

        <UsersPrivilegeSurgriesHistory
          :usersPrivilegeSurgriesHistory="
            userPrivilegeData.usersPrivilegeSurgriesHistory
          "
        />

        <UsersPrivilegeMedicalAlerts
          :usersPrivilegeMedicalAlerts="
            userPrivilegeData.usersPrivilegeMedicalAlerts
          "
        />

        <UsersPrivilegeCurePlans
          :usersPrivilegeCurePlans="userPrivilegeData.usersPrivilegeCurePlans"
        />

        <UsersPrivilegeDoctorNotes
          :usersPrivilegeDoctorNotes="
            userPrivilegeData.usersPrivilegeDoctorNotes
          "
        />

        <UsersPrivilegeQuestionPlan
          :usersPrivilegeQuestionPlan="
            userPrivilegeData.usersPrivilegeQuestionPlan
          "
        />
      </div>
    </b-collapse>
  </div>
</template>

<script>
import UsersPrivilegeMedicationPlan from "@/components/privileges/UsersPrivilegeMedicationPlan";
import UsersPrivilegeMedicalRequirementsPlan from "@/components/privileges/UsersPrivilegeMedicalRequirementsPlan";
import UsersPrivilegeDiagnosisPlan from "@/components/privileges/UsersPrivilegeDiagnosisPlan";
import UsersPrivilegeDoctorNotes from "@/components/privileges/UsersPrivilegeDoctorNotes";
import UsersPrivilegeCurePlans from "@/components/privileges/UsersPrivilegeCurePlans";
import UsersPrivilegeSurgriesHistory from "@/components/privileges/UsersPrivilegeSurgriesHistory";
import UsersPrivilegeQuestionPlan from "@/components/privileges/UsersPrivilegeQuestionPlan";
import UsersPrivilegeAddictiveStuffClient from "@/components/privileges/UsersPrivilegeAddictiveStuffClient";
import UsersPrivilegeMedicalAlerts from "@/components/privileges/UsersPrivilegeMedicalAlerts";
import UsersPrivilegeMeasurements from "@/components/privileges/UsersPrivilegeMeasurements";

export default {
  name: "UsersPrivilegeHistoricalPlans",
  components: {
    UsersPrivilegeMedicationPlan,
    UsersPrivilegeMedicalRequirementsPlan,
    UsersPrivilegeDiagnosisPlan,
    UsersPrivilegeDoctorNotes,
    UsersPrivilegeCurePlans,
    UsersPrivilegeSurgriesHistory,
    UsersPrivilegeQuestionPlan,
    UsersPrivilegeAddictiveStuffClient,
    UsersPrivilegeMedicalAlerts,
    UsersPrivilegeMeasurements,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["userPrivilegeData"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
