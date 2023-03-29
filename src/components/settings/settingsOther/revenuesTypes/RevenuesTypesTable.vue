<template>
  <div v-if="revenuesTypesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("nameAr") }}</th>
            <th>{{ $t("nameEn") }}</th>
            <th>{{ $t("nameUnd") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(revenueType, index) in revenuesTypesData"
            :key="revenueType.revenuesTypeToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(revenueType.revenuesTypeNameAr) }}</td>
            <td>{{ isDataExist(revenueType.revenuesTypeNameEn) }}</td>
            <td>{{ isDataExist(revenueType.revenuesTypeNameUnd) }}</td>
            <td>{{ isDataExist(revenueType.revenuesTypeNotes) }}</td>
            <td>
              <router-link
                :to="`/edit-revenue-type/${revenueType.revenuesTypeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.RevenueTypeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setRevenueTypeData(revenueType)"
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
  name: "RevenuesTypesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["revenuesTypesData", "revenueTypeData"],
  methods: {
    setRevenueTypeData(revenueTypeData) {
      this.$emit("setRevenueTypeData", revenueTypeData);
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
