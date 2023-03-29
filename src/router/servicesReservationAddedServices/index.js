import { ifNotAuthenticated } from "@/utils/functions";
import i18n from "@/i18n/index.js";

import ServicesReservationAddedServices from "@/views/servicesReservationAddedServices/ServicesReservationAddedServices.vue";
import ServicesReservationAddedServiceAdd from "@/views/servicesReservationAddedServices/ServicesReservationAddedServiceAdd.vue";

const Routes = [
  {
    path: "/services-reservation-added-services",
    name: "ServicesReservationAddedServices",
    component: ServicesReservationAddedServices,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("ServicesReservationAddedServices.modelName"),
      pageIcon: "added-services.svg",
      currentPage: "services-reservation-added-services",
      currentSubPage: "",
    },
  },
  {
    path: "/add-services-reservation-added-service",
    name: "ServicesReservationAddedServiceAdd",
    component: ServicesReservationAddedServiceAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: {
      pageName: i18n.t("ServicesReservationAddedServices.add"),
      pageIcon: "added-services.svg",
      currentPage: "services-reservation-added-services",
      currentSubPage: "",
    },
  },
];

export default Routes;
