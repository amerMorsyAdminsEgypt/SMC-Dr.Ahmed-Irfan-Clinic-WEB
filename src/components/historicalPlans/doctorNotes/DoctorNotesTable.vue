<template>
  <div v-if="doctorNotesData" class="">
    <div
      v-for="(note, index) in doctorNotesData"
      :key="index"
      class="container-collapse-with-btns"
    >
      <b-button
        v-b-toggle="`item${index}`"
        class="btn btn-lg btn-collapse collapse-data"
      >
        <div class="p-t-container">
          <div class="row collapse-title">
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("name")}:  ${isDataExist(note.clientNameCurrent)}  ${$t(
                  "quma"
                )} `
              }}
            </div>
            <div class="col-md-12 col-lg-12">
              {{
                `${
                  note.employeeJobNameCurrentInReport
                    ? note.employeeJobNameCurrentInReport
                    : $t("responsibleForProvidingTheService")
                }:  ${isDataExist(note.employeeNameCurrentInReport)}`
              }}
            </div>
          </div>
          <div class="collapse-icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </div>
      </b-button>
      <div class="collapse-actions btn-collapse">
        <div class="">
          <router-link
            :to="{
              name: 'DoctorNoteEdit',
              params: {
                clientToken: note.clientToken,
                doctorNoteToken: note.doctorNoteToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.DoctorNoteDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setDoctorNoteData(note)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div class="my-card">
          <span class="my-card-title">{{ $t("notes") }}</span>

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>{{ $t("notes") }}</th>
                  <th>{{ $t("showType") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {{ isDataExist(note.doctorNoteNameCurrent) }}
                  </td>
                  <td>
                    {{ isDataExist(note.showTypeNameCurrent) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "DoctorNotesTable",
  components: {
    // DataLabelGroup,
  },
  data() {
    return {
      isAngleUp: false,
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["doctorNotesData", "doctorNoteData"],
  methods: {
    setDoctorNoteData(doctorNoteData) {
      this.$emit("setDoctorNoteData", doctorNoteData);
    },
    toggleAngle() {
      this.isAngleUp = !this.isAngleUp;
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
