<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="districtsData">
      <DistrictsTable
        :districtsData="districtsData"
        :districtData="districtData"
        v-on:setDistrictData="districtData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <DistrictInfo :districtData="districtData" />
      <DistrictDelete
        :districtData="districtData"
        v-on:refresh="getAllDistricts()"
      />
    </div>

    <DistrictBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DistrictsTable from "@/components/settings/settingsOther/districts/DistrictsTable.vue";
import DistrictInfo from "@/components/settings/settingsOther/districts/DistrictInfo.vue";
import DistrictDelete from "@/components/settings/settingsOther/districts/DistrictDelete.vue";
import DistrictBtns from "@/components/settings/settingsOther/districts/DistrictBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import District from "@/models/settings/settingsOther/districts/District";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Districts",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    DistrictsTable,
    DistrictInfo,
    DistrictDelete,
    DistrictBtns,
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
      filterStatus: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      districtsData: null,
      districtData: new District(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllDistricts();
    },
    search(text) {
      this.filterStatus = true;
      this.textSearch = text;
      this.getAllDistricts();
    },
    async getAllDistricts() {
      this.isLoading = true;
      try {
        const response = await this.districtData.getAllDistricts(
          this.language,
          this.userAuthorizeToken,
          this.paginationData.selfPage,
          this.filterStatus,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.DistrictsPagination.totalPages,
            totalItems: response.data.DistrictsPagination.totalItems,
            countItemsInPage:
              response.data.DistrictsPagination.countItemsInPage,
            selfPage: response.data.DistrictsPagination.selfPage,
          };
          this.districtsData = response.data.DistrictsPagination.districtsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.districtsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.districtsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.districtsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.districtsData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllDistricts();
    // console.log(this.districtsData);
  },
};
</script>
