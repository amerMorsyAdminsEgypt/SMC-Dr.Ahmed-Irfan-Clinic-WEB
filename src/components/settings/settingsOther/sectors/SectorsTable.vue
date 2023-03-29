<template>
  <div v-if="sectorsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("nameAr") }}</th>
            <th>{{ $t("nameEn") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sector, index) in sectorsData" :key="sector.sectorToken">
            <td>{{ ++index }}</td>
            <td>{{ sector.sectorNameAr }}</td>
            <td>{{ sector.sectorNameEn }}</td>
            <td>
              {{ sector.sectorNotes ? sector.sectorNotes : $t("notFound") }}
            </td>
            <td>
              <router-link
                :to="`/edit-sector/${sector.sectorToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.SectorDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setSectorData(sector)"
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
export default {
  name: "SectorsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["sectorsData", "sectorData"],
  methods: {
    setSectorData(sectorData) {
      this.$emit("setSectorData", sectorData);
    },
    timeE2A(time) {
      if (time.indexOf("AM") > -1) return time.replace("AM", "ص");
      else if (time.indexOf("PM") > -1) return time.replace("PM", "م");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
