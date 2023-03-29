<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateOfficeTime()"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-6">
            <b-form-select
              v-model="officesTimeData.branchToken"
              :options="branchTokenOptions"
              @change="changeBuilding()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/branches.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="officesTimeData.buildingToken"
              :options="buildingTokenOptions"
              @change="changeFloor()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/buildings.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="officesTimeData.floorToken"
              :options="floorTokenOptions"
              @change="changeChamber()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/floors.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="officesTimeData.chamberToken"
              :options="chamberTokenOptions"
              @change="changeOffice()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/chambers.svg" />
          </div>
          <div class="form-label-group col-4">
            <b-form-select
              v-model="officesTimeData.officeToken"
              :options="officeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/office.svg" />
          </div>
          <div class="form-label-group col-4">
            <b-form-select
              v-model="officesTimeData.employeeToken"
              :options="employeeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/employees.svg" />
          </div>
          <!-- <CustomInputFloat
            :className="'col-4'"
            :id="'serviceResponsiblePercentage'"
            :value="officesTimeData.serviceResponsiblePercentage"
            :title="$t('serviceResponsiblePercentage')"
            :imgName="'maxDiscountPercentage.svg'"
            v-on:changeValue="
              officesTimeData.serviceResponsiblePercentage = $event
            "
          /> -->
          <div class="form-label-group col-4">
            <b-form-select
              v-model="officesTimeData.dayToken"
              :options="dayTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/days.svg" />
          </div>
          <TimePicker
            :className="'col-md-4'"
            :value="officesTimeData.officeOpenTime"
            v-on:changeValue="officesTimeData.officeOpenTime = $event"
            :title="$t('startWorkTime')"
            :language="language"
          />
          <TimePicker
            :className="'col-md-4'"
            :value="officesTimeData.officeCloseTime"
            v-on:changeValue="officesTimeData.officeCloseTime = $event"
            :title="$t('endWorkTime')"
            :language="language"
          />

          <CustomCheckbox
            :className="'col-md-4'"
            :value="officesTimeData.reservationShowStatus"
            :title="$t('reservationShowStatus')"
            v-on:changeValue="officesTimeData.reservationShowStatus = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'officeNotes'"
            :value="officesTimeData.officeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="officesTimeData.officeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/offices-times" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import TextArea from "@/components/general/TextArea.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
// import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import TimePicker from "@/components/general/TimePicker.vue";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import axios from "axios";

export default {
  name: "OfficesTimeForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    TextArea,
    CustomCheckbox,
    // CustomInputFloat,
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
      employeeTokenOptions: [],
      branchTokenOptions: [],
      buildingTokenOptions: [],
      floorTokenOptions: [],
      generalSpecialtyTokenOptions: [],
      chamberTokenOptions: [],
      officeTokenOptions: [],
      dayTokenOptions: [],
    };
  },
  props: ["officesTimeData", "submitName"],
  methods: {
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
        this.employeeTokenOptions = null;
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
        const response = await axios.get(
          `/Branches/GetDialogOfBranches?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.branchTokenOptions.push({
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
        this.branchTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeBuilding() {
      this.officesTimeData.buildingToken = "";
      this.officesTimeData.floorToken = "";
      this.officesTimeData.chamberToken = "";
      this.getDialogOfBuildings(this.officesTimeData.branchToken);
    },
    async getDialogOfBuildings(branchToken) {
      this.isLoading = true;
      branchToken = branchToken ? branchToken : IMPOSSIBLE_TOKEN;
      this.buildingTokenOptions = [];
      this.buildingTokenOptions.push({
        value: "",
        text: this.$t("selectBuilding"),
      });
      try {
        const response = await axios.get(
          `/Buildings/GetDialogOfBuildings?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&branchToken=${branchToken}&filterStatus=true`
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
      this.officesTimeData.floorToken = "";
      this.officesTimeData.chamberToken = "";
      this.getDialogOfFloors(this.officesTimeData.buildingToken);
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
      this.officesTimeData.chamberToken = "";
      this.getDialogOfChambers(this.officesTimeData.floorToken);
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
      this.officesTimeData.officeToken = "";
      this.getDialogOfOffices(this.officesTimeData.chamberToken);
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
    async getDialogOfDays() {
      this.isLoading = true;
      this.dayTokenOptions = [];
      this.dayTokenOptions.push({
        value: "",
        text: this.$t("selectDay"),
      });
      const itemsData =
        this.$store.getters.userData.constantLists.listDaysOfWeekData;
      if (itemsData.length > 0) {
        for (let item in itemsData) {
          this.dayTokenOptions.push({
            value: itemsData[item]["itemToken"],
            text:
              this.language == "en"
                ? itemsData[item]["itemNameEn"]
                : itemsData[item]["itemNameAr"],
          });
        }
      } else {
        this.$store.dispatch("updateUserData", null);
        this.$router.push("/").catch(() => {});
      }
      this.isLoading = false;
    },

    async addOrUpdateOfficeTime() {
      this.$emit("addOrUpdateOfficeTime");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfEmployees();
    this.getDialogOfBranches();
    this.getDialogOfBuildings(this.officesTimeData.branchToken);
    this.getDialogOfFloors(this.officesTimeData.buildingToken);
    this.getDialogOfChambers(this.officesTimeData.floorToken);
    this.getDialogOfOffices(this.officesTimeData.chamberToken);
    this.getDialogOfDays();
  },
};
</script>

<style lang="scss"></style>
