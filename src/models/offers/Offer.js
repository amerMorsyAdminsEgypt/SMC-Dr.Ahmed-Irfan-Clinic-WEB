import { STATUS, PAGE_SIZE, BASE_URL } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";
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
// import i18n from "@/i18n/index.js";

export default class Offer {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.offerToken = "";
    this.userToken = "";
    this.userNameCurrent = "";
    this.serviceToken = "";
    this.serviceNameCurrent = "";
    this.offerCode = "";
    this.offerMediaTypeToken = "";
    this.offerMediaTypeNameCurrent = "";
    this.offerMediaTypeNameAr = "";
    this.offerMediaTypeNameEn = "";
    this.offerMediaTypeNameUnd = "";
    this.offerTitleCurrent = "";
    this.offerTitleEn = "";
    this.offerTitleAr = "";
    this.offerTitleUnd = "";
    this.offerStartDate = "";
    this.offerEndDate = "";
    this.offerDuration = "";
    this.servicePriceInOffer = "";
    this.offerDescriptionCurrent = "";
    this.offerDescriptionEn = "";
    this.offerDescriptionAr = "";
    this.offerDescriptionUnd = "";
    this.offerNotes = "";
    this.actionDateTime = "";
    this.actionDate = "";
    this.actionTime = "";
    this.offerMediaPath = "";
    this.offerArchiveStatus = "";
    this.dateActive = "";
  }
  fillData(data) {
    this.image = data.image;
    this.offerToken = data.offerToken;
    this.userToken = data.userToken;
    this.userNameCurrent = data.userNameCurrent;
    this.serviceToken = data.serviceToken;
    this.serviceNameCurrent = data.serviceNameCurrent;
    this.offerCode = data.offerCode;
    this.offerMediaTypeToken = data.offerMediaTypeToken;
    this.offerMediaTypeNameCurrent = data.offerMediaTypeNameCurrent;
    this.offerMediaTypeNameAr = data.offerMediaTypeNameAr;
    this.offerMediaTypeNameEn = data.offerMediaTypeNameEn;
    this.offerMediaTypeNameUnd = data.offerMediaTypeNameUnd;
    this.offerTitleCurrent = data.offerTitleCurrent;
    this.offerTitleEn = data.offerTitleEn;
    this.offerTitleAr = data.offerTitleAr;
    this.offerTitleUnd = data.offerTitleUnd;
    this.offerStartDate = data.offerStartDate;
    this.offerEndDate = data.offerEndDate;
    this.offerDuration = data.offerDuration;
    this.servicePriceInOffer = data.servicePriceInOffer;
    this.offerDescriptionCurrent = data.offerDescriptionCurrent;
    this.offerDescriptionEn = data.offerDescriptionEn;
    this.offerDescriptionAr = data.offerDescriptionAr;
    this.offerDescriptionUnd = data.offerDescriptionUnd;
    this.offerNotes = data.offerNotes;
    this.actionDateTime = data.actionDateTime;
    this.actionDate = data.actionDate;
    this.actionTime = data.actionTime;
    this.offerMediaPath = data.offerMediaPath;
    this.offerArchiveStatus = data.offerArchiveStatus;
  }

  async getAllOffers(
    language,
    userAuthorizeToken,
    selfPage,
    offerMediaTypeToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/Offers/GetAllOffers?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&offerMediaTypeToken=${offerMediaTypeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getOfferDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Offers/GetOfferDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&offerToken=${this.offerToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfOfferCodes(language, userAuthorizeToken) {
    let options = [];
    options.push({
      value: "",
      text: i18n.t("selectOffer"),
      image: "",
    });
    try {
      let response = await axios.get(
        `/Offers/GetAllOffers?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=false&page=1&filterStatus=true&dateActive=${this.dateActive}`
      );
      const itemsData = response.data.offersPagination.offersData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["offerCode"],
            text: `${itemsData[item]["offerCode"]} - ${
              itemsData[item]["offerTitleCurrent"]
            } - (${itemsData[item]["servicePriceInOffer"]}${i18n.t("EGP")})`,
            image: itemsData[item]["itemImagePath"]
              ? BASE_URL + itemsData[item]["itemImagePath"]
              : "",
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("updateUserData", null);
        router.push("/").catch(() => {});
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: "",
        });
      }
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: "",
      });
    }
    return options;
  }

  async addOrUpdateOffer(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      offerMediaTypeToken: this.offerMediaTypeToken,
      serviceToken: this.serviceToken,
      offerToken: this.offerToken,
      offerCode: this.offerCode,
      offerTitleEn: this.offerTitleEn,
      offerTitleAr: this.offerTitleAr,
      offerTitleUnd: this.offerTitleUnd,
      offerStartDate: this.offerStartDate,
      offerEndDate: this.offerEndDate,
      servicePriceInOffer: this.servicePriceInOffer,
      offerDescriptionEn: this.offerDescriptionEn,
      offerDescriptionAr: this.offerDescriptionAr,
      offerDescriptionUnd: this.offerDescriptionUnd,
      offerNotes: this.offerNotes,
    };

    //#region  validation
    // trim data
    // data.newsCode = data.newsCode.trim();

    // let response = {
    //   data: {
    //     status: STATUS.ERROR,
    //     msg: i18n.t("failedOperation"),
    //     data: "",
    //   },
    // };
    // // newsName validation
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
      if (this.offerToken == "" || this.offerToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Offers/AddOfferWithMedia`, formData);
        } else {
          response = await axios.post(`/Offers/AddOfferWithoutMedia`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Offers/UpdateOfferWithMedia`, formData);
        } else {
          response = await axios.post(`/Offers/UpdateOfferWithoutMedia`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveOffer(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      offerToken: this.offerToken,
    };

    try {
      let response = await axios.post(`/Offers/ArchiveOffer`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
