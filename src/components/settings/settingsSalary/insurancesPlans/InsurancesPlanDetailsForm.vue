<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateInsurancesPlansSlidesDetails"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="insurancesPlansSlideDetailsData.planTypeToken"
              :options="planTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/insurances.svg" />
          </div>

          <TextArea
            :className="'col-md-6'"
            :id="'insurancesPlansSlidesDetailsNote'"
            :value="
              insurancesPlansSlideDetailsData.insurancesPlansSlidesDetailsNote
            "
            v-on:changeValue="
              insurancesPlansSlideDetailsData.insurancesPlansSlidesDetailsNote =
                $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-6'"
                :id="'employeeBasicSalaryFrom'"
                :value="insurancesPlansSlideDetailsData.employeeBasicSalaryFrom"
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeBasicSalaryFrom =
                    $event
                "
                :title="$t('employeeBasicSalaryFrom')"
                :imgName="'money.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="'employeeBasicSalaryTo'"
                :value="insurancesPlansSlideDetailsData.employeeBasicSalaryTo"
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeBasicSalaryTo = $event
                "
                :title="$t('employeeBasicSalaryTo')"
                :imgName="'money.svg'"
              />

              <CustomInput
                :className="'col-md-6'"
                :id="'employeeBasicSalaryPercentage'"
                :value="
                  insurancesPlansSlideDetailsData.employeeBasicSalaryPercentage
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeBasicSalaryPercentage =
                    $event
                "
                :title="$t('employeeBasicSalaryPercentage')"
                :imgName="'percentage.svg'"
              />
              <CustomCheckbox
                :className="'col-md-6'"
                :value="
                  insurancesPlansSlideDetailsData.employeeBasicSalaryDeductionStatus
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeBasicSalaryDeductionStatus =
                    $event
                "
                :title="$t('employeeBasicSalaryDeductionStatus')"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-6'"
                :id="'employeeVariableSalaryFrom'"
                :value="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryFrom
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryFrom =
                    $event
                "
                :title="$t('employeeVariableSalaryFrom')"
                :imgName="'money.svg'"
              />
              <CustomInput
                :className="'col-md-6'"
                :id="'employeeVariableSalaryTo'"
                :value="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryTo
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryTo =
                    $event
                "
                :title="$t('employeeVariableSalaryTo')"
                :imgName="'money.svg'"
              />

              <CustomInput
                :className="'col-md-6'"
                :id="'employeeVariableSalaryPercentage'"
                :value="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryPercentage
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryPercentage =
                    $event
                "
                :title="$t('employeeVariableSalaryPercentage')"
                :imgName="'percentage.svg'"
              />
              <CustomCheckbox
                :className="'col-md-6'"
                :value="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryDeductionStatus
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeVariableSalaryDeductionStatus =
                    $event
                "
                :title="$t('employeeVariableSalaryDeductionStatus')"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <div class="row">
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  parseFloat(
                    insurancesPlansSlideDetailsData.employeeBasicSalaryFrom
                      ? insurancesPlansSlideDetailsData.employeeBasicSalaryFrom
                      : 0
                  ) +
                  parseFloat(
                    insurancesPlansSlideDetailsData.employeeVariableSalaryFrom
                      ? insurancesPlansSlideDetailsData.employeeVariableSalaryFrom
                      : 0
                  )
                "
                :title="$t('employeeTotalSalaryFrom')"
                :imgName="'money.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  parseFloat(
                    insurancesPlansSlideDetailsData.employeeBasicSalaryTo
                      ? insurancesPlansSlideDetailsData.employeeBasicSalaryTo
                      : 0
                  ) +
                  parseFloat(
                    insurancesPlansSlideDetailsData.employeeVariableSalaryTo
                      ? insurancesPlansSlideDetailsData.employeeVariableSalaryTo
                      : 0
                  )
                "
                :title="$t('employeeTotalSalaryTo')"
                :imgName="'money.svg'"
              />

              <CustomInput
                :className="'col-md-6'"
                :id="'employeeTotalSalaryPercentage'"
                :value="
                  insurancesPlansSlideDetailsData.employeeTotalSalaryPercentage
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeTotalSalaryPercentage =
                    $event
                "
                :title="$t('employeeTotalSalaryPercentage')"
                :imgName="'percentage.svg'"
              />
              <CustomCheckbox
                :className="'col-md-6'"
                :value="
                  insurancesPlansSlideDetailsData.employeeTotalSalaryDeductionStatus
                "
                v-on:changeValue="
                  insurancesPlansSlideDetailsData.employeeTotalSalaryDeductionStatus =
                    $event
                "
                :title="$t('employeeTotalSalaryDeductionStatus')"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          :to="`/insurances-plan-details/${insurancesPlansSlideDetailsData.insurancesPlansToken}`"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "InsurancesPlanDetailsForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomCheckbox,
    DataLabelGroup,
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
      planTypeTokenOptions: [],
    };
  },
  props: ["insurancesPlansSlideDetailsData", "submitName"],
  methods: {
    async addOrUpdateInsurancesPlansSlidesDetails() {
      this.$emit("addOrUpdateInsurancesPlansSlidesDetails");
    },
    async getDialogOfPlanTypes() {
      this.isLoading = true;
      this.planTypeTokenOptions = [];
      this.planTypeTokenOptions.push({
        value: "",
        text: this.$t("selectPlanType"),
      });
      let items = this.$store.getters.userData.constantLists.listPlanType;
      for (let item in items) {
        this.planTypeTokenOptions.push({
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
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfPlanTypes();
  },
};
</script>

<style lang="scss"></style>
