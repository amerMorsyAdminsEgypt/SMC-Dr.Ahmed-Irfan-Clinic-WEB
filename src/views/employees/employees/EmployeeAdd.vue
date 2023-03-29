<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeeForm
      v-if="!isLoading"
      :employeeData="employeeData"
      :imageSrc="imageSrc"
      :submitName="$t('add')"
      v-on:addOrUpdateEmployeeWithoutImage="addEmployeeWithoutImage"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, DEFAULT_COUNTRY_CODE } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/user.jpg";
import { date2slash, numberToEn } from "@/utils/functions";
import axios from "axios";
import EmployeeForm from "@/components/employees/employees/EmployeeForm.vue";

export default {
  name: "EmployeeAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeForm,
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
      imageSrc: DEFAULT_IMG,
      employeeData: {
        image: "",
        generalSpecialtyToken: "",
        employeeSpecialSpecialtyToken: "",
        employeeBloodTypeToken: "",
        employeeScientificDegreeToken: "",
        employeeNameEn: "",
        employeeNameAr: "",
        employeeUserName: "",
        employeeEmail: "",
        employeeCode: "",
        employeeCCWithCCName: DEFAULT_COUNTRY_CODE.CCWithCCName,
        employeeCountryCodeName: DEFAULT_COUNTRY_CODE.countryCodeName,
        employeeCountryCode: DEFAULT_COUNTRY_CODE.countryCode,
        employeePhone: "",
        employeeBirthdate: "",
        employeeOneKilometerPrice: "",
        employeeGenderToken: "",
        employeeQualificationToken: "",
        employeeSectorToken: "",
        employeeJobToken: "",
        employeeNationalNumber: "",
        employeeNationalNumberExpireDate: "",
        employeeDrivingLicenceNumber: "",
        employeeDrivingLicenceExpireDate: "",
        employeePassportNumber: "",
        employeePassportExpireDate: "",
        employeeMaritalToken: "",
        employeeMaritalStatusNotes: "",
        employeeMilitaryToken: "",
        employeeMilitaryStatusNotes: "",
        employeeTypeToken: "",
        employeeNotes: "",
        employeeAddressEn: "",
        employeeAddressAr: "",
        employeeActiveStatus: true,
      },
    };
  },
  methods: {
    async addEmployeeWithoutImage() {
      this.isLoading = true;

      var data = {
        image: this.employeeData.image,
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        generalSpecialtyToken: this.employeeData.generalSpecialtyToken,
        employeeSpecialSpecialtyToken:
          this.employeeData.employeeSpecialSpecialtyToken,
        employeeBloodTypeToken: this.employeeData.employeeBloodTypeToken,
        employeeNameEn: this.employeeData.employeeNameEn,
        employeeNameAr: this.employeeData.employeeNameAr,
        employeeCode: this.employeeData.employeeCode,
        employeeCountryCodeName: this.employeeData.employeeCountryCodeName,
        employeeCountryCode: this.employeeData.employeeCountryCode,
        employeePhone: numberToEn(this.employeeData.employeePhone),
        employeeUserName: this.employeeData.employeeUserName,
        employeeEmail: this.employeeData.employeeEmail,
        employeeBirthdate: date2slash(this.employeeData.employeeBirthdate),
        employeeAddressEn: this.employeeData.employeeAddressEn,
        employeeAddressAr: this.employeeData.employeeAddressAr,
        employeeGenderToken: this.employeeData.employeeGenderToken,
        employeeQualificationToken:
          this.employeeData.employeeQualificationToken,
        employeeSectorToken: this.employeeData.employeeSectorToken,
        employeeJobToken: this.employeeData.employeeJobToken,
        employeeNationalNumber: this.employeeData.employeeNationalNumber,
        employeeNationalNumberExpireDate: date2slash(
          this.employeeData.employeeNationalNumberExpireDate
        ),
        employeeDrivingLicenceNumber:
          this.employeeData.employeeDrivingLicenceNumber,
        employeeDrivingLicenceExpireDate: date2slash(
          this.employeeData.employeeDrivingLicenceExpireDate
        ),
        employeePassportNumber: this.employeeData.employeePassportNumber,
        employeePassportExpireDate: date2slash(
          this.employeeData.employeePassportExpireDate
        ),
        employeeMaritalToken: this.employeeData.employeeMaritalToken,
        employeeMaritalStatusNotes:
          this.employeeData.employeeMaritalStatusNotes,
        employeeMilitaryToken: this.employeeData.employeeMilitaryToken,
        employeeMilitaryStatusNotes:
          this.employeeData.employeeMilitaryStatusNotes,
        employeeTypeToken: this.employeeData.employeeTypeToken,
        employeeNotes: this.employeeData.employeeNotes,
        employeeActiveStatus: this.employeeData.employeeActiveStatus,
      };
      if (
        this.employeeData.image != "" &&
        this.employeeData.image != undefined
      ) {
        var formData = new FormData();
        formData.append("image", this.employeeData.image);
        formData.append("data", JSON.stringify(data));
      }

      try {
        let response = "";
        if (
          this.employeeData.image != "" &&
          this.employeeData.image != undefined
        ) {
          response = await axios.post(
            `/Employees/AddEmployeeWithImage`,
            formData
          );
        } else {
          response = await axios.post(
            `/Employees/AddEmployeeWithoutImage`,
            data
          );
        }
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeeData = {
            image: "",
            employeeNameEn: null,
            employeeNameAr: null,
            employeeUserName: null,
            employeeEmail: null,
            employeeCode: null,
            employeeCountryCodeName: null,
            employeeCountryCode: null,
            employeePhone: null,
            employeeBirthdate: null,
            employeeGenderToken: "",
            employeeQualificationToken: "",
            employeeSectorToken: "",
            employeeJobToken: "",
            employeeNationalNumber: null,
            employeeNationalNumberExpireDate: null,
            employeeDrivingLicenceNumber: null,
            employeeDrivingLicenceExpireDate: null,
            employeePassportNumber: null,
            employeePassportExpireDate: null,
            employeeMaritalToken: "",
            employeeMaritalStatusNotes: null,
            employeeMilitaryToken: "",
            employeeMilitaryStatusNotes: null,
            employeeTypeToken: "",
            employeeNotes: null,
            employeeAddressEn: null,
            employeeAddressAr: null,
            employeeActiveStatus: false,
          };
          // this.$router.push("/add-employee");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
