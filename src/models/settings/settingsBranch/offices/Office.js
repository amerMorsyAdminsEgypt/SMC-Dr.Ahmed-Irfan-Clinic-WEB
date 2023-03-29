import {
  // STATUS,
  PAGE_SIZE,
  // NAME_MAX_LENGTH,
  // NAME_MIN_LENGTH,
  // TEXT_MAX_LENGTH,
} from "@/utils/constants";
// import {
//   isTextAr,
//   isTextEn,
//   isLessThan,
//   isGreaterThan,
// } from "@/utils/functions";

import axios from "axios";
// import i18n from "@/i18n/index.js";

export default class Office {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.officeToken = "";
    this.establishmentToken = "EST-1";
    this.establishmentNameCurrent = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.buildingToken = "";
    this.buildingNameCurrent = "";
    this.floorToken = "";
    this.floorNameCurrent = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.chamberToken = "";
    this.chamberNameCurrent = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.officeNameCollection = "";
    this.officeNameCurrent = "";
    this.officeNameEn = "";
    this.officeNameAr = "";
    this.officeNameUnd = "";
    this.officeCode = "";
    this.officeDescriptionCurrent = "";
    this.officeDescriptionEn = "";
    this.officeDescriptionAr = "";
    this.officeDescriptionUnd = "";
    this.officeNotes = "";
    this.officeArchiveStatus = "";
  }
  fillData(data) {
    this.officeToken = data.officeToken;
    this.establishmentToken = data.establishmentToken;
    this.establishmentNameCurrent = data.establishmentNameCurrent;
    this.branchToken = data.branchToken;
    this.branchNameCurrent = data.branchNameCurrent;
    this.buildingToken = data.buildingToken;
    this.buildingNameCurrent = data.buildingNameCurrent;
    this.floorToken = data.floorToken;
    this.floorNameCurrent = data.floorNameCurrent;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.chamberToken = data.chamberToken;
    this.chamberNameCurrent = data.chamberNameCurrent;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.officeNameCollection = data.officeNameCollection;
    this.officeNameCurrent = data.officeNameCurrent;
    this.officeNameEn = data.officeNameEn;
    this.officeNameAr = data.officeNameAr;
    this.officeNameUnd = data.officeNameUnd;
    this.officeCode = data.officeCode;
    this.officeDescriptionCurrent = data.officeDescriptionCurrent;
    this.officeDescriptionEn = data.officeDescriptionEn;
    this.officeDescriptionAr = data.officeDescriptionAr;
    this.officeDescriptionUnd = data.officeDescriptionUnd;
    this.officeNotes = data.officeNotes;
    this.officeArchiveStatus = data.officeArchiveStatus;
  }

  async getAllOffices(
    language,
    userAuthorizeToken,
    selfPage,
    branchToken,
    buildingToken,
    floorToken,
    chamberToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/Office/GetAllOffices/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=true&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&branchToken=${branchToken}&buildingToken=${buildingToken}&floorToken=${floorToken}&chamberToken=${chamberToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getOfficeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Office/GetOfficeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&officeToken=${this.officeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfOffices(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Office/GetDialogOfOffices?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&branchToken=${this.branchToken}&buildingToken=${this.buildingToken}&floorToken=${this.floorToken}&chamberToken=${this.chamberToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  // async validFloor() {
  //   this.buildingToken = this.buildingToken.trim();
  //   this.floorToken = this.floorToken.trim();
  //   this.floorNameAr = this.floorNameAr.trim();
  //   this.floorNameEn = this.floorNameEn.trim();
  //   this.floorNameUnd = this.floorNameUnd.trim();
  //   this.floorDescriptionEn = this.floorDescriptionEn.trim();
  //   this.floorDescriptionAr = this.floorDescriptionAr.trim();
  //   this.floorDescriptionUnd = this.floorDescriptionUnd.trim();
  //   this.floorNotes = this.floorNotes.trim();

  //   let response = {
  //     data: {
  //       status: STATUS.ERROR,
  //       msg: i18n.t("failedOperation"),
  //       data: "",
  //     },
  //   };

  //   if (!this.buildingToken) {
  //     response.data.msg = i18n.t("selectBuilding");
  //     return response;
  //   }
  //   if (!this.floorNameAr && !this.floorNameEn && !this.floorNameUnd) {
  //     response.data.msg = i18n.t("enterFloorName");
  //     return response;
  //   }
  //   if (this.floorNameAr) {
  //     if (!isTextAr(this.floorNameAr)) {
  //       response.data.msg = i18n.t("floorNameArMustBeArabic");
  //       return response;
  //     }
  //     if (isLessThan(this.floorNameAr, NAME_MIN_LENGTH)) {
  //       response.data.msg =
  //         i18n.t("floorNameArMustBeValidLengthMin") + NAME_MIN_LENGTH;
  //       return response;
  //     }
  //     if (isGreaterThan(this.floorNameAr, NAME_MAX_LENGTH)) {
  //       response.data.msg =
  //         i18n.t("floorNameArMustBeValidLength") + NAME_MAX_LENGTH;
  //       return response;
  //     }
  //   }
  //   if (this.floorNameEn) {
  //     if (!isTextEn(this.floorNameEn)) {
  //       response.data.msg = i18n.t("floorNameEnMustBeEnglish");
  //       return response;
  //     }
  //     if (isLessThan(this.floorNameEn, NAME_MIN_LENGTH)) {
  //       response.data.msg =
  //         i18n.t("floorNameEnMustBeValidLengthMin") + NAME_MIN_LENGTH;
  //       return response;
  //     }
  //     if (isGreaterThan(this.floorNameEn, NAME_MAX_LENGTH)) {
  //       response.data.msg =
  //         i18n.t("floorNameEnMustBeValidLength") + NAME_MAX_LENGTH;
  //       return response;
  //     }
  //   }
  //   if (this.floorDescriptionAr) {
  //     if (!isTextAr(this.floorDescriptionAr)) {
  //       response.data.msg = i18n.t("floorDescriptionArMustBeArabic");
  //       return response;
  //     }
  //     if (isGreaterThan(this.floorDescriptionAr, TEXT_MAX_LENGTH)) {
  //       response.data.msg =
  //         i18n.t("floorDescriptionArMustBeValidLength") + TEXT_MAX_LENGTH;
  //       return response;
  //     }
  //   }
  //   if (this.floorDescriptionEn) {
  //     if (!isTextEn(this.floorDescriptionEn)) {
  //       response.data.msg = i18n.t("floorDescriptionEnMustBeEnglish");
  //       return response;
  //     }
  //     if (isGreaterThan(this.floorDescriptionEn, TEXT_MAX_LENGTH)) {
  //       response.data.msg =
  //         i18n.t("floorDescriptionEnMustBeValidLength") + TEXT_MAX_LENGTH;
  //       return response;
  //     }
  //   }

  //   response.data.status = STATUS.SUCCESS;
  //   response.data.msg = i18n.t("successOperation");
  //   return response;
  // }

  async addOrUpdateOffice(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officeToken: this.officeToken,
      chamberToken: this.chamberToken,
      specialSpecialtyToken: this.specialSpecialtyToken,
      officeNameEn: this.officeNameEn,
      officeNameAr: this.officeNameAr,
      officeNameUnd: this.officeNameUnd,
      officeDescriptionEn: this.officeDescriptionEn,
      officeDescriptionAr: this.officeDescriptionAr,
      officeDescriptionUnd: this.officeDescriptionUnd,
      officeNotes: this.officeNotes,
    };

    //#region validation
    // let validation = await this.validFloor();
    // if (validation.data.status != STATUS.SUCCESS) return validation;
    //#endregion validation

    try {
      let response = "";
      if (this.officeToken == "" || this.officeToken == undefined) {
        response = await axios.post(`/Office/AddOffice`, data);
      } else {
        response = await axios.post(`/Office/UpdateOffice`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveOffice(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      officeToken: this.officeToken,
    };

    try {
      let response = await axios.post(`/Office/ArchiveOffice`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
