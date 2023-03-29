import axios from "axios";
import { DEFAULT_COUNTRY_CODE } from "@/utils/constants";

export default class Store {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.storeToken = "";
    this.storeMangareEmployeeToken = "";
    this.storeMangareEmployeeNameCurrent = "";
    this.countryToken = "";
    this.countryNameCurrent = "";
    this.governateToken = "";
    this.governateNameCurrent = "";
    this.cityToken = "";
    this.cityNameCurrent = "";
    this.districtToken = "";
    this.districtNameCurrent = "";
    this.storeCode = "";
    this.storeNameEn = "";
    this.storeNameAr = "";
    this.storeNameUnd = "";
    this.storeFirstNumberCCWithCCName = DEFAULT_COUNTRY_CODE.CCWithCCName;
    this.storeFirstNumberCountryCodeName = DEFAULT_COUNTRY_CODE.countryCodeName;
    this.storeFirstNumberCountryCode = DEFAULT_COUNTRY_CODE.countryCode;
    this.storeFirstPhone = "";
    this.storeSecondNumberCCWithCCName = DEFAULT_COUNTRY_CODE.CCWithCCName;
    this.storeSecondNumberCountryCodeName =
      DEFAULT_COUNTRY_CODE.countryCodeName;
    this.storeSecondNumberCountryCode = DEFAULT_COUNTRY_CODE.countryCode;
    this.storeSecondPhone = "";
    this.storeLandLineCCWithCCName = DEFAULT_COUNTRY_CODE.CCWithCCName;
    this.storeLandLineCountryCodeName = DEFAULT_COUNTRY_CODE.countryCodeName;
    this.storeLandLineCountryCode = DEFAULT_COUNTRY_CODE.countryCode;
    this.storeLandLine = "";
    this.storeAddressEn = "";
    this.storeAddressAr = "";
    this.storeAddressUnd = "";
    this.storeLatitude = "";
    this.storeLongitude = "";
    this.storeEndLatitude = "";
    this.storeEndLongitude = "";
    this.storeDistance = "";
    this.storeNotes = "";
    this.storeImagePath = "";
  }
  fillData(storeData) {
    this.image = storeData.image;
    this.storeToken = storeData.storeToken;
    this.storeMangareEmployeeToken = storeData.storeMangareEmployeeToken;
    this.storeMangareEmployeeNameCurrent =
      storeData.storeMangareEmployeeNameCurrent;
    this.countryToken = storeData.countryToken;
    this.countryNameCurrent = storeData.countryNameCurrent;
    this.governateToken = storeData.governateToken;
    this.governateNameCurrent = storeData.governateNameCurrent;
    this.cityToken = storeData.cityToken;
    this.cityNameCurrent = storeData.cityNameCurrent;
    this.districtToken = storeData.districtToken;
    this.districtNameCurrent = storeData.districtNameCurrent;
    this.storeCode = storeData.storeCode;
    this.storeNameEn = storeData.storeNameEn;
    this.storeNameAr = storeData.storeNameAr;
    this.storeNameUnd = storeData.storeNameUnd;
    this.storeFirstNumberCCWithCCName = `${storeData.storeFirstNumberCountryCodeName} ${storeData.storeFirstNumberCountryCode}`;
    this.storeFirstNumberCountryCodeName =
      storeData.storeFirstNumberCountryCodeName;
    this.storeFirstNumberCountryCode = storeData.storeFirstNumberCountryCode;
    this.storeFirstPhone = storeData.storeFirstPhone;
    this.storeSecondNumberCCWithCCName = `${storeData.storeSecondNumberCountryCodeName} ${storeData.storeSecondNumberCountryCode}`;
    this.storeSecondNumberCountryCodeName =
      storeData.storeSecondNumberCountryCodeName;
    this.storeSecondNumberCountryCode = storeData.storeSecondNumberCountryCode;
    this.storeSecondPhone = storeData.storeSecondPhone;
    this.storeLandLineCCWithCCName = `${storeData.storeLandLineCountryCodeName} ${storeData.storeLandLineCountryCode}`;
    this.storeLandLineCountryCodeName = storeData.storeLandLineCountryCodeName;
    this.storeLandLineCountryCode = storeData.storeLandLineCountryCode;
    this.storeLandLine = storeData.storeLandLine;
    this.storeAddressEn = storeData.storeAddressEn;
    this.storeAddressAr = storeData.storeAddressAr;
    this.storeAddressUnd = storeData.storeAddressUnd;
    this.storeLatitude = storeData.storeLatitude;
    this.storeLongitude = storeData.storeLongitude;
    this.storeEndLatitude = storeData.storeEndLatitude;
    this.storeEndLongitude = storeData.storeEndLongitude;
    this.storeDistance = storeData.storeDistance;
    this.storeNotes = storeData.storeNotes;
    this.storeImagePath = storeData.storeImagePath;
  }

  async getStoreDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Stores/GetStoreDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&storeToken=${this.storeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async addOrUpdateStore(language, userAuthorizeToken) {
    var data = {
      image: this.image,
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      storeToken: this.storeToken,
      storeMangareEmployeeToken: this.storeMangareEmployeeToken,
      countryToken: this.countryToken,
      governateToken: this.governateToken,
      cityToken: this.cityToken,
      districtToken: this.districtToken,
      storeNameEn: this.storeNameEn,
      storeNameAr: this.storeNameAr,
      storeNameUnd: this.storeNameUnd,
      storeFirstNumberCountryCodeName: this.storeFirstNumberCountryCodeName,
      storeFirstNumberCountryCode: this.storeFirstNumberCountryCode,
      storeFirstPhone: this.storeFirstPhone,
      storeSecondNumberCountryCodeName: this.storeSecondNumberCountryCodeName,
      storeSecondNumberCountryCode: this.storeSecondNumberCountryCode,
      storeSecondPhone: this.storeSecondPhone,
      storeLandLineCountryCodeName: this.storeLandLineCountryCodeName,
      storeLandLineCountryCode: this.storeLandLineCountryCode,
      storeLandLine: this.storeLandLine,
      storeAddressEn: this.storeAddressEn,
      storeAddressAr: this.storeAddressAr,
      storeAddressUnd: this.storeAddressUnd,
      storeLatitude: this.storeLatitude,
      storeLongitude: this.storeLongitude,
      storeEndLatitude: this.storeEndLatitude,
      storeEndLongitude: this.storeEndLongitude,
      storeDistance: this.storeDistance,
      storeNotes: this.storeNotes,
    };
    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.storeToken == "" || this.storeToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Stores/AddStoreWithImage`, formData);
        } else {
          response = await axios.post(`/Stores/AddStoreWithoutImage`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Stores/UpdateStoreWithImage`, formData);
        } else {
          response = await axios.post(`/Stores/UpdateStoreWithoutImage`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveStore(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      storeToken: this.storeToken,
    };

    try {
      let response = await axios.post(`/Stores/ArchiveStore`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
