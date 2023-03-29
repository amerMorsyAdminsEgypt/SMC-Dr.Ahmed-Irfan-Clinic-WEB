<template>
  <div v-if="specialSpecialtiesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("generalSpecialtyName") }}</th>
            <th>{{ $t("description") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(specialSpecialty, index) in specialSpecialtiesData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(specialSpecialty.specialSpecialtyNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(specialSpecialty.generalSpecialtyNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(specialSpecialty.specialSpecialtyDescriptionCurrent)
              }}
            </td>
            <td>{{ isDataExist(specialSpecialty.specialSpecialtyNotes) }}</td>
            <td>
              <button
                v-b-modal.SpecialSpecialtyInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setSpecialSpecialtyData(specialSpecialty)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-special-specialty/${specialSpecialty.specialSpecialtyToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.SpecialSpecialtyDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setSpecialSpecialtyData(specialSpecialty)"
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
  name: "SpecialSpecialtiesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      // generalSpecialtyData: null,
    };
  },
  props: [
    "generalSpecialtiesData",
    "specialSpecialtiesData",
    "specialSpecialtyData",
  ],
  methods: {
    setSpecialSpecialtyData(specialSpecialtyData) {
      this.$emit("setSpecialSpecialtyData", specialSpecialtyData);
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
    // getGeneralSpecialty(generalSpecialtyToken) {
    //   let values = this.generalSpecialtiesData.filter((val) => {
    //     return val.generalSpecialtyToken === generalSpecialtyToken;
    //   });
    //   this.generalSpecialtyData = { ...values };
    //   console.log(this.generalSpecialtyData);
    // },
  },
  computed: {},
  // async created() {
  //   this.getGeneralSpecialty("GST-2");
  // },
};
</script>

<style lang="scss"></style>
