<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="citiesData">
      <CitiesTable
        :citiesData="citiesData"
        :cityData="cityData"
        v-on:setCityData="cityData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <CityInfo :cityData="cityData" />
      <CityDelete :cityData="cityData" v-on:refresh="getAllCities()" />
    </div>

    <CityBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import CitiesTable from "@/components/settings/settingsOther/cities/CitiesTable.vue";
import CityInfo from "@/components/settings/settingsOther/cities/CityInfo.vue";
import CityDelete from "@/components/settings/settingsOther/cities/CityDelete.vue";
import CityBtns from "@/components/settings/settingsOther/cities/CityBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import City from "@/models/settings/settingsOther/cities/City";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Cities",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CitiesTable,
    CityInfo,
    CityDelete,
    CityBtns,
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
      citiesData: null,
      cityData: new City(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllCities();
    },
    search(text) {
      this.filterStatus = true;
      this.textSearch = text;
      this.getAllCities();
    },
    async getAllCities() {
      this.isLoading = true;
      try {
        const response = await this.cityData.getAllCities(
          this.language,
          this.userAuthorizeToken,
          this.paginationData.selfPage,
          this.filterStatus,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.CitiesPagination.totalPages,
            totalItems: response.data.CitiesPagination.totalItems,
            countItemsInPage: response.data.CitiesPagination.countItemsInPage,
            selfPage: response.data.CitiesPagination.selfPage,
          };
          this.citiesData = response.data.CitiesPagination.citiesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.citiesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.citiesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.citiesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.citiesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllCities();
    // console.log(this.citiesData);
  },
};
</script>
