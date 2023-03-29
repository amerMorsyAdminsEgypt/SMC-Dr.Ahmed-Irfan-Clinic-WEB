<template>
  <div v-if="curePlansData" class="">
    <div
      v-for="(curePlan, index) in curePlansData"
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
                  curePlan.clientNameCurrent
                )}  ${$t("quma")} `
              }}
            </div>
            <div class="col-md-12 col-lg-12">
              {{
                `${
                  curePlan.employeeJobNameCurrentInReport
                    ? curePlan.employeeJobNameCurrentInReport
                    : $t("responsibleForProvidingTheService")
                }:  ${isDataExist(curePlan.employeeNameCurrentInReport)}`
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
              name: 'CurePlanEdit',
              params: {
                clientToken: curePlan.clientToken,
                reservationToken: curePlan.reservationToken,
                curePlanToken: curePlan.curePlanToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.CurePlanDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setCurePlanData(curePlan)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div class="my-card">
          <span class="my-card-title">
            {{ $t("historicalPlans.curePlans.modelName") }}</span
          >

          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("historicalPlans.curePlans.description") }}</th>
                  <th>{{ $t("showType") }}</th>
                  <th>{{ $t("from") }}</th>
                  <th>{{ $t("to") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ ++index }}</td>
                  <td>
                    {{ isDataExist(curePlan.curePlanDescriptionCurrent) }}
                  </td>
                  <td>
                    {{ isDataExist(curePlan.showTypeNameCurrent) }}
                  </td>
                  <td>
                    {{
                      formateDateTimeLang(
                        curePlan.curePlanDateFrom,
                        curePlan.curePlanTimeFrom
                      )
                    }}
                  </td>
                  <td>
                    {{
                      formateDateTimeLang(
                        curePlan.curePlanDateTo,
                        curePlan.curePlanTimeTo
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
import {
  setDataMultiLang,
  timeToLang,
  isDataExist,
  formateDateTimeLang,
} from "@/utils/functions";

export default {
  name: "CurePlansTable",
  components: {
    // DataLabelGroup,
  },
  data() {
    return {
      isAngleUp: false,
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["curePlansData", "curePlanData"],
  methods: {
    setCurePlanData(curePlanData) {
      this.$emit("setCurePlanData", curePlanData);
    },
    toggleAngle() {
      this.isAngleUp = !this.isAngleUp;
    },
    downlaodTreatmentPlan(curePlanData) {
      this.$emit("downlaodTreatmentPlan", curePlanData);
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
