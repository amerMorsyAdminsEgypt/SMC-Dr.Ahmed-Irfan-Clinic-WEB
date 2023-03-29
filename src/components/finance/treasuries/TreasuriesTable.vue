<template>
  <div v-if="treasuriesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("treasuryCode") }}</th>
            <th>{{ $t("treasuryMoney") }}</th>
            <th>{{ $t("dateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(treasury, index) in treasuriesData"
            :key="treasury.treasuryToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(treasury.branchNameCurrent) }}</td>
            <td>{{ isDataExist(treasury.treasuryNameCurrent) }}</td>
            <td>{{ isDataExist(treasury.treasuryCode) }}</td>
            <td>{{ isDataExist(treasury.treasuryMoney) }}</td>
            <td>
              {{
                formateDateTimeLang(treasury.actionDate, treasury.actionTime)
              }}
            </td>
            <td>{{ isDataExist(treasury.treasuryNote) }}</td>
            <td>
              <router-link
                :to="`/edit-treasury/${treasury.treasuryToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.TreasuryDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setTreasuryData(treasury)"
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
  isDataExist,
  formateDateTimeLang,
} from "@/utils/functions";

export default {
  name: "TreasuriesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["treasuriesData", "treasuryData"],
  methods: {
    setTreasuryData(treasuryData) {
      this.$emit("setTreasuryData", treasuryData);
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
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
