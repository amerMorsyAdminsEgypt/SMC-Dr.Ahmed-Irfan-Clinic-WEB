<template>
  <div>
    <div
      class="row card-container"
      v-for="(servicesReservationData, index) in servicesReservationsData"
      :key="index"
    >
      <ServicesReservationsCardActions
        class="col-lg-3 col-md-6"
        :servicesReservationData="servicesReservationData"
        v-on:setServicesReservationData="
          $emit('setServicesReservationData', $event)
        "
        v-on:goToReservationsFollowed="
          $emit('goToReservationsFollowed', $event)
        "
        v-on:setClientData="$emit('setClientData', $event)"
        v-on:newPayment="$emit('newPayment', $event)"
      />

      <div class="col-lg-3 col-md-6">
        <div class="row">
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.clientNameCurrent"
            :title="$t('clientName')"
            :imgName="'clients.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.reservationCode"
            :title="$t('reservationCode')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.officeNameCurrent"
            :title="$t('officeName')"
            :imgName="'office.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="`${servicesReservationData.floorNameCurrent} - ${servicesReservationData.chamberNameCurrent}`"
            :title="$t('chamberFloor')"
            :imgName="'floors.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="`${servicesReservationData.branchNameCurrent} - ${servicesReservationData.buildingNameCurrent}`"
            :title="$t('branchBuilding')"
            :imgName="'buildings.svg'"
          />
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="row">
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.employeeNameCurrent"
            :title="`${servicesReservationData.jobNameCurrent}`"
            :imgName="'employees.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12  no-margin'"
            :value="`${servicesReservationData.serviceNameCurrent} - ${servicesReservationData.specialSpecialtyNameCurrent}`"
            :title="$t('serviceSpecialty')"
            :imgName="'special-spcialities.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.serviceFinalPrice"
            :title="$t('serviceFinalPrice')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.totalPaid"
            :title="$t('totalPaid')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12  no-margin'"
            :value="servicesReservationData.remainingAmount"
            :title="$t('remainingAmount')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.reservationTypeNameCurrnet"
            :title="$t('reservationType')"
            :imgName="'type.svg'"
          />
        </div>
      </div>
      <div class="col-lg-3 col-md-6">
        <div class="row">
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.reservationDate"
            :title="$t('reservationDate')"
            :imgName="'date.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12  no-margin'"
            :value="
              timeToLang(servicesReservationData.estimatedDateTimeArrival)
            "
            :title="$t('estimatedDateTimeArrival')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.numberInReservationServes"
            :title="$t('numberInReservationServes')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.numberInArrive"
            :title="$t('numberInArrive')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.numberRealToEntry"
            :title="$t('numberRealToEntry')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-lg-12 no-margin'"
            :value="servicesReservationData.reservationCountFollowing"
            :title="$t('reservationsFollowed.count')"
            :imgName="'number.svg'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServicesReservationsCardActions from "./ServicesReservationsCardActions.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { timeToLang } from "@/utils/functions";

export default {
  name: "ServicesReservationsCards",
  components: {
    ServicesReservationsCardActions,
    DataLabelGroup,
  },
  props: ["servicesReservationsData"],
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
  },
};
</script>
