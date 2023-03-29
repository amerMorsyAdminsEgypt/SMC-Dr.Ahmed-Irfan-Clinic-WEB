<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      v-else
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateChamber()"
    >
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="generalSpecialtyTokenOptions.length > 1"
            :className="'col-12'"
            :id="'generalSpecialtyToken'"
            :value="chamberData.generalSpecialtyToken"
            :options="generalSpecialtyTokenOptions"
            v-on:changeValue="chamberData.generalSpecialtyToken = $event"
            :title="$t('selectGeneralSpeciality')"
            :imgName="'general-specialities.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'branchToken'"
            :value="chamberData.branchToken"
            :options="branchTokenOptions"
            v-on:changeValue="
              chamberData.branchToken = $event;
              changeBuilding();
            "
            :title="$t('selectBranch')"
            :imgName="'branches.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'buildingToken'"
            :value="chamberData.buildingToken"
            :options="buildingTokenOptions"
            v-on:changeValue="
              chamberData.buildingToken = $event;
              changeFloor();
            "
            :title="$t('selectBuilding')"
            :imgName="'buildings.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'floorToken'"
            :value="chamberData.floorToken"
            :options="floorTokenOptions"
            v-on:changeValue="chamberData.floorToken = $event"
            :title="$t('selectFloor')"
            :imgName="'floors.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'chamberNameAr'"
            :value="chamberData.chamberNameAr"
            :title="$t('chamberNameAr')"
            :imgName="'chambers.svg'"
            v-on:changeValue="chamberData.chamberNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'chamberNameEn'"
            :value="chamberData.chamberNameEn"
            :title="$t('chamberNameEn')"
            :imgName="'chambers.svg'"
            v-on:changeValue="chamberData.chamberNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'chamberNameUnd'"
            :value="chamberData.chamberNameUnd"
            :title="$t('chamberNameUnd')"
            :imgName="'chambers.svg'"
            v-on:changeValue="chamberData.chamberNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'chamberDescriptionAr'"
            :value="chamberData.chamberDescriptionAr"
            :title="$t('chamberDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="chamberData.chamberDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'chamberDescriptionEn'"
            :value="chamberData.chamberDescriptionEn"
            :title="$t('chamberDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="chamberData.chamberDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'chamberDescriptionUnd'"
            :value="chamberData.chamberDescriptionUnd"
            :title="$t('chamberDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="chamberData.chamberDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'chamberNotes'"
            :value="chamberData.chamberNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="chamberData.chamberNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/chambers" class="btn btn-cancel">
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
  name: "ChamberForm",
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
    };
  },
  props: ["chamberData", "submitName"],
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
      this.chamberData.buildingToken = "";
      this.chamberData.floorToken = "";
      this.getDialogOfBuildings(this.chamberData.branchToken);
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
      this.chamberData.floorToken = "";
      this.getDialogOfFloors(this.chamberData.buildingToken);
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
        this.chamberData.generalSpecialtyToken =
          this.generalSpecialtyTokenOptions[0].value;
      }
      this.isLoading = false;
    },
    async addOrUpdateChamber() {
      this.$emit("addOrUpdateChamber");
    },
  },
  async created() {
    this.getDialogOfBranches();
    this.getDialogOfBuildings(this.chamberData.branchToken);
    this.getDialogOfFloors(this.chamberData.buildingToken);
    this.getDialogOfGeneralSpecialties();
  },
};
</script>
