<template>
  <div v-if="operationsData" class="">
    <div
      v-for="(operation, index) in operationsData"
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
                isDataExist(
                  `${$t("name")}:  ${
                    operation.surgeryHistoryClientNameCurrent
                  }  ${$t("quma")} `
                )
              }}
            </div>

            <div
              v-if="operation.mainReservationData.reservationCode"
              class="col-md-12 col-lg-12"
            >
              {{
                isDataExist(
                  `${$t("reservationCode")}:  ${
                    operation.mainReservationData.reservationCode
                  }  ${$t("quma")} `
                )
              }}
              {{
                isDataExist(
                  `${$t("onDate")}:  ${
                    operation.mainReservationData.reservationDate
                      ? operation.mainReservationData.reservationDate
                      : $t("notFound")
                  }  ${$t("quma")}  `
                )
              }}
              {{
                isDataExist(
                  `${$t("specialSpecialty")}:  ${
                    operation.mainReservationData.specialSpecialtyNameCurrent
                  }  ${$t("quma")}  `
                )
              }}
              {{
                isDataExist(
                  `${
                    operation.employeeJobNameCurrentInReport
                      ? operation.employeeJobNameCurrentInReport
                      : $t("responsibleForProvidingTheService")
                  }:  ${operation.employeeNameCurrentInReport}`
                )
              }}
            </div>
            <div v-else class="col-md-12 col-lg-12">
              {{
                isDataExist(
                  `${$t("historicalPlans.operations.operation.code")}:  ${
                    operation.surgeryHistoryCode
                  }  ${$t("quma")} `
                )
              }}
              {{
                isDataExist(
                  `${$t("historicalPlans.operations.operation.name")}:  ${
                    operation.surgeryNameCurrent
                  }  ${$t("quma")} `
                )
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
              name: 'OperationEdit',
              params: {
                surgeryHistoryClientNameCurrent:
                  operation.surgeryHistoryClientNameCurrent,
                reservationToken: operation.reservationToken,
                surgeryHistoryToken: operation.surgeryHistoryToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.OperationDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setOperationData(operation)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
        <div class="">
          <button
            v-b-modal.OperationDownload
            class="btn p-0"
            :title="$t('viewAndSend')"
            @click="setOperationData(operation)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div class="my-card">
          <span class="my-card-title">{{
            $t("historicalPlans.operations.operation.data")
          }}</span>

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>{{ $t("historicalPlans.operations.operation.name") }}</th>
                  <th>
                    {{ $t("historicalPlans.operations.operation.description") }}
                  </th>
                  <th>
                    {{ $t("historicalPlans.operations.operation.reason") }}
                  </th>
                  <th>
                    {{ $t("historicalPlans.operations.operation.dateTime") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {{ isDataExist(operation.surgeryNameCurrent) }}
                  </td>
                  <td>
                    {{
                      isDataExist(operation.surgeryHistoryDescriptionCurrent)
                    }}
                  </td>
                  <td>
                    {{ isDataExist(operation.surgeryHistoryReasonCurrent) }}
                  </td>
                  <td>
                    {{
                      formateDateTimeLang(
                        operation.surgeryHistoryDate,
                        operation.surgeryHistoryTime
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="my-card">
          <span class="my-card-title">{{ $t("bodyAnatomyTypes.name") }}</span>

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("bodyAnatomies.name") }}</th>
                  <th>{{ $t("bodyAnatomyTypes.name") }}</th>
                  <th>{{ $t("notes") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    operation, indexMed
                  ) in operation.surgriesHistoryDetilsBodyAnatomyData"
                  :key="indexMed"
                >
                  <td>{{ ++indexMed }}</td>
                  <td>
                    {{ isDataExist(operation.bodyAnatomyNameCurrent) }}
                  </td>
                  <td>
                    {{ isDataExist(operation.bodyAnatomyTypeNameCurrent) }}
                  </td>
                  <td>
                    {{
                      isDataExist(
                        operation.surgeryHistoryDetilsBodyAnatomyNotes
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
import {
  setDataMultiLang,
  timeToLang,
  formateDateTimeLang,
  isDataExist,
} from "@/utils/functions";

export default {
  name: "OperationsTable",
  components: {
    // DataLabelGroup,
  },
  data() {
    return {
      isAngleUp: false,
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["operationsData", "operationData"],
  methods: {
    setOperationData(operationData) {
      this.$emit("setOperationData", operationData);
    },
    toggleAngle() {
      this.isAngleUp = !this.isAngleUp;
    },
    downlaodOperation(operationData) {
      this.$emit("downlaodOperation", operationData);
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
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
