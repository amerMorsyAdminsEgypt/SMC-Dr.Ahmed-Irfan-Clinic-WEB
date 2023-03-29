<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateAllowancesPlansSlidesDetails"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="allowancesPlansSlideDetailsData.allowanceToken"
              :options="allowanceTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/allowances.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="`allowancesPlansSlidesDetailsData[${index}][allowancesValue]`"
            :value="allowancesPlansSlideDetailsData.allowancesValue"
            v-on:changeValue="
              allowancesPlansSlideDetailsData.allowancesValue = $event
            "
            :title="$t('allowanceValue')"
            :imgName="'money.svg'"
          />

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="allowancesPlansSlideDetailsData.attendanceTypeToken"
              :options="attendanceTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="allowancesPlansSlideDetailsData.dayTypeToken"
              :options="dayTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>

          <TimePicker
            :className="'col-md-6'"
            :value="allowancesPlansSlideDetailsData.workShiftTimeFrom"
            :title="$t('workShiftTimeFrom')"
            :language="language"
            v-on:changeValue="
              allowancesPlansSlideDetailsData.workShiftTimeFrom = $event
            "
          />
          <TimePicker
            :className="'col-md-6'"
            :value="allowancesPlansSlideDetailsData.workShiftTimeTo"
            :title="$t('workShiftTimeTo')"
            :language="language"
            v-on:changeValue="
              allowancesPlansSlideDetailsData.workShiftTimeTo = $event
            "
          />

          <CustomInput
            :className="'col-md-4'"
            :id="`allowancesPlansSlidesDetailsData[${index}][allowancesMaximumNumberInDay]`"
            :value="
              allowancesPlansSlideDetailsData.allowancesMaximumNumberInDay
            "
            v-on:changeValue="
              allowancesPlansSlideDetailsData.allowancesMaximumNumberInDay =
                $event
            "
            :title="$t('allowancesMaximumNumberInDay')"
            :imgName="'days.svg'"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="`allowancesPlansSlidesDetailsData[${index}][allowancesMaximumNumberInMonth]`"
            :value="
              allowancesPlansSlideDetailsData.allowancesMaximumNumberInMonth
            "
            v-on:changeValue="
              allowancesPlansSlideDetailsData.allowancesMaximumNumberInMonth =
                $event
            "
            :title="$t('allowancesMaximumNumberInMonth')"
            :imgName="'date.svg'"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="`allowancesPlansSlidesDetailsData[${index}][allowancesMaximumNumberInYear]`"
            :value="
              allowancesPlansSlideDetailsData.allowancesMaximumNumberInYear
            "
            v-on:changeValue="
              allowancesPlansSlideDetailsData.allowancesMaximumNumberInYear =
                $event
            "
            :title="$t('allowancesMaximumNumberInYear')"
            :imgName="'year.svg'"
          />

          <div class="my-card col-md-12">
            <span class="my-card-title">{{
              $t("beginningOfTheEntitlement")
            }}</span>

            <div class="row">
              <CustomInput
                :className="'col-md-4'"
                :id="`allowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInHours]`"
                :value="
                  allowancesPlansSlideDetailsData.beginningOfTheEntitlementInHours
                "
                v-on:changeValue="
                  allowancesPlansSlideDetailsData.beginningOfTheEntitlementInHours =
                    $event
                "
                :title="$t('hour')"
                :imgName="'hours.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="`allowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInMinutes]`"
                :value="
                  allowancesPlansSlideDetailsData.beginningOfTheEntitlementInMinutes
                "
                v-on:changeValue="
                  allowancesPlansSlideDetailsData.beginningOfTheEntitlementInMinutes =
                    $event
                "
                :title="$t('minute')"
                :imgName="'minutes.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="`allowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInSeconds]`"
                :value="
                  allowancesPlansSlideDetailsData.beginningOfTheEntitlementInSeconds
                "
                v-on:changeValue="
                  allowancesPlansSlideDetailsData.beginningOfTheEntitlementInSeconds =
                    $event
                "
                :title="$t('second')"
                :imgName="'seconds.svg'"
              />
            </div>
          </div>

          <TextArea
            :className="'col-md-12'"
            :id="`allowancesPlansSlidesDetailsData[${index}][allowancesPlansSlidesDetailsNote]`"
            :value="
              allowancesPlansSlideDetailsData.allowancesPlansSlidesDetailsNote
            "
            v-on:changeValue="
              allowancesPlansSlideDetailsData.allowancesPlansSlidesDetailsNote =
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
          :to="`/allowances-plan-details/${allowancesPlansSlideDetailsData.allowancesPlansToken}`"
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
import { setDataMultiLang } from "@/utils/functions";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TimePicker from "@/components/general/TimePicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import Allowance from "@/models/settings/settingsSalary/allowances/Allowance";

export default {
  name: "AllowancesPlanDetailsForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    TimePicker,
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
      attendanceTypeTokenOptions: [],
      allowanceData: new Allowance(),
      allowanceTokenOptions: [],
      dayTypeTokenOptions: [],
    };
  },
  props: ["allowancesPlansSlideDetailsData", "submitName"],
  methods: {
    async addOrUpdateAllowancesPlansSlidesDetails() {
      this.$emit("addOrUpdateAllowancesPlansSlidesDetails");
    },
    async getDialogOfEmployeeAttendanceTypes() {
      this.isLoading = true;
      this.attendanceTypeTokenOptions = [];
      this.attendanceTypeTokenOptions.push({
        value: "",
        text: this.$t("selectOperationType"),
      });
      let items =
        this.$store.getters.userData.constantLists.listEmployeeAttendanceType;
      for (let item in items) {
        this.attendanceTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfAllowances() {
      this.isLoading = true;
      this.allowanceTokenOptions = [];
      this.allowanceTokenOptions.push({
        value: "",
        text: this.$t("selectAllowance"),
      });
      try {
        let response = await this.allowanceData.getDialogOfAllowances(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.allowanceTokenOptions.push({
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
    async getDialogOfDayTypes() {
      this.isLoading = true;
      this.dayTypeTokenOptions = [];
      this.dayTypeTokenOptions.push({
        value: "",
        text: this.$t("selectDayType"),
      });
      let items = this.$store.getters.userData.constantLists.listDayType;
      for (let item in items) {
        this.dayTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  watch: {},
  async created() {
    this.getDialogOfEmployeeAttendanceTypes();
    this.getDialogOfAllowances();
    this.getDialogOfDayTypes();
  },
};
</script>

<style lang="scss"></style>
