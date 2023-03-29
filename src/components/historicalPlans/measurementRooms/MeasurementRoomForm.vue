<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMeasurementRoom()"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-12">
            <b-form-select
              v-model="measurementRoomData.reservationToken"
              :options="reservationTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/services-reservations.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomLength'"
            :value="measurementRoomData.measurementRoomLength"
            :title="$t('measurementRooms.length')"
            v-on:changeValue="
              measurementRoomData.measurementRoomLength = $event
            "
            :imgName="'length.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomWeight'"
            :value="measurementRoomData.measurementRoomWeight"
            :title="$t('measurementRooms.weight')"
            v-on:changeValue="
              measurementRoomData.measurementRoomWeight = $event
            "
            :imgName="'weight.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomPressure'"
            :value="measurementRoomData.measurementRoomPressure"
            :title="$t('measurementRooms.pressure')"
            v-on:changeValue="
              measurementRoomData.measurementRoomPressure = $event
            "
            :imgName="'pressure.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomSuger'"
            :value="measurementRoomData.measurementRoomSuger"
            :title="$t('measurementRooms.suger')"
            v-on:changeValue="measurementRoomData.measurementRoomSuger = $event"
            :imgName="'suger.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomBmr'"
            :value="measurementRoomData.measurementRoomBmr"
            :title="$t('measurementRooms.bmr')"
            v-on:changeValue="measurementRoomData.measurementRoomBmr = $event"
            :imgName="'number.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomHeartRate'"
            :value="measurementRoomData.measurementRoomHeartRate"
            :title="$t('measurementRooms.heartRate')"
            v-on:changeValue="
              measurementRoomData.measurementRoomHeartRate = $event
            "
            :imgName="'heartRate.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomTemperature'"
            :value="measurementRoomData.measurementRoomTemperature"
            :title="$t('measurementRooms.temperature')"
            v-on:changeValue="
              measurementRoomData.measurementRoomTemperature = $event
            "
            :imgName="'Thermometer.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'measurementRoomPulseRate'"
            :value="measurementRoomData.measurementRoomPulseRate"
            :title="$t('measurementRooms.pulseRate')"
            v-on:changeValue="
              measurementRoomData.measurementRoomPulseRate = $event
            "
            :imgName="'pressure.svg'"
          />
          <CustomInput
            :className="'col-md-12'"
            :id="'measurementRoomBreathingRate'"
            :value="measurementRoomData.measurementRoomBreathingRate"
            :title="$t('measurementRooms.breathingRate')"
            v-on:changeValue="
              measurementRoomData.measurementRoomBreathingRate = $event
            "
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'measurementRoomNote'"
            :value="measurementRoomData.measurementRoomNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="measurementRoomData.measurementRoomNote = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'MeasurementRooms' }" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import { STATUS } from "@/utils/constants";

export default {
  name: "MeasurementRoomForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    TextArea,
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
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
    };
  },
  props: ["measurementRoomData", "submitName"],
  methods: {
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
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
    async addOrUpdateMeasurementRoom() {
      this.$emit("addOrUpdateMeasurementRoom");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.reservationData.clientToken = this.$route.params.clientToken
      ? this.$route.params.clientToken
      : "";
    this.getDialogOfServicesReservations();
  },
};
</script>

<style lang="scss"></style>
