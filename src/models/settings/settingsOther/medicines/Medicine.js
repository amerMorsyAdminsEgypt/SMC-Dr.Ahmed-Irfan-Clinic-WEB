// import { STATUS, PAGE_SIZE, BASE_URL } from "@/utils/constants";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class Medicine {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.medicineToken = "";
    this.medicinesTypeToken = "";
    this.medicinesTypeNameCurrent = "";
    this.medicineNameCollecation = "";
    this.medicineNameCurrent = "";
    this.medicineNameAr = "";
    this.medicineNameEn = "";
    this.medicineNameUnd = "";
    this.medicineNotes = "";
    this.medicineArchiveStatus = "";
  }
  fillData(data) {
    this.medicineToken = data.medicineToken;
    this.medicinesTypeToken = data.medicinesTypeToken;
    this.medicinesTypeNameCurrent = data.medicinesTypeNameCurrent;
    this.medicineNameCollecation = data.medicineNameCollecation;
    this.medicineNameCurrent = data.medicineNameCurrent;
    this.medicineNameAr = data.medicineNameAr;
    this.medicineNameEn = data.medicineNameEn;
    this.medicineNameUnd = data.medicineNameUnd;
    this.medicineNotes = data.medicineNotes;
    this.medicineArchiveStatus = data.medicineArchiveStatus;
  }

  async getAllMedicines(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Medicines/GetAllMedicines?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMedicineDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Medicines/GetMedicineDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&medicineToken=${this.medicineToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfMedicinesWithImg(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/Medicines/GetDialogOfMedicines?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
            image: "",
            // image: itemsData[item]["itemImagePath"]
            //   ? BASE_URL + itemsData[item]["itemImagePath"]
            //   : "",
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

  async getDialogOfMedicines(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Medicines/GetDialogOfMedicines?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateMedicine(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicinesTypeToken: this.medicinesTypeToken,
      medicineToken: this.medicineToken,
      medicineNameEn: this.medicineNameEn,
      medicineNameAr: this.medicineNameAr,
      medicineNameUnd: this.medicineNameUnd,
      medicineNotes: this.medicineNotes,
    };

    try {
      let response = "";
      if (this.medicineToken == "" || this.medicineToken == undefined) {
        response = await axios.post(`/Medicines/AddMedicine`, data);
      } else {
        response = await axios.post(`/Medicines/UpdateMedicine`, data);
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMedicine(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      medicineToken: this.medicineToken,
    };

    try {
      let response = await axios.post(`/Medicines/ArchiveMedicine`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
