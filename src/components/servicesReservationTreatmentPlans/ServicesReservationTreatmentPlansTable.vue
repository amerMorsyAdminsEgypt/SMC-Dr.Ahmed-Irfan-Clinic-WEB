<template>
  <div v-if="reservationTreatmentsData" class="">
    <!-- <div class=""> -->
    <div v-for="(treatment, index) in reservationTreatmentsData" :key="index">
      <b-button v-b-toggle="`item${index}`" class="btn btn-lg btn-collapse">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            {{
              `${$t("reservationCode")}:  ${treatment.reservationCode}  ${$t(
                "quma"
              )} `
            }}
            {{
              `${$t("onDate")}:  ${
                treatment.reservationDate
                  ? treatment.reservationDate
                  : $t("notFound")
              }  ${$t("quma")}  `
            }}
            {{
              `${$t("specialSpecialty")}:  ${
                treatment.employeeInReportSpecialSpecialtyNameCurrent
              }  ${$t("quma")}  `
            }}
            {{
              `${treatment.employeeInReportJobNameCurrent}:  ${treatment.employeeNameInReportCurrent}`
            }}
          </div>
        </div>
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse :id="`item${index}`">
        <div class="my-card row">
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="treatment.treatmentPlanCode"
            :title="$t('treatmentPlanCode')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="treatment.clientNameCurrent"
            :title="$t('clientName')"
            :imgName="'clients.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="treatment.disease"
            :title="$t('disease')"
            :imgName="'disease.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="treatment.diagnosis"
            :title="$t('diagnosis')"
            :imgName="'diagnosis.svg'"
          />
          <DataLabelGroup
            :className="'col-md-12'"
            :value="treatment.treatmentPlanNotes"
            :title="$t('treatmentPlanNotes')"
            :imgName="'notes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="treatment.treatmentEmployeeNameCurrent"
            :title="$t('userMakeAction')"
            :imgName="'employees.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="treatment.treatmentPlanDateTime"
            :title="$t('actionDateTime')"
            :imgName="'dateAndTime.svg'"
          />
          <button
            class="btn p-0"
            :title="$t('download')"
            @click="downlaodTreatmentPlan(treatment)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button>
        </div>

        <div class="my-card">
          <span class="my-card-title">{{ $t("medicines") }}</span>

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("medicineName") }}</th>
                  <th>{{ $t("medicinesTypeName") }}</th>
                  <th>{{ $t("countInDay") }}</th>
                  <th>{{ $t("medicationTime") }}</th>
                  <th>{{ $t("medicationQuantity") }}</th>
                  <th>{{ $t("notes") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    medicationPlan, indexMed
                  ) in treatment.servicesReservationMedicationPlanData"
                  :key="indexMed"
                >
                  <td>{{ ++indexMed }}</td>
                  <td>{{ isDataExist(medicationPlan.medicineNameCurrent) }}</td>
                  <td>
                    {{ isDataExist(medicationPlan.medicinesTypeNameCurrent) }}
                  </td>
                  <td>{{ isDataExist(medicationPlan.countInDay) }}</td>
                  <td>{{ isDataExist(medicationPlan.medicationTime) }}</td>
                  <td>{{ isDataExist(medicationPlan.medicationQuantity) }}</td>
                  <td>{{ isDataExist(medicationPlan.medicationPlanNotes) }}</td>
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
// import i18n from "@/i18n/index";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "ServicesReservationTreatmentPlansTable",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["reservationTreatmentsData", "reservationTreatmentData"],
  methods: {
    setReservationTreatmentData(reservationTreatmentData) {
      this.$emit("setReservationTreatmentData", reservationTreatmentData);
    },
    downlaodTreatmentPlan(reservationTreatmentData) {
      this.$emit("downlaodTreatmentPlan", reservationTreatmentData);
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
