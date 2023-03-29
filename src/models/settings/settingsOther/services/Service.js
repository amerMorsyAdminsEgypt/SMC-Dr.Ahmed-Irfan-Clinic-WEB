import {
  STATUS,
  PAGE_SIZE,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  TEXT_MAX_LENGTH,
  BASE_URL,
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
import store from "@/store";
import router from "@/router";

export default class Service {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.serviceToken = "";
    this.specialSpecialtyToken = "";
    this.specialSpecialtyNameCurrent = "";
    this.generalSpecialtyToken = "";
    this.generalSpecialtyNameCurrent = "";
    this.serviceTypeToken = "";
    this.serviceTypeNameCurrent = "";
    this.serviceNameCollection = "";
    this.serviceNameCurrent = "";
    this.serviceNameEn = "";
    this.serviceNameAr = "";
    this.serviceNameUnd = "";
    this.serviceProvideTypeToken = "";
    this.serviceProvideTypeNameCurrent = "";
    this.serviceProvideTypeNameAr = "";
    this.serviceProvideTypeNameEn = "";
    this.serviceProvideTypeNameUnd = "";
    this.serviceDescriptionCurrent = "";
    this.serviceDescriptionEn = "";
    this.serviceDescriptionAr = "";
    this.serviceDescriptionUnd = "";
    this.servicePrice = ""; //"servicePrice": 500.00,
    this.serviceTimeWithMinutes = ""; //"serviceTimeWithMinutes": 20,
    this.maxDiscountPercentage = ""; //"maxDiscountPercentage": 80.00,
    this.serviceNotes = "";
    this.serviceArchiveStatus = "";
    this.serviceReceptionistPercentage = 0;
    this.serviceReceptionistValue = "";
    // this.serviceResponsibleValue = "";
  }
  fillData(data) {
    this.serviceToken = data.serviceToken;
    this.specialSpecialtyToken = data.specialSpecialtyToken;
    this.specialSpecialtyNameCurrent = data.specialSpecialtyNameCurrent;
    this.generalSpecialtyToken = data.generalSpecialtyToken;
    this.generalSpecialtyNameCurrent = data.generalSpecialtyNameCurrent;
    this.serviceTypeToken = data.serviceTypeToken;
    this.serviceTypeNameCurrent = data.serviceTypeNameCurrent;
    this.serviceNameCollection = data.serviceNameCollection;
    this.serviceNameCurrent = data.sserviceNameCurrent;
    this.serviceNameEn = data.serviceNameEn;
    this.serviceNameAr = data.serviceNameAr;
    this.serviceNameUnd = data.serviceNameUnd;
    this.serviceProvideTypeToken = data.serviceProvideTypeToken;
    this.serviceProvideTypeNameCurrent = data.serviceProvideTypeNameCurrent;
    this.serviceProvideTypeNameAr = data.serviceProvideTypeNameAr;
    this.serviceProvideTypeNameEn = data.serviceProvideTypeNameEn;
    this.serviceProvideTypeNameUnd = data.serviceProvideTypeNameUnd;
    this.serviceDescriptionCurrent = data.serviceDescriptionCurrent;
    this.serviceDescriptionEn = data.serviceDescriptionEn;
    this.serviceDescriptionAr = data.serviceDescriptionAr;
    this.serviceDescriptionUnd = data.serviceDescriptionUnd;
    this.servicePrice = data.servicePrice;
    this.serviceTimeWithMinutes = data.serviceTimeWithMinutes;
    this.maxDiscountPercentage = data.maxDiscountPercentage;
    this.serviceNotes = data.serviceNotes;
    this.serviceArchiveStatus = data.serviceArchiveStatus;
    this.serviceReceptionistPercentage =
      data.serviceReceptionistPercentage ?? 0;

    this.serviceReceptionistValue = data.serviceReceptionistValue ?? "";
    // this.serviceResponsibleValue = data.serviceResponsibleValue ?? "";
  }

  async getAllServices(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `Services/GetAllServices/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getServiceDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Services/GetServiceDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&serviceToken=${this.serviceToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfServices(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Services/GetDialogOfServices?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&serviceTypeToken=${this.serviceTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfServicesWithImage(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `Services/GetAllServices/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=&pageSize=&filterStatus=true&textSearch=&specialSpecialtyToken=${this.specialSpecialtyToken}`
      );
      const itemsData = response.data.servicesPagination.servicesData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["serviceToken"],
            text:
              i18n.t("service") +
              ": " +
              itemsData[item]["serviceNameCurrent"] +
              " - " +
              i18n.t("type") +
              ": " +
              itemsData[item]["serviceTypeNameCurrent"] +
              " - " +
              i18n.t("place") +
              ": " +
              itemsData[item]["serviceProvideTypeNameCurrent"] +
              " - " +
              i18n.t("price") +
              ": " +
              itemsData[item]["servicePrice"] +
              " - " +
              i18n.t("maxDiscountPercentage") +
              ": " +
              itemsData[item]["maxDiscountPercentage"] +
              " - " +
              i18n.t("serviceTimeWithMinutes") +
              ": " +
              itemsData[item]["serviceTimeWithMinutes"],
            image: itemsData[item]["serviceImagePath"]
              ? BASE_URL + itemsData[item]["serviceImagePath"]
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

  async addOrUpdateService(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      serviceTypeToken: this.serviceTypeToken,
      specialSpecialtyToken: this.specialSpecialtyToken,
      serviceProvideTypeToken: this.serviceProvideTypeToken,
      serviceToken: this.serviceToken,
      serviceNameEn: this.serviceNameEn,
      serviceNameAr: this.serviceNameAr,
      serviceNameUnd: this.serviceNameUnd,
      serviceDescriptionEn: this.serviceDescriptionEn,
      serviceDescriptionAr: this.serviceDescriptionAr,
      serviceDescriptionUnd: this.serviceDescriptionUnd,
      servicePrice: this.servicePrice,
      serviceTimeWithMinutes: this.serviceTimeWithMinutes,
      maxDiscountPercentage: this.maxDiscountPercentage,
      serviceNotes: this.serviceNotes,
      serviceArchiveStatus: this.serviceArchiveStatus,
      serviceReceptionistPercentage: this.serviceReceptionistPercentage,
    };

    //#region  validation
    // trim data
    data.serviceTypeToken = data.serviceTypeToken.trim();
    data.specialSpecialtyToken = data.specialSpecialtyToken.trim();
    data.serviceProvideTypeToken = data.serviceProvideTypeToken.trim();
    data.serviceToken = data.serviceToken.trim();
    data.serviceNameEn = data.serviceNameEn.trim();
    data.serviceNameAr = data.serviceNameAr.trim();
    data.serviceNameUnd = data.serviceNameUnd.trim();
    data.serviceDescriptionEn = data.serviceDescriptionEn.trim();
    data.serviceDescriptionAr = data.serviceDescriptionAr.trim();
    data.serviceDescriptionUnd = data.serviceDescriptionUnd.trim();
    data.serviceNotes = data.serviceNotes.trim();

    let response = {
      data: {
        status: STATUS.ERROR,
        msg: i18n.t("failedOperation"),
        data: "",
      },
    };
    if (!data.serviceTypeToken) {
      response.data.msg = i18n.t("selectServiceTypeToken");
      return response;
    }

    if (!data.specialSpecialtyToken) {
      response.data.msg = i18n.t("selectSpecialSpecialtyToken");
      return response;
    }

    if (!data.serviceProvideTypeToken) {
      response.data.msg = i18n.t("selectServiceProvideType");
      return response;
    }

    if (!data.serviceNameEn && !data.serviceNameAr && !data.serviceNameUnd) {
      response.data.msg = i18n.t("enterOneAtLeastOfserviceNames");
      return response;
    } else {
      if (data.serviceNameAr) {
        if (!isNameAr(data.serviceNameAr)) {
          response.data.msg = i18n.t("serviceNameArMustBeArabic");
          return response;
        }
        // check  min length
        if (isLessThan(data.serviceNameAr, NAME_MIN_LENGTH)) {
          response.data.msg =
            i18n.t("serviceNameArMustBeValidLengthMin") + NAME_MIN_LENGTH;
          return response;
        }
        if (isGreaterThan(data.serviceNameAr, NAME_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("serviceNameArMustBeValidLength") + NAME_MAX_LENGTH;
          return response;
        }
      }
      if (data.serviceNameEn) {
        // is valid english name
        if (!isNameEN(data.serviceNameEn)) {
          response.data.msg = i18n.t("serviceNameArMustBeEnglish");
          return response;
        }
        // check length
        if (data.serviceNameEn.length > NAME_MAX_LENGTH) {
          response.data.msg =
            i18n.t("serviceNameEnMustBeValidLength") + NAME_MAX_LENGTH;
          return response;
        }
        // check  min length
        if (isLessThan(data.serviceNameEn, NAME_MIN_LENGTH)) {
          response.data.msg =
            i18n.t("serviceNameEnMustBeValidLengthMin") + NAME_MIN_LENGTH;
          return response;
        }
        if (isGreaterThan(data.serviceNameEn, NAME_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("serviceNameEnMustBeValidLength") + NAME_MAX_LENGTH;
          return response;
        }
      }
      if (data.serviceDescriptionAr) {
        // is valid arabic Description
        if (!isTextAr(data.serviceDescriptionAr)) {
          response.data.msg = i18n.t("serviceDescriptionArMustBeArabic");
          return response;
        }
        // check length
        if (isGreaterThan(data.serviceDescriptionAr, TEXT_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("serviceDescriptionArMustBeValidLength") + TEXT_MAX_LENGTH;
          return response;
        }
      }
      if (data.serviceDescriptionEn) {
        // is valid english Description
        if (!isTextEn(data.serviceDescriptionEn)) {
          response.data.msg = i18n.t("serviceDescriptionEnMustBeEnglish");
          return response;
        }
        // check length
        if (isGreaterThan(data.serviceDescriptionEn, TEXT_MAX_LENGTH)) {
          response.data.msg =
            i18n.t("serviceDescriptionEnMustBeValidLength") + TEXT_MAX_LENGTH;
          return response;
        }
      }
    }

    if (!data.servicePrice) {
      response.data.msg = i18n.t("servicePriceIsRequired");
      return response;
    }

    //#endregion validation

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.serviceToken == "" || this.serviceToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/Services/AddServiceWithMedia`,
            formData
          );
        } else {
          response = await axios.post(`/Services/AddService`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/Services/UpdateServiceWithMedia`,
            formData
          );
        } else {
          response = await axios.post(`/Services/UpdateService`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveService(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      serviceToken: this.serviceToken,
    };

    try {
      let response = await axios.post(`/Services/ArchiveService`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
