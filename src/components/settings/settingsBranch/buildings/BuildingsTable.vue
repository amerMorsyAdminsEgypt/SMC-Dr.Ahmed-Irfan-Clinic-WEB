<template>
  <div v-if="buildingsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("buildingName") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("buildingDescription") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(building, index) in buildingsData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(building.buildingNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(building.branchNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(building.buildingDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(building.buildingNotes) }}</td>
            <td>
              <button
                v-b-modal.BuildingInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setBuildingData(building)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-building/${building.buildingToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.BuildingDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setBuildingData(building)"
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
  name: "BuildingsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["buildingsData", "buildingData"],
  methods: {
    setBuildingData(buildingData) {
      this.$emit("setBuildingData", buildingData);
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
