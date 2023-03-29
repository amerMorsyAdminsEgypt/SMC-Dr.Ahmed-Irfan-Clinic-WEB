import {
  STATUS,
  PAGE_SIZE,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  TEXT_MAX_LENGTH,
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

export default class NewsCategory {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.newsCategoryToken = "";
    this.newsCategoryNameCurrent = "";
    this.newsCategoryNameEn = "";
    this.newsCategoryNameAr = "";
    this.newsCategoryNameUnd = "";
    this.newsCategoryDescriptionCurrent = "";
    this.newsCategoryDescriptionEn = "";
    this.newsCategoryDescriptionAr = "";
    this.newsCategoryDescriptionUnd = "";
    this.newsCategoryNotes = "";
    this.newsCategoryArchiveStatus = "";
  }
  fillData(data) {
    this.newsCategoryToken = data.newsCategoryToken;
    this.newsCategoryNameCurrent = data.newsCategoryNameCurrent;
    this.newsCategoryNameEn = data.newsCategoryNameEn;
    this.newsCategoryNameAr = data.newsCategoryNameAr;
    this.newsCategoryNameUnd = data.newsCategoryNameUnd;
    this.newsCategoryDescriptionCurrent = data.gnewsCategoryDescriptionCurrent;
    this.newsCategoryDescriptionEn = data.newsCategoryDescriptionEn;
    this.newsCategoryDescriptionAr = data.newsCategoryDescriptionAr;
    this.newsCategoryDescriptionUnd = data.newsCategoryDescriptionUnd;
    this.newsCategoryNotes = data.newsCategoryNotes;
    this.newsCategoryArchiveStatus = data.newsCategoryArchiveStatus;
  }

  async getAllNewsCategories(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/NewsCategories/GetAllNewsCategories/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getNewsCategoryDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/NewsCategories/GetNewsCategoryDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&newsCategoryToken=${this.newsCategoryToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfNewsCategories(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/NewsCategories/GetDialogOfNewsCategories?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateNewsCategory(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      newsCategoryToken: this.newsCategoryToken,
      newsCategoryNameEn: this.newsCategoryNameEn,
      newsCategoryNameAr: this.newsCategoryNameAr,
      newsCategoryNameUnd: this.newsCategoryNameUnd,
      newsCategoryDescriptionEn: this.newsCategoryDescriptionEn,
      newsCategoryDescriptionAr: this.newsCategoryDescriptionAr,
      newsCategoryDescriptionUnd: this.newsCategoryDescriptionUnd,
      newsCategoryNotes: this.newsCategoryNotes,
    };

    //#region  validation
    // trim data
    data.newsCategoryNameEn = data.newsCategoryNameEn.trim();
    data.newsCategoryNameAr = data.newsCategoryNameAr.trim();
    data.newsCategoryNameUnd = data.newsCategoryNameUnd.trim();
    data.newsCategoryDescriptionEn = data.newsCategoryDescriptionEn.trim();
    data.newsCategoryDescriptionAr = data.newsCategoryDescriptionAr.trim();
    data.newsCategoryDescriptionUnd = data.newsCategoryDescriptionUnd.trim();
    data.newsCategoryNotes = data.newsCategoryNotes.trim();

    let response = {
      data: {
        status: STATUS.ERROR,
        msg: i18n.t("failedOperation"),
        data: "",
      },
    };
    if (
      !data.newsCategoryNameEn &&
      !data.newsCategoryNameAr &&
      !data.newsCategoryNameUnd
    ) {
      response.data.msg = i18n.t("enterOneAtLeastOfnewsCategoryNames");
      return response;
    } else {
      if (data.newsCategoryNameAr) {
        if (!isNameAr(data.newsCategoryNameAr)) {
          response.data.msg = i18n.t("newsCategoryNameArMustBeArabic");
          return response;
        }
        // check  min length
        if (isLessThan(data.newsCategoryNameAr, NAME_MIN_LENGTH)) {
          response.data.msg =
            i18n.t("newsCategoryNameArMustBeValidLengthMin") + NAME_MIN_LENGTH;
          return response;
        }
        if (isGreaterThan(data.newsCategoryNameAr, NAME_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("newsCategoryNameArMustBeValidLength") + NAME_MAX_LENGTH;
          return response;
        }
      }
      if (data.newsCategoryNameEn) {
        // is valid english name
        if (!isNameEN(data.newsCategoryNameEn)) {
          response.data.msg = i18n.t("newsCategoryNameArMustBeEnglish");
          return response;
        }
        // check length
        if (data.newsCategoryNameEn.length > NAME_MAX_LENGTH) {
          response.data.msg =
            i18n.t("newsCategoryNameEnMustBeValidLength") + NAME_MAX_LENGTH;
          return response;
        }
        // check  min length
        if (isLessThan(data.newsCategoryNameEn, NAME_MIN_LENGTH)) {
          response.data.msg =
            i18n.t("newsCategoryNameEnMustBeValidLengthMin") + NAME_MIN_LENGTH;
          return response;
        }
        if (isGreaterThan(data.newsCategoryNameEn, NAME_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("newsCategoryNameEnMustBeValidLength") + NAME_MAX_LENGTH;
          return response;
        }
      }
      if (data.newsCategoryDescriptionAr) {
        // is valid arabic Description
        if (!isTextAr(data.newsCategoryDescriptionAr)) {
          response.data.msg = i18n.t("newsCategoryDescriptionArMustBeArabic");
          return response;
        }
        // check length
        if (isGreaterThan(data.newsCategoryDescriptionAr, TEXT_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("newsCategoryDescriptionArMustBeValidLength") +
            TEXT_MAX_LENGTH;
          return response;
        }
      }
      if (data.newsCategoryDescriptionEn) {
        // is valid english Description
        if (!isTextEn(data.newsCategoryDescriptionEn)) {
          response.data.msg = i18n.t("newsCategoryDescriptionEnMustBeEnglish");
          return response;
        }
        // check length
        if (isGreaterThan(data.newsCategoryDescriptionEn, TEXT_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("newsCategoryDescriptionEnMustBeValidLength") +
            TEXT_MAX_LENGTH;
          return response;
        }
      }
    }

    //#endregion validation

    try {
      let response = "";
      if (this.newsCategoryToken == "" || this.newsCategoryToken == undefined) {
        response = await axios.post(`/NewsCategories/AddNewsCategory`, data);
      } else {
        response = await axios.post(`/NewsCategories/UpdateNewsCategory`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveNewsCategory(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      newsCategoryToken: this.newsCategoryToken,
    };

    try {
      let response = await axios.post(
        `/NewsCategories/ArchiveNewsCategory`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
