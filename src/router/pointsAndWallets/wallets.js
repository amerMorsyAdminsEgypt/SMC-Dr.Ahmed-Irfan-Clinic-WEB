import { ifNotAuthenticated } from "@/utils/functions";
import i18n from "@/i18n/index.js";

import Wallets from "@/views/pointsAndWallets/wallets/Wallets.vue";
import WalletAdd from "@/views/pointsAndWallets/wallets/WalletAdd.vue";

const Routes = [
  {
    path: "/wallets",
    name: "Wallets",
    component: Wallets,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("pointsAndWallets.wallets.modelName"),
      pageIcon: "wallet.svg",
      currentPage: "points-wallets",
      currentSubPage: "wallets",
    },
  },
  {
    path: "/add-wallet",
    name: "WalletAdd",
    component: WalletAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("pointsAndWallets.wallets.add"),
      pageIcon: "wallet.svg",
      currentPage: "points-wallets",
      currentSubPage: "wallets",
    },
  },
];

export default Routes;
