<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form v-if="!isLoading" autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-6'"
            :id="'employeeToken'"
            :value="diagnosisPlanData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="diagnosisPlanData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeNameInPrescription')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'clientToken'"
            :value="diagnosisPlanData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="changeReservations($event)"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="diagnosisPlanData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="diagnosisPlanData.reservationToken = $event"
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />
        </div>
      </div>

      <div v-if="diagnosisPlanData.diagnosisPlansDetilsData">
        <div
          class="my-card"
          v-for="(
            diagnosisSlice, index
          ) in diagnosisPlanData.diagnosisPlansDetilsData"
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
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][diagnosisTextAr]`"
              :value="diagnosisSlice.diagnosisTextAr"
              v-on:changeValue="diagnosisSlice.diagnosisTextAr = $event"
              :title="$t('historicalPlans.diagnosis.diagnosisTextAr')"
              :imgName="'diagnosis.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][diagnosisTextEn]`"
              :value="diagnosisSlice.diagnosisTextEn"
              v-on:changeValue="diagnosisSlice.diagnosisTextEn = $event"
              :title="$t('historicalPlans.diagnosis.diagnosisTextEn')"
              :imgName="'diagnosis.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][diagnosisTextUnd]`"
              :value="diagnosisSlice.diagnosisTextUnd"
              v-on:changeValue="diagnosisSlice.diagnosisTextUnd = $event"
              :title="$t('historicalPlans.diagnosis.diagnosisTextUnd')"
              :imgName="'diagnosis.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][diseaseTextAr]`"
              :value="diagnosisSlice.diseaseTextAr"
              v-on:changeValue="diagnosisSlice.diseaseTextAr = $event"
              :title="$t('historicalPlans.diagnosis.diseaseTextAr')"
              :imgName="'disease.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][diseaseTextEn]`"
              :value="diagnosisSlice.diseaseTextEn"
              v-on:changeValue="diagnosisSlice.diseaseTextEn = $event"
              :title="$t('historicalPlans.diagnosis.diseaseTextEn')"
              :imgName="'disease.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][diseaseTextUnd]`"
              :value="diagnosisSlice.diseaseTextUnd"
              v-on:changeValue="diagnosisSlice.diseaseTextUnd = $event"
              :title="$t('historicalPlans.diagnosis.diseaseTextUnd')"
              :imgName="'disease.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][complaintTextAr]`"
              :value="diagnosisSlice.complaintTextAr"
              v-on:changeValue="diagnosisSlice.complaintTextAr = $event"
              :title="$t('historicalPlans.diagnosis.complaintTextAr')"
              :imgName="'complaint.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][complaintTextEn]`"
              :value="diagnosisSlice.complaintTextEn"
              v-on:changeValue="diagnosisSlice.complaintTextEn = $event"
              :title="$t('historicalPlans.diagnosis.complaintTextEn')"
              :imgName="'complaint.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][complaintTextUnd]`"
              :value="diagnosisSlice.complaintTextUnd"
              v-on:changeValue="diagnosisSlice.complaintTextUnd = $event"
              :title="$t('historicalPlans.diagnosis.complaintTextUnd')"
              :imgName="'complaint.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][symptomsTextAr]`"
              :value="diagnosisSlice.symptomsTextAr"
              v-on:changeValue="diagnosisSlice.symptomsTextAr = $event"
              :title="$t('historicalPlans.diagnosis.symptomsTextAr')"
              :imgName="'symptoms.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][symptomsTextEn]`"
              :value="diagnosisSlice.symptomsTextEn"
              v-on:changeValue="diagnosisSlice.symptomsTextEn = $event"
              :title="$t('historicalPlans.diagnosis.symptomsTextEn')"
              :imgName="'symptoms.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`diagnosisPlansDetilsData[${index}][symptomsTextUnd]`"
              :value="diagnosisSlice.symptomsTextUnd"
              v-on:changeValue="diagnosisSlice.symptomsTextUnd = $event"
              :title="$t('historicalPlans.diagnosis.symptomsTextUnd')"
              :imgName="'symptoms.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />

            <TextArea
              :className="'col-md-12'"
              :id="`diagnosisPlansDetilsData[${index}][diagnosisPlansDetilsNotes]`"
              :value="diagnosisSlice.diagnosisPlansDetilsNotes"
              v-on:changeValue="
                diagnosisSlice.diagnosisPlansDetilsNotes = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />

            <div
              v-if="diagnosisSlice.diagnosisPlansDetilsBodyAnatomyData"
              class="col-12"
            >
              <div
                class="my-card"
                v-for="(
                  detilsSlice, subIndex
                ) in diagnosisSlice.diagnosisPlansDetilsBodyAnatomyData"
                :key="subIndex"
              >
                <span class="my-card-title">{{ subIndex + 1 }}</span>

                <span class="remove-slice-container" v-if="subIndex != 0">
                  <button
                    @click="removeSubSlice(index, subIndex)"
                    type="button"
                    class="btn btn-remove-slice"
                  >
                    ×
                  </button>
                </span>
                <div class="row">
                  <CustomSelectBox
                    :className="'col-md-6'"
                    :id="`diagnosisPlansDetilsData[${index}][diagnosisPlansDetilsBodyAnatomyData][${subIndex}][bodyAnatomyToken]`"
                    :value="detilsSlice.bodyAnatomyToken"
                    :options="bodyAnatomyTokenOptions"
                    v-on:changeValue="detilsSlice.bodyAnatomyToken = $event"
                    :title="$t('bodyAnatomies.select')"
                    :imgName="'anatomy.svg'"
                  />
                  <!-- :imgStatus="true" -->

                  <TextArea
                    :className="'col-md-6'"
                    :id="`diagnosisPlansDetilsData[${index}][diagnosisPlansDetilsBodyAnatomyData][${subIndex}][diagnosisPlansDetilsBodyAnatomyNotes]`"
                    :value="detilsSlice.diagnosisPlansDetilsBodyAnatomyNotes"
                    v-on:changeValue="
                      detilsSlice.diagnosisPlansDetilsBodyAnatomyNotes = $event
                    "
                    :title="$t('notes')"
                    :imgName="'notes.svg'"
                    :maxlength="textAreaMaxLenght"
                    :maxRows="maxRows"
                  />
                </div>
              </div>

              <div class="add-slice-container">
                <button
                  @click="addSubSlice(index)"
                  type="button"
                  class="btn btn-add-slice"
                  :title="$t('addSlice')"
                >
                  +
                </button>
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
          @click.prevent="addOrUpdateDiagnosisPlan"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'DiagnosisPlans',
            params: {
              clientToken: clientToken,
              reservationToken: reservationToken,
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
import PreLoader from "@/components/general/PreLoader.vue";
import axios from "axios";
import {
  STATUS,
  TEXT_MAX_LENGTH_SUPER,
  MAX_ROWS_TEXTAREA,
} from "@/utils/constants";
import { EMPLOYEE_TYPE } from "@/utils/constantLists";
import { setDataMultiLang } from "@/utils/functions";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import Client from "@/models/clients/Client";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import BodyAnatomyType from "@/models/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyType";
import BodyAnatomy from "@/models/settings/settingsOther/bodyAnatomies/BodyAnatomy";
import DiagnosisPlansDetilsData from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlansDetilsData";
import DiagnosisPlansDetilsBodyAnatomyData from "@/models/historicalPlans/diagnosisPlans/DiagnosisPlansDetilsBodyAnatomyData";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "DiagnosisPlanForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
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
      clientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      bodyAnatomyTypeData: new BodyAnatomyType(),
      bodyAnatomyTypeTokenOptions: [],
      bodyAnatomyData: new BodyAnatomy(),
      bodyAnatomyTokenOptions: [],
    };
  },
  props: ["diagnosisPlanData", "submitName", "clientToken", "reservationToken"],
  methods: {
    addSlice() {
      this.diagnosisPlanData.diagnosisPlansDetilsData.push(
        new DiagnosisPlansDetilsData()
      );
    },
    removeSlice(index) {
      this.diagnosisPlanData.diagnosisPlansDetilsData.splice(index, 1);
    },
    addSubSlice(index) {
      this.diagnosisPlanData.diagnosisPlansDetilsData[
        index
      ].diagnosisPlansDetilsBodyAnatomyData.push(
        new DiagnosisPlansDetilsBodyAnatomyData()
      );
    },
    removeSubSlice(index, subIndex) {
      this.diagnosisPlanData.diagnosisPlansDetilsData[
        index
      ].diagnosisPlansDetilsBodyAnatomyData.splice(subIndex, 1);
    },
    async addOrUpdateDiagnosisPlan() {
      this.$emit("addOrUpdateDiagnosisPlan");
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
      this.diagnosisPlanData.clientToken = data;
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
      this.reservationData.clientToken = this.diagnosisPlanData.clientToken;
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
    async getDialogOfBodyAnatomyTypes() {
      this.isLoading = true;
      this.bodyAnatomyTypeTokenOptions = [];
      this.bodyAnatomyTypeTokenOptions.push({
        value: "",
        text: this.$t("bodyAnatomyTypes.select"),
      });
      try {
        let response =
          await this.bodyAnatomyTypeData.getDialogOfBodyAnatomyTypes(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.bodyAnatomyTypeTokenOptions.push({
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
    // async getDialogOfBodyAnatomies() {
    //   this.isLoading = true;
    //   // this.bodyAnatomyTokenOptions = [];
    //   // this.bodyAnatomyTokenOptions.push({
    //   //   value: "",
    //   //   text: this.$t("bodyAnatomies.select"),
    //   // });
    //   try {
    //     this.bodyAnatomyTokenOptions =
    //       await this.bodyAnatomyData.getDialogOfBodyAnatomies(
    //         this.language,
    //         this.userAuthorizeToken
    //       );
    //     // const itemsData = response.data.itemsData;
    //     // let response = await this.bodyAnatomyData.getAllBodyAnatomies(
    //     //   this.language,
    //     //   this.userAuthorizeToken,
    //     // );
    //     console.log(this.bodyAnatomyTokenOptions);
    //     // const itemsData = response.data.bodyAnatomyPagination.bodyAnatomyData;
    //     // if (response.data.status == STATUS.SUCCESS) {
    //     //   // for (let item in itemsData) {
    //     //   //   this.bodyAnatomyTokenOptions.push({
    //     //   //     value: itemsData[item]["itemToken"],
    //     //   //     text: itemsData[item]["itemName"],
    //     //   //   });
    //     //   // }
    //     //   for (let item in itemsData) {
    //     //     this.bodyAnatomyTokenOptions.push({
    //     //       value: itemsData[item]["bodyAnatomyToken"],
    //     //       text: itemsData[item]["bodyAnatomyNameCurrent"],
    //     //     });
    //     //   }
    //     // } else if (response.data.status == STATUS.INVALID_TOKEN) {
    //     //   this.$store.dispatch("updateUserData", null);
    //     //   this.$router.push("/").catch(() => {});
    //     // }
    //   } catch (error) {
    //     this.showMsg(this.$t("errorCatch"));
    //   }
    //   this.isLoading = false;
    // },
    async getDialogOfBodyAnatomies() {
      this.isLoading = true;
      try {
        this.bodyAnatomyTokenOptions =
          await this.bodyAnatomyData.getDialogOfBodyAnatomies(
            this.language,
            this.userAuthorizeToken
          );
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
    this.getDialogOfClients();
    this.getDialogOfServicesReservations();
    // this.getDialogOfBodyAnatomyTypes();
    this.getDialogOfBodyAnatomies();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
