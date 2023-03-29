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
              name: 'MedicalAlertAdd',
              params: {
                clientToken: filterMedicalAlertData.clientToken,
                reservationToken: filterMedicalAlertData.reservationToken,
              },
            }"
            class=""
          >
            {{ $t("historicalPlans.warnings.add") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link
            :to="{
              name: 'MedicalAlertAdd',
              params: {
                clientToken: filterMedicalAlertData.clientToken,
                reservationToken: filterMedicalAlertData.reservationToken,
              },
            }"
            class=""
          >
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="CustomBottomSheet">
      <div class="row">
        <CustomSelectBox
          :className="'col-md-12'"
          :id="'clientToken'"
          :value="filterData.clientToken"
          :options="clientTokenOptions"
          v-on:changeValue="changeReservations($event)"
          :title="$t('selectClient')"
          :imgName="'clients.svg'"
        />
        <CustomSelectBox
          :className="'col-md-12'"
          :id="'reservationToken'"
          :value="filterData.reservationToken"
          :options="reservationTokenOptions"
          v-on:changeValue="filterData.reservationToken = $event"
          :title="$t('selectReservation')"
          :imgName="'services-reservations.svg'"
        />
        <CustomInput
          :className="'col-md-12'"
          :id="'textSearch'"
          :value="filterData.textSearch"
          :title="$t('search')"
          :imgName="'search.svg'"
          v-on:changeValue="filterData.textSearch = $event"
        />
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
import ServicesReservation from "@/models/servicesReservations/ServicesReservation";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicalAlertFloatBtns",
  mixins: [createToastMixin],
  props: {
    filterMedicalAlertData: {
      type: Object,
    },
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      filterData: this.filterMedicalAlertData,
      reservationStatusTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
    };
  },
  components: {
    CustomInput,
    CustomSelectBox,
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
    async getDialogOfServicesReservations() {
      this.isLoading = true;
      this.reservationTokenOptions = [];
      this.reservationTokenOptions.push({
        value: "",
        text: this.$t("selectReservation"),
      });
      this.reservationData.clientToken = this.filterData.clientToken;
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
    changeReservations(data) {
      this.filterData.clientToken = data;
      this.filterData.reservationToken = "";
      this.getDialogOfServicesReservations();
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
    this.getDialogOfServicesReservations();
    this.getDialogOfClients();
  },
};
</script>
