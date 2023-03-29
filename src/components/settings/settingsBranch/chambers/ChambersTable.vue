<template>
  <div v-if="chambersData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("chamberName") }}</th>
            <th>{{ $t("floorName") }}</th>
            <th>{{ $t("buildingName") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("chamberDescription") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(chamber, index) in chambersData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(chamber.chamberNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(chamber.floorNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(chamber.buildingNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(chamber.branchNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(chamber.chamberDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(chamber.chamberNotes) }}</td>
            <td>
              <button
                v-b-modal.ChamberInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setChamberData(chamber)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-chamber/${chamber.chamberToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.ChamberDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setChamberData(chamber)"
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
  name: "ChambersTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["chambersData", "chamberData"],
  methods: {
    setChamberData(chamberData) {
      this.$emit("setChamberData", chamberData);
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
