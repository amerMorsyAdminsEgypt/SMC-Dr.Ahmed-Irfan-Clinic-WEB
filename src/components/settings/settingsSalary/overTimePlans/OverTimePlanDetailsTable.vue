<template>
  <div v-if="overTimePlansSlidesDetailsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("timeFrom") }}</th>
            <th>{{ $t("timeTo") }}</th>
            <th>{{ $t("overTimePriceFactor") }}</th>
            <th>{{ $t("dayTypeName") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              overTimePlansSlide, index
            ) in overTimePlansSlidesDetailsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ timeToLang(overTimePlansSlide.timeFrom) }}</td>
            <td>{{ timeToLang(overTimePlansSlide.timeTo) }}</td>
            <td>
              {{ isDataExist(overTimePlansSlide.overTimePriceFactor) }}
            </td>
            <td>
              {{ isDataExist(overTimePlansSlide.dayTypeNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(overTimePlansSlide.overTimePlansSlidesDetailsNote)
              }}
            </td>
            <td>
              <button
                v-b-modal.OverTimePlanDetailsInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setOverTimePlansSlideDetailsData(overTimePlansSlide)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
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
  name: "OverTimePlanDetailsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["overTimePlansSlidesDetailsData", "overTimePlansSlideDetailsData"],
  methods: {
    setOverTimePlansSlideDetailsData(overTimePlansSlideDetailsData) {
      this.$emit(
        "setOverTimePlansSlideDetailsData",
        overTimePlansSlideDetailsData
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
