<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <form v-if="!isLoading" autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'clientToken'"
            :value="servicesReservationAddedServiceData.clientToken"
            :options="clientTokenOptions"
            v-on:changeValue="clientChanged($event)"
            :title="$t('selectClient')"
            :imgName="'clients.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'reservationToken'"
            :value="servicesReservationAddedServiceData.reservationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="
              servicesReservationAddedServiceData.reservationToken = $event
            "
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="'serviceTypeToken'"
            :value="servicesReservationAddedServiceData.serviceTypeToken"
            :options="serviceTypeTokenOptions"
            v-on:changeValue="changeServiceType($event)"
            :title="$t('selectServiceType')"
            :imgName="'services-types.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'serviceToken'"
            :value="servicesReservationAddedServiceData.serviceToken"
            :options="serviceTokenOptions"
            v-on:changeValue="changeService($event)"
            :title="$t('selectService')"
            :imgName="'services.svg'"
          />

          <DataLabelGroup
            :className="'col-md-4'"
            :value="servicesReservationAddedServiceData.servicePrice"
            :title="$t('servicePrice')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-md-4'"
            :value="servicesReservationAddedServiceData.serviceTimeWithMinutes"
            :title="$t('serviceTimeWithMinutes')"
            :imgName="'minutes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-4'"
            :value="servicesReservationAddedServiceData.maxDiscountPercentage"
            :title="$t('maxDiscountPercentage')"
            :imgName="'percentage.svg'"
          />

          <DatePicker
            :className="'col-md-6'"
            :id="'serviceDeliveryDate'"
            :value="servicesReservationAddedServiceData.serviceDeliveryDate"
            v-on:changeValue="changeReservationDate($event)"
            :title="$t('reservationDate')"
            :language="language"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'offerCode'"
            :value="servicesReservationAddedServiceData.offerCode"
            :options="offerCodeOptions"
            v-on:changeValue="
              servicesReservationAddedServiceData.offerCode = $event
            "
            :title="$t('selectOffer')"
            :imgName="'offers.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'reservationAddedServicesNotes'"
            :value="
              servicesReservationAddedServiceData.reservationAddedServicesNotes
            "
            v-on:changeValue="
              servicesReservationAddedServiceData.reservationAddedServicesNotes =
                $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <CustomCheckbox
            :className="'col-12'"
            :value="
              servicesReservationAddedServiceData.addInsuranceCompanyDiscountPercentageStatus
            "
            :title="$t('addInsuranceCompanyDiscountPercentageStatus')"
            v-on:changeValue="
              servicesReservationAddedServiceData.addInsuranceCompanyDiscountPercentageStatus =
                $event
            "
          />
        </div>
      </div>

      <div
        v-if="
          checkPrivilege(
            usersPrivilegeData.usersPrivilegeServicesReservations
              .servicesReservationAddPay
          )
        "
      >
        <b-button v-b-toggle.paymentData class="btn btn-lg btn-collapse">
          {{ $t("paymentData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse id="paymentData">
          <div class="my-card">
            <div class="row">
              <CustomSelectBox
                :className="'col-md-3'"
                :id="'treasuryToken'"
                :value="
                  servicesReservationAddedServiceData.servicesReservationPayData
                    .treasuryToken
                "
                :options="treasuryTokenOptions"
                v-on:changeValue="
                  servicesReservationAddedServiceData.servicesReservationPayData.treasuryToken =
                    $event
                "
                :title="$t('selectTreasury')"
                :imgName="'treasuries.svg'"
              />
              <CustomSelectBox
                :className="'col-md-3'"
                :id="'methodPaidToken'"
                :value="
                  servicesReservationAddedServiceData.servicesReservationPayData
                    .methodPaidToken
                "
                :options="methodPaidTokenOptions"
                v-on:changeValue="
                  servicesReservationAddedServiceData.servicesReservationPayData.methodPaidToken =
                    $event
                "
                :title="$t('selectMethodPaid')"
                :imgName="'payment-method.svg'"
              />
              <CustomInputFloat
                :className="'col-md-3'"
                :id="'methodPaidValue'"
                :value="
                  servicesReservationAddedServiceData.servicesReservationPayData
                    .methodPaidValue
                "
                :title="$t('paidMoney')"
                :imgName="'money.svg'"
                v-on:changeValue="
                  servicesReservationAddedServiceData.servicesReservationPayData.methodPaidValue =
                    $event
                "
              />
              <DataLabelGroup
                :className="'col-md-3'"
                v-model="totalPointsPaid"
                :title="$t('pointsAndWallets.points.totalPaid')"
                :imgName="'money.svg'"
              />
              <hr class="form-divider" />
              <CustomSelectBox
                :className="'col-md-6'"
                :id="'feesTypeToken'"
                :value="servicesReservationAddedServiceData.feesTypeToken"
                :options="feesTypeTokenOptions"
                v-on:changeValue="
                  servicesReservationAddedServiceData.feesTypeToken = $event
                "
                :title="$t('selectFeesType')"
                :imgName="'type.svg'"
              />
              <CustomInputFloat
                :className="'col-md-6'"
                :id="'feesTypeValue'"
                :value="servicesReservationAddedServiceData.feesTypeValue"
                :title="$t('feesValue')"
                :imgName="'money.svg'"
                v-on:changeValue="
                  servicesReservationAddedServiceData.feesTypeValue = $event
                "
              />
              <!-- Taxes -->
              <div class="col-12">
                <div class="row">
                  <CustomCheckbox
                    :className="'col-md-2'"
                    :value="
                      servicesReservationAddedServiceData.calculateTaxesStatus
                    "
                    :title="$t('calculateTaxesStatus')"
                    v-on:changeValue="
                      servicesReservationAddedServiceData.calculateTaxesStatus =
                        $event
                    "
                  />
                  <div class="col-md-10">
                    <template
                      v-if="
                        servicesReservationAddedServiceData.calculateTaxesStatus
                      "
                    >
                      <div class="row">
                        <CustomInputFloat
                          :className="'col-md-4'"
                          :id="'serviceTaxValue'"
                          :value="
                            servicesReservationAddedServiceData.serviceTaxValue
                          "
                          v-on:changeValue="
                            servicesReservationAddedServiceData.serviceTaxValue =
                              $event
                          "
                          :title="$t('value')"
                          :imgName="'percentage.svg'"
                        />
                        <CustomCheckbox
                          :className="'col-md-4'"
                          :value="
                            servicesReservationAddedServiceData.addTaxForOnlyServicePriceStatus
                          "
                          v-on:changeValue="
                            servicesReservationAddedServiceData.addTaxForOnlyServicePriceStatus =
                              $event
                          "
                          :title="$t('addTaxForOnlyService')"
                        />
                        <CustomCheckbox
                          :className="'col-md-4'"
                          :value="
                            !servicesReservationAddedServiceData.addTaxForOnlyServicePriceStatus
                          "
                          v-on:changeValue="
                            servicesReservationAddedServiceData.addTaxForOnlyServicePriceStatus =
                              !$event
                          "
                          :title="$t('addTaxForEffects')"
                        />
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <DataLabelGroup
                :className="'col-md-4'"
                :value="theClientData.clientTotalTransactionPoints"
                :title="$t('pointsAndWallets.points.balance')"
                :imgName="'points.svg'"
              />
              <CustomInputFloat
                :className="'col-md-4'"
                :id="'pointsValue'"
                :value="
                  servicesReservationAddedServiceData.servicesReservationPayData
                    .pointsValue
                "
                :title="$t('pointsAndWallets.points.number')"
                :imgName="'number.svg'"
                v-on:changeValue="
                  servicesReservationAddedServiceData.servicesReservationPayData.pointsValue =
                    $event
                "
              />
              <CustomInputFloat
                :className="'col-md-4'"
                :id="'onePointEqualValue'"
                :value="
                  servicesReservationAddedServiceData.servicesReservationPayData
                    .onePointEqualValue
                "
                :title="$t('pointsAndWallets.points.paid')"
                :imgName="'points.svg'"
                v-on:changeValue="
                  servicesReservationAddedServiceData.servicesReservationPayData.onePointEqualValue =
                    $event
                "
              />

              <DataLabelGroup
                :className="'col-md-6'"
                :value="moneyFormat(theClientData.clientWalletBalance)"
                :title="$t('pointsAndWallets.wallets.balance')"
                :imgName="'wallet.svg'"
              />
              <CustomInputFloat
                :className="'col-md-6'"
                :id="'walletValue'"
                :value="
                  servicesReservationAddedServiceData.servicesReservationPayData
                    .walletValue
                "
                :title="$t('pointsAndWallets.wallets.paidMoney')"
                :imgName="'wallet.svg'"
                v-on:changeValue="
                  servicesReservationAddedServiceData.servicesReservationPayData.walletValue =
                    $event
                "
              />

              <TextArea
                :className="'col-md-12'"
                :id="'payNote'"
                :value="
                  servicesReservationAddedServiceData.servicesReservationPayData
                    .payNote
                "
                :title="$t('notes')"
                :imgName="'notes.svg'"
                v-on:changeValue="
                  servicesReservationAddedServiceData.servicesReservationPayData.payNote =
                    $event
                "
              />
            </div>
          </div>
        </b-collapse>
      </div>

      <div class="form-footer">
        <button
          name="enquiry"
          class="btn btn-submit-2"
          @click.prevent="openBottomSheet('ServicesReservationFormEnquiry')"
          :disabled="!enquiryStatus"
        >
          {{ $t("ServiceFinalPrice.enquiry") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addServicesReservationAddedService"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="{ name: 'ServicesReservationAddedServices' }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>

    <ServicesReservationFormEnquiry
      :servicesReservationData="servicesReservationAddedServiceData"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import {
  STATUS,
  TEXT_MAX_LENGTH_SUPER,
  MAX_ROWS_TEXTAREA,
} from "@/utils/constants";
import { EMPLOYEE_TYPE } from "@/utils/constantLists";
import {
  setDataMultiLang,
  checkPrivilege,
  moneyFormat,
} from "@/utils/functions";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import DatePicker from "@/components/general/DatePicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import Client from "@/models/clients/Client";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import ServicesType from "@/models/settings/settingsOther/servicesTypes/ServicesType";
import Service from "@/models/settings/settingsOther/services/Service";
import Offer from "@/models/offers/Offer";
import Treasury from "@/models/finance/treasuries/Treasury";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import UserPrivilege from "@/models/privileges/UserPrivilege";
import createToastMixin from "@/utils/create-toast-mixin";
import ServicesReservationFormEnquiry from "@/components/servicesReservations/ServicesReservationFormEnquiry.vue";

export default {
  name: "ServicesReservationAddedServiceForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    CustomSelectBox,
    CustomCheckbox,
    CustomInputFloat,
    DatePicker,
    TextArea,
    DataLabelGroup,
    ServicesReservationFormEnquiry,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      employeeTypeToken:
        this.$store.getters.userData.employeePersonalData.employeeTypeToken ||
        null,
      usersPrivilegeData:
        this.$store.getters.usersPrivilegeData || new UserPrivilege(),
      textAreaMaxLenght: TEXT_MAX_LENGTH_SUPER,
      maxRows: MAX_ROWS_TEXTAREA,
      employeeType: EMPLOYEE_TYPE,
      employeeTokenOptions: [],
      clientData: new Client(),
      theClientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      servicesTypeData: new ServicesType(),
      serviceTypeTokenOptions: [],
      serviceData: new Service(),
      serviceTokenOptions: [],
      offerCodeData: new Offer(),
      offerCodeOptions: [],
      feesTypeTokenOptions: [],
      treasuryData: new Treasury(),
      treasuryTokenOptions: [],
      methodPaidData: new MethodPaid(),
      methodPaidTokenOptions: [],
      totalPointsPaid: 0,
    };
  },
  watch: {
    "servicesReservationData.servicesReservationPayData.pointsValue": function (
      val
    ) {
      this.totalPointsPaid =
        this.servicesReservationData.servicesReservationPayData
          .onePointEqualValue * val;
    },
    "servicesReservationData.servicesReservationPayData.onePointEqualValue":
      function (val) {
        this.totalPointsPaid =
          this.servicesReservationData.servicesReservationPayData.pointsValue *
          val;
      },
  },
  props: ["servicesReservationAddedServiceData", "submitName"],
  computed: {
    enquiryStatus: function () {
      return this.servicesReservationAddedServiceData.clientToken &&
        this.servicesReservationAddedServiceData.serviceToken &&
        this.servicesReservationAddedServiceData.feesTypeToken
        ? true
        : false;
    },
  },
  methods: {
    async addServicesReservationAddedService() {
      this.$emit("addServicesReservationAddedService");
    },
    // changeReservations(data) {
    //   this.servicesReservationAddedServiceData.clientToken = data;
    //   this.getDialogOfServicesReservations();
    // },
    clientChanged(data) {
      if (data) {
        this.clientData.clientToken = data;
        this.servicesReservationAddedServiceData.clientToken = data;
        this.getClientDetails();
        this.getDialogOfServicesReservations();
      }
    },
    async getClientDetails() {
      this.isLoading = true;
      try {
        let response = await this.clientData.getClientDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.theClientData.fillData(response.data.clientData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.clientData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.clientData = null;
      }
      this.isLoading = false;
    },
    async getDialogOfClients() {
      this.isLoading = true;
      this.clientTokenOptions = [];
      this.clientTokenOptions.push({
        value: "",
        text: this.$t("selectClient"),
      });
      try {
        let response = await this.clientData.getDialogOfClients(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken =
        this.servicesReservationAddedServiceData.clientToken;
      try {
        let response =
          await this.reservationData.getDialogOfServicesReservations(
            this.language,
            this.userAuthorizeToken
          );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.reservationTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async changeServiceType(token) {
      if (this.servicesReservationAddedServiceData.serviceTypeToken != token) {
        this.servicesReservationAddedServiceData.serviceToken = "";
        this.servicesReservationAddedServiceData.servicePrice = "";
        this.servicesReservationAddedServiceData.serviceTimeWithMinutes = "";
        this.servicesReservationAddedServiceData.maxDiscountPercentage = "";
        this.servicesReservationAddedServiceData.serviceTypeToken = token;
        this.serviceData.serviceTypeToken = token;
        this.getDialogOfServices();
      }
    },
    async getDialogOfServicesTypes() {
      this.isLoading = true;
      this.serviceTypeTokenOptions = [];
      this.serviceTypeTokenOptions.push({
        value: "",
        text: this.$t("selectServiceType"),
      });
      try {
        let response = await this.servicesTypeData.getDialogOfServicesTypes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.serviceTypeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfServices() {
      this.isLoading = true;
      this.serviceTokenOptions = [];
      this.serviceTokenOptions.push({
        value: "",
        text: this.$t("selectService"),
      });
      try {
        let response = await this.serviceData.getDialogOfServices(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.serviceTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async changeService(token) {
      this.servicesReservationAddedServiceData.serviceToken = token;
      this.serviceData.serviceToken = token;
      try {
        let response = await this.serviceData.getServiceDetails(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.serviceData;
        if (response.data.status == STATUS.SUCCESS) {
          this.servicesReservationAddedServiceData.servicePrice =
            itemsData.servicePrice;
          this.servicesReservationAddedServiceData.serviceTimeWithMinutes =
            itemsData.serviceTimeWithMinutes;
          this.servicesReservationAddedServiceData.maxDiscountPercentage =
            itemsData.maxDiscountPercentage;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.servicesReservationAddedServiceData.servicePrice = "";
          this.servicesReservationAddedServiceData.serviceTimeWithMinutes = "";
          this.servicesReservationAddedServiceData.maxDiscountPercentage = "";
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesReservationAddedServiceData.servicePrice = "";
        this.servicesReservationAddedServiceData.serviceTimeWithMinutes = "";
        this.servicesReservationAddedServiceData.maxDiscountPercentage = "";
      }
    },
    async changeReservationDate(date) {
      this.servicesReservationAddedServiceData.serviceDeliveryDate = date;
      this.servicesReservationAddedServiceData.offerCode = "";
      this.getDialogOfOfferCodes();
    },
    async getDialogOfOfferCodes() {
      this.isLoading = true;
      this.offerCodeData.dateActive =
        this.servicesReservationAddedServiceData.serviceDeliveryDate;
      try {
        this.offerCodeOptions = await this.offerCodeData.getDialogOfOfferCodes(
          this.language,
          this.userAuthorizeToken
        );
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfFeesTypes() {
      this.isLoading = true;
      this.feesTypeTokenOptions = [];
      this.feesTypeTokenOptions.push({
        value: "",
        text: this.$t("selectFeesType"),
      });
      let items = this.$store.getters.userData.constantLists.listFeesType;
      for (let item in items) {
        this.feesTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.servicesReservationAddedServiceData.feesTypeToken =
        this.feesTypeTokenOptions[1].value;
      this.isLoading = false;
    },
    async getDialogOfTreasuries() {
      this.isLoading = true;
      try {
        this.treasuryTokenOptions =
          await this.treasuryData.getDialogOfTreasuries(
            this.language,
            this.userAuthorizeToken
          );
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfMethodPaid() {
      this.isLoading = true;
      this.methodPaidTokenOptions = [];
      this.methodPaidTokenOptions.push({
        value: "",
        text: this.$t("selectMethodPaid"),
      });
      try {
        let response = await this.methodPaidData.getDialogOfMethodPaid(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.methodPaidTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    checkPrivilege(privilegeStatus) {
      return checkPrivilege(privilegeStatus);
    },
    moneyFormat,
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    this.getDialogOfClients();
    if (this.servicesReservationAddedServiceData.clientToken) {
      this.clientChanged(this.servicesReservationAddedServiceData.clientToken);
    }
    this.getDialogOfServicesReservations();
    this.getDialogOfServicesTypes();
    this.getDialogOfServices();
    this.getDialogOfOfferCodes();
    this.getDialogOfFeesTypes();
    this.getDialogOfTreasuries();
    this.getDialogOfMethodPaid();
  },
};
</script>
