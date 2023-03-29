<template>
  <div v-if="medicationPlansData" class="">
    <div
      v-for="(treatment, index) in medicationPlansData"
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
                `${$t("name")}:  ${
                  treatment.mainReservationData.clientNameCurrent
                }  ${$t("quma")} `
              }}
            </div>
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("reservationCode")}:  ${
                  treatment.mainReservationData.reservationCode
                }  ${$t("quma")} `
              }}
              {{
                `${$t("onDate")}:  ${
                  treatment.mainReservationData.reservationDate
                    ? treatment.mainReservationData.reservationDate
                    : $t("notFound")
                }  ${$t("quma")}  `
              }}
              {{
                `${$t("specialSpecialty")}:  ${
                  treatment.mainReservationData.specialSpecialtyNameCurrent
                }  ${$t("quma")}  `
              }}
              {{
                `${
                  treatment.employeeJobNameCurrentInReport
                    ? treatment.employeeJobNameCurrentInReport
                    : $t("responsibleForProvidingTheService")
                }:  ${treatment.employeeNameCurrentInReport}`
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
              name: 'MedicationPlanEdit',
              params: {
                clientToken: treatment.clientToken,
                reservationToken: treatment.reservationToken,
                medicationPlanToken: treatment.medicationPlanToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.MedicationPlanDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setMedicationPlanData(treatment)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
        <div class="">
          <button
            v-b-modal.MedicationPlanDownload
            class="btn p-0"
            :title="$t('viewAndSend')"
            @click="setMedicationPlanData(treatment)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
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
                  ) in treatment.medicationPlanDetalisData"
                  :key="indexMed"
                >
                  <td>{{ ++indexMed }}</td>
                  <td>
                    {{ isDataExist(medicationPlan.medicineNameCurrent) }}
                  </td>
                  <td>
                    {{ isDataExist(medicationPlan.medicinesTypeNameCurrent) }}
                  </td>
                  <td>{{ isDataExist(medicationPlan.countInDay) }}</td>
                  <td>{{ isDataExist(medicationPlan.medicationTime) }}</td>
                  <td>
                    {{ isDataExist(medicationPlan.medicationQuantity) }}
                  </td>
                  <td>
                    {{ isDataExist(medicationPlan.medicationPlanNotes) }}
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
// import i18n from "@/i18n/index";
// import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "MedicationPlansTable",
  components: {
    // DataLabelGroup,
  },
  data() {
    return {
      isAngleUp: false,
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["medicationPlansData", "medicationPlanData"],
  methods: {
    setMedicationPlanData(medicationPlanData) {
      this.$emit("setMedicationPlanData", medicationPlanData);
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
