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

export default class Floor {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.floorToken = "";
    this.establishmentToken = "EST-1";
    this.establishmentNameCurrent = "";
    this.branchToken = "";
    this.branchNameCurrent = "";
    this.buildingToken = "";
    this.buildingNameCurrent = "";
    this.floorNameCollection = "";
    this.floorNameCurrent = "";
    this.floorNameEn = "";
    this.floorNameAr = "";
    this.floorNameUnd = "";
    this.floorCode = "";
    this.floorDescriptionCurrent = "";
    this.floorDescriptionEn = "";
    this.floorDescriptionAr = "";
    this.floorDescriptionUnd = "";
    this.floorNotes = "";
    this.floorArchiveStatus = "";
  }
  fillData(data) {
    this.floorToken = data.floorToken;
    this.establishmentToken = data.establishmentToken;
    this.establishmentNameCurrent = data.establishmentNameCurrent;
    this.branchToken = data.branchToken;
    this.branchNameCurrent = data.branchNameCurrent;
    this.buildingToken = data.buildingToken;
    this.buildingNameCurrent = data.buildingNameCurrent;
    this.floorNameCollection = data.floorNameCollection;
    this.floorNameCurrent = data.floorNameCurrent;
    this.floorNameEn = data.floorNameEn;
    this.floorNameAr = data.floorNameAr;
    this.floorNameUnd = data.floorNameUnd;
    this.floorCode = data.floorCode;
    this.floorDescriptionCurrent = data.floorDescriptionCurrent;
    this.floorDescriptionEn = data.floorDescriptionEn;
    this.floorDescriptionAr = data.floorDescriptionAr;
    this.floorDescriptionUnd = data.floorDescriptionUnd;
    this.floorNotes = data.floorNotes;
    this.floorArchiveStatus = data.floorArchiveStatus;
  }

  async getAllFloors(
    language,
    userAuthorizeToken,
    selfPage,
    branchToken,
    buildingToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/Floors/GetAllFloors/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=true&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&branchToken=${branchToken}&buildingToken=${buildingToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getFloorDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Floors/GetFloorDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&floorToken=${this.floorToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfFloors(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Floors/GetDialogOfFloors?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&branchToken=${this.branchToken}&buildingToken=${this.buildingToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async validFloor() {
    this.buildingToken = this.buildingToken.trim();
    this.floorToken = this.floorToken.trim();
    this.floorNameAr = this.floorNameAr.trim();
    this.floorNameEn = this.floorNameEn.trim();
    this.floorNameUnd = this.floorNameUnd.trim();
    this.floorDescriptionEn = this.floorDescriptionEn.trim();
    this.floorDescriptionAr = this.floorDescriptionAr.trim();
    this.floorDescriptionUnd = this.floorDescriptionUnd.trim();
    this.floorNotes = this.floorNotes.trim();

    let response = {
      data: {
        status: STATUS.ERROR,
        msg: i18n.t("failedOperation"),
        data: "",
      },
    };

    if (!this.buildingToken) {
      response.data.msg = i18n.t("selectBuilding");
      return response;
    }
    if (!this.floorNameAr && !this.floorNameEn && !this.floorNameUnd) {
      response.data.msg = i18n.t("enterFloorName");
      return response;
    }
    if (this.floorNameAr) {
      if (!isTextAr(this.floorNameAr)) {
        response.data.msg = i18n.t("floorNameArMustBeArabic");
        return response;
      }
      if (isLessThan(this.floorNameAr, NAME_MIN_LENGTH)) {
        response.data.msg =
          i18n.t("floorNameArMustBeValidLengthMin") + NAME_MIN_LENGTH;
        return response;
      }
      if (isGreaterThan(this.floorNameAr, NAME_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("floorNameArMustBeValidLength") + NAME_MAX_LENGTH;
        return response;
      }
    }
    if (this.floorNameEn) {
      if (!isTextEn(this.floorNameEn)) {
        response.data.msg = i18n.t("floorNameEnMustBeEnglish");
        return response;
      }
      if (isLessThan(this.floorNameEn, NAME_MIN_LENGTH)) {
        response.data.msg =
          i18n.t("floorNameEnMustBeValidLengthMin") + NAME_MIN_LENGTH;
        return response;
      }
      if (isGreaterThan(this.floorNameEn, NAME_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("floorNameEnMustBeValidLength") + NAME_MAX_LENGTH;
        return response;
      }
    }
    if (this.floorDescriptionAr) {
      if (!isTextAr(this.floorDescriptionAr)) {
        response.data.msg = i18n.t("floorDescriptionArMustBeArabic");
        return response;
      }
      if (isGreaterThan(this.floorDescriptionAr, TEXT_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("floorDescriptionArMustBeValidLength") + TEXT_MAX_LENGTH;
        return response;
      }
    }
    if (this.floorDescriptionEn) {
      if (!isTextEn(this.floorDescriptionEn)) {
        response.data.msg = i18n.t("floorDescriptionEnMustBeEnglish");
        return response;
      }
      if (isGreaterThan(this.floorDescriptionEn, TEXT_MAX_LENGTH)) {
        response.data.msg =
          i18n.t("floorDescriptionEnMustBeValidLength") + TEXT_MAX_LENGTH;
        return response;
      }
    }

    response.data.status = STATUS.SUCCESS;
    response.data.msg = i18n.t("successOperation");
    return response;
  }

  async addOrUpdateFloor(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      buildingToken: this.buildingToken,
      floorToken: this.floorToken,
      floorNameAr: this.floorNameAr,
      floorNameEn: this.floorNameEn,
      floorNameUnd: this.floorNameUnd,
      floorDescriptionEn: this.floorDescriptionEn,
      floorDescriptionAr: this.floorDescriptionAr,
      floorDescriptionUnd: this.floorDescriptionUnd,
      floorNotes: this.floorNotes,
    };

    //#region validation
    let validation = await this.validFloor();
    if (validation.data.status != STATUS.SUCCESS) return validation;
    //#endregion validation

    try {
      let response = "";
      if (this.floorToken == "" || this.floorToken == undefined) {
        response = await axios.post(`/Floors/AddFloor`, data);
      } else {
        response = await axios.post(`/Floors/UpdateFloor`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveFloor(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      floorToken: this.floorToken,
    };

    try {
      let response = await axios.post(`/Floors/ArchiveFloor`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
