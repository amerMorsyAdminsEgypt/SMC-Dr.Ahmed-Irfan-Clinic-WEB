import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import InsuranceCompanyServicesData from "../insuranceCompanyServices/InsuranceCompanyServicesData";
import MedicalInsuranceLevelsData from "../medicalInsuranceLevels/MedicalInsuranceLevelsData";

export default class InsuranceCompany {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.insuranceCompanyCCWithCCName = "";
    this.insuranceCompanyToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.insuranceCompanyNameAr = "";
    this.insuranceCompanyNameEn = "";
    this.insuranceCompanyNameUnd = "";
    this.insuranceCompanyAddressCurrent = "";
    this.insuranceCompanyAddressAr = "";
    this.insuranceCompanyAddressEn = "";
    this.insuranceCompanyAddressUnd = "";
    this.insuranceCompanyCountryCodeName = "";
    this.insuranceCompanyCountryCode = "";
    this.insuranceCompanyPhone = "";
    this.insuranceCompanyPhoneWithCC = "";
    this.insuranceCompanyCountryCodeName = "";
    this.insuranceCompanyDescriptionCurrent = "";
    this.insuranceCompanyDescriptionEn = "";
    this.insuranceCompanyDescriptionAr = "";
    this.insuranceCompanyDescriptionUnd = "";
    this.insuranceCompanyServicesCount = 0;
    this.insuranceCompanyClientsCount = 0;
    this.insuranceCompanyArchiveStatus = "";
    this.insuranceCompanyServicesData = new InsuranceCompanyServicesData();
    this.MedicalInsuranceLevelsDataList = [new MedicalInsuranceLevelsData()];
  }
  fillData(data) {
    this.insuranceCompanyCCWithCCName = data.insuranceCompanyCCWithCCName;
    this.insuranceCompanyToken = data.insuranceCompanyToken;
    this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent;
    this.insuranceCompanyNameAr = data.insuranceCompanyNameAr;
    this.insuranceCompanyNameEn = data.insuranceCompanyNameEn;
    this.insuranceCompanyNameUnd = data.insuranceCompanyNameUnd;
    this.insuranceCompanyAddressCurrent = data.insuranceCompanyAddressCurrent;
    this.insuranceCompanyAddressAr = data.insuranceCompanyAddressAr;
    this.insuranceCompanyAddressEn = data.insuranceCompanyAddressEn;
    this.insuranceCompanyAddressUnd = data.insuranceCompanyAddressUnd;
    this.insuranceCompanyCountryCodeName = data.insuranceCompanyCountryCodeName;
    this.insuranceCompanyCountryCode = data.insuranceCompanyCountryCode;
    this.insuranceCompanyPhone = data.insuranceCompanyPhone;
    this.insuranceCompanyPhoneWithCC = data.insuranceCompanyPhoneWithCC;
    this.insuranceCompanyDescriptionCurrent =
      data.insuranceCompanyDescriptionCurrent;
    this.insuranceCompanyDescriptionEn = data.insuranceCompanyDescriptionEn;
    this.insuranceCompanyDescriptionAr = data.insuranceCompanyDescriptionAr;
    this.insuranceCompanyDescriptionUnd = data.insuranceCompanyDescriptionUnd;
    this.insuranceCompanyServicesCount =
      data.insuranceCompanyServicesCount ?? 0;
    this.insuranceCompanyClientsCount = data.insuranceCompanyClientsCount ?? 0;
    this.insuranceCompanyArchiveStatus = data.insuranceCompanyArchiveStatus;
    this.insuranceCompanyServicesData.fillData(
      data.insuranceCompanyServicesData
    );
    this.MedicalInsuranceLevelsDataList =
      data.MedicalInsuranceLevelsDataList ?? [new MedicalInsuranceLevelsData()];
  }

  async getAllInsuranceCompanies(
    language,
    userAuthorizeToken,
    selfPage,
    filterStatus = "",
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/InsuranceCompanies/GetAllInsuranceCompanies?language=${language}&userAuthorizeToken=${userAuthorizeToken}&insuranceCompanyArchiveStatus=false&page=${selfPage}&paginationStatus=&pageSize=${PAGE_SIZE}&filterStatus=${filterStatus}&textSearch=${textSearch}&sortToken=&includeInsuranceCompanyServicesStatus=true&includeMedicalInsuranceLevelsStatus=true`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getInsuranceCompanyDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/InsuranceCompanies/GetInsuranceCompanyDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&insuranceCompanyToken=${this.insuranceCompanyToken}&includeInsuranceCompanyServicesStatus=true&includeMedicalInsuranceLevelsStatus=true`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfInsuranceCompanies(
    language,
    userAuthorizeToken,
    filterStatus = ""
  ) {
    try {
      let response = await axios.get(
        `/InsuranceCompanies/GetDialogOfInsuranceCompanies?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=${filterStatus}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateInsuranceCompany(language, userAuthorizeToken) {
    let ccNameWithCC = this.insuranceCompanyCCWithCCName.split(" ");
    this.insuranceCompanyCountryCodeName = ccNameWithCC[0];
    this.insuranceCompanyCountryCode = ccNameWithCC[1];

    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insuranceCompanyToken: this.insuranceCompanyToken,
      insuranceCompanyNameEn: this.insuranceCompanyNameEn,
      insuranceCompanyNameAr: this.insuranceCompanyNameAr,
      insuranceCompanyNameUnd: this.insuranceCompanyNameUnd,
      insuranceCompanyAddressEn: this.insuranceCompanyAddressEn,
      insuranceCompanyAddressAr: this.insuranceCompanyAddressAr,
      insuranceCompanyAddressUnd: this.insuranceCompanyAddressUnd,
      insuranceCompanyCountryCodeName: this.insuranceCompanyCountryCodeName,
      insuranceCompanyCountryCode: this.insuranceCompanyCountryCode,
      insuranceCompanyPhone: this.insuranceCompanyPhone,
      insuranceCompanyDescriptionEn: this.insuranceCompanyDescriptionEn,
      insuranceCompanyDescriptionAr: this.insuranceCompanyDescriptionAr,
      insuranceCompanyDescriptionUnd: this.insuranceCompanyDescriptionUnd,
    };
    try {
      let response = "";
      if (
        this.insuranceCompanyToken == "" ||
        this.insuranceCompanyToken == undefined
      ) {
        response = await axios.post(
          `/InsuranceCompanies/AddInsuranceCompany`,
          data
        );
      } else {
        response = await axios.post(
          `/InsuranceCompanies/UpdateInsuranceCompany`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveInsuranceCompany(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      insuranceCompanyToken: this.insuranceCompanyToken,
    };

    try {
      let response = await axios.post(
        `/InsuranceCompanies/ArchiveInsuranceCompany`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
