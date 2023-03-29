<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addOrUpdateBranch">
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
            :id="'branchNameAr'"
            :value="branchData.branchNameAr"
            :title="$t('branchNameAr')"
            :imgName="'branches.svg'"
            v-on:changeValue="branchData.branchNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'branchNameEn'"
            :value="branchData.branchNameEn"
            :title="$t('branchNameEn')"
            :imgName="'branches.svg'"
            v-on:changeValue="branchData.branchNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'branchNameUnd'"
            :value="branchData.branchNameUnd"
            :title="$t('branchNameUnd')"
            :imgName="'branches.svg'"
            v-on:changeValue="branchData.branchNameUnd = $event"
          />
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="branchData.branchMangareEmployeeToken"
              :options="branchMangareEmployeeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/man.svg" />
          </div>

          <TelPicker
            :className="'col-md-6 col-lg-6'"
            :value="branchData.branchFirstNumberCCWithCCName"
            v-on:changeCC="branchData.branchFirstNumberCCWithCCName = $event"
            :id="'branchFirstNumberCCWithCCName'"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'branchFirstPhone'"
            :value="branchData.branchFirstPhone"
            :title="$t('phone1')"
            :imgName="'phone.svg'"
            v-on:changeValue="branchData.branchFirstPhone = $event"
          />

          <TelPicker
            :className="'col-md-6 col-lg-6'"
            :value="branchData.branchSecondNumberCCWithCCName"
            v-on:changeCC="branchData.branchSecondNumberCCWithCCName = $event"
            :id="'branchSecondNumberCCWithCCName'"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'branchSecondPhone'"
            :value="branchData.branchSecondPhone"
            :title="$t('phone2')"
            :imgName="'phone.svg'"
            v-on:changeValue="branchData.branchSecondPhone = $event"
          />

          <TelPicker
            :className="'col-md-6 col-lg-6'"
            :value="branchData.branchLandLineCCWithCCName"
            v-on:changeCC="branchData.branchLandLineCCWithCCName = $event"
            :id="'branchLandLineCCWithCCName'"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'branchLandLine'"
            :value="branchData.branchLandLine"
            :title="$t('phoneLandline')"
            :imgName="'phone-landline.svg'"
            v-on:changeValue="branchData.branchLandLine = $event"
          />

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="branchData.countryToken"
              :options="countryTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/country.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="branchData.governateToken"
              :options="governateTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/governate.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="branchData.cityToken"
              :options="cityTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/city.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="branchData.districtToken"
              :options="districtTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/district.svg" />
          </div>

          <TextArea
            :className="'col-md-6'"
            :id="'branchAddressAr'"
            :value="branchData.branchAddressAr"
            :title="$t('addressAr')"
            :imgName="'address.svg'"
            v-on:changeValue="branchData.branchAddressAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'branchAddressEn'"
            :value="branchData.branchAddressEn"
            :title="$t('addressEn')"
            :imgName="'address.svg'"
            v-on:changeValue="branchData.branchAddressEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'branchAddressUnd'"
            :value="branchData.branchAddressUnd"
            :title="$t('addressUnd')"
            :imgName="'address.svg'"
            v-on:changeValue="branchData.branchAddressUnd = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'branchNotes'"
            :value="branchData.branchNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="branchData.branchNotes = $event"
          />

          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'branchLatitude'"
            :value="branchData.branchLatitude"
            :title="$t('latitude')"
            :imgName="'latitude.svg'"
            v-on:changeValue="branchData.branchLatitude = $event"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'branchLongitude'"
            :value="branchData.branchLongitude"
            :title="$t('longitude')"
            :imgName="'longitude.svg'"
            v-on:changeValue="branchData.branchLongitude = $event"
          />

          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'branchEndLatitude'"
            :value="branchData.branchEndLatitude"
            :title="$t('endLatitude')"
            :imgName="'latitude.svg'"
            v-on:changeValue="branchData.branchEndLatitude = $event"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'branchEndLongitude'"
            :value="branchData.branchEndLongitude"
            :title="$t('endLongitude')"
            :imgName="'longitude.svg'"
            v-on:changeValue="branchData.branchEndLongitude = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'branchDistance'"
            :value="branchData.branchDistance"
            :title="$t('distance')"
            :imgName="'number.svg'"
            v-on:changeValue="branchData.branchDistance = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'branchTaxNumber'"
            :value="branchData.branchTaxNumber"
            :title="$t('taxNumber')"
            :imgName="'number.svg'"
            v-on:changeValue="branchData.branchTaxNumber = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/branches" class="btn btn-cancel">
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
import DEFAULT_IMG_BRANCH from "@/assets/images/branches.svg";
import axios from "axios";
import TelPicker from "@/components/general/TelPicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "BranchForm",
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
      defaultImg: DEFAULT_IMG_BRANCH,
      branchMangareEmployeeTokenOptions: [],
      countryTokenOptions: [],
      governateTokenOptions: [],
      cityTokenOptions: [],
      districtTokenOptions: [],
    };
  },
  props: ["branchData", "imageSrc", "submitName"],
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
        this.branchData.image = file[0];
      } else {
        this.imageSrc = DEFAULT_IMG_BRANCH;
        this.branchData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async getDialogOfEmployees() {
      this.isLoading = true;
      this.branchMangareEmployeeTokenOptions = [];
      this.branchMangareEmployeeTokenOptions.push({
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
            this.branchMangareEmployeeTokenOptions.push({
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
    async addOrUpdateBranch() {
      this.$emit("addOrUpdateBranch");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {
    "branchData.branchFirstNumberCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.branchData.branchFirstNumberCountryCode = cc[1];
      this.branchData.branchFirstNumberCountryCodeName = cc[0];
    },
    "branchData.branchSecondNumberCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.branchData.branchSecondNumberCountryCode = cc[1];
      this.branchData.branchSecondNumberCountryCodeName = cc[0];
    },
    "branchData.branchLandLineCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.branchData.branchLandLineCountryCode = cc[1];
      this.branchData.branchLandLineCountryCodeName = cc[0];
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
