<template>
  <div v-if="insuranceCompaniesData" class="">
    <div
      v-for="(insuranceCompany, index) in insuranceCompaniesData"
      :key="index"
    >
      <b-button v-b-toggle="`item${index}`" class="btn btn-lg btn-collapse">
        <div class="p-t-container">
          <div class="row collapse-title">
            <div class="col-md-12 col-lg-12">
              {{
                `${insuranceCompany.insuranceCompanyNameCurrent} ${$t(
                  "quma"
                )} ${$t("insuranceCompanies.servicesCount")}( ${
                  insuranceCompany.insuranceCompanyServicesCount
                } ) ${$t("quma")} ${$t("insuranceCompanies.clientsCount")}( ${
                  insuranceCompany.insuranceCompanyClientsCount
                } )`
              }}
            </div>
          </div>
          <div class="collapse-icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </div>
      </b-button>
      <b-collapse :id="`item${index}`">
        <div class="my-card row">
          <InsuranceCompaniesTable
            class="col-12"
            :insuranceCompany="insuranceCompany"
            v-on:setInsuranceCompanyData="setInsuranceCompanyData($event)"
          />

          <MedicalInsuranceLevelsCollapse
            class="col-12"
            :index="index"
            :columnList="getColumns(insuranceCompany)"
            :rowList="getRows(insuranceCompany)"
          />
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import InsuranceCompaniesTable from "./InsuranceCompaniesTable.vue";
import MedicalInsuranceLevelsCollapse from "./MedicalInsuranceLevelsCollapse.vue";

export default {
  name: "InsuranceCompaniesTableCollapse",
  components: {
    InsuranceCompaniesTable,
    MedicalInsuranceLevelsCollapse,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
    };
  },
  props: ["insuranceCompaniesData"],
  methods: {
    getColumns(insuranceCompany) {
      let list = [];
      let hasList =
        insuranceCompany.MedicalInsuranceLevelsDataList.length &&
        insuranceCompany.MedicalInsuranceLevelsDataList[0]
          .medicalInsuranceLevelToken;

      if (hasList) {
        insuranceCompany.MedicalInsuranceLevelsDataList.forEach((element) => {
          list.push({
            name: element.medicalInsuranceLevelNameCurrent,
            // color: element.colorNameCurrent,
            color: element.colorHexFromat,
            // color: "#51d13f",
          });
        });
      }

      return list;
    },
    getRows(insuranceCompany) {
      let list = [];
      let insuranceCompanyServicesDetailsData =
        insuranceCompany.insuranceCompanyServicesData
          ? insuranceCompany.insuranceCompanyServicesData
              .insuranceCompanyServicesDetailsData
          : [];

      let hasList =
        insuranceCompanyServicesDetailsData.length &&
        insuranceCompanyServicesDetailsData[0]
          .insuranceCompanyServicesDetailsToken;

      if (hasList) {
        insuranceCompanyServicesDetailsData.forEach((element) => {
          let servicePercentageList = this.getServicePercentageList(
            insuranceCompany,
            element.serviceToken
          );

          list.push({
            name: element.serviceNameCurrent,
            percentageList: servicePercentageList,
          });
        });
      }

      return list;
    },
    getServicePercentageList(insuranceCompany, serviceToken) {
      let list = [];
      let hasList =
        insuranceCompany.MedicalInsuranceLevelsDataList.length &&
        insuranceCompany.MedicalInsuranceLevelsDataList[0]
          .medicalInsuranceLevelToken;

      if (hasList) {
        insuranceCompany.MedicalInsuranceLevelsDataList.forEach((element) => {
          let serviceItem = element.medicalInsuranceLevelServicesData.find(
            (e) => e.serviceToken == serviceToken
          );

          if (serviceItem) {
            list.push(serviceItem.discountPercentage);
          } else {
            list.push(0);
          }
        });
      }

      return list;
    },
    setInsuranceCompanyData(insuranceCompanyData) {
      this.$emit("setInsuranceCompanyData", insuranceCompanyData);
    },
  },
  computed: {},
  async created() {},
};
</script>

<style lang="scss"></style>
