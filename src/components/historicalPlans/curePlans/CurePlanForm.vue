<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="employeeTypeToken != employeeType.Doctor"
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="curePlanData.employeeTokenInReport"
            :options="employeeTokenOptions"
            v-on:changeValue="curePlanData.employeeTokenInReport = $event"
            :title="$t('selectEmployeeName')"
            :imgName="'doctors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="curePlanData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="curePlanData.clientToken = $event"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="`curePlanDescriptionAr`"
            :value="curePlanData.curePlanDescriptionAr"
            v-on:changeValue="curePlanData.curePlanDescriptionAr = $event"
            :title="$t('historicalPlans.curePlans.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`curePlanDescriptionEn`"
            :value="curePlanData.curePlanDescriptionEn"
            v-on:changeValue="curePlanData.curePlanDescriptionEn = $event"
            :title="$t('historicalPlans.curePlans.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`curePlanDescriptionUnd`"
            :value="curePlanData.curePlanDescriptionUnd"
            v-on:changeValue="curePlanData.curePlanDescriptionUnd = $event"
            :title="$t('historicalPlans.curePlans.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'curePlanDateFrom'"
            :value="curePlanData.curePlanDateFrom"
            v-on:changeValue="curePlanData.curePlanDateFrom = $event"
            :title="$t('dateFrom')"
            :language="language"
          />
          <TimePicker
            :className="'col-md-6'"
            :id="'curePlanTimeFrom'"
            :value="curePlanData.curePlanTimeFrom"
            v-on:changeValue="curePlanData.curePlanTimeFrom = $event"
            :title="$t('timeFrom')"
            :language="language"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'curePlanDateTo'"
            :value="curePlanData.curePlanDateTo"
            v-on:changeValue="curePlanData.curePlanDateTo = $event"
            :title="$t('dateTo')"
            :language="language"
          />
          <TimePicker
            :className="'col-md-6'"
            :id="'curePlanTimeTo'"
            :value="curePlanData.curePlanTimeTo"
            v-on:changeValue="curePlanData.curePlanTimeTo = $event"
            :title="$t('timeTo')"
            :language="language"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`showTypeToken`"
            :value="curePlanData.showTypeToken"
            :options="listShowTypeTokenOptions"
            v-on:changeValue="curePlanData.showTypeToken = $event"
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
          @click.prevent="addOrUpdateCurePlan"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'CurePlans',
            params: {
              clientToken: curePlanData.clientToken,
              reservationToken: curePlanData.reservationToken,
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
import createToastMixin from "@/utils/create-toast-mixin";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import Client from "@/models/clients/Client";
import DatePicker from "@/components/general/DatePicker.vue";
import TimePicker from "@/components/general/TimePicker.vue";

export default {
  name: "CurePlanForm",
  mixins: [createToastMixin],
  components: {
    CustomSelectBox,
    TextArea,
    DatePicker,
    TimePicker,
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
      requirementsTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
    };
  },
  props: ["curePlanData", "submitName"],
  methods: {
    async addOrUpdateCurePlan() {
      this.$emit("addOrUpdateCurePlan");
    },

    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken = this.curePlanData.clientToken;
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
      this.curePlanData.clientToken = data;
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
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  computed: {},
  async created() {
    this.getDialogOfShowType();
    // this.getDialogOfServicesReservations();
    this.getDialogOfClients();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
  },
};
</script>

<style scoped lang="scss"></style>
