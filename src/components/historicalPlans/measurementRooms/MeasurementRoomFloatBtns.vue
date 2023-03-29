<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link
            :to="{
              name: 'MeasurementRoomAdd',
              params: {
                clientToken: filterMeasurementRoomtData.clientToken,
                reservationToken: filterMeasurementRoomtData.reservationToken,
              },
            }"
            class=""
          >
            {{ $t("measurementRooms.add") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link
            :to="{
              name: 'MeasurementRoomAdd',
              params: {
                clientToken: filterMeasurementRoomtData.clientToken,
                reservationToken: filterMeasurementRoomtData.reservationToken,
              },
            }"
            class=""
          >
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
      <!-- <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li> -->
    </ul>

    <vue-bottom-sheet ref="CustomBottomSheet">
      <div class="row">
        <div class="form-label-group col-md-12">
          <b-form-select
            v-model="filterData.reservationStatusToken"
            :options="reservationStatusTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div>
        <CustomInput
          :className="'col-md-6'"
          :id="'textSearch'"
          :value="filterData.textSearch"
          :title="$t('search')"
          :imgName="'search.svg'"
          v-on:changeValue="filterData.textSearch = $event"
        />
        <div class="form-label-group col-md-6">
          <b-form-select
            v-model="filterData.clientToken"
            :options="clientTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/clients.svg" />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="search"
        >
          {{ $t("search") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { STATUS } from "@/utils/constants";
import { setDataMultiLang } from "@/utils/functions";
import CustomInput from "@/components/general/CustomInput.vue";
import Client from "@/models/clients/Client";

export default {
  name: "MeasurementRoomFloatBtns",
  props: {
    filterMeasurementRoomtData: {
      type: Object,
    },
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      filterData: this.filterMeasurementRoomtData,
      reservationStatusTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
    };
  },
  components: {
    CustomInput,
  },
  methods: {
    open() {
      this.$refs.CustomBottomSheet.open();
    },
    close() {
      this.$refs.CustomBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit("search", this.filterData);
    },
    async getDialogOfReservationsStatusTypes() {
      this.isLoading = true;
      this.reservationStatusTokenOptions = [];
      this.reservationStatusTokenOptions.push({
        value: "",
        text: this.$t("selectReservationStatus"),
      });
      let items =
        this.$store.getters.userData.constantLists.listReservationsStatusTypes;
      for (let item in items) {
        this.reservationStatusTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfClients() {
      this.isLoading = true;
      this.clientTokenOptions = [];
      this.clientTokenOptions.push({
        value: "",
        text: this.$t("selectClient"),
      });
      try {
        let response = await this.clientData.getDialogOfClients(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.clientTokenOptions.push({
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
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    this.getDialogOfReservationsStatusTypes();
    this.getDialogOfClients();
  },
};
</script>
