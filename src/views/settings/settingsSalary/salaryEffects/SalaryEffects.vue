<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="salaryEffectsData">
      <SalaryEffectsTable
        :salaryEffectsData="salaryEffectsData"
        :salaryEffectData="salaryEffectData"
        v-on:setSalaryEffectData="salaryEffectData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <!-- <SalaryEffectInfo :salaryEffectData="salaryEffectData" /> -->
      <SalaryEffectDelete
        :salaryEffectData="salaryEffectData"
        v-on:refresh="getAllEmployeeSalaryEffects()"
      />
    </div>

    <SalaryEffectFloatBtns
      :textSearch="textSearch"
      :employeeSalaryEffectTypeToken="employeeSalaryEffectTypeToken"
      :calculationMethodTypeToken="calculationMethodTypeToken"
      :employeeSalaryEffectFeeTypeToken="employeeSalaryEffectFeeTypeToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import SalaryEffectsTable from "@/components/settings/settingsSalary/salaryEffects/SalaryEffectsTable.vue";
// import SalaryEffectInfo from "@/components/settings/settingsSalary/salaryEffects/SalaryEffectInfo.vue";
import SalaryEffectDelete from "@/components/settings/settingsSalary/salaryEffects/SalaryEffectDelete.vue";
import SalaryEffectFloatBtns from "@/components/settings/settingsSalary/salaryEffects/SalaryEffectFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import SalaryEffect from "@/models/settings/settingsSalary/salaryEffects/SalaryEffect";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "SalaryEffects",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    SalaryEffectsTable,
    // SalaryEffectInfo,
    SalaryEffectDelete,
    SalaryEffectFloatBtns,
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
      employeeSalaryEffectTypeToken: "",
      calculationMethodTypeToken: "",
      employeeSalaryEffectFeeTypeToken: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      salaryEffectsData: null,
      salaryEffectData: new SalaryEffect(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeeSalaryEffects();
    },
    search(
      text,
      employeeSalaryEffectTypeToken,
      calculationMethodTypeToken,
      employeeSalaryEffectFeeTypeToken
    ) {
      this.textSearch = text;
      this.employeeSalaryEffectTypeToken = employeeSalaryEffectTypeToken;
      this.calculationMethodTypeToken = calculationMethodTypeToken;
      this.employeeSalaryEffectFeeTypeToken = employeeSalaryEffectFeeTypeToken;
      this.getAllEmployeeSalaryEffects();
    },
    async getAllEmployeeSalaryEffects() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeeSalaryEffect/GetAllEmployeeSalaryEffect?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&employeeSalaryEffectTypeToken=${this.employeeSalaryEffectTypeToken}&calculationMethodTypeToken=${this.calculationMethodTypeToken}&employeeSalaryEffectFeeTypeToken=${this.employeeSalaryEffectFeeTypeToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeeSalaryEffectsPagination.totalPages,
            totalItems:
              response.data.employeeSalaryEffectsPagination.totalItems,
            countItemsInPage:
              response.data.employeeSalaryEffectsPagination.countItemsInPage,
            selfPage: response.data.employeeSalaryEffectsPagination.selfPage,
          };
          this.salaryEffectsData =
            response.data.employeeSalaryEffectsPagination.employeeSalaryEffectData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.salaryEffectsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.salaryEffectsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.salaryEffectsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.salaryEffectsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllEmployeeSalaryEffects();
  },
};
</script>
