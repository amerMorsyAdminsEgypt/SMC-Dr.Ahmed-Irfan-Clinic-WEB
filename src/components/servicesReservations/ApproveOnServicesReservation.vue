<template>
  <b-modal
    id="ApproveOnServicesReservation"
    scrollable
    size="xl"
    centered
    hide-footer
    @show="getClientDetails()"
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/approve-reservation.svg" class="icon-lg" />
        {{ $t("approveOnServicesReservation") }}
      </h3>
    </template>
    <form autocomplete="off" method="post">
      <div class="row">
        <TextArea
          :className="'col-md-12'"
          :id="'approverNote'"
          :value="servicesReservationData.approverNote"
          :title="$t('notes')"
          :imgName="'notes.svg'"
          v-on:changeValue="servicesReservationData.approverNote = $event"
        />
      </div>
      <div>
        <b-button v-b-toggle.paymentData class="btn btn-lg btn-collapse">
          {{ $t("paymentData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="paymentData">
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
              <div class="col-md-12">
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
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="approveOnServicesReservation"
        >
          {{ $t("ok") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-cancel"
          @click.prevent="$bvModal.hide('ApproveOnServicesReservation')"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </form>

    <ServicesReservationFormEnquiry
      :servicesReservationData="servicesReservationData"
    />
  </b-modal>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { STATUS } from "@/utils/constants";
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";
import Client from "@/models/clients/Client";
import { moneyFormat, setDataMultiLang } from "@/utils/functions";
import Treasury from "@/models/finance/treasuries/Treasury";
import MethodPaid from "@/models/settings/settingsOther/methodPaids/MethodPaid";
import ServicesReservationFormEnquiry from "./ServicesReservationFormEnquiry.vue";

export default {
  name: "ApproveOnServicesReservation",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomCheckbox,
    CustomSelectBox,
    CustomInputFloat,
    DataLabelGroup,
    TextArea,
    ServicesReservationFormEnquiry,
  },
  data() {
    return {
      theClientData: new Client(),
      feesTypeTokenOptions: [],
      treasuryData: new Treasury(),
      treasuryTokenOptions: [],
      methodPaidData: new MethodPaid(),
      methodPaidTokenOptions: [],
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
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
  methods: {
    moneyFormat,
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    async getClientDetails() {
      this.isLoading = true;
      this.theClientData.clientToken = this.servicesReservationData.clientToken;
      try {
        let response = await this.theClientData.getClientDetails(
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
    async approveOnServicesReservation() {
      this.isLoading = true;
      try {
        let response =
          await this.servicesReservationData.approveOnServicesReservation(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ApproveOnServicesReservation");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
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
  },
  props: ["servicesReservationData"],
  computed: {
    enquiryStatus: function () {
      return this.servicesReservationData.feesTypeToken ? true : false;
    },
  },
  async created() {
    if (this.servicesReservationData.clientToken) {
      this.getClientDetails();
    }
    this.getDialogOfTreasuries();
    this.getDialogOfMethodPaid();
    this.getDialogOfFeesTypes();
  },
};
</script>

<style scoped lang="scss"></style>
