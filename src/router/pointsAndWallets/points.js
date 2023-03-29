import { ifNotAuthenticated } from "@/utils/functions";
import i18n from "@/i18n/index.js";

import Points from "@/views/pointsAndWallets/points/Points.vue";
import PointAdd from "@/views/pointsAndWallets/points/PointAdd.vue";

const Routes = [
  {
    path: "/points-transactions",
    name: "PointsTransactions",
    component: Points,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("pointsAndWallets.points.modelName"),
      pageIcon: "points.svg",
      currentPage: "points-wallets",
      currentSubPage: "points-transactions",
    },
  },
  {
    path: "/add-point-transaction",
    name: "PointAdd",
    component: PointAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("pointsAndWallets.points.add"),
      pageIcon: "points.svg",
      currentPage: "points-wallets",
      currentSubPage: "points-transactions",
    },
  },
];

export default Routes;
