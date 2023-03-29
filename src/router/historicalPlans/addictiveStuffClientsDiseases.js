import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import AddictiveStuffClientsDiseases from "@/views/historicalPlans/addictiveStuffClientsDiseases/AddictiveStuffClientsDiseases.vue";
import AddictiveStuffClientDiseasesAdd from "@/views/historicalPlans/addictiveStuffClientsDiseases/AddictiveStuffClientDiseasesAdd.vue";
import AddictiveStuffClientDiseasesEdit from "@/views/historicalPlans/addictiveStuffClientsDiseases/AddictiveStuffClientDiseasesEdit.vue";

const Routes = [
  {
    path: "addictive-stuff-clients-diseases",
    name: "AddictiveStuffClientsDiseases",
    component: AddictiveStuffClientsDiseases,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-addictive-stuff-client-diseases",
    name: "AddictiveStuffClientDiseasesAdd",
    component: AddictiveStuffClientDiseasesAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-addictive-stuff-client-diseases",
    name: "AddictiveStuffClientDiseasesEdit",
    component: AddictiveStuffClientDiseasesEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
