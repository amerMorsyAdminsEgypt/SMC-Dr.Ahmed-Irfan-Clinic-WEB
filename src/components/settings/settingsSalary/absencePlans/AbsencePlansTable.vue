<template>
  <div v-if="absencePlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("absencePlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(absencePlan, index) in absencePlansData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(absencePlan.absencePlansCode) }}</td>
            <td>
              {{ isDataExist(absencePlan.absencePlansNameCurrent) }}
            </td>
            <td>{{ timeToLang(absencePlan.dateTimeActionAdd) }}</td>
            <td>{{ isDataExist(absencePlan.absencePlansNote) }}</td>
            <td>
              <router-link
                :to="`/absence-plan-details/${absencePlan.absencePlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/edit-absence-plan/${absencePlan.absencePlansToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.AbsencePlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setAbsencePlanData(absencePlan)"
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
  name: "AbsencePlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["absencePlansData", "absencePlanData"],
  methods: {
    setAbsencePlanData(absencePlanData) {
      this.$emit("setAbsencePlanData", absencePlanData);
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
