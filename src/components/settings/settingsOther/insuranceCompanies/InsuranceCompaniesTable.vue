<template>
  <div v-if="insuranceCompany" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t("insuranceCompanies.name") }}</th>
          <th>{{ $t("insuranceCompanies.address") }}</th>
          <th>{{ $t("insuranceCompanies.description") }}</th>
          <th>{{ $t("info") }}</th>
          <th>{{ $t("edit") }}</th>
          <th>{{ $t("delete") }}</th>
          <th>{{ $t("services") }}</th>
          <th>{{ $t("medicalInsuranceLevels.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#</td>
          <td>
            {{ isDataExist(insuranceCompany.insuranceCompanyNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(insuranceCompany.insuranceCompanyAddressCurrent) }}
          </td>
          <td>
            {{
              isDataExist(insuranceCompany.insuranceCompanyDescriptionCurrent)
            }}
          </td>

          <td>
            <button
              v-b-modal.InsuranceCompanyInfo
              class="btn p-0"
              :title="$t('info')"
              @click="setInsuranceCompanyData(insuranceCompany)"
            >
              <img src="@/assets/images/info.svg" class="icon-lg" />
            </button>
          </td>
          <td>
            <router-link
              :to="`/edit-insurance-company/${insuranceCompany.insuranceCompanyToken}`"
              :title="$t('edit')"
            >
              <img src="@/assets/images/pencil.svg" class="icon-lg" />
            </router-link>
          </td>
          <td>
            <button
              v-b-modal.InsuranceCompanyDelete
              class="btn p-0"
              :title="$t('delete')"
              @click="setInsuranceCompanyData(insuranceCompany)"
            >
              <img src="@/assets/images/trash.svg" class="icon-lg" />
            </button>
          </td>
          <td>
            <router-link
              :to="{
                name: 'InsuranceCompanyServices',
                params: {
                  insuranceCompanyToken: insuranceCompany.insuranceCompanyToken,
                },
              }"
              :title="$t('insuranceCompanyServices.modelName')"
            >
              <img
                src="@/assets/images/insuranceCompanyService.svg"
                class="icon-lg"
              />
            </router-link>
          </td>
          <td>
            <router-link
              :to="{
                name: 'MedicalInsuranceLevels',
                params: {
                  insuranceCompanyToken: insuranceCompany.insuranceCompanyToken,
                },
              }"
              :title="$t('medicalInsuranceLevels.modelName')"
            >
              <img
                src="@/assets/images/medicalInsuranceLevel.svg"
                class="icon-lg"
              />
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "InsuranceCompaniesTable",
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
  props: ["insuranceCompany"],
  methods: {
    setInsuranceCompanyData(insuranceCompanyData) {
      this.$emit("setInsuranceCompanyData", insuranceCompanyData);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
  async created() {},
};
</script>

<style lang="scss"></style>
