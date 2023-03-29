<template>
  <div v-if="scientificDegreesData" class="">
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
            v-for="(scientificDegree, index) in scientificDegreesData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(scientificDegree.scientificDegreeNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(scientificDegree.scientificDegreeDescriptionCurrent)
              }}
            </td>
            <td>{{ isDataExist(scientificDegree.scientificDegreeNotes) }}</td>
            <td>
              <button
                v-b-modal.ScientificDegreeInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setScientificDegreeData(scientificDegree)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-scientific-degree/${scientificDegree.scientificDegreeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.ScientificDegreeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setScientificDegreeData(scientificDegree)"
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
  name: "ScientificDegreesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["scientificDegreesData", "scientificDegreeData"],
  methods: {
    setScientificDegreeData(scientificDegreeData) {
      this.$emit("setScientificDegreeData", scientificDegreeData);
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
