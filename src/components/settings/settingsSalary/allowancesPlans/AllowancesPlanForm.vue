<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'allowancesPlansNameAr'"
            :value="allowancesPlanData.allowancesPlansNameAr"
            v-on:changeValue="allowancesPlanData.allowancesPlansNameAr = $event"
            :title="$t('nameAr')"
            :imgName="'allowances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'allowancesPlansNameEn'"
            :value="allowancesPlanData.allowancesPlansNameEn"
            v-on:changeValue="allowancesPlanData.allowancesPlansNameEn = $event"
            :title="$t('nameEn')"
            :imgName="'allowances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'allowancesPlansNameUnd'"
            :value="allowancesPlanData.allowancesPlansNameUnd"
            v-on:changeValue="
              allowancesPlanData.allowancesPlansNameUnd = $event
            "
            :title="$t('nameUnd')"
            :imgName="'allowances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'allowancesPlansCode'"
            :value="allowancesPlanData.allowancesPlansCode"
            v-on:changeValue="allowancesPlanData.allowancesPlansCode = $event"
            :title="$t('allowancesPlansCode')"
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'allowancesPlansNote'"
            :value="allowancesPlanData.allowancesPlansNote"
            v-on:changeValue="allowancesPlanData.allowancesPlansNote = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div v-if="submitName == $t('add')">
        <div
          class="my-card"
          v-for="(
            allowancesPlan, index
          ) in allowancesPlanData.allowancesPlansSlidesDetailsData"
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
                v-model="allowancesPlan.allowanceToken"
                :options="allowanceTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/allowances.svg" />
            </div>
            <CustomInput
              :className="'col-md-6'"
              :id="`allowancesPlansSlidesDetailsData[${index}][allowancesValue]`"
              :value="allowancesPlan.allowancesValue"
              v-on:changeValue="allowancesPlan.allowancesValue = $event"
              :title="$t('allowanceValue')"
              :imgName="'money.svg'"
            />

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="allowancesPlan.attendanceTypeToken"
                :options="attendanceTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/type.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="allowancesPlan.timeMethodCalcolateToken"
                :options="timeMethodCalcolateTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/type.svg" />
            </div>

            <TimePicker
              :className="'col-md-6'"
              :value="allowancesPlan.workShiftTimeFrom"
              :title="$t('workShiftTimeFrom')"
              :language="language"
              v-on:changeValue="allowancesPlan.workShiftTimeFrom = $event"
            />
            <TimePicker
              :className="'col-md-6'"
              :value="allowancesPlan.workShiftTimeTo"
              :title="$t('workShiftTimeTo')"
              :language="language"
              v-on:changeValue="allowancesPlan.workShiftTimeTo = $event"
            />

            <DatePicker
              :className="'col-md-6'"
              :id="`allowancesPlansSlidesDetailsData[${index}][dateStart]`"
              :value="allowancesPlan.dateStart"
              v-on:changeValue="allowancesPlan.dateStart = $event"
              :title="$t('activationStartDate')"
              :language="language"
            />
            <DatePicker
              :className="'col-md-6'"
              :id="`allowancesPlansSlidesDetailsData[${index}][dateEnd]`"
              :value="allowancesPlan.dateEnd"
              v-on:changeValue="allowancesPlan.dateEnd = $event"
              :title="$t('activationEndDate')"
              :language="language"
            />

            <CustomInput
              :className="'col-md-4'"
              :id="`allowancesPlansSlidesDetailsData[${index}][allowancesMaximumNumberInDay]`"
              :value="allowancesPlan.allowancesMaximumNumberInDay"
              v-on:changeValue="
                allowancesPlan.allowancesMaximumNumberInDay = $event
              "
              :title="$t('allowancesMaximumNumberInDay')"
              :imgName="'days.svg'"
            />
            <CustomInput
              :className="'col-md-4'"
              :id="`allowancesPlansSlidesDetailsData[${index}][allowancesMaximumNumberInMonth]`"
              :value="allowancesPlan.allowancesMaximumNumberInMonth"
              v-on:changeValue="
                allowancesPlan.allowancesMaximumNumberInMonth = $event
              "
              :title="$t('allowancesMaximumNumberInMonth')"
              :imgName="'date.svg'"
            />
            <CustomInput
              :className="'col-md-4'"
              :id="`allowancesPlansSlidesDetailsData[${index}][allowancesMaximumNumberInYear]`"
              :value="allowancesPlan.allowancesMaximumNumberInYear"
              v-on:changeValue="
                allowancesPlan.allowancesMaximumNumberInYear = $event
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
                  :value="allowancesPlan.beginningOfTheEntitlementInHours"
                  v-on:changeValue="
                    allowancesPlan.beginningOfTheEntitlementInHours = $event
                  "
                  :title="$t('hour')"
                  :imgName="'hours.svg'"
                />
                <CustomInput
                  :className="'col-md-4'"
                  :id="`allowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInMinutes]`"
                  :value="allowancesPlan.beginningOfTheEntitlementInMinutes"
                  v-on:changeValue="
                    allowancesPlan.beginningOfTheEntitlementInMinutes = $event
                  "
                  :title="$t('minute')"
                  :imgName="'minutes.svg'"
                />
                <CustomInput
                  :className="'col-md-4'"
                  :id="`allowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInSeconds]`"
                  :value="allowancesPlan.beginningOfTheEntitlementInSeconds"
                  v-on:changeValue="
                    allowancesPlan.beginningOfTheEntitlementInSeconds = $event
                  "
                  :title="$t('second')"
                  :imgName="'seconds.svg'"
                />
              </div>
            </div>

            <TextArea
              :className="'col-md-12'"
              :id="`allowancesPlansSlidesDetailsData[${index}][allowancesPlansSlidesDetailsNote]`"
              :value="allowancesPlan.allowancesPlansSlidesDetailsNote"
              v-on:changeValue="
                allowancesPlan.allowancesPlansSlidesDetailsNote = $event
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
          @click.prevent="addOrUpdateAllowancesPlan"
        >
          {{ submitName }}
        </button>
        <router-link :to="'/allowances-plans/'" class="btn btn-cancel">
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
import TimePicker from "@/components/general/TimePicker.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import Allowance from "@/models/settings/settingsSalary/allowances/Allowance";
import AllowancesPlansSlideDetails from "@/models/settings/settingsSalary/allowancesPlans/AllowancesPlansSlideDetails";

