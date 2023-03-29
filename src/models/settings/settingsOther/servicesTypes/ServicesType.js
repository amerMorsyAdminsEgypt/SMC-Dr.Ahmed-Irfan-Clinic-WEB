import {
  STATUS,
  PAGE_SIZE,
  SERVICE_TYPE_NAME_MAX_LENGTH,
  SERVICE_TYPE_NAME_MIN_LENGTH,
  SERVICE_NAME_DESC,
} from "@/utils/constants";
import {
  isNameAr,
  isTextAr,
  isTextEn,
  isNameEN,
  isLessThan,
  isGreaterThan,
} from "@/utils/functions";
import axios from "axios";
import i18n from "@/i18n/index.js";

export default class ServicesType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.serviceTypeToken = "";
    this.serviceTypeNameCurrent = "";
    this.serviceTypeNameEn = "";
    this.serviceTypeNameAr = "";
    this.serviceTypeNameUnd = "";
    this.serviceTypeDescriptionCurrent = "";
    this.serviceTypeDescriptionEn = "";
    this.serviceTypeDescriptionAr = "";
    this.serviceTypeDescriptionUnd = "";
    this.serviceTypeNotes = "";
    this.serviceTypeArchiveStatus = "";
  }
  fillData(data) {
    this.serviceTypeToken = data.serviceTypeToken;
    this.serviceTypeNameCurrent = data.serviceTypeNameCurrent;
    this.serviceTypeNameEn = data.serviceTypeNameEn;
    this.serviceTypeNameAr = data.serviceTypeNameAr;
    this.serviceTypeNameUnd = data.serviceTypeNameUnd;
    this.serviceTypeDescriptionCurrent = data.serviceTypeDescriptionCurrent;
    this.serviceTypeDescriptionEn = data.serviceTypeDescriptionEn;
    this.serviceTypeDescriptionAr = data.serviceTypeDescriptionAr;
    this.serviceTypeDescriptionUnd = data.serviceTypeDescriptionUnd;
    this.serviceTypeNotes = data.serviceTypeNotes;
    this.serviceTypeArchiveStatus = data.serviceTypeArchiveStatus;
  }

  async getAllServicesTypes(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/ServicesTypes/GetAllServicesTypes/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getServicesTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesTypes/GetServiceTypeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&serviceTypeToken=${this.serviceTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfServicesTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesTypes/GetDialogOfServicesTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateServicesType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      serviceTypeToken: this.serviceTypeToken,
      serviceTypeNameEn: this.serviceTypeNameEn,
      serviceTypeNameAr: this.serviceTypeNameAr,
      serviceTypeNameUnd: this.serviceTypeNameUnd,
      serviceTypeDescriptionEn: this.serviceTypeDescriptionEn,
      serviceTypeDescriptionAr: this.serviceTypeDescriptionAr,
      serviceTypeDescriptionUnd: this.serviceTypeDescriptionUnd,
      serviceTypeNotes: this.serviceTypeNotes,
    };

    //#region  validation
    // trim data
    data.serviceTypeNameAr = data.serviceTypeNameAr.trim();
    data.serviceTypeNameEn = data.serviceTypeNameEn.trim();
    data.serviceTypeNameUnd = data.serviceTypeNameUnd.trim();
    data.serviceTypeDescriptionAr = data.serviceTypeDescriptionAr.trim();
    data.serviceTypeDescriptionEn = data.serviceTypeDescriptionEn.trim();
    data.serviceTypeDescriptionUnd = data.serviceTypeDescriptionUnd.trim();

    let response = {
      data: {
        status: STATUS.ERROR,
        msg: i18n.t("failedOperation"),
        data: "",
      },
    };
    if (
      !data.serviceTypeNameAr &&
      !data.serviceTypeNameEn &&
      !data.serviceTypeNameUnd
    ) {
      response.data.msg = i18n.t("enterOneAtLeast");
      return response;
    } else {
      if (data.serviceTypeNameAr) {
        if (!isNameAr(data.serviceTypeNameAr)) {
          response.data.msg = i18n.t("serviceTypeNameArMustBeArabic");
          return response;
        }
        // check  min length
        if (isLessThan(data.serviceTypeNameAr, SERVICE_TYPE_NAME_MIN_LENGTH)) {
          response.data.msg =
            i18n.t("serviceTypeNameArMustBeValidLengthMin") +
            SERVICE_TYPE_NAME_MIN_LENGTH;
          return response;
        }
        if (
          isGreaterThan(data.serviceTypeNameAr, SERVICE_TYPE_NAME_MAX_LENGTH)
        ) {
          response.data.msg =
            i18n.t("serviceTypeNameArMustBeValidLength") +
            SERVICE_TYPE_NAME_MIN_LENGTH;
          return response;
        }
      }
      if (data.serviceTypeNameEn) {
        // is valid english name
        if (!isNameEN(data.serviceTypeNameEn)) {
          response.data.msg = i18n.t("serviceTypeNameArMustBeEnglish");
          return response;
        }
        // check length
        if (data.serviceTypeNameEn.length > SERVICE_TYPE_NAME_MAX_LENGTH) {
          response.data.msg =
            i18n.t("serviceTypeNameEnMustBeValidLength") +
            SERVICE_TYPE_NAME_MAX_LENGTH;
          return response;
        }
        // check  min length
        if (isLessThan(data.serviceTypeNameEn, SERVICE_TYPE_NAME_MIN_LENGTH)) {
          response.data.msg =
            i18n.t("serviceTypeNameEnMustBeValidLengthMin") +
            SERVICE_TYPE_NAME_MIN_LENGTH;
          return response;
        }
        if (
          isGreaterThan(data.serviceTypeNameEn, SERVICE_TYPE_NAME_MAX_LENGTH)
        ) {
          response.data.msg =
            i18n.t("serviceTypeNameEnMustBeValidLength") +
            SERVICE_TYPE_NAME_MIN_LENGTH;
          return response;
        }
      }
      if (data.serviceTypeDescriptionAr) {
        // is valid arabic Description
        if (!isTextAr(data.serviceTypeDescriptionAr)) {
          response.data.msg = i18n.t("serviceTypeDescriptionArMustBeArabic");
          return response;
        }
        // check length
        if (isGreaterThan(data.serviceTypeDescriptionAr, SERVICE_NAME_DESC)) {
          response.data.msg =
            i18n.t("serviceTypeDescriptionArMustBeValidLength") +
            SERVICE_NAME_DESC;
          return response;
        }
      }
      if (data.serviceTypeDescriptionEn) {
        // is valid english Description
        if (!isTextEn(data.serviceTypeDescriptionEn)) {
          response.data.msg = i18n.t("serviceTypeDescriptionEnMustBeEnglish");
          return response;
        }
        // check length
        if (isGreaterThan(data.serviceTypeDescriptionEn, SERVICE_NAME_DESC)) {
          response.data.msg =
            i18n.t("serviceTypeDescriptionEnMustBeValidLength") +
            SERVICE_NAME_DESC;
          return response;
        }
      }
    }

    //#endregion validation

    try {
      let response = "";
      if (this.serviceTypeToken == "" || this.serviceTypeToken == undefined) {
        response = await axios.post(`/ServicesTypes/AddServiceType`, data);
      } else {
        response = await axios.post(`/ServicesTypes/UpdateServiceType`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveServicesType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      serviceTypeToken: this.serviceTypeToken,
    };

    try {
      let response = await axios.post(
        `/ServicesTypes/ArchiveServiceType`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
