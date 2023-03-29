import { ifNotAuthenticated } from "@/utils/functions";
import i18n from "@/i18n/index.js";

import Statistics from "@/views/statistics/Statistics.vue";

const Routes = [
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("statistics.modelName"),
      pageIcon: "statistics.svg",
      currentPage: "reportsAndStatistics",
      currentSubPage: "statistics",
    },
  },
];

export default Routes;
