<template>
  <div v-if="colorsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("colors.hexFromat") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(color, index) in colorsData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(color.colorNameCurrent) }}
            </td>
            <!-- <td>
              {{ isDataExist(color.colorHexFromat) }}
            </td> -->
            <td
              class="cell-color table-phone-number font-en"
              :style="{ backgroundColor: color.colorHexFromat }"
            >
              <span>{{ color.colorHexFromat }}</span>
            </td>

            <td>{{ isDataExist(color.colorNotes) }}</td>
            <td>
              <router-link
                :to="{
                  name: 'ColorEdit',
                  params: {
                    colorToken: color.colorToken,
                  },
                }"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.ColorDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setColorData(color)"
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
  name: "ColorsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["colorsData", "colorData"],
  methods: {
    setColorData(colorData) {
      this.$emit("setColorData", colorData);
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
