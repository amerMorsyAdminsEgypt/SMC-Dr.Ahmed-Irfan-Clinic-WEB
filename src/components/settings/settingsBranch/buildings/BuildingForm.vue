<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateBuilding()"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <b-form-select
              v-model="buildingData.branchToken"
              :options="branchTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/branches.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="'buildingNameAr'"
            :value="buildingData.buildingNameAr"
            :title="$t('buildingNameAr')"
            :imgName="'buildings.svg'"
            v-on:changeValue="buildingData.buildingNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'buildingNameEn'"
            :value="buildingData.buildingNameEn"
            :title="$t('buildingNameEn')"
            :imgName="'buildings.svg'"
            v-on:changeValue="buildingData.buildingNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'buildingNameUnd'"
            :value="buildingData.buildingNameUnd"
            :title="$t('buildingNameUnd')"
            :imgName="'buildings.svg'"
            v-on:changeValue="buildingData.buildingNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'buildingDescriptionAr'"
            :value="buildingData.buildingDescriptionAr"
            :title="$t('buildingDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="buildingData.buildingDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'buildingDescriptionEn'"
            :value="buildingData.buildingDescriptionEn"
            :title="$t('buildingDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="buildingData.buildingDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'buildingDescriptionUnd'"
            :value="buildingData.buildingDescriptionUnd"
            :title="$t('buildingDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="buildingData.buildingDescriptionUnd = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'buildingNotes'"
            :value="buildingData.buildingNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="buildingData.buildingNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/buildings" class="btn btn-cancel">
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
import { STATUS } from "@/utils/constants";
import axios from "axios";

export default {
  name: "BuildingForm",
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
    };
  },
  props: ["buildingData", "submitName"],
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
    async addOrUpdateBuilding() {
      this.$emit("addOrUpdateBuilding");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfBranches();
  },
};
</script>

<style lang="scss"></style>
