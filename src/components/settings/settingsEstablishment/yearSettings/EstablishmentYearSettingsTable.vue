<template>
  <div v-if="establishmentYearSettingsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("establishmentYearSettingCode") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("year") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              establishmentYearSetting, index
            ) in establishmentYearSettingsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                isDataExist(
                  establishmentYearSetting.establishmentYearSettingCode
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  establishmentYearSetting.establishmentYearSettingNameCurrent
                )
              }}
            </td>
            <td>{{ isDataExist(establishmentYearSetting.year) }}</td>
            <td>
              {{
                isDataExist(
                  establishmentYearSetting.establishmentYearSettingNote
                )
              }}
            </td>
            <td>
              <button
                v-b-modal.EstablishmentYearSettingInfo
                class="btn p-0"
                :title="$t('info')"
                @click="
                  setEstablishmentYearSettingData(establishmentYearSetting)
                "
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-year-establishment-setting/${establishmentYearSetting.establishmentYearSettingToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.EstablishmentYearSettingDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="
                  setEstablishmentYearSettingData(establishmentYearSetting)
                "
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
  name: "EstablishmentYearSettingsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["establishmentYearSettingsData", "establishmentYearSettingData"],
  methods: {
    setEstablishmentYearSettingData(establishmentYearSettingData) {
      this.$emit(
        "setEstablishmentYearSettingData",
        establishmentYearSettingData
      );
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
