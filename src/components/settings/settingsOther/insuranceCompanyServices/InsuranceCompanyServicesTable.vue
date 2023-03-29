<template>
  <div v-if="insuranceCompanyServiceData" class="">
    <div class="my-card">
      <span class="my-card-title">{{ $t("services") }}</span>
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("insuranceCompanyServices.discountPercentage") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(
                service, index
              ) in insuranceCompanyServiceData.insuranceCompanyServicesDetailsData"
              :key="index"
            >
              <td>{{ ++index }}</td>
              <td>{{ isDataExist(service.serviceNameCurrent) }}</td>
              <td>{{ isDataExist(service.discountPercentage) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "InsuranceCompanyServicesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["insuranceCompanyServiceData"],
  methods: {
    getServicesListLength(insuranceCompanyService) {
      return insuranceCompanyService.insuranceCompanyServicesDetailsData.length;
    },
    setInsuranceCompanyServiceData(insuranceCompanyServiceData) {
      this.$emit("setInsuranceCompanyServiceData", insuranceCompanyServiceData);
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
};
</script>

<style lang="scss"></style>
