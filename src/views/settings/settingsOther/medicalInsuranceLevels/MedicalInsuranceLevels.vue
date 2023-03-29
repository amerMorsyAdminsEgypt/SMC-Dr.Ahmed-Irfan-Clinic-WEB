<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <div v-if="insuranceCompany" class="my-card">
      <span class="my-card-title">{{ $t("insuranceCompanies.data") }}</span>
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("address") }}</th>
              <th>{{ $t("description") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{
                  isDataExist(insuranceCompanyData.insuranceCompanyNameCurrent)
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    insuranceCompanyData.insuranceCompanyAddressCurrent
                  )
                }}
              </td>
              <td>
                {{
                  isDataExist(
                    insuranceCompanyData.insuranceCompanyDescriptionCurrent
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="medicalInsuranceLevelsData">
      <MedicalInsuranceLevelsTable
        :medicalInsuranceLevelsData="medicalInsuranceLevelsData"
        v-on:setMedicalInsuranceLevelData="
          medicalInsuranceLevelData.fillData($event)
        "
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MedicalInsuranceLevelInfo
        :medicalInsuranceLevelData="medicalInsuranceLevelData"
      />
      <MedicalInsuranceLevelDelete
        :medicalInsuranceLevelData="medicalInsuranceLevelData"
        v-on:refresh="getAllMedicalInsuranceLevels()"
      />
    </div>

    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicalInsuranceLevelBtns
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
import MedicalInsuranceLevelsTable from "@/components/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelsTable.vue";
import MedicalInsuranceLevelInfo from "@/components/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelInfo.vue";
import MedicalInsuranceLevelDelete from "@/components/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelDelete.vue";
import MedicalInsuranceLevelBtns from "@/components/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevelBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MedicalInsuranceLevel from "@/models/settings/settingsOther/medicalInsuranceLevels/MedicalInsuranceLevel";
import createToastMixin from "@/utils/create-toast-mixin";
import InsuranceCompany from "@/models/settings/settingsOther/insuranceCompanies/InsuranceCompany";
import { isDataExist } from "@/utils/functions";

export default {
  name: "MedicalInsuranceLevels",
  props: ["insuranceCompanyToken"],
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicalInsuranceLevelsTable,
    MedicalInsuranceLevelInfo,
    MedicalInsuranceLevelDelete,
    MedicalInsuranceLevelBtns,
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
      medicalInsuranceLevelsData: null,
      medicalInsuranceLevelData: new MedicalInsuranceLevel(),
      insuranceCompany: null,
      insuranceCompanyData: new InsuranceCompany(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllMedicalInsuranceLevels();
    },
    search(text) {
      this.textSearch = text;
      this.getAllMedicalInsuranceLevels();
    },
    isDataExist(data) {
      return isDataExist(data);
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
    async getAllMedicalInsuranceLevels() {
      this.isLoading = true;
      try {
        const response =
          await this.medicalInsuranceLevelData.getAllMedicalInsuranceLevels(
            this.language,
            this.userAuthorizeToken,
            this.selfPage,
            this.textSearch,
            this.insuranceCompanyToken
          );
        this.medicalInsuranceLevelsData = null;

        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.medicalInsuranceLevelsPagination.totalPages,
            totalItems:
              response.data.medicalInsuranceLevelsPagination.totalItems,
            countItemsInPage:
              response.data.medicalInsuranceLevelsPagination.countItemsInPage,
            selfPage: response.data.medicalInsuranceLevelsPagination.selfPage,
          };
          this.medicalInsuranceLevelsData =
            response.data.medicalInsuranceLevelsPagination.medicalInsuranceLevelsData;
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
        this.exceptionMsg = this.$t("errorCatch");
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
      this.getAllMedicalInsuranceLevels();
    } else {
      this.exceptionMsg = this.$t("insuranceCompanies.select");
      this.isLoading = false;
    }
  },
};
</script>
