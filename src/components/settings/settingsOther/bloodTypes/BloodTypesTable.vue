<template>
  <div v-if="bloodTypesData" class="">
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
          <tr v-for="(bloodType, index) in bloodTypesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(bloodType.bloodTypeNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(bloodType.bloodTypeDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(bloodType.bloodTypeNotes) }}</td>
            <td>
              <button
                v-b-modal.BloodTypeInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setBloodTypeData(bloodType)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-blood-type/${bloodType.bloodTypeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.BloodTypeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setBloodTypeData(bloodType)"
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
  name: "BloodTypesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["bloodTypesData", "bloodTypeData"],
  methods: {
    setBloodTypeData(bloodTypeData) {
      this.$emit("setBloodTypeData", bloodTypeData);
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
