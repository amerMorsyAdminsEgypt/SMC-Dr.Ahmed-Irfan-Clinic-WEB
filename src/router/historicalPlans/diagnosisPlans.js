import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import DiagnosisPlans from "@/views/historicalPlans/diagnosisPlans/DiagnosisPlans.vue";
import DiagnosisPlanAdd from "@/views/historicalPlans/diagnosisPlans/DiagnosisPlanAdd.vue";
import DiagnosisPlanEdit from "@/views/historicalPlans/diagnosisPlans/DiagnosisPlanEdit.vue";

const Routes = [
  {
    path: "diagnosis-plans",
    name: "DiagnosisPlans",
    component: DiagnosisPlans,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-diagnosis-plan",
    name: "DiagnosisPlanAdd",
    component: DiagnosisPlanAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-diagnosis-plan",
    name: "DiagnosisPlanEdit",
    component: DiagnosisPlanEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
