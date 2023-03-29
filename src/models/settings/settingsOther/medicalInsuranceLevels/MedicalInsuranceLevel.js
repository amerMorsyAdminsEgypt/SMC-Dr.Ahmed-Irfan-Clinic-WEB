import MedicalInsuranceLevelServicesData from "../medicalInsuranceLevelServices/MedicalInsuranceLevelServicesData";
import axios from "axios";
import { PAGE_SIZE } from "@/utils/constants";

export default class MedicalInsuranceLevel {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicalInsuranceLevelToken = "";
    this.medicalInsuranceLevelCode = "";
    this.colorToken = "";
    this.colorNameCurrent = "";
    this.insuranceCompanyToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.medicalInsuranceLevelNameCurrent = "";
    this.medicalInsuranceLevelNameAr = "";
    this.medicalInsuranceLevelNameEn = "";
    this.medicalInsuranceLevelNameUnd = "";
    this.medicalInsuranceLevelDescriptionCurrent = "";
    this.medicalInsuranceLevelDescriptionEn = "";
    this.medicalInsuranceLevelDescriptionAr = "";
    this.medicalInsuranceLevelDescriptionUnd = "";
    this.medicalInsuranceLevelNotes = "";
    this.medicalInsuranceLevelArchiveStatus = "";
    this.medicalInsuranceLevelServicesData = [
      new MedicalInsuranceLevelServicesData(),
    ];
  }
  fillData(data) {
    if (data) {
      this.medicalInsuranceLevelToken = data.medicalInsuranceLevelToken ?? "";
      this.medicalInsuranceLevelCode = data.medicalInsuranceLevelCode ?? "";
      this.colorToken = data.colorToken ?? "";
      this.colorNameCurrent = data.colorNameCurrent ?? "";
      this.insuranceCompanyToken = data.insuranceCompanyToken ?? "";
      this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent ?? "";
      this.medicalInsuranceLevelNameCurrent =
        data.medicalInsuranceLevelNameCurrent ?? "";
      this.medicalInsuranceLevelNameAr = data.medicalInsuranceLevelNameAr ?? "";
      this.medicalInsuranceLevelNameEn = data.medicalInsuranceLevelNameEn ?? "";
      this.medicalInsuranceLevelNameUnd =
        data.medicalInsuranceLevelNameUnd ?? "";
      this.medicalInsuranceLevelDescriptionCurrent =
        data.medicalInsuranceLevelDescriptionCurrent ?? "";
      this.medicalInsuranceLevelDescriptionEn =
        data.medicalInsuranceLevelDescriptionEn ?? "";
      this.medicalInsuranceLevelDescriptionAr =
        data.medicalInsuranceLevelDescriptionAr ?? "";
      this.medicalInsuranceLevelDescriptionUnd =
        data.medicalInsuranceLevelDescriptionUnd ?? "";
      this.medicalInsuranceLevelNotes = data.medicalInsuranceLevelNotes ?? "";
      this.medicalInsuranceLevelArchiveStatus =
        data.medicalInsuranceLevelArchiveStatus ?? "";
      this.medicalInsuranceLevelServicesData =
        data.medicalInsuranceLevelServicesData ?? [
          new MedicalInsuranceLevelServicesData(),
        ];
    } else {
      this.setInitialValue();
    }
  }

  async getAllMedicalInsuranceLevels(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch,
    insuranceCompanyToken
  ) {
    try {
      let response = await axios.get(
        `/MedicalInsuranceLevels/GetAllMedicalInsuranceLevels?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}&insuranceCompanyToken=${insuranceCompanyToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMedicalInsuranceLevelDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicalInsuranceLevels/GetMedicalInsuranceLevelDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicalInsuranceLevelToken=${this.medicalInsuranceLevelToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMedicalInsuranceLevel(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicalInsuranceLevelToken: this.medicalInsuranceLevelToken,
      insuranceCompanyToken: this.insuranceCompanyToken,
      colorToken: this.colorToken,
      medicalInsuranceLevelCode: this.medicalInsuranceLevelCode,
      medicalInsuranceLevelNameEn: this.medicalInsuranceLevelNameEn,
      medicalInsuranceLevelNameAr: this.medicalInsuranceLevelNameAr,
      medicalInsuranceLevelNameUnd: this.medicalInsuranceLevelNameUnd,
      medicalInsuranceLevelDescriptionEn:
        this.medicalInsuranceLevelDescriptionEn,
      medicalInsuranceLevelDescriptionAr:
        this.medicalInsuranceLevelDescriptionAr,
      medicalInsuranceLevelDescriptionUnd:
        this.medicalInsuranceLevelDescriptionUnd,
      medicalInsuranceLevelNotes: this.medicalInsuranceLevelNotes,
      medicalInsuranceLevelServicesData: this.medicalInsuranceLevelServicesData,
    };

    try {
      let response = "";
      if (
        this.medicalInsuranceLevelToken == "" ||
        this.medicalInsuranceLevelToken == undefined
      ) {
        response = await axios.post(
          `/MedicalInsuranceLevels/AddMedicalInsuranceLevel`,
          data
        );
      } else {
        response = await axios.post(
          `/MedicalInsuranceLevels/UpdateMedicalInsuranceLevel`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMedicalInsuranceLevel(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicalInsuranceLevelToken: this.medicalInsuranceLevelToken,
    };

    try {
      let response = await axios.post(
        `/MedicalInsuranceLevels/ArchiveMedicalInsuranceLevel`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
