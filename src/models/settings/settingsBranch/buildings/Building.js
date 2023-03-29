import {
  STATUS,
  PAGE_SIZE,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  TEXT_MAX_LENGTH,
} from "@/utils/constants";
import {
  isTextAr,
  isTextEn,
  isLessThan,
  isGreaterThan,
} from "@/utils/functions";
import axios from "axios";
import i18n from "@/i18n/index.js";

export default class Building {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.buildingToken = "";
    this.establishmentToken = "BUI-1";
    this.establishmentNameCurrent = "";
    this.branchToken = "";
    this.buildingNameCollection = "";
    this.branchNameCurrent = "";
    this.buildingNameCurrent = "";
    this.buildingNameEn = "";
    this.buildingNameAr = "";
    this.buildingNameUnd = "";
    this.buildingCode = "";
    this.buildingDescriptionCurrent = "";
    this.buildingDescriptionEn = "";
    this.buildingDescriptionAr = "";
    this.buildingDescriptionUnd = "";
    this.buildingNotes = "";
    this.buildingArchiveStatus = "";
  }
  fillData(data) {
    this.buildingToken = data.buildingToken;
    // this.establishmentToken = data.establishmentToken;
    this.establishmentToken = "BUI-1";
    this.establishmentNameCurrent = data.establishmentNameCurrent;
    this.branchToken = data.branchToken;
    this.buildingNameCollection = data.buildingNameCollection;
    this.branchNameCurrent = data.branchNameCurrent;
    this.buildingNameCurrent = data.buildingNameCurrent;
    this.buildingNameEn = data.buildingNameEn;
    this.buildingNameAr = data.buildingNameAr;
    this.buildingNameUnd = data.buildingNameUnd;
    this.buildingCode = data.buildingCode;
    this.buildingDescriptionCurrent = data.buildingDescriptionCurrent;
    this.buildingDescriptionEn = data.buildingDescriptionEn;
    this.buildingDescriptionAr = data.buildingDescriptionAr;
    this.buildingDescriptionUnd = data.buildingDescriptionUnd;
    this.buildingNotes = data.buildingNotes;
    this.buildingArchiveStatus = data.buildingArchiveStatus;
  }

  async getAllBuildings(
    language,
    userAuthorizeToken,
    selfPage,
    branchToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/Buildings/GetAllBuildings?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=true&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&branchToken=${branchToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getBuildingDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Buildings/GetBuildingDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&buildingToken=${this.buildingToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfBuildings(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Buildings/GetDialogOfBuildings?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&branchToken=${this.branchToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async validBuilding() {
    this.branchToken = this.branchToken.trim();
    this.buildingToken = this.buildingToken.trim();
    this.buildingNameAr = this.buildingNameAr.trim();
    this.buildingNameEn = this.buildingNameEn.trim();
    this.buildingNameUnd = this.buildingNameUnd.trim();
    this.buildingDescriptionEn = this.buildingDescriptionEn.trim();
    this.buildingDescriptionAr = this.buildingDescriptionAr.trim();
    this.buildingDescriptionUnd = this.buildingDescriptionUnd.trim();
    this.buildingNotes = this.buildingNotes.trim();

    let response = {
      data: {
        status: STATUS.ERROR,
        msg: i18n.t("failedOperation"),
        data: "",
      },
    };

    if (!this.branchToken) {
      response.data.msg = i18n.t("selectBranch");
      return response;
    }
    if (!this.buildingNameAr && !this.buildingNameEn && !this.buildingNameUnd) {
      response.data.msg = i18n.t("enterBuildingName");
      return response;
    }
    if (this.buildingNameAr) {
      if (!isTextAr(this.buildingNameAr)) {
        response.data.msg = i18n.t("buildingNameArMustBeArabic");
        return response;
      }
      if (isLessThan(this.buildingNameAr, NAME_MIN_LENGTH)) {
        response.data.msg =
          i18n.t("buildingNameArMustBeValidLengthMin") + NAME_MIN_LENGTH;
        return response;
      }
      if (isGreaterThan(this.buildingNameAr, NAME_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("buildingNameArMustBeValidLength") + NAME_MAX_LENGTH;
        return response;
      }
    }
    if (this.buildingNameEn) {
      if (!isTextEn(this.buildingNameEn)) {
        response.data.msg = i18n.t("buildingNameEnMustBeEnglish");
        return response;
      }
      if (isLessThan(this.buildingNameEn, NAME_MIN_LENGTH)) {
        response.data.msg =
          i18n.t("buildingNameEnMustBeValidLengthMin") + NAME_MIN_LENGTH;
        return response;
      }
      if (isGreaterThan(this.buildingNameEn, NAME_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("buildingNameEnMustBeValidLength") + NAME_MAX_LENGTH;
        return response;
      }
    }
    if (this.buildingDescriptionAr) {
      if (!isTextAr(this.buildingDescriptionAr)) {
        response.data.msg = i18n.t("buildingDescriptionArMustBeArabic");
        return response;
      }
      if (isGreaterThan(this.buildingDescriptionAr, TEXT_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("buildingDescriptionArMustBeValidLength") + TEXT_MAX_LENGTH;
        return response;
      }
    }
    if (this.buildingDescriptionEn) {
      if (!isTextEn(this.buildingDescriptionEn)) {
        response.data.msg = i18n.t("buildingDescriptionEnMustBeEnglish");
        return response;
      }
      if (isGreaterThan(this.buildingDescriptionEn, TEXT_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("buildingDescriptionEnMustBeValidLength") + TEXT_MAX_LENGTH;
        return response;
      }
    }

    response.data.status = STATUS.SUCCESS;
    response.data.msg = i18n.t("successOperation");
    return response;
  }

  async addOrUpdateBuilding(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      branchToken: this.branchToken,
      buildingToken: this.buildingToken,
      buildingNameAr: this.buildingNameAr,
      buildingNameEn: this.buildingNameEn,
      buildingNameUnd: this.buildingNameUnd,
      buildingDescriptionEn: this.buildingDescriptionEn,
      buildingDescriptionAr: this.buildingDescriptionAr,
      buildingDescriptionUnd: this.buildingDescriptionUnd,
      buildingNotes: this.buildingNotes,
    };

    //#region validation
    let validation = await this.validBuilding();
    if (validation.data.status != STATUS.SUCCESS) return validation;
    //#endregion validation

    try {
      let response = "";
      if (this.buildingToken == "" || this.buildingToken == undefined) {
        response = await axios.post(`/Buildings/AddBuilding`, data);
      } else {
        response = await axios.post(`/Buildings/UpdateBuilding`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveBuilding(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      buildingToken: this.buildingToken,
    };

    try {
      let response = await axios.post(`/Buildings/ArchiveBuilding`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
