<template>
  <div v-if="governatesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("governates.name") }}</th>
            <th>{{ $t("countries.name") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(Governate, index) in governatesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(Governate.governateNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(Governate.countryNameCurrent) }}
            </td>
            <td>
              <button
                v-b-modal.GovernateInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setGovernateData(Governate)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-governate/${Governate.governateToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.GovernateDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setGovernateData(Governate)"
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
  name: "GovernatesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["governatesData", "governateData"],
  methods: {
    setGovernateData(governateData) {
      this.$emit("setGovernateData", governateData);
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
