<template>
  <div v-if="districtsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("districts.name") }}</th>
            <th>{{ $t("cities.name") }}</th>
            <th>{{ $t("governates.name") }}</th>
            <th>{{ $t("countries.name") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(District, index) in districtsData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(District.districtNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(District.cityNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(District.governateNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(District.countryNameCurrent) }}
            </td>
            <td>
              <button
                v-b-modal.DistrictInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setDistrictData(District)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-district/${District.districtToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.DistrictDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setDistrictData(District)"
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
  name: "DistrictsTable",
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
  props: ["districtsData", "districtData"],
  methods: {
    setDistrictData(districtData) {
      this.$emit("setDistrictData", districtData);
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
