import { PAGE_SIZE } from "@/utils/constants";
// import {
//   STATUS,
//   PAGE_SIZE,
//   NAME_MAX_LENGTH,
//   NAME_MIN_LENGTH,
//   TEXT_MAX_LENGTH,
// } from "@/utils/constants";
// import {
//   isNameAr,
//   isTextAr,
//   isTextEn,
//   isNameEN,
//   isLessThan,
//   isGreaterThan,
// } from "@/utils/functions";
import axios from "axios";
// import i18n from "@/i18n/index.js";

export default class News {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.newsToken = "";
    this.userToken = "";
    this.newsCategoryToken = "";
    this.newsCategoryNameCurrent = "";
    this.userNameCurrent = "";
    this.newsMediaPath = "";
    this.newsMediaTypeToken = "MET-1";
    this.newsMediaTypeNameCurrent = "";
    this.newsMediaTypeNameAr = "";
    this.newsMediaTypeNameEn = "";
    this.newsMediaTypeNameUnd = "";
    this.newsCode = "";
    this.newsNameCurrent = "";
    this.newsNameEn = "";
    this.newsNameAr = "";
    this.newsNameUnd = "";
    this.newsDescriptionCurrent = "";
    this.newsDescriptionEn = "";
    this.newsDescriptionAr = "";
    this.newsDescriptionUnd = "";
    this.publisherNameCurrent = "";
    this.publisherNameEn = "";
    this.publisherNameAr = "";
    this.publisherNameUnd = "";
    this.newsNotes = "";
    this.actionDateTime = "";
    this.dateTime = "";
    this.newsArchiveStatus = "";
  }
  fillData(data) {
    this.image = data.image;
    this.newsToken = data.newsToken;
    this.newsCategoryToken = data.newsCategoryToken;
    // this.newsCategoryToken = "NCT-1"; //hard coded till can work on categoriees
    this.newsCategoryNameCurrent = data.newsCategoryNameCurrent;
    this.userToken = data.userToken;
    this.userNameCurrent = data.userNameCurrent;
    this.newsMediaPath = data.newsMediaPath;
    this.newsMediaTypeToken = data.newsMediaTypeToken;
    this.newsMediaTypeNameCurrent = data.newsMediaTypeNameCurrent;
    this.newsMediaTypeNameAr = data.newsMediaTypeNameAr;
    this.newsMediaTypeNameEn = data.newsMediaTypeNameEn;
    this.newsMediaTypeNameUnd = data.newsMediaTypeNameUnd;
    this.newsCode = data.newsCode;
    this.newsNameCurrent = data.newsNameCurrent;
    this.newsNameEn = data.newsNameEn;
    this.newsNameAr = data.newsNameAr;
    this.newsNameUnd = data.newsNameUnd;
    this.newsDescriptionCurrent = data.newsDescriptionCurrent;
    this.newsDescriptionEn = data.newsDescriptionEn;
    this.newsDescriptionAr = data.newsDescriptionAr;
    this.newsDescriptionUnd = data.newsDescriptionUnd;
    this.publisherNameCurrent = data.publisherNameCurrent;
    this.publisherNameEn = data.publisherNameEn;
    this.publisherNameAr = data.publisherNameAr;
    this.publisherNameUnd = data.publisherNameUnd;
    this.newsNotes = data.newsNotes;
    this.actionDateTime = data.actionDateTime;
    this.dateTime = data.dateTime;
    this.newsArchiveStatus = data.newsArchiveStatus;
  }

  async getAllNews(
    language,
    userAuthorizeToken,
    selfPage,
    newsMediaTypeToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/News/GetAllNews?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&newsMediaTypeToken=${newsMediaTypeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getNewsDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/News/GetNewsDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&newsToken=${this.newsToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateNews(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      newsMediaTypeToken: this.newsMediaTypeToken,
      newsCategoryToken: this.newsCategoryToken,
      newsCode: this.newsCode,
      newsToken: this.newsToken,
      newsNameEn: this.newsNameEn,
      newsNameAr: this.newsNameAr,
      newsNameUnd: this.newsNameUnd,
      publisherNameEn: this.publisherNameEn,
      publisherNameAr: this.publisherNameAr,
      publisherNameUnd: this.publisherNameUnd,
      newsDescriptionEn: this.newsDescriptionEn,
      newsDescriptionAr: this.newsDescriptionAr,
      newsDescriptionUnd: this.newsDescriptionUnd,
      newsNotes: this.newsNotes,
    };
    // console.log("form module");
    // console.log(data);

    //#region  validation
    // trim data
    data.newsCode = data.newsCode.trim();
    data.newsNameEn = data.newsNameEn.trim();
    data.newsNameAr = data.newsNameAr.trim();
    data.newsNameUnd = data.newsNameUnd.trim();
    data.publisherNameEn = data.publisherNameEn.trim();
    data.publisherNameAr = data.publisherNameAr.trim();
    data.publisherNameUnd = data.publisherNameUnd.trim();
    data.newsDescriptionEn = data.newsDescriptionEn.trim();
    data.newsDescriptionAr = data.newsDescriptionAr.trim();
    data.newsDescriptionUnd = data.newsDescriptionUnd.trim();
    data.newsNotes = data.newsNotes.trim();

    // let response = {
    //   data: {
    //     status: STATUS.ERROR,
    //     msg: i18n.t("failedOperation"),
    //     data: "",
    //   },
    // };
    // newsName validation
    // if (!data.newsNameEn && !data.newsNameAr && !data.newsNameUnd) {
    //   response.data.msg = i18n.t("enterOneAtLeastOfnewsNames");
    //   return response;
    // } else {
    //   if (data.newsNameAr) {
    //     if (!isTextAr(data.newsNameAr)) {
    //       response.data.msg = i18n.t("newsNameArMustBeArabic");
    //       return response;
    //     }
    //     // check  min length
    //     if (isLessThan(data.newsNameAr, NAME_MIN_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("newsNameArMustBeValidLengthMin") + NAME_MIN_LENGTH;
    //       return response;
    //     }
    //     if (isGreaterThan(data.newsNameAr, TEXT_MAX_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("newsNameArMustBeValidLength") + TEXT_MAX_LENGTH;
    //       return response;
    //     }
    //   }
    //   if (data.newsNameEn) {
    //     // is valid english name
    //     if (!isTextEn(data.newsNameEn)) {
    //       response.data.msg = i18n.t("newsNameArMustBeEnglish");
    //       return response;
    //     }

    //     // check  min length
    //     if (isLessThan(data.newsNameEn, NAME_MIN_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("newsNameEnMustBeValidLengthMin") + NAME_MIN_LENGTH;
    //       return response;
    //     }
    //     if (isGreaterThan(data.newsNameEn, TEXT_MAX_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("newsNameEnMustBeValidLength") + NAME_MIN_LENGTH;
    //       return response;
    //     }
    //   }
    //   if (data.publisherNameAr) {
    //     if (!isNameAr(data.publisherNameAr)) {
    //       response.data.msg = i18n.t("publisherNameArMustBeArabic");
    //       return response;
    //     }
    //     // check  min length
    //     if (isLessThan(data.publisherNameAr, NAME_MIN_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("publisherNameArMustBeValidLengthMin") + NAME_MIN_LENGTH;
    //       return response;
    //     }
    //     if (isGreaterThan(data.publisherNameAr, TEXT_MAX_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("publisherNameArMustBeValidLength") + TEXT_MAX_LENGTH;
    //       return response;
    //     }
    //   }
    //   if (data.publisherNameEn) {
    //     // is valid english name
    //     if (!isNameEN(data.publisherNameEn)) {
    //       response.data.msg = i18n.t("publisherNameArMustBeEnglish");
    //       return response;
    //     }
    //     // check length
    //     if (data.publisherNameEn.length > TEXT_MAX_LENGTH) {
    //       response.data.msg =
    //         i18n.t("publisherNameEnMustBeValidLength") + NAME_MAX_LENGTH;
    //       return response;
    //     }
    //     // check  min length
    //     if (isLessThan(data.publisherNameEn, NAME_MIN_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("publisherNameEnMustBeValidLengthMin") + NAME_MIN_LENGTH;
    //       return response;
    //     }
    //     if (isGreaterThan(data.publisherNameEn, NAME_MAX_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("publisherNameEnMustBeValidLength") + NAME_MIN_LENGTH;
    //       return response;
    //     }
    //   }
    //   if (data.newsDescriptionAr) {
    //     // is valid arabic Description
    //     if (!isTextAr(data.newsDescriptionAr)) {
    //       response.data.msg = i18n.t("newsDescriptionArMustBeArabic");
    //       return response;
    //     }
    //     // check length
    //     if (isGreaterThan(data.newsDescriptionAr, TEXT_MAX_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("newsDescriptionArMustBeValidLength") + TEXT_MAX_LENGTH;
    //       return response;
    //     }
    //   }
    //   if (data.newsDescriptionEn) {
    //     // is valid english Description
    //     if (!isTextEn(data.newsDescriptionEn)) {
    //       response.data.msg = i18n.t("newsDescriptionEnMustBeEnglish");
    //       return response;
    //     }
    //     // check length
    //     if (isGreaterThan(data.newsDescriptionEn, TEXT_MAX_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("newsDescriptionEnMustBeValidLength") + TEXT_MAX_LENGTH;
    //       return response;
    //     }
    //   }
    //   if (data.newsCode) {
    //     // is valid english Description
    //     if (!isTextEn(data.newsCode)) {
    //       response.data.msg = i18n.t("newsCodeMustBeEnglish");
    //       return response;
    //     }
    //     // check length
    //     if (isGreaterThan(data.newsCode, TEXT_MAX_LENGTH)) {
    //       response.data.msg =
    //         i18n.t("newsCodeMustBeValidLength") + TEXT_MAX_LENGTH;
    //       return response;
    //     }
    //   }
    // }

    //#endregion validation

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.newsToken == "" || this.newsToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/News/AddNewsWithMedia`, formData);
        } else {
          response = await axios.post(`/News/AddNewsWithoutMedia`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/News/UpdateNewsWithMedia`, formData);
        } else {
          response = await axios.post(`/News/UpdatenewsWithoutMedai`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveNews(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      newsToken: this.newsToken,
    };

    try {
      let response = await axios.post(`/News/ArchiveNews`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
