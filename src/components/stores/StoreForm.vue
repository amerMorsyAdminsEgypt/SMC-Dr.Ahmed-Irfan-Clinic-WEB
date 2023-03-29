<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addOrUpdateStore">
      <div class="row">
        <div
          class="imgView"
          :style="{ 'background-image': `url(${imageSrc})` }"
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
          <CustomInput
            :className="'col-md-6'"
            :id="'storeNameAr'"
            :value="storeData.storeNameAr"
            :title="$t('storeNameAr')"
            :imgName="'stores.svg'"
            v-on:changeValue="storeData.storeNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'storeNameEn'"
            :value="storeData.storeNameEn"
            :title="$t('storeNameEn')"
            :imgName="'stores.svg'"
            v-on:changeValue="storeData.storeNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'storeNameUnd'"
            :value="storeData.storeNameUnd"
            :title="$t('storeNameUnd')"
            :imgName="'stores.svg'"
            v-on:changeValue="storeData.storeNameUnd = $event"
          />
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="storeData.storeMangareEmployeeToken"
              :options="storeMangareEmployeeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/man.svg" />
          </div>

          <TelPicker
            :className="'col-md-6 col-lg-6'"
            :value="storeData.storeFirstNumberCCWithCCName"
            v-on:changeCC="storeData.storeFirstNumberCCWithCCName = $event"
            :id="'storeFirstNumberCCWithCCName'"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'storeFirstPhone'"
            :value="storeData.storeFirstPhone"
            :title="$t('phone1')"
            :imgName="'phone.svg'"
            v-on:changeValue="storeData.storeFirstPhone = $event"
          />

          <TelPicker
            :className="'col-md-6 col-lg-6'"
            :value="storeData.storeSecondNumberCCWithCCName"
            v-on:changeCC="storeData.storeSecondNumberCCWithCCName = $event"
            :id="'storeSecondNumberCCWithCCName'"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'storeSecondPhone'"
            :value="storeData.storeSecondPhone"
            :title="$t('phone2')"
            :imgName="'phone.svg'"
            v-on:changeValue="storeData.storeSecondPhone = $event"
          />

          <TelPicker
            :className="'col-md-6 col-lg-6'"
            :value="storeData.storeLandLineCCWithCCName"
            v-on:changeCC="storeData.storeLandLineCCWithCCName = $event"
            :id="'storeLandLineCCWithCCName'"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'storeLandLine'"
            :value="storeData.storeLandLine"
            :title="$t('phoneLandline')"
            :imgName="'phone-landline.svg'"
            v-on:changeValue="storeData.storeLandLine = $event"
          />

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="storeData.countryToken"
              :options="countryTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/country.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="storeData.governateToken"
              :options="governateTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/governate.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="storeData.cityToken"
              :options="cityTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/city.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="storeData.districtToken"
              :options="districtTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/district.svg" />
          </div>

          <TextArea
            :className="'col-md-6'"
            :id="'storeAddressAr'"
            :value="storeData.storeAddressAr"
            :title="$t('addressAr')"
            :imgName="'address.svg'"
            v-on:changeValue="storeData.storeAddressAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'storeAddressEn'"
            :value="storeData.storeAddressEn"
            :title="$t('addressEn')"
            :imgName="'address.svg'"
            v-on:changeValue="storeData.storeAddressEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'storeAddressUnd'"
            :value="storeData.storeAddressUnd"
            :title="$t('addressUnd')"
            :imgName="'address.svg'"
            v-on:changeValue="storeData.storeAddressUnd = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'storeNotes'"
            :value="storeData.storeNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="storeData.storeNotes = $event"
          />

          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'storeLatitude'"
            :value="storeData.storeLatitude"
            :title="$t('latitude')"
            :imgName="'latitude.svg'"
            v-on:changeValue="storeData.storeLatitude = $event"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'storeLongitude'"
            :value="storeData.storeLongitude"
            :title="$t('longitude')"
            :imgName="'longitude.svg'"
            v-on:changeValue="storeData.storeLongitude = $event"
          />

          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'storeEndLatitude'"
            :value="storeData.storeEndLatitude"
            :title="$t('endLatitude')"
            :imgName="'latitude.svg'"
            v-on:changeValue="storeData.storeEndLatitude = $event"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'storeEndLongitude'"
            :value="storeData.storeEndLongitude"
            :title="$t('endLongitude')"
            :imgName="'longitude.svg'"
            v-on:changeValue="storeData.storeEndLongitude = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'storeDistance'"
            :value="storeData.storeDistance"
            :title="$t('distance')"
            :imgName="'number.svg'"
            v-on:changeValue="storeData.storeDistance = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/stores" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DEFAULT_IMG_STORE from "@/assets/images/stores.svg";
