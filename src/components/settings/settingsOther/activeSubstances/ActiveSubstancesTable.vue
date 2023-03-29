<template>
  <div v-if="activeSubstancesData" class="">
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
            v-for="(activeSubstance, index) in activeSubstancesData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(activeSubstance.activeSubstanceNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(activeSubstance.activeSubstanceDescriptionCurrent)
              }}
            </td>
            <td>{{ isDataExist(activeSubstance.activeSubstanceNotes) }}</td>
            <td>
              <button
                v-b-modal.ActiveSubstanceInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setActiveSubstanceData(activeSubstance)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'ActiveSubstanceEdit',
                  params: {
                    activeSubstanceToken: activeSubstance.activeSubstanceToken,
                  },
                }"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.ActiveSubstanceDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setActiveSubstanceData(activeSubstance)"
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
  name: "ActiveSubstancesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["activeSubstancesData", "activeSubstanceData"],
  methods: {
    setActiveSubstanceData(activeSubstanceData) {
      this.$emit("setActiveSubstanceData", activeSubstanceData);
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
