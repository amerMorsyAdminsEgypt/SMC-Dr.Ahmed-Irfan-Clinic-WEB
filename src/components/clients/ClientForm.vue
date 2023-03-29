<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addOrUpdateClient">
      <div class="row">
        <div
          class="imgView"
          :style="{ 'background-image': `url(${imageSrc})` }"
          :onerror="`this.src='${defaultImg}'`"
          alt="Image"
          @click="selectImage"
        ></div>
        <input
          ref="fileInput"
          type="file"
          v-on:change="pickFile"
          class="d-none"
          accept=".jpg, .jpeg, .png"
        />
      </div>

      <b-button v-b-toggle.clientData class="btn btn-lg btn-collapse">
        {{ $t("BasicClientData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="clientData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("BasicClientData") }}</span>

          <div class="row">
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientNameAr'"
              :value="clientData.clientNameAr"
              :title="$t('clientNameAr')"
              :imgName="'clients.svg'"
              v-on:changeValue="clientData.clientNameAr = $event"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientNameEn'"
              :value="clientData.clientNameEn"
              :title="$t('clientNameEn')"
              :imgName="'clients.svg'"
              v-on:changeValue="clientData.clientNameEn = $event"
            />
            <CustomInput
              :className="'col-md-12 col-lg-4'"
              :id="'clientNameUnd'"
              :value="clientData.clientNameUnd"
              :title="$t('clientNameUnd')"
              :imgName="'clients.svg'"
              v-on:changeValue="clientData.clientNameUnd = $event"
            />
            <TelPicker
              :className="'col-md-6 col-lg-4'"
              :value="clientData.clientCCWithCCName"
              v-on:changeCC="clientData.clientCCWithCCName = $event"
              :id="'clientCCWithCCName'"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientPhone'"
              :value="clientData.clientPhone"
              :title="$t('phoneNumber')"
              :imgName="'phone.svg'"
              v-on:changeValue="clientData.clientPhone = $event"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientEmail'"
              :value="clientData.clientEmail"
              :title="$t('email')"
              :imgName="'email.svg'"
              v-on:changeValue="clientData.clientEmail = $event"
            />

            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientUserName'"
              :value="clientData.clientUserName"
              :title="$t('userName')"
              :imgName="'man.svg'"
              v-on:changeValue="clientData.clientUserName = $event"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientCode'"
              :value="clientData.clientCode"
              :title="$t('clientCode')"
              :imgName="'number.svg'"
              v-on:changeValue="clientData.clientCode = $event"
            />
            <CustomCheckbox
              :className="'col-md-6 col-lg-4'"
              :value="clientData.clientActiveStatus"
              :title="$t('clientActiveStatus')"
              v-on:changeValue="clientData.clientActiveStatus = $event"
            />
          </div>
        </div>
      </b-collapse>

      <b-button v-b-toggle.personalData class="btn btn-lg btn-collapse">
        {{ $t("personalData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="personalData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("personalData") }}</span>

          <div class="row">
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientNickNameAr'"
              :value="clientData.clientNickNameAr"
              :title="$t('clientNickNameAr')"
              :imgName="'clients.svg'"
              v-on:changeValue="clientData.clientNickNameAr = $event"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientNickNameEn'"
              :value="clientData.clientNickNameEn"
              :title="$t('clientNickNameEn')"
              :imgName="'clients.svg'"
              v-on:changeValue="clientData.clientNickNameEn = $event"
            />
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientNickNameUnd'"
              :value="clientData.clientNickNameUnd"
              :title="$t('clientNickNameUnd')"
              :imgName="'clients.svg'"
              v-on:changeValue="clientData.clientNickNameUnd = $event"
            />

            <TextArea
              :className="'col-md-6 col-lg-4'"
              :id="'clientAddressAr'"
              :value="clientData.clientAddressAr"
              :title="$t('addressAr')"
              :imgName="'address.svg'"
              v-on:changeValue="clientData.clientAddressAr = $event"
            />
            <TextArea
              :className="'col-md-6 col-lg-4'"
              :id="'clientAddressEn'"
              :value="clientData.clientAddressEn"
              :title="$t('addressEn')"
              :imgName="'address.svg'"
              v-on:changeValue="clientData.clientAddressEn = $event"
            />
            <TextArea
              :className="'col-md-6 col-lg-4'"
              :id="'clientAddressUnd'"
              :value="clientData.clientAddressUnd"
              :title="$t('addressUnd')"
              :imgName="'address.svg'"
              v-on:changeValue="clientData.clientAddressUnd = $event"
            />

            <DatePicker
              :className="'col-md-6 col-lg-4'"
              :id="'clientBirthdate'"
              :value="clientData.clientBirthdate"
              :title="$t('birthdate')"
              :language="language"
              v-on:changeValue="clientData.clientBirthdate = $event"
            />
            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientQualificationToken"
                :options="clientQualificationTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/qualifications.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientGenderToken"
                :options="clientGenderTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/gender.svg" />
            </div>

            <div class="form-label-group col-md-6 col-lg-3">
              <b-form-select
                v-model="clientData.clientCountryToken"
                :options="clientCountryTokenOptions"
                @change="changeCountry()"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/country.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-3">
              <b-form-select
                v-model="clientData.clientGovernateToken"
                :options="clientGovernateTokenOptions"
                @change="changeGovernate()"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/governate.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-3">
              <b-form-select
                v-model="clientData.clientCityToken"
                :options="clientCityTokenOptions"
                @change="changeCity()"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/city.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-3">
              <b-form-select
                v-model="clientData.clientDistrictToken"
                :options="clientDistrictTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/district.svg" />
            </div>

            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientInsuranceCompanyToken"
                :options="clientInsuranceCompanyTokenOptions"
                @change="clientInsuranceCompanyChanged($event)"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/insurance-companies.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientMedicalInsuranceLevelToken"
                :options="clientMedicalInsuranceLevelTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/type.svg" />
            </div>
            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientInsuranceNumber'"
              :value="clientData.clientInsuranceNumber"
              :title="$t('insuranceNumber')"
              :imgName="'number.svg'"
              v-on:changeValue="clientData.clientInsuranceNumber = $event"
            />

            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientBankToken"
                :options="clientBankTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/banks.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientCitizenShipTypeToken"
                :options="clientCitizenShipTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/citizenship.svg" />
            </div>
            <DatePicker
              :className="'col-md-6 col-lg-4'"
              :id="'clientAddingDateToSystem'"
              :value="clientData.clientAddingDateToSystem"
              :title="$t('clientAddingDateToSystem')"
              :language="language"
              v-on:changeValue="clientData.clientAddingDateToSystem = $event"
            />

            <CustomInput
              :className="'col-md-6 col-lg-4'"
              :id="'clientResidencyNumber'"
              :value="clientData.clientResidencyNumber"
              :title="$t('clientResidencyNumber')"
              :imgName="'number.svg'"
              v-on:changeValue="clientData.clientResidencyNumber = $event"
            />
            <DatePicker
              :className="'col-md-6 col-lg-4'"
              :id="'clientResidencyStartDate'"
              :value="clientData.clientResidencyStartDate"
              :title="$t('clientResidencyStartDate')"
              :language="language"
              v-on:changeValue="clientData.clientResidencyStartDate = $event"
            />
            <DatePicker
              :className="'col-md-6 col-lg-4'"
              :id="'clientResidencyEndDate'"
              :value="clientData.clientResidencyEndDate"
              :title="$t('clientResidencyEndDate')"
              :language="language"
              v-on:changeValue="clientData.clientResidencyEndDate = $event"
            />
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="clientData.clientMaritalToken"
                :options="clientMaritalTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/maritalStatus.svg" />
            </div>
            <TextArea
              :className="'col-md-6'"
              :id="'clientMaritalStatusNotes'"
              :value="clientData.clientMaritalStatusNotes"
              :title="$t('maritalStatusNotes')"
              :imgName="'notes.svg'"
              v-on:changeValue="clientData.clientMaritalStatusNotes = $event"
            />

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="clientData.clientMilitaryToken"
                :options="clientMilitaryTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/militaryStatus.svg" />
            </div>
            <TextArea
              :className="'col-md-6'"
              :id="'clientMilitaryStatusNotes'"
              :value="clientData.clientMilitaryStatusNotes"
              :title="$t('militaryStatusNotes')"
              :imgName="'notes.svg'"
              v-on:changeValue="clientData.clientMilitaryStatusNotes = $event"
            />

            <div class="form-label-group col-12">
              <b-form-select
                v-model="clientData.clientBloodTypeToken"
                :options="bloodTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/blood-types.svg" />
            </div>
          </div>
        </div>
      </b-collapse>

      <b-button v-b-toggle.identifiersCardsData class="btn btn-lg btn-collapse">
        {{ $t("identifiersCardsData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="identifiersCardsData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("identifiersCardsData") }}</span>

          <div class="row">
            <CustomInput
              :className="'col-md-6'"
              :id="'clientNationalNumber'"
              :value="clientData.clientNationalNumber"
              :title="$t('nationalNumber')"
              :imgName="'nationalNumber.svg'"
              v-on:changeValue="clientData.clientNationalNumber = $event"
            />
            <DatePicker
              :className="'col-md-6'"
              :id="'clientNationalNumberExpireDate'"
              :value="clientData.clientNationalNumberExpireDate"
              :title="$t('nationalNumberExpireDate')"
              :language="language"
              v-on:changeValue="
                clientData.clientNationalNumberExpireDate = $event
              "
            />

            <CustomInput
              :className="'col-md-6'"
              :id="'clientDrivingLicenceNumber'"
              :value="clientData.clientDrivingLicenceNumber"
              :title="$t('drivingLicenceNumber')"
              :imgName="'drivingLicense.svg'"
              v-on:changeValue="clientData.clientDrivingLicenceNumber = $event"
            />
            <DatePicker
              :className="'col-md-6'"
              :id="'clientDrivingLicenceExpireDate'"
              :value="clientData.clientDrivingLicenceExpireDate"
              :title="$t('drivingLicenceExpireDate')"
              :language="language"
              v-on:changeValue="
                clientData.clientDrivingLicenceExpireDate = $event
              "
            />

            <CustomInput
              :className="'col-md-6'"
              :id="'clientPassportNumber'"
              :value="clientData.clientPassportNumber"
              :title="$t('passportNumber')"
              :imgName="'passportNumber.svg'"
              v-on:changeValue="clientData.clientPassportNumber = $event"
            />
            <DatePicker
              :className="'col-md-6'"
              :id="'clientPassportExpireDate'"
              :value="clientData.clientPassportExpireDate"
              :title="$t('passportExpireDate')"
              :language="language"
              v-on:changeValue="clientData.clientPassportExpireDate = $event"
            />
          </div>
        </div>
      </b-collapse>

      <b-button v-b-toggle.generalData class="btn btn-lg btn-collapse">
        {{ $t("generalData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="generalData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("generalData") }}</span>

          <div class="row">
            <!-- <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.knownMethodToken"
                :options="knownMethodTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/type.svg" />
            </div> -->

            <!-- <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientRelativeRelationToken"
                :options="clientRelativeRelationTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/relative-relation.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientTypeToken"
                :options="clientTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/type.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="clientData.clientSuperToken"
                :options="clientSuperTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/type.svg" />
            </div> -->

            <TextArea
              :className="'col-md-12 col-lg-12'"
              :id="'clientNotes'"
              :value="clientData.clientNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
              v-on:changeValue="clientData.clientNotes = $event"
            />
          </div>
        </div>
      </b-collapse>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/clients" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import DEFAULT_IMG_CLIENT from "@/assets/images/clients.svg";
import { setDataMultiLang } from "@/utils/functions";
import axios from "axios";
import DatePicker from "@/components/general/DatePicker.vue";
import TelPicker from "@/components/general/TelPicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
// import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "ClientForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    DatePicker,
    TelPicker,
    CustomInput,
    // CustomSelectBox,
    CustomCheckbox,
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
      defaultImg: DEFAULT_IMG_CLIENT,
      clientSuperTokenOptions: [],
      clientInsuranceCompanyTokenOptions: [],
      clientMedicalInsuranceLevelTokenOptions: [],
      clientCountryTokenOptions: [],
      clientGovernateTokenOptions: [],
      clientCityTokenOptions: [],
      clientDistrictTokenOptions: [],
      clientQualificationTokenOptions: [],
      clientBankTokenOptions: [],
      clientRelativeRelationTokenOptions: [],
      clientGenderTokenOptions: [],
      clientMaritalTokenOptions: [],
      clientMilitaryTokenOptions: [],
      clientCitizenShipTypeTokenOptions: [],
      clientTypeTokenOptions: [],
      knownMethodTokenOptions: [],
      bloodTypeTokenOptions: [],
      showPassword: false,
    };
  },
  props: ["clientData", "imageSrc", "submitName"],
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
        this.clientData.image = file[0];
      } else {
        this.imageSrc = DEFAULT_IMG_CLIENT;
        this.clientData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async changeCountry() {
      this.clientData.clientGovernateToken = "";
      this.clientData.clientCityToken = "";
      this.clientData.clientDistrictToken = "";
      this.getDialogOfGovernates(this.clientData.clientCountryToken);
      this.getDialogOfCities(IMPOSSIBLE_TOKEN);
      this.getDialogOfDistricts(IMPOSSIBLE_TOKEN);
    },
    async changeGovernate() {
      this.clientData.clientCityToken = "";
      this.clientData.clientDistrictToken = "";
      this.getDialogOfCities(this.clientData.clientGovernateToken);
      this.getDialogOfDistricts(IMPOSSIBLE_TOKEN);
    },
    async changeCity() {
      this.clientData.clientDistrictToken = "";
      this.getDialogOfDistricts(this.clientData.clientCityToken);
    },
    async getDialogOfClientSupers() {
      this.isLoading = true;
      this.clientSuperTokenOptions = [];
      this.clientSuperTokenOptions.push({
        value: "",
        text: this.$t("selectClientSuper"),
      });
      try {
        const response = await axios.get(
          `/Clients/GetDialogOfClients?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&clientTypeToken=CLT-1`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientSuperTokenOptions.push({
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
    async getDialogOfInsuranceCompanies() {
      this.isLoading = true;
      this.clientInsuranceCompanyTokenOptions = [];
      this.clientInsuranceCompanyTokenOptions.push({
        value: "",
        text: this.$t("selectInsuranceCompany"),
      });
      try {
        const response = await axios.get(
          `/InsuranceCompanies/GetDialogOfInsuranceCompanies?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientInsuranceCompanyTokenOptions.push({
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
    async clientInsuranceCompanyChanged(token) {
      this.clientData.clientInsuranceCompanyToken = token;
      this.clientData.clientMedicalInsuranceLevelToken = "";
      this.getDialogOfMedicalInsuranceLevels();
    },
    async getDialogOfMedicalInsuranceLevels() {
      this.isLoading = true;
      this.clientMedicalInsuranceLevelTokenOptions = [];
      this.clientMedicalInsuranceLevelTokenOptions.push({
        value: "",
        text: this.$t("medicalInsuranceLevels.select"),
      });

      try {
        const response = await axios.get(
          `/MedicalInsuranceLevels/GetDialogOfMedicalInsuranceLevels?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&insuranceCompanyToken=${this.clientData.clientInsuranceCompanyToken}`
        );

        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientMedicalInsuranceLevelTokenOptions.push({
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
      this.clientCountryTokenOptions = [];
      this.clientCountryTokenOptions.push({
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
            this.clientCountryTokenOptions.push({
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
    async getDialogOfGovernates(countryToken) {
      this.isLoading = true;
      countryToken = countryToken ? countryToken : IMPOSSIBLE_TOKEN;
      this.clientGovernateTokenOptions = [];
      this.clientGovernateTokenOptions.push({
        value: "",
        text: this.$t("selectGovernate"),
      });
      try {
        const response = await axios.get(
          `/Governates/GetDialogOfGovernates?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&countryToken=${countryToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientGovernateTokenOptions.push({
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
    async getDialogOfCities(governateToken) {
      this.isLoading = true;
      governateToken = governateToken ? governateToken : IMPOSSIBLE_TOKEN;
      this.clientCityTokenOptions = [];
      this.clientCityTokenOptions.push({
        value: "",
        text: this.$t("selectCity"),
      });
      try {
        const response = await axios.get(
          `/Cities/GetDialogOfCities?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&governateToken=${governateToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientCityTokenOptions.push({
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
    async getDialogOfDistricts(cityToken) {
      this.isLoading = true;
      cityToken = cityToken ? cityToken : IMPOSSIBLE_TOKEN;
      this.clientDistrictTokenOptions = [];
      this.clientDistrictTokenOptions.push({
        value: "",
        text: this.$t("selectDistrict"),
      });
      try {
        const response = await axios.get(
          `/Districts/GetDialogOfDistricts?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&cityToken=${cityToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientDistrictTokenOptions.push({
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
    async getDialogOfQualifications() {
      this.isLoading = true;
      this.clientQualificationTokenOptions = [];
      this.clientQualificationTokenOptions.push({
        value: "",
        text: this.$t("selectQualification"),
      });
      try {
        const response = await axios.get(
          `/Qualifications/GetDialogOfQualifications?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientQualificationTokenOptions.push({
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
    async getDialogOfBanks() {
      this.isLoading = true;
      this.clientBankTokenOptions = [];
      this.clientBankTokenOptions.push({
        value: "",
        text: this.$t("selectBank"),
      });
      try {
        const response = await axios.get(
          `/Banks/GetDialogOfBanks?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientBankTokenOptions.push({
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
    async getDialogOfRelativeRelations() {
      this.isLoading = true;
      this.clientRelativeRelationTokenOptions = [];
      this.clientRelativeRelationTokenOptions.push({
        value: "",
        text: this.$t("selectRelativeRelation"),
      });
      try {
        const response = await axios.get(
          `/RelativeRelations/GetDialogOfRelativeRelations?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientRelativeRelationTokenOptions.push({
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
    async getDialogOfGenders() {
      this.isLoading = true;
      this.clientGenderTokenOptions = [];
      this.clientGenderTokenOptions.push({
        value: "",
        text: this.$t("selectGender"),
      });
      let genders = this.$store.getters.userData.constantLists.listGender;
      for (let item in genders) {
        this.clientGenderTokenOptions.push({
          value: genders[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            genders[item]["itemNameAr"],
            genders[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfMaritals() {
      this.isLoading = true;
      this.clientMaritalTokenOptions = [];
      this.clientMaritalTokenOptions.push({
        value: "",
        text: this.$t("selectMaritalStatus"),
      });
      let maritals = this.$store.getters.userData.constantLists.listMarital;
      for (let item in maritals) {
        this.clientMaritalTokenOptions.push({
          value: maritals[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            maritals[item]["itemNameAr"],
            maritals[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfMilitaries() {
      this.isLoading = true;
      this.clientMilitaryTokenOptions = [];
      this.clientMilitaryTokenOptions.push({
        value: "",
        text: this.$t("selectMilitaryStatus"),
      });
      let militaries = this.$store.getters.userData.constantLists.listMilitary;
      for (let item in militaries) {
        this.clientMilitaryTokenOptions.push({
          value: militaries[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            militaries[item]["itemNameAr"],
            militaries[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfCitizenShipType() {
      this.isLoading = true;
      this.clientCitizenShipTypeTokenOptions = [];
      this.clientCitizenShipTypeTokenOptions.push({
        value: "",
        text: this.$t("selectCitizenShipType"),
      });
      let itemsData =
        this.$store.getters.userData.constantLists.listCitizenShipType;
      for (let item in itemsData) {
        this.clientCitizenShipTypeTokenOptions.push({
          value: itemsData[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            itemsData[item]["itemNameAr"],
            itemsData[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfClientType() {
      this.isLoading = true;
      this.clientTypeTokenOptions = [];
      this.clientTypeTokenOptions.push({
        value: "",
        text: this.$t("selectClientType"),
      });
      let itemsData = this.$store.getters.userData.constantLists.listClientType;
      for (let item in itemsData) {
        this.clientTypeTokenOptions.push({
          value: itemsData[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            itemsData[item]["itemNameAr"],
            itemsData[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfKnownMethods() {
      this.isLoading = true;
      this.knownMethodTokenOptions = [];
      this.knownMethodTokenOptions.push({
        value: "",
        text: this.$t("selectKnownMethod"),
      });
      try {
        const response = await axios.get(
          `/KnownMethodes/GetDialogOfKnownMethodes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.knownMethodTokenOptions.push({
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
    async getDialogOfBloodTypes() {
      this.isLoading = true;
      this.bloodTypeTokenOptions = [];
      this.bloodTypeTokenOptions.push({
        value: "",
        text: this.$t("selectBloodType"),
      });
      try {
        const response = await axios.get(
          `/BloodTypes/GetDialogOfBloodTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.bloodTypeTokenOptions.push({
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
        this.bloodTypeTokenOptions = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateClient() {
      this.$emit("addOrUpdateClient");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  watch: {
    "clientData.clientCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.clientData.clientCountryCode = cc[1];
      this.clientData.clientCountryCodeName = cc[0];
    },
  },
  async created() {
    this.getDialogOfClientSupers();
    this.getDialogOfInsuranceCompanies();
    this.getDialogOfMedicalInsuranceLevels();
    this.getDialogOfCountries();
    this.getDialogOfGovernates();
    this.getDialogOfCities();
    this.getDialogOfDistricts();
    this.getDialogOfQualifications();
    this.getDialogOfBanks();
    this.getDialogOfRelativeRelations();
    this.getDialogOfGenders();
    this.getDialogOfMaritals();
    this.getDialogOfMilitaries();
    this.getDialogOfCitizenShipType();
    this.getDialogOfClientType();
    this.getDialogOfKnownMethods();
    this.getDialogOfBloodTypes();
  },
};
</script>

<style lang="scss"></style>
