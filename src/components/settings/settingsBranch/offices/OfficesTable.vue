<template>
  <div v-if="officesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("officeName") }}</th>
            <th>{{ $t("chamberName") }}</th>
            <th>{{ $t("floorName") }}</th>
            <th>{{ $t("buildingName") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("officeDescription") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(office, index) in officesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(office.officeNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(office.chamberNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(office.floorNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(office.buildingNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(office.branchNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(office.officeDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(office.officeNotes) }}</td>
            <td>
              <button
                v-b-modal.OfficeInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setOfficeData(office)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-office/${office.officeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.OfficeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setOfficeData(office)"
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
  name: "OfficesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officesData", "officeData"],
  methods: {
    setOfficeData(officeData) {
      this.$emit("setOfficeData", officeData);
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
