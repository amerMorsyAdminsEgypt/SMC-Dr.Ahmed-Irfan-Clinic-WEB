<template>
  <div v-if="generalSpecialtiesData" class="">
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
            v-for="(generalSpecialty, index) in generalSpecialtiesData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(generalSpecialty.generalSpecialtyNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(generalSpecialty.generalSpecialtyDescriptionCurrent)
              }}
            </td>
            <td>{{ isDataExist(generalSpecialty.generalSpecialtyNotes) }}</td>
            <td>
              <button
                v-b-modal.GeneralSpecialtyInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setGeneralSpecialtyData(generalSpecialty)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-general-specialty/${generalSpecialty.generalSpecialtyToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.GeneralSpecialtyDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setGeneralSpecialtyData(generalSpecialty)"
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
  name: "GeneralSpecialtiesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["generalSpecialtiesData", "generalSpecialtyData"],
  methods: {
    setGeneralSpecialtyData(generalSpecialtyData) {
      this.$emit("setGeneralSpecialtyData", generalSpecialtyData);
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