export default {
  name: "EmployeesSliceForm",
  components: {
    CustomInput,
    TextArea,
    TimePicker,
    DatePicker,
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
      // dayTypeTokenOptions: [],
      timeMethodCalcolateTokenOptions: [],
    };
  },
  props: ["allowancesPlanData", "submitName"],
  methods: {
    addSlice() {
      this.allowancesPlanData.allowancesPlansSlidesDetailsData.push(
        new AllowancesPlansSlideDetails()
      );
    },
    removeSlice(index) {
      this.allowancesPlanData.allowancesPlansSlidesDetailsData.splice(index, 1);
    },
    async addOrUpdateAllowancesPlan() {
      this.$emit("addOrUpdateAllowancesPlan");
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
    async getDialogOfTimeMethodsCalculate() {
      this.isLoading = true;
      this.timeMethodCalcolateTokenOptions = [];
      this.timeMethodCalcolateTokenOptions.push({
        value: "",
        text: this.$t("selectTimeMethodCalcolate"),
      });
      let items =
        this.$store.getters.userData.constantLists.listTimeMethodCalcolateType;
      for (let item in items) {
        this.timeMethodCalcolateTokenOptions.push({
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
      this.getDialogOfTimeMethodsCalculate();
    }
  },
};
</script>

<style scoped lang="scss"></style>
