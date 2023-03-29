<template>
  <div class="fab-container">
    <PreLoader v-if="isLoading" />
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="EmployeeBottomSheet" max-width="80%">
      <div class="row">
        <CustomCheckbox
          :className="'col-md-6'"
          :value="filterData.sortBySumEmployeeBenefitValue"
          v-on:changeValue="filterData.sortBySumEmployeeBenefitValue = $event"
          :title="$t('binfitFilter.sortBySumEmployeeBenefitValue')"
        />
        <CustomCheckbox
          :className="'col-md-6'"
          :value="filterData.employeesHaveBenefitStatus"
          v-on:changeValue="filterData.employeesHaveBenefitStatus = $event"
          :title="$t('binfitFilter.employeesHaveBenefitStatus')"
        />

        <CustomInput
          :className="'col-md-12'"
          :id="'textSearch'"
          :value="filterData.textSearch"
          v-on:changeValue="filterData.textSearch = $event"
          :title="$t('search')"
          :imgName="'search.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'employeeTypeToken'"
          :value="filterData.employeeTypeToken"
          :options="employeeTypeTokenOptions"
          v-on:changeValue="employeeTypeChanged($event)"
          :title="$t('selectEmployeeType')"
          :imgName="'employees.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'employeeToken'"
          :value="filterData.employeeToken"
          :options="employeeTokenOptions"
          v-on:changeValue="filterData.employeeToken = $event"
          :title="$t('selectEmployee')"
          :imgName="'employees.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'serviceTypeToken'"
          :value="serviceTypeToken"
          :options="serviceTypeTokenOptions"
          v-on:changeValue="
            serviceTypeToken = $event;
            getDialogOfServices();
          "
          :title="$t('selectServiceType')"
          :imgName="'services-types.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'serviceToken'"
          :value="filterData.serviceToken"
          :options="serviceTokenOptions"
          v-on:changeValue="filterData.serviceToken = $event"
          :title="$t('selectService')"
          :imgName="'services.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'generalSpecialtyToken'"
          :value="filterData.generalSpecialtyToken"
          :options="generalSpecialtyTokenOptions"
          v-on:changeValue="
            filterData.generalSpecialtyToken = $event;
            getDialogOfSpecialSpecialties();
          "
          :title="$t('selectGeneralSpecialty')"
          :imgName="'general-specialities.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'specialSpecialtyToken'"
          :value="filterData.specialSpecialtyToken"
          :options="specialSpecialtyTokenOptions"
          v-on:changeValue="filterData.specialSpecialtyToken = $event"
          :title="$t('selectSpecialSpecialty')"
          :imgName="'special-spcialities.svg'"
        />

        <CustomSelectBox
          :className="'col-md-12'"
          :id="'branchToken'"
          :value="filterData.branchToken"
          :options="branchTokenOptions"
          v-on:changeValue="branchChanged($event)"
          :title="$t('selectBranch')"
          :imgName="'branches.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'buildingToken'"
          :value="filterData.buildingToken"
          :options="buildingTokenOptions"
          v-on:changeValue="buildingChanged($event)"
          :title="$t('selectBuilding')"
          :imgName="'buildings.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'floorToken'"
          :value="filterData.floorToken"
          :options="floorTokenOptions"
          v-on:changeValue="floorChanged($event)"
          :title="$t('selectFloor')"
          :imgName="'floors.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="'chamberToken'"
          :value="filterData.chamberToken"
          :options="chamberTokenOptions"
          v-on:changeValue="chamberChanged($event)"
          :title="$t('selectChamber')"
          :imgName="'chambers.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="'officeToken'"
          :value="filterData.officeToken"
          :options="officeTokenOptions"
          v-on:changeValue="filterData.officeToken = $event"
          :title="$t('selectOffice')"
          :imgName="'office.svg'"
        />

        <DatePicker
          :className="'col-md-6'"
          :id="'dateTimeFrom'"
          :value="filterData.dateTimeFrom"
          v-on:changeValue="filterData.dateTimeFrom = $event"
          :title="$t('dateFrom')"
          :language="language"
        />
        <DatePicker
          :className="'col-md-6'"
          :id="'dateTimeTo'"
          :value="filterData.dateTimeTo"
          v-on:changeValue="filterData.dateTimeTo = $event"
          :title="$t('dateTo')"
          :language="language"
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
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import ServicesType from "@/models/settings/settingsOther/servicesTypes/ServicesType";
import Service from "@/models/settings/settingsOther/services/Service";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import PreLoader from "@/components/general/PreLoader.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import SpecialSpecialty from "@/models/settings/settingsOther/specialSpecialties/SpecialSpecialty";
import Branch from "@/models/branches/Branch";
import Building from "@/models/settings/settingsBranch/buildings/Building";
import Floor from "@/models/settings/settingsBranch/floors/Floor";
import Chamber from "@/models/settings/settingsBranch/chambers/Chamber";
import Office from "@/models/settings/settingsBranch/offices/Office";
import { setDataMultiLang } from "@/utils/functions";

