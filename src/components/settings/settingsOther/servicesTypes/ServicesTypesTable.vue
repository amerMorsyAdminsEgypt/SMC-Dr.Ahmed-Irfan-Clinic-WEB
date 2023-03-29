<template>
  <div v-if="servicesTypesData" class="">
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
          <tr v-for="(servicesType, index) in servicesTypesData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(servicesType.serviceTypeNameCurrent) }}</td>
            <td>
              {{ isDataExist(servicesType.serviceTypeDescriptionCurrent) }}
            </td>
            <td>{{ isDataExist(servicesType.serviceTypeNotes) }}</td>
            <td>
              <button
                v-b-modal.ServicesTypeInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setServicesTypeData(servicesType)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-services-type/${servicesType.serviceTypeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.ServicesTypeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setServicesTypeData(servicesType)"
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
  name: "ServicesTypesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["servicesTypesData", "servicesTypeData"],
  methods: {
    setServicesTypeData(servicesTypeData) {
      this.$emit("setServicesTypeData", servicesTypeData);
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
