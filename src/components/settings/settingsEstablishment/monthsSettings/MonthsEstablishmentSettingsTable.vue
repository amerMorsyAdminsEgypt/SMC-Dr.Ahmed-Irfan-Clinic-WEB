<template>
  <div v-if="establishmentsSettingsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("settingType") }}</th>
            <th>
              {{
                $t("fixedDayOfTheMonth") +
                " / " +
                $t("subtractNumberOfDaysFromEndOfTheMonth")
              }}
            </th>
            <th>{{ $t("settingName") }}</th>
            <th>{{ $t("settingStartDate") }}</th>
            <th>{{ $t("settingEndDate") }}</th>
            <th>{{ $t("userMakeAction") }}</th>
            <th>{{ $t("settingDateAction") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(setting, index) in establishmentsSettingsData"
            :key="setting.settingToken"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                setting.settingDayFromEndMonthStatus
                  ? $t("subtractNumberOfDaysFromEndOfTheMonth")
                  : $t("fixedDayOfTheMonth")
              }}
            </td>
            <td>
              {{
                setting.settingDayFromEndMonthStatus
                  ? setting.settingDayFromEndMonth
                  : setting.settingDayInMonth
              }}
            </td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  setting.settingNameAr,
                  setting.settingNameEn
                )
              }}
            </td>
            <td>{{ setting.settingActiveStart }}</td>
            <td>{{ setting.settingActiveEnd }}</td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  setting.addedByUserNameAr,
                  setting.addedByUserNameEn
                )
              }}
            </td>
            <td>
              {{
                setDataMultiLang(
                  language,
                  timeE2A(setting.settingInitializeDateTime),
                  setting.settingInitializeDateTime
                )
              }}
            </td>
            <td>{{ setting.settingNotes ? setting.settingNotes : "-" }}</td>
            <td>
              <button
                v-b-modal.SettingsGeneralDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setSettingsData(setting)"
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
export default {
  name: "SettingsGeneralTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["establishmentsSettingsData", "branchsettingsData"],
  methods: {
    setSettingsData(branchsettingsData) {
      this.$emit("setSettingsData", branchsettingsData);
    },
    timeE2A(time) {
      if (time.indexOf("AM") > -1) return time.replace("AM", "ص");
      else if (time.indexOf("PM") > -1) return time.replace("PM", "م");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
