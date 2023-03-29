<template>
  <div v-if="allowancesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("description") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(allowance, index) in allowancesData"
            :key="allowance.allowanceToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(allowance.allowanceNameCurrent) }}</td>
            <td>{{ isDataExist(allowance.allowanceDescriptionCurrent) }}</td>
            <td>{{ isDataExist(allowance.allowanceNotes) }}</td>
            <td>
              <button
                v-b-modal.AllowanceInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setAllowanceData(allowance)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-allowance/${allowance.allowanceToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.AllowanceDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setAllowanceData(allowance)"
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
  name: "AllowancesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["allowancesData", "allowanceData"],
  methods: {
    setAllowanceData(allowanceData) {
      this.$emit("setAllowanceData", allowanceData);
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
