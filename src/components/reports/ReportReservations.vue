<template>
  <div>
    <PreLoader v-if="isLoading" />
    <div class="reports-card">
      <a v-b-modal.ReportReservations @click="getAllDialogs()" class="">
        <img src="@/assets/images/services-reservations.svg" />{{
          $t("servicesReservations")
        }}
      </a>
    </div>

    <b-modal id="ReportReservations" scrollable centered size="lg" hide-footer>
      <template #modal-title>
        <h3>
          <img
            src="@/assets/images/services-reservations.svg"
            class="icon-lg"
          />
          {{ $t("servicesReservations") }}
        </h3>
      </template>

      <form autocomplete="off" method="post">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'employeeToken'"
            :value="reservationData.employeeToken"
            :options="employeeTokenOptions"
            v-on:changeValue="reservationData.employeeToken = $event"
            :title="$t('selectEmployee')"
            :imgName="'employees.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="reservationData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="reservationData.clientToken = $event"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationStatusToken'"
            :value="reservationData.reservationStatusToken"
            :options="reservationStatusTokenOptions"
            v-on:changeValue="reservationData.reservationStatusToken = $event"
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'serviceTypeToken'"
            :value="reservationData.serviceTypeToken"
            :options="serviceTypeTokenOptions"
            v-on:changeValue="serviceTypeChanged($event)"
            :title="$t('selectServiceType')"
            :imgName="'services-types.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'serviceToken'"
            :value="reservationData.serviceToken"
            :options="serviceTokenOptions"
            v-on:changeValue="reservationData.serviceToken = $event"
            :title="$t('selectService')"
            :imgName="'services.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'generalSpecialtyToken'"
            :value="reservationData.generalSpecialtyToken"
            :options="generalSpecialtyTokenOptions"
            v-on:changeValue="generalSpecialtyChanged($event)"
            :title="$t('selectGeneralSpecialty')"
            :imgName="'general-specialities.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'specialSpecialtyToken'"
            :value="reservationData.specialSpecialtyToken"
            :options="specialSpecialtyTokenOptions"
            v-on:changeValue="reservationData.specialSpecialtyToken = $event"
            :title="$t('selectSpecialSpecialty')"
            :imgName="'special-spcialities.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'dayToken'"
            :value="reservationData.dayToken"
            :options="dayTokenOptions"
            v-on:changeValue="reservationData.dayToken = $event"
            :title="$t('selectDay')"
            :imgName="'days.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'feesTypeToken'"
            :value="reservationData.feesTypeToken"
            :options="feesTypeTokenOptions"
            v-on:changeValue="reservationData.feesTypeToken = $event"
            :title="$t('selectFeesType')"
            :imgName="'type.svg'"
          />

          <CustomSelectBox
            :className="'col-md-12'"
            :id="'branchToken'"
            :value="reservationData.branchToken"
            :options="branchTokenOptions"
            v-on:changeValue="branchChanged($event)"
            :title="$t('selectBranch')"
            :imgName="'branches.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'buildingToken'"
            :value="reservationData.buildingToken"
            :options="buildingTokenOptions"
            v-on:changeValue="buildingChanged($event)"
            :title="$t('selectBuilding')"
            :imgName="'buildings.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'floorToken'"
            :value="reservationData.floorToken"
            :options="floorTokenOptions"
            v-on:changeValue="floorChanged($event)"
            :title="$t('selectFloor')"
            :imgName="'floors.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'chamberToken'"
            :value="reservationData.chamberToken"
            :options="chamberTokenOptions"
            v-on:changeValue="chamberChanged($event)"
            :title="$t('selectChamber')"
            :imgName="'chambers.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'officeToken'"
            :value="reservationData.officeToken"
            :options="officeTokenOptions"
            v-on:changeValue="officeChanged($event)"
            :title="$t('selectOffice')"
            :imgName="'office.svg'"
          />

          <CustomSelectBox
            :className="'col-md-12'"
            :id="'officeTimeToken'"
            :value="reservationData.officeTimeToken"
            :options="officeTimeTokenOptions"
            v-on:changeValue="reservationData.officeTimeToken = $event"
            :title="$t('selectReservationTime')"
            :imgName="'office-time.svg'"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'dateFrom'"
            :value="reservationData.dateFrom"
            v-on:changeValue="reservationData.dateFrom = $event"
            :title="$t('dateFrom')"
            :language="language"
          />
          <DatePicker
            :className="'col-md-6'"
            :id="'dateTo'"
            :value="reservationData.dateTo"
            v-on:changeValue="reservationData.dateTo = $event"
            :title="$t('dateTo')"
            :language="language"
          />

          <CustomInput
            :className="'col-md-12'"
            :id="'sendTo'"
            :value="reservationData.sendTo"
            v-on:changeValue="reservationData.sendTo = $event"
            :title="$t('email')"
            :imgName="'email.svg'"
          />
          <CustomInput
            :className="'col-md-12'"
            :id="'textSearch'"
            :value="reservationData.textSearch"
            v-on:changeValue="reservationData.textSearch = $event"
            :title="$t('search')"
            :imgName="'search.svg'"
          />
        </div>

        <div class="modal-footer">
          <button
            name="submit"
            type="submit"
            class="btn btn-submit"
            @click.prevent="getAllServicesReservationsReport()"
          >
            {{ $t("viewAndSend") }}
          </button>
          <button
            name="submit"
            type="submit"
            class="btn btn-cancel"
            @click.prevent="$bvModal.hide('ReportReservations')"
          >
            {{ $t("cancel") }}
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import { STATUS } from "@/utils/constants";
import { setDataMultiLang } from "@/utils/functions";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import Client from "@/models/clients/Client";
import ServicesType from "@/models/settings/settingsOther/servicesTypes/ServicesType";
import Service from "@/models/settings/settingsOther/services/Service";
import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import SpecialSpecialty from "@/models/settings/settingsOther/specialSpecialties/SpecialSpecialty";
import Branch from "@/models/branches/Branch";
import Building from "@/models/settings/settingsBranch/buildings/Building";
import Floor from "@/models/settings/settingsBranch/floors/Floor";
import Chamber from "@/models/settings/settingsBranch/chambers/Chamber";
import Office from "@/models/settings/settingsBranch/offices/Office";
import OfficeTime from "@/models/settings/settingsBranch/officesTimes/OfficeTime";
import createToastMixin from "@/utils/create-toast-mixin";
import axios from "axios";

