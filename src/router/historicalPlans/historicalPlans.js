import { ifNotAuthenticated } from "@/utils/functions";
import meta from "./metaOfRoute";

import HistoricalPlans from "@/views/historicalPlans/HistoricalPlans.vue";

import DiagnosisPlansRoute from "./diagnosisPlans";
import QuestionPlansRoute from "./questionPlans";
import MedicationPlansRoute from "./medicationPlans";
import MedicalAlertsRoute from "./medicalAlerts";
import MeasurementRoomsRoute from "./measurementRooms";
import DoctorNotesRoute from "./doctorNotes";
import OperationRoute from "./operations";
import MedicalRequirementsPlansRaysRoute from "./medicalRequirementsPlansRays";
import MedicalRequirementsPlansTestsRoute from "./medicalRequirementsPlansTests";
import CurePlansRoute from "./curePlans";
import AddictiveStuffClientsHabitsRoute from "./addictiveStuffClientsHabits";
import AddictiveStuffClientsDiseasesRoute from "./addictiveStuffClientsDiseases";

const Routes = [
  {
    path: "/historical-plans",
    name: "HistoricalPlans",
    component: HistoricalPlans,
    beforeEnter: ifNotAuthenticated,
    props(route) {
      return route.params || {};
    },
    meta: meta,
    children: [
      ...DiagnosisPlansRoute,
      ...QuestionPlansRoute,
      ...MedicationPlansRoute,
      ...MedicalAlertsRoute,
      ...MeasurementRoomsRoute,
      ...DoctorNotesRoute,
      ...OperationRoute,
      ...MedicalRequirementsPlansRaysRoute,
      ...MedicalRequirementsPlansTestsRoute,
      ...CurePlansRoute,
      ...AddictiveStuffClientsHabitsRoute,
      ...AddictiveStuffClientsDiseasesRoute,
    ],
  },
];

export default Routes;
