<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidaysPlansNameAr'"
            :value="officialHolidaysPlanData.officialHolidaysPlansNameAr"
            v-on:changeValue="
              officialHolidaysPlanData.officialHolidaysPlansNameAr = $event
            "
            :title="$t('nameAr')"
            :imgName="'official-holidays-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidaysPlansNameEn'"
            :value="officialHolidaysPlanData.officialHolidaysPlansNameEn"
            v-on:changeValue="
              officialHolidaysPlanData.officialHolidaysPlansNameEn = $event
            "
            :title="$t('nameEn')"
            :imgName="'official-holidays-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidaysPlansNameUnd'"
            :value="officialHolidaysPlanData.officialHolidaysPlansNameUnd"
            v-on:changeValue="
              officialHolidaysPlanData.officialHolidaysPlansNameUnd = $event
            "
            :title="$t('nameUnd')"
            :imgName="'official-holidays-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'officialHolidaysPlansCode'"
            :value="officialHolidaysPlanData.officialHolidaysPlansCode"
            v-on:changeValue="
              officialHolidaysPlanData.officialHolidaysPlansCode = $event
            "
            :title="$t('officialHolidaysPlansCode')"
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'officialHolidaysPlansNote'"
            :value="officialHolidaysPlanData.officialHolidaysPlansNote"
            v-on:changeValue="
              officialHolidaysPlanData.officialHolidaysPlansNote = $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div v-if="submitName == $t('add')">
        <div
          class="my-card"
          v-for="(
            officialHolidaysPlan, index
          ) in officialHolidaysPlanData.officialHolidaysPlansSlidesDetailsData"
          :key="index"
        >
          <span class="my-card-title">{{ index + 1 }}</span>

          <span class="remove-slice-container" v-if="index != 0">
            <button
              @click="removeSlice(index)"
              type="button"
              class="btn btn-remove-slice"
            >
              ×
            </button>
          </span>

          <div class="row">
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="officialHolidaysPlan.officialHolidayToken"
                :options="officialHolidayTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/holiday.svg" />
            </div>

            <TextArea
              :className="'col-md-6'"
              :id="`officialHolidaysPlansSlidesDetailsData[${index}][officialHolidaysPlansSlidesDetailsNote]`"
              :value="
                officialHolidaysPlan.officialHolidaysPlansSlidesDetailsNote
              "
              v-on:changeValue="
                officialHolidaysPlan.officialHolidaysPlansSlidesDetailsNote =
                  $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </div>
        </div>

        <div class="add-slice-container">
          <button
            @click="addSlice"
            type="button"
            class="btn btn-add-slice"
            :title="$t('addSlice')"
          >
            +
          </button>
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateOfficialHolidaysPlan"
        >
          {{ submitName }}
        </button>
        <router-link :to="'/official-holidays-plans/'" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { STATUS } from "@/utils/constants";
import { setDataMultiLang } from "@/utils/functions";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import OfficialHolidaysPlansSlideDetails from "@/models/settings/settingsSalary/officialHolidaysPlans/OfficialHolidaysPlansSlideDetails";
import OfficialHoliday from "@/models/settings/settingsSalary/officialHolidays/OfficialHoliday";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeesSliceForm",
  mixins: [createToastMixin],
  components: {
    CustomInput,
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
  props: ["officialHolidaysPlanData", "submitName"],
  methods: {
    addSlice() {
      this.officialHolidaysPlanData.officialHolidaysPlansSlidesDetailsData.push(
        new OfficialHolidaysPlansSlideDetails()
      );
    },
    removeSlice(index) {
      this.officialHolidaysPlanData.officialHolidaysPlansSlidesDetailsData.splice(
        index,
        1
      );
    },
    async addOrUpdateOfficialHolidaysPlan() {
      this.$emit("addOrUpdateOfficialHolidaysPlan");
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
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    if (this.submitName == this.$t("add")) this.getDialogOfOfficialHolidays();
  },
};
</script>

<style scoped lang="scss"></style>
