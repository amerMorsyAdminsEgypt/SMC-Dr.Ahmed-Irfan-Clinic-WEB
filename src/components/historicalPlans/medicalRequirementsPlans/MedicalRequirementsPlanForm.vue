<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="medicalRequirementsPlanData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="
              medicalRequirementsPlanData.employeeTokenInReport = $event
            "
            :title="$t('selectEmployeeName')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="medicalRequirementsPlanData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="changeReservations($event)"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="medicalRequirementsPlanData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="
              medicalRequirementsPlanData.reservationToken = $event
            "
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />
          <!-- <TextArea
            :className="'col-md-12'"
            :id="`notes`"
            :value="medicalRequirementsPlanData.notes"
            v-on:changeValue="medicalRequirementsPlanData.notes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          /> -->
        </div>
      </div>

      <div
        class="my-card"
        v-for="(
          medicalRequirementsPlan, index
        ) in medicalRequirementsPlanData.medicalRequirementsPlansDetailsData"
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
            :id="`medicalRequirementsPlansDetailsData[${index}][requirementToken]`"
            :value="medicalRequirementsPlan.requirementToken"
            :options="requirementsTokenOptions"
            v-on:changeValue="medicalRequirementsPlan.requirementToken = $event"
            :title="title"
            :imgName="'requirements.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`medicalRequirementsPlansDetailsData[${index}][medicalRequirementPlanDetailsNotes]`"
            :value="medicalRequirementsPlan.medicalRequirementPlanDetailsNotes"
            v-on:changeValue="
              medicalRequirementsPlan.medicalRequirementPlanDetailsNotes =
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

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateMedicalRequirementsPlan"
        >
          {{ submitName }}
        </button>
        <router-link
          v-if="
            medicalRequirementsPlanData.requirementTypeToken ==
            requirementsTypeTokens.Rays
          "
          :to="{
            name: 'MedicalRequirementsPlansRays',
            params: {
              clientToken: medicalRequirementsPlanData.clientToken,
              reservationToken: medicalRequirementsPlanData.reservationToken,
            },
          }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
        <router-link
          v-else-if="
            medicalRequirementsPlanData.requirementTypeToken ==
            requirementsTypeTokens.MedicalTests
          "
          :to="{
            name: 'MedicalRequirementsPlansTests',
            params: {
              clientToken: medicalRequirementsPlanData.clientToken,
              reservationToken: medicalRequirementsPlanData.reservationToken,
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
// import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import MedicalRequirementsPlansDetailsData from "@/models/historicalPlans/medicalRequirementsPlans/MedicalRequirementsPlansDetailsData";
import Requirements from "@/models/settings/settingsOther/requirements/Requirement";
import createToastMixin from "@/utils/create-toast-mixin";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import Client from "@/models/clients/Client";
import { REQUIREMENTS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "MedicalRequirementsPlanForm",
  mixins: [createToastMixin],
  components: {
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
      requirementsData: new Requirements(),
      medicalRequirementsPlansDetailsData:
        new MedicalRequirementsPlansDetailsData(),
      requirementsTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      requirementsTypeTokens: REQUIREMENTS_TYPE_TOKENS,
    };
  },
  props: ["medicalRequirementsPlanData", "submitName"],
  methods: {
    addSlice() {
      this.medicalRequirementsPlanData.medicalRequirementsPlansDetailsData.push(
        new MedicalRequirementsPlansDetailsData()
      );
    },
    removeSlice(index) {
      this.medicalRequirementsPlanData.medicalRequirementsPlansDetailsData.splice(
        index,
        1
      );
    },
    async addOrUpdateMedicalRequirementsPlan() {
      this.$emit("addOrUpdateMedicalRequirementsPlan");
    },

    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken =
        this.medicalRequirementsPlanData.clientToken;
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
      this.medicalRequirementsPlanData.clientToken = data;
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
    async getDialogOfRequirements() {
      this.isLoading = true;
      this.requirementsTokenOptions = [];
      this.requirementsData.requirementTypeToken =
        this.medicalRequirementsPlanData.requirementTypeToken;
      try {
        let response = await this.requirementsData.getDialogOfRequirements(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.requirementsTokenOptions.push({
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
  computed: {
    title: function () {
      if (
        this.medicalRequirementsPlanData.requirementTypeToken ==
        this.requirementsTypeTokens.Rays
      ) {
        return this.$t("medicalRequirements.rays.selsct");
      } else {
        return this.$t("medicalRequirements.medicalTests.selsct");
      }
    },
  },
  async created() {
    this.getDialogOfRequirements();
    this.getDialogOfServicesReservations();
    this.getDialogOfClients();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
