<template>
  <div v-if="medicalRequirementsPlansData" class="">
    <div
      v-for="(medicalRequirement, index) in medicalRequirementsPlansData"
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
                  medicalRequirement.mainReservationData.clientNameCurrent
                }  ${$t("quma")} `
              }}
            </div>
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("reservationCode")}:  ${
                  medicalRequirement.mainReservationData.reservationCode
                }  ${$t("quma")} `
              }}
              {{
                `${$t("onDate")}:  ${
                  medicalRequirement.mainReservationData.reservationDate
                    ? medicalRequirement.mainReservationData.reservationDate
                    : $t("notFound")
                }  ${$t("quma")}  `
              }}
              {{
                `${$t("specialSpecialty")}:  ${
                  medicalRequirement.mainReservationData
                    .specialSpecialtyNameCurrent
                }  ${$t("quma")}  `
              }}
              {{
                `${
                  medicalRequirement.employeeJobNameCurrentInReport
                    ? medicalRequirement.employeeJobNameCurrentInReport
                    : $t("responsibleForProvidingTheService")
                }:  ${medicalRequirement.employeeNameCurrentInReport}`
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
            v-if="
              medicalRequirement.requirementTypeToken ==
              requirementsTypeTokens.Rays
            "
            :to="{
              name: 'MedicalRequirementsPlanRaysEdit',
              params: {
                clientToken: medicalRequirement.clientToken,
                reservationToken: medicalRequirement.reservationToken,
                medicalRequirementsPlanToken:
                  medicalRequirement.medicalRequirementsPlanToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <router-link
            v-else-if="
              medicalRequirement.requirementTypeToken ==
              requirementsTypeTokens.MedicalTests
            "
            :to="{
              name: 'MedicalRequirementsPlanTestsEdit',
              params: {
                clientToken: medicalRequirement.clientToken,
                reservationToken: medicalRequirement.reservationToken,
                medicalRequirementsPlanToken:
                  medicalRequirement.medicalRequirementsPlanToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.MedicalRequirementsPlanDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setMedicalRequirementsPlanData(medicalRequirement)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
        <div class="">
          <button
            v-b-modal.MedicalRequirementsPlanDownload
            class="btn p-0"
            :title="$t('viewAndSend')"
            @click="setMedicalRequirementsPlanData(medicalRequirement)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div class="my-card">
          <span
            v-if="
              medicalRequirement.requirementTypeToken ==
              requirementsTypeTokens.Rays
            "
            class="my-card-title"
          >
            {{ $t("medicalRequirements.rays.modelName") }}</span
          >
          <span
            v-else-if="
              medicalRequirement.requirementTypeToken ==
              requirementsTypeTokens.MedicalTests
            "
            class="my-card-title"
          >
            {{ $t("medicalRequirements.medicalTests.modelName") }}</span
          >

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("name") }}</th>
                  <th>{{ $t("notes") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    medicalRequirementsPlan, indexMed
                  ) in medicalRequirement.medicalRequirementsPlansDetailsData"
                  :key="indexMed"
                >
                  <td>{{ ++indexMed }}</td>
                  <td>
                    {{
                      isDataExist(
                        medicalRequirementsPlan.requirementNameCurrent
                      )
                    }}
                  </td>
                  <td>
                    {{
                      isDataExist(
                        medicalRequirementsPlan.medicalRequirementPlanDetailsNotes
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
// import i18n from "@/i18n/index";
// import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";
import { REQUIREMENTS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "MedicalRequirementsPlansTable",
  components: {
    // DataLabelGroup,
  },
  data() {
    return {
      requirementsTypeTokens: REQUIREMENTS_TYPE_TOKENS,
      isAngleUp: false,
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["medicalRequirementsPlansData", "medicalRequirementsPlanData"],
  methods: {
    setMedicalRequirementsPlanData(medicalRequirementsPlanData) {
      this.$emit("setMedicalRequirementsPlanData", medicalRequirementsPlanData);
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
