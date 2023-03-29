<template>
  <div v-if="workPlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("workPlanCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("workPlanDays") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(workPlan, index) in workPlansData"
            :key="workPlan.workPlanToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(workPlan.workPlanCode) }}</td>
            <td>{{ isDataExist(workPlan.workPlanNameCurrent) }}</td>
            <td>{{ isDataExist(workPlan.workPlanNotes) }}</td>
            <td>
              <router-link
                :to="`/work-plan-days/${workPlan.workPlanToken}`"
                :title="$t('workPlanDays')"
              >
                <img src="@/assets/images/work-plan-days.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.WorkPlanInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setWorkPlanData(workPlan)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-work-plan/${workPlan.workPlanToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.WorkPlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setWorkPlanData(workPlan)"
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
  name: "WorkPlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["workPlansData", "workPlanData"],
  methods: {
    setWorkPlanData(workPlanData) {
      this.$emit("setWorkPlanData", workPlanData);
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
