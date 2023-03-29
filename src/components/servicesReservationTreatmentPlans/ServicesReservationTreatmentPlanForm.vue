<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="treatmentPlanData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="treatmentPlanData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeNameInPrescription')"
            :imgName="'doctors.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'treatmentPlanNotes'"
            :value="treatmentPlanData.treatmentPlanNotes"
            v-on:changeValue="treatmentPlanData.treatmentPlanNotes = $event"
            :maxRows="maxRows"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'disease'"
            :value="treatmentPlanData.disease"
            v-on:changeValue="treatmentPlanData.disease = $event"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('disease')"
            :imgName="'disease.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'diagnosis'"
            :value="treatmentPlanData.diagnosis"
            v-on:changeValue="treatmentPlanData.diagnosis = $event"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
            :title="$t('diagnosis')"
            :imgName="'diagnosis.svg'"
          />
        </div>
      </div>

      <div
        class="my-card"
        v-for="(
          medicationPlan, index
        ) in treatmentPlanData.servicesReservationMedicationPlanData"
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
          <!-- <div class="form-label-group col-md-6">
            <b-form-select
              v-model="medicationPlan.medicinesTypeToken"
              :options="medicinesTypeTokenOptions"
              @change="changeMedicinesType()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/medicines-types.svg" />
          </div> -->
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'medicineToken'"
            :value="medicationPlan.medicineToken"
            :options="medicineTokenOptions"
            v-on:changeValue="medicationPlan.medicineToken = $event"
            :title="$t('selectMedicine')"
            :imgName="'medicines.svg'"
            :imgStatus="true"
          />
          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="'medicineToken'"
            :value="medicationPlan.medicineToken"
            :options="medicineTokenOptions"
            v-on:changeValue="medicationPlan.medicineToken = $event"
            :title="$t('selectMedicine')"
            :imgName="'medicines.svg'"
          /> -->

          <CustomInputFloat
            :className="'col-md-6'"
            :id="`servicesReservationMedicationPlanData[${index}][countInDay]`"
            :value="medicationPlan.countInDay"
            v-on:changeValue="medicationPlan.countInDay = $event"
            :title="$t('countInDay')"
            :imgName="'number.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`servicesReservationMedicationPlanData[${index}][medicationTime]`"
            :value="medicationPlan.medicationTime"
            v-on:changeValue="medicationPlan.medicationTime = $event"
            :title="$t('medicationTime')"
            :imgName="'time.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`servicesReservationMedicationPlanData[${index}][medicationQuantity]`"
            :value="medicationPlan.medicationQuantity"
            v-on:changeValue="medicationPlan.medicationQuantity = $event"
            :title="$t('medicationQuantity')"
            :imgName="'medication-quantity.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`servicesReservationMedicationPlanData[${index}][treatmentPlanNote]`"
            :value="medicationPlan.treatmentPlanNote"
            v-on:changeValue="medicationPlan.treatmentPlanNote = $event"
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

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateServicesReservationTreatmentPlan"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="`/treatments-reservation/${treatmentPlanData.clientToken}/${treatmentPlanData.reservationToken}`"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {
  STATUS,
  TEXT_MAX_LENGTH_SUPER,
  MAX_ROWS_TEXTAREA,
} from "@/utils/constants";
import { EMPLOYEE_TYPE } from "@/utils/constantLists";
import { setDataMultiLang } from "@/utils/functions";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import ServicesReservationMedicationPlan from "@/models/servicesReservationTreatmentPlans/ServicesReservationMedicationPlan";
import MedicinesType from "@/models/settings/settingsOther/medicinesTypes/MedicinesType";
import Medicine from "@/models/settings/settingsOther/medicines/Medicine";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationTreatmentPlanForm",
  mixins: [createToastMixin],
  components: {
    CustomInputFloat,
    CustomInput,
    CustomSelectBox,
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
      employeeTypeToken:
        this.$store.getters.userData.employeePersonalData.employeeTypeToken ||
        null,
      textAreaMaxLenght: TEXT_MAX_LENGTH_SUPER,
      maxRows: MAX_ROWS_TEXTAREA,
      employeeType: EMPLOYEE_TYPE,
      employeeTokenOptions: [],
      medicinesTypeData: new MedicinesType(),
      medicinesTypeTokenOptions: [],
      medicineData: new Medicine(),
      medicineTokenOptions: [],
    };
  },
  props: ["treatmentPlanData", "submitName"],
  methods: {
    addSlice() {
      this.treatmentPlanData.servicesReservationMedicationPlanData.push(
        new ServicesReservationMedicationPlan()
      );
    },
    removeSlice(index) {
      this.treatmentPlanData.servicesReservationMedicationPlanData.splice(
        index,
        1
      );
    },
    async addOrUpdateServicesReservationTreatmentPlan() {
      this.$emit("addOrUpdateServicesReservationTreatmentPlan");
    },
    async getDialogOfDoctors() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployeeNameInPrescription"),
      });
      try {
        const response = await axios.get(
          `/Employees/GetDialogOfEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&employeeTypeToken=${EMPLOYEE_TYPE.Doctor}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: this.setDataMultiLang(
                this.language,
                itemsData[item]["itemNameAr"],
                itemsData[item]["itemNameEn"]
              ),
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async getDialogOfMedicinesTypes() {
      this.isLoading = true;
      this.medicinesTypeTokenOptions = [];
      this.medicinesTypeTokenOptions.push({
        value: "",
        text: this.$t("selectMedicinesType"),
      });
      try {
        let response = await this.medicinesTypeData.getDialogOfMedicinesTypes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.medicinesTypeTokenOptions.push({
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
    async getDialogOfMedicinesWithImg() {
      this.isLoading = true;
      try {
        this.medicineTokenOptions =
          await this.medicineData.getDialogOfMedicinesWithImg(
            this.language,
            this.userAuthorizeToken
          );
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    // async getDialogOfMedicines() {
    //   this.isLoading = true;
    //   this.medicineTokenOptions = [];
    //   this.medicineTokenOptions.push({
    //     value: "",
    //     text: this.$t("selectMedicine"),
    //   });
    //   try {
    //     let response = await this.medicineData.getDialogOfMedicines(
    //       this.language,
    //       this.userAuthorizeToken
    //     );
    //     const itemsData = response.data.itemsData;
    //     if (response.data.status == STATUS.SUCCESS) {
    //       for (let item in itemsData) {
    //         this.medicineTokenOptions.push({
    //           value: itemsData[item]["itemToken"],
    //           text: itemsData[item]["itemName"],
    //         });
    //       }
    //     } else if (response.data.status == STATUS.INVALID_TOKEN) {
    //       this.$store.dispatch("updateUserData", null);
    //       this.$router.push("/").catch(() => {});
    //     }
    //     this.isLoading = false;
    //   } catch (error) {
    //     this.showMsg(this.$t("errorCatch"));
    //   }
    //   this.isLoading = false;
    // },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    // this.getDialogOfMedicinesTypes();
    this.getDialogOfMedicinesWithImg();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
