<template>
  <div v-if="measurementRoomsData" class="">
    <!-- <div class=""> -->
    <div v-for="(measurement, index) in measurementRoomsData" :key="index">
      <b-button v-b-toggle="`item${index}`" class="btn btn-lg btn-collapse">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            {{
              `${$t("reservationCode")}:  ${measurement.reservationCode}  ${$t(
                "quma"
              )} `
            }}
            {{
              `${$t("onDate")}:  ${
                measurement.reservationDate
                  ? measurement.reservationDate
                  : $t("notFound")
              }  ${$t("quma")}  `
            }}
            {{
              `${$t("specialSpecialty")}:  ${
                measurement.specialSpecialtyNameCurrent
              }  ${$t("quma")}  `
            }}
            {{
              `${measurement.jobNameCurrent}:  ${measurement.measurementRoomEmployeeNameCurrent}`
            }}
          </div>
        </div>
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse :id="`item${index}`">
        <div class="my-card row">
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="measurement.measurementRoomToken"
            :title="$t('measurementRooms.code')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="measurement.clientNameCurrent"
            :title="$t('clientName')"
            :imgName="'clients.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="measurement.measurementRoomLength"
            :title="$t('measurementRooms.length')"
            :imgName="'length.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="measurement.measurementRoomWeight"
            :title="$t('measurementRooms.weight')"
            :imgName="'weight.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="measurement.measurementRoomPressure"
            :title="$t('measurementRooms.pressure')"
            :imgName="'pressure.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6 col-lg-6'"
            :value="measurement.measurementRoomSuger"
            :title="$t('measurementRooms.suger')"
            :imgName="'suger.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="measurement.measurementRoomBmr"
            :title="$t('measurementRooms.bmr')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="measurement.measurementRoomHeartRate"
            :title="$t('measurementRooms.heartRate')"
            :imgName="'heartRate.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="measurement.measurementRoomTemperature"
            :title="$t('measurementRooms.temperature')"
            :imgName="'Thermometer.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="measurement.measurementRoomPulseRate"
            :title="$t('measurementRooms.pulseRate')"
            :imgName="'pressure.svg'"
          />
          <DataLabelGroup
            :className="'col-md-12'"
            :value="measurement.measurementRoomBreathingRate"
            :title="$t('measurementRooms.breathingRate')"
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-md-12'"
            :value="measurement.measurementRoomNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="measurement.measurementRoomEmployeeNameCurrent"
            :title="$t('userMakeAction')"
            :imgName="'employees.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                measurement.measurementRoomDate,
                measurement.measurementRoomTime
              )
            "
            :title="$t('actionDateTime')"
            :imgName="'dateAndTime.svg'"
          />

          <button class="btn p-0">
            <router-link
              :to="{
                name: 'MeasurementRoomEdit',
                params: {
                  clientToken: measurement.clientToken,
                  reservationToken: measurement.reservationToken,
                  measurementRoomToken: measurement.measurementRoomToken,
                },
              }"
              :title="$t('edit')"
            >
              <img src="@/assets/images/pencil.svg" class="icon-lg" />
            </router-link>
          </button>
          <!-- <button
            class="btn p-0"
            :title="$t('download')"
            @click="downlaodTreatmentPlan(measurement)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button> -->
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
// import i18n from "@/i18n/index";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import {
  setDataMultiLang,
  timeToLang,
  isDataExist,
  formateDateTimeLang,
} from "@/utils/functions";

export default {
  name: "MeasurementRoomsTable",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["measurementRoomsData", "measurementRoomData"],
  methods: {
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
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
