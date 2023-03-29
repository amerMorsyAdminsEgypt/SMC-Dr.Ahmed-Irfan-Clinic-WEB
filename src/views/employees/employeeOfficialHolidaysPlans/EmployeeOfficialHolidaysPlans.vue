<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeeOfficialHolidaysPlansData">
      <EmployeeOfficialHolidaysPlansTable
        v-on:setEmployeeOfficialHolidaysPlanData="
          employeeOfficialHolidaysPlanData.fillData($event)
        "
        :employeeOfficialHolidaysPlansData="employeeOfficialHolidaysPlansData"
        :employeeOfficialHolidaysPlanData="employeeOfficialHolidaysPlanData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <EmployeeOfficialHolidaysPlanDelete
        :employeeOfficialHolidaysPlanData="employeeOfficialHolidaysPlanData"
        v-on:refresh="getAllEmployeeOfficialHolidaysPlans()"
      />
    </div>

    <!-- <EmployeeOfficialHolidaysPlanFloatBtns
      :textSearch="textSearch"
      v-on:search="search"
    /> -->
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import EmployeeOfficialHolidaysPlansTable from "@/components/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlansTable.vue";
import EmployeeOfficialHolidaysPlanDelete from "@/components/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlanDelete.vue";
// import EmployeeOfficialHolidaysPlanFloatBtns from "@/components/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import EmployeeOfficialHolidaysPlan from "@/models/employees/employeeOfficialHolidaysPlans/EmployeeOfficialHolidaysPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeeOfficialHolidaysPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeOfficialHolidaysPlansTable,
    EmployeeOfficialHolidaysPlanDelete,
    // EmployeeOfficialHolidaysPlanFloatBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      employeeToken: this.$route.params.employeeToken,
      employeeOfficialHolidaysPlansData: null,
      employeeOfficialHolidaysPlanData: new EmployeeOfficialHolidaysPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeeOfficialHolidaysPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllEmployeeOfficialHolidaysPlans();
    },
    async getAllEmployeeOfficialHolidaysPlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeeOfficialHolidaysPlans/GetAllEmployeeOfficialHolidaysPlans?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&employeeToken=${this.employeeToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeeOfficialHolidaysPlansPagination.totalPages,
            totalItems:
              response.data.employeeOfficialHolidaysPlansPagination.totalItems,
            countItemsInPage:
              response.data.employeeOfficialHolidaysPlansPagination
                .countItemsInPage,
            selfPage:
              response.data.employeeOfficialHolidaysPlansPagination.selfPage,
          };
          this.employeeOfficialHolidaysPlansData =
            response.data.employeeOfficialHolidaysPlansPagination.employeeOfficialHolidaysPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeeOfficialHolidaysPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeeOfficialHolidaysPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeeOfficialHolidaysPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeeOfficialHolidaysPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllEmployeeOfficialHolidaysPlans();
  },
};
</script>
