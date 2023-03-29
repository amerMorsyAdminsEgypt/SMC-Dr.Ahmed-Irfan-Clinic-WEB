import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import MedicationPlans from "@/views/historicalPlans/medicationPlans/MedicationPlans.vue";
import MedicationPlanAdd from "@/views/historicalPlans/medicationPlans/MedicationPlanAdd.vue";
import MedicationPlanEdit from "@/views/historicalPlans/medicationPlans/MedicationPlanEdit.vue";

const Routes = [
  {
    path: "medication-plans",
    name: "MedicationPlans",
    component: MedicationPlans,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-medication-plan",
    name: "MedicationPlanAdd",
    component: MedicationPlanAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-medication-plan",
    name: "MedicationPlanEdit",
    component: MedicationPlanEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
