<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li v-if="!hideAddBtn">
        <span class="fab-label">
          <router-link
            :to="{
              name: 'ServicesReservationAdd',
            }"
            class=""
          >
            {{ $t("servicesReservationAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link
            :to="{
              name: 'ServicesReservationAdd',
            }"
            class=""
          >
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="CustomBottomSheet">
      <div class="row">
        <!-- <div class="form-label-group col-md-12">
          <b-form-select
            v-model="filterData.reservationStatusToken"
            :options="reservationStatusTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div> -->
        <DatePicker
          :className="'col-md-6'"
          :id="'dateFrom'"
          :value="filterData.dateFrom"
          v-on:changeValue="filterData.dateFrom = $event"
          :title="$t('dateFrom')"
          :language="language"
        />
        <DatePicker
          :className="'col-md-6'"
          :id="'dateTo'"
          :value="filterData.dateTo"
          v-on:changeValue="filterData.dateTo = $event"
          :title="$t('dateTo')"
          :language="language"
        />
        <TimePicker
          :className="'col-md-6'"
          :id="'timeFrom'"
          :value="filterData.timeFrom"
          v-on:changeValue="filterData.timeFrom = $event"
          :title="$t('timeFrom')"
          :language="language"
        />
        <TimePicker
          :className="'col-md-6'"
          :id="'timeTo'"
          :value="filterData.timeTo"
          v-on:changeValue="filterData.timeTo = $event"
          :title="$t('timeTo')"
          :language="language"
        />

        <CustomSelectBox
          v-if="employeeTypeToken != employeeType.Doctor"
          :className="'col-md-12'"
          :id="'employeeToken'"
          :value="filterData.employeeToken"
          :options="employeeTokenOptions"
          v-on:changeValue="filterData.employeeToken = $event"
          :title="$t('selectDoctor')"
          :imgName="'doctors.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="'clientToken'"
          :value="filterData.clientToken"
          :options="clientTokenOptions"
          v-on:changeValue="changeReservations($event)"
          :title="$t('selectClient')"
          :imgName="'clients.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="'followToreseRvationToken'"
          :value="filterData.followToreseRvationToken"
          :options="reservationTokenOptions"
          v-on:changeValue="filterData.followToreseRvationToken = $event"
          :title="$t('selectReservation')"
          :imgName="'services-reservations.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'dayToken'"
          :value="filterData.dayToken"
          :options="dayTokenOptions"
          v-on:changeValue="filterData.dayToken = $event"
          :title="$t('selectDay')"
          :imgName="'days.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'reservationTypeToken'"
          :value="filterData.reservationTypeToken"
          :options="reservationTypeTokenOptions"
          v-on:changeValue="filterData.reservationTypeToken = $event"
          :title="$t('selectReservationType')"
          :imgName="'type.svg'"
        />

        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="filterData.buildingToken"
            :options="buildingTokenOptions"
            @change="changeFloor()"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/buildings.svg" />
        </div>
        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="filterData.floorToken"
            :options="floorTokenOptions"
            @change="changeChamber()"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/floors.svg" />
        </div>
        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="filterData.chamberToken"
            :options="chamberTokenOptions"
            @change="changeOffice()"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/chambers.svg" />
        </div>
        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="filterData.officeToken"
            :options="officeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/office.svg" />
        </div>

        <CustomInput
          :className="'col-md-12'"
          :id="'textSearch'"
          :value="filterData.textSearch"
          :title="$t('search')"
          :imgName="'search.svg'"
          v-on:changeValue="filterData.textSearch = $event"
        />
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="search"
        >
          {{ $t("search") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
        <button class="btn btn-warning" @click.prevent="reset">
          {{ $t("reset") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import axios from "axios";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import { EMPLOYEE_TYPE, RESERVATION_TYPES } from "@/utils/constantLists";
import { setDataMultiLang } from "@/utils/functions";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import TimePicker from "@/components/general/TimePicker.vue";
import Client from "@/models/clients/Client";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationFloatBtns",
  mixins: [createToastMixin],
  props: {
    filterServicesReservationData: {
      type: Object,
    },
    hideAddBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      employeeTypeToken:
        this.$store.getters.userData.employeePersonalData.employeeTypeToken ||
        null,
      employeeType: EMPLOYEE_TYPE,
      filterData: this.filterServicesReservationData,
      reservationStatusTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
      employeeTokenOptions: [],
      dayTokenOptions: [],
      branchTokenOptions: [],
      buildingTokenOptions: [],
      floorTokenOptions: [],
      chamberTokenOptions: [],
      officeTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      reservationTypeTokenOptions: [],
    };
  },
  components: {
    CustomInput,
    CustomSelectBox,
    DatePicker,
    TimePicker,
  },
  methods: {
    async getDialogOfBuildings() {
      this.isLoading = true;
      this.buildingTokenOptions = [];
      this.buildingTokenOptions.push({
        value: "",
        text: this.$t("selectBuilding"),
      });
      try {
        const response = await axios.get(
          `/Buildings/GetDialogOfBuildings?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.buildingTokenOptions.push({
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
        this.buildingTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeFloor() {
      this.filterServicesReservationData.floorToken = "";
      this.filterServicesReservationData.chamberToken = "";
      this.getDialogOfFloors(this.filterServicesReservationData.buildingToken);
    },
    async getDialogOfFloors(buildingToken) {
      this.isLoading = true;
      buildingToken = buildingToken ? buildingToken : IMPOSSIBLE_TOKEN;
      this.floorTokenOptions = [];
      this.floorTokenOptions.push({
        value: "",
        text: this.$t("selectFloor"),
      });
      try {
        const response = await axios.get(
          `/Floors/GetDialogOfFloors?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&buildingToken=${buildingToken}&filterStatus=true`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.floorTokenOptions.push({
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
        this.floorTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeChamber() {
      this.filterServicesReservationData.chamberToken = "";
      this.getDialogOfChambers(this.filterServicesReservationData.floorToken);
    },
    async getDialogOfChambers(floorToken) {
      this.isLoading = true;
      floorToken = floorToken ? floorToken : IMPOSSIBLE_TOKEN;
      this.chamberTokenOptions = [];
      this.chamberTokenOptions.push({
        value: "",
        text: this.$t("selectChamber"),
      });
      try {
        const response = await axios.get(
          `/Chambers/GetDialogOfChambers?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&floorToken=${floorToken}&filterStatus=true`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.chamberTokenOptions.push({
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
        this.chamberTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeOffice() {
      this.filterServicesReservationData.officeToken = "";
      this.getDialogOfOffices(this.filterServicesReservationData.chamberToken);
    },
    async getDialogOfOffices(chamberToken) {
      this.isLoading = true;
      chamberToken = chamberToken ? chamberToken : IMPOSSIBLE_TOKEN;
      this.officeTokenOptions = [];
      this.officeTokenOptions.push({
        value: "",
        text: this.$t("selectOffice"),
      });
      try {
        const response = await axios.get(
          `/Office/GetDialogOfOffices?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&chamberToken=${chamberToken}&filterStatus=true`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.officeTokenOptions.push({
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
        this.officeTokenOptions = null;
      }
      this.isLoading = false;
    },
    open() {
      this.$refs.CustomBottomSheet.open();
    },
    close() {
      this.$refs.CustomBottomSheet.close();
    },
    reset() {
      let reservationStatusToken = this.filterData.reservationStatusToken;
      this.filterData.setInitialValue();
      this.filterData.reservationStatusToken = reservationStatusToken;
    },
    search() {
      this.close();
      this.$emit("search", this.filterData);
    },
    async getDialogOfReservationsStatusTypes() {
      this.isLoading = true;
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
    async getDialogOfDoctors() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("selectDoctor"),
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
    async getDialogOfDays() {
      this.isLoading = true;
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
      this.isLoading = false;
    },
    changeReservations(data) {
      this.filterData.clientToken = data;
      this.filterData.followToreseRvationToken = "";
      this.getDialogOfServicesReservations();
    },
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken = this.filterData.clientToken;
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
    async getDialogOfServicesReservationTypes() {
      this.isLoading = true;
      this.reservationTypeTokenOptions = [];
      this.reservationTypeTokenOptions.push({
        value: "",
        text: this.$t("selectReservationType"),
      });
      let items =
        this.$store.getters.userData.constantLists.listServicesReservationType;
      for (let item in items) {
        this.reservationTypeTokenOptions.push({
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
  },
  async created() {
    this.getDialogOfBuildings();
    this.getDialogOfFloors(this.filterServicesReservationData.buildingToken);
    this.getDialogOfChambers(this.filterServicesReservationData.floorToken);
    this.getDialogOfOffices(this.filterServicesReservationData.chamberToken);
    this.getDialogOfReservationsStatusTypes();
    this.getDialogOfDays();
    this.getDialogOfClients();
    if (this.employeeTypeToken != EMPLOYEE_TYPE.Doctor)
      this.getDialogOfDoctors();
    this.reservationData.reservationTypeToken =
      RESERVATION_TYPES.mainReservation;
    this.getDialogOfServicesReservations();
    this.getDialogOfServicesReservationTypes();
  },
};
</script>
