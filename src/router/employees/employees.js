import { ifNotAuthenticated } from "@/utils/functions";
import i18n from "@/i18n/index.js";

import Employees from "@/views/employees/employees/Employees.vue";
import EmployeeAdd from "@/views/employees/employees/EmployeeAdd.vue";
import EmployeeEdit from "@/views/employees/employees/EmployeeEdit.vue";

const Routes = [
  {
    path: "/employees",
    name: "Employees",
    component: Employees,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("theEmployees"),
      pageIcon: "employees.svg",
      currentPage: "theEmployees",
      currentSubPage: "employees",
    },
  },
  {
    path: "/add-employee",
    name: "EmployeeAdd",
    component: EmployeeAdd,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("employeeAdd"),
      pageIcon: "addUser.svg",
      currentPage: "theEmployees",
      currentSubPage: "employees",
    },
  },
  {
    path: "/edit-employee/:employeeToken",
    name: "EmployeeEdit",
    component: EmployeeEdit,
    beforeEnter: ifNotAuthenticated,
    meta: {
      pageName: i18n.t("employeeEdit"),
      pageIcon: "employees.svg",
      currentPage: "theEmployees",
      currentSubPage: "employees",
    },
  },
];

export default Routes;
