<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMonthAllowancesPlansSlidesDetails"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="monthAllowancesPlansSlideDetailsData.allowanceToken"
              :options="allowanceTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/allowances.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="`monthAllowancesPlansSlidesDetailsData[${index}][monthAllowancesValue]`"
            :value="monthAllowancesPlansSlideDetailsData.monthAllowancesValue"
            v-on:changeValue="
              monthAllowancesPlansSlideDetailsData.monthAllowancesValue = $event
            "
            :title="$t('allowanceValue')"
            :imgName="'money.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`monthAllowancesPlansSlidesDetailsData[${index}][monthAllowancesMaximumNumberInMonth]`"
            :value="
              monthAllowancesPlansSlideDetailsData.monthAllowancesMaximumNumberInMonth
            "
            v-on:changeValue="
              monthAllowancesPlansSlideDetailsData.monthAllowancesMaximumNumberInMonth =
                $event
            "
            :title="$t('allowancesMaximumNumberInMonth')"
            :imgName="'date.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`monthAllowancesPlansSlidesDetailsData[${index}][monthAllowancesMaximumNumberInYear]`"
            :value="
              monthAllowancesPlansSlideDetailsData.monthAllowancesMaximumNumberInYear
            "
            v-on:changeValue="
              monthAllowancesPlansSlideDetailsData.monthAllowancesMaximumNumberInYear =
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
                :className="'col-md-3'"
                :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInDays]`"
                :value="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInDays
                "
                v-on:changeValue="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInDays =
                    $event
                "
                :title="$t('day')"
                :imgName="'days.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInHours]`"
                :value="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInHours
                "
                v-on:changeValue="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInHours =
                    $event
                "
                :title="$t('hour')"
                :imgName="'hours.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInMinutes]`"
                :value="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInMinutes
                "
                v-on:changeValue="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInMinutes =
                    $event
                "
                :title="$t('minute')"
                :imgName="'minutes.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="`monthAllowancesPlansSlidesDetailsData[${index}][beginningOfTheEntitlementInSeconds]`"
                :value="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInSeconds
                "
                v-on:changeValue="
                  monthAllowancesPlansSlideDetailsData.beginningOfTheEntitlementInSeconds =
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
            :value="
              monthAllowancesPlansSlideDetailsData.monthAllowancesPlansSlidesDetailsNote
            "
            v-on:changeValue="
              monthAllowancesPlansSlideDetailsData.monthAllowancesPlansSlidesDetailsNote =
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
          :to="`/month-allowances-plan-details/${monthAllowancesPlansSlideDetailsData.monthAllowancesPlansToken}`"
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
import TextArea from "@/components/general/TextArea.vue";
import Allowance from "@/models/settings/settingsSalary/allowances/Allowance";

export default {
  name: "MonthAllowancesPlanDetailsForm",
  components: {
    PreLoader,
    ExceptionWithImg,
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
  props: ["monthAllowancesPlansSlideDetailsData", "submitName"],
  methods: {
    async addOrUpdateMonthAllowancesPlansSlidesDetails() {
      this.$emit("addOrUpdateMonthAllowancesPlansSlidesDetails");
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
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  watch: {},
  async created() {
    this.getDialogOfAllowances();
  },
};
</script>

<style lang="scss"></style>
