<template>
  <div v-if="monthAllowancesPlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("monthAllowancesPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(monthAllowancesPlan, index) in monthAllowancesPlansData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(monthAllowancesPlan.monthAllowancesPlansCode) }}
            </td>
            <td>
              {{
                isDataExist(monthAllowancesPlan.monthAllowancesPlansNameCurrent)
              }}
            </td>
            <td>{{ timeToLang(monthAllowancesPlan.dateTimeActionAdd) }}</td>
            <td>
              {{ isDataExist(monthAllowancesPlan.monthAllowancesPlansNote) }}
            </td>
            <td>
              <router-link
                :to="`/month-allowances-plan-details/${monthAllowancesPlan.monthAllowancesPlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/edit-month-allowances-plan/${monthAllowancesPlan.monthAllowancesPlansToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.MonthAllowancesPlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setMonthAllowancesPlanData(monthAllowancesPlan)"
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
  name: "MonthAllowancesPlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["monthAllowancesPlansData", "monthAllowancesPlanData"],
  methods: {
    setMonthAllowancesPlanData(monthAllowancesPlanData) {
      this.$emit("setMonthAllowancesPlanData", monthAllowancesPlanData);
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
