<template>
  <div v-if="medicinesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("medicineName") }}</th>
            <th>{{ $t("medicinesTypeName") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(medicine, index) in medicinesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(medicine.medicineNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(medicine.medicinesTypeNameCurrent) }}
            </td>
            <td>{{ isDataExist(medicine.medicineNotes) }}</td>
            <td>
              <button
                v-b-modal.MedicineInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setMedicineData(medicine)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-medicine/${medicine.medicineToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.MedicineDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setMedicineData(medicine)"
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
  name: "MedicinesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["medicinesData", "medicineData"],
  methods: {
    setMedicineData(medicineData) {
      this.$emit("setMedicineData", medicineData);
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
