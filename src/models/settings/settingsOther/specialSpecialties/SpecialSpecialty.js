import {
  STATUS,
  PAGE_SIZE,
  SPECIAL_SPECIALIATY_NAME_MIN_LENGTH,
  SPECIAL_SPECIALIATY_NAME_MAX_LENGTH,
  SPECIAL_SPECIALIATY_NAME_DESC,
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

export default class SpecialSpecialty {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.specialSpecialtyToken = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.specialSpecialtyNameCollection = "";
    this.specialSpecialtyNameCurrent = "";
    this.specialSpecialtyNameEn = "";
    this.specialSpecialtyNameAr = "";
    this.specialSpecialtyNameUnd = "";
    this.specialSpecialtyDescriptionCurrent = "";
    this.specialSpecialtyDescriptionEn = "";
    this.specialSpecialtyDescriptionAr = "";
    this.specialSpecialtyDescriptionUnd = "";
    this.specialSpecialtyNotes = "";
    this.specialSpecialtyArchiveStatus = "";
  }
  fillData(data) {
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.specialSpecialtyNameCollection = data.specialSpecialtyNameCollection;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.specialSpecialtyNameEn = data.specialSpecialtyNameEn;
    this.specialSpecialtyNameAr = data.specialSpecialtyNameAr;
    this.specialSpecialtyNameUnd = data.specialSpecialtyNameUnd;
    this.specialSpecialtyDescriptionCurrent =
      data.specialSpecialtyDescriptionCurrent;
    this.specialSpecialtyDescriptionEn = data.specialSpecialtyDescriptionEn;
    this.specialSpecialtyDescriptionAr = data.specialSpecialtyDescriptionAr;
    this.specialSpecialtyDescriptionUnd = data.specialSpecialtyDescriptionUnd;
    this.specialSpecialtyNotes = data.specialSpecialtyNotes;
    this.specialSpecialtyArchiveStatus = data.specialSpecialtyArchiveStatus;
  }

  async getAllSpecialSpecialties(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/SpecialSpecialties/GetAllSpecialSpecialties/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getSpecialSpecialtyDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/SpecialSpecialties/GetSpecialSpecialtyDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&specialSpecialtyToken=${this.specialSpecialtyToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfSpecialSpecialties(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/SpecialSpecialties/GetDialogOfSpecialSpecialties?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&generalSpecialtyToken=${this.generalSpecialtyToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateSpecialSpecialty(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      generalSpecialtyToken: this.generalSpecialtyToken,
      specialSpecialtyToken: this.specialSpecialtyToken,
      specialSpecialtyNameEn: this.specialSpecialtyNameEn,
      specialSpecialtyNameAr: this.specialSpecialtyNameAr,
      specialSpecialtyNameUnd: this.specialSpecialtyNameUnd,
      specialSpecialtyDescriptionEn: this.specialSpecialtyDescriptionEn,
      specialSpecialtyDescriptionAr: this.specialSpecialtyDescriptionAr,
      specialSpecialtyDescriptionUnd: this.specialSpecialtyDescriptionUnd,
      specialSpecialtyNotes: this.specialSpecialtyNotes,
    };

    //#region  validation
    // trim data
    data.generalSpecialtyToken = data.generalSpecialtyToken.trim();
    data.specialSpecialtyNameEn = data.specialSpecialtyNameEn.trim();
    data.specialSpecialtyNameAr = data.specialSpecialtyNameAr.trim();
    data.specialSpecialtyNameUnd = data.specialSpecialtyNameUnd.trim();
    data.specialSpecialtyDescriptionEn =
      data.specialSpecialtyDescriptionEn.trim();
    data.specialSpecialtyDescriptionAr =
      data.specialSpecialtyDescriptionAr.trim();
    data.specialSpecialtyDescriptionUnd =
      data.specialSpecialtyDescriptionUnd.trim();

    let response = {
      data: {
        status: STATUS.ERROR,
        msg: i18n.t("failedOperation"),
        data: "",
      },
    };
    if (!data.generalSpecialtyToken) {
      response.data.msg = i18n.t("selectGeneralSpecialtyToken");
      return response;
    }
    if (
      !data.specialSpecialtyNameEn &&
      !data.specialSpecialtyNameAr &&
      !data.specialSpecialtyNameUnd
    ) {
      response.data.msg = i18n.t("enterOneAtLeastOfSpecialSpecialtyNames");
      return response;
    } else {
      if (data.specialSpecialtyNameAr) {
        if (!isNameAr(data.specialSpecialtyNameAr)) {
          response.data.msg = i18n.t("specialSpecialtyNameArMustBeArabic");
          return response;
        }
        // check  min length
        if (
          isLessThan(
            data.specialSpecialtyNameAr,
            SPECIAL_SPECIALIATY_NAME_MIN_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("specialSpecialtyNameArMustBeValidLengthMin") +
            SPECIAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
        if (
          isGreaterThan(
            data.specialSpecialtyNameAr,
            SPECIAL_SPECIALIATY_NAME_MAX_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("specialSpecialtyNameArMustBeValidLength") +
            SPECIAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
      }
      if (data.specialSpecialtyNameEn) {
        // is valid english name
        if (!isNameEN(data.specialSpecialtyNameEn)) {
          response.data.msg = i18n.t("specialSpecialtyNameArMustBeEnglish");
          return response;
        }
        // check length
        if (
          data.specialSpecialtyNameEn.length >
          SPECIAL_SPECIALIATY_NAME_MAX_LENGTH
        ) {
          response.data.msg =
            i18n.t("specialSpecialtyNameEnMustBeValidLength") +
            SPECIAL_SPECIALIATY_NAME_MAX_LENGTH;
          return response;
        }
        // check  min length
        if (
          isLessThan(
            data.specialSpecialtyNameEn,
            SPECIAL_SPECIALIATY_NAME_MIN_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("specialSpecialtyNameEnMustBeValidLengthMin") +
            SPECIAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
        if (
          isGreaterThan(
            data.specialSpecialtyNameEn,
            SPECIAL_SPECIALIATY_NAME_MAX_LENGTH
          )
        ) {
          response.data.msg =
            i18n.t("specialSpecialtyNameEnMustBeValidLength") +
            SPECIAL_SPECIALIATY_NAME_MIN_LENGTH;
          return response;
        }
      }
      if (data.specialSpecialtyDescriptionAr) {
        // is valid arabic Description
        if (!isTextAr(data.specialSpecialtyDescriptionAr)) {
          response.data.msg = i18n.t(
            "specialSpecialtyDescriptionArMustBeArabic"
          );
          return response;
        }
        // check length
        if (
          isGreaterThan(
            data.specialSpecialtyDescriptionAr,
            SPECIAL_SPECIALIATY_NAME_DESC
          )
        ) {
          response.data.msg =
            i18n.t("specialSpecialtyDescriptionArMustBeValidLength") +
            SPECIAL_SPECIALIATY_NAME_DESC;
          return response;
        }
      }
      if (data.specialSpecialtyDescriptionEn) {
        // is valid english Description
        if (!isTextEn(data.specialSpecialtyDescriptionEn)) {
          response.data.msg = i18n.t(
            "specialSpecialtyDescriptionEnMustBeEnglish"
          );
          return response;
        }
        // check length
        if (
          isGreaterThan(
            data.specialSpecialtyDescriptionEn,
            SPECIAL_SPECIALIATY_NAME_DESC
          )
        ) {
          response.data.msg =
            i18n.t("specialSpecialtyDescriptionEnMustBeValidLength") +
            SPECIAL_SPECIALIATY_NAME_DESC;
          return response;
        }
      }
    }

    //#endregion validation

    try {
      let response = "";
      if (
        this.specialSpecialtyToken == "" ||
        this.specialSpecialtyToken == undefined
      ) {
        response = await axios.post(
          `/SpecialSpecialties/AddSpecialSpecialty`,
          data
        );
      } else {
        response = await axios.post(
          `/SpecialSpecialties/UpdateSpecialSpecialty`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveSpecialSpecialty(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      specialSpecialtyToken: this.specialSpecialtyToken,
    };

    try {
      let response = await axios.post(
        `/SpecialSpecialties/ArchiveSpecialSpecialty`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
