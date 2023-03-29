<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeeForm
      v-if="!isLoading"
      :employeeData="employeeData"
      :imageSrc="imageSrc"
      :submitName="$t('edit')"
      v-on:addOrUpdateEmployeeWithoutImage="updateEmployeeWithoutImage"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/user.jpg";
import { date2slash, date2dash, numberToEn } from "@/utils/functions";
import axios from "axios";
import EmployeeForm from "@/components/employees/employees/EmployeeForm.vue";

export default {
  name: "EmployeeEdit",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeForm,
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
      employeeToken: this.$route.params.employeeToken,
      imageSrc: DEFAULT_IMG,
      employeeData: {},
    };
  },
  methods: {
    async getEmployeeDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Employees/GetEmployeeDetails?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&employeeToken=${this.employeeToken}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          const theData = response.data.employeeData;
          this.employeeData = theData;
          this.employeeData.employeeBirthdate = date2dash(
            theData.employeeBirthdate
          );
          this.employeeData.employeeNationalNumberExpireDate = date2dash(
            theData.employeeNationalNumberExpireDate
          );
          this.employeeData.employeeDrivingLicenceExpireDate = date2dash(
            theData.employeeDrivingLicenceExpireDate
          );
          this.employeeData.employeePassportExpireDate = date2dash(
            theData.employeePassportExpireDate
          );
          this.employeeData.employeeCCWithCCName =
            theData.employeeCountryCodeName
              ? theData.employeeCountryCodeName +
                " " +
                theData.employeeCountryCode
              : "";
          this.employeeData.image = "";
          this.imageSrc = BASE_URL + theData.employeeImagePath;
          // this.employeeData.imageSrc = "";
          // this.employeeData.imageSrc = BASE_URL + theData.employeeImagePath;
          // this.employeeData.imageSrc = DEFAULT_IMG;
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
    async updateEmployeeWithoutImage() {
      this.isLoading = true;
      var data = {
        image: this.employeeData.image,
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        employeeToken: this.employeeToken,
        generalSpecialtyToken: this.employeeData.generalSpecialtyToken,
        employeeSpecialSpecialtyToken:
          this.employeeData.employeeSpecialSpecialtyToken,
        employeeBloodTypeToken: this.employeeData.employeeBloodTypeToken,
        employeeScientificDegreeToken:
          this.employeeData.employeeScientificDegreeToken,
        employeeNameEn: this.employeeData.employeeNameEn,
        employeeNameAr: this.employeeData.employeeNameAr,
        employeeCode: this.employeeData.employeeCode,
        employeeCountryCodeName: this.employeeData.employeeCountryCodeName,
        employeeCountryCode: this.employeeData.employeeCountryCode,
        employeePhone: numberToEn(this.employeeData.employeePhone),
        employeeUserName: this.employeeData.employeeUserName,
        employeeEmail: this.employeeData.employeeEmail,
        employeeBirthdate: date2slash(this.employeeData.employeeBirthdate),
        employeeOneKilometerPrice: this.employeeData.employeeOneKilometerPrice,
        employeeAddressEn: this.employeeData.employeeAddressEn,
        employeeAddressAr: this.employeeData.employeeAddressAr,
        employeeGenderToken: this.employeeData.employeeGenderToken,
        employeeSectorToken: this.employeeData.employeeSectorToken,
        employeeJobToken: this.employeeData.employeeJobToken,
        employeeQualificationToken:
          this.employeeData.employeeQualificationToken,
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
            `/Employees/UpdateEmployeeWithImage`,
            formData
          );
        } else {
          response = await axios.post(
            `/Employees/UpdateEmployeeWithoutImage`,
            data
          );
        }
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/employees");
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
  async created() {
    this.getEmployeeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
