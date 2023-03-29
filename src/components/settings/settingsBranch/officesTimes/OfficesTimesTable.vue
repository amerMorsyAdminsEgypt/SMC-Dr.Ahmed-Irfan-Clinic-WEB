<template>
  <div v-if="officesTimesData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("officeTime") }}</th>
            <th>{{ $t("officeName") }}</th>
            <th>{{ $t("chamberName") }}</th>
            <th>{{ $t("floorName") }}</th>
            <th>{{ $t("buildingName") }}</th>
            <th>{{ $t("branchName") }}</th>
            <th>{{ $t("responsibleForProvidingTheService") }}</th>
            <!-- <th>{{ $t("serviceResponsiblePercentage") }}</th> -->
            <th>{{ $t("reservationShowStatus") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(officesTime, index) in officesTimesData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(timeToLang(officesTime.timeNameCurrent)) }}
            </td>
            <td>
              {{ isDataExist(officesTime.officeNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(officesTime.chamberNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(officesTime.floorNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(officesTime.buildingNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(officesTime.branchNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(officesTime.employeeNameCurrent) }}
            </td>
            <!-- <td>
              {{ officesTime.serviceResponsiblePercentage || 0 }}
            </td> -->
            <td>
              {{
                isDataExist(
                  officesTime.reservationShowStatus === true
                    ? $t("yes")
                    : $t("no")
                )
              }}
            </td>
            <td>{{ isDataExist(officesTime.officesTimeNotes) }}</td>
            <td>
              <button
                v-b-modal.OfficesTimeInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setOfficesTimeData(officesTime)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-offices-time/${officesTime.officeTimeToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.OfficesTimeDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setOfficesTimeData(officesTime)"
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "OfficesTimesTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["officesTimesData", "officesTimeData"],
  methods: {
    setOfficesTimeData(officesTimeData) {
      this.$emit("setOfficesTimeData", officesTimeData);
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
