<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      v-else
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateService()"
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
          <CustomSelectBox
            v-if="generalSpecialtyTokenOptions.length > 1"
            :className="
              specialSpecialtyTokenOptions.length > 1 ? 'col-md-6' : 'col-12'
            "
            :id="'generalSpecialtyToken'"
            :value="serviceData.generalSpecialtyToken"
            :options="generalSpecialtyTokenOptions"
            v-on:changeValue="
              serviceData.generalSpecialtyToken = $event;
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
            :value="serviceData.specialSpecialtyToken"
            :options="specialSpecialtyTokenOptions"
            v-on:changeValue="serviceData.specialSpecialtyToken = $event"
            :title="$t('selectSpecialSpecialtyToken')"
            :imgName="'special-spcialities.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'serviceTypeToken'"
            :value="serviceData.serviceTypeToken"
            :options="serviceTypeTokenOptions"
            v-on:changeValue="serviceData.serviceTypeToken = $event"
            :title="$t('selectServiceType')"
            :imgName="'services-types.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'serviceProvideTypeToken'"
            :value="serviceData.serviceProvideTypeToken"
            :options="serviceProvideTypeTokenOptions"
            v-on:changeValue="serviceData.serviceProvideTypeToken = $event"
            :title="$t('selectServiceProvideType')"
            :imgName="'type.svg'"
          />

          <!-- name -->
          <CustomInput
            :className="'col-md-4'"
            :id="'serviceNameAr'"
            :value="serviceData.serviceNameAr"
            :title="$t('serviceNameAr')"
            :imgName="'services.svg'"
            v-on:changeValue="serviceData.serviceNameAr = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'serviceNameEn'"
            :value="serviceData.serviceNameEn"
            :title="$t('serviceNameEn')"
            :imgName="'services.svg'"
            v-on:changeValue="serviceData.serviceNameEn = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'serviceNameUnd'"
            :value="serviceData.serviceNameUnd"
            :title="$t('serviceNameUnd')"
            :imgName="'services.svg'"
            v-on:changeValue="serviceData.serviceNameUnd = $event"
          />
          <!-- description -->
          <TextArea
            :className="'col-md-4'"
            :id="'serviceDescriptionAr'"
            :value="serviceData.serviceDescriptionAr"
            :title="$t('serviceDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="serviceData.serviceDescriptionAr = $event"
          />
          <TextArea
            :className="'col-md-4'"
            :id="'serviceDescriptionEn'"
            :value="serviceData.serviceDescriptionEn"
            :title="$t('serviceDescriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="serviceData.serviceDescriptionEn = $event"
          />
          <TextArea
            :className="'col-md-4'"
            :id="'serviceDescriptionUnd'"
            :value="serviceData.serviceDescriptionUnd"
            :title="$t('serviceDescriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="serviceData.serviceDescriptionUnd = $event"
          />
          <!-- price -->
          <CustomInputFloat
            :className="'col-md-4'"
            :id="'servicePrice'"
            :value="serviceData.servicePrice"
            :title="$t('servicePrice')"
            :imgName="'money.svg'"
            v-on:changeValue="serviceData.servicePrice = $event"
          />
          <!-- serviceTimeWithMinutes -->
          <CustomInputInt
            :className="'col-md-4'"
            :id="'serviceTimeWithMinutes'"
            :value="serviceData.serviceTimeWithMinutes"
            :title="$t('serviceTimeWithMinutes')"
            :imgName="'minutes.svg'"
            v-on:changeValue="serviceData.serviceTimeWithMinutes = $event"
          />
          <!-- maxDiscountPercentage -->
          <CustomInputFloat
            :className="'col-md-4'"
            :id="'maxDiscountPercentage'"
            :value="serviceData.maxDiscountPercentage"
            :title="$t('maxDiscountPercentage')"
            :imgName="'maxDiscountPercentage.svg'"
            v-on:changeValue="serviceData.maxDiscountPercentage = $event"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="'serviceReceptionistPercentage'"
            :value="serviceData.serviceReceptionistPercentage"
            :title="$t('serviceReceptionistPercentage')"
            :imgName="'maxDiscountPercentage.svg'"
            v-on:changeValue="
              serviceData.serviceReceptionistPercentage = $event
            "
          />

          <!-- serviceNotes -->
          <TextArea
            :className="'col-md-6'"
            :id="'serviceNotes'"
            :value="serviceData.serviceNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="serviceData.serviceNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/services" class="btn btn-cancel">
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
import CustomInputInt from "@/components/general/CustomInputInt.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import DEFAULT_SERVICES_IMG from "@/assets/images/services.svg";
import axios from "axios";

export default {
  name: "ServiceForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomInputInt,
    CustomInputFloat,
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
      defaultImg: DEFAULT_SERVICES_IMG,
      src: this.imageSrc,
      generalSpecialtyTokenOptions: [],
      specialSpecialtyTokenOptions: [],
      serviceProvideTypeTokenOptions: [],
      // serviceProvideTypeTokenOptions: this.$store.getters.userData.constantLists.listServiceProvideType,
      serviceTypeTokenOptions: [],
    };
  },
  props: ["serviceData", "imageSrc", "submitName"],
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
        this.serviceData.image = file[0];
      } else {
        this.src = DEFAULT_SERVICES_IMG;
        this.serviceData.image = "";
      }
    },
    async addOrUpdateService() {
      this.$emit("addOrUpdateService", this.serviceData);
    },
    async getDialogOfServicesTypes() {
      this.isLoading = true;
      this.serviceTypeTokenOptions = [];
      try {
        const response = await axios.get(
          `/ServicesTypes/GetDialogOfServicesTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.serviceTypeTokenOptions.push({
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
        this.serviceTypeTokenOptions = null;
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
        this.isLoading = false;
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      if (
        this.generalSpecialtyTokenOptions.length == 1 &&
        this.submitName == this.$t("add")
      ) {
        this.serviceData.generalSpecialtyToken =
          this.generalSpecialtyTokenOptions[0].value;
        this.getDialogOfSpecialSpecialties(
          this.serviceData.generalSpecialtyToken
        );
      }
      this.isLoading = false;
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
        this.serviceData.specialSpecialtyToken =
          this.specialSpecialtyTokenOptions[0].value;
      }
      this.isLoading = false;
    },
    async changeSpecialSpecialty() {
      this.serviceData.specialSpecialtyToken = "";
      this.getDialogOfSpecialSpecialties(
        this.serviceData.generalSpecialtyToken
      );
    },

    async getServiceProvideTypes() {
      this.isLoading = true;
      this.serviceProvideTypeTokenOptions = [];
      try {
        const itemsData =
          this.$store.getters.userData.constantLists.listServiceProvideType;
        if (itemsData.length > 0) {
          for (let item in itemsData) {
            this.serviceProvideTypeTokenOptions.push({
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
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.serviceProvideTypeTokenOptions = null;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getDialogOfServicesTypes();
    this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties(this.serviceData.generalSpecialtyToken);
    this.getServiceProvideTypes();
  },
};
</script>
