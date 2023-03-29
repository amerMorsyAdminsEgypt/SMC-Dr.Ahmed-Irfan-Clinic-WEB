<template>
  <div v-if="insurancesPlansData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("insurancesPlansCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(insurancesPlan, index) in insurancesPlansData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(insurancesPlan.insurancesPlansCode) }}</td>
            <td>
              {{ isDataExist(insurancesPlan.insurancesPlansNameCurrent) }}
            </td>
            <td>{{ timeToLang(insurancesPlan.dateTimeActionAdd) }}</td>
            <td>{{ isDataExist(insurancesPlan.insurancesPlansNote) }}</td>
            <td>
              <router-link
                :to="`/insurances-plan-details/${insurancesPlan.insurancesPlansToken}`"
                :title="$t('info')"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <router-link
                :to="`/edit-insurances-plan/${insurancesPlan.insurancesPlansToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.InsurancesPlanDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setInsurancesPlanData(insurancesPlan)"
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
  name: "InsurancesPlansTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["insurancesPlansData", "insurancesPlanData"],
  methods: {
    setInsurancesPlanData(insurancesPlanData) {
      this.$emit("setInsurancesPlanData", insurancesPlanData);
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
