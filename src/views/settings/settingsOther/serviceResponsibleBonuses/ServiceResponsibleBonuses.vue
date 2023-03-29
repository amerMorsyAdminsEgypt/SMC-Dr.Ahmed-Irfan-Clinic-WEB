<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <div v-if="employeeData" class="my-card">
      <span class="my-card-title">{{ $t("employeeData") }}</span>
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th>{{ $t("code") }}</th>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("phoneNumber") }}</th>
              <th>{{ $t("edit") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ isDataExist(employeeData.serviceResponsibleBonuseCode) }}
              </td>
              <td>
                {{ isDataExist(employeeData.employeeNameCurrent) }}
              </td>
              <td>
                {{ isDataExist(employeeData.employeePhone) }}
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'ServiceResponsibleBonuseEdit',
                    params: {
                      employeeToken: employeeData.employeeToken,
                    },
                  }"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" class="icon-lg" />
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="serviceResponsibleBonusesData">
      <ServiceResponsibleBonusesTable
        :serviceResponsibleBonuseData="serviceResponsibleBonusesData[0]"
        v-on:setServiceResponsibleBonuseData="
          serviceResponsibleBonuseData.fillData($event)
        "
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
    </div>

    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ServiceResponsibleBonuseBtns
      :textSearch="textSearch"
      :employeeToken="employeeToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServiceResponsibleBonusesTable from "@/components/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonusesTable.vue";
import ServiceResponsibleBonuseBtns from "@/components/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonuseBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import ServiceResponsibleBonuse from "@/models/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonuse";
import createToastMixin from "@/utils/create-toast-mixin";
import axios from "axios";
import { isDataExist } from "@/utils/functions";

export default {
  name: "ServiceResponsibleBonuses",
  props: ["employeeToken"],
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServiceResponsibleBonusesTable,
    ServiceResponsibleBonuseBtns,
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
      serviceResponsibleBonusesData: null,
      serviceResponsibleBonuseData: new ServiceResponsibleBonuse(),
      employeeData: null,
    };
  },
  methods: {
    isDataExist(data) {
      return isDataExist(data);
    },
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllServiceResponsibleBonuses();
    },
    search(text) {
      this.textSearch = text;
      this.getAllServiceResponsibleBonuses();
    },
    async getEmployeeDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Employees/GetEmployeeDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&employeeToken=${this.employeeToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          const theData = response.data.employeeData;
          this.employeeData = theData;

          this.employeeData.employeeCCWithCCName =
            theData.employeeCountryCodeName
              ? theData.employeeCountryCodeName +
                " " +
                theData.employeeCountryCode
              : "";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async getAllServiceResponsibleBonuses() {
      this.isLoading = true;
      try {
        const response =
          await this.serviceResponsibleBonuseData.getAllServiceResponsibleBonuses(
            this.language,
            this.userAuthorizeToken,
            this.selfPage,
            this.textSearch,
            this.employeeToken
          );
        this.serviceResponsibleBonusesData = null;
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.serviceResponsibleBonusesPagination.totalPages,
            totalItems:
              response.data.serviceResponsibleBonusesPagination.totalItems,
            countItemsInPage:
              response.data.serviceResponsibleBonusesPagination
                .countItemsInPage,
            selfPage:
              response.data.serviceResponsibleBonusesPagination.selfPage,
          };
          this.serviceResponsibleBonusesData =
            response.data.serviceResponsibleBonusesPagination.serviceResponsibleBonusesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    let employeeToken = this.employeeToken || this.$route.params.employeeToken;
    if (employeeToken) {
      this.getEmployeeDetails();
      this.getAllServiceResponsibleBonuses();
    } else {
      this.exceptionMsg = this.$t("selectEmployee");
      this.isLoading = false;
    }
  },
};
</script>
