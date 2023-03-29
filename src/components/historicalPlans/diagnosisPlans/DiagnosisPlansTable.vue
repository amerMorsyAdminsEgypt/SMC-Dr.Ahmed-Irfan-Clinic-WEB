<template>
  <div v-if="diagnosisPlans.diagnosisPlansData" class="">
    <div
      v-for="(Diagnosis, index) in diagnosisPlans.diagnosisPlansData"
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
                `${$t("name")}:  ${isDataExist(
                  Diagnosis.mainReservationData.clientNameCurrent
                )}  ${$t("quma")} `
              }}
            </div>
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("reservationCode")}:  ${isDataExist(
                  Diagnosis.mainReservationData.reservationCode
                )}  ${$t("quma")} `
              }}
              {{
                `${$t("onDate")}:  ${isDataExist(
                  Diagnosis.mainReservationData.reservationDate
                )}  ${$t("quma")}  `
              }}
              {{
                `${$t("specialSpecialty")}:  ${isDataExist(
                  Diagnosis.mainReservationData.specialSpecialtyNameCurrent
                )}  ${$t("quma")}  `
              }}
              {{
                `${
                  Diagnosis.employeeJobNameCurrentInReport
                    ? Diagnosis.employeeJobNameCurrentInReport
                    : $t("responsibleForProvidingTheService")
                }:  ${Diagnosis.employeeNameCurrentInReport}`
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
              name: 'DiagnosisPlanEdit',
              params: {
                clientToken: diagnosisPlans.filterData.clientToken,
                reservationToken: diagnosisPlans.filterData.reservationToken,
                diagnosisPlanToken: Diagnosis.diagnosisPlanToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.DiagnosisPlanDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setDiagnosisPlanData(Diagnosis)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
        <div class="">
          <button
            v-b-modal.DiagnosisPlanDownload
            class="btn p-0"
            :title="$t('viewAndSend')"
            @click="setDiagnosisPlanData(Diagnosis)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div
          v-for="(
            diagnosisPlan, indexMed
          ) in Diagnosis.diagnosisPlansDetilsData"
          :key="indexMed"
          class="my-card"
        >
          <span class="my-card-title">{{ ++indexMed }}</span>

          <div class="row">
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="diagnosisPlan.complaintTextCurrent"
              :title="$t('historicalPlans.diagnosis.complaintText')"
              :imgName="'complaint.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="diagnosisPlan.symptomsTextCurrent"
              :title="$t('historicalPlans.diagnosis.symptomsText')"
              :imgName="'symptoms.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="diagnosisPlan.diagnosisTextCurrent"
              :title="$t('historicalPlans.diagnosis.diagnosisText')"
              :imgName="'diagnosis.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="diagnosisPlan.diseaseTextCurrent"
              :title="$t('historicalPlans.diagnosis.diseaseText')"
              :imgName="'disease.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="diagnosisPlan.diagnosisPlansDetilsNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="diagnosisPlan.diagnosisPlansDetilsCode"
              :title="$t('historicalPlans.diagnosis.code')"
              :imgName="'code.svg'"
            />
          </div>

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("bodyAnatomyTypes.name") }}</th>
                  <th>{{ $t("bodyAnatomies.name") }}</th>
                  <th>{{ $t("notes") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    BodyAnatomyData, indexMed
                  ) in diagnosisPlan.diagnosisPlansDetilsBodyAnatomyData"
                  :key="indexMed"
                >
                  <td>{{ ++indexMed }}</td>
                  <td>
                    {{
                      isDataExist(BodyAnatomyData.bodyAnatomyTypeNameCurrent)
                    }}
                  </td>
                  <td>
                    <img
                      class="item-img-table"
                      :src="`${baseUrl}${BodyAnatomyData.bodyAnatomyImagePath}`"
                    />
                    {{ isDataExist(BodyAnatomyData.bodyAnatomyNameCurrent) }}
                  </td>
                  <!-- <td>{{ isDataExist(BodyAnatomyData.bodyAnatomyImagePath) }}</td> -->
                  <td>
                    {{
                      isDataExist(
                        BodyAnatomyData.diagnosisPlansDetilsBodyAnatomyNotes
                      )
                    }}
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
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { BASE_URL } from "@/utils/constants";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "DiagnosisPlansTable",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      baseUrl: BASE_URL,
    };
  },
  props: ["diagnosisPlans", "filterData"],
  // props: ["diagnosisPlansData", "diagnosisPlanData"],
  methods: {
    setDiagnosisPlanData(diagnosisPlanData) {
      this.$emit("setDiagnosisPlanData", diagnosisPlanData);
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
