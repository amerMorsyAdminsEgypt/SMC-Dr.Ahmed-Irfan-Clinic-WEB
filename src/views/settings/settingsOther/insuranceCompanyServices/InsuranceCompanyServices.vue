<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <div v-if="insuranceCompany" class="my-card">
      <span class="my-card-title">{{ $t("insuranceCompanies.data") }}</span>
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th>{{ $t("code") }}</th>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("notes") }}</th>
              <!-- <th>{{ $t("edit") }}</th> -->
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ isDataExist(insuranceCompany.insuranceCompanyServiceCode) }}
              </td>
              <td>
                {{ isDataExist(insuranceCompany.insuranceCompanyNameCurrent) }}
              </td>
              <td>
                {{ isDataExist(insuranceCompany.insuranceCompanyServiceNotes) }}
              </td>
              <!-- <td>
                <router-link
                  :to="{
                    name: 'InsuranceCompanyServiceEdit',
                    params: {
                      insuranceCompanyToken:
                        insuranceCompany.insuranceCompanyToken,
                    },
                  }"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" class="icon-lg" />
                </router-link>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="insuranceCompanyServicesData">
      <InsuranceCompanyServicesTable
        :insuranceCompanyServiceData="insuranceCompanyServicesData[0]"
        v-on:setInsuranceCompanyServiceData="
          insuranceCompanyServiceData.fillData($event)
        "
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <InsuranceCompanyServiceInfo
        :insuranceCompanyServiceData="insuranceCompanyServiceData"
      />
      <InsuranceCompanyServiceDelete
        :insuranceCompanyServiceData="insuranceCompanyServiceData"
        v-on:refresh="getAllInsuranceCompanyServices()"
      />
    </div>

    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <InsuranceCompanyServiceBtns
      :textSearch="textSearch"
      :insuranceCompanyToken="insuranceCompanyToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import InsuranceCompanyServicesTable from "@/components/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServicesTable.vue";
import InsuranceCompanyServiceInfo from "@/components/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServiceInfo.vue";
import InsuranceCompanyServiceDelete from "@/components/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServiceDelete.vue";
import InsuranceCompanyServiceBtns from "@/components/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyServiceBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import InsuranceCompanyService from "@/models/settings/settingsOther/insuranceCompanyServices/InsuranceCompanyService";
import createToastMixin from "@/utils/create-toast-mixin";
import InsuranceCompany from "@/models/settings/settingsOther/insuranceCompanies/InsuranceCompany";
import { isDataExist } from "@/utils/functions";

export default {
  name: "InsuranceCompanyServices",
  props: ["insuranceCompanyToken"],
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    InsuranceCompanyServicesTable,
    InsuranceCompanyServiceInfo,
    InsuranceCompanyServiceDelete,
    InsuranceCompanyServiceBtns,
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
      insuranceCompanyServicesData: null,
      insuranceCompanyServiceData: new InsuranceCompanyService(),
      insuranceCompany: null,
      insuranceCompanyData: new InsuranceCompany(),
    };
  },
  methods: {
    isDataExist(data) {
      return isDataExist(data);
    },
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllInsuranceCompanyServices();
    },
    search(text) {
      this.textSearch = text;
      this.getAllInsuranceCompanyServices();
    },
    async getInsuranceCompanyDetails() {
      this.isLoading = true;
      this.insuranceCompanyData.insuranceCompanyToken =
        this.insuranceCompanyToken;
      try {
        let response =
          await this.insuranceCompanyData.getInsuranceCompanyDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.insuranceCompanyData.fillData(
            response.data.insuranceCompaniesData
          );
          this.insuranceCompany = response.data.insuranceCompaniesData;
          let ccName =
            response.data.insuranceCompaniesData
              .insuranceCompanyCountryCodeName;
          let cc =
            response.data.insuranceCompaniesData.insuranceCompanyCountryCode;

          this.insuranceCompanyData.insuranceCompanyCCWithCCName =
            ccName === "" || cc === "" ? "" : ccName + " " + cc;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.insuranceCompanyData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.insuranceCompanyData = null;
      }
      this.isLoading = false;
    },
    async getAllInsuranceCompanyServices() {
      this.isLoading = true;
      try {
        const response =
          await this.insuranceCompanyServiceData.getAllInsuranceCompanyServices(
            this.language,
            this.userAuthorizeToken,
            this.selfPage,
            this.textSearch,
            this.insuranceCompanyToken
          );
        this.insuranceCompanyServicesData = null;
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.insuranceCompanyServicesPagination.totalPages,
            totalItems:
              response.data.insuranceCompanyServicesPagination.totalItems,
            countItemsInPage:
              response.data.insuranceCompanyServicesPagination.countItemsInPage,
            selfPage: response.data.insuranceCompanyServicesPagination.selfPage,
          };
          this.insuranceCompanyServicesData =
            response.data.insuranceCompanyServicesPagination.insuranceCompanyServicesData;
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
    let insuranceCompanyToken =
      this.insuranceCompanyToken || this.$route.params.insuranceCompanyToken;
    if (insuranceCompanyToken) {
      this.getInsuranceCompanyDetails();
      this.getAllInsuranceCompanyServices();
    } else {
      this.exceptionMsg = this.$t("insuranceCompanies.select");
      this.isLoading = false;
    }
  },
};
</script>
