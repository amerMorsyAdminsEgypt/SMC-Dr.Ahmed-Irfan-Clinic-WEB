<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateOfficialHolidaysPlansSlidesDetails"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-12">
            <b-form-select
              v-model="
                officialHolidaysPlansSlideDetailsData.officialHolidayToken
              "
              :options="officialHolidayTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/holiday.svg" />
          </div>

          <TextArea
            :className="'col-md-12'"
            :id="'officialHolidaysPlansSlidesDetailsNote'"
            :value="
              officialHolidaysPlansSlideDetailsData.officialHolidaysPlansSlidesDetailsNote
            "
            v-on:changeValue="
              officialHolidaysPlansSlideDetailsData.officialHolidaysPlansSlidesDetailsNote =
                $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          :to="`/official-holidays-plan-details/${officialHolidaysPlansSlideDetailsData.officialHolidaysPlansToken}`"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { STATUS } from "@/utils/constants";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import TextArea from "@/components/general/TextArea.vue";
import OfficialHoliday from "@/models/settings/settingsSalary/officialHolidays/OfficialHoliday";

export default {
  name: "OfficialHolidaysPlanDetailsForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      officialHolidayData: new OfficialHoliday(),
      officialHolidayTokenOptions: [],
    };
  },
  props: ["officialHolidaysPlansSlideDetailsData", "submitName"],
  methods: {
    async addOrUpdateOfficialHolidaysPlansSlidesDetails() {
      this.$emit("addOrUpdateOfficialHolidaysPlansSlidesDetails");
    },
    async getDialogOfOfficialHolidays() {
      this.isLoading = true;
      this.officialHolidayTokenOptions = [];
      this.officialHolidayTokenOptions.push({
        value: "",
        text: this.$t("selectOfficialHoliday"),
      });
      try {
        let response =
          await this.officialHolidayData.getDialogOfOfficialHolidays(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.officialHolidayTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfOfficialHolidays();
  },
};
</script>

<style lang="scss"></style>
