<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="refName"
      size="lg"
      :headerText="$t('servicesReservationData')"
      :headerIcon="icon"
      @opened="getServicesReservationDetails()"
    >
      <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

      <div class="row">
        <ServicesReservationsCardActions
          class="col-lg-4 col-md-6"
          :servicesReservationData="reservationData"
          v-on:setServicesReservationData="
            $emit('setServicesReservationData', $event)
          "
          v-on:goToReservationsFollowed="
            $emit('goToReservationsFollowed', $event)
          "
          v-on:setClientData="$emit('setClientData', $event)"
          v-on:newPayment="$emit('newPayment', $event)"
        />
      </div>

      <!-- <div class="row">
        <div class="col-lg-4 col-md-6 image-container">
          <img
            :src="`${BASE_URL}${reservationData.clientImagePath}`"
            :onerror="`this.src='${DEFAULT_IMG}'`"
            alt="Image"
            class="client-img"
          />
          <div class="actions">
            <ul>
              <li>
                <button class="btn p-0" :title="$t('infoClient')">
                  <img src="@/assets/images/info.svg" class="icon-lg" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div> -->

      <div class="row">
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.reservationCode"
          :title="$t('reservationCode')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.clientCode"
          :title="$t('clientCode')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.clientNameCurrent"
          :title="$t('clientName')"
          :imgName="'clients.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.officeNameCurrent"
          :title="$t('officeName')"
          :imgName="'office.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="`${reservationData.floorNameCurrent} - ${reservationData.chamberNameCurrent}`"
          :title="$t('chamberFloor')"
          :imgName="'floors.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="`${reservationData.branchNameCurrent} - ${reservationData.buildingNameCurrent}`"
          :title="$t('branchBuilding')"
          :imgName="'buildings.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.employeeNameCurrent"
          :title="`${reservationData.jobNameCurrent}`"
          :imgName="'employees.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="`${reservationData.serviceNameCurrent} - ${reservationData.specialSpecialtyNameCurrent}`"
          :title="$t('serviceSpecialty')"
          :imgName="'special-spcialities.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.serviceFinalPrice"
          :title="$t('serviceFinalPrice')"
          :imgName="'type.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.servicePrice"
          :title="$t('servicePrice')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.totalPaid"
          :title="$t('totalPaid')"
          :imgName="'money.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.remainingAmount"
          :title="$t('remainingAmount')"
          :imgName="'money.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.reservationDate"
          :title="$t('reservationDate')"
          :imgName="'date.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="timeToLang(reservationData.estimatedDateTimeArrival)"
          :title="$t('estimatedDateTimeArrival')"
          :imgName="'dateAndTime.svg'"
        />

        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.numberInReservationServes"
          :title="$t('numberInReservationServes')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.numberInArrive"
          :title="$t('numberInArrive')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.numberRealToEntry"
          :title="$t('numberRealToEntry')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-lg-4 col-md-6'"
          :value="reservationData.reservationCountFollowing"
          :title="$t('reservationsFollowed.count')"
          :imgName="'number.svg'"
        />
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import { timeToLang } from "@/utils/functions";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import DEFAULT_IMG from "@/assets/images/clients.svg";
import icon from "@/assets/images/services-reservations.svg";
import ServicesReservationsCardActions from "./ServicesReservationsCardActions.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationCalendarInfo",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
    ServicesReservationsCardActions,
  },
  props: {
    reservationToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      refName: "ServicesReservationCalendarInfo",
      BASE_URL,
      DEFAULT_IMG,
      icon,
      reservationData: new ServicesReservation(),
      filterServicesReservationData: new ServicesReservation(),
    };
  },
  methods: {
    async getServicesReservationDetails() {
      this.isLoading = true;
      try {
        this.filterServicesReservationData.reservationToken =
          this.reservationToken;
        this.reservationData.setInitialValue();
        this.exceptionMsg = null;

        let response =
          await this.filterServicesReservationData.getServicesReservationDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.reservationData.fillData(response.data.servicesReservationData);
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
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
  },
  async created() {
    this.getServicesReservationDetails();
  },
};
</script>
