<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="servicesData">
      <div class="row">
        <ServiceCard
          v-for="service in servicesData"
          :key="service.serviceToken"
          :serviceData="service"
          v-on:setServiceData="serviceData.fillData($event)"
        />
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <ServiceInfo :serviceData="serviceData" />
      <ServiceDelete
        :serviceData="serviceData"
        v-on:refresh="getAllServices()"
      />
    </div>

    <ServiceBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import ServiceCard from "@/components/settings/settingsOther/services/ServiceCard.vue";
import ServiceInfo from "@/components/settings/settingsOther/services/ServiceInfo.vue";
import ServiceDelete from "@/components/settings/settingsOther/services/ServiceDelete.vue";
import ServiceBtns from "@/components/settings/settingsOther/services/ServiceBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
// import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import Service from "@/models/settings/settingsOther/services/Service";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Services",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServiceCard,
    ServiceInfo,
    ServiceDelete,
    ServiceBtns,
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
      servicesData: null,
      serviceData: new Service(),
      generalSpecialtiesData: null,
      // generalSpecialtyData: new GeneralSpecialty(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllServices();
    },
    search(text) {
      this.textSearch = text;
      this.getAllServices();
    },
    async getAllServices() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `Services/GetAllServices/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.servicesPagination.totalPages,
            totalItems: response.data.servicesPagination.totalItems,
            countItemsInPage: response.data.servicesPagination.countItemsInPage,
            selfPage: response.data.servicesPagination.selfPage,
          };
          this.servicesData = response.data.servicesPagination.servicesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.servicesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.servicesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.servicesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesData = null;
      }
      this.isLoading = false;
    },
    async getAllGeneralSpecialties() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/GeneralSpecialties/GetAllGeneralSpecialties/?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.generalSpecialtiesData =
            response.data.generalSpecialtiesPagination.generalSpecialtiesData;
          // console.log(this.generalSpecialtiesData);
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.generalSpecialtiesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.generalSpecialtiesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.generalSpecialtiesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.generalSpecialtiesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    // this.getAllGeneralSpecialties();
    this.getAllServices();
  },
};
</script>
