<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />
    <template v-if="currentSubPage === 'clients'">
      <div v-if="clientsData">
        <div class="row">
          <ClientCard
            v-for="client in clientsData"
            :key="client.clientToken"
            :clientData="client"
            v-on:setClientData="clientData.fillData($event)"
          />
        </div>

        <Pagination
          v-if="!isLoading"
          :paginationData="paginationData"
          v-on:changePage="changePage"
        />
        <ClientInfo :clientData="clientData" />
        <ClientQRCode :clientData="clientData" />
        <ClientDelete :clientData="clientData" v-on:refresh="getAllClients()" />
      </div>
    </template>
    <template v-else-if="currentSubPage === 'clientsOperations'">
      <div v-if="clientsData">
        <ClientsTable
          :surgeryPlaceTypeToken="surgeryPlaceTypeToken"
          :clientsData="clientsData"
          v-on:setClientData="clientData.fillData($event)"
        />
        <Pagination
          v-if="!isLoading"
          :paginationData="paginationData"
          v-on:changePage="changePage"
        />
      </div>
    </template>

    <ClientFloatBtns
      :currentSubPage="currentSubPage"
      :textSearch="textSearch"
      :clientGenderToken="clientGenderToken"
      :clientTypeToken="clientTypeToken"
      :surgeryPlaceTypeToken="surgeryPlaceTypeToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import ClientCard from "@/components/clients/ClientCard.vue";
import ClientsTable from "@/components/clients/ClientsTable.vue";
import ClientInfo from "@/components/clients/ClientInfo.vue";
import ClientQRCode from "@/components/clients/ClientQRCode.vue";
import ClientDelete from "@/components/clients/ClientDelete.vue";
import ClientFloatBtns from "@/components/clients/ClientFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Client from "@/models/clients/Client";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Clients",
  props: {
    currentSubPage: {
      type: String,
      default: "clients",
    },
  },
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ClientCard,
    ClientsTable,
    ClientInfo,
    ClientQRCode,
    ClientDelete,
    ClientFloatBtns,
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
      clientGenderToken: "",
      clientTypeToken: "",
      surgeryPlaceTypeToken: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      clientsData: null,
      clientData: new Client(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllClients();
    },
    search(text, clientGenderToken, clientTypeToken, surgeryPlaceTypeToken) {
      this.textSearch = text;
      this.clientGenderToken = clientGenderToken;
      this.clientTypeToken = clientTypeToken;
      this.surgeryPlaceTypeToken = surgeryPlaceTypeToken;
      this.getAllClients();
    },
    async getAllClients() {
      this.isLoading = true;
      this.clientsData = null;
      try {
        const response = await axios.get(
          `/Clients/GetAllClients?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&clientGenderToken=${this.clientGenderToken}&clientTypeToken=${this.clientTypeToken}&surgeryPlaceTypeToken=${this.surgeryPlaceTypeToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.clientsPagination.totalPages,
            totalItems: response.data.clientsPagination.totalItems,
            countItemsInPage: response.data.clientsPagination.countItemsInPage,
            selfPage: response.data.clientsPagination.selfPage,
          };
          this.clientsData = response.data.clientsPagination.clientsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllClients();
  },
};
</script>
