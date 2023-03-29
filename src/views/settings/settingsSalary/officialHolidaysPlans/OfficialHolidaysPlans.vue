<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="officialHolidaysPlansData">
      <OfficialHolidaysPlansTable
        v-on:setOfficialHolidaysPlanData="
          officialHolidaysPlanData.fillData($event)
        "
        :officialHolidaysPlansData="officialHolidaysPlansData"
        :officialHolidaysPlanData="officialHolidaysPlanData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <OfficialHolidaysPlanDelete
        :officialHolidaysPlanData="officialHolidaysPlanData"
        v-on:refresh="getAllOfficialHolidaysPlans()"
      />
    </div>

    <OfficialHolidaysPlanFloatBtns
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OfficialHolidaysPlansTable from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlansTable.vue";
import OfficialHolidaysPlanDelete from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanDelete.vue";
import OfficialHolidaysPlanFloatBtns from "@/components/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlanFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import OfficialHolidaysPlan from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlan";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "OfficialHolidaysPlans",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfficialHolidaysPlansTable,
    OfficialHolidaysPlanDelete,
    OfficialHolidaysPlanFloatBtns,
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
      officialHolidaysPlansData: null,
      officialHolidaysPlanData: new OfficialHolidaysPlan(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllOfficialHolidaysPlans();
    },
    search(text) {
      this.textSearch = text;
      this.getAllOfficialHolidaysPlans();
    },
    async getAllOfficialHolidaysPlans() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/OfficialHolidaysPlans/GetOfficialHolidaysPlanses?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.officialHolidaysPlansPagination.totalPages,
            totalItems:
              response.data.officialHolidaysPlansPagination.totalItems,
            countItemsInPage:
              response.data.officialHolidaysPlansPagination.countItemsInPage,
            selfPage: response.data.officialHolidaysPlansPagination.selfPage,
          };
          this.officialHolidaysPlansData =
            response.data.officialHolidaysPlansPagination.officialHolidaysPlansData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.officialHolidaysPlansData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.officialHolidaysPlansData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.officialHolidaysPlansData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officialHolidaysPlansData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllOfficialHolidaysPlans();
  },
};
</script>
