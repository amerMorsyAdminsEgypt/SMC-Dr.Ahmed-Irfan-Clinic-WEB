<template>
  <div>
    <PreLoader v-if="isLoading" />

    <div class="row">
      <CustomSelectBox
        v-if="employeeTypeToken != EMPLOYEE_TYPE.Doctor"
        :className="'col-md-6'"
        :id="'employeeToken'"
        :value="filterServicesReservationData.employeeToken"
        :options="employeeTokenOptions"
        v-on:changeValue="
          filterServicesReservationData.employeeToken = $event;
          getAllServicesReservations();
        "
        :title="$t('selectDoctor')"
        :imgName="'doctors.svg'"
      />
      <CustomSelectBox
        :className="'col-md-6'"
        :id="'clientToken'"
        :value="filterServicesReservationData.clientToken"
        :options="clientTokenOptions"
        v-on:changeValue="
          filterServicesReservationData.clientToken = $event;
          getAllServicesReservations();
        "
        :title="$t('selectClient')"
        :imgName="'clients.svg'"
      />
    </div>

    <ServicesReservationCalendarStatistics
      :reservationsStatistics="reservationsStatistics"
    />

    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />
    <div v-else>
      <vue-cal
        :events="servicesReservationsCalendarData"
        :selected-date="today"
        :time-from="0 * 60"
        :time-to="24 * 60"
        :time-step="15"
        :hide-weekends="false"
        :events-on-month-view="false"
        :dbl-click-to-navigate="false"
        :hide-view-selector="false"
        :todayButton="true"
        :sticky-split-labels="true"
        :split-days="splitDays"
        :locale="language"
        :min-cell-width="300"
        :min-split-width="220"
        :time-cell-height="timeCellHeight"
        active-view="day"
        :disable-views="['years', 'year']"
        :on-event-click="openServicesReservationCalendarInfo"
        @view-change="viewChanged($event)"
      >
        <template v-slot:time-cell="{ hours, minutes }">
          <div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }">
            <strong v-if="!minutes" style="font-size: 16px"
              >{{ hours | addZero }}{{ hours }}</strong
            >
            <span v-else style="font-size: 14px"
              >{{ hours | addZero }}{{ hours }}:{{ minutes | addZero
              }}{{ minutes }}</span
            >
          </div>
        </template>
        <template v-slot:no-event>{{ $t("notFound") }}</template>
        <template v-slot:arrow-prev>{{ $t("paginationPrevItem") }}</template>
        <template v-slot:arrow-next>{{ $t("paginationNextItem") }}</template>
      </vue-cal>
    </div>

    <ServicesReservationCalendarInfo
      :reservationToken="reservationToken"
      v-on:setServicesReservationData="setServicesReservationData($event)"
      v-on:goToReservationsFollowed="goToReservationsFollowed($event)"
      v-on:setClientData="clientData.fillData($event)"
      v-on:newPayment="newPayment($event)"
    />

    <ClientReservationInfo :servicesReservationData="servicesReservationData" />
    <ClientInfo :clientData="clientData" />
    <ClientQRCode :clientData="servicesReservationData" />
    <ServicesReservationsNewPayment
      :servicesReservationPayData="servicesReservationPayData"
      :clientData="clientData"
      v-on:refresh="refresh"
    />
    <CancelServicesReservation
      :servicesReservationCancelData="servicesReservationCancelData"
      v-on:refresh="refresh"
    />
    <ApproveCancelServicesReservation
      :servicesReservationCancelData="servicesReservationCancelData"
      v-on:refresh="refresh"
    />
    <ApproveOnServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <AttendServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <EnterServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <WaitForComeBackServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <FinishServicesReservation
      :servicesReservationData="servicesReservationData"
      v-on:refresh="refresh"
    />
    <ServicesReservationReceipt
      :servicesReservationData="servicesReservationData"
    />
    <ServicesReservationReceipt
      :servicesReservationData="servicesReservationData"
      :withTaxStatus="true"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import ServicesReservationCalendarStatistics from "@/components/servicesReservations/ServicesReservationCalendarStatistics.vue";
import ServicesReservationCalendarInfo from "@/components/servicesReservations/ServicesReservationCalendarInfo.vue";

import ClientReservationInfo from "@/components/servicesReservations/ClientReservationInfo.vue";
import ClientInfo from "@/components/clients/ClientInfo.vue";
import ClientQRCode from "@/components/clients/ClientQRCode.vue";
import ServicesReservationsNewPayment from "@/components/servicesReservations/ServicesReservationsNewPayment.vue";
import CancelServicesReservation from "@/components/servicesReservations/CancelServicesReservation.vue";
import ApproveCancelServicesReservation from "@/components/servicesReservations/ApproveCancelServicesReservation.vue";
import ApproveOnServicesReservation from "@/components/servicesReservations/ApproveOnServicesReservation.vue";
import AttendServicesReservation from "@/components/servicesReservations/AttendServicesReservation.vue";
import EnterServicesReservation from "@/components/servicesReservations/EnterServicesReservation.vue";
import WaitForComeBackServicesReservation from "@/components/servicesReservations/WaitForComeBackServicesReservation.vue";
import FinishServicesReservation from "@/components/servicesReservations/FinishServicesReservation.vue";
import ServicesReservationReceipt from "@/components/servicesReservations/ServicesReservationReceipt.vue";

import ServicesReservationsCalendarMixin from "./ServicesReservationsCalendarMixin";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/ar.js";

export default {
  name: "ServicesReservationsCalender",
  mixins: [ServicesReservationsCalendarMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomSelectBox,
    VueCal,
    ServicesReservationCalendarStatistics,
    ServicesReservationCalendarInfo,

    ClientReservationInfo,
    ClientInfo,
    ClientQRCode,
    ServicesReservationsNewPayment,
    CancelServicesReservation,
    ApproveCancelServicesReservation,
    ApproveOnServicesReservation,
    AttendServicesReservation,
    EnterServicesReservation,
    WaitForComeBackServicesReservation,
    FinishServicesReservation,
    ServicesReservationReceipt,
  },
};
</script>
