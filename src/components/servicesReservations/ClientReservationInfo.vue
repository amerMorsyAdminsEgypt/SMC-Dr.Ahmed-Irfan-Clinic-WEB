<template>
  <b-modal id="ClientReservationInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/clients.svg" class="icon-lg" />
        {{ $t("servicesReservationData") }}
      </h3>
    </template>
    <div class="">
      <div
        v-if="
          servicesReservationRequestData &&
          servicesReservationRequestData.requestToken
        "
      >
        <b-button
          v-b-toggle.servicesReservationRequestData
          class="btn btn-lg btn-collapse"
        >
          {{ $t("servicesReservationRequestData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationRequestData">
          <div class="my-card">
            <span class="my-card-title">{{
              $t("servicesReservationRequestData")
            }}</span>

            <div class="row">
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  servicesReservationRequestData.requestProcessTypeNameCurrent
                "
                :title="$t('requestProcessType')"
                :imgName="'type.svg'"
              />
              <DataLabelGroup
                v-if="servicesReservationRequestData.requestEmployeeToken"
                :className="'col-lg-6'"
                :value="
                  servicesReservationRequestData.requestEmployeeNameCurrent
                "
                :title="$t('userMakeAction')"
                :imgName="'employees.svg'"
              />
              <DataLabelGroup
                v-else-if="servicesReservationRequestData.requestClientToken"
                :className="'col-lg-6'"
                :value="servicesReservationRequestData.requestClientNameCurrent"
                :title="$t('userMakeAction')"
                :imgName="'clients.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  formateDateTimeLang(
                    servicesReservationRequestData.requestDate,
                    servicesReservationRequestData.requestTime
                  )
                "
                :title="$t('operationDateTime')"
                :imgName="'dateAndTime.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="servicesReservationRequestData.requestNote"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </b-collapse>
      </div>

      <div
        v-if="
          servicesReservationApproverData &&
          servicesReservationApproverData.reservationToken
        "
      >
        <b-button
          v-b-toggle.servicesReservationApproverData
          class="btn btn-lg btn-collapse"
        >
          {{ $t("servicesReservationApproverData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationApproverData">
          <div class="my-card">
            <span class="my-card-title">{{
              $t("servicesReservationApproverData")
            }}</span>

            <div class="row">
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  servicesReservationApproverData.approverEmployeeNameCurrent
                "
                :title="$t('userMakeAction')"
                :imgName="'employees.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  formateDateTimeLang(
                    servicesReservationApproverData.approverDate,
                    servicesReservationApproverData.approverTime
                  )
                "
                :title="$t('operationDateTime')"
                :imgName="'dateAndTime.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-12'"
                :value="servicesReservationApproverData.approverNote"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </b-collapse>
      </div>

      <div
        v-if="
          servicesReservationAttendanceData &&
          servicesReservationAttendanceData.attendanceToken
        "
      >
        <b-button
          v-b-toggle.servicesReservationAttendanceData
          class="btn btn-lg btn-collapse"
        >
          {{ $t("dataOfAttendance") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationAttendanceData">
          <div class="my-card">
            <span class="my-card-title">{{ $t("dataOfAttendance") }}</span>

            <div class="row">
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  servicesReservationAttendanceData.attendanceEmployeeNameCurrent
                "
                :title="$t('userMakeAction')"
                :imgName="'employees.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  formateDateTimeLang(
                    servicesReservationAttendanceData.attendanceDate,
                    servicesReservationAttendanceData.attendanceTime
                  )
                "
                :title="$t('operationDateTime')"
                :imgName="'dateAndTime.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-12'"
                :value="servicesReservationAttendanceData.attendanceNote"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </b-collapse>
      </div>

      <div v-if="servicesReservationEntreeData">
        <b-button
          v-b-toggle.servicesReservationEntreeDataCollapse
          class="btn btn-lg btn-collapse"
        >
          {{ $t("servicesReservationEntreeData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationEntreeDataCollapse">
          <div class="my-card">
            <span class="my-card-title">{{
              $t("servicesReservationEntreeData")
            }}</span>

            <div
              class="my-card"
              v-for="(
                servicesReservationEntree, index
              ) in servicesReservationEntreeData"
              :key="index"
            >
              <span class="my-card-title">{{ ++index }}</span>

              <div class="row">
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationEntree.entreeEmployeeNameCurrent"
                  :title="$t('userMakeAction')"
                  :imgName="'employees.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="
                    formateDateTimeLang(
                      servicesReservationEntree.entreeDate,
                      servicesReservationEntree.entreeTime
                    )
                  "
                  :title="$t('operationDateTime')"
                  :imgName="'dateAndTime.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-12'"
                  :value="servicesReservationEntree.entreeNote"
                  :title="$t('notes')"
                  :imgName="'notes.svg'"
                />
              </div>
            </div>
          </div>
        </b-collapse>
      </div>

      <div v-if="servicesReservationWaitAndWillComeBackData">
        <b-button
          v-b-toggle.servicesReservationWaitAndWillComeBackData
          class="btn btn-lg btn-collapse"
        >
          {{ $t("servicesReservationWaitAndWillComeBackData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationWaitAndWillComeBackData">
          <div class="my-card">
            <span class="my-card-title">{{
              $t("servicesReservationWaitAndWillComeBackData")
            }}</span>

            <div
              class="my-card"
              v-for="(
                comeBack, index
              ) in servicesReservationWaitAndWillComeBackData"
              :key="index"
            >
              <span class="my-card-title">{{ ++index }}</span>

              <div class="row">
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="comeBack.waitAndWillComeBackEmployeeNameCurrent"
                  :title="$t('userMakeAction')"
                  :imgName="'employees.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="
                    formateDateTimeLang(
                      comeBack.waitAndWillComeBackDate,
                      comeBack.waitAndWillComeBackTime
                    )
                  "
                  :title="$t('operationDateTime')"
                  :imgName="'dateAndTime.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-12'"
                  :value="comeBack.waitAndWillComeBackNote"
                  :title="$t('notes')"
                  :imgName="'notes.svg'"
                />
              </div>
            </div>
          </div>
        </b-collapse>
      </div>

      <div
        v-if="
          servicesReservationFinishData &&
          servicesReservationFinishData.finishToken
        "
      >
        <b-button
          v-b-toggle.servicesReservationFinishData
          class="btn btn-lg btn-collapse"
        >
          {{ $t("finishServicesReservationData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationFinishData">
          <div class="my-card">
            <span class="my-card-title">{{
              $t("finishServicesReservationData")
            }}</span>

            <div class="row">
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="servicesReservationFinishData.finishEmployeeNameCurrent"
                :title="$t('userMakeAction')"
                :imgName="'employees.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  formateDateTimeLang(
                    servicesReservationFinishData.dateFinish,
                    servicesReservationFinishData.timeFinish
                  )
                "
                :title="$t('operationDateTime')"
                :imgName="'dateAndTime.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-12'"
                :value="servicesReservationFinishData.finishNote"
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </b-collapse>
      </div>

      <div v-if="cancelServicesReservationsData">
        <b-button
          v-b-toggle.cancelServicesReservationsData
          class="btn btn-lg btn-collapse"
        >
          {{ $t("cancelServicesReservationsData") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="cancelServicesReservationsData">
          <div class="my-card">
            <span class="my-card-title">{{
              $t("cancelServicesReservationsData")
            }}</span>

            <div
              class="my-card"
              v-for="(cancel, index) in cancelServicesReservationsData"
              :key="index"
            >
              <span class="my-card-title">{{ ++index }}</span>

              <div class="row">
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="cancel.cancelEmployeeNameCurrent"
                  :title="$t('userMakeAction')"
                  :imgName="'employees.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="
                    formateDateTimeLang(cancel.cancelDate, cancel.cancelTime)
                  "
                  :title="$t('operationDateTime')"
                  :imgName="'dateAndTime.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="cancel.cancelReasonCurrent"
                  :title="$t('cancelReason')"
                  :imgName="'reason.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="cancel.cancelNote"
                  :title="$t('notes')"
                  :imgName="'notes.svg'"
                />
              </div>
            </div>
          </div>
        </b-collapse>
      </div>

      <!-- <div v-if="servicesReservationPayDataHistory">
        <b-button
          v-b-toggle.servicesReservationPayDataHistory
          class="btn btn-lg btn-collapse"
        >
          {{ $t("servicesReservationPayDataHistory") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationPayDataHistory">
          <div class="my-card">
            <span class="my-card-title">{{
              $t("servicesReservationPayDataHistory")
            }}</span>

            <div
              class="my-card"
              v-for="(
                servicesReservationPay, index
              ) in servicesReservationPayDataHistory"
              :key="index"
            >
              <span class="my-card-title">{{ ++index }}</span>

              <div class="row">
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationPay.payEmployeeNameCurrent"
                  :title="$t('userMakeAction')"
                  :imgName="'employees.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationPay.methodPaidNameCurrent"
                  :title="$t('paymentMethod')"
                  :imgName="'method-paids.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationPay.paidActual"
                  :title="$t('paidMoney')"
                  :imgName="'money.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="
                    formateDateTimeLang(
                      servicesReservationPay.payDate,
                      servicesReservationPay.payTime
                    )
                  "
                  :title="$t('operationDateTime')"
                  :imgName="'dateAndTime.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationPay.payNote"
                  :title="$t('notes')"
                  :imgName="'notes.svg'"
                />
              </div>
              <div class="row" v-if="servicesReservationPay.refundStatus">
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationPay.refundEmployeeNameCurrent"
                  :title="$t('userMakeAction')"
                  :imgName="'employees.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationPay.refundReasonCurrent"
                  :title="$t('refundReason')"
                  :imgName="'method-paids.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="
                    formateDateTimeLang(
                      servicesReservationPay.refundDate,
                      servicesReservationPay.refundTime
                    )
                  "
                  :title="$t('operationDateTime')"
                  :imgName="'dateAndTime.svg'"
                />
                <DataLabelGroup
                  :className="'col-lg-6'"
                  :value="servicesReservationPay.refundNote"
                  :title="$t('notes')"
                  :imgName="'notes.svg'"
                />
              </div>
            </div>
          </div>
        </b-collapse>
      </div> -->

      <!-- <div v-if="servicesReservationMeasurementRoomData">
        <b-button
          v-b-toggle.servicesReservationMeasurementRoomData
          class="btn btn-lg btn-collapse"
        >
          {{ $t("measurementRooms.data") }}
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse visible id="servicesReservationMeasurementRoomData">
          <div class="my-card">
            <span class="my-card-title">{{ $t("measurementRooms.data") }}</span>

            <div class="row">
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  servicesReservationMeasurementRoomData.measurementRoomEmployeeNameCurrent
                "
                :title="$t('userMakeAction')"
                :imgName="'employees.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-6'"
                :value="
                  formateDateTimeLang(
                    servicesReservationMeasurementRoomData.measurementRoomDate,
                    servicesReservationMeasurementRoomData.measurementRoomTime
                  )
                "
                :title="$t('operationDateTime')"
                :imgName="'dateAndTime.svg'"
              />
              <DataLabelGroup
                :className="'col-lg-12'"
                :value="
                  servicesReservationMeasurementRoomData.measurementRoomNote
                "
                :title="$t('notes')"
                :imgName="'notes.svg'"
              />
            </div>
          </div>
        </b-collapse>
      </div> -->
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "@/utils/functions";

export default {
  name: "ClientReservationInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["servicesReservationData"],
  computed: {
    servicesReservationRequestData: function () {
      if (this.servicesReservationData) {
        return this.servicesReservationData.servicesReservationRequestData;
      }
      return null;
    },
    servicesReservationApproverData: function () {
      if (this.servicesReservationData) {
        return this.servicesReservationData.servicesReservationApproverData;
      }
      return null;
    },
    servicesReservationPayDataHistory: function () {
      if (this.servicesReservationData) {
        if (
          this.servicesReservationData.servicesReservationPayDataHistory
            .length > 0
        ) {
          return this.servicesReservationData.servicesReservationPayDataHistory;
        }

        return null;
      }
      return null;
    },
    servicesReservationEntreeData: function () {
      if (this.servicesReservationData) {
        if (
          this.servicesReservationData.servicesReservationEntreeData.length > 0
        ) {
          return this.servicesReservationData.servicesReservationEntreeData;
        }

        return null;
      }
      return null;
    },
    servicesReservationWaitAndWillComeBackData: function () {
      if (this.servicesReservationData) {
        if (
          this.servicesReservationData
            .servicesReservationWaitAndWillComeBackData.length > 0
        ) {
          return this.servicesReservationData
            .servicesReservationWaitAndWillComeBackData;
        }

        return null;
      }
      return null;
    },
    servicesReservationAttendanceData: function () {
      if (this.servicesReservationData) {
        return this.servicesReservationData.servicesReservationAttendanceData;
      }
      return null;
    },
    servicesReservationMeasurementRoomData: function () {
      if (
        this.servicesReservationData &&
        this.servicesReservationData.servicesReservationMeasurementRoomData
          .measurementRoomToken
      ) {
        return this.servicesReservationData
          .servicesReservationMeasurementRoomData;
      }
      return null;
    },
    servicesReservationFinishData: function () {
      if (
        this.servicesReservationData &&
        this.servicesReservationData.servicesReservationFinishData.finishToken
      ) {
        return this.servicesReservationData.servicesReservationFinishData;
      }
      return null;
    },
    cancelServicesReservationsData: function () {
      if (this.servicesReservationData) {
        return (
          this.servicesReservationData.cancelServicesReservationsData || null
        );
      }
      return null;
    },
  },
  methods: {
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
};
</script>
