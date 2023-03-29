<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="medicinesTypesData">
      <MedicinesTypesTable
        :medicinesTypesData="medicinesTypesData"
        :medicinesTypeData="medicinesTypeData"
        v-on:setMedicinesTypeData="medicinesTypeData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MedicinesTypeInfo :medicinesTypeData="medicinesTypeData" />
      <MedicinesTypeDelete
        :medicinesTypeData="medicinesTypeData"
        v-on:refresh="getAllMedicinesTypes()"
      />
    </div>

    <MedicinesTypeBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import MedicinesTypesTable from "@/components/settings/settingsOther/medicinesTypes/MedicinesTypesTable.vue";
import MedicinesTypeInfo from "@/components/settings/settingsOther/medicinesTypes/MedicinesTypeInfo.vue";
import MedicinesTypeDelete from "@/components/settings/settingsOther/medicinesTypes/MedicinesTypeDelete.vue";
import MedicinesTypeBtns from "@/components/settings/settingsOther/medicinesTypes/MedicinesTypeBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MedicinesType from "@/models/settings/settingsOther/medicinesTypes/MedicinesType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicinesTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicinesTypesTable,
    MedicinesTypeInfo,
    MedicinesTypeDelete,
    MedicinesTypeBtns,
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
      medicinesTypesData: null,
      medicinesTypeData: new MedicinesType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllMedicinesTypes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllMedicinesTypes();
    },
    async getAllMedicinesTypes() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/MedicinesTypes/GetAllMedicinesTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.medicinesTypesPagination.totalPages,
            totalItems: response.data.medicinesTypesPagination.totalItems,
            countItemsInPage:
              response.data.medicinesTypesPagination.countItemsInPage,
            selfPage: response.data.medicinesTypesPagination.selfPage,
          };
          this.medicinesTypesData =
            response.data.medicinesTypesPagination.medicinesTypesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.medicinesTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.medicinesTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.medicinesTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.medicinesTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllMedicinesTypes();
  },
};
</script>
