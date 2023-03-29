<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="addictiveStuffClientData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="
              addictiveStuffClientData.employeeTokenInReport = $event
            "
            :title="$t('selectEmployeeName')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="addictiveStuffClientData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="addictiveStuffClientData.clientToken = $event"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
        </div>
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'addictiveStuffToken'"
            :value="addictiveStuffClientData.addictiveStuffToken"
            :options="addictiveStuffTokenOptions"
            v-on:changeValue="
              addictiveStuffClientData.addictiveStuffToken = $event
            "
            :title="select"
            :imgName="image"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`addictiveStuffClientNotes`"
            :value="addictiveStuffClientData.addictiveStuffClientNotes"
            v-on:changeValue="
              addictiveStuffClientData.addictiveStuffClientNotes = $event
            "
            :title="note"
            :imgName="'notes.svg'"
          />
          <DatePicker
            :className="'col-md-12'"
            :id="'injuryDate'"
            :value="addictiveStuffClientData.injuryDate"
            v-on:changeValue="addictiveStuffClientData.injuryDate = $event"
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.date')
                : $t('addictiveStuffs.injury.date')
            "
            :language="language"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`InjuryReasonAr`"
            :value="addictiveStuffClientData.InjuryReasonAr"
            v-on:changeValue="addictiveStuffClientData.InjuryReasonAr = $event"
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.reasonAr')
                : $t('addictiveStuffs.injury.reasonAr')
            "
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjuryReasonEn`"
            :value="addictiveStuffClientData.InjuryReasonEn"
            v-on:changeValue="addictiveStuffClientData.InjuryReasonEn = $event"
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.reasonEn')
                : $t('addictiveStuffs.injury.reasonEn')
            "
            :imgName="'reason.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjuryReasonUnd`"
            :value="addictiveStuffClientData.InjuryReasonUnd"
            v-on:changeValue="addictiveStuffClientData.InjuryReasonUnd = $event"
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.reasonUnd')
                : $t('addictiveStuffs.injury.reasonUnd')
            "
            :imgName="'reason.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`InjurySyndromeAr`"
            :value="addictiveStuffClientData.InjurySyndromeAr"
            v-on:changeValue="
              addictiveStuffClientData.InjurySyndromeAr = $event
            "
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.syndromeAr')
                : $t('addictiveStuffs.injury.syndromeAr')
            "
            :imgName="'syndrome.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjurySyndromeEn`"
            :value="addictiveStuffClientData.InjurySyndromeEn"
            v-on:changeValue="
              addictiveStuffClientData.InjurySyndromeEn = $event
            "
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.syndromeEn')
                : $t('addictiveStuffs.injury.syndromeEn')
            "
            :imgName="'syndrome.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjurySyndromeUnd`"
            :value="addictiveStuffClientData.InjurySyndromeUnd"
            v-on:changeValue="
              addictiveStuffClientData.InjurySyndromeUnd = $event
            "
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.syndromeUnd')
                : $t('addictiveStuffs.injury.syndromeUnd')
            "
            :imgName="'syndrome.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`InjuryDetailsAr`"
            :value="addictiveStuffClientData.InjuryDetailsAr"
            v-on:changeValue="addictiveStuffClientData.InjuryDetailsAr = $event"
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.detailsAr')
                : $t('addictiveStuffs.injury.detailsAr')
            "
            :imgName="'details.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjuryDetailsEn`"
            :value="addictiveStuffClientData.InjuryDetailsEn"
            v-on:changeValue="addictiveStuffClientData.InjuryDetailsEn = $event"
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.detailsEn')
                : $t('addictiveStuffs.injury.detailsEn')
            "
            :imgName="'details.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjuryDetailsUnd`"
            :value="addictiveStuffClientData.InjuryDetailsUnd"
            v-on:changeValue="
              addictiveStuffClientData.InjuryDetailsUnd = $event
            "
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.detailsUnd')
                : $t('addictiveStuffs.injury.detailsUnd')
            "
            :imgName="'details.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`InjuryTreatmentAr`"
            :value="addictiveStuffClientData.InjuryTreatmentAr"
            v-on:changeValue="
              addictiveStuffClientData.InjuryTreatmentAr = $event
            "
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.treatmentAr')
                : $t('addictiveStuffs.injury.treatmentAr')
            "
            :imgName="'treatments.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjuryTreatmentEn`"
            :value="addictiveStuffClientData.InjuryTreatmentEn"
            v-on:changeValue="
              addictiveStuffClientData.InjuryTreatmentEn = $event
            "
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.treatmentEn')
                : $t('addictiveStuffs.injury.treatmentEn')
            "
            :imgName="'treatments.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`InjuryTreatmentUnd`"
            :value="addictiveStuffClientData.InjuryTreatmentUnd"
            v-on:changeValue="
              addictiveStuffClientData.InjuryTreatmentUnd = $event
            "
            :title="
              isHabit
                ? $t('addictiveStuffs.injuryHabit.treatmentUnd')
                : $t('addictiveStuffs.injury.treatmentUnd')
            "
            :imgName="'treatments.svg'"
          />
          <CustomCheckbox
            :className="'col-md-12'"
            :value="addictiveStuffClientData.recoveryState"
            :title="$t('addictiveStuffs.recoveried')"
            v-on:changeValue="addictiveStuffClientData.recoveryState = $event"
          />
          <DatePicker
            v-show="addictiveStuffClientData.recoveryState"
            :className="'col-md-6'"
            :id="'recoveryDate'"
            :value="addictiveStuffClientData.recoveryDate"
            :title="$t('addictiveStuffs.recoveryDate')"
            :imgName="'habits.svg'"
            v-on:changeValue="addictiveStuffClientData.recoveryDate = $event"
            :language="language"
          />
          <TextArea
            v-show="addictiveStuffClientData.recoveryState"
            :className="'col-md-6'"
            :id="`recoveryNotes`"
            :value="addictiveStuffClientData.recoveryNotes"
            v-on:changeValue="addictiveStuffClientData.recoveryNotes = $event"
            :title="$t('addictiveStuffs.recoveryNotes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateAddictiveStuffClient"
        >
          {{ submitName }}
        </button>
        <router-link
          v-if="
            addictiveStuffClientData.addictiveStuffTypeToken ==
            addictiveStuffTypeToken.Habits
          "
          :to="{
            name: 'AddictiveStuffClientsHabits',
            params: {
              clientToken: addictiveStuffClientData.clientToken,
            },
          }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
        <router-link
          v-else-if="
            addictiveStuffClientData.addictiveStuffTypeToken ==
            addictiveStuffTypeToken.Diseases
          "
          :to="{
            name: 'AddictiveStuffClientsDiseases',
            params: {
              clientToken: addictiveStuffClientData.clientToken,
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
import DatePicker from "@/components/general/DatePicker.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import AddictiveStuff from "@/models/settings/settingsOther/addictiveStuffs/AddictiveStuff";
import createToastMixin from "@/utils/create-toast-mixin";
import Client from "@/models/clients/Client";
import { ADDICTIVESTUFFS_TYPE_TOKENS } from "@/utils/constantLists";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";

export default {
  name: "AddictiveStuffClientForm",
  mixins: [createToastMixin],
  components: {
    CustomSelectBox,
    TextArea,
    CustomCheckbox,
    DatePicker,
  },
  data() {
    return {
      isLoading: false,
      isHabit: false,
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
      addictiveStuffData: new AddictiveStuff(),
      addictiveStuffTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
      addictiveStuffTypeToken: ADDICTIVESTUFFS_TYPE_TOKENS,
    };
  },
  props: ["addictiveStuffClientData", "submitName"],
  computed: {
    select() {
      if (
        this.addictiveStuffClientData.addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.habits.selsct");
      } else {
        return this.$t("addictiveStuffs.chronicDiseases.selsct");
      }
    },
    image() {
      if (
        this.addictiveStuffClientData.addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return "habits.svg";
      } else {
        return "diseases.svg";
      }
    },
    note() {
      if (
        this.addictiveStuffClientData.addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.habits.notes");
      } else {
        return this.$t("addictiveStuffs.chronicDiseases.notes");
      }
    },
  },
  methods: {
    setAddictiveType() {
      if (
        this.addictiveStuffClientData.addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        this.isHabit = true;
      }
    },
    async addOrUpdateAddictiveStuffClient() {
      this.$emit("addOrUpdateAddictiveStuffClient");
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
    async getDialogOfAddictiveStuffs() {
      this.isLoading = true;
      this.addictiveStuffTokenOptions = [];
      this.addictiveStuffData.addictiveStuffTypeToken =
        this.addictiveStuffClientData.addictiveStuffTypeToken;
      try {
        let response = await this.addictiveStuffData.getDialogOfAddictiveStuffs(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.addictiveStuffTokenOptions.push({
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
    this.setAddictiveType();
    this.getDialogOfAddictiveStuffs();
    this.getDialogOfClients();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
