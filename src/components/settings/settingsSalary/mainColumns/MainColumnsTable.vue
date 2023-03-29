<template>
  <div v-if="mainColumnsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("mainColumnName") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mainColumn, index) in mainColumnsData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(mainColumn.mainColumnNameCurrent) }}</td>
            <td>{{ isDataExist(mainColumn.mainColumnNote) }}</td>
            <td>
              <button
                v-b-modal.MainColumnInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setMainColumnData(mainColumn)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-main-column/${mainColumn.mainColumnToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.MainColumnDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setMainColumnData(mainColumn)"
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
  name: "MainColumnsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["mainColumnsData", "mainColumnData"],
  methods: {
    setMainColumnData(mainColumnData) {
      this.$emit("setMainColumnData", mainColumnData);
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
