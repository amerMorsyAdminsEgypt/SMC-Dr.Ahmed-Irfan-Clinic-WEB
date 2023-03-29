<template>
  <div v-if="floorsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("floorName") }}</th>
            <th>{{ $t("buildingName") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("floorDescription") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(floor, index) in floorsData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(floor.floorNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(floor.buildingNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(floor.branchNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(floor.floorDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(floor.floorNotes) }}</td>
            <td>
              <button
                v-b-modal.FloorInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setFloorData(floor)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-floor/${floor.floorToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.FloorDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setFloorData(floor)"
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
  name: "FloorsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["floorsData", "floorData"],
  methods: {
    setFloorData(floorData) {
      this.$emit("setFloorData", floorData);
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