import axios from "axios";
import TelPicker from "@/components/general/TelPicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "StoreForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    TelPicker,
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
      defaultImg: DEFAULT_IMG_STORE,
      storeMangareEmployeeTokenOptions: [],
      countryTokenOptions: [],
      governateTokenOptions: [],
      cityTokenOptions: [],
      districtTokenOptions: [],
    };
  },
  props: ["storeData", "imageSrc", "submitName"],
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
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        this.storeData.image = file[0];
      } else {
        this.imageSrc = DEFAULT_IMG_STORE;
        this.storeData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async getDialogOfEmployees() {
      this.isLoading = true;
      this.storeMangareEmployeeTokenOptions = [];
      this.storeMangareEmployeeTokenOptions.push({
        value: "",
        text: this.$t("selectManager"),
      });
      try {
        const response = await axios.get(
          `/Employees/GetDialogOfEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.storeMangareEmployeeTokenOptions.push({
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
    async getDialogOfCountries() {
      this.isLoading = true;
      this.countryTokenOptions = [];
      this.countryTokenOptions.push({
        value: "",
        text: this.$t("selectCountry"),
      });
      try {
        const response = await axios.get(
          `/Countries/GetDialogOfCountries?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.countryTokenOptions.push({
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
    async getDialogOfGovernates() {
      this.isLoading = true;
      this.governateTokenOptions = [];
      this.governateTokenOptions.push({
        value: "",
        text: this.$t("selectGovernate"),
      });
      try {
        const response = await axios.get(
          `/Governates/GetDialogOfGovernates?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.governateTokenOptions.push({
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
    async getDialogOfCities() {
      this.isLoading = true;
      this.cityTokenOptions = [];
      this.cityTokenOptions.push({
        value: "",
        text: this.$t("selectCity"),
      });
      try {
        const response = await axios.get(
          `/Cities/GetDialogOfCities?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.cityTokenOptions.push({
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
    async getDialogOfDistricts() {
      this.isLoading = true;
      this.districtTokenOptions = [];
      this.districtTokenOptions.push({
        value: "",
        text: this.$t("selectDistrict"),
      });
      try {
        const response = await axios.get(
          `/Districts/GetDialogOfDistricts?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.districtTokenOptions.push({
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
    async addOrUpdateStore() {
      this.$emit("addOrUpdateStore");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {
    "storeData.storeFirstNumberCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.storeData.storeFirstNumberCountryCode = cc[1];
      this.storeData.storeFirstNumberCountryCodeName = cc[0];
    },
    "storeData.storeSecondNumberCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.storeData.storeSecondNumberCountryCode = cc[1];
      this.storeData.storeSecondNumberCountryCodeName = cc[0];
    },
    "storeData.storeLandLineCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.storeData.storeLandLineCountryCode = cc[1];
      this.storeData.storeLandLineCountryCodeName = cc[0];
    },
  },
  async created() {
    this.getDialogOfEmployees();
    this.getDialogOfCountries();
    this.getDialogOfGovernates();
    this.getDialogOfCities();
    this.getDialogOfDistricts();
  },
};
</script>

<style lang="scss"></style>
