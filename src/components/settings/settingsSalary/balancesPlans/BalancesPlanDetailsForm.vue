<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateBalancesPlansSlidesDetails"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-12">
            <b-form-select
              v-model="balancesPlansSlideDetailsData.employeeSalaryEffectToken"
              :options="employeeSalaryEffectTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/money.svg" />
          </div>

          <div class="my-card col-md-12">
            <span class="my-card-title">{{ $t("maximumNumberInDay") }}</span>

            <div class="row">
              <CustomInput
                :className="'col-md-4'"
                :id="'maximumNumberInDayInHours'"
                :value="balancesPlansSlideDetailsData.maximumNumberInDayInHours"
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInDayInHours =
                    $event
                "
                :title="$t('hour')"
                :imgName="'hours.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="'maximumNumberInDayInMinutes'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInDayInMinutes
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInDayInMinutes =
                    $event
                "
                :title="$t('minute')"
                :imgName="'minutes.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="'maximumNumberInDayInSeconds'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInDayInSeconds
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInDayInSeconds =
                    $event
                "
                :title="$t('second')"
                :imgName="'seconds.svg'"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <span class="my-card-title">{{ $t("maximumNumberInMonth") }}</span>

            <div class="row">
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInMonthInDays'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInDays
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInDays =
                    $event
                "
                :title="$t('day')"
                :imgName="'days.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInMonthInHours'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInHours
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInHours =
                    $event
                "
                :title="$t('hour')"
                :imgName="'hours.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInMonthInMinutes'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInMinutes
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInMinutes =
                    $event
                "
                :title="$t('minute')"
                :imgName="'minutes.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInMonthInSeconds'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInSeconds
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInMonthInSeconds =
                    $event
                "
                :title="$t('second')"
                :imgName="'seconds.svg'"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <span class="my-card-title">{{ $t("maximumNumberInYear") }}</span>

            <div class="row">
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInYearInDays'"
                :value="balancesPlansSlideDetailsData.maximumNumberInYearInDays"
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInYearInDays =
                    $event
                "
                :title="$t('day')"
                :imgName="'days.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInYearInHours'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInYearInHours
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInYearInHours =
                    $event
                "
                :title="$t('hour')"
                :imgName="'hours.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInYearInMinutes'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInYearInMinutes
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInYearInMinutes =
                    $event
                "
                :title="$t('minute')"
                :imgName="'minutes.svg'"
              />
              <CustomInput
                :className="'col-md-3'"
                :id="'maximumNumberInYearInSeconds'"
                :value="
                  balancesPlansSlideDetailsData.maximumNumberInYearInSeconds
                "
                v-on:changeValue="
                  balancesPlansSlideDetailsData.maximumNumberInYearInSeconds =
                    $event
                "
                :title="$t('second')"
                :imgName="'seconds.svg'"
              />
            </div>
          </div>

          <TextArea
            :className="'col-md-12'"
            :id="'balancesPlansSlidesDetailsNote'"
            :value="
              balancesPlansSlideDetailsData.balancesPlansSlidesDetailsNote
            "
            v-on:changeValue="
              balancesPlansSlideDetailsData.balancesPlansSlidesDetailsNote =
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
          :to="`/balances-plan-details/${balancesPlansSlideDetailsData.balancesPlansToken}`"
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
import SalaryEffect from "@/models/settings/settingsSalary/salaryEffects/SalaryEffect";

export default {
  name: "BalancesPlanDetailsForm",
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
      employeeSalaryEffectData: new SalaryEffect(),
      employeeSalaryEffectTokenOptions: [],
    };
  },
  props: ["balancesPlansSlideDetailsData", "submitName"],
  methods: {
    async addOrUpdateBalancesPlansSlidesDetails() {
      this.$emit("addOrUpdateBalancesPlansSlidesDetails");
    },
    async getDialogOfSalaryEffects() {
      this.isLoading = true;
      this.employeeSalaryEffectTokenOptions = [];
      this.employeeSalaryEffectTokenOptions.push({
        value: "",
        text: this.$t("selectSalaryEffect"),
      });
      try {
        let response =
          await this.employeeSalaryEffectData.getDialogOfEmployeeSalaryEffect(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeSalaryEffectTokenOptions.push({
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
    this.getDialogOfSalaryEffects();
  },
};
</script>

<style lang="scss"></style>
