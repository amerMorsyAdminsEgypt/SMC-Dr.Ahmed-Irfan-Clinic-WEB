<template>
  <div v-if="balancesPlansSlidesDetailsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("salaryEffectName") }}</th>
            <th>{{ $t("maximumNumberInDay") }}</th>
            <th>{{ $t("maximumNumberInMonth") }}</th>
            <th>{{ $t("maximumNumberInYear") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              balancesPlansSlide, index
            ) in balancesPlansSlidesDetailsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                isDataExist(balancesPlansSlide.employeeSalaryEffectNameCurrent)
              }}
            </td>
            <td>
              {{
                convertTimeAndDaysToString(
                  balancesPlansSlide.maximumNumberInDayInSeconds,
                  balancesPlansSlide.maximumNumberInDayInMinutes,
                  balancesPlansSlide.maximumNumberInDayInHours,
                  0
                )
              }}
            </td>
            <td>
              {{
                convertTimeAndDaysToString(
                  balancesPlansSlide.maximumNumberInMonthInSeconds,
                  balancesPlansSlide.maximumNumberInMonthInMinutes,
                  balancesPlansSlide.maximumNumberInMonthInHours,
                  balancesPlansSlide.maximumNumberInMonthInDays
                )
              }}
            </td>
            <td>
              {{
                convertTimeAndDaysToString(
                  balancesPlansSlide.maximumNumberInYearInSeconds,
                  balancesPlansSlide.maximumNumberInYearInMinutes,
                  balancesPlansSlide.maximumNumberInYearInHours,
                  balancesPlansSlide.maximumNumberInYearInDays
                )
              }}
            </td>
            <td>
              {{
                isDataExist(balancesPlansSlide.balancesPlansSlidesDetailsNote)
              }}
            </td>
            <td>
              <button
                v-b-modal.BalancesPlanDetailsInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setBalancesPlansSlideDetailsData(balancesPlansSlide)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-balances-plan-details/${balancesPlansSlide.balancesPlansSlidesDetailsToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.BalancesPlanDetailsDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setBalancesPlansSlideDetailsData(balancesPlansSlide)"
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
import {
  setDataMultiLang,
  timeToLang,
  convertTimeAndDaysToString,
  isDataExist,
} from "@/utils/functions";

export default {
  name: "BalancesPlanDetailsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["balancesPlansSlidesDetailsData", "balancesPlansSlideDetailsData"],
  methods: {
    setBalancesPlansSlideDetailsData(balancesPlansSlideDetailsData) {
      this.$emit(
        "setBalancesPlansSlideDetailsData",
        balancesPlansSlideDetailsData
      );
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    convertTimeAndDaysToString(seconds, minutes, hours, days) {
      return convertTimeAndDaysToString(seconds, minutes, hours, days).data.data
        .string;
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
