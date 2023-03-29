<template>
  <div v-if="allowancesPlansSlidesDetailsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("allowanceName") }}</th>
            <th>{{ $t("allowanceValue") }}</th>
            <th>{{ $t("operationType") }}</th>
            <th>{{ $t("timeMethodCalcolateName") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              allowancesPlansSlide, index
            ) in allowancesPlansSlidesDetailsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(allowancesPlansSlide.allowanceNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(allowancesPlansSlide.allowancesValue + $t("EGP"))
              }}
            </td>
            <td>
              {{ isDataExist(allowancesPlansSlide.attendanceTypeNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(allowancesPlansSlide.timeMethodCalcolateNameCurrent)
              }}
            </td>
            <td>
              {{
                isDataExist(
                  allowancesPlansSlide.allowancesPlansSlidesDetailsNote
                )
              }}
            </td>
            <td>
              <button
                v-b-modal.AllowancesPlanDetailsInfo
                class="btn p-0"
                :title="$t('info')"
                @click="
                  setAllowancesPlansSlideDetailsData(allowancesPlansSlide)
                "
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-allowances-plan-details/${allowancesPlansSlide.allowancesPlansSlidesDetailsToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.AllowancesPlanDetailsDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="
                  setAllowancesPlansSlideDetailsData(allowancesPlansSlide)
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
  name: "AllowancesPlanDetailsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: [
    "allowancesPlansSlidesDetailsData",
    "allowancesPlansSlideDetailsData",
  ],
  methods: {
    setAllowancesPlansSlideDetailsData(allowancesPlansSlideDetailsData) {
      this.$emit(
        "setAllowancesPlansSlideDetailsData",
        allowancesPlansSlideDetailsData
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
