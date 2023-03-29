<template>
  <div v-if="allowancesPlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("allowancesPlansCode") }}</th>
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
            v-for="(allowancesPlan, index) in allowancesPlansData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(allowancesPlan.allowancesPlansCode) }}</td>
            <td>
              {{ isDataExist(allowancesPlan.allowancesPlansNameCurrent) }}
            </td>
            <td>{{ timeToLang(allowancesPlan.dateTimeActionAdd) }}</td>
            <td>{{ isDataExist(allowancesPlan.allowancesPlansNote) }}</td>
            <td>
              <router-link
                :to="`/allowances-plan-details/${allowancesPlan.allowancesPlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/edit-allowances-plan/${allowancesPlan.allowancesPlansToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.AllowancesPlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setAllowancesPlanData(allowancesPlan)"
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
  name: "AllowancesPlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["allowancesPlansData", "allowancesPlanData"],
  methods: {
    setAllowancesPlanData(allowancesPlanData) {
      this.$emit("setAllowancesPlanData", allowancesPlanData);
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
