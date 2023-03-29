<template>
  <div v-if="citiesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("cities.name") }}</th>
            <th>{{ $t("governates.name") }}</th>
            <th>{{ $t("countries.name") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(City, index) in citiesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(City.cityNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(City.governateNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(City.countryNameCurrent) }}
            </td>
            <td>
              <button
                v-b-modal.CityInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setCityData(City)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-city/${City.cityToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.CityDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setCityData(City)"
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
  name: "CitiesTable",
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
    };
  },
  props: ["citiesData", "cityData"],
  methods: {
    setCityData(cityData) {
      this.$emit("setCityData", cityData);
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
  async created() {},
};
</script>

<style lang="scss"></style>
