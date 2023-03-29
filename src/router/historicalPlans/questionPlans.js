import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import QuestionPlans from "@/views/historicalPlans/questionPlans/QuestionPlans.vue";
import QuestionPlanAdd from "@/views/historicalPlans/questionPlans/QuestionPlanAdd.vue";
import QuestionPlanEdit from "@/views/historicalPlans/questionPlans/QuestionPlanEdit.vue";

const Routes = [
  {
    path: "question-plans",
    name: "QuestionPlans",
    component: QuestionPlans,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-question-plan",
    name: "QuestionPlanAdd",
    component: QuestionPlanAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-question-plan",
    name: "QuestionPlanEdit",
    component: QuestionPlanEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
