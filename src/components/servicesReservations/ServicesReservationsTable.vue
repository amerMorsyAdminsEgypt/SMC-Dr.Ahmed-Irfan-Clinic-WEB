<template>
  <div v-if="servicesReservationsData" class="">
    <div
      v-for="(servicesReservation, index) in servicesReservationsData"
      :key="index"
    >
      <b-button v-b-toggle="`item${index}`" class="btn btn-lg btn-collapse">
        {{
          `(${servicesReservation.numberRealToEntry}) ${servicesReservation.clientNameCurrent}`
        }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse :id="`item${index}`">
        <div class="my-card row">
          <div class="row mb-3">
            <router-link
              :to="`/services-payments/${servicesReservation.clientToken}/${servicesReservation.reservationToken}`"
              :title="$t('servicesPayments')"
            >
              <img
                src="@/assets/images/services-payments.svg"
                class="icon-lg"
              />
            </router-link>
            <router-link
              :to="`/treatments-reservation/${servicesReservation.clientToken}/${servicesReservation.reservationToken}`"
              :title="$t('treatmentsReservation')"
            >
              <img
                src="@/assets/images/treatments-reservation.svg"
                class="icon-lg"
              />
            </router-link>

            <button
              v-if="servicesReservation.remainingAmount != 0"
              v-b-modal.ServicesReservationsNewPayment
              class="btn p-0"
              :title="$t('newPayment')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img src="@/assets/images/pay.svg" class="icon-lg" />
            </button>

            <button
              v-if="
                servicesReservation.reservationStatusToken ==
                  reservationStatus.pending ||
                servicesReservation.reservationStatusToken ==
                  reservationStatus.current ||
                servicesReservation.reservationStatusToken ==
                  reservationStatus.attended ||
                servicesReservation.reservationStatusToken ==
                  reservationStatus.entered ||
                servicesReservation.reservationStatusToken ==
                  reservationStatus.waitingReEntry
              "
              v-b-modal.CancelServicesReservation
              class="btn p-0"
              :title="$t('cancelServicesReservation')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img
                src="@/assets/images/cancel-reservation.svg"
                class="icon-lg"
              />
            </button>
            <button
              v-if="
                servicesReservation.reservationStatusToken ==
                reservationStatus.waitingApprovalCancel
              "
              v-b-modal.ApproveCancelServicesReservation
              class="btn p-0"
              :title="$t('approveCancelServicesReservation')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img
                src="@/assets/images/approve-cancel-reservation.svg"
                class="icon-lg"
              />
            </button>
            <button
              v-if="
                servicesReservation.reservationStatusToken ==
                reservationStatus.pending
              "
              v-b-modal.ApproveOnServicesReservation
              class="btn p-0"
              :title="$t('approveOnServicesReservation')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img
                src="@/assets/images/approve-reservation.svg"
                class="icon-lg"
              />
            </button>

            <button
              v-if="
                servicesReservation.reservationStatusToken ==
                reservationStatus.current
              "
              v-b-modal.AttendServicesReservation
              class="btn p-0"
              :title="$t('attendServicesReservation')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img
                src="@/assets/images/attend-reservation.svg"
                class="icon-lg"
              />
            </button>

            <button
              v-if="
                servicesReservation.reservationStatusToken ==
                  reservationStatus.attended ||
                servicesReservation.reservationStatusToken ==
                  reservationStatus.waitingReEntry
              "
              v-b-modal.EnterServicesReservation
              class="btn p-0"
              :title="$t('enterServicesReservation')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img
                src="@/assets/images/enter-reservation.svg"
                class="icon-lg"
              />
            </button>

            <button
              v-if="
                servicesReservation.reservationStatusToken ==
                reservationStatus.entered
              "
              v-b-modal.WaitForComeBackServicesReservation
              class="btn p-0"
              :title="$t('waitForComeBackServicesReservation')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img src="@/assets/images/waiting-back.svg" class="icon-lg" />
            </button>
            <button
              v-if="
                servicesReservation.reservationStatusToken ==
                reservationStatus.entered
              "
              v-b-modal.FinishServicesReservation
              class="btn p-0"
              :title="$t('finishServicesReservation')"
              @click="setServicesReservationData(servicesReservation)"
            >
              <img
                src="@/assets/images/finish-reservation.svg"
                class="icon-lg"
              />
            </button>
          </div>

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.reservationCode"
            :title="$t('reservationCode')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.clientNameCurrent"
            :title="$t('clientName')"
            :imgName="'clients.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.reservationStatusNameCurrent"
            :title="$t('reservationStatus')"
            :imgName="'type.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.employeeNameCurrent"
            :title="$t('responsibleForProvidingTheService')"
            :imgName="'employees.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="timeToLang(servicesReservation.estimatedDateTimeEnter)"
            :title="$t('estimatedDateTimeEnter')"
            :imgName="'dateAndTime.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.serviceTypeNameCurrent"
            :title="$t('serviceTypeName')"
            :imgName="'services-types.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.serviceNameCurrent"
            :title="$t('serviceName')"
            :imgName="'services.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.servicePrice + $t('EGP')"
            :title="$t('servicePrice')"
            :imgName="'money.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.serviceTimeWithMinutes"
            :title="$t('serviceTimeWithMinutes')"
            :imgName="'minutes.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.maxDiscountPercentage"
            :title="$t('maxDiscountPercentage')"
            :imgName="'percentage.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="
              servicesReservation.offerStatus === true ? $t('yes') : $t('no')
            "
            :title="$t('offerStatus')"
            :imgName="'offers.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.servicePriceInOffer + $t('EGP')"
            :title="$t('servicePriceInOffer')"
            :imgName="'money.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.feesTypeNameCurrent"
            :title="$t('feesTypeStatus')"
            :imgName="'type.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.feesTypeValue + $t('EGP')"
            :title="$t('feesValue')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.servesActualPrice + $t('EGP')"
            :title="$t('reservationPrice')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.totalPaid + $t('EGP')"
            :title="$t('paidAmount')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.remainingAmount + $t('EGP')"
            :title="$t('remainingAmount')"
            :imgName="'money.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.generalSpecialtyNameCurrent"
            :title="$t('generalSpecialtyName')"
            :imgName="'general-specialities.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.specialSpecialtyNameCurrent"
            :title="$t('specialSpecialtyName')"
            :imgName="'special-spcialities.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="timeToLang(servicesReservation.timeNameCurrent)"
            :title="$t('officeTime')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.officeNameCurrent"
            :title="$t('officeName')"
            :imgName="'office.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.chamberNameCurrent"
            :title="$t('chamberName')"
            :imgName="'chambers.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.floorNameCurrent"
            :title="$t('floorName')"
            :imgName="'floors.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.buildingNameCurrent"
            :title="$t('buildingName')"
            :imgName="'buildings.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-4'"
            :value="servicesReservation.branchNameCurrent"
            :title="$t('branchName')"
            :imgName="'branches.svg'"
          />
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";
import { RESERVATION_STATUS } from "@/utils/constantLists";

export default {
  name: "ServicesReservationsTable",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      reservationStatus: RESERVATION_STATUS,
    };
  },
  props: ["servicesReservationsData", "servicesReservationData"],
  methods: {
    setServicesReservationData(servicesReservationData) {
      this.$emit("setServicesReservationData", servicesReservationData);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
