<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="refName"
      size="lg"
      :headerText="$t('servicesReservationData')"
      :headerIcon="icon"
      @opened="getServiceFinalPrice()"
    >
      <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

      <div class="row">
        <DataLabelGroup
          :className="'col-md-4'"
          :value="moneyFormat(serviceFinalPrice.servecePrice)"
          :title="$t('servicePrice')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-md-4'"
          :value="moneyFormat(serviceFinalPrice.servecePriceInOffer)"
          :title="$t('servicePriceInOffer')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-md-4'"
          :value="moneyFormat(serviceFinalPrice.feesValue)"
          :title="$t('feesValue')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="serviceFinalPrice.serviceTaxValue"
          :title="$t('taxePercentage')"
          :imgName="'percentage.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="moneyFormat(serviceFinalPrice.taxesValue)"
          :title="$t('taxeValue')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="serviceFinalPrice.clientInsuranceLevelDiscountPercentage"
          :title="$t('medicalInsuranceLevels.clientDiscountPercentage')"
          :imgName="'percentage.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            moneyFormat(serviceFinalPrice.clientInsuranceLevelDiscountValue)
          "
          :title="$t('medicalInsuranceLevels.clientDiscountValue')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-md-12'"
          :value="moneyFormat(serviceFinalPrice.serviceFinalPrice)"
          :title="$t('serviceFinalPrice')"
          :imgName="'money.svg'"
        />
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import { moneyFormat } from "@/utils/functions";
import ServiceFinalPrice from "@/models/servicesReservations/ServiceFinalPrice";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import icon from "@/assets/images/services-reservations.svg";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationFormEnquiry",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: { servicesReservationData: { type: Object } },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      refName: "ServicesReservationFormEnquiry",
      icon,
      serviceFinalPrice: new ServiceFinalPrice(),
    };
  },
  methods: {
    async getServiceFinalPrice() {
      this.isLoading = true;
      try {
        this.serviceFinalPrice.fillData(this.servicesReservationData);
        this.exceptionMsg = null;

        let response = await this.serviceFinalPrice.getServiceFinalPrice(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.serviceFinalPrice.fillData(
            response.data.calculateServicePriceData
          );
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
    moneyFormat,
  },
  async created() {
    this.getServiceFinalPrice();
  },
};
</script>