export default {
  name: "filter",
  components: {
    CustomSelectBox,
    PreLoader,
    CustomCheckbox,
    DatePicker,
    CustomInput,
  },
  props: {
    filterData: {
      type: Object,
    },
  },
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      serviceTypeToken: "",
      employeeTypeTokenOptions: [],
      employeeTokenOptions: [],
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
    };
  },
  methods: {
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    async getDialogOfEmployeeTypes() {
      this.isLoading = true;
      this.employeeTypeTokenOptions = [];
      this.employeeTypeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployeeType"),
      });
      let items = this.$store.getters.userData.constantLists.listEmployeeType;
      for (let item in items) {
        this.employeeTypeTokenOptions.push({
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
    async getDialogOfEmployees() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployee"),
      });

      try {
        const response = await axios.get(
          `/Employees/GetDialogOfEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&employeeTypeToken=${this.filterData.employeeTypeToken}`
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
        this.serviceData.serviceTypeToken = this.serviceTypeToken;
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
          this.filterData.generalSpecialtyToken;
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
        this.buildingData.branchToken = this.filterData.branchToken;
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
        this.floorData.branchToken = this.filterData.branchToken;
        this.floorData.buildingToken = this.filterData.buildingToken;
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
        this.chamberData.branchToken = this.filterData.branchToken;
        this.chamberData.buildingToken = this.filterData.buildingToken;
        this.chamberData.floorToken = this.filterData.floorToken;
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
        this.officeData.branchToken = this.filterData.branchToken;
        this.officeData.buildingToken = this.filterData.buildingToken;
        this.officeData.floorToken = this.filterData.floorToken;
        this.officeData.chamberToken = this.filterData.chamberToken;
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

    employeeTypeChanged(data) {
      this.filterData.employeeTypeToken = data;
      this.filterData.employeeToken = "";
      this.getDialogOfEmployees();
    },

    branchChanged(data) {
      this.filterData.branchToken = data;
      this.filterData.buildingToken = "";
      this.getDialogOfBuildings();
    },
    buildingChanged(data) {
      this.filterData.buildingToken = data;
      this.filterData.floorToken = "";
      this.getDialogOfFloors();
    },
    floorChanged(data) {
      this.filterData.floorToken = data;
      this.filterData.chamberToken = "";
      this.getDialogOfChambers();
    },
    chamberChanged(data) {
      this.filterData.chamberToken = data;
      this.filterData.officeToken = "";
      this.getDialogOfOffices();
    },

    open() {
      this.$refs.EmployeeBottomSheet.open();
    },
    close() {
      this.$refs.EmployeeBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit("search", this.filterData);
    },
  },
  async created() {
    this.getDialogOfEmployeeTypes();
    this.getDialogOfEmployees();
    this.getDialogOfServicesTypes();
    this.getDialogOfServices();
    this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties();
    this.getDialogOfBranches();
    this.getDialogOfBuildings();
    this.getDialogOfFloors();
    this.getDialogOfChambers();
    this.getDialogOfOffices();
  },
};
</script>
