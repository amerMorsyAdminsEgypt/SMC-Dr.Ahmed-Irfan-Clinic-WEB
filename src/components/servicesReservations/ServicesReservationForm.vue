<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      v-else
      autocomplete="off"
      method="post"
      @submit.prevent="addRequestServicesReservation"
    >
      <div class="my-card">
        <div class="row">
          <div
            :class="
              specialSpecialtyTokenOptions.length > 1
                ? 'col-md-6 col-lg-3'
                : 'col-md-12 col-lg-6'
            "
            class="client-add"
          >
            <CustomSelectBox
              :className="'col-md-11'"
              :id="'clientToken'"
              :value="servicesReservationData.clientToken"
              :options="clientTokenOptions"
              v-on:changeValue="clientChanged($event)"
              :title="$t('selectClient')"
              :imgName="'clients.svg'"
              :isSync="true"
              v-on:synchronization="getDialogOfClientsWithImage()"
              :imgStatus="true"
            />
            <button
              v-b-modal.ServicesReservationAddClient
              class="btn p-0"
              @click.prevent
              :title="$t('addClient')"
            >
              <img src="@/assets/images/plus.svg" class="icon-lg" />
            </button>
          </div>

          <CustomSelectBox
            :className="'col-md-6 col-lg-3'"
            :id="'branchToken'"
            :value="servicesReservationData.branchToken"
            :options="branchTokenOptions"
            v-on:changeValue="
              servicesReservationData.branchToken = $event;
              filterOfficesTimes();
            "
            :title="$t('selectBranch')"
            :imgName="'branches.svg'"
          />

          <DatePicker
            :className="'col-md-6 col-lg-3'"
            :id="'reservationDate'"
            :value="servicesReservationData.reservationDate"
            v-on:changeValue="changeReservationDate($event)"
            :title="$t('reservationDate')"
            :language="language"
          />

          <CustomSelectBox
            v-if="specialSpecialtyTokenOptions.length > 1"
            :className="'col-md-6 col-lg-3'"
            :id="'specialSpecialtyToken'"
            :value="servicesReservationData.specialSpecialtyToken"
            :options="specialSpecialtyTokenOptions"
            v-on:changeValue="
              servicesReservationData.specialSpecialtyToken = $event;
              changeSpecialSpecialty();
            "
            :title="$t('selectSpecialSpecialty')"
            :imgName="'special-spcialities.svg'"
          />

          <CustomSelectBox
            :className="'col-md-12'"
            :id="'serviceToken'"
            :value="servicesReservationData.serviceToken"
            :options="serviceTokenOptions"
            v-on:changeValue="
              servicesReservationData.serviceToken = $event;
              changeServiceType();
            "
            :title="$t('selectService')"
            :imgName="'services.svg'"
            :isSync="true"
            v-on:synchronization="getDialogOfServicesWithImage()"
            :imgStatus="true"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'reservationTypeToken'"
            :value="servicesReservationData.reservationTypeToken"
            :options="reservationTypeTokenOptions"
            v-on:changeValue="reservationTypeChanged($event)"
            :title="$t('selectReservationType')"
            :imgName="'type.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="'offerCode'"
            :value="servicesReservationData.offerCode"
            :options="offerCodeOptions"
            v-on:changeValue="servicesReservationData.offerCode = $event"
            :title="$t('selectOffer')"
            :imgName="'offers.svg'"
          />

          <CustomSelectBox
            v-if="
              servicesReservationData.reservationTypeToken ==
              reservationTypes.followingReservation
            "
            :className="'col-md-12'"
            :id="'followToreseRvationToken'"
            :value="servicesReservationData.followToreseRvationToken"
            :options="reservationTokenOptions"
            v-on:changeValue="
              servicesReservationData.followToreseRvationToken = $event
            "
            :title="$t('selectReservation')"
            :imgName="'services-reservations.svg'"
          />

          <CustomCheckbox
            :className="'col-12'"
            :value="
              servicesReservationData.addInsuranceCompanyDiscountPercentageStatus
            "
            :title="$t('addInsuranceCompanyDiscountPercentageStatus')"
            v-on:changeValue="
              servicesReservationData.addInsuranceCompanyDiscountPercentageStatus =
                $event
            "
          />
        </div>
      </div>

      <b-button v-b-toggle.reservationTimes class="btn btn-lg btn-collapse">
        {{ $t("reservationTimes") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse id="reservationTimes">
        <div class="my-card">
          <CustomRadio
            :className="'col-md-12'"
            :id="'officeTimeToken'"
            :value="servicesReservationData.officeTimeToken"
            :title="$t('selectReservationTime')"
            :options="officeTimeTokenOptions"
            v-on:changeValue="servicesReservationData.officeTimeToken = $event"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'reservationRequestNotes'"
            :value="servicesReservationData.reservationRequestNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              servicesReservationData.reservationRequestNotes = $event
            "
          />
        </div>
      </b-collapse>

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
                :className="'col-md-4'"
                :id="'treasuryToken'"
                :value="
                  servicesReservationData.servicesReservationPayData
                    .treasuryToken
                "
                :options="treasuryTokenOptions"
                v-on:changeValue="
                  servicesReservationData.servicesReservationPayData.treasuryToken =
                    $event
                "
                :title="$t('selectTreasury')"
                :imgName="'treasuries.svg'"
              />
              <CustomSelectBox
                :className="'col-md-4'"
                :id="'methodPaidToken'"
                :value="
                  servicesReservationData.servicesReservationPayData
                    .methodPaidToken
                "
                :options="methodPaidTokenOptions"
                v-on:changeValue="
                  servicesReservationData.servicesReservationPayData.methodPaidToken =
                    $event
                "
                :title="$t('selectMethodPaid')"
                :imgName="'payment-method.svg'"
              />
              <CustomInputFloat
                :className="'col-md-4'"
                :id="'methodPaidValue'"
                :value="
                  servicesReservationData.servicesReservationPayData
                    .methodPaidValue
                "
                :title="$t('paidMoney')"
                :imgName="'money.svg'"
                v-on:changeValue="
                  servicesReservationData.servicesReservationPayData.methodPaidValue =
                    $event
                "
              />
              <hr class="form-divider" />

              <CustomSelectBox
                :className="'col-md-6'"
                :id="'feesTypeToken'"
                :value="servicesReservationData.feesTypeToken"
                :options="feesTypeTokenOptions"
                v-on:changeValue="
                  servicesReservationData.feesTypeToken = $event
                "
                :title="$t('selectFeesType')"
                :imgName="'type.svg'"
              />
              <CustomInputFloat
                :className="'col-md-6'"
                :id="'feesTypeValue'"
                :value="servicesReservationData.feesTypeValue"
                :title="$t('feesValue')"
                :imgName="'money.svg'"
                v-on:changeValue="
                  servicesReservationData.feesTypeValue = $event
                "
              />
              <!-- Taxes -->
              <div class="col-12">
                <div class="row">
                  <CustomCheckbox
                    :className="'col-md-2'"
                    :value="servicesReservationData.calculateTaxesStatus"
                    :title="$t('calculateTaxesStatus')"
                    v-on:changeValue="
                      servicesReservationData.calculateTaxesStatus = $event
                    "
                  />
                  <div class="col-md-10">
                    <template
                      v-if="servicesReservationData.calculateTaxesStatus"
                    >
                      <div class="row">
                        <CustomInputFloat
                          :className="'col-md-4'"
                          :id="'serviceTaxValue'"
                          :value="servicesReservationData.serviceTaxValue"
                          v-on:changeValue="
                            servicesReservationData.serviceTaxValue = $event
                          "
                          :title="$t('value')"
                          :imgName="'percentage.svg'"
                        />
                        <CustomCheckbox
                          :className="'col-md-4'"
                          :value="
                            servicesReservationData.addTaxForOnlyServicePriceStatus
                          "
                          v-on:changeValue="
                            servicesReservationData.addTaxForOnlyServicePriceStatus =
                              $event
                          "
                          :title="$t('addTaxForOnlyService')"
                        />
                        <CustomCheckbox
                          :className="'col-md-4'"
                          :value="
                            !servicesReservationData.addTaxForOnlyServicePriceStatus
                          "
                          v-on:changeValue="
                            servicesReservationData.addTaxForOnlyServicePriceStatus =
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
                :className="'col-md-3'"
                :value="theClientData.clientTotalTransactionPoints"
                :title="$t('pointsAndWallets.points.balance')"
                :imgName="'points.svg'"
              />
              <CustomInputFloat
                :className="'col-md-3'"
                :id="'pointsValue'"
                :value="
                  servicesReservationData.servicesReservationPayData.pointsValue
                "
                :title="$t('pointsAndWallets.points.number')"
                :imgName="'number.svg'"
                v-on:changeValue="
                  servicesReservationData.servicesReservationPayData.pointsValue =
                    $event
                "
              />
              <CustomInputFloat
                :className="'col-md-3'"
                :id="'onePointEqualValue'"
                :value="
                  servicesReservationData.servicesReservationPayData
                    .onePointEqualValue
                "
                :title="$t('pointsAndWallets.points.paid')"
                :imgName="'points.svg'"
                v-on:changeValue="
                  servicesReservationData.servicesReservationPayData.onePointEqualValue =
                    $event
                "
              />
              <DataLabelGroup
                :className="'col-md-3'"
                v-model="totalPointsPaid"
                :title="$t('pointsAndWallets.points.totalPaid')"
                :imgName="'money.svg'"
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
                  servicesReservationData.servicesReservationPayData.walletValue
                "
                :title="$t('pointsAndWallets.wallets.paidMoney')"
                :imgName="'wallet.svg'"
                v-on:changeValue="
                  servicesReservationData.servicesReservationPayData.walletValue =
                    $event
                "
              />

              <TextArea
                :className="'col-md-12'"
                :id="'payNote'"
                :value="
                  servicesReservationData.servicesReservationPayData.payNote
                "
                :title="$t('notes')"
                :imgName="'notes.svg'"
                v-on:changeValue="
                  servicesReservationData.servicesReservationPayData.payNote =
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
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/services-reservations" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>

    <ServicesReservationAddClient
      v-on:clientAdded="getDialogOfClientsWithImage()"
    />
    <ServicesReservationFormEnquiry
      :servicesReservationData="servicesReservationData"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
// import axios from "axios";
import DatePicker from "@/components/general/DatePicker.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import CustomRadio from "@/components/general/CustomRadio.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import { RESERVATION_TYPES } from "@/utils/constantLists";
import {
  setDataMultiLang,
  checkPrivilege,
  getDayTokenOfDate,
  moneyFormat,
  getObjectOfDateTime,
} from "@/utils/functions";
import axios from "axios";
import Branch from "@/models/branches/Branch";
import Client from "@/models/clients/Client";
// import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import SpecialSpecialty from "@/models/settings/settingsOther/specialSpecialties/SpecialSpecialty";
import ServicesType from "@/models/settings/settingsOther/servicesTypes/ServicesType";
import Service from "@/models/settings/settingsOther/services/Service";
import Offer from "@/models/offers/Offer";
import Treasury from "@/models/finance/treasuries/Treasury";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import OfficeTime from "@/models/settings/settingsBranch/officesTimes/OfficeTime";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import UserPrivilege from "@/models/privileges/UserPrivilege";
import createToastMixin from "@/utils/create-toast-mixin";
import ServicesReservationAddClient from "./ServicesReservationAddClient.vue";
import ServicesReservationFormEnquiry from "./ServicesReservationFormEnquiry.vue";

export default {
  name: "ServicesReservationForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    DatePicker,
    CustomCheckbox,
    CustomInputFloat,
    CustomRadio,
    CustomSelectBox,
    ServicesReservationAddClient,
    ServicesReservationFormEnquiry,
    TextArea,
    DataLabelGroup,
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
      usersPrivilegeData:
        this.$store.getters.usersPrivilegeData || new UserPrivilege(),
      clientData: new Client(),
      theClientData: new Client(),
      clientTokenOptions: [],
      // generalSpecialtyData: new GeneralSpecialty(),
      // generalSpecialtyTokenOptions: [],
      specialSpecialtyData: new SpecialSpecialty(),
      specialSpecialtyTokenOptions: [],
      servicesTypeData: new ServicesType(),
      serviceTypeTokenOptions: [],
      serviceData: new Service(),
      serviceTokenOptions: [],
      branchData: new Branch(),
      branchTokenOptions: [],
      officeTimeData: new OfficeTime(),
      officeTimeTokenOptions: [],
      offerCodeData: new Offer(),
      offerCodeOptions: [],
      feesTypeTokenOptions: [],
      treasuryData: new Treasury(),
      treasuryTokenOptions: [],
      methodPaidData: new MethodPaid(),
      methodPaidTokenOptions: [],
      dayTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      reservationTypeTokenOptions: [],
      reservationTypes: RESERVATION_TYPES,
      totalPointsPaid: 0,
    };
  },
  props: ["servicesReservationData", "submitName"],
  computed: {
    enquiryStatus: function () {
      return this.servicesReservationData.clientToken &&
        this.servicesReservationData.serviceToken &&
        this.servicesReservationData.feesTypeToken
        ? true
        : false;
    },
  },
  methods: {
    async addRequestServicesReservation() {
      this.$emit("addRequestServicesReservation");
    },
    // async changeGeneralSpecialty() {
    //   this.servicesReservationData.specialSpecialtyToken = "";
    //   this.servicesReservationData.serviceToken = "";
    //   this.servicesReservationData.servicePrice = "";
    //   this.servicesReservationData.serviceTimeWithMinutes = "";
    //   this.servicesReservationData.maxDiscountPercentage = "";
    //   this.getDialogOfSpecialSpecialties();
    //   this.getDialogOfServicesWithImage();
    //   this.getDialogOfOfficesTimes();
    // },
    async changeSpecialSpecialty() {
      this.servicesReservationData.serviceToken = "";
      this.servicesReservationData.servicePrice = "";
      this.servicesReservationData.serviceTimeWithMinutes = "";
      this.servicesReservationData.maxDiscountPercentage = "";
      this.getDialogOfServicesWithImage();
      // this.getDialogOfOfficesTimes();
    },
    async changeServiceType() {
      this.getDialogOfOfficesTimes();
    },
    async filterOfficesTimes() {
      this.servicesReservationData.officeTimeToken = "";
      this.getDialogOfOfficesTimes();
    },
    async changeReservationDate(date) {
      this.servicesReservationData.reservationDate = date;
      this.servicesReservationData.dayToken = getDayTokenOfDate(date);
      this.filterOfficesTimes();
      this.servicesReservationData.offerCode = "";
      this.getDialogOfOfferCodes();
    },
    // async getDialogOfGeneralSpecialties() {
    //   this.isLoading = true;
    //   this.generalSpecialtyTokenOptions = [];
    //   this.generalSpecialtyTokenOptions.push({
    //     value: "",
    //     text: this.$t("selectGeneralSpecialty"),
    //   });
    //   try {
    //     let response =
    //       await this.generalSpecialtyData.getDialogOfGeneralSpecialties(
    //         this.language,
    //         this.userAuthorizeToken
    //       );
    //     const itemsData = response.data.itemsData;
    //     if (response.data.status == STATUS.SUCCESS) {
    //       for (let item in itemsData) {
    //         this.generalSpecialtyTokenOptions.push({
    //           value: itemsData[item]["itemToken"],
    //           text: itemsData[item]["itemName"],
    //         });
    //       }
    //     } else if (response.data.status == STATUS.INVALID_TOKEN) {
    //       this.$store.dispatch("updateUserData", null);
    //       this.$router.push("/").catch(() => {});
    //     }
    //     this.isLoading = false;
    //   } catch (error) {
    //     this.showMsg(this.$t("errorCatch"));
    //   }
    //   this.isLoading = false;
    // },
    async getDialogOfSpecialSpecialties() {
      this.isLoading = true;
      this.specialSpecialtyTokenOptions = [];
      try {
        let response = await axios.get(
          `/SpecialSpecialties/GetDialogOfSpecialSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&filterStatus=true&generalSpecialtyToken=${this.servicesReservationData.generalSpecialtyToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.specialSpecialtyTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      if (this.specialSpecialtyTokenOptions.length == 1) {
        this.servicesReservationData.specialSpecialtyToken =
          this.specialSpecialtyTokenOptions[0].value;
        this.changeSpecialSpecialty();
      }
      this.isLoading = false;
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
    async getDialogOfServicesWithImage() {
      this.isLoading = true;
      this.serviceData.specialSpecialtyToken =
        this.servicesReservationData.specialSpecialtyToken || IMPOSSIBLE_TOKEN;

      try {
        this.serviceTokenOptions =
          await this.serviceData.getDialogOfServicesWithImage(
            this.language,
            this.userAuthorizeToken
          );
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getDialogOfOfficesTimes() {
      this.isLoading = true;
      this.officeTimeData.dayToken = this.servicesReservationData.dayToken;
      this.officeTimeData.branchToken =
        this.servicesReservationData.branchToken;
      this.officeTimeData.generalSpecialtyToken =
        this.servicesReservationData.generalSpecialtyToken;
      this.officeTimeData.specialSpecialtyToken =
        this.servicesReservationData.specialSpecialtyToken;
      this.officeTimeData.serviceToken =
        this.servicesReservationData.serviceToken;
      this.officeTimeTokenOptions = [];
      try {
        let response = await this.officeTimeData.getDialogOfOfficesTimes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.officeTimeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.officeTimeTokenOptions.push({
            value: "",
            text: response.data.msg,
          });
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.officeTimeTokenOptions.push({
          value: "",
          text: this.$t("notFound"),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfDays() {
      this.isLoading = true;
      this.dayTokenOptions = [];
      this.dayTokenOptions.push({
        value: "",
        text: this.$t("selectDay"),
      });
      let days = this.$store.getters.userData.constantLists.listDaysOfWeekData;
      for (let item in days) {
        this.dayTokenOptions.push({
          value: days[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            days[item]["itemNameAr"],
            days[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfBranches() {
      this.isLoading = true;
      this.branchTokenOptions = [];
      this.branchTokenOptions.push({
        value: "",
        text: this.$t("selectBranch"),
      });
      try {
        let response = await this.branchData.getDialogOfBranches(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.branchTokenOptions.push({
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
    async getDialogOfClientsWithImage() {
      this.isLoading = true;
      try {
        this.clientTokenOptions =
          await this.clientData.getDialogOfClientsWithImage(
            this.language,
            this.userAuthorizeToken
          );
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
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
          this.theClientData.fillData(null);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.clientData = null;
      }
      this.isLoading = false;
    },
    async getDialogOfOffersCodes() {
      this.isLoading = true;
      this.offerCodeOptions = [];
      this.offerCodeOptions.push({
        value: "",
        text: this.$t("selectOfferCode"),
      });
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
      this.servicesReservationData.feesTypeToken =
        this.feesTypeTokenOptions[1].value;
      this.isLoading = false;
    },
    async getDialogOfOfferCodes() {
      this.isLoading = true;
      this.offerCodeData.dateActive =
        this.servicesReservationData.reservationDate;
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
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken =
        this.servicesReservationData.clientToken;
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
    async getDialogOfServicesReservationTypes() {
      this.isLoading = true;
      this.reservationTypeTokenOptions = [];
      this.reservationTypeTokenOptions.push({
        value: "",
        text: this.$t("selectReservationType"),
      });
      let items =
        this.$store.getters.userData.constantLists.listServicesReservationType;
      for (let item in items) {
        this.reservationTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    reservationTypeChanged(data) {
      this.servicesReservationData.reservationTypeToken = data;
      this.servicesReservationData.followToreseRvationToken = "";
      if (
        this.servicesReservationData.reservationTypeToken ==
        RESERVATION_TYPES.followingReservation
      )
        this.getDialogOfServicesReservations();
    },
    clientChanged(data) {
      this.clientData.clientToken = data;
      this.servicesReservationData.clientToken = data;
      this.servicesReservationData.followToreseRvationToken = "";
      this.getClientDetails();
      if (
        this.servicesReservationData.reservationTypeToken ==
        RESERVATION_TYPES.followingReservation
      )
        this.getDialogOfServicesReservations();
    },
    checkPrivilege(privilegeStatus) {
      return checkPrivilege(privilegeStatus);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    moneyFormat(money) {
      return moneyFormat(money);
    },
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
  async created() {
    this.changeReservationDate(getObjectOfDateTime().date);
    this.reservationData.reservationTypeToken =
      RESERVATION_TYPES.mainReservation;
    // this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties();
    this.getDialogOfServicesTypes();
    this.getDialogOfServicesWithImage();
    this.getDialogOfOfficesTimes();
    this.getDialogOfDays();
    this.getDialogOfBranches();
    this.getDialogOfClientsWithImage();
    this.getDialogOfOffersCodes();
    this.getDialogOfFeesTypes();
    this.getDialogOfOfferCodes();
    this.getDialogOfTreasuries();
    this.getDialogOfMethodPaid();
    this.getDialogOfServicesReservationTypes();
    this.getDialogOfServicesReservations();
  },
};
</script>
