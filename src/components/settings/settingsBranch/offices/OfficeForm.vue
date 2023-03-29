<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      v-else
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateOffice()"
    >
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="generalSpecialtyTokenOptions.length > 1"
            :className="
              specialSpecialtyTokenOptions.length > 1 ? 'col-md-6' : 'col-12'
            "
            :id="'generalSpecialtyToken'"
            :value="officeData.generalSpecialtyToken"
            :options="generalSpecialtyTokenOptions"
            v-on:changeValue="
              officeData.generalSpecialtyToken = $event;
              changeSpecialSpecialty();
            "
            :title="$t('selectGeneralSpeciality')"
            :imgName="'general-specialities.svg'"
          />
          <CustomSelectBox
            v-if="specialSpecialtyTokenOptions.length > 1"
            :className="
              generalSpecialtyTokenOptions.length > 1 ? 'col-md-6' : 'col-12'
            "
            :id="'specialSpecialtyToken'"
            :value="officeData.specialSpecialtyToken"
            :options="specialSpecialtyTokenOptions"
            v-on:changeValue="officeData.specialSpecialtyToken = $event"
            :title="$t('selectSpecialSpecialtyToken')"
            :imgName="'special-spcialities.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'branchToken'"
            :value="officeData.branchToken"
            :options="branchTokenOptions"
            v-on:changeValue="
              officeData.branchToken = $event;
              changeBuilding();
            "
            :title="$t('selectBranch')"
            :imgName="'branches.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'buildingToken'"
            :value="officeData.buildingToken"
            :options="buildingTokenOptions"
            v-on:changeValue="
              officeData.buildingToken = $event;
              changeFloor();
            "
            :title="$t('selectBuilding')"
            :imgName="'buildings.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'floorToken'"
            :value="officeData.floorToken"
            :options="floorTokenOptions"
            v-on:changeValue="
              officeData.floorToken = $event;
              changeChamber();
            "
            :title="$t('selectFloor')"
            :imgName="'floors.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'chamberToken'"
            :value="officeData.chamberToken"
            :options="chamberTokenOptions"
            v-on:changeValue="officeData.chamberToken = $event"
            :title="$t('selectChamber')"
            :imgName="'chambers.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'officeNameAr'"
            :value="officeData.officeNameAr"
            :title="$t('officeNameAr')"
            :imgName="'office.svg'"
            v-on:changeValue="officeData.officeNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'officeNameEn'"
            :value="officeData.officeNameEn"
            :title="$t('officeNameEn')"
            :imgName="'office.svg'"
            v-on:changeValue="officeData.officeNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'officeNameUnd'"
            :value="officeData.officeNameUnd"
            :title="$t('officeNameUnd')"
            :imgName="'office.svg'"
            v-on:changeValue="officeData.officeNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'officeDescriptionAr'"
            :value="officeData.officeDescriptionAr"
            :title="$t('officeDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="officeData.officeDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'officeDescriptionEn'"
            :value="officeData.officeDescriptionEn"
            :title="$t('officeDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="officeData.officeDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'officeDescriptionUnd'"
            :value="officeData.officeDescriptionUnd"
            :title="$t('officeDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="officeData.officeDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'officeNotes'"
            :value="officeData.officeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="officeData.officeNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/offices" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import axios from "axios";

export default {
  name: "OfficeForm",
  components: {
    PreLoader,
    ExceptionWithImg,
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
      branchTokenOptions: [],
      buildingTokenOptions: [],
      floorTokenOptions: [],
      generalSpecialtyTokenOptions: [],
      chamberTokenOptions: [],
      specialSpecialtyTokenOptions: [],
    };
  },
  props: ["officeData", "submitName"],
  methods: {
    async getDialogOfBranches() {
      this.isLoading = true;
      this.branchTokenOptions = [];
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
      this.officeData.buildingToken = "";
      this.officeData.floorToken = "";
      this.officeData.chamberToken = "";
      this.getDialogOfBuildings(this.officeData.branchToken);
    },
    async getDialogOfBuildings(branchToken) {
      this.isLoading = true;
      branchToken = branchToken ? branchToken : IMPOSSIBLE_TOKEN;
      this.buildingTokenOptions = [];
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
      this.officeData.floorToken = "";
      this.officeData.chamberToken = "";
      this.getDialogOfFloors(this.officeData.buildingToken);
    },
    async getDialogOfFloors(buildingToken) {
      this.isLoading = true;
      buildingToken = buildingToken ? buildingToken : IMPOSSIBLE_TOKEN;
      this.floorTokenOptions = [];
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
      this.officeData.chamberToken = "";
      this.getDialogOfChambers(this.officeData.floorToken);
    },
    async getDialogOfChambers(floorToken) {
      this.isLoading = true;
      floorToken = floorToken ? floorToken : IMPOSSIBLE_TOKEN;
      this.chamberTokenOptions = [];
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
    async getDialogOfGeneralSpecialties() {
      this.isLoading = true;
      this.generalSpecialtyTokenOptions = [];
      try {
        const response = await axios.get(
          `/GeneralSpecialties/GetDialogOfGeneralSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.generalSpecialtyTokenOptions.push({
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
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      if (
        this.generalSpecialtyTokenOptions.length == 1 &&
        this.submitName == this.$t("add")
      ) {
        this.officeData.generalSpecialtyToken =
          this.generalSpecialtyTokenOptions[0].value;
        this.getDialogOfSpecialSpecialties(
          this.officeData.generalSpecialtyToken
        );
      }
      this.isLoading = false;
    },
    async changeSpecialSpecialty() {
      this.officeData.specialSpecialtyToken = "";
      this.getDialogOfSpecialSpecialties(this.officeData.generalSpecialtyToken);
    },
    async getDialogOfSpecialSpecialties(generalSpecialtyToken) {
      this.isLoading = true;
      generalSpecialtyToken = generalSpecialtyToken
        ? generalSpecialtyToken
        : IMPOSSIBLE_TOKEN;
      this.specialSpecialtyTokenOptions = [];
      try {
        const response = await axios.get(
          `/SpecialSpecialties/GetDialogOfSpecialSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&generalSpecialtyToken=${generalSpecialtyToken}&filterStatus=true`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.specialSpecialtyTokenOptions.push({
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
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      if (
        this.specialSpecialtyTokenOptions.length == 1 &&
        this.submitName == this.$t("add")
      ) {
        this.officeData.specialSpecialtyToken =
          this.specialSpecialtyTokenOptions[0].value;
      }
      this.isLoading = false;
    },
    async addOrUpdateOffice() {
      this.$emit("addOrUpdateOffice");
    },
  },
  async created() {
    this.getDialogOfBranches();
    this.getDialogOfBuildings(this.officeData.branchToken);
    this.getDialogOfFloors(this.officeData.buildingToken);
    this.getDialogOfChambers(this.officeData.floorToken);
    this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties(this.officeData.generalSpecialtyToken);
  },
};
</script>
