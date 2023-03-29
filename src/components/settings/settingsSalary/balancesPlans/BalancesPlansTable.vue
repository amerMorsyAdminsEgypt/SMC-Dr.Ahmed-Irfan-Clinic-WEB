<template>
  <div v-if="balancesPlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("balancesPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(balancesPlan, index) in balancesPlansData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(balancesPlan.balancesPlansCode) }}</td>
            <td>
              {{ isDataExist(balancesPlan.balancesPlansNameCurrent) }}
            </td>
            <td>{{ timeToLang(balancesPlan.dateTimeActionAdd) }}</td>
            <td>{{ isDataExist(balancesPlan.balancesPlansNote) }}</td>
            <td>
              <router-link
                :to="`/balances-plan-details/${balancesPlan.balancesPlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/edit-balances-plan/${balancesPlan.balancesPlansToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.BalancesPlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setBalancesPlanData(balancesPlan)"
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
  name: "BalancesPlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["balancesPlansData", "balancesPlanData"],
  methods: {
    setBalancesPlanData(balancesPlanData) {
      this.$emit("setBalancesPlanData", balancesPlanData);
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
