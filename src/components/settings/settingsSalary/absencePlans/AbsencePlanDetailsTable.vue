<template>
  <div v-if="absencePlansSlidesDetailsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("workShiftsNumberFrom") }}</th>
            <th>{{ $t("workShiftsNumberTo") }}</th>
            <th>{{ $t("priceFactor") }}</th>
            <th>{{ $t("notes") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(absencePlansSlide, index) in absencePlansSlidesDetailsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(absencePlansSlide.workShiftsNumberFrom) }}
            </td>
            <td>
              {{ isDataExist(absencePlansSlide.workShiftsNumberTo) }}
            </td>
            <td>
              {{ isDataExist(absencePlansSlide.priceFactor) }}
            </td>
            <td>
              {{ isDataExist(absencePlansSlide.absencePlansSlidesDetailsNote) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "AbsencePlanDetailsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["absencePlansSlidesDetailsData", "absencePlansSlideDetailsData"],
  methods: {
    setAbsencePlansSlideDetailsData(absencePlansSlideDetailsData) {
      this.$emit(
        "setAbsencePlansSlideDetailsData",
        absencePlansSlideDetailsData
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
