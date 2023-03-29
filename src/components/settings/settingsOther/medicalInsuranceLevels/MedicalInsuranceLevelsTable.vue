<template>
  <div v-if="medicalInsuranceLevelsData" class="">
    <div
      v-for="(medicalInsuranceLevelData, index) in medicalInsuranceLevelsData"
      :key="index"
    >
      <b-button v-b-toggle="`item${index}`" class="btn btn-lg btn-collapse">
        <div class="p-t-container">
          <div class="row collapse-title">
            <div class="col-md-12 col-lg-12">
              {{ medicalInsuranceLevelData.medicalInsuranceLevelNameCurrent }}
            </div>
          </div>
          <div class="collapse-icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </div>
      </b-button>

      <b-collapse :id="`item${index}`">
        <div class="my-card">
          <span class="my-card-title">{{
            $t("medicalInsuranceLevels.data")
          }}</span>
          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>{{ $t("code") }}</th>
                  <th>{{ $t("name") }}</th>
                  <th>{{ $t("colors.name") }}</th>
                  <th>{{ $t("notes") }}</th>
                  <th>{{ $t("edit") }}</th>
                  <th>{{ $t("delete") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {{
                      isDataExist(
                        medicalInsuranceLevelData.medicalInsuranceLevelCode
                      )
                    }}
                  </td>
                  <td>
                    {{
                      isDataExist(
                        medicalInsuranceLevelData.medicalInsuranceLevelNameCurrent
                      )
                    }}
                  </td>
                  <td
                    class="cell-color"
                    :style="{
                      backgroundColor: medicalInsuranceLevelData.colorHexFromat,
                    }"
                  >
                    <span>{{
                      medicalInsuranceLevelData.colorNameCurrent
                    }}</span>
                  </td>
                  <td>
                    {{
                      isDataExist(
                        medicalInsuranceLevelData.medicalInsuranceLevelNotes
                      )
                    }}
                  </td>
                  <!-- <td>
                <button
                  v-b-modal.MedicalInsuranceLevelInfo
                  class="btn p-0"
                  :title="$t('info')"
                  @click="
                    setMedicalInsuranceLevelData(medicalInsuranceLevelData)
                  "
                >
                  <img src="@/assets/images/info.svg" class="icon-lg" />
                </button>
              </td> -->
                  <td>
                    <router-link
                      :to="{
                        name: 'MedicalInsuranceLevelEdit',
                        params: {
                          medicalInsuranceLevelToken:
                            medicalInsuranceLevelData.medicalInsuranceLevelToken,
                          insuranceCompanyToken:
                            medicalInsuranceLevelData.insuranceCompanyToken,
                        },
                      }"
                      :title="$t('edit')"
                    >
                      <img src="@/assets/images/pencil.svg" class="icon-lg" />
                    </router-link>
                  </td>
                  <td>
                    <button
                      v-b-modal.MedicalInsuranceLevelDelete
                      class="btn p-0"
                      :title="$t('delete')"
                      @click="
                        setMedicalInsuranceLevelData(medicalInsuranceLevelData)
                      "
                    >
                      <img src="@/assets/images/trash.svg" class="icon-lg" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="my-card">
          <span class="my-card-title">{{ $t("services") }}</span>
          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("name") }}</th>
                  <th>
                    {{ $t("insuranceCompanyServices.discountPercentage") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    service, index
                  ) in medicalInsuranceLevelData.medicalInsuranceLevelServicesData"
                  :key="index"
                >
                  <td>{{ ++index }}</td>
                  <td>{{ isDataExist(service.serviceNameCurrent) }}</td>
                  <td>{{ isDataExist(service.discountPercentage) }}</td>
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
  name: "medicalInsuranceLevelTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["medicalInsuranceLevelsData"],
  methods: {
    getServicesListLength(medicalInsuranceLevel) {
      return medicalInsuranceLevel.medicalInsuranceLevelServicesData.length;
    },
    setMedicalInsuranceLevelData(medicalInsuranceLevelData) {
      this.$emit("setMedicalInsuranceLevelData", medicalInsuranceLevelData);
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
