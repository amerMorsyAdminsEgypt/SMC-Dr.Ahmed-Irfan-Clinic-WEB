<template>
  <div v-if="qualificationsData" class="">
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
          <tr
            v-for="(qualification, index) in qualificationsData"
            :key="qualification.qualificationToken"
          >
            <td>{{ ++index }}</td>
            <td>{{ qualification.qualificationNameAr }}</td>
            <td>{{ qualification.qualificationNameEn }}</td>
            <td>
              {{
                qualification.qualificationNotes
                  ? qualification.qualificationNotes
                  : $t("notFound")
              }}
            </td>
            <td>
              <router-link
                :to="`/edit-qualification/${qualification.qualificationToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.QualificationsDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setQualificationData(qualification)"
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
  name: "QualificationsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["qualificationsData", "qualificationData"],
  methods: {
    setQualificationData(qualificationData) {
      this.$emit("setQualificationData", qualificationData);
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
