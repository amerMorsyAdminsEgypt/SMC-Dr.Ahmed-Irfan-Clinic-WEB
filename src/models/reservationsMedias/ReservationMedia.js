import {
  // STATUS,
  PAGE_SIZE,
  NEWS_MEDIA_TYPE_TOKEN_IMAGE,
} from "@/utils/constants";
// import i18n from "@/i18n/index.js";
import axios from "axios";
import i18n from "@/i18n/index.js";

export default class ReservationMedia {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.media = "";
    this.reservationMediaToken = "";
    this.reservationToken = "";
    this.clientToken = "";
    this.mediaTypeToken = NEWS_MEDIA_TYPE_TOKEN_IMAGE;
    this.mediaTypeNameCurrent = "";
    this.mediaTypeNameEn = "";
    this.mediaTypeNameAr = "";
    this.mediaTypeNameUnd = "";
    this.addedByUserToken = "";
    this.addedByUserNameCurrent = "";
    this.addedByUserNameAr = "";
    this.addedByUserNameEn = "";
    this.addedByUserNameUnd = "";
    this.requestProcessTypeToken = "";
    this.requestProcessTypeNameCurrent = "";
    this.requestProcessTypeNameAr = "";
    this.requestProcessTypeNameEn = "";
    this.requestProcessTypeNameUnd = "";
    this.reservationMediaCode = "";
    this.reservationMediaPath = "";
    this.reservationMediaDate = "";
    this.reservationMediaTime = "";
    this.reservationMediaDateTime = "";
    this.reservationMediaNameCurrent = "";
    this.reservationMediaNameEn = "";
    this.reservationMediaNameAr = "";
    this.reservationMediaNameUnd = "";
    this.reservationMediaDescriptionCurrent = "";
    this.reservationMediaDescriptionEn = "";
    this.reservationMediaDescriptionAr = "";
    this.reservationMediaDescriptionUnd = "";
    this.reservationMediaNotes = "";
    this.reservationMediaArchiveStatus = "";
  }
  fillData(data) {
    this.reservationMediaToken = data.reservationMediaToken;
    this.reservationToken = data.reservationToken;
    this.mediaTypeToken = data.mediaTypeToken;
    this.mediaTypeNameCurrent = data.mediaTypeNameCurrent;
    this.mediaTypeNameEn = data.mediaTypeNameEn;
    this.mediaTypeNameAr = data.mediaTypeNameAr;
    this.mediaTypeNameUnd = data.mediaTypeNameUnd;
    this.addedByUserToken = data.addedByUserToken;
    this.addedByUserNameCurrent = data.addedByUserNameCurrent;
    this.addedByUserNameAr = data.addedByUserNameAr;
    this.addedByUserNameEn = data.addedByUserNameEn;
    this.addedByUserNameUnd = data.addedByUserNameUnd;
    this.requestProcessTypeToken = data.requestProcessTypeToken;
    this.requestProcessTypeNameCurrent = data.requestProcessTypeNameCurrent;
    this.requestProcessTypeNameAr = data.requestProcessTypeNameAr;
    this.requestProcessTypeNameEn = data.requestProcessTypeNameEn;
    this.requestProcessTypeNameUnd = data.requestProcessTypeNameUnd;
    this.reservationMediaCode = data.reservationMediaCode;
    this.reservationMediaPath = data.reservationMediaPath;
    this.reservationMediaDate = data.reservationMediaDate;
    this.reservationMediaTime = data.reservationMediaTime;
    this.reservationMediaDateTime = data.reservationMediaDateTime;
    this.reservationMediaNameCurrent = data.reservationMediaNameCurrent;
    this.reservationMediaNameEn = data.reservationMediaNameEn;
    this.reservationMediaNameAr = data.reservationMediaNameAr;
    this.reservationMediaNameUnd = data.reservationMediaNameUnd;
    this.reservationMediaDescriptionCurrent =
      data.reservationMediaDescriptionCurrent;
    this.reservationMediaDescriptionEn = data.reservationMediaDescriptionEn;
    this.reservationMediaDescriptionAr = data.reservationMediaDescriptionAr;
    this.reservationMediaDescriptionUnd = data.reservationMediaDescriptionUnd;
    this.reservationMediaNotes = data.reservationMediaNotes;
    this.reservationMediaArchiveStatus = data.reservationMediaArchiveStatus;
  }

  async getAllReservationsMedias(
    language,
    userAuthorizeToken,
    pagination,
    filterData
  ) {
    // if (
    //   filterData.reservationToken == "" ||
    //   filterData.reservationToken == undefined
    // ) {
    //   let response = {
    //     data: {
    //       status: STATUS.ERROR,
    //       msg: i18n.t("reservationsMedias.pleaseSelectReservation"),
    //       data: "",
    //     },
    //   };
    //   return response;
    // }
    try {
      let response = await axios.get(
        `/ServicesReservationsMedia/GetAllServicesReservationsMedia?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${pagination.selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&paginationStatus=true&clientToken=${filterData.clientToken}&reservationToken=${filterData.reservationToken}&reservationMediaToken=${filterData.reservationMediaToken}&mediaTypeToken=${filterData.mediaTypeToken}&textSearch=${filterData.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getReservationMediaDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationsMedia/GetServicesReservationsMediaDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&reservationMediaToken=${this.reservationMediaToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfReservationsMedias(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservationsMedia/GetDialogOfServicesReservationsMedia?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateReservationMedia(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationMediaToken: this.reservationMediaToken,
      reservationToken: this.reservationToken,
      mediaTypeToken: this.mediaTypeToken,
      image: this.media,
      reservationMediaNameEn: this.reservationMediaNameEn,
      reservationMediaNameAr: this.reservationMediaNameAr,
      reservationMediaNameUnd: this.reservationMediaNameUnd,
      reservationMediaCode: this.reservationMediaCode,
      reservationMediaDescriptionEn: this.reservationMediaDescriptionEn,
      reservationMediaDescriptionAr: this.reservationMediaDescriptionAr,
      reservationMediaDescriptionUnd: this.reservationMediaDescriptionUnd,
      reservationMediaNotes: this.reservationMediaNotes,
    };

    if (this.media != "" && this.media != undefined) {
      var formData = new FormData();
      formData.append("image", this.media);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (
        this.reservationMediaToken == "" ||
        this.reservationMediaToken == undefined
      ) {
        if (this.media != "" && this.media != undefined) {
          response = await axios.post(
            `/ServicesReservationsMedia/AddServicesReservationsMedia`,
            formData
          );
        } else {
          response = {
            data: {
              status: 406,
              msg: i18n.t("reservationMediaMsgNoMedia"),
              data: "",
            },
          };
        }
      } else {
        if (this.media != "" && this.media != undefined) {
          response = await axios.post(
            `/ServicesReservationsMedia/UpdateServicesReservationsMediaWithMedia`,
            formData
          );
        } else {
          response = await axios.post(
            `/ServicesReservationsMedia/UpdateServicesReservationsMediaWithOutMedia`,
            data
          );
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveReservationMedia(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      reservationMediaToken: this.reservationMediaToken,
    };

    try {
      let response = await axios.post(
        `/ServicesReservationsMedia/ArchiveServicesReservationsMedia`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfMediaTypes(language, userAuthorizeToken, filterData) {
    try {
      let response = await axios.get(
        `/ServicesReservationsMedia/GetStatisticsServicesReservationsMedia?language=${language}&userAuthorizeToken=${userAuthorizeToken}&filterStatus=true&paginationStatus=true&clientToken=${filterData.clientToken}&reservationToken=${filterData.reservationToken}&reservationMediaToken=${filterData.reservationMediaToken}&mediaTypeToken=${filterData.mediaTypeToken}&textSearch=${filterData.textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
