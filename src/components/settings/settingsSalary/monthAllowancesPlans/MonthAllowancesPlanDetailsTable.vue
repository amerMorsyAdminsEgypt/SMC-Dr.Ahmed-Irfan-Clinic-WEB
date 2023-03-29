<template>
  <div v-if="monthAllowancesPlansSlidesDetailsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("allowanceName") }}</th>
            <th>{{ $t("allowanceValue") }}</th>
            <th>{{ $t("allowancesMaximumNumberInMonth") }}</th>
            <th>{{ $t("allowancesMaximumNumberInYear") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              monthAllowancesPlansSlide, index
            ) in monthAllowancesPlansSlidesDetailsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(monthAllowancesPlansSlide.allowanceNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(
                  monthAllowancesPlansSlide.monthAllowancesValue + $t("EGP")
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  monthAllowancesPlansSlide.monthAllowancesMaximumNumberInMonth
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  monthAllowancesPlansSlide.monthAllowancesMaximumNumberInYear
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  monthAllowancesPlansSlide.monthAllowancesPlansSlidesDetailsNote
                )
              }}
            </td>
            <td>
              <button
                v-b-modal.MonthAllowancesPlanDetailsInfo
                class="btn p-0"
                :title="$t('info')"
                @click="
                  setMonthAllowancesPlansSlideDetailsData(
                    monthAllowancesPlansSlide
                  )
                "
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-month-allowances-plan-details/${monthAllowancesPlansSlide.monthAllowancesPlansSlidesDetailsToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.MonthAllowancesPlanDetailsDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="
                  setMonthAllowancesPlansSlideDetailsData(
                    monthAllowancesPlansSlide
                  )
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
  name: "MonthAllowancesPlanDetailsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: [
    "monthAllowancesPlansSlidesDetailsData",
    "monthAllowancesPlansSlideDetailsData",
  ],
  methods: {
    setMonthAllowancesPlansSlideDetailsData(
      monthAllowancesPlansSlideDetailsData
    ) {
      this.$emit(
        "setMonthAllowancesPlansSlideDetailsData",
        monthAllowancesPlansSlideDetailsData
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
