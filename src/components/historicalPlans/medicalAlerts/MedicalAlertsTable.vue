<template>
  <div v-if="medicalAlertsData" class="">
    <div
      v-for="(medicalAlert, index) in medicalAlertsData"
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
                  medicalAlert.mainReservationData.clientNameCurrent
                }  ${$t("quma")} `
              }}
            </div>
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("reservationCode")}:  ${
                  medicalAlert.mainReservationData.reservationCode
                }  ${$t("quma")} `
              }}
              {{
                `${$t("onDate")}:  ${
                  medicalAlert.mainReservationData.reservationDate
                    ? medicalAlert.mainReservationData.reservationDate
                    : $t("notFound")
                }  ${$t("quma")}  `
              }}
              {{
                `${$t("specialSpecialty")}:  ${
                  medicalAlert.mainReservationData.specialSpecialtyNameCurrent
                }  ${$t("quma")}  `
              }}
              {{
                `${
                  medicalAlert.employeeJobNameCurrentInReport
                    ? medicalAlert.employeeJobNameCurrentInReport
                    : $t("responsibleForProvidingTheService")
                }:  ${medicalAlert.employeeNameCurrentInReport}`
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
              name: 'MedicalAlertEdit',
              params: {
                clientToken: medicalAlert.clientToken,
                reservationToken: medicalAlert.reservationToken,
                medicalAlertToken: medicalAlert.medicalAlertToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.MedicalAlertDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setMedicalAlertData(medicalAlert)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
        <div class="">
          <button
            v-b-modal.MedicalAlertDownload
            class="btn p-0"
            :title="$t('viewAndSend')"
            @click="setMedicalAlertData(medicalAlert)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div class="my-card">
          <span class="my-card-title">{{
            $t("historicalPlans.warnings.modelName")
          }}</span>

          <div class="row">
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="medicalAlert.medicalAlertNameCurrent"
              :title="$t('historicalPlans.warnings.name')"
              :imgName="'warning.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="medicalAlert.medicalAlertDescriptionCurrent"
              :title="$t('historicalPlans.warnings.description')"
              :imgName="'description.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-12'"
              :value="medicalAlert.medicalAlertNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </div>

          <div class="my-card">
            <span class="my-card-title">{{
              $t("activeSubstances.modelName")
            }}</span>
            <div class="table-container">
              <table class="my-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      {{ $t("activeSubstances.name") }}
                    </th>
                    <th>{{ $t("activeSubstances.percentage") }}</th>
                    <th>{{ $t("notes") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      activeSubstance, indexMed
                    ) in medicalAlert.medicalAlertsActiveSubstancesData"
                    :key="indexMed"
                  >
                    <td>{{ ++indexMed }}</td>
                    <td>
                      {{
                        isDataExist(activeSubstance.activeSubstanceNameCurrent)
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(activeSubstance.activeSubstancesPercentage)
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          activeSubstance.medicalAlertActiveSubstancesNotes
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="my-card">
            <span class="my-card-title">{{ $t("meals.modelName") }}</span>
            <div class="table-container">
              <table class="my-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      {{ $t("mealsTypes.name") }}
                    </th>
                    <th>
                      {{ $t("meals.name") }}
                    </th>
                    <th>{{ $t("notes") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      alert, indexMed
                    ) in medicalAlert.medicalAlertsMealsData"
                    :key="indexMed"
                  >
                    <td>{{ ++indexMed }}</td>
                    <td>
                      {{ isDataExist(alert.mealsTypeNameCurrent) }}
                    </td>
                    <td>
                      <img
                        class="item-img-table"
                        :src="`${baseUrl}${alert.mealImagePath}`"
                      />
                      {{ isDataExist(alert.mealNameCurrent) }}
                    </td>
                    <td>
                      {{ isDataExist(alert.medicalAlertsMealsNotes) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
// import i18n from "@/i18n/index";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { BASE_URL } from "@/utils/constants";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "MedicalAlertsTable",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      isAngleUp: false,
      language: localStorage.getItem("userLanguage") || "ar",
      baseUrl: BASE_URL,
    };
  },
  props: ["medicalAlertsData", "medicalAlertData"],
  methods: {
    setMedicalAlertData(medicalAlertData) {
      this.$emit("setMedicalAlertData", medicalAlertData);
    },
    toggleAngle() {
      this.isAngleUp = !this.isAngleUp;
    },
    downlaodTreatmentPlan(medicalAlertData) {
      this.$emit("downlaodTreatmentPlan", medicalAlertData);
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
