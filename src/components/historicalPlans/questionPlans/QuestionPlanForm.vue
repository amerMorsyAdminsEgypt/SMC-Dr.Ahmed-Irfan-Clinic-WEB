<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form v-if="!isLoading" autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="questionPlanData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="questionPlanData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeNameInPrescription')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="questionPlanData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="changeReservations($event)"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="questionPlanData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="questionPlanData.reservationToken = $event"
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="questionPlanData.notes"
            :value="questionPlanData.notes"
            v-on:changeValue="questionPlanData.notes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            :maxlength="textAreaMaxLenght"
            :maxRows="maxRows"
          />
        </div>
      </div>

      <div v-if="questionPlanData.questionPlanDetailsData">
        <div
          class="my-card"
          v-for="(
            questionSlice, index
          ) in questionPlanData.questionPlanDetailsData"
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
              :className="'col-md-10'"
              :id="`questionPlanDetailsData[${index}][questionToken]`"
              :value="questionSlice.questionToken"
              :options="questionTokenOptions"
              v-on:changeValue="questionSlice.questionToken = $event"
              :title="$t('questions.select')"
              :imgName="'questions.svg'"
              :imgStatus="true"
            />
            <CustomCheckbox
              :className="'col-2'"
              :value="questionSlice.questionAnswerTrueOrFalse"
              :title="$t('historicalPlans.questionPlans.answerTrue')"
              v-on:changeValue="
                questionSlice.questionAnswerTrueOrFalse = $event
              "
            />
            <TextArea
              :className="'col-md-6'"
              :id="`questionPlanDetailsData[${index}][questionAnswerTextAr]`"
              :value="questionSlice.questionAnswerTextAr"
              v-on:changeValue="questionSlice.questionAnswerTextAr = $event"
              :title="$t('historicalPlans.questionPlans.answerTextAr')"
              :imgName="'questions.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`questionPlanDetailsData[${index}][questionAnswerTextEn]`"
              :value="questionSlice.questionAnswerTextEn"
              v-on:changeValue="questionSlice.questionAnswerTextEn = $event"
              :title="$t('historicalPlans.questionPlans.answerTextEn')"
              :imgName="'questions.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`questionPlanDetailsData[${index}][questionAnswerTextUnd]`"
              :value="questionSlice.questionAnswerTextUnd"
              v-on:changeValue="questionSlice.questionAnswerTextUnd = $event"
              :title="$t('historicalPlans.questionPlans.answerTextUnd')"
              :imgName="'questions.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`questionPlanDetailsData[${index}][questionPlanNotes]`"
              :value="questionSlice.questionPlanNotes"
              v-on:changeValue="questionSlice.questionPlanNotes = $event"
              :title="$t('notes')"
              :imgName="'notes.svg'"
              :maxlength="textAreaMaxLenght"
              :maxRows="maxRows"
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
          @click.prevent="addOrUpdateQuestionPlan"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'QuestionPlans',
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
import Question from "@/models/settings/settingsOther/questions/Question";
import QuestionPlanDetailsData from "@/models/historicalPlans/questionPlans/QuestionPlanDetailsData";
import createToastMixin from "@/utils/create-toast-mixin";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";

export default {
  name: "QuestionPlanForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    CustomSelectBox,
    CustomCheckbox,
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
      questionData: new Question(),
      questionTokenOptions: [],
    };
  },
  props: ["questionPlanData", "submitName", "clientToken", "reservationToken"],
  methods: {
    addSlice() {
      this.questionPlanData.questionPlanDetailsData.push(
        new QuestionPlanDetailsData()
      );
    },
    removeSlice(index) {
      this.questionPlanData.questionPlanDetailsData.splice(index, 1);
    },

    async addOrUpdateQuestionPlan() {
      this.$emit("addOrUpdateQuestionPlan");
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
      this.questionPlanData.clientToken = data;
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
      this.reservationData.clientToken = this.questionPlanData.clientToken;
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
    async getDialogOfQuestions() {
      this.isLoading = true;
      this.questionTokenOptions = await this.questionData.getDialogOfQuestions(
        this.language,
        this.userAuthorizeToken
      );
      this.isLoading = false;
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    this.getDialogOfClients();
    this.getDialogOfServicesReservations();
    this.getDialogOfQuestions();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
