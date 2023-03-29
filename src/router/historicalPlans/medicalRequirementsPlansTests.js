import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import MedicalRequirementsPlansTests from "@/views/historicalPlans/medicalRequirementsPlansTests/MedicalRequirementsPlansTests.vue";
import MedicalRequirementsPlanTestsAdd from "@/views/historicalPlans/medicalRequirementsPlansTests/MedicalRequirementsPlanTestsAdd.vue";
import MedicalRequirementsPlanTestsEdit from "@/views/historicalPlans/medicalRequirementsPlansTests/MedicalRequirementsPlanTestsEdit.vue";

const Routes = [
  {
    path: "medical-requirements-plans-tests",
    name: "MedicalRequirementsPlansTests",
    component: MedicalRequirementsPlansTests,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-medical-requirements-plan-tests",
    name: "MedicalRequirementsPlanTestsAdd",
    component: MedicalRequirementsPlanTestsAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-medical-requirements-plan-tests",
    name: "MedicalRequirementsPlanTestsEdit",
    component: MedicalRequirementsPlanTestsEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
