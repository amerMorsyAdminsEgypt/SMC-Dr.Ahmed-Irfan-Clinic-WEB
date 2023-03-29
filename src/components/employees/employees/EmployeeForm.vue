<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off">
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

      <b-button v-b-toggle.personalData class="btn btn-lg btn-collapse">
        {{ $t("personalData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="personalData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("personalData") }}</span>

          <div class="row">
            <div class="form-label-group col-md-6">
              <input
                name="employeeNameAr"
                id="employeeNameAr"
                type="text"
                v-model="employeeData.employeeNameAr"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeeNameAr">{{ $t("employeeNameAr") }}</label>
              <img src="@/assets/images/man.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <input
                name="employeeNameEn"
                id="employeeNameEn"
                type="text"
                v-model="employeeData.employeeNameEn"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeeNameEn">{{ $t("employeeNameEn") }}</label>
              <img src="@/assets/images/man.svg" />
            </div>

            <TextArea
              :className="'col-md-6'"
              :id="'employeeAddressAr'"
              :value="employeeData.employeeAddressAr"
              :title="$t('employeeAddressAr')"
              :imgName="'address.svg'"
              v-on:changeValue="employeeData.employeeAddressAr = $event"
            />
            <TextArea
              :className="'col-md-6'"
              :id="'employeeAddressEn'"
              :value="employeeData.employeeAddressEn"
              :title="$t('employeeAddressEn')"
              :imgName="'address.svg'"
              v-on:changeValue="employeeData.employeeAddressEn = $event"
            />

            <div class="form-label-group col-md-6">
              <b-form-datepicker
                id="employeeBirthdate"
                v-model="employeeData.employeeBirthdate"
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-bind="labels[language] || {}"
                :placeholder="$t('birthdate')"
                :locale="language"
                today-button
                reset-button
                class="form-control"
              ></b-form-datepicker>
            </div>
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeData.employeeGenderToken"
                :options="employeeGenderTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/gender.svg" />
            </div>

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeData.employeeMaritalToken"
                :options="employeeMaritalTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/maritalStatus.svg" />
            </div>
            <TextArea
              :className="'col-md-6'"
              :id="'employeeMaritalStatusNotes'"
              :value="employeeData.employeeMaritalStatusNotes"
              :title="$t('maritalStatusNotes')"
              :imgName="'notes.svg'"
              v-on:changeValue="
                employeeData.employeeMaritalStatusNotes = $event
              "
            />

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeData.employeeMilitaryToken"
                :options="employeeMilitaryTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/militaryStatus.svg" />
            </div>
            <TextArea
              :className="'col-md-6'"
              :id="'employeeMilitaryStatusNotes'"
              :value="employeeData.employeeMilitaryStatusNotes"
              :title="$t('militaryStatusNotes')"
              :imgName="'notes.svg'"
              v-on:changeValue="
                employeeData.employeeMilitaryStatusNotes = $event
              "
            />

            <div class="form-label-group col-6">
              <b-form-select
                v-model="employeeData.generalSpecialtyToken"
                :options="generalSpecialtyTokenOptions"
                @change="changeSpecialSpecialty()"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/general-specialities.svg" />
            </div>
            <div class="form-label-group col-6">
              <b-form-select
                v-model="employeeData.employeeSpecialSpecialtyToken"
                :options="specialSpecialtyTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/special-spcialities.svg" />
            </div>

            <div class="form-label-group col-md-6 col-lg-6">
              <b-form-select
                v-model="employeeData.employeeQualificationToken"
                :options="employeeQualificationTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/qualifications.svg" />
            </div>
            <div class="form-label-group col-6">
              <b-form-select
                v-model="employeeData.employeeBloodTypeToken"
                :options="bloodTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/blood-types.svg" />
            </div>
            <div class="form-label-group col-6">
              <b-form-select
                v-model="employeeData.employeeScientificDegreeToken"
                :options="scientificDegreeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/scientific-degrees.svg" />
            </div>
          </div>
        </div>
      </b-collapse>

      <b-button v-b-toggle.employeeData class="btn btn-lg btn-collapse">
        {{ $t("employeeData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="employeeData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("employeeData") }}</span>
          <div class="row">
            <TelPicker
              :className="'col-md-6 col-lg-4'"
              :value="employeeData.employeeCCWithCCName"
              v-on:changeCC="employeeData.employeeCCWithCCName = $event"
              :id="'employeeCCWithCCName'"
            />
            <div class="form-label-group col-md-6 col-lg-4">
              <input
                name="employeePhone"
                id="employeePhone"
                type="text"
                v-model="employeeData.employeePhone"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeePhone">{{ $t("phoneNumber") }}</label>
              <img src="@/assets/images/phone.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <input
                name="employeeUserName"
                id="employeeUserName"
                type="text"
                v-model="employeeData.employeeUserName"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeeUserName">{{ $t("userName") }}</label>
              <img src="@/assets/images/man.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <input
                name="employeeEmail"
                id="employeeEmail"
                type="text"
                v-model="employeeData.employeeEmail"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeeEmail">{{ $t("email") }}</label>
              <img src="@/assets/images/email.svg" />
            </div>

            <div class="form-label-group col-md-6 col-lg-4">
              <input
                name="employeeCode"
                id="employeeCode"
                type="text"
                v-model="employeeData.employeeCode"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeeCode">{{ $t("employeeCode") }}</label>
              <img src="@/assets/images/number.svg" />
            </div>
            <div class="form-label-group col-md-6 col-lg-4">
              <b-form-select
                v-model="employeeData.employeeTypeToken"
                :options="employeeTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/man.svg" />
            </div>

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeData.employeeSectorToken"
                :options="employeeSectorTokenOptions"
                @change="changeSector()"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/sectors.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="employeeData.employeeJobToken"
                :options="employeeJobTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/jobs.svg" />
            </div>

            <CustomCheckbox
              :className="'col-12'"
              :value="employeeData.employeeActiveStatus"
              :title="$t('employeeActiveStatus')"
              v-on:changeValue="employeeData.employeeActiveStatus = $event"
            />
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
            <div class="form-label-group col-md-6">
              <input
                name="employeeNationalNumber"
                id="employeeNationalNumber"
                type="text"
                v-model="employeeData.employeeNationalNumber"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeeNationalNumber">{{
                $t("nationalNumber")
              }}</label>
              <img src="@/assets/images/nationalNumber.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-datepicker
                id="employeeNationalNumberExpireDate"
                v-model="employeeData.employeeNationalNumberExpireDate"
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-bind="labels[language] || {}"
                :placeholder="$t('nationalNumberExpireDate')"
                :locale="language"
                today-button
                reset-button
                class="form-control"
              ></b-form-datepicker>
            </div>

            <div class="form-label-group col-md-6">
              <input
                name="employeeDrivingLicenceNumber"
                id="employeeDrivingLicenceNumber"
                type="text"
                v-model="employeeData.employeeDrivingLicenceNumber"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeeDrivingLicenceNumber">{{
                $t("drivingLicenceNumber")
              }}</label>
              <img src="@/assets/images/drivingLicense.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-datepicker
                id="employeeDrivingLicenceExpireDate"
                v-model="employeeData.employeeDrivingLicenceExpireDate"
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-bind="labels[language] || {}"
                :placeholder="$t('drivingLicenceExpireDate')"
                :locale="language"
                today-button
                reset-button
                class="form-control"
              ></b-form-datepicker>
            </div>

            <div class="form-label-group col-md-6">
              <input
                name="employeePassportNumber"
                id="employeePassportNumber"
                type="text"
                v-model="employeeData.employeePassportNumber"
                class="form-control"
                placeholder=" "
                maxlength="50"
              />
              <label for="employeePassportNumber">{{
                $t("passportNumber")
              }}</label>
              <img src="@/assets/images/passportNumber.svg" />
            </div>
            <div class="form-label-group col-md-6">
              <b-form-datepicker
                id="employeePassportExpireDate"
                v-model="employeeData.employeePassportExpireDate"
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-bind="labels[language] || {}"
                :placeholder="$t('passportExpireDate')"
                :locale="language"
                today-button
                reset-button
                class="form-control"
              ></b-form-datepicker>
            </div>
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
            <TextArea
              :className="'col-12'"
              :id="'employeeNotes'"
              :value="employeeData.employeeNotes"
              :title="$t('employeeNotes')"
              :imgName="'notes.svg'"
              v-on:changeValue="employeeData.employeeNotes = $event"
            />
          </div>
        </div>
      </b-collapse>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateEmployeeWithoutImage"
        >
          {{ submitName }}
        </button>
        <router-link to="/employees" class="btn btn-cancel">
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
import DEFAULT_IMG from "@/assets/images/user.jpg";
import axios from "axios";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import TelPicker from "@/components/general/TelPicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeeForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomCheckbox,
    TelPicker,
    TextArea,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      defaultImg: DEFAULT_IMG,

      employeeGenderTokenOptions: [],
      employeeQualificationTokenOptions: [],
      employeeSectorTokenOptions: [],
      employeeJobTokenOptions: [{ value: null, text: this.$t("selectJob") }],
      employeeMaritalTokenOptions: [],
      employeeMilitaryTokenOptions: [],
      employeeTypeTokenOptions: [],
      generalSpecialtyTokenOptions: [],
      specialSpecialtyTokenOptions: [],
      bloodTypeTokenOptions: [],
      scientificDegreeTokenOptions: [],

      labels: {
        ar: {
          weekdayHeaderFormat: "narrow",
          labelPrevDecade: "العقد السابق",
          labelPrevYear: "العام السابق",
          labelPrevMonth: "الشهر السابق",
          labelCurrentMonth: "الشهر الحالي",
          labelNextMonth: "الشهر المقبل",
          labelNextYear: "العام المقبل",
          labelNextDecade: "العقد القادم",
          labelToday: "اليوم",
          labelSelected: "التاريخ المحدد",
          labelNoDateSelected: "لم يتم اختيار تاريخ",
          labelCalendar: "التقويم",
          labelNav: "الملاحة التقويم",
          labelHelp: "استخدم مفاتيح المؤشر للتنقل في التواريخ",
          labelTodayButton: "اليوم",
          labelResetButton: "حذف",

          labelHours: "ساعات",
          labelMinutes: "الدقائق",
          labelSeconds: "ثواني",
          labelAmpm: "صباحا مساء",
          labelAm: "ص",
          labelPm: "م",
          labelIncrement: "زيادة",
          labelDecrement: "إنقاص",
          // labelSelected: "الوقت المحدد",
          labelNoTimeSelected: "لم يتم اختيار وقت",
          labelCloseButton: "إغلاق",
          labelNowButton: "الآن",
        },
      },
    };
  },
  props: ["employeeData", "imageSrc", "submitName"],
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
        this.employeeData.image = file[0];
      } else {
        this.imageSrc = DEFAULT_IMG;
        this.employeeData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async changeSector() {
      this.employeeData.employeeJobToken = "";
      this.getDialogOfJobs(this.employeeData.employeeSectorToken);
    },
    async getDialogOfGenders() {
      this.isLoading = true;
      this.employeeGenderTokenOptions = [];
      this.employeeGenderTokenOptions.push({
        value: "",
        text: this.$t("selectGender"),
      });
      let genders = this.$store.getters.userData.constantLists.listGender;
      for (let item in genders) {
        this.employeeGenderTokenOptions.push({
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
      this.employeeMaritalTokenOptions = [];
      this.employeeMaritalTokenOptions.push({
        value: "",
        text: this.$t("selectMaritalStatus"),
      });
      let maritals = this.$store.getters.userData.constantLists.listMarital;
      for (let item in maritals) {
        this.employeeMaritalTokenOptions.push({
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
      this.employeeMilitaryTokenOptions = [];
      this.employeeMilitaryTokenOptions.push({
        value: "",
        text: this.$t("selectMilitaryStatus"),
      });
      let militaries = this.$store.getters.userData.constantLists.listMilitary;
      for (let item in militaries) {
        this.employeeMilitaryTokenOptions.push({
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
    async getDialogOfEmployeeTypes() {
      this.isLoading = true;
      this.employeeTypeTokenOptions = [];
      this.employeeTypeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployeeType"),
      });
      let employeeTypes =
        this.$store.getters.userData.constantLists.listEmployeeType;
      for (let item in employeeTypes) {
        this.employeeTypeTokenOptions.push({
          value: employeeTypes[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            employeeTypes[item]["itemNameAr"],
            employeeTypes[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfQualifications() {
      this.isLoading = true;
      this.employeeQualificationTokenOptions = [];
      this.employeeQualificationTokenOptions.push({
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
            this.employeeQualificationTokenOptions.push({
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
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async getDialogOfSectors() {
      this.isLoading = true;
      this.employeeSectorTokenOptions = [];
      this.employeeSectorTokenOptions.push({
        value: "",
        text: this.$t("selectSector"),
      });
      try {
        const response = await axios.get(
          `/Sectors/GetDialogOfSectors?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeSectorTokenOptions.push({
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
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async getDialogOfJobs(sectorToken) {
      this.isLoading = true;
      sectorToken = sectorToken ? sectorToken : IMPOSSIBLE_TOKEN;
      this.employeeJobTokenOptions = [];
      this.employeeJobTokenOptions.push({
        value: "",
        text: this.$t("selectJob"),
      });
      try {
        const response = await axios.get(
          `/Jobs/GetDialogOfJobs?language=${this.language}&filterStatus=true&sectorToken=${sectorToken}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeJobTokenOptions.push({
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
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateEmployeeWithoutImage() {
      this.$emit("addOrUpdateEmployeeWithoutImage");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
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
    async getDialogOfScientificDegrees() {
      this.isLoading = true;
      this.scientificDegreeTokenOptions = [];
      this.scientificDegreeTokenOptions.push({
        value: "",
        text: this.$t("selectScientificDegree"),
      });
      try {
        const response = await axios.get(
          `/ScientificDegrees/GetDialogOfScientificDegrees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.scientificDegreeTokenOptions.push({
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
        this.scientificDegreeTokenOptions = null;
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
    async changeSpecialSpecialty() {
      this.employeeData.employeeSpecialSpecialtyToken = "";
      this.getDialogOfSpecialSpecialties(
        this.employeeData.generalSpecialtyToken
      );
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
  },
  watch: {
    "employeeData.employeeCCWithCCName": function (val) {
      let cc = val.split(" ");
      this.employeeData.employeeCountryCode = cc[1];
      this.employeeData.employeeCountryCodeName = cc[0];
    },
  },
  async created() {
    this.getDialogOfGenders();
    this.getDialogOfMaritals();
    this.getDialogOfMilitaries();
    this.getDialogOfEmployeeTypes();
    this.getDialogOfQualifications();
    this.getDialogOfBloodTypes();
    this.getDialogOfScientificDegrees();
    this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties(this.employeeData.generalSpecialtyToken);
    this.getDialogOfSectors();
    setTimeout(
      () => this.getDialogOfJobs(this.employeeData.employeeSectorToken),
      2000
    );
  },
};
</script>

<style lang="scss"></style>
