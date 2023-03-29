import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import Operations from "@/views/historicalPlans/operations/Operations.vue";
import OperationAdd from "@/views/historicalPlans/operations/OperationAdd.vue";
import OperationEdit from "@/views/historicalPlans/operations/OperationEdit.vue";

const Routes = [
  {
    path: "operations",
    name: "Operations",
    component: Operations,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-operation",
    name: "OperationAdd",
    component: OperationAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-operation",
    name: "OperationEdit",
    component: OperationEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
