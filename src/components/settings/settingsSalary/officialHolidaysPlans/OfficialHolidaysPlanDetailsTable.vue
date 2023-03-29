<template>
  <div v-if="officialHolidaysPlansSlidesDetailsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("officialHolidayName") }}</th>
            <th>{{ $t("officialHolidayStartDateTime") }}</th>
            <th>{{ $t("officialHolidayEndDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <!-- <th>{{ $t("info") }}</th> -->
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              officialHolidaysPlansSlide, index
            ) in officialHolidaysPlansSlidesDetailsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                isDataExist(
                  officialHolidaysPlansSlide.officialHolidayNameCurrent
                )
              }}
            </td>
            <td>
              {{
                timeToLang(
                  officialHolidaysPlansSlide.officialHolidayStartDateTime
                )
              }}
            </td>
            <td>
              {{
                timeToLang(
                  officialHolidaysPlansSlide.officialHolidayEndDateTime
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  officialHolidaysPlansSlide.officialHolidaysPlansSlidesDetailsNote
                )
              }}
            </td>
            <!-- <td>
              <button
                v-b-modal.OfficialHolidaysPlanDetailsInfo
                class="btn p-0"
                :title="$t('info')"
                @click="
                  setOfficialHolidaysPlansSlideDetailsData(
                    officialHolidaysPlansSlide
                  )
                "
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td> -->
            <td>
              <router-link
                :to="`/edit-official-holidays-plan-details/${officialHolidaysPlansSlide.officialHolidaysPlansSlidesDetailsToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.OfficialHolidaysPlanDetailsDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="
                  setOfficialHolidaysPlansSlideDetailsData(
                    officialHolidaysPlansSlide
                  )
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
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "OfficialHolidaysPlanDetailsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: [
    "officialHolidaysPlansSlidesDetailsData",
    "officialHolidaysPlansSlideDetailsData",
  ],
  methods: {
    setOfficialHolidaysPlansSlideDetailsData(
      officialHolidaysPlansSlideDetailsData
    ) {
      this.$emit(
        "setOfficialHolidaysPlansSlideDetailsData",
        officialHolidaysPlansSlideDetailsData
      );
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
