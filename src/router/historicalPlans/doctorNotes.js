import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import DoctorNotes from "@/views/historicalPlans/doctorNotes/DoctorNotes.vue";
import DoctorNoteAdd from "@/views/historicalPlans/doctorNotes/DoctorNoteAdd.vue";
import DoctorNoteEdit from "@/views/historicalPlans/doctorNotes/DoctorNoteEdit.vue";

const Routes = [
  {
    path: "doctor-notes",
    name: "DoctorNotes",
    component: DoctorNotes,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "add-doctor-note",
    name: "DoctorNoteAdd",
    component: DoctorNoteAdd,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
  {
    path: "edit-doctor-note",
    name: "DoctorNoteEdit",
    component: DoctorNoteEdit,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
  },
];

export default Routes;
