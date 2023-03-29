<template>
  <b-modal
    id="ServicesReservationAddedServiceInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/added-services.svg" class="icon-lg" />
        {{ $t("ServicesReservationAddedServices.data") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="`${$t('reservationCode')}: ${isDataExist(
          servicesReservationAddedServiceData.mainReservationData
            .reservationCode
        )} ${$t('quma')} ${$t('onDate')}: ${isDataExist(
          servicesReservationAddedServiceData.mainReservationData
            .reservationDate
        )}`"
        :title="$t('reservation')"
        :imgName="'services-reservations.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          servicesReservationAddedServiceData.reservationAddedServicesCode
        "
        :title="$t('ServicesReservationAddedServices.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="
          servicesReservationAddedServiceData.reservationAddedServicesNameCurrent
        "
        :title="$t('ServicesReservationAddedServices.name')"
        :imgName="'added-services.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          (servicesReservationAddedServiceData.mainReservationData
            .jobNameCurrent
            ? servicesReservationAddedServiceData.mainReservationData
                .jobNameCurrent + ': '
            : '') +
          isDataExist(
            servicesReservationAddedServiceData.mainReservationData
              .employeeNameCurrent
          )
        "
        :title="$t('responsibleForProvidingTheService')"
        :imgName="'doctors.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          servicesReservationAddedServiceData.serviceProvideTypeNameCurrent
        "
        :title="$t('serviceProvideTypeName')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesReservationAddedServiceData.serviceNameCurrent"
        :title="$t('serviceName')"
        :imgName="'services.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesReservationAddedServiceData.serviceTypeNameCurrent"
        :title="$t('serviceTypeName')"
        :imgName="'services-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesReservationAddedServiceData.specialSpecialtyNameCurrent"
        :title="$t('specialSpecialtyName')"
        :imgName="'special-spcialities.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="servicesReservationAddedServiceData.generalSpecialtyNameCurrent"
        :title="$t('generalSpecialtyName')"
        :imgName="'general-specialities.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-4'"
        :value="moneyFormat(servicesReservationAddedServiceData.servicePrice)"
        :title="$t('servicePrice')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="moneyFormat(servicesReservationAddedServiceData.totalPaid)"
        :title="$t('totalPaid')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-4'"
        :value="
          moneyFormat(servicesReservationAddedServiceData.remainingAmount)
        "
        :title="$t('remainingAmount')"
        :imgName="'money.svg'"
      />

      <div v-if="servicesReservationAddedServiceData.refoundStatus" class="row">
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="moneyFormat(servicesReservationAddedServiceData.refoundValue)"
          :title="$t('refundAmount')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="servicesReservationAddedServiceData.refundPercentageFromPaid"
          :title="$t('refundPercentageFromPaid')"
          :imgName="'percentage.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-6'"
          :value="
            moneyFormat(
              servicesReservationAddedServiceData.totalPaidWithRefound
            )
          "
          :title="$t('totalPaidWithRefound')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="
            servicesReservationAddedServiceData.refoundMethodPaidNameCurrent
          "
          :title="$t('refoundMethodPaidName')"
          :imgName="'payment-method.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-6'"
          :value="
            servicesReservationAddedServiceData.refoundEmployeeNameCurrent
          "
          :title="$t('refoundEmployeeName')"
          :imgName="'employees.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="
            formateDateTimeLang(
              servicesReservationAddedServiceData.refoundDate,
              servicesReservationAddedServiceData.refoundTime
            )
          "
          :title="$t('dateAndTimeRefound')"
          :imgName="'dateAndTime.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-6'"
          :value="
            servicesReservationAddedServiceData.refoundTreasuryNameCurrent
          "
          :title="$t('refoundTreasuryName')"
          :imgName="'treasuries.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="servicesReservationAddedServiceData.refoundReasonAr"
          :title="$t('cancelReasonAr')"
          :imgName="'reason.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="servicesReservationAddedServiceData.refoundReasonEn"
          :title="$t('cancelReasonEn')"
          :imgName="'reason.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-6'"
          :value="servicesReservationAddedServiceData.refoundReasonUnd"
          :title="$t('cancelReasonUnd')"
          :imgName="'reason.svg'"
        />
      </div>
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import {
  setDataMultiLang,
  timeToLang,
  formateDateTimeLang,
  isDataExist,
  moneyFormat,
} from "@/utils/functions";

export default {
  name: "ServicesReservationAddedServiceInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["servicesReservationAddedServiceData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
    moneyFormat(money) {
      return moneyFormat(money);
    },
  },
};
</script>

<style scoped lang="scss"></style>
