import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import AddictiveStuffClientsHabits from "@/views/historicalPlans/addictiveStuffClientsHabits/AddictiveStuffClientsHabits.vue";
import AddictiveStuffClientHabitsAdd from "@/views/historicalPlans/addictiveStuffClientsHabits/AddictiveStuffClientHabitsAdd.vue";
import AddictiveStuffClientHabitsEdit from "@/views/historicalPlans/addictiveStuffClientsHabits/AddictiveStuffClientHabitsEdit.vue";

const Routes = [
  {
    path: "addictive-stuff-clients-habits",
    name: "AddictiveStuffClientsHabits",
    component: AddictiveStuffClientsHabits,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-addictive-stuff-client-habits",
    name: "AddictiveStuffClientHabitsAdd",
    component: AddictiveStuffClientHabitsAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-addictive-stuff-client-habits",
    name: "AddictiveStuffClientHabitsEdit",
    component: AddictiveStuffClientHabitsEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
