<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'surgeryHistoryClientToken'"
            :value="operationData.surgeryHistoryClientToken"
            :options="clientTokenOptions"
            v-on:changeValue="changeReservations($event)"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="operationData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="operationData.reservationToken = $event"
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-6'"
            :id="'employeeToken'"
            :value="operationData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="operationData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeNameInPrescription')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'surgeryToken'"
            :value="operationData.surgeryToken"
            :options="surgeryTokenOptions"
            v-on:changeValue="operationData.surgeryToken = $event"
            :title="$t('surgeries.select')"
            :imgName="'medical-operations.svg'"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'surgeryHistoryDate'"
            :value="operationData.surgeryHistoryDate"
            v-on:changeValue="operationData.surgeryHistoryDate = $event"
            :title="$t('historicalPlans.operations.operation.date')"
            :language="language"
          />
          <TimePicker
            :className="'col-md-6'"
            :id="'surgeryHistoryTime'"
            :value="operationData.surgeryHistoryTime"
            v-on:changeValue="operationData.surgeryHistoryTime = $event"
            :title="$t('historicalPlans.operations.operation.time')"
            :language="language"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'surgeryHistoryDescriptionAr'"
            :value="operationData.surgeryHistoryDescriptionAr"
            :title="$t('historicalPlans.operations.operation.descriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              operationData.surgeryHistoryDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'surgeryHistoryDescriptionEn'"
            :value="operationData.surgeryHistoryDescriptionEn"
            :title="$t('historicalPlans.operations.operation.descriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              operationData.surgeryHistoryDescriptionEn = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'surgeryHistoryDescriptionUnd'"
            :value="operationData.surgeryHistoryDescriptionUnd"
            :title="$t('historicalPlans.operations.operation.descriptionUnd')"
            v-on:changeValue="
              operationData.surgeryHistoryDescriptionUnd = $event
            "
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'surgeryHistoryReasonAr'"
            :value="operationData.surgeryHistoryReasonAr"
            :title="$t('historicalPlans.operations.operation.reasonAr')"
            :imgName="'reason.svg'"
            v-on:changeValue="operationData.surgeryHistoryReasonAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'surgeryHistoryReasonEn'"
            :value="operationData.surgeryHistoryReasonEn"
            :title="$t('historicalPlans.operations.operation.reasonEn')"
            :imgName="'reason.svg'"
            v-on:changeValue="operationData.surgeryHistoryReasonEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'surgeryHistoryReasonUnd'"
            :value="operationData.surgeryHistoryReasonUnd"
            :title="$t('historicalPlans.operations.operation.reasonUnd')"
            :imgName="'reason.svg'"
            v-on:changeValue="operationData.surgeryHistoryReasonUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="`surgeryHistoryNotes`"
            :value="operationData.surgeryHistoryNotes"
            v-on:changeValue="operationData.surgeryHistoryNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div
        class="my-card"
        v-for="(
          operation, index
        ) in operationData.surgriesHistoryDetilsBodyAnatomyData"
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
          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="`surgriesHistoryDetilsBodyAnatomyData[${index}][bodyAnatomyTypeToken]`"
            :value="operation.bodyAnatomyTypeToken"
            :options="bodyAnatomyTypeTokenOptions"
            v-on:changeValue="
              changeBodyAnatomy($event),
                (operation.bodyAnatomyTypeToken = $event)
            "
            :title="$t('bodyAnatomyTypes.select')"
            :imgName="'anatomy-types.svg'"
          /> -->
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`surgriesHistoryDetilsBodyAnatomyData[${index}][bodyAnatomyToken]`"
            :value="operation.bodyAnatomyToken"
            :options="bodyAnatomyTokenOptions"
            v-on:changeValue="operation.bodyAnatomyToken = $event"
            :title="$t('bodyAnatomies.select')"
            :imgName="'anatomy.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="`surgriesHistoryDetilsBodyAnatomyData[${index}][surgeryHistoryDetilsBodyAnatomyNotes]`"
            :value="operation.surgeryHistoryDetilsBodyAnatomyNotes"
            v-on:changeValue="
              operation.surgeryHistoryDetilsBodyAnatomyNotes = $event
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

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateMedicalOperation"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'Operations',
            params: {
              clientToken: operationData.clientToken,
              reservationToken: operationData.reservationToken,
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
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import TimePicker from "@/components/general/TimePicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import SurgriesHistoryDetilsBodyAnatomyData from "@/models/historicalPlans/operations/SurgriesHistoryDetilsBodyAnatomyData";
import MedicinesType from "@/models/settings/settingsOther/medicinesTypes/MedicinesType";
import Medicine from "@/models/settings/settingsOther/medicines/Medicine";
import createToastMixin from "@/utils/create-toast-mixin";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import Client from "@/models/clients/Client";
import BodyAnatomyType from "@/models/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyType";
import BodyAnatomy from "@/models/settings/settingsOther/bodyAnatomies/BodyAnatomy";
import Surgery from "@/models/settings/settingsOther/surgeries/Surgery";

export default {
  name: "OperationForm",
  mixins: [createToastMixin],
  components: {
    CustomSelectBox,
    DatePicker,
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
      employeeTypeToken:
        this.$store.getters.userData.employeePersonalData.employeeTypeToken ||
        null,
      textAreaMaxLenght: TEXT_MAX_LENGTH_SUPER,
      maxRows: MAX_ROWS_TEXTAREA,
      employeeType: EMPLOYEE_TYPE,
      employeeTokenOptions: [],
      medicinesTypeData: new MedicinesType(),
      surgriesHistoryDetilsBodyAnatomyData:
        new SurgriesHistoryDetilsBodyAnatomyData(),
      medicinesTypeTokenOptions: [],
      medicineData: new Medicine(),
      medicineTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
      bodyAnatomyTypeData: new BodyAnatomyType(),
      bodyAnatomyTypeTokenOptions: [],
      bodyAnatomyData: new BodyAnatomy(),
      surgeryData: new Surgery(),
      surgeryTokenOptions: [],
      bodyAnatomyTokenOptions: [],
    };
  },
  props: ["operationData", "submitName"],
  methods: {
    addSlice() {
      this.operationData.surgriesHistoryDetilsBodyAnatomyData.push(
        new SurgriesHistoryDetilsBodyAnatomyData()
      );
    },
    removeSlice(index) {
      this.operationData.surgriesHistoryDetilsBodyAnatomyData.splice(index, 1);
    },
    async addOrUpdateMedicalOperation() {
      this.$emit("addOrUpdateMedicalOperation");
    },
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken =
        this.operationData.surgeryHistoryClientToken;
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
    changeReservations(data) {
      this.operationData.surgeryHistoryClientToken = data;
      this.getDialogOfServicesReservations();
    },
    async getDialogOfClients() {
      this.isLoading = true;
      this.clientTokenOptions = [];
      this.clientTokenOptions.push({
        value: "",
        text: this.$t("selectClient"),
      });
      try {
        let response = await this.clientData.getDialogOfClients(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientTokenOptions.push({
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
    async getDialogOfSurgeries() {
      this.isLoading = true;
      this.surgeryTokenOptions = [];
      try {
        const response = await this.surgeryData.getDialogOfSurgeries(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.surgeryTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.surgeryTokenOptions = null;
      }
      this.isLoading = false;
    },
    async getDialogOfBodyAnatomiesTypes() {
      this.isLoading = true;
      this.bodyAnatomyTypeTokenOptions = [];
      try {
        const response =
          await this.bodyAnatomyTypeData.getDialogOfBodyAnatomyTypes(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.bodyAnatomyTypeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.bodyAnatomyTypeTokenOptions = null;
      }
      this.isLoading = false;
    },
    changeBodyAnatomy(bodyAnatomyTypeToken) {
      console.log("zz");
      console.log(bodyAnatomyTypeToken);
      // this.operationData.surgriesHistoryDetilsBodyAnatomyData.bodyAnatomyTypeToken =
      //   data;
      this.getDialogOfBodyAnatomies(bodyAnatomyTypeToken);
    },
    async getDialogOfBodyAnatomies(bodyAnatomyTypeToken = "") {
      this.isLoading = true;
      this.bodyAnatomyTokenOptions = [];
      try {
        let response = await axios.get(
          `/BodyAnatomy/GetDialogOfBodyAnatomy?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&bodyAnatomyTypeToken=${bodyAnatomyTypeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.bodyAnatomyTokenOptions.push({
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
    this.getDialogOfServicesReservations();
    this.getDialogOfClients();
    this.getDialogOfBodyAnatomiesTypes();
    this.getDialogOfBodyAnatomies();
    this.getDialogOfSurgeries();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
