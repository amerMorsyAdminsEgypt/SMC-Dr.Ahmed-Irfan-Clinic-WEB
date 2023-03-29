<template>
  <div v-if="salaryEffectsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("salaryEffectName") }}</th>
            <th>{{ $t("salaryEffectTypeName") }}</th>
            <th>{{ $t("calculationMethodTypeName") }}</th>
            <th>{{ $t("salaryEffectFeeTypeName") }}</th>
            <th>{{ $t("defaultValue") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <!-- <th>{{ $t("info") }}</th> -->
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(salaryEffect, index) in salaryEffectsData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(salaryEffect.employeeSalaryEffectNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(salaryEffect.employeeSalaryEffectTypeNameCurrent)
              }}
            </td>
            <td>
              {{ isDataExist(salaryEffect.calculationMethodTypeNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(salaryEffect.employeeSalaryEffectFeeTypeNameCurrent)
              }}
            </td>
            <td>{{ salaryEffect.defaultValue }}</td>
            <td>{{ timeToLang(salaryEffect.actionDateTime) }}</td>
            <td>{{ isDataExist(salaryEffect.employeeSalaryEffectNotes) }}</td>
            <!-- <td>
              <button
                v-b-modal.SalaryEffectInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setSalaryEffectData(salaryEffect)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td> -->
            <td>
              <router-link
                :to="`/edit-salary-effect/${salaryEffect.employeeSalaryEffectToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.SalaryEffectDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setSalaryEffectData(salaryEffect)"
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
  name: "SalaryEffectsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["salaryEffectsData", "salaryEffectData"],
  methods: {
    setSalaryEffectData(salaryEffectData) {
      this.$emit("setSalaryEffectData", salaryEffectData);
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