export default {
  name: "ReportReservations",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomSelectBox,
    DatePicker,
  },
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      opendStatus: false,
      reservationData: new ServicesReservation(),
      clientData: new Client(),
      clientTokenOptions: [],
      employeeTokenOptions: [],
      reservationStatusTokenOptions: [],
      servicesTypeData: new ServicesType(),
      serviceTypeTokenOptions: [],
      serviceData: new Service(),
      serviceTokenOptions: [],
      generalSpecialtyData: new GeneralSpecialty(),
      generalSpecialtyTokenOptions: [],
      specialSpecialtyData: new SpecialSpecialty(),
      specialSpecialtyTokenOptions: [],
      branchData: new Branch(),
      branchTokenOptions: [],
      buildingData: new Building(),
      buildingTokenOptions: [],
      floorData: new Floor(),
      floorTokenOptions: [],
      chamberData: new Chamber(),
      chamberTokenOptions: [],
      officeData: new Office(),
      officeTokenOptions: [],
      officeTimeData: new OfficeTime(),
      officeTimeTokenOptions: [],
      dayTokenOptions: [],
      feesTypeTokenOptions: [],
    };
  },
  methods: {
    async getAllServicesReservationsReport() {
      this.isLoading = true;
      try {
        let response =
          await this.reservationData.getAllServicesReservationsReport(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ReportReservations");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfEmployees() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployee"),
      });
      try {
        const response = await axios.get(
          `/Employees/GetDialogOfEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeTokenOptions.push({
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
    async getDialogOfServicesTypes() {
      this.isLoading = true;
      this.serviceTypeTokenOptions = [];
      this.serviceTypeTokenOptions.push({
        value: "",
        text: this.$t("selectServiceType"),
      });
      try {
        let response = await this.servicesTypeData.getDialogOfServicesTypes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.serviceTypeTokenOptions.push({
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
    async getDialogOfServices() {
      this.isLoading = true;
      this.serviceTokenOptions = [];
      this.serviceTokenOptions.push({
        value: "",
        text: this.$t("selectService"),
      });
      try {
        this.serviceData.serviceTypeToken =
          this.reservationData.serviceTypeToken;
        let response = await this.serviceData.getDialogOfServices(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.serviceTokenOptions.push({
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
    async getDialogOfGeneralSpecialties() {
      this.isLoading = true;
      this.generalSpecialtyTokenOptions = [];
      this.generalSpecialtyTokenOptions.push({
        value: "",
        text: this.$t("selectGeneralSpecialty"),
      });
      try {
        let response =
          await this.generalSpecialtyData.getDialogOfGeneralSpecialties(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.generalSpecialtyTokenOptions.push({
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
    async getDialogOfSpecialSpecialties() {
      this.isLoading = true;
      this.specialSpecialtyTokenOptions = [];
      this.specialSpecialtyTokenOptions.push({
        value: "",
        text: this.$t("selectSpecialSpecialty"),
      });
      try {
        this.specialSpecialtyData.generalSpecialtyToken =
          this.reservationData.generalSpecialtyToken;
        let response =
          await this.specialSpecialtyData.getDialogOfSpecialSpecialties(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.specialSpecialtyTokenOptions.push({
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
    async getDialogOfBranches() {
      this.isLoading = true;
      this.branchTokenOptions = [];
      this.branchTokenOptions.push({
        value: "",
        text: this.$t("selectBranch"),
      });
      try {
        let response = await this.branchData.getDialogOfBranches(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.branchTokenOptions.push({
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
    async getDialogOfBuildings() {
      this.isLoading = true;
      this.buildingTokenOptions = [];
      this.buildingTokenOptions.push({
        value: "",
        text: this.$t("selectBuilding"),
      });
      try {
        this.buildingData.branchToken = this.reservationData.branchToken;
        let response = await this.buildingData.getDialogOfBuildings(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.buildingTokenOptions.push({
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
    async getDialogOfFloors() {
      this.isLoading = true;
      this.floorTokenOptions = [];
      this.floorTokenOptions.push({
        value: "",
        text: this.$t("selectFloor"),
      });
      try {
        this.floorData.branchToken = this.reservationData.branchToken;
        this.floorData.buildingToken = this.reservationData.buildingToken;
        let response = await this.floorData.getDialogOfFloors(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.floorTokenOptions.push({
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
    async getDialogOfChambers() {
      this.isLoading = true;
      this.chamberTokenOptions = [];
      this.chamberTokenOptions.push({
        value: "",
        text: this.$t("selectChamber"),
      });
      try {
        this.chamberData.branchToken = this.reservationData.branchToken;
        this.chamberData.buildingToken = this.reservationData.buildingToken;
        this.chamberData.floorToken = this.reservationData.floorToken;
        let response = await this.chamberData.getDialogOfChambers(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.chamberTokenOptions.push({
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
    async getDialogOfOffices() {
      this.isLoading = true;
      this.officeTokenOptions = [];
      this.officeTokenOptions.push({
        value: "",
        text: this.$t("selectOffice"),
      });
      try {
        this.officeData.branchToken = this.reservationData.branchToken;
        this.officeData.buildingToken = this.reservationData.buildingToken;
        this.officeData.floorToken = this.reservationData.floorToken;
        this.officeData.chamberToken = this.reservationData.chamberToken;
        let response = await this.officeData.getDialogOfOffices(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.officeTokenOptions.push({
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
    async getDialogOfOfficesTimes() {
      this.isLoading = true;
      this.officeTimeTokenOptions = [];
      this.officeTimeTokenOptions.push({
        value: "",
        text: this.$t("selectReservationTime"),
      });
      try {
        this.officeTimeData.branchToken = this.reservationData.branchToken;
        this.officeTimeData.buildingToken = this.reservationData.buildingToken;
        this.officeTimeData.floorToken = this.reservationData.floorToken;
        this.officeTimeData.chamberToken = this.reservationData.chamberToken;
        this.officeTimeData.officeToken = this.reservationData.officeToken;
        let response = await this.officeTimeData.getDialogOfOfficesTimes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.officeTimeTokenOptions.push({
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
    getDialogOfReservationsStatusTypes() {
      this.reservationStatusTokenOptions = [];
      this.reservationStatusTokenOptions.push({
        value: "",
        text: this.$t("selectReservationStatus"),
      });
      let items =
        this.$store.getters.userData.constantLists.listReservationsStatusTypes;
      for (let item in items) {
        this.reservationStatusTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
    },
    getDialogOfDays() {
      this.dayTokenOptions = [];
      this.dayTokenOptions.push({
        value: "",
        text: this.$t("selectDay"),
      });
      let days = this.$store.getters.userData.constantLists.listDaysOfWeekData;
      for (let item in days) {
        this.dayTokenOptions.push({
          value: days[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            days[item]["itemNameAr"],
            days[item]["itemNameEn"]
          ),
        });
      }
    },
    getDialogOfFeesTypes() {
      this.feesTypeTokenOptions = [];
      this.feesTypeTokenOptions.push({
        value: "",
        text: this.$t("selectFeesType"),
      });
      let items = this.$store.getters.userData.constantLists.listFeesType;
      for (let item in items) {
        this.feesTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
    },
    serviceTypeChanged(data) {
      this.reservationData.serviceTypeToken = data;
      this.reservationData.serviceToken = "";
      this.getDialogOfServices();
    },
    generalSpecialtyChanged(data) {
      this.reservationData.generalSpecialtyToken = data;
      this.reservationData.specialSpecialtyToken = "";
      this.getDialogOfSpecialSpecialties();
    },
    branchChanged(data) {
      this.reservationData.branchToken = data;
      this.reservationData.buildingToken = "";
      this.getDialogOfBuildings();
    },
    buildingChanged(data) {
      this.reservationData.buildingToken = data;
      this.reservationData.floorToken = "";
      this.getDialogOfFloors();
    },
    floorChanged(data) {
      this.reservationData.floorToken = data;
      this.reservationData.chamberToken = "";
      this.getDialogOfChambers();
    },
    chamberChanged(data) {
      this.reservationData.chamberToken = data;
      this.reservationData.officeToken = "";
      this.getDialogOfOffices();
    },
    officeChanged(data) {
      this.reservationData.officeToken = data;
      this.reservationData.officeTimeToken = "";
      this.getDialogOfOfficesTimes();
    },
    getAllDialogs() {
      if (!this.opendStatus) {
        this.opendStatus = true;
        this.getDialogOfEmployees();
        this.getDialogOfClients();
        this.getDialogOfServicesTypes();
        this.getDialogOfServices();
        this.getDialogOfGeneralSpecialties();
        this.getDialogOfSpecialSpecialties();
        this.getDialogOfBranches();
        this.getDialogOfBuildings();
        this.getDialogOfFloors();
        this.getDialogOfChambers();
        this.getDialogOfOffices();
        this.getDialogOfOfficesTimes();
        this.getDialogOfReservationsStatusTypes();
        this.getDialogOfDays();
        this.getDialogOfFeesTypes();
      }
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  computed: {},
  async created() {},
};
</script>
