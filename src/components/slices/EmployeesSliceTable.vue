<template>
  <div v-if="employeesMoveSlidesData" class="">
    <div
      v-for="employeeSlideData in employeesMoveSlidesData"
      :key="employeeSlideData.moveSlidesCode"
    >
      <b-button
        v-b-toggle="employeeSlideData.moveSlidesCode"
        class="btn btn-lg btn-collapse"
      >
        <span
          class="status"
          :class="getActivationStatus(employeeSlideData.activationStatus)"
        ></span>
        {{
          setDataMultiLang(
            language,
            employeeSlideData.moveSlidesNameAr,
            employeeSlideData.moveSlidesNameEn
          )
        }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse :id="employeeSlideData.moveSlidesCode">
        <div class="table-container">
          <table class="my-table">
            <thead>
              <tr>
                <th>{{ $t("sliceName") }}</th>
                <th>{{ $t("dateTime") }}</th>
                <th>{{ $t("userMakeAction") }}</th>
                <th>{{ $t("notes") }}</th>
                <th>{{ $t("delete") }}</th>
                <th v-if="!employeeSlideData.activationStatus">
                  {{ $t("activateSlice") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {{
                    setDataMultiLang(
                      language,
                      employeeSlideData.moveSlidesNameAr,
                      employeeSlideData.moveSlidesNameEn
                    )
                  }}
                </td>
                <td>
                  {{ timeToLang(employeeSlideData.dateTimeActionAdd) }}
                </td>
                <td>
                  {{
                    setDataMultiLang(
                      language,
                      employeeSlideData.addedByUserNameAr,
                      employeeSlideData.addedByUserNameEn
                    )
                  }}
                </td>
                <td>
                  {{
                    employeeSlideData.moveSlidesNote
                      ? employeeSlideData.moveSlidesNote
                      : $t("notFound")
                  }}
                </td>
                <td>
                  <button
                    v-b-modal.EmployeeSlideDelete
                    class="btn p-0"
                    :title="$t('delete')"
                    @click="setMoveSlidesData(employeeSlideData)"
                  >
                    <img src="@/assets/images/trash.svg" class="icon-lg" />
                  </button>
                </td>
                <td v-if="!employeeSlideData.activationStatus">
                  <button
                    v-b-modal.EmployeesSliceActivate
                    class="btn p-0"
                    :title="$t('delete')"
                    @click="setMoveSlidesData(employeeSlideData)"
                  >
                    <img src="@/assets/images/checkmark.svg" class="icon-lg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-container">
          <table class="my-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{{ $t("slicesDistribution") }}</th>
                <th>{{ $t("from") }}</th>
                <th>{{ $t("to") }}</th>
                <th>{{ $t("difference") }}</th>
                <th>{{ $t("price") }}</th>
                <th>{{ $t("notes") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(
                  employeeSlideDetailsData, index
                ) in employeeSlideData.employeesMoveSlidesDetailsData"
                :key="employeeSlideDetailsData.moveSlidDetailsToken"
              >
                <td>{{ ++index }}</td>
                <td>
                  {{
                    setDataMultiLang(
                      language,
                      employeeSlideDetailsData.moveSlidDetailsNameAr,
                      employeeSlideDetailsData.moveSlidDetailsNameEn
                    )
                  }}
                </td>
                <td>{{ employeeSlideDetailsData.moveSlidDetailsFrom }}</td>
                <td>{{ employeeSlideDetailsData.moveSlidDetailsTo }}</td>
                <td>{{ employeeSlideDetailsData.moveSlidDifference }}</td>
                <td>
                  {{
                    employeeSlideDetailsData.moveSlidDetailsPrice + $t("EGP")
                  }}
                </td>
                <td>
                  {{
                    employeeSlideDetailsData.moveSlidDetailsNote
                      ? employeeSlideDetailsData.moveSlidDetailsNote
                      : $t("notFound")
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang } from "@/utils/functions";
export default {
  name: "EmployeesSliceTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeesMoveSlidesData", "employeeSlideData"],
  methods: {
    getActivationStatus(activationStatus) {
      return activationStatus ? "status-green" : "status-red";
    },
    setMoveSlidesData(employeeSlideData) {
      this.$emit("setMoveSlidesData", employeeSlideData);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
};
</script>

<style lang="scss"></style>
