import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import MeasurementRooms from "@/views/historicalPlans/measurementRooms/MeasurementRooms.vue";
import MeasurementRoomAdd from "@/views/historicalPlans/measurementRooms/MeasurementRoomAdd.vue";
import MeasurementRoomEdit from "@/views/historicalPlans/measurementRooms/MeasurementRoomEdit.vue";

const Routes = [
  {
    path: "measurement-rooms",
    name: "MeasurementRooms",
    component: MeasurementRooms,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-measurement-room",
    name: "MeasurementRoomAdd",
    component: MeasurementRoomAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-measurement-room",
    name: "MeasurementRoomEdit",
    component: MeasurementRoomEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
