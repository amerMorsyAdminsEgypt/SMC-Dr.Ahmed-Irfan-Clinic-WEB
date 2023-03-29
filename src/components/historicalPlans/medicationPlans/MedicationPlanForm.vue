<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="medicationPlanData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="medicationPlanData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeNameInPrescription')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="medicationPlanData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="medicationPlanData.reservationToken = $event"
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`notes`"
            :value="medicationPlanData.notes"
            v-on:changeValue="medicationPlanData.notes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div
        class="my-card"
        v-for="(
          medicationPlan, index
        ) in medicationPlanData.medicationPlanDetalisData"
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
          <CustomSelectBox
            :className="'col-md-12'"
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
            :id="`medicationPlanDetalisData[${index}][countInDay]`"
            :value="medicationPlan.countInDay"
            v-on:changeValue="medicationPlan.countInDay = $event"
            :title="$t('countInDay')"
            :imgName="'number.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`medicationPlanDetalisData[${index}][medicationTime]`"
            :value="medicationPlan.medicationTime"
            v-on:changeValue="medicationPlan.medicationTime = $event"
            :title="$t('medicationTime')"
            :imgName="'time.svg'"
          />

          <CustomInput
            :className="'col-md-12'"
            :id="`medicationPlanDetalisData[${index}][medicationQuantity]`"
            :value="medicationPlan.medicationQuantity"
            v-on:changeValue="medicationPlan.medicationQuantity = $event"
            :title="$t('medicationQuantity')"
            :imgName="'medication-quantity.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`medicationPlanDetalisData[${index}][treatmentPlanNote]`"
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
          @click.prevent="addOrUpdateMedicationPlan"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'MedicationPlans',
            params: {
              clientToken: medicationPlanData.clientToken,
              reservationToken: medicationPlanData.reservationToken,
            },
          }"
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
import MedicationPlanDetalisData from "@/models/historicalPlans/medicationPlans/MedicationPlanDetalisData";
import MedicinesType from "@/models/settings/settingsOther/medicinesTypes/MedicinesType";
import Medicine from "@/models/settings/settingsOther/medicines/Medicine";
import createToastMixin from "@/utils/create-toast-mixin";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";

export default {
  name: "MedicationPlanForm",
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
      medicationPlanDetalisData: new MedicationPlanDetalisData(),
      medicinesTypeTokenOptions: [],
      medicineData: new Medicine(),
      medicineTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
    };
  },
  props: ["medicationPlanData", "submitName"],
  methods: {
    addSlice() {
      this.medicationPlanData.medicationPlanDetalisData.push(
        new MedicationPlanDetalisData()
      );
    },
    removeSlice(index) {
      this.medicationPlanData.medicationPlanDetalisData.splice(index, 1);
    },
    async addOrUpdateMedicationPlan() {
      this.$emit("addOrUpdateMedicationPlan");
    },
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken = this.medicationPlanData.clientToken;
      try {
        let response =
          await this.reservationData.getDialogOfServicesReservations(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.reservationTokenOptions.push({
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
    async getDialogOfMedicines() {
      this.isLoading = true;
      this.medicineTokenOptions = [];
      this.medicineTokenOptions.push({
        value: "",
        text: this.$t("selectMedicine"),
      });
      try {
        let response = await this.medicineData.getDialogOfMedicines(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.medicineTokenOptions.push({
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
    // this.getDialogOfMedicinesTypes();
    this.getDialogOfServicesReservations();
    this.getDialogOfMedicinesWithImg();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
