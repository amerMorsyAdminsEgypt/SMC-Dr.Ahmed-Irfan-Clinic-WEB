<template>
  <div v-if="branchesTimesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("startWorkTime") }}</th>
            <th>{{ $t("endWorkTime") }}</th>
            <th>{{ $t("day") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(branchTime, index) in branchesTimesData"
            :key="branchTime.branchTimeToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(branchTime.branchNameCurrent) }}</td>
            <td>{{ isDataExist(branchTime.timeNameCurrent) }}</td>
            <td>{{ timeToLang(branchTime.branchOpenTime) }}</td>
            <td>{{ timeToLang(branchTime.branchCloseTime) }}</td>
            <td>{{ isDataExist(branchTime.dayNameCurrent) }}</td>
            <td>{{ isDataExist(branchTime.branchTimeNotes) }}</td>
            <td>
              <router-link
                :to="`/edit-branch-time/${branchTime.branchTimeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.branchTimeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setBranchTimeData(branchTime)"
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
  name: "BranchesTimesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["branchesTimesData", "branchTimeData"],
  methods: {
    setBranchTimeData(branchTimeData) {
      this.$emit("setBranchTimeData", branchTimeData);
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
