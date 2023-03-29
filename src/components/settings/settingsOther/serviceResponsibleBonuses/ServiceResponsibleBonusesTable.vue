<template>
  <div v-if="serviceResponsibleBonuseData" class="">
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
              ) in serviceResponsibleBonuseData.serviceResponsibleBonusesDetailsData"
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
  name: "ServiceResponsibleBonusesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["serviceResponsibleBonuseData"],
  methods: {
    getServicesListLength(serviceResponsibleBonuse) {
      return serviceResponsibleBonuse.serviceResponsibleBonusesDetailsData
        .length;
    },
    setServiceResponsibleBonuseData(serviceResponsibleBonuseData) {
      this.$emit(
        "setServiceResponsibleBonuseData",
        serviceResponsibleBonuseData
      );
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
