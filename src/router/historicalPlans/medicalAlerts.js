import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import MedicalAlerts from "@/views/historicalPlans/medicalAlerts/MedicalAlerts.vue";
import MedicalAlertAdd from "@/views/historicalPlans/medicalAlerts/MedicalAlertAdd.vue";
import MedicalAlertEdit from "@/views/historicalPlans/medicalAlerts/MedicalAlertEdit.vue";

const Routes = [
  {
    path: "medical-alerts",
    name: "MedicalAlerts",
    component: MedicalAlerts,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-medical-alert",
    name: "MedicalAlertAdd",
    component: MedicalAlertAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-medical-alert",
    name: "MedicalAlertEdit",
    component: MedicalAlertEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
