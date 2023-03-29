import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import CurePlans from "@/views/historicalPlans/curePlans/CurePlans.vue";
import CurePlanAdd from "@/views/historicalPlans/curePlans/CurePlanAdd.vue";
import CurePlanEdit from "@/views/historicalPlans/curePlans/CurePlanEdit.vue";

const Routes = [
  {
    path: "cure-plans",
    name: "CurePlans",
    component: CurePlans,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-cure-plan",
    name: "CurePlanAdd",
    component: CurePlanAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-cure-plan",
    name: "CurePlanEdit",
    component: CurePlanEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
