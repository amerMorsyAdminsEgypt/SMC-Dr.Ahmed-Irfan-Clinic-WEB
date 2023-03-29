<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="medicinesData">
      <MedicinesTable
        :medicinesData="medicinesData"
        :medicineData="medicineData"
        v-on:setMedicineData="medicineData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MedicineInfo :medicineData="medicineData" />
      <MedicineDelete
        :medicineData="medicineData"
        v-on:refresh="getAllMedicines()"
      />
    </div>

    <MedicineBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import MedicinesTable from "@/components/settings/settingsOther/medicines/MedicinesTable.vue";
import MedicineInfo from "@/components/settings/settingsOther/medicines/MedicineInfo.vue";
import MedicineDelete from "@/components/settings/settingsOther/medicines/MedicineDelete.vue";
import MedicineBtns from "@/components/settings/settingsOther/medicines/MedicineBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Medicine from "@/models/settings/settingsOther/medicines/Medicine";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Medicines",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicinesTable,
    MedicineInfo,
    MedicineDelete,
    MedicineBtns,
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
      medicinesData: null,
      medicineData: new Medicine(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllMedicines();
    },
    search(text) {
      this.textSearch = text;
      this.getAllMedicines();
    },
    async getAllMedicines() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Medicines/GetAllMedicines?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.medicinesPagination.totalPages,
            totalItems: response.data.medicinesPagination.totalItems,
            countItemsInPage:
              response.data.medicinesPagination.countItemsInPage,
            selfPage: response.data.medicinesPagination.selfPage,
          };
          this.medicinesData = response.data.medicinesPagination.medicinesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.medicinesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.medicinesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.medicinesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.medicinesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllMedicines();
  },
};
</script>
