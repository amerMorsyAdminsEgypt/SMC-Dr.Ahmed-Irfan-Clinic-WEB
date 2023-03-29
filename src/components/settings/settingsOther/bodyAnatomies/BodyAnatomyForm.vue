<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateBodyAnatomy()"
    >
      <div class="row">
        <div
          class="imgView"
          :style="{ 'background-image': `url(${src})` }"
          :onerror="`this.src='${defaultImg}'`"
          alt="Image"
          @click="selectImage"
        ></div>
        <!-- @input="pickFile" -->
        <input
          ref="fileInput"
          type="file"
          v-on:change="pickFile"
          class="d-none"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <b-form-select
              v-model="bodyAnatomyData.bodyAnatomyTypeToken"
              :options="bodyAnatomyTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/anatomy-types.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="bodyAnatomyData.generalSpecialtyToken"
              :options="generalSpecialtyTokenOptions"
              @change="changeSpecialSpecialty()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/general-specialities.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="bodyAnatomyData.specialSpecialtyToken"
              :options="specialSpecialtyTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/special-spcialities.svg" />
          </div>
          <!-- name -->
          <CustomInput
            :className="'col-md-6'"
            :id="'bodyAnatomyNameAr'"
            :value="bodyAnatomyData.bodyAnatomyNameAr"
            :title="$t('bodyAnatomies.nameAr')"
            :imgName="'anatomy.svg'"
            v-on:changeValue="bodyAnatomyData.bodyAnatomyNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bodyAnatomyNameEn'"
            :value="bodyAnatomyData.bodyAnatomyNameEn"
            :title="$t('bodyAnatomies.nameEn')"
            :imgName="'anatomy.svg'"
            v-on:changeValue="bodyAnatomyData.bodyAnatomyNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'bodyAnatomyNameUnd'"
            :value="bodyAnatomyData.bodyAnatomyNameUnd"
            :title="$t('bodyAnatomies.nameUnd')"
            :imgName="'anatomy.svg'"
            v-on:changeValue="bodyAnatomyData.bodyAnatomyNameUnd = $event"
          />
          <!-- description -->
          <TextArea
            :className="'col-md-6'"
            :id="'bodyAnatomyDescriptionAr'"
            :value="bodyAnatomyData.bodyAnatomyDescriptionAr"
            :title="$t('bodyAnatomies.descriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="bodyAnatomyData.bodyAnatomyDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bodyAnatomyDescriptionEn'"
            :value="bodyAnatomyData.bodyAnatomyDescriptionEn"
            :title="$t('bodyAnatomies.descriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="bodyAnatomyData.bodyAnatomyDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'bodyAnatomyDescriptionUnd'"
            :value="bodyAnatomyData.bodyAnatomyDescriptionUnd"
            :title="$t('bodyAnatomies.descriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              bodyAnatomyData.bodyAnatomyDescriptionUnd = $event
            "
          />
          <TextArea
            :className="'col-md-12'"
            :id="'bodyAnatomyNotes'"
            :value="bodyAnatomyData.bodyAnatomyNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="bodyAnatomyData.bodyAnatomyNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/body-anatomies" class="btn btn-cancel">
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
import DEFAULT_IMG from "@/assets/images/anatomy.svg";
import axios from "axios";

export default {
  name: "BodyAnatomyForm",
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
      defaultImg: DEFAULT_IMG,
      src: this.imageSrc,
      generalSpecialtyTokenOptions: [],
      specialSpecialtyTokenOptions: [],
      // bodyAnatomyProvideTypeTokenOptions: this.$store.getters.userData.constantLists.listBodyAnatomyProvideType,
      bodyAnatomyTypeTokenOptions: [],
    };
  },
  props: ["bodyAnatomyData", "imageSrc", "submitName"],
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.src = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        this.bodyAnatomyData.image = file[0];
      } else {
        this.src = DEFAULT_IMG;
        this.bodyAnatomyData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async changeSector() {
      this.bodyAnatomyData.employeeJobToken = "";
      this.getDialogOfJobs(this.bodyAnatomyData.employeeSectorToken);
    },
    async addOrUpdateBodyAnatomy() {
      this.$emit("addOrUpdateBodyAnatomy", this.bodyAnatomyData);
    },
    async getDialogOfBodyAnatomiesTypes() {
      this.isLoading = true;
      this.bodyAnatomyTypeTokenOptions = [];
      this.bodyAnatomyTypeTokenOptions.push({
        value: "",
        text: this.$t("bodyAnatomyTypes.select"),
      });
      try {
        const response = await axios.get(
          `/BodyAnatomyTypes/GetDialogOfBodyAnatomyTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.bodyAnatomyTypeTokenOptions.push({
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
        this.bodyAnatomyTypeTokenOptions = null;
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
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.generalSpecialtyTokenOptions = null;
      }
      this.isLoading = false;
    },

    async getDialogOfSpecialSpecialties(generalSpecialtyToken) {
      this.isLoading = true;
      generalSpecialtyToken = generalSpecialtyToken
        ? generalSpecialtyToken
        : IMPOSSIBLE_TOKEN;
      this.specialSpecialtyTokenOptions = [];
      this.specialSpecialtyTokenOptions.push({
        value: "",
        text: this.$t("selectSpecialSpecialty"),
      });
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
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.specialSpecialtyTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeSpecialSpecialty() {
      this.bodyAnatomyData.specialSpecialtyToken = "";
      this.getDialogOfSpecialSpecialties(
        this.bodyAnatomyData.generalSpecialtyToken
      );
    },

    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {
    // generalSpecialtyToken: function (v) {
    //   console.log(v);
    //   this.getDialogOfSpecialSpecialties();
    // },
  },
  async created() {
    this.getDialogOfBodyAnatomiesTypes();
    this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties(
      this.bodyAnatomyData.generalSpecialtyToken
    );
  },
};
</script>

<style lang="scss"></style>
