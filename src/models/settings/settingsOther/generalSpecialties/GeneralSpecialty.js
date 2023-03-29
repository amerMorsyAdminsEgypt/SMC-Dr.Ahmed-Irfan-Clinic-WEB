import {
  STATUS,
  PAGE_SIZE,
  GENERAL_SPECIALIATY_NAME_MAX_LENGTH,
  GENERAL_SPECIALIATY_NAME_MIN_LENGTH,
  GENERAL_SPECIALIATY_NAME_DESC,
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

export default class GeneralSpecialty {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameEn = "";
    this.generalSpecialtyNameAr = "";
    this.generalSpecialtyNameUnd = "";
    this.generalSpecialtyNameCurrent = "";
    this.generalSpecialtyDescriptionCurrent = "";
    this.generalSpecialtyDescriptionEn = "";
    this.generalSpecialtyDescriptionAr = "";
    this.generalSpecialtyDescriptionUnd = "";
    this.generalSpecialtyNotes = "";
    this.generalSpecialtyArchiveStatus = "";
  }
  fillData(data) {
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameEn = data.generalSpecialtyNameEn;
    this.generalSpecialtyNameAr = data.generalSpecialtyNameAr;
    this.generalSpecialtyNameUnd = data.generalSpecialtyNameUnd;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.generalSpecialtyDescriptionCurrent =
      data.generalSpecialtyDescriptionCurrent;
    this.generalSpecialtyDescriptionEn = data.generalSpecialtyDescriptionEn;
    this.generalSpecialtyDescriptionAr = data.generalSpecialtyDescriptionAr;
    this.generalSpecialtyDescriptionUnd = data.generalSpecialtyDescriptionUnd;
    this.generalSpecialtyNotes = data.generalSpecialtyNotes;
    this.generalSpecialtyArchiveStatus = data.generalSpecialtyArchiveStatus;
  }

  async getAllGeneralSpecialties(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/GeneralSpecialties/GetAllGeneralSpecialties/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getGeneralSpecialtyDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/GeneralSpecialties/GetGeneralSpecialtyDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&generalSpecialtyToken=${this.generalSpecialtyToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfGeneralSpecialties(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/GeneralSpecialties/GetDialogOfGeneralSpecialties?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateGeneralSpecialty(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      generalSpecialtyToken: this.generalSpecialtyToken,
      generalSpecialtyNameEn: this.generalSpecialtyNameEn,
      generalSpecialtyNameAr: this.generalSpecialtyNameAr,
      generalSpecialtyNameUnd: this.generalSpecialtyNameUnd,
      generalSpecialtyDescriptionEn: this.generalSpecialtyDescriptionEn,
      generalSpecialtyDescriptionAr: this.generalSpecialtyDescriptionAr,
      generalSpecialtyDescriptionUnd: this.generalSpecialtyDescriptionUnd,
      generalSpecialtyNotes: this.generalSpecialtyNotes,
    };

    //#region  validation
    // trim data
    data.generalSpecialtyNameEn = data.generalSpecialtyNameEn.trim();
    data.generalSpecialtyNameAr = data.generalSpecialtyNameAr.trim();
    data.generalSpecialtyNameUnd = data.generalSpecialtyNameUnd.trim();
    data.generalSpecialtyDescriptionEn =
      data.generalSpecialtyDescriptionEn.trim();
    data.generalSpecialtyDescriptionAr =
      data.generalSpecialtyDescriptionAr.trim();
    data.generalSpecialtyDescriptionUnd =
      data.generalSpecialtyDescriptionUnd.trim();

    let response = {
      data: {
        status: STATUS.ERROR,
        msg: i18n.t("failedOperation"),
        data: "",
      },
    };
    if (
      !data.generalSpecialtyNameEn &&
      !data.generalSpecialtyNameAr &&
      !data.generalSpecialtyNameUnd
    ) {
      response.data.msg = i18n.t("enterOneAtLeastOfGeneralSpecialtyNames");
      return response;
    } else {
      if (data.generalSpecialtyNameAr) {
        if (!isNameAr(data.generalSpecialtyNameAr)) {
          response.data.msg = i18n.t("generalSpecialtyNameArMustBeArabic");
          return response;
        }
        // check  min length
        if (
          isLessThan(
            data.generalSpecialtyNameAr,
            GENERAL_SPECIALIATY_NAME_MIN_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("generalSpecialtyNameArMustBeValidLengthMin") +
            GENERAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
        if (
          isGreaterThan(
            data.generalSpecialtyNameAr,
            GENERAL_SPECIALIATY_NAME_MAX_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("generalSpecialtyNameArMustBeValidLength") +
            GENERAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
      }
      if (data.generalSpecialtyNameEn) {
        // is valid english name
        if (!isNameEN(data.generalSpecialtyNameEn)) {
          response.data.msg = i18n.t("generalSpecialtyNameArMustBeEnglish");
          return response;
        }
        // check length
        if (
          data.generalSpecialtyNameEn.length >
          GENERAL_SPECIALIATY_NAME_MAX_LENGTH
        ) {
          response.data.msg =
            i18n.t("generalSpecialtyNameEnMustBeValidLength") +
            GENERAL_SPECIALIATY_NAME_MAX_LENGTH;
          return response;
        }
        // check  min length
        if (
          isLessThan(
            data.generalSpecialtyNameEn,
            GENERAL_SPECIALIATY_NAME_MIN_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("generalSpecialtyNameEnMustBeValidLengthMin") +
            GENERAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
        if (
          isGreaterThan(
            data.generalSpecialtyNameEn,
            GENERAL_SPECIALIATY_NAME_MAX_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("generalSpecialtyNameEnMustBeValidLength") +
            GENERAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
      }
      if (data.generalSpecialtyDescriptionAr) {
        // is valid arabic Description
        if (!isTextAr(data.generalSpecialtyDescriptionAr)) {
          response.data.msg = i18n.t(
            "generalSpecialtyDescriptionArMustBeArabic"
          );
          return response;
        }
        // check length
        if (
          isGreaterThan(
            data.generalSpecialtyDescriptionAr,
            GENERAL_SPECIALIATY_NAME_DESC
          )
        ) {
          response.data.msg =
            i18n.t("generalSpecialtyDescriptionArMustBeValidLength") +
            GENERAL_SPECIALIATY_NAME_DESC;
          return response;
        }
      }
      if (data.generalSpecialtyDescriptionEn) {
        // is valid english Description
        if (!isTextEn(data.generalSpecialtyDescriptionEn)) {
          response.data.msg = i18n.t(
            "generalSpecialtyDescriptionEnMustBeEnglish"
          );
          return response;
        }
        // check length
        if (
          isGreaterThan(
            data.generalSpecialtyDescriptionEn,
            GENERAL_SPECIALIATY_NAME_DESC
          )
        ) {
          response.data.msg =
            i18n.t("generalSpecialtyDescriptionEnMustBeValidLength") +
            GENERAL_SPECIALIATY_NAME_DESC;
          return response;
        }
      }
    }

    //#endregion validation

    try {
      let response = "";
      if (
        this.generalSpecialtyToken == "" ||
        this.generalSpecialtyToken == undefined
      ) {
        response = await axios.post(
          `/GeneralSpecialties/AddGeneralSpecialty`,
          data
        );
      } else {
        response = await axios.post(
          `/GeneralSpecialties/UpdateGeneralSpecialty`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveGeneralSpecialty(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      generalSpecialtyToken: this.generalSpecialtyToken,
    };

    try {
      let response = await axios.post(
        `/GeneralSpecialties/ArchiveGeneralSpecialty`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
