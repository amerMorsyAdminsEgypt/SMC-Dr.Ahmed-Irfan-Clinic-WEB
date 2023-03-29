<template>
  <div v-if="addictiveStuffClientsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th rowspan="2">#</th>
            <th rowspan="2" class="cell-md">{{ $t("clientName") }}</th>
            <th rowspan="2" class="cell-md">{{ name }}</th>
            <th colspan="4">{{ name }}</th>
            <th colspan="2">{{ $t("recovery") }}</th>
            <!-- <th>{{ $t("addictiveStuffs.recoveryNotes") }}</th> -->
            <th rowspan="2">{{ durationToNow }}</th>
            <th rowspan="2">
              {{ $t("addictiveStuffs.injury.treatmentDuration") }}
            </th>
            <th rowspan="2">{{ $t("responsible") }}</th>
            <th rowspan="2">{{ $t("operationDateTime") }}</th>
            <th rowspan="2">{{ $t("info") }}</th>
            <th rowspan="2">{{ $t("edit") }}</th>
            <th rowspan="2">{{ $t("delete") }}</th>
          </tr>
          <tr>
            <th>{{ $t("date") }}</th>
            <!-- <th>{{ $t("details") }}</th> -->
            <th>{{ $t("reason") }}</th>
            <th>{{ $t("syndrome") }}</th>
            <th>{{ $t("treatment") }}</th>
            <th>{{ $t("state") }}</th>
            <th>{{ $t("date") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(addictiveStuffClient, index) in addictiveStuffClientsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(addictiveStuffClient.clientNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(addictiveStuffClient.addictiveStuffNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(addictiveStuffClient.injuryDate) }}
            </td>
            <!-- <td>
              {{ isDataExist(addictiveStuffClient.InjuryDetailsCurrent) }}
            </td> -->
            <td>
              {{ isDataExist(addictiveStuffClient.InjuryReasonCurrent) }}
            </td>
            <td>
              {{ isDataExist(addictiveStuffClient.InjurySyndromeCurrent) }}
            </td>
            <td>
              {{ isDataExist(addictiveStuffClient.InjuryTreatmentCurrent) }}
            </td>

            <!-- <td>
              {{ isDataExist(addictiveStuffClient.addictiveStuffClientNotes) }}
            </td> -->
            <td>
              {{
                isDataExist(
                  addictiveStuffClient.recoveryState
                    ? $t("addictiveStuffs.recoveried")
                    : $t("addictiveStuffs.Norecovery")
                )
              }}
            </td>
            <td>
              {{ isDataExist(addictiveStuffClient.recoveryDate) }}
            </td>
            <!-- <td>
              {{ isDataExist(addictiveStuffClient.recoveryNotes) }}
            </td> -->
            <td>
              {{ isDataExist(addictiveStuffClient.injuryDurationToNow) }}
            </td>
            <td>
              {{ isDataExist(addictiveStuffClient.treatmentDuration) }}
            </td>
            <td>
              {{
                `${
                  addictiveStuffClient.employeeJobNameCurrentInReport != ""
                    ? addictiveStuffClient.employeeJobNameCurrentInReport
                    : $t("responsible")
                }: ${isDataExist(
                  addictiveStuffClient.employeeNameCurrentInReport
                )}`
              }}
            </td>
            <td>
              {{
                formateDateTimeLang(
                  addictiveStuffClient.actionDate,
                  addictiveStuffClient.actionTime
                )
              }}
            </td>
            <td>
              <button
                v-b-modal.AddictiveStuffClientInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setAddictiveStuffClientData(addictiveStuffClient)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                v-if="
                  addictiveStuffClient.addictiveStuffTypeToken ==
                  addictiveStuffTypeToken.Habits
                "
                :to="{
                  name: 'AddictiveStuffClientHabitsEdit',
                  params: {
                    clientToken: addictiveStuffClient.clientToken,
                    addictiveStuffClientToken:
                      addictiveStuffClient.addictiveStuffClientToken,
                  },
                }"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
              <router-link
                v-else-if="
                  addictiveStuffClient.addictiveStuffTypeToken ==
                  addictiveStuffTypeToken.Diseases
                "
                :to="{
                  name: 'AddictiveStuffClientDiseasesEdit',
                  params: {
                    clientToken: addictiveStuffClient.clientToken,
                    addictiveStuffClientToken:
                      addictiveStuffClient.addictiveStuffClientToken,
                  },
                }"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.AddictiveStuffClientDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setAddictiveStuffClientData(addictiveStuffClient)"
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
// import i18n from "@/i18n/index";
// import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import {
  setDataMultiLang,
  timeToLang,
  formateDateTimeLang,
  isDataExist,
} from "@/utils/functions";
import { ADDICTIVESTUFFS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "AddictiveStuffClientsTable",
  components: {
    // DataLabelGroup,
  },
  data() {
    return {
      addictiveStuffTypeToken: ADDICTIVESTUFFS_TYPE_TOKENS,
      isAngleUp: false,
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["addictiveStuffClientsData", "addictiveStuffClientData"],
  methods: {
    setAddictiveStuffClientData(addictiveStuffClientData) {
      this.$emit("setAddictiveStuffClientData", addictiveStuffClientData);
    },
    toggleAngle() {
      this.isAngleUp = !this.isAngleUp;
    },
    downlaodTreatmentPlan(addictiveStuffClientData) {
      this.$emit("downlaodTreatmentPlan", addictiveStuffClientData);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {
    name() {
      if (
        this.addictiveStuffClientsData[0].addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.habits.name");
      } else {
        return this.$t("addictiveStuffs.chronicDiseases.name");
      }
    },
    date() {
      if (
        this.addictiveStuffClientsData[0].addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.injuryHabit.date");
      } else {
        return this.$t("addictiveStuffs.injury.date");
      }
    },
    details() {
      if (
        this.addictiveStuffClientsData[0].addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.injuryHabit.details");
      } else {
        return this.$t("addictiveStuffs.injury.details");
      }
    },
    reason() {
      if (
        this.addictiveStuffClientsData[0].addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.injuryHabit.reason");
      } else {
        return this.$t("addictiveStuffs.injury.reason");
      }
    },
    syndrome() {
      if (
        this.addictiveStuffClientsData[0].addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.injuryHabit.syndrome");
      } else {
        return this.$t("addictiveStuffs.injury.syndrome");
      }
    },
    treatment() {
      if (
        this.addictiveStuffClientsData[0].addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.injuryHabit.treatment");
      } else {
        return this.$t("addictiveStuffs.injury.treatment");
      }
    },
    durationToNow() {
      if (
        this.addictiveStuffClientsData[0].addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.injuryHabit.durationToNow");
      } else {
        return this.$t("addictiveStuffs.injury.durationToNow");
      }
    },
  },
};
</script>

<style lang="scss"></style>
