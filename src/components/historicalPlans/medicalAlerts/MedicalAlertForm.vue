<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="medicalAlertData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="medicalAlertData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeNameInPrescription')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="medicalAlertData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="changeReservations($event)"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="medicalAlertData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="medicalAlertData.reservationToken = $event"
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalAlertNameAr'"
            :value="medicalAlertData.medicalAlertNameAr"
            :title="$t('historicalPlans.warnings.nameAr')"
            :imgName="'warning.svg'"
            v-on:changeValue="medicalAlertData.medicalAlertNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalAlertNameEn'"
            :value="medicalAlertData.medicalAlertNameEn"
            :title="$t('historicalPlans.warnings.nameEn')"
            :imgName="'warning.svg'"
            v-on:changeValue="medicalAlertData.medicalAlertNameEn = $event"
          />
          <CustomInput
            :className="'col-md-12'"
            :id="'medicalAlertNameUnd'"
            :value="medicalAlertData.medicalAlertNameUnd"
            :title="$t('historicalPlans.warnings.nameUnd')"
            :imgName="'warning.svg'"
            v-on:changeValue="medicalAlertData.medicalAlertNameUnd = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalAlertDescriptionAr'"
            :value="medicalAlertData.medicalAlertDescriptionAr"
            :title="$t('historicalPlans.warnings.descriptionAr')"
            v-on:changeValue="
              medicalAlertData.medicalAlertDescriptionAr = $event
            "
            :imgName="'description.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalAlertDescriptionEn'"
            :value="medicalAlertData.medicalAlertDescriptionEn"
            :title="$t('historicalPlans.warnings.descriptionEn')"
            v-on:changeValue="
              medicalAlertData.medicalAlertDescriptionEn = $event
            "
            :imgName="'description.svg'"
          />
          <CustomInput
            :className="'col-md-12'"
            :id="'medicalAlertDescriptionUnd'"
            :value="medicalAlertData.medicalAlertDescriptionUnd"
            :title="$t('historicalPlans.warnings.descriptionUnd')"
            v-on:changeValue="
              medicalAlertData.medicalAlertDescriptionUnd = $event
            "
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`medicalAlertNotes`"
            :value="medicalAlertData.medicalAlertNotes"
            v-on:changeValue="medicalAlertData.medicalAlertNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div
        v-if="medicalAlertData.medicalAlertsActiveSubstancesData"
        class="col-12"
      >
        <div
          class="my-card"
          v-for="(
            medicalAlert, index
          ) in medicalAlertData.medicalAlertsActiveSubstancesData"
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
              :className="'col-md-6'"
              :id="'activeSubstanceToken'"
              :value="medicalAlert.activeSubstanceToken"
              :options="activeSubstanceTokenOptions"
              v-on:changeValue="medicalAlert.activeSubstanceToken = $event"
              :title="$t('activeSubstances.select')"
              :imgName="'active-substance.svg'"
            />

            <CustomInputFloat
              :className="'col-md-6'"
              :id="`medicalAlertsActiveSubstancesData[${index}][activeSubstancePercentage]`"
              :value="medicalAlert.activeSubstancePercentage"
              v-on:changeValue="medicalAlert.activeSubstancePercentage = $event"
              :title="$t('activeSubstances.percentage')"
              :imgName="'number.svg'"
            />

            <TextArea
              :className="'col-md-12'"
              :id="`medicalAlertsActiveSubstancesData[${index}][medicalAlertActiveSubstancesNotes]`"
              :value="medicalAlert.medicalAlertActiveSubstancesNotes"
              v-on:changeValue="
                medicalAlert.medicalAlertActiveSubstancesNotes = $event
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

      <div v-if="medicalAlertData.medicalAlertsMealsData" class="col-12">
        <div
          class="my-card"
          v-for="(
            medicalAlert, index
          ) in medicalAlertData.medicalAlertsMealsData"
          :key="index"
        >
          <span class="my-card-title">{{ index + 1 }}</span>

          <span class="remove-slice-container" v-if="index != 0">
            <button
              @click="removeSlicesMeal(index)"
              type="button"
              class="btn btn-remove-slice"
            >
              ×
            </button>
          </span>
          <div class="row">
            <CustomSelectBox
              :className="'col-md-12'"
              :id="'mealToken'"
              :value="medicalAlert.mealToken"
              :options="mealTokenOptions"
              v-on:changeValue="medicalAlert.mealToken = $event"
              :title="$t('meals.select')"
              :imgName="'meal.svg'"
            />

            <TextArea
              :className="'col-md-12'"
              :id="`MedicalAlertsMealsData[${index}][medicalAlertsMealsNotes]`"
              :value="medicalAlert.medicalAlertsMealsNotes"
              v-on:changeValue="medicalAlert.medicalAlertsMealsNotes = $event"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </div>
        </div>

        <div class="add-slice-container">
          <button
            @click="addSliceMeal"
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
          @click.prevent="addOrUpdateMedicalAlert"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'MedicalAlerts',
            params: {
              clientToken: medicalAlertData.clientToken,
              reservationToken: medicalAlertData.reservationToken,
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
import MedicalAlertsActiveSubstancesData from "@/models/historicalPlans/medicalAlerts/MedicalAlertsActiveSubstancesData";
import MedicalAlertsMealsData from "@/models/historicalPlans/medicalAlerts/MedicalAlertsMealsData";
import Client from "@/models/clients/Client";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import createToastMixin from "@/utils/create-toast-mixin";
import Meal from "@/models/settings/settingsOther/meals/Meal";
import ActiveSubstance from "@/models/settings/settingsOther/activeSubstances/ActiveSubstance";

export default {
  name: "MedicalAlertForm",
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
      medicalAlertsActiveSubstancesData:
        new MedicalAlertsActiveSubstancesData(),
      medicalAlertsMealsData: new MedicalAlertsMealsData(),
      clientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      activeSubstanceData: new ActiveSubstance(),
      activeSubstanceTokenOptions: [],
      mealData: new Meal(),
      mealTokenOptions: [],
    };
  },
  props: ["medicalAlertData", "submitName"],
  methods: {
    async getDialogOfActiveSubstances() {
      this.isLoading = true;
      this.activeSubstanceTokenOptions =
        await this.activeSubstanceData.getDialogOfActiveSubstances(
          this.language,
          this.userAuthorizeToken
        );
      this.isLoading = false;
    },
    async getDialogOfMeals() {
      this.isLoading = true;
      this.mealTokenOptions = await this.mealData.getDialogOfMeals(
        this.language,
        this.userAuthorizeToken
      );
      this.isLoading = false;
    },
    addSlice() {
      this.medicalAlertData.medicalAlertsActiveSubstancesData.push(
        new MedicalAlertsActiveSubstancesData()
      );
    },
    removeSlice(index) {
      this.medicalAlertData.medicalAlertsActiveSubstancesData.splice(index, 1);
    },
    addSliceMeal() {
      this.medicalAlertData.medicalAlertsMealsData.push(
        new MedicalAlertsMealsData()
      );
    },
    removeSliceMeal(index) {
      this.medicalAlertData.medicalAlertsMealsData.splice(index, 1);
    },
    async addOrUpdateMedicalAlert() {
      this.$emit("addOrUpdateMedicalAlert");
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
    changeReservations(data) {
      this.medicalAlertData.clientToken = data;
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
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken = this.medicalAlertData.clientToken;
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
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    this.getDialogOfActiveSubstances();
    this.getDialogOfMeals();
    this.getDialogOfClients();
    this.getDialogOfServicesReservations();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
