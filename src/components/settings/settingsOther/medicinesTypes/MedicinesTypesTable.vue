<template>
  <div v-if="medicinesTypesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(medicinesType, index) in medicinesTypesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(medicinesType.medicinesTypeNameCurrent) }}
            </td>
            <td>{{ isDataExist(medicinesType.medicinesTypeNotes) }}</td>
            <td>
              <button
                v-b-modal.MedicinesTypeInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setMedicinesTypeData(medicinesType)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-medicines-type/${medicinesType.medicinesTypeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.MedicinesTypeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setMedicinesTypeData(medicinesType)"
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
  name: "MedicinesTypesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["medicinesTypesData", "medicinesTypeData"],
  methods: {
    setMedicinesTypeData(medicinesTypeData) {
      this.$emit("setMedicinesTypeData", medicinesTypeData);
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
