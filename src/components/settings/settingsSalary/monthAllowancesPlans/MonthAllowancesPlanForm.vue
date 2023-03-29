<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'monthAllowancesPlansNameAr'"
            :value="monthAllowancesPlanData.monthAllowancesPlansNameAr"
            v-on:changeValue="
              monthAllowancesPlanData.monthAllowancesPlansNameAr = $event
            "
            :title="$t('nameAr')"
            :imgName="'month-allowances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'monthAllowancesPlansNameEn'"
            :value="monthAllowancesPlanData.monthAllowancesPlansNameEn"
            v-on:changeValue="
              monthAllowancesPlanData.monthAllowancesPlansNameEn = $event
            "
            :title="$t('nameEn')"
            :imgName="'month-allowances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'monthAllowancesPlansNameUnd'"
            :value="monthAllowancesPlanData.monthAllowancesPlansNameUnd"
            v-on:changeValue="
              monthAllowancesPlanData.monthAllowancesPlansNameUnd = $event
            "
            :title="$t('nameUnd')"
            :imgName="'month-allowances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'monthAllowancesPlansCode'"
            :value="monthAllowancesPlanData.monthAllowancesPlansCode"
            v-on:changeValue="
              monthAllowancesPlanData.monthAllowancesPlansCode = $event
            "
            :title="$t('monthAllowancesPlansCode')"
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'monthAllowancesPlansNote'"
            :value="monthAllowancesPlanData.monthAllowancesPlansNote"
            v-on:changeValue="
              monthAllowancesPlanData.monthAllowancesPlansNote = $event
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
            monthAllowancesPlan, index
          ) in monthAllowancesPlanData.monthAllowancesPlansSlidesDetailsData"
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
                v-model="monthAllowancesPlan.allowanceToken"
                :options="allowanceTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/allowances.svg" />
            </div>
            <CustomInput
              :className="'col-md-6'"
              :id="`monthAllowancesPlansSlidesDetailsData[${index}][monthAllowancesValue]`"
              :value="monthAllowancesPlan.monthAllowancesValue"
              v-on:changeValue="
                monthAllowancesPlan.monthAllowancesValue = $event
              "
              :title="$t('allowanceValue')"
              :imgName="'money.svg'"
            />

            <CustomInput
              :className="'col-md-6'"
              :id="`monthAllowancesPlansSlidesDetailsData[${index}][monthAllowancesMaximumNumberInMonth]`"
              :value="monthAllowancesPlan.monthAllowancesMaximumNumberInMonth"
              v-on:changeValue="
                monthAllowancesPlan.monthAllowancesMaximumNumberInMonth = $event
              "
              :title="$t('allowancesMaximumNumberInMonth')"
              :imgName="'date.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`monthAllowancesPlansSlidesDetailsData[${index}][monthAllowancesMaximumNumberInYear]`"
              :value="monthAllowancesPlan.monthAllowancesMaximumNumberInYear"
              v-on:changeValue="
                monthAllowancesPlan.monthAllowancesMaximumNumberInYear = $event
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
                  :className="'col-md-3'"
                  :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInDays]`"
                  :value="monthAllowancesPlan.beginningOfTheEntitlementInDays"
                  v-on:changeValue="
                    monthAllowancesPlan.beginningOfTheEntitlementInDays = $event
                  "
                  :title="$t('day')"
                  :imgName="'days.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInHours]`"
                  :value="monthAllowancesPlan.beginningOfTheEntitlementInHours"
                  v-on:changeValue="
                    monthAllowancesPlan.beginningOfTheEntitlementInHours =
                      $event
                  "
                  :title="$t('hour')"
                  :imgName="'hours.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInMinutes]`"
                  :value="
                    monthAllowancesPlan.beginningOfTheEntitlementInMinutes
                  "
                  v-on:changeValue="
                    monthAllowancesPlan.beginningOfTheEntitlementInMinutes =
                      $event
                  "
                  :title="$t('minute')"
                  :imgName="'minutes.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInSeconds]`"
                  :value="
                    monthAllowancesPlan.beginningOfTheEntitlementInSeconds
                  "
                  v-on:changeValue="
                    monthAllowancesPlan.beginningOfTheEntitlementInSeconds =
                      $event
                  "
                  :title="$t('second')"
                  :imgName="'seconds.svg'"
                />
              </div>
            </div>

            <TextArea
              :className="'col-md-12'"
              :id="`monthAllowancesPlansSlidesDetailsData[${index}][monthAllowancesPlansSlidesDetailsNote]`"
              :value="monthAllowancesPlan.monthAllowancesPlansSlidesDetailsNote"
              v-on:changeValue="
                monthAllowancesPlan.monthAllowancesPlansSlidesDetailsNote =
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
          @click.prevent="addOrUpdateMonthAllowancesPlan"
        >
          {{ submitName }}
        </button>
        <router-link :to="'/month-allowances-plans/'" class="btn btn-cancel">
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
import Allowance from "@/models/settings/settingsSalary/allowances/Allowance";
import MonthAllowancesPlansSlideDetails from "@/models/settings/settingsSalary/monthAllowancesPlans/MonthAllowancesPlansSlideDetails";

export default {
  name: "EmployeesSliceForm",
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
      allowanceData: new Allowance(),
      allowanceTokenOptions: [],
    };
  },
  props: ["monthAllowancesPlanData", "submitName"],
  methods: {
    addSlice() {
      this.monthAllowancesPlanData.monthAllowancesPlansSlidesDetailsData.push(
        new MonthAllowancesPlansSlideDetails()
      );
    },
    removeSlice(index) {
      this.monthAllowancesPlanData.monthAllowancesPlansSlidesDetailsData.splice(
        index,
        1
      );
    },
    async addOrUpdateMonthAllowancesPlan() {
      this.$emit("addOrUpdateMonthAllowancesPlan");
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
  async created() {
    if (this.submitName == this.$t("add")) {
      this.getDialogOfEmployeeAttendanceTypes();
      this.getDialogOfAllowances();
      this.getDialogOfDayTypes();
    }
  },
};
</script>

<style scoped lang="scss"></style>
