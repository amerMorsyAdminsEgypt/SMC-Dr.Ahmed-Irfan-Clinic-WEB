<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addOrUpdateFloor()">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-6">
            <b-form-select
              v-model="floorData.branchToken"
              :options="branchTokenOptions"
              @change="changeBuilding()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/branches.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="floorData.buildingToken"
              :options="buildingTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/buildings.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="'floorNameAr'"
            :value="floorData.floorNameAr"
            :title="$t('floorNameAr')"
            :imgName="'floors.svg'"
            v-on:changeValue="floorData.floorNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'floorNameEn'"
            :value="floorData.floorNameEn"
            :title="$t('floorNameEn')"
            :imgName="'floors.svg'"
            v-on:changeValue="floorData.floorNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'floorNameUnd'"
            :value="floorData.floorNameUnd"
            :title="$t('floorNameUnd')"
            :imgName="'floors.svg'"
            v-on:changeValue="floorData.floorNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'floorDescriptionAr'"
            :value="floorData.floorDescriptionAr"
            :title="$t('floorDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="floorData.floorDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'floorDescriptionEn'"
            :value="floorData.floorDescriptionEn"
            :title="$t('floorDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="floorData.floorDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'floorDescriptionUnd'"
            :value="floorData.floorDescriptionUnd"
            :title="$t('floorDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="floorData.floorDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'floorNotes'"
            :value="floorData.floorNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="floorData.floorNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/floors" class="btn btn-cancel">
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
import TextArea from "@/components/general/TextArea.vue";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import axios from "axios";

export default {
  name: "FloorForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
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
    };
  },
  props: ["floorData", "submitName"],
  methods: {
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
    async changeBuilding() {
      this.floorData.buildingToken = "";
      this.getDialogOfBuildings(this.floorData.branchToken);
    },
    async addOrUpdateFloor() {
      this.$emit("addOrUpdateFloor");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfBranches();
    this.getDialogOfBuildings(this.floorData.branchToken);
  },
};
</script>

<style lang="scss"></style>
