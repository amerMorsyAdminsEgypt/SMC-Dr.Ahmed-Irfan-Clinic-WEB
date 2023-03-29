<template>
  <div v-if="employeeSlideData" class="">
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
            <td>{{ employeeSlideData.employeeCode }}</td>
            <td>
              {{
                language == "en"
                  ? employeeSlideData.employeeNameEn
                  : employeeSlideData.employeeNameAr
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
  props: ["employeeSlideData"],
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
