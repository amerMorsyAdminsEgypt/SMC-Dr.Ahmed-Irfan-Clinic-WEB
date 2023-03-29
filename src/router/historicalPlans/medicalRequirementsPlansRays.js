import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import MedicalRequirementsPlansRays from "@/views/historicalPlans/medicalRequirementsPlansRays/MedicalRequirementsPlansRays.vue";
import MedicalRequirementsPlanRaysAdd from "@/views/historicalPlans/medicalRequirementsPlansRays/MedicalRequirementsPlanRaysAdd.vue";
import MedicalRequirementsPlanRaysEdit from "@/views/historicalPlans/medicalRequirementsPlansRays/MedicalRequirementsPlanRaysEdit.vue";

const Routes = [
  {
    path: "medical-requirements-plans-rays",
    name: "MedicalRequirementsPlansRays",
    component: MedicalRequirementsPlansRays,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-medical-requirements-plan-rays",
    name: "MedicalRequirementsPlanRaysAdd",
    component: MedicalRequirementsPlanRaysAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-medical-requirements-plan-rays",
    name: "MedicalRequirementsPlanRaysEdit",
    component: MedicalRequirementsPlanRaysEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
