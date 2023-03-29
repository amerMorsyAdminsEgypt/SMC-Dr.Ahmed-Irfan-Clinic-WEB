<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'insurancesPlansNameAr'"
            :value="insurancesPlanData.insurancesPlansNameAr"
            :title="$t('nameAr')"
            :imgName="'insurances-plans.svg'"
            v-on:changeValue="insurancesPlanData.insurancesPlansNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'insurancesPlansNameEn'"
            :value="insurancesPlanData.insurancesPlansNameEn"
            :title="$t('nameEn')"
            :imgName="'insurances-plans.svg'"
            v-on:changeValue="insurancesPlanData.insurancesPlansNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'insurancesPlansNameUnd'"
            :value="insurancesPlanData.insurancesPlansNameUnd"
            :title="$t('nameUnd')"
            :imgName="'insurances-plans.svg'"
            v-on:changeValue="
              insurancesPlanData.insurancesPlansNameUnd = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'insurancesPlansCode'"
            :value="insurancesPlanData.insurancesPlansCode"
            :title="$t('insurancesPlansCode')"
            :imgName="'number.svg'"
            v-on:changeValue="insurancesPlanData.insurancesPlansCode = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'insurancesPlansNote'"
            :value="insurancesPlanData.insurancesPlansNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="insurancesPlanData.insurancesPlansNote = $event"
          />
          <CustomCheckbox
            :className="'col-md-12'"
            :value="insurancesPlanData.planActivationStatus"
            v-on:changeValue="insurancesPlanData.planActivationStatus = $event"
            :title="$t('activationStatus')"
          />
        </div>
      </div>

      <div v-if="submitName == $t('add')">
        <div
          class="my-card"
          v-for="(
            insurancesPlan, index
          ) in insurancesPlanData.insurancesPlansSlidesDetailsData"
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
                v-model="insurancesPlan.planTypeToken"
                :options="planTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/insurances.svg" />
            </div>

            <TextArea
              :className="'col-md-6'"
              :id="`insurancesPlansSlidesDetailsData[${index}][insurancesPlansSlidesDetailsNote]`"
              :value="insurancesPlan.insurancesPlansSlidesDetailsNote"
              v-on:changeValue="
                insurancesPlan.insurancesPlansSlidesDetailsNote = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />

            <div class="my-card col-md-12">
              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="`insurancesPlansSlidesDetailsData[${index}][employeeBasicSalaryFrom]`"
                  :value="insurancesPlan.employeeBasicSalaryFrom"
                  v-on:changeValue="
                    insurancesPlan.employeeBasicSalaryFrom = $event
                  "
                  :title="$t('employeeBasicSalaryFrom')"
                  :imgName="'money.svg'"
                />
                <CustomInput
                  :className="'col-md-6'"
                  :id="`insurancesPlansSlidesDetailsData[${index}][employeeBasicSalaryTo]`"
                  :value="insurancesPlan.employeeBasicSalaryTo"
                  v-on:changeValue="
                    insurancesPlan.employeeBasicSalaryTo = $event
                  "
                  :title="$t('employeeBasicSalaryTo')"
                  :imgName="'money.svg'"
                />

                <CustomInput
                  :className="'col-md-6'"
                  :id="`insurancesPlansSlidesDetailsData[${index}][employeeBasicSalaryPercentage]`"
                  :value="insurancesPlan.employeeBasicSalaryPercentage"
                  v-on:changeValue="
                    insurancesPlan.employeeBasicSalaryPercentage = $event
                  "
                  :title="$t('employeeBasicSalaryPercentage')"
                  :imgName="'percentage.svg'"
                />
                <CustomCheckbox
                  :className="'col-md-6'"
                  :value="insurancesPlan.employeeBasicSalaryDeductionStatus"
                  v-on:changeValue="
                    insurancesPlan.employeeBasicSalaryDeductionStatus = $event
                  "
                  :title="$t('employeeBasicSalaryDeductionStatus')"
                />
              </div>
            </div>

            <div class="my-card col-md-12">
              <div class="row">
                <CustomInput
                  :className="'col-md-6'"
                  :id="`insurancesPlansSlidesDetailsData[${index}][employeeVariableSalaryFrom]`"
                  :value="insurancesPlan.employeeVariableSalaryFrom"
                  v-on:changeValue="
                    insurancesPlan.employeeVariableSalaryFrom = $event
                  "
                  :title="$t('employeeVariableSalaryFrom')"
                  :imgName="'money.svg'"
                />
                <CustomInput
                  :className="'col-md-6'"
                  :id="`insurancesPlansSlidesDetailsData[${index}][employeeVariableSalaryTo]`"
                  :value="insurancesPlan.employeeVariableSalaryTo"
                  v-on:changeValue="
                    insurancesPlan.employeeVariableSalaryTo = $event
                  "
                  :title="$t('employeeVariableSalaryTo')"
                  :imgName="'money.svg'"
                />

                <CustomInput
                  :className="'col-md-6'"
                  :id="`insurancesPlansSlidesDetailsData[${index}][employeeVariableSalaryPercentage]`"
                  :value="insurancesPlan.employeeVariableSalaryPercentage"
                  v-on:changeValue="
                    insurancesPlan.employeeVariableSalaryPercentage = $event
                  "
                  :title="$t('employeeVariableSalaryPercentage')"
                  :imgName="'percentage.svg'"
                />
                <CustomCheckbox
                  :className="'col-md-6'"
                  :value="insurancesPlan.employeeVariableSalaryDeductionStatus"
                  v-on:changeValue="
                    insurancesPlan.employeeVariableSalaryDeductionStatus =
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
                      insurancesPlan.employeeBasicSalaryFrom
                        ? insurancesPlan.employeeBasicSalaryFrom
                        : 0
                    ) +
                    parseFloat(
                      insurancesPlan.employeeVariableSalaryFrom
                        ? insurancesPlan.employeeVariableSalaryFrom
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
                      insurancesPlan.employeeBasicSalaryTo
                        ? insurancesPlan.employeeBasicSalaryTo
                        : 0
                    ) +
                    parseFloat(
                      insurancesPlan.employeeVariableSalaryTo
                        ? insurancesPlan.employeeVariableSalaryTo
                        : 0
                    )
                  "
                  :title="$t('employeeTotalSalaryTo')"
                  :imgName="'money.svg'"
                />

                <CustomInput
                  :className="'col-md-6'"
                  :id="`insurancesPlansSlidesDetailsData[${index}][employeeTotalSalaryPercentage]`"
                  :value="insurancesPlan.employeeTotalSalaryPercentage"
                  v-on:changeValue="
                    insurancesPlan.employeeTotalSalaryPercentage = $event
                  "
                  :title="$t('employeeTotalSalaryPercentage')"
                  :imgName="'percentage.svg'"
                />
                <CustomCheckbox
                  :className="'col-md-6'"
                  :value="insurancesPlan.employeeTotalSalaryDeductionStatus"
                  v-on:changeValue="
                    insurancesPlan.employeeTotalSalaryDeductionStatus = $event
                  "
                  :title="$t('employeeTotalSalaryDeductionStatus')"
                />
              </div>
            </div>
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
          @click.prevent="addOrUpdateInsurancesPlan"
        >
          {{ submitName }}
        </button>
        <router-link :to="'/insurances-plans/'" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { setDataMultiLang } from "@/utils/functions";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import TextArea from "@/components/general/TextArea.vue";
import InsurancesPlansSlideDetails from "@/models/settings/settingsSalary/insurancesPlans/InsurancesPlansSlideDetails";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeesSliceForm",
  mixins: [createToastMixin],
  components: {
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
  props: ["insurancesPlanData", "submitName"],
  methods: {
    addSlice() {
      this.insurancesPlanData.insurancesPlansSlidesDetailsData.push(
        new InsurancesPlansSlideDetails()
      );
    },
    removeSlice(index) {
      this.insurancesPlanData.insurancesPlansSlidesDetailsData.splice(index, 1);
    },
    async addOrUpdateInsurancesPlan() {
      this.$emit("addOrUpdateInsurancesPlan");
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
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    if (this.submitName == this.$t("add")) this.getDialogOfPlanTypes();
  },
};
</script>

<style scoped lang="scss"></style>
