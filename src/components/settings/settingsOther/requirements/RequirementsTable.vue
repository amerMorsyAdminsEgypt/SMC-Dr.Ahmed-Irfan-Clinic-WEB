<template>
  <div v-if="requirementsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("requirementName") }}</th>
            <th>{{ $t("requirementTypeName") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(requirement, index) in requirementsData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(requirement.requirementNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(requirement.requirementTypeNameCurrent) }}
            </td>
            <td>{{ isDataExist(requirement.requirementNote) }}</td>
            <td>
              <button
                v-b-modal.RequirementInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setRequirementData(requirement)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-requirement/${requirement.requirementToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.RequirementDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setRequirementData(requirement)"
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
  name: "RequirementsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["requirementsData", "requirementData"],
  methods: {
    setRequirementData(requirementData) {
      this.$emit("setRequirementData", requirementData);
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
