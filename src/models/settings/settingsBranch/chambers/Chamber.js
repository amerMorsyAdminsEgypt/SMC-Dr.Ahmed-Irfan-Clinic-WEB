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

export default class Chamber {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.chamberToken = "";
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
    this.chamberNameCollection = "";
    this.chamberNameCurrent = "";
    this.chamberNameEn = "";
    this.chamberNameAr = "";
    this.chamberNameUnd = "";
    this.chamberCode = "";
    this.chamberDescriptionCurrent = "";
    this.chamberDescriptionEn = "";
    this.chamberDescriptionAr = "";
    this.chamberDescriptionUnd = "";
    this.chamberNotes = "";
    this.chamberArchiveStatus = "";
  }
  fillData(data) {
    this.chamberToken = data.chamberToken;
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
    this.chamberNameCollection = data.chamberNameCollection;
    this.chamberNameCurrent = data.chamberNameCurrent;
    this.chamberNameEn = data.chamberNameEn;
    this.chamberNameAr = data.chamberNameAr;
    this.chamberNameUnd = data.chamberNameUnd;
    this.chamberCode = data.chamberCode;
    this.chamberDescriptionCurrent = data.chamberDescriptionCurrent;
    this.chamberDescriptionEn = data.chamberDescriptionEn;
    this.chamberDescriptionAr = data.chamberDescriptionAr;
    this.chamberDescriptionUnd = data.chamberDescriptionUnd;
    this.chamberNotes = data.chamberNotes;
    this.chamberArchiveStatus = data.chamberArchiveStatus;
  }

  async getAllChambers(
    language,
    userAuthorizeToken,
    selfPage,
    branchToken,
    buildingToken,
    floorToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/Chambers/GetAllChambers/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=true&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&branchToken=${branchToken}&buildingToken=${buildingToken}&floorToken=${floorToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getChamberDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Chambers/GetChamberDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&chamberToken=${this.chamberToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfChambers(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Chambers/GetDialogOfChambers?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&branchToken=${this.branchToken}&buildingToken=${this.buildingToken}&floorToken=${this.floorToken}`
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

  async addOrUpdateChamber(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      chamberToken: this.chamberToken,
      floorToken: this.floorToken,
      generalSpecialtyToken: this.generalSpecialtyToken,
      chamberNameEn: this.chamberNameEn,
      chamberNameAr: this.chamberNameAr,
      chamberNameUnd: this.chamberNameUnd,
      chamberDescriptionEn: this.chamberDescriptionEn,
      chamberDescriptionAr: this.chamberDescriptionAr,
      chamberDescriptionUnd: this.chamberDescriptionUnd,
      chamberNotes: this.chamberNotes,
    };

    //#region validation
    // let validation = await this.validFloor();
    // if (validation.data.status != STATUS.SUCCESS) return validation;
    //#endregion validation

    try {
      let response = "";
      if (this.chamberToken == "" || this.chamberToken == undefined) {
        response = await axios.post(`/Chambers/AddChamber`, data);
      } else {
        response = await axios.post(`/Chambers/UpdateChamber`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveChamber(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      chamberToken: this.chamberToken,
    };

    try {
      let response = await axios.post(`/Chambers/ArchiveChamber`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
