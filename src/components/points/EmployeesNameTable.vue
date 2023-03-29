<template>
  <div v-if="employeeSettlementData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("employeeCode") }}</th>
            <th>{{ $t("employeeName") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ employeeSettlementData.employeeCode }}</td>
            <td>
              {{
                language == "en"
                  ? employeeSettlementData.employeeNameEn
                  : employeeSettlementData.employeeNameAr
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeesNameTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeeSettlementData"],
  methods: {
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
