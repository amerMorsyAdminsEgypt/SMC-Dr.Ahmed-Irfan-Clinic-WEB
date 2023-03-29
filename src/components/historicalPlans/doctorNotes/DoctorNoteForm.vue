<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="doctorNoteData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="doctorNoteData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeName')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="doctorNoteData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="doctorNoteData.clientToken = $event"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`doctorNoteNameAr`"
            :value="doctorNoteData.doctorNoteNameAr"
            v-on:changeValue="doctorNoteData.doctorNoteNameAr = $event"
            :title="$t('historicalPlans.doctorNotes.nameAr')"
            :imgName="'notes.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`doctorNoteNameEn`"
            :value="doctorNoteData.doctorNoteNameEn"
            v-on:changeValue="doctorNoteData.doctorNoteNameEn = $event"
            :title="$t('historicalPlans.doctorNotes.nameEn')"
            :imgName="'notes.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`doctorNoteNameUnd`"
            :value="doctorNoteData.doctorNoteNameUnd"
            v-on:changeValue="doctorNoteData.doctorNoteNameUnd = $event"
            :title="$t('historicalPlans.doctorNotes.nameUnd')"
            :imgName="'notes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`showTypeToken`"
            :value="doctorNoteData.showTypeToken"
            :options="listShowTypeTokenOptions"
            v-on:changeValue="doctorNoteData.showTypeToken = $event"
            :title="$t('selectShowType')"
            :imgName="'eye-show.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateDoctorNote"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'DoctorNotes',
            params: {
              clientToken: doctorNoteData.clientToken,
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
import Client from "@/models/clients/Client";
import { setDataMultiLang } from "@/utils/functions";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "DoctorNoteForm",
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
      clientData: new Client(),
      clientTokenOptions: [],
      listShowTypeTokenOptions: [],
    };
  },
  props: ["doctorNoteData", "submitName"],
  methods: {
    async getDialogOfShowType() {
      this.isLoading = true;
      this.listShowTypeTokenOptions = [];
      this.listShowTypeTokenOptions.push({
        value: "",
        text: this.$t("selectShowType"),
      });
      let items = this.$store.getters.userData.constantLists.listShowType;
      for (let item in items) {
        this.listShowTypeTokenOptions.push({
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
    async addOrUpdateDoctorNote() {
      this.$emit("addOrUpdateDoctorNote");
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

    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    this.getDialogOfClients();
    this.getDialogOfShowType();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
