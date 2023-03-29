import { date2slash, moneyFormat, numberToEn } from "@/utils/functions";
import {
  STATUS,
  PAGE_SIZE,
  BASE_URL,
  DEFAULT_COUNTRY_CODE,
} from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class Client {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.clientToken = "";
    this.clientCode = "";
    this.clientNameCurrent = "";
    this.clientNameEn = "";
    this.clientNameAr = "";
    this.clientNameUnd = "";
    this.clientNickNameCurrent = "";
    this.clientNickNameEn = "";
    this.clientNickNameAr = "";
    this.clientNickNameUnd = "";
    this.clientCountryToken = "";
    this.countryNameCurrent = "";
    this.clientGovernateToken = "";
    this.governateNameCurrent = "";
    this.clientCityToken = "";
    this.cityNameCurrent = "";
    this.clientDistrictToken = "";
    this.districtNameCurrent = "";
    this.clientQualificationToken = "";
    this.qualificationNameCurrent = "";
    this.clientBankToken = "";
    this.bankNameCurrent = "";
    this.clientDiscountToken = "";
    this.discountNameCurrent = "";
    this.clientRelativeRelationToken = "";
    this.relativeRelationNameCurrent = "";
    this.clientInsuranceCompanyToken = "";
    this.clientMedicalInsuranceLevelToken = "";
    this.insuranceCompanyNameCurrent = "";
    this.clientInsuranceNumber = "";
    this.clientCCWithCCName = DEFAULT_COUNTRY_CODE.CCWithCCName;
    this.clientCountryCodeName = DEFAULT_COUNTRY_CODE.countryCodeName;
    this.clientCountryCode = DEFAULT_COUNTRY_CODE.countryCode;
    this.clientPhone = "";
    this.clientPhoneWithCC = "";
    this.clientBirthdate = "";
    this.clientAgeCurrent = "";
    this.clientUserName = "";
    this.clientEmail = "";
    this.clientNationalNumber = "";
    this.clientNationalNumberExpireDate = "";
    this.clientAddressCurrent = "";
    this.clientAddressEn = "";
    this.clientAddressAr = "";
    this.clientAddressUnd = "";
    this.clientGenderToken = "";
    this.clientGenderNameCurrent = "";
    this.clientGenderNameAr = "";
    this.clientGenderNameEn = "";
    this.clientImagePath = "";
    this.clientPassportNumber = "";
    this.clientPassportExpireDate = "";
    this.clientMaritalToken = "";
    this.clientMaritalNameEn = "";
    this.clientMaritalNameAr = "";
    this.clientMaritalNameCurrent = "";
    this.clientMilitaryToken = "";
    this.clientMilitaryNameCurrent = "";
    this.clientMilitaryNameAr = "";
    this.clientMilitaryNameEn = "";
    this.clientMaritalStatusNotes = "";
    this.clientMilitaryStatusNotes = "";
    this.clientDrivingLicenceNumber = "";
    this.clientDrivingLicenceExpireDate = "";
    this.clientAddingDateToSystem = "";
    this.clientNotes = "";
    this.clientResidencyNumber = "";
    this.clientResidencyStartDate = "";
    this.clientResidencyEndDate = "";
    this.clientSuperToken = "";
    this.clientSuperNameCurrent = "";
    this.clientTypeToken = "";
    this.clientTypeNameCurrent = "";
    this.clientTypeNameAr = "";
    this.clientTypeNameEn = "";
    this.clientCitizenShipTypeToken = "";
    this.clientCitizenShipTypeNameCurrent = "";
    this.clientCitizenShipTypeNameAr = "";
    this.clientCitizenShipTypeNameEn = "";
    this.knownMethodTypeToken = "";
    this.knownMethodTypeNameCurrent = "";
    this.knownMethodTypeNameAr = "";
    this.knownMethodTypeNameEn = "";
    this.knownMethodEmployeeToken = "";
    this.knownMethodEmployeeNameCurrent = "";
    this.knownMethodClientToken = "";
    this.knownMethodClientNameCurrent = "";
    this.knownMethodToken = "";
    this.knownMethodNameCurrent = "";
    // this.clientPassword = "";
    this.clintCountcFamilyMember = 0;
    this.maximumDebtStatus = "";
    this.maximumDebtValue = moneyFormat(0.0);
    this.clientTotalTransactionPoints = 0.0;
    this.clientWalletBalance = 0;
    this.childsRelatedToParent = "";
    this.clientActiveStatus = true;
    this.clientBloodTypeToken = "";
    this.bloodTypeNameCurrent = "";
    this.clientArchiveStatus = "";
    this.clientSurgriesCountInsideCenter = "";
    this.clientSurgriesCountOutsideCenter = "";
  }
  fillData(data) {
    if (data) {
      // this.image = data.image;
      this.clientToken = data.clientToken ?? "";
      this.clientCode = data.clientCode ?? "";
      this.clientNameCurrent = data.clientNameCurrent ?? "";
      this.clientNameEn = data.clientNameEn ?? "";
      this.clientNameAr = data.clientNameAr ?? "";
      this.clientNameUnd = data.clientNameUnd ?? "";
      this.clientNickNameCurrent = data.clientNickNameCurrent ?? "";
      this.clientNickNameEn = data.clientNickNameEn ?? "";
      this.clientNickNameAr = data.clientNickNameAr ?? "";
      this.clientNickNameUnd = data.clientNickNameUnd ?? "";
      this.clientCountryToken = data.clientCountryToken ?? "";
      this.countryNameCurrent = data.countryNameCurrent ?? "";
      this.clientGovernateToken = data.clientGovernateToken ?? "";
      this.governateNameCurrent = data.governateNameCurrent ?? "";
      this.clientCityToken = data.clientCityToken ?? "";
      this.cityNameCurrent = data.cityNameCurrent ?? "";
      this.clientDistrictToken = data.clientDistrictToken ?? "";
      this.districtNameCurrent = data.districtNameCurrent ?? "";
      this.clientQualificationToken = data.clientQualificationToken ?? "";
      this.qualificationNameCurrent = data.qualificationNameCurrent ?? "";
      this.clientBankToken = data.clientBankToken ?? "";
      this.bankNameCurrent = data.bankNameCurrent ?? "";
      this.clientDiscountToken = data.clientDiscountToken ?? "";
      this.discountNameCurrent = data.discountNameCurrent ?? "";
      this.clientRelativeRelationToken = data.clientRelativeRelationToken ?? "";
      this.relativeRelationNameCurrent = data.relativeRelationNameCurrent ?? "";
      this.clientInsuranceCompanyToken = data.clientInsuranceCompanyToken ?? "";
      this.clientMedicalInsuranceLevelToken =
        data.clientMedicalInsuranceLevelToken ?? "";
      this.insuranceCompanyNameCurrent = data.insuranceCompanyNameCurrent ?? "";
      this.clientInsuranceNumber = data.clientInsuranceNumber ?? "";
      this.clientCCWithCCName =
        `${data.clientCountryCodeName} ${data.clientCountryCode}` ?? "";
      this.clientCountryCodeName = data.clientCountryCodeName ?? "";
      this.clientCountryCode = data.clientCountryCode ?? "";
      this.clientPhone = data.clientPhone ?? "";
      this.clientPhoneWithCC = data.clientPhoneWithCC ?? "";
      this.clientBirthdate = data.clientBirthdate ?? "";
      this.clientAgeCurrent = data.clientAgeCurrent ?? "";
      this.clientUserName = data.clientUserName ?? "";
      this.clientEmail = data.clientEmail ?? "";
      this.clientNationalNumber = data.clientNationalNumber ?? "";
      this.clientNationalNumberExpireDate =
        data.clientNationalNumberExpireDate ?? "";
      this.clientAddressCurrent = data.clientAddressCurrent ?? "";
      this.clientAddressEn = data.clientAddressEn ?? "";
      this.clientAddressAr = data.clientAddressAr ?? "";
      this.clientAddressUnd = data.clientAddressUnd ?? "";
      this.clientGenderToken = data.clientGenderToken ?? "";
      this.clientGenderNameCurrent = data.clientGenderNameCurrent ?? "";
      this.clientGenderNameAr = data.clientGenderNameAr ?? "";
      this.clientGenderNameEn = data.clientGenderNameEn ?? "";
      this.clientImagePath = data.clientImagePath ?? "";
      this.clientPassportNumber = data.clientPassportNumber ?? "";
      this.clientPassportExpireDate = data.clientPassportExpireDate ?? "";
      this.clientMaritalToken = data.clientMaritalToken ?? "";
      this.clientMaritalNameEn = data.clientMaritalNameEn ?? "";
      this.clientMaritalNameAr = data.clientMaritalNameAr ?? "";
      this.clientMaritalNameCurrent = data.clientMaritalNameCurrent ?? "";
      this.clientMilitaryToken = data.clientMilitaryToken ?? "";
      this.clientMilitaryNameCurrent = data.clientMilitaryNameCurrent ?? "";
      this.clientMilitaryNameAr = data.clientMilitaryNameAr ?? "";
      this.clientMilitaryNameEn = data.clientMilitaryNameEn ?? "";
      this.clientMaritalStatusNotes = data.clientMaritalStatusNotes ?? "";
      this.clientMilitaryStatusNotes = data.clientMilitaryStatusNotes ?? "";
      this.clientDrivingLicenceNumber = data.clientDrivingLicenceNumber ?? "";
      this.clientDrivingLicenceExpireDate =
        data.clientDrivingLicenceExpireDate ?? "";
      this.clientAddingDateToSystem = data.clientAddingDateToSystem ?? "";
      this.clientNotes = data.clientNotes ?? "";
      this.clientResidencyNumber = data.clientResidencyNumber ?? "";
      this.clientResidencyStartDate = data.clientResidencyStartDate ?? "";
      this.clientResidencyEndDate = data.clientResidencyEndDate ?? "";
      this.clientSuperToken = data.clientSuperToken ?? "";
      this.clientSuperNameCurrent = data.clientSuperNameCurrent ?? "";
      this.clientTypeToken = data.clientTypeToken ?? "";
      this.clientTypeNameCurrent = data.clientTypeNameCurrent ?? "";
      this.clientTypeNameAr = data.clientTypeNameAr ?? "";
      this.clientTypeNameEn = data.clientTypeNameEn ?? "";
      this.clientCitizenShipTypeToken = data.clientCitizenShipTypeToken ?? "";
      this.clientCitizenShipTypeNameCurrent =
        data.clientCitizenShipTypeNameCurrent ?? "";
      this.clientCitizenShipTypeNameAr = data.clientCitizenShipTypeNameAr ?? "";
      this.clientCitizenShipTypeNameEn = data.clientCitizenShipTypeNameEn ?? "";
      this.knownMethodTypeToken = data.knownMethodTypeToken ?? "";
      this.knownMethodTypeNameCurrent = data.knownMethodTypeNameCurrent ?? "";
      this.knownMethodTypeNameAr = data.knownMethodTypeNameAr ?? "";
      this.knownMethodTypeNameEn = data.knownMethodTypeNameEn ?? "";
      this.knownMethodEmployeeToken = data.knownMethodEmployeeToken ?? "";
      this.knownMethodEmployeeNameCurrent =
        data.knownMethodEmployeeNameCurrent ?? "";
      this.knownMethodClientToken = data.knownMethodClientToken ?? "";
      this.knownMethodClientNameCurrent =
        data.knownMethodClientNameCurrent ?? "";
      this.knownMethodToken = data.knownMethodToken ?? "";
      this.knownMethodNameCurrent = data.knownMethodNameCurrent ?? "";
      // this.clientPassword = data.clientPassword;
      this.clintCountcFamilyMember = data.clintCountcFamilyMember ?? "";
      this.maximumDebtStatus = data.maximumDebtStatus ?? "";
      this.maximumDebtValue = moneyFormat(data.maximumDebtValue) ?? "";
      this.clientTotalTransactionPoints =
        data.clientTotalTransactionPoints ?? "";
      this.clientWalletBalance = data.clientWalletBalance ?? "";
      this.childsRelatedToParent = data.childsRelatedToParent ?? "";
      this.clientActiveStatus = data.clientActiveStatus ?? true;
      this.clientBloodTypeToken = data.clientBloodTypeToken ?? "";
      this.bloodTypeNameCurrent = data.bloodTypeNameCurrent ?? "";
      this.clientArchiveStatus = data.clientArchiveStatus ?? "";
      this.clientSurgriesCountInsideCenter =
        data.clientSurgriesCountInsideCenter ?? "";
      this.clientSurgriesCountOutsideCenter =
        data.clientSurgriesCountOutsideCenter ?? "";
    }
  }

  async getAllClients(
    language,
    userAuthorizeToken,
    selfPage,
    clientTypeToken,
    clientSuperToken,
    textSearch
  ) {
    try {
      let response = await axios.get(
        `/Clients/GetAllClients?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&clientTypeToken=${clientTypeToken}&clientSuperToken=${clientSuperToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfClientsWithImageAndWallet(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/Clients/GetAllClients?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=&pageSize=${PAGE_SIZE}&filterStatus=true&clientTypeToken=&clientSuperToken=&textSearch=`
      );
      const itemsData = response.data.clientsPagination.clientsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["clientToken"],
            text:
              itemsData[item]["clientNameCurrent"] +
              " - " +
              i18n.t("pointsAndWallets.wallets.balance") +
              ": " +
              moneyFormat(itemsData[item]["clientWalletBalance"]),
            image: itemsData[item]["clientImagePath"]
              ? BASE_URL + itemsData[item]["clientImagePath"]
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
  async getDialogOfClientsWithImageAndPoint(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/Clients/GetAllClients?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=&pageSize=${PAGE_SIZE}&filterStatus=true&clientTypeToken=&clientSuperToken=&textSearch=`
      );
      const itemsData = response.data.clientsPagination.clientsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["clientToken"],
            text:
              itemsData[item]["clientNameCurrent"] +
              " - " +
              i18n.t("pointsAndWallets.points.balance") +
              ": " +
              itemsData[item]["clientTotalTransactionPoints"],
            image: itemsData[item]["clientImagePath"]
              ? BASE_URL + itemsData[item]["clientImagePath"]
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

  async getClientDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Clients/GetClientDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&clientToken=${this.clientToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfClients(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Clients/GetDialogOfClients?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfClientsWithImage(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/Clients/GetDialogOfClients?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
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

  async addOrUpdateClient(language, userAuthorizeToken) {
    var data = {
      image: this.image,
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      clientToken: this.clientToken,
      clientCode: this.clientCode,
      clientNameCurrent: this.clientNameCurrent,
      clientNameEn: this.clientNameEn,
      clientNameAr: this.clientNameAr,
      clientNameUnd: this.clientNameUnd,
      clientNickNameCurrent: this.clientNickNameCurrent,
      clientNickNameEn: this.clientNickNameEn,
      clientNickNameAr: this.clientNickNameAr,
      clientNickNameUnd: this.clientNickNameUnd,
      clientCountryToken: this.clientCountryToken,
      countryNameCurrent: this.countryNameCurrent,
      clientGovernateToken: this.clientGovernateToken,
      governateNameCurrent: this.governateNameCurrent,
      clientCityToken: this.clientCityToken,
      cityNameCurrent: this.cityNameCurrent,
      clientDistrictToken: this.clientDistrictToken,
      districtNameCurrent: this.districtNameCurrent,
      clientQualificationToken: this.clientQualificationToken,
      qualificationNameCurrent: this.qualificationNameCurrent,
      clientBankToken: this.clientBankToken,
      bankNameCurrent: this.bankNameCurrent,
      clientDiscountToken: this.clientDiscountToken,
      discountNameCurrent: this.discountNameCurrent,
      clientRelativeRelationToken: this.clientRelativeRelationToken,
      relativeRelationNameCurrent: this.relativeRelationNameCurrent,
      clientInsuranceCompanyToken: this.clientInsuranceCompanyToken,
      clientMedicalInsuranceLevelToken: this.clientMedicalInsuranceLevelToken,
      insuranceCompanyNameCurrent: this.insuranceCompanyNameCurrent,
      clientInsuranceNumber: this.clientInsuranceNumber,
      clientCCWithCCName: this.clientCCWithCCName,
      clientCountryCodeName: this.clientCountryCodeName,
      clientCountryCode: this.clientCountryCode,
      clientPhone: numberToEn(this.clientPhone),
      clientPhoneWithCC: this.clientPhoneWithCC,
      clientBirthdate: date2slash(this.clientBirthdate),
      clientAgeCurrent: this.clientAgeCurrent,
      clientUserName: this.clientUserName,
      clientEmail: this.clientEmail,
      clientBloodTypeToken: this.clientBloodTypeToken,
      clientNationalNumber: this.clientNationalNumber,
      clientNationalNumberExpireDate: date2slash(
        this.clientNationalNumberExpireDate
      ),
      clientAddressCurrent: this.clientAddressCurrent,
      clientAddressEn: this.clientAddressEn,
      clientAddressAr: this.clientAddressAr,
      clientAddressUnd: this.clientAddressUnd,
      clientGenderToken: this.clientGenderToken,
      clientGenderNameCurrent: this.clientGenderNameCurrent,
      clientGenderNameAr: this.clientGenderNameAr,
      clientGenderNameEn: this.clientGenderNameEn,
      clientImagePath: this.clientImagePath,
      clientPassportNumber: this.clientPassportNumber,
      clientPassportExpireDate: date2slash(this.clientPassportExpireDate),
      clientMaritalToken: this.clientMaritalToken,
      clientMaritalNameEn: this.clientMaritalNameEn,
      clientMaritalNameAr: this.clientMaritalNameAr,
      clientMaritalNameCurrent: this.clientMaritalNameCurrent,
      clientMilitaryToken: this.clientMilitaryToken,
      clientMilitaryNameCurrent: this.clientMilitaryNameCurrent,
      clientMilitaryNameAr: this.clientMilitaryNameAr,
      clientMilitaryNameEn: this.clientMilitaryNameEn,
      clientMaritalStatusNotes: this.clientMaritalStatusNotes,
      clientMilitaryStatusNotes: this.clientMilitaryStatusNotes,
      clientDrivingLicenceNumber: this.clientDrivingLicenceNumber,
      clientDrivingLicenceExpireDate: date2slash(
        this.clientDrivingLicenceExpireDate
      ),
      clientAddingDateToSystem: date2slash(this.clientAddingDateToSystem),
      clientNotes: this.clientNotes,
      clientResidencyNumber: this.clientResidencyNumber,
      clientResidencyStartDate: date2slash(this.clientResidencyStartDate),
      clientResidencyEndDate: date2slash(this.clientResidencyEndDate),
      clientSuperToken: this.clientSuperToken,
      clientSuperNameCurrent: this.clientSuperNameCurrent,
      clientTypeToken: this.clientTypeToken,
      clientTypeNameCurrent: this.clientTypeNameCurrent,
      clientTypeNameAr: this.clientTypeNameAr,
      clientTypeNameEn: this.clientTypeNameEn,
      clientCitizenShipTypeToken: this.clientCitizenShipTypeToken,
      clientCitizenShipTypeNameCurrent: this.clientCitizenShipTypeNameCurrent,
      clientCitizenShipTypeNameAr: this.clientCitizenShipTypeNameAr,
      clientCitizenShipTypeNameEn: this.clientCitizenShipTypeNameEn,
      knownMethodTypeToken: this.knownMethodTypeToken,
      knownMethodTypeNameCurrent: this.knownMethodTypeNameCurrent,
      knownMethodTypeNameAr: this.knownMethodTypeNameAr,
      knownMethodTypeNameEn: this.knownMethodTypeNameEn,
      knownMethodEmployeeToken: this.knownMethodEmployeeToken,
      knownMethodEmployeeNameCurrent: this.knownMethodEmployeeNameCurrent,
      knownMethodClientToken: this.knownMethodClientToken,
      knownMethodClientNameCurrent: this.knownMethodClientNameCurrent,
      knownMethodToken: this.knownMethodToken,
      knownMethodNameCurrent: this.knownMethodNameCurrent,
      clientPassword: this.clientPassword,
      clintCountcFamilyMember: this.clintCountcFamilyMember,
      childsRelatedToParent: this.childsRelatedToParent,
      clientActiveStatus: this.clientActiveStatus,
      clientArchiveStatus: this.clientArchiveStatus,
    };
    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.clientToken == "" || this.clientToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Clients/AddClientWithImage`, formData);
        } else {
          response = await axios.post(`/Clients/AddClientWithoutImage`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(
            `/Clients/UpdateClientWithImage`,
            formData
          );
        } else {
          response = await axios.post(
            `/Clients/UpdateClientWithoutImage`,
            data
          );
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveClient(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      clientToken: this.clientToken,
    };

    try {
      let response = await axios.post(`/Clients/ArchiveClient`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
