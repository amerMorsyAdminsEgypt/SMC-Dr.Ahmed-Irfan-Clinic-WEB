import axios from "axios";

export default class ServiceFinalPrice {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.reservationToken = "";
    this.serviceToken = "";
    this.clientToken = "";
    this.offerToken = "";
    this.offerCode = "";
    this.calculateTaxesStatus = false;
    this.addTaxForOnlyServicePriceStatus = false;
    this.addInsuranceCompanyDiscountPercentageStatus = false;
    this.feesTypeToken = "";
    this.feesTypeValue = 0;
    this.serviceTaxValue = 0;
    this.serviceFinalPrice = 0;
    this.servecePrice = 0;
    this.servecePriceInOffer = 0;
    this.taxesValue = 0;
    this.feesValue = 0;
    this.clientInsuranceLevelDiscountPercentage = 0;
    this.clientInsuranceLevelDiscountValue = 0;
    this.clientInsuranceLevelToken = "";
    this.clientInsuranceLevelNameAr = "";
    this.clientInsuranceLevelNameEn = "";
    this.clientInsuranceLevelNameUnd = "";
  }
  fillData(data) {
    if (data) {
      this.reservationToken = data.reservationToken ?? "";
      this.serviceToken = data.serviceToken ?? "";
      this.clientToken = data.clientToken ?? "";
      this.offerToken = data.offerToken ?? "";
      this.offerCode = data.offerCode ?? "";
      this.calculateTaxesStatus = data.calculateTaxesStatus ?? false;
      this.addTaxForOnlyServicePriceStatus =
        data.addTaxForOnlyServicePriceStatus ?? false;
      this.addInsuranceCompanyDiscountPercentageStatus =
        data.addInsuranceCompanyDiscountPercentageStatus ?? false;
      this.feesTypeToken = data.feesTypeToken ?? "";
      this.feesTypeValue = data.feesTypeValue ?? 0;
      this.serviceTaxValue = data.serviceTaxValue ?? 0;
      this.serviceFinalPrice = data.serviceFinalPrice ?? 0;
      this.servecePrice = data.servecePrice ?? 0;
      this.servecePriceInOffer = data.servecePriceInOffer ?? 0;
      this.taxesValue = data.taxesValue ?? 0;
      this.feesValue = data.feesValue ?? 0;
      this.clientInsuranceLevelDiscountPercentage =
        data.clientInsuranceLevelDiscountPercentage ?? 0;
      this.clientInsuranceLevelDiscountValue =
        data.clientInsuranceLevelDiscountValue ?? 0;
      this.clientInsuranceLevelToken = data.clientInsuranceLevelToken ?? "";
      this.clientInsuranceLevelNameAr = data.clientInsuranceLevelNameAr ?? "";
      this.clientInsuranceLevelNameEn = data.clientInsuranceLevelNameEn ?? "";
      this.clientInsuranceLevelNameUnd = data.clientInsuranceLevelNameUnd ?? "";
    } else {
      this.setInitialValue();
    }
  }

  async getServiceFinalPrice(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/ServicesReservations/GetServiceFinalPrice?language=${language}&userAuthorizeToken=${userAuthorizeToken}&serviceToken=${this.serviceToken}&clientToken=${this.clientToken}&offerToken=${this.offerToken}&calculateTaxesStatus=${this.calculateTaxesStatus}&addTaxForOnlyServicePriceStatus=${this.addTaxForOnlyServicePriceStatus}&addInsuranceCompanyDiscountPercentageStatus=${this.addInsuranceCompanyDiscountPercentageStatus}&feesTypeToken=${this.feesTypeToken}&feesTypeValue=${this.feesTypeValue}&serviceTaxValue=${this.serviceTaxValue}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
