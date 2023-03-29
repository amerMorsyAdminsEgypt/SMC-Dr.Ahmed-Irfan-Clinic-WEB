<template>
  <div v-if="overTimePlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("overTimePlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(overTimePlan, index) in overTimePlansData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(overTimePlan.overTimePlansCode) }}</td>
            <td>
              {{ isDataExist(overTimePlan.overTimePlansNameCurrent) }}
            </td>
            <td>{{ timeToLang(overTimePlan.dateTimeActionAdd) }}</td>
            <td>{{ isDataExist(overTimePlan.overTimePlansNote) }}</td>
            <td>
              <router-link
                :to="`/overtime-plan-details/${overTimePlan.overTimePlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/edit-overtime-plan/${overTimePlan.overTimePlansToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.OverTimePlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setOverTimePlanData(overTimePlan)"
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
  name: "OverTimePlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["overTimePlansData", "overTimePlanData"],
  methods: {
    setOverTimePlanData(overTimePlanData) {
      this.$emit("setOverTimePlanData", overTimePlanData);
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
