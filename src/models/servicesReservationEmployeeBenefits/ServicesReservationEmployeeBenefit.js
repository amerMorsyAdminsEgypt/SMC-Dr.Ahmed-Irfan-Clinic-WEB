import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
// import i18n from "@/i18n";
// import store from "@/store";
// import router from "@/router";
import DEFAULT_IMG from "@/assets/images/servicesReservationEmployeeBenefit.svg";
// import ServicesReservationEmployeeBenefitFilter from "./ServicesReservationEmployeeBenefitFilter";

export default class ServicesReservationEmployeeBenefit {
  defaultImg = DEFAULT_IMG;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.employeeToken = "";
    this.employeeImagePath = "";
    this.employeeCode = "";
    this.employeeNameCurrent = "";
    this.employeeCountryCodeName = "";
    this.employeeCountryCode = "";
    this.employeePhone = "";
    this.employeePhoneWithCC = "";
    this.employeeEmail = "";
    this.employeeNationalNumber = "";
    this.employeeAddressCurrent = "";
    this.employeeTypeToken = "";
    this.employeeTypeNameCurrent = "";
    this.employeeJobToken = "";
    this.jobNameCurrent = "";
    this.sectorToken = "";
    this.sectorNameCurrent = "";
    this.employeeGenderToken = "";
    this.employeeGenderNameCurrent = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.employeeBenefitTakeStatus = "";
    this.sumEmployeeBenefitValue = "";
    this.countServices = "";
    this.sumServicesPrice = "";
    this.difference = "";
  }
  fillData(data) {
    if (data) {
      this.employeeToken = data.employeeToken ?? "";
      this.employeeImagePath = data.employeeImagePath ?? "";
      this.employeeCode = data.employeeCode ?? "";
      this.employeeNameCurrent = data.employeeNameCurrent ?? "";
      this.employeeCountryCodeName = data.employeeCountryCodeName ?? "";
      this.employeeCountryCode = data.employeeCountryCode ?? "";
      this.employeePhone = data.employeePhone ?? "";
      this.employeePhoneWithCC = data.employeePhoneWithCC ?? "";
      this.employeeEmail = data.employeeEmail ?? "";
      this.employeeNationalNumber = data.employeeNationalNumber ?? "";
      this.employeeAddressCurrent = data.employeeAddressCurrent ?? "";
      this.employeeTypeToken = data.employeeTypeToken ?? "";
      this.employeeTypeNameCurrent = data.employeeTypeNameCurrent ?? "";
      this.employeeJobToken = data.employeeJobToken ?? "";
      this.jobNameCurrent = data.jobNameCurrent ?? "";
      this.sectorToken = data.sectorToken ?? "";
      this.sectorNameCurrent = data.sectorNameCurrent ?? "";
      this.employeeGenderToken = data.employeeGenderToken ?? "";
      this.employeeGenderNameCurrent = data.employeeGenderNameCurrent ?? "";
      this.specialSpecialtyToken = data.specialSpecialtyToken ?? "";
      this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent ?? "";
      this.generalSpecialtyToken = data.generalSpecialtyToken ?? "";
      this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent ?? "";
      this.employeeBenefitTakeStatus = data.employeeBenefitTakeStatus ?? "";
      this.sumEmployeeBenefitValue = data.sumEmployeeBenefitValue ?? "";
      this.countServices = data.countServices ?? "";
      this.sumServicesPrice = data.sumServicesPrice ?? "";
      this.difference = data.difference ?? "";
      this.filterData.fillData(data.difference);
    } else {
      this.setInitialValue();
    }
  }

  async getAllServicesReservationEmployeeBenefit(
    language,
    userAuthorizeToken,
    selfPage,
    filterData
  ) {
    try {
      // const filter = { ...this.filterData };
      // console.log(this.filterData);
      let response = await axios.get(
        `/ServicesReservationEmployeeBenefit/GetAllServicesReservationEmployeeBenefit?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${filterData.textSearch}&sortBySumEmployeeBenefitValue=${filterData.sortBySumEmployeeBenefitValue}&employeesHaveBenefitStatus=${filterData.employeesHaveBenefitStatus}&employeeTypeToken=${filterData.employeeTypeToken}&employeeToken=${filterData.employeeToken}&sectorToken=${filterData.sectorToken}&employeeJobToken=${filterData.employeeJobToken}&generalSpecialtyToken=${filterData.generalSpecialtyToken}&specialSpecialtyToken=${filterData.specialSpecialtyToken}&employeeGenderToken=${filterData.employeeGenderToken}&branchToken=${filterData.branchToken}&floorToken=${filterData.floorToken}&officeToken=${filterData.officeToken}&chamberToken=${filterData.chamberToken}&serviceToken=${filterData.serviceToken}&serviceProvideTypeToken=${filterData.serviceProvideTypeToken}&dateTimeFrom=${filterData.dateTimeFrom}&dateTimeTo=${filterData.dateTimeTo}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
