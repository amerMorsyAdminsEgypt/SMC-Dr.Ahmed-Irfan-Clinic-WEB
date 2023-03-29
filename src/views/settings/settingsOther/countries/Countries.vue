<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="countriesData">
      <CountriesTable
        :countriesData="countriesData"
        :countryData="countryData"
        v-on:setCountryData="countryData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <CountryInfo :countryData="countryData" />
      <CountryDelete
        :countryData="countryData"
        v-on:refresh="getAllCountries()"
      />
    </div>

    <CountryBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import CountriesTable from "@/components/settings/settingsOther/countries/CountriesTable.vue";
import CountryInfo from "@/components/settings/settingsOther/countries/CountryInfo.vue";
import CountryDelete from "@/components/settings/settingsOther/countries/CountryDelete.vue";
import CountryBtns from "@/components/settings/settingsOther/countries/CountryBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Country from "@/models/settings/settingsOther/countries/Country";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Countries",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CountriesTable,
    CountryInfo,
    CountryDelete,
    CountryBtns,
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
      countriesData: null,
      countryData: new Country(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllCountries();
    },
    search(text) {
      this.filterStatus = true;
      this.textSearch = text;
      this.getAllCountries();
    },
    async getAllCountries() {
      this.isLoading = true;
      try {
        const response = await this.countryData.getAllCountries(
          this.language,
          this.userAuthorizeToken,
          this.paginationData.selfPage,
          this.filterStatus,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.countriesPagination.totalPages,
            totalItems: response.data.countriesPagination.totalItems,
            countItemsInPage:
              response.data.countriesPagination.countItemsInPage,
            selfPage: response.data.countriesPagination.selfPage,
          };
          this.countriesData = response.data.countriesPagination.countriesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.countriesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.countriesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.countriesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.countriesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  async created() {
    this.getAllCountries();
  },
};
</script>
