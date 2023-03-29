import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class ScientificDegree {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.scientificDegreeToken = "";
    this.scientificDegreeNameCurrent = "";
    this.scientificDegreeNameEn = "";
    this.scientificDegreeNameAr = "";
    this.scientificDegreeNameUnd = "";
    this.scientificDegreeDescriptionCurrent = "";
    this.scientificDegreeDescriptionEn = "";
    this.scientificDegreeDescriptionAr = "";
    this.scientificDegreeDescriptionUnd = "";
    this.scientificDegreeNotes = "";
    this.scientificDegreeArchiveStatus = "";
  }
  fillData(data) {
    this.scientificDegreeToken = data.scientificDegreeToken;
    this.scientificDegreeNameCurrent = data.scientificDegreeNameCurrent;
    this.scientificDegreeNameEn = data.scientificDegreeNameEn;
    this.scientificDegreeNameAr = data.scientificDegreeNameAr;
    this.scientificDegreeNameUnd = data.scientificDegreeNameUnd;
    this.scientificDegreeDescriptionCurrent =
      data.scientificDegreeDescriptionCurrent;
    this.scientificDegreeDescriptionEn = data.scientificDegreeDescriptionEn;
    this.scientificDegreeDescriptionAr = data.scientificDegreeDescriptionAr;
    this.scientificDegreeDescriptionUnd = data.scientificDegreeDescriptionUnd;
    this.scientificDegreeNotes = data.scientificDegreeNotes;
    this.scientificDegreeArchiveStatus = data.scientificDegreeArchiveStatus;
  }

  async getAllScientificDegrees(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/ScientificDegrees/GetAllScientificDegrees/?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getScientificDegreeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ScientificDegrees/GetScientificDegreeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&scientificDegreeToken=${this.scientificDegreeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfScientificDegrees(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ScientificDegrees/GetDialogOfScientificDegrees?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateScientificDegree(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      scientificDegreeToken: this.scientificDegreeToken,
      scientificDegreeNameEn: this.scientificDegreeNameEn,
      scientificDegreeNameAr: this.scientificDegreeNameAr,
      scientificDegreeNameUnd: this.scientificDegreeNameUnd,
      scientificDegreeDescriptionEn: this.scientificDegreeDescriptionEn,
      scientificDegreeDescriptionAr: this.scientificDegreeDescriptionAr,
      scientificDegreeDescriptionUnd: this.scientificDegreeDescriptionUnd,
      scientificDegreeNotes: this.scientificDegreeNotes,
    };

    try {
      let response = "";
      if (
        this.scientificDegreeToken == "" ||
        this.scientificDegreeToken == undefined
      ) {
        response = await axios.post(
          `/ScientificDegrees/AddScientificDegree`,
          data
        );
      } else {
        response = await axios.post(
          `/ScientificDegrees/UpdateScientificDegree`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveScientificDegree(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      scientificDegreeToken: this.scientificDegreeToken,
    };

    try {
      let response = await axios.post(
        `/ScientificDegrees/ArchiveScientificDegree`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
