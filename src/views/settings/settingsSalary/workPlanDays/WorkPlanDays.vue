<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="workPlanDaysData">
      <WorkPlanDaysTable
        :workPlanDaysData="workPlanDaysData"
        :workPlanDayData="workPlanDayData"
        v-on:setWorkPlanDayData="workPlanDayData.fillData($event)"
        v-on:setWorkPlanShiftData="workPlanShiftData.fillData($event)"
      />

      <WorkPlanDayEdit
        :workPlanDayData="workPlanDayData"
        v-on:refresh="getAllWorkPlanDays()"
      />
      <WorkPlanShiftsAdd
        :workPlanDayData="workPlanDayData"
        v-on:refresh="getAllWorkPlanDays()"
      />
      <WorkPlanShiftEdit
        :workPlanShiftData="workPlanShiftData"
        v-on:refresh="getAllWorkPlanDays()"
      />
      <WorkPlanShiftDelete
        :workPlanShiftData="workPlanShiftData"
        v-on:refresh="getAllWorkPlanDays()"
      />
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import WorkPlanDaysTable from "@/components/settings/settingsSalary/workPlanDays/WorkPlanDaysTable.vue";
import WorkPlanDayEdit from "@/components/settings/settingsSalary/workPlanDays/WorkPlanDayEdit.vue";
import WorkPlanShiftsAdd from "@/components/settings/settingsSalary/workPlanDays/WorkPlanShiftsAdd.vue";
import WorkPlanShiftEdit from "@/components/settings/settingsSalary/workPlanDays/WorkPlanShiftEdit.vue";
import WorkPlanShiftDelete from "@/components/settings/settingsSalary/workPlanDays/WorkPlanShiftDelete.vue";
import WorkPlanDay from "@/models/settings/settingsSalary/workPlanDays/WorkPlanDay";
import WorkPlanShift from "@/models/settings/settingsSalary/workPlanShifts/WorkPlanShift";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkPlanDays",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WorkPlanDaysTable,
    WorkPlanDayEdit,
    WorkPlanShiftsAdd,
    WorkPlanShiftEdit,
    WorkPlanShiftDelete,
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
      workPlanToken: this.$route.params.workPlanToken,
      workPlanDaysData: null,
      workPlanDayData: new WorkPlanDay(),
      workPlanShiftData: new WorkPlanShift(),
    };
  },
  methods: {
    async getAllWorkPlanDays() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/WorkPlansDays/GetAllWorkPlansDays?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&workPlanToken=${this.workPlanToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.workPlansDaysPagination.totalPages,
            totalItems: response.data.workPlansDaysPagination.totalItems,
            countItemsInPage:
              response.data.workPlansDaysPagination.countItemsInPage,
            selfPage: response.data.workPlansDaysPagination.selfPage,
          };
          this.workPlanDaysData =
            response.data.workPlansDaysPagination.workPlansDaysData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.workPlanDaysData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.workPlanDaysData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.workPlanDaysData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.workPlanDaysData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllWorkPlanDays();
  },
};
</script>
