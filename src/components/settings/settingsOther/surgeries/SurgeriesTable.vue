<template>
  <div v-if="surgeriesData" class="">
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
          <tr v-for="(surgery, index) in surgeriesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(surgery.surgeryNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(surgery.surgeryDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(surgery.surgeryNotes) }}</td>
            <td>
              <button
                v-b-modal.SurgeryInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setSurgeryData(surgery)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'SurgeryEdit',
                  params: {
                    surgeryToken: surgery.surgeryToken,
                  },
                }"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.SurgeryDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setSurgeryData(surgery)"
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
  name: "SurgeriesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["surgeriesData", "surgeryData"],
  methods: {
    setSurgeryData(surgeryData) {
      this.$emit("setSurgeryData", surgeryData);
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
