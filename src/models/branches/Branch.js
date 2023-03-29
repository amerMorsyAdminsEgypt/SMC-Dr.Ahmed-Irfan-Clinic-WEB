import axios from "axios";
import { numberToEn } from "@/utils/functions";
import { DEFAULT_COUNTRY_CODE } from "@/utils/constants";

export default class Branch {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.establishmentToken = "EST-1";
    this.establishmentNameCurrent = "";
    this.branchMangareEmployeeToken = "";
    this.branchMangareEmployeeNameCurrent = "";
    this.countryToken = "";
    this.countryNameCurrent = "";
    this.governateToken = "";
    this.governateNameCurrent = "";
    this.cityToken = "";
    this.cityNameCurrent = "";
    this.districtToken = "";
    this.districtNameCurrent = "";
    this.branchToken = "";
    this.branchNameEn = "";
    this.branchNameAr = "";
    this.branchNameUnd = "";
    this.branchFirstNumberCCWithCCName = DEFAULT_COUNTRY_CODE.CCWithCCName;
    this.branchFirstNumberCountryCodeName =
      DEFAULT_COUNTRY_CODE.countryCodeName;
    this.branchFirstNumberCountryCode = DEFAULT_COUNTRY_CODE.countryCode;
    this.branchFirstPhone = "";
    this.branchSecondNumberCCWithCCName = DEFAULT_COUNTRY_CODE.CCWithCCName;
    this.branchSecondNumberCountryCodeName =
      DEFAULT_COUNTRY_CODE.countryCodeName;
    this.branchSecondNumberCountryCode = DEFAULT_COUNTRY_CODE.countryCode;
    this.branchSecondPhone = "";
    this.branchLandLineCCWithCCName = DEFAULT_COUNTRY_CODE.CCWithCCName;
    this.branchLandLineCountryCodeName = DEFAULT_COUNTRY_CODE.countryCodeName;
    this.branchLandLineCountryCode = DEFAULT_COUNTRY_CODE.countryCode;
    this.branchLandLine = "";
    this.branchAddressEn = "";
    this.branchAddressAr = "";
    this.branchAddressUnd = "";
    this.branchLatitude = "";
    this.branchLongitude = "";
    this.branchEndLatitude = "";
    this.branchEndLongitude = "";
    this.branchDistance = "";
    this.branchNotes = "";
    this.branchTaxNumber = "";
    this.branchImagePath = "";
  }
  fillData(branchData) {
    this.image = branchData.image;
    this.establishmentToken = branchData.establishmentToken;
    this.establishmentNameCurrent = branchData.establishmentNameCurrent;
    this.branchMangareEmployeeToken = branchData.branchMangareEmployeeToken;
    this.branchMangareEmployeeNameCurrent =
      branchData.branchMangareEmployeeNameCurrent;
    this.countryToken = branchData.countryToken;
    this.countryNameCurrent = branchData.countryNameCurrent;
    this.governateToken = branchData.governateToken;
    this.governateNameCurrent = branchData.governateNameCurrent;
    this.cityToken = branchData.cityToken;
    this.cityNameCurrent = branchData.cityNameCurrent;
    this.districtToken = branchData.districtToken;
    this.districtNameCurrent = branchData.districtNameCurrent;
    this.branchToken = branchData.branchToken;
    this.branchNameEn = branchData.branchNameEn;
    this.branchNameAr = branchData.branchNameAr;
    this.branchNameUnd = branchData.branchNameUnd;
    this.branchFirstNumberCCWithCCName = `${branchData.branchFirstNumberCountryCodeName} ${branchData.branchFirstNumberCountryCode}`;
    this.branchFirstNumberCountryCodeName =
      branchData.branchFirstNumberCountryCodeName;
    this.branchFirstNumberCountryCode = branchData.branchFirstNumberCountryCode;
    this.branchFirstPhone = branchData.branchFirstPhone;
    this.branchSecondNumberCCWithCCName = `${branchData.branchSecondNumberCountryCodeName} ${branchData.branchSecondNumberCountryCode}`;
    this.branchSecondNumberCountryCodeName =
      branchData.branchSecondNumberCountryCodeName;
    this.branchSecondNumberCountryCode =
      branchData.branchSecondNumberCountryCode;
    this.branchSecondPhone = branchData.branchSecondPhone;
    this.branchLandLineCCWithCCName = `${branchData.branchLandLineCountryCodeName} ${branchData.branchLandLineCountryCode}`;
    this.branchLandLineCountryCodeName =
      branchData.branchLandLineCountryCodeName;
    this.branchLandLineCountryCode = branchData.branchLandLineCountryCode;
    this.branchLandLine = branchData.branchLandLine;
    this.branchAddressEn = branchData.branchAddressEn;
    this.branchAddressAr = branchData.branchAddressAr;
    this.branchAddressUnd = branchData.branchAddressUnd;
    this.branchLatitude = branchData.branchLatitude;
    this.branchLongitude = branchData.branchLongitude;
    this.branchEndLatitude = branchData.branchEndLatitude;
    this.branchEndLongitude = branchData.branchEndLongitude;
    this.branchDistance = branchData.branchDistance;
    this.branchNotes = branchData.branchNotes;
    this.branchTaxNumber = branchData.branchTaxNumber;
    this.branchImagePath = branchData.branchImagePath;
  }

  async getBranchDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Branches/GetBranchDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&branchToken=${this.branchToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfBranches(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Branches/GetDialogOfBranches?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateBranch(language, userAuthorizeToken) {
    var data = {
      image: this.image,
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      branchToken: this.branchToken,
      establishmentToken: this.establishmentToken,
      branchMangareEmployeeToken: this.branchMangareEmployeeToken,
      countryToken: this.countryToken,
      governateToken: this.governateToken,
      cityToken: this.cityToken,
      districtToken: this.districtToken,
      branchNameEn: this.branchNameEn,
      branchNameAr: this.branchNameAr,
      branchNameUnd: this.branchNameUnd,
      branchFirstNumberCountryCodeName: this.branchFirstNumberCountryCodeName,
      branchFirstNumberCountryCode: this.branchFirstNumberCountryCode,
      branchFirstPhone: numberToEn(this.branchFirstPhone),
      branchSecondNumberCountryCodeName: this.branchSecondNumberCountryCodeName,
      branchSecondNumberCountryCode: this.branchSecondNumberCountryCode,
      branchSecondPhone: numberToEn(this.branchSecondPhone),
      branchLandLineCountryCodeName: this.branchLandLineCountryCodeName,
      branchLandLineCountryCode: this.branchLandLineCountryCode,
      branchLandLine: numberToEn(this.branchLandLine),
      branchAddressEn: this.branchAddressEn,
      branchAddressAr: this.branchAddressAr,
      branchAddressUnd: this.branchAddressUnd,
      branchLatitude: this.branchLatitude,
      branchLongitude: this.branchLongitude,
      branchEndLatitude: this.branchEndLatitude,
      branchEndLongitude: this.branchEndLongitude,
      branchDistance: this.branchDistance,
      branchNotes: this.branchNotes,
      branchTaxNumber: this.branchTaxNumber,
    };
    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.branchToken == "" || this.branchToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Branches/AddBranchWithImage`, formData);
        } else {
          response = await axios.post(`/Branches/AddBranchWithoutImage`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/Branches/UpdateBranchWithImage`,
            formData
          );
        } else {
          response = await axios.post(
            `/Branches/UpdateBranchWithoutImage`,
            data
          );
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBranch(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      branchToken: this.branchToken,
    };

    try {
      let response = await axios.post(`/Branches/ArchiveBranch`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
