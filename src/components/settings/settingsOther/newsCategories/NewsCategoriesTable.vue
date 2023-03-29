<template>
  <div v-if="newsCategoriesData" class="">
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
          <tr v-for="(newsCategory, index) in newsCategoriesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(newsCategory.newsCategoryNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(newsCategory.newsCategoryDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(newsCategory.newsCategoryNotes) }}</td>
            <td>
              <button
                v-b-modal.NewsCategoryInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setNewsCategoryData(newsCategory)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-news-category/${newsCategory.newsCategoryToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.NewsCategoryDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setNewsCategoryData(newsCategory)"
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
  name: "NewsCategoriesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["newsCategoriesData", "newsCategoryData"],
  methods: {
    setNewsCategoryData(newsCategoryData) {
      this.$emit("setNewsCategoryData", newsCategoryData);
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
