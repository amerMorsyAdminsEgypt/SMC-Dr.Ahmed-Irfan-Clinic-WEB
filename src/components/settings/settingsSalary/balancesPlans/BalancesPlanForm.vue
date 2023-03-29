<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'balancesPlansNameAr'"
            :value="balancesPlanData.balancesPlansNameAr"
            v-on:changeValue="balancesPlanData.balancesPlansNameAr = $event"
            :title="$t('nameAr')"
            :imgName="'balances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'balancesPlansNameEn'"
            :value="balancesPlanData.balancesPlansNameEn"
            v-on:changeValue="balancesPlanData.balancesPlansNameEn = $event"
            :title="$t('nameEn')"
            :imgName="'balances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'balancesPlansNameUnd'"
            :value="balancesPlanData.balancesPlansNameUnd"
            v-on:changeValue="balancesPlanData.balancesPlansNameUnd = $event"
            :title="$t('nameUnd')"
            :imgName="'balances-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'balancesPlansCode'"
            :value="balancesPlanData.balancesPlansCode"
            v-on:changeValue="balancesPlanData.balancesPlansCode = $event"
            :title="$t('balancesPlansCode')"
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'balancesPlansNote'"
            :value="balancesPlanData.balancesPlansNote"
            v-on:changeValue="balancesPlanData.balancesPlansNote = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div v-if="submitName == $t('add')">
        <div
          class="my-card"
          v-for="(
            balancesPlan, index
          ) in balancesPlanData.balancesPlansSlidesDetailsData"
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
            <div class="form-label-group col-md-12">
              <b-form-select
                v-model="balancesPlan.employeeSalaryEffectToken"
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
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInDayInHours]`"
                  :value="balancesPlan.maximumNumberInDayInHours"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInDayInHours = $event
                  "
                  :title="$t('hour')"
                  :imgName="'hours.svg'"
                />
                <CustomInput
                  :className="'col-md-4'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInDayInMinutes]`"
                  :value="balancesPlan.maximumNumberInDayInMinutes"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInDayInMinutes = $event
                  "
                  :title="$t('minute')"
                  :imgName="'minutes.svg'"
                />
                <CustomInput
                  :className="'col-md-4'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInDayInSeconds]`"
                  :value="balancesPlan.maximumNumberInDayInSeconds"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInDayInSeconds = $event
                  "
                  :title="$t('second')"
                  :imgName="'seconds.svg'"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <span class="my-card-title">{{
                $t("maximumNumberInMonth")
              }}</span>

              <div class="row">
                <CustomInput
                  :className="'col-md-3'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInMonthInDays]`"
                  :value="balancesPlan.maximumNumberInMonthInDays"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInMonthInDays = $event
                  "
                  :title="$t('day')"
                  :imgName="'days.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInMonthInHours]`"
                  :value="balancesPlan.maximumNumberInMonthInHours"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInMonthInHours = $event
                  "
                  :title="$t('hour')"
                  :imgName="'hours.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInMonthInMinutes]`"
                  :value="balancesPlan.maximumNumberInMonthInMinutes"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInMonthInMinutes = $event
                  "
                  :title="$t('minute')"
                  :imgName="'minutes.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInMonthInSeconds]`"
                  :value="balancesPlan.maximumNumberInMonthInSeconds"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInMonthInSeconds = $event
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
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInYearInDays]`"
                  :value="balancesPlan.maximumNumberInYearInDays"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInYearInDays = $event
                  "
                  :title="$t('day')"
                  :imgName="'days.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInYearInHours]`"
                  :value="balancesPlan.maximumNumberInYearInHours"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInYearInHours = $event
                  "
                  :title="$t('hour')"
                  :imgName="'hours.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInYearInMinutes]`"
                  :value="balancesPlan.maximumNumberInYearInMinutes"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInYearInMinutes = $event
                  "
                  :title="$t('minute')"
                  :imgName="'minutes.svg'"
                />
                <CustomInput
                  :className="'col-md-3'"
                  :id="`balancesPlansSlidesDetailsData[${index}][maximumNumberInYearInSeconds]`"
                  :value="balancesPlan.maximumNumberInYearInSeconds"
                  v-on:changeValue="
                    balancesPlan.maximumNumberInYearInSeconds = $event
                  "
                  :title="$t('second')"
                  :imgName="'seconds.svg'"
                />
              </div>
            </div>

            <TextArea
              :className="'col-md-12'"
              :id="`balancesPlansSlidesDetailsData[${index}][balancesPlansSlidesDetailsNote]`"
              :value="balancesPlan.balancesPlansSlidesDetailsNote"
              v-on:changeValue="
                balancesPlan.balancesPlansSlidesDetailsNote = $event
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
          @click.prevent="addOrUpdateBalancesPlan"
        >
          {{ submitName }}
        </button>
        <router-link :to="'/balances-plans/'" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { STATUS } from "@/utils/constants";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import SalaryEffect from "@/models/settings/settingsSalary/salaryEffects/SalaryEffect";
import BalancesPlansSlideDetails from "@/models/settings/settingsSalary/balancesPlans/BalancesPlansSlideDetails";

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
      employeeSalaryEffectData: new SalaryEffect(),
      employeeSalaryEffectTokenOptions: [],
    };
  },
  props: ["balancesPlanData", "submitName"],
  methods: {
    addSlice() {
      this.balancesPlanData.balancesPlansSlidesDetailsData.push(
        new BalancesPlansSlideDetails()
      );
    },
    removeSlice(index) {
      this.balancesPlanData.balancesPlansSlidesDetailsData.splice(index, 1);
    },
    async addOrUpdateBalancesPlan() {
      this.$emit("addOrUpdateBalancesPlan");
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
  },
  async created() {
    if (this.submitName == this.$t("add")) {
      this.getDialogOfSalaryEffects();
    }
  },
};
</script>

<style scoped lang="scss"></style>
