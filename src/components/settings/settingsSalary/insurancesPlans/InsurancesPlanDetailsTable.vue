<template>
  <div v-if="insurancesPlansSlidesDetailsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("planTypeName") }}</th>
            <th>{{ $t("employeeTotalSalaryFrom") }}</th>
            <th>{{ $t("employeeTotalSalaryTo") }}</th>
            <th>{{ $t("employeeTotalSalaryPercentage") }}</th>
            <th>{{ $t("employeeTotalSalaryDeductionStatus") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              insurancesPlansSlide, index
            ) in insurancesPlansSlidesDetailsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(insurancesPlansSlide.planTypeNameCurrent) }}</td>
            <td>
              {{ isDataExist(insurancesPlansSlide.employeeTotalSalaryFrom) }}
            </td>
            <td>
              {{ isDataExist(insurancesPlansSlide.employeeTotalSalaryTo) }}
            </td>
            <td>
              {{
                isDataExist(insurancesPlansSlide.employeeTotalSalaryPercentage)
              }}
            </td>
            <td>
              {{
                insurancesPlansSlide.employeeTotalSalaryDeductionStatus === true
                  ? $t("yes")
                  : $t("no")
              }}
            </td>
            <td>
              {{
                isDataExist(
                  insurancesPlansSlide.insurancesPlansSlidesDetailsNote
                )
              }}
            </td>
            <td>
              <button
                v-b-modal.InsurancesPlanDetailsInfo
                class="btn p-0"
                :title="$t('info')"
                @click="
                  setInsurancesPlansSlideDetailsData(insurancesPlansSlide)
                "
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-insurances-plan-details/${insurancesPlansSlide.insurancesPlansSlidesDetailsToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.InsurancesPlanDetailsDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="
                  setInsurancesPlansSlideDetailsData(insurancesPlansSlide)
                "
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
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
  name: "InsurancesPlanDetailsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: [
    "insurancesPlansSlidesDetailsData",
    "insurancesPlansSlideDetailsData",
  ],
  methods: {
    setInsurancesPlansSlideDetailsData(insurancesPlansSlideDetailsData) {
      this.$emit(
        "setInsurancesPlansSlideDetailsData",
        insurancesPlansSlideDetailsData
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
