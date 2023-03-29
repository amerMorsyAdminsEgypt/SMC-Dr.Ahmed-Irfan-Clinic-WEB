import { PAGE_SIZE } from "@/utils/constants";
import axios from "axios";

export default class MedicinesType {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicinesTypeToken = "";
    this.medicinesTypeNameCurrent = "";
    this.medicinesTypeNameAr = "";
    this.medicinesTypeNameEn = "";
    this.medicinesTypeNameUnd = "";
    this.medicinesTypeNotes = "";
    this.medicinesTypeArchiveStatus = "";
  }
  fillData(data) {
    this.medicinesTypeToken = data.medicinesTypeToken;
    this.medicinesTypeNameCurrent = data.medicinesTypeNameCurrent;
    this.medicinesTypeNameAr = data.medicinesTypeNameAr;
    this.medicinesTypeNameEn = data.medicinesTypeNameEn;
    this.medicinesTypeNameUnd = data.medicinesTypeNameUnd;
    this.medicinesTypeNotes = data.medicinesTypeNotes;
    this.medicinesTypeArchiveStatus = data.medicinesTypeArchiveStatus;
  }

  async getAllMedicinesTypes(
    language,
    userAuthorizeToken,
    selfPage,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/MedicinesTypes/GetAllMedicinesTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMedicinesTypeDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicinesTypes/GetMedicinesTypeDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicinesTypeToken=${this.medicinesTypeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfMedicinesTypes(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/MedicinesTypes/GetDialogOfMedicinesTypes?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMedicinesType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicinesTypeToken: this.medicinesTypeToken,
      medicinesTypeNameEn: this.medicinesTypeNameEn,
      medicinesTypeNameAr: this.medicinesTypeNameAr,
      medicinesTypeNameUnd: this.medicinesTypeNameUnd,
      medicinesTypeNotes: this.medicinesTypeNotes,
    };

    try {
      let response = "";
      if (
        this.medicinesTypeToken == "" ||
        this.medicinesTypeToken == undefined
      ) {
        response = await axios.post(`/MedicinesTypes/AddMedicinesType`, data);
      } else {
        response = await axios.post(
          `/MedicinesTypes/UpdateMedicinesType`,
          data
        );
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMedicinesType(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicinesTypeToken: this.medicinesTypeToken,
    };

    try {
      let response = await axios.post(
        `/MedicinesTypes/ArchiveMedicinesType`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
