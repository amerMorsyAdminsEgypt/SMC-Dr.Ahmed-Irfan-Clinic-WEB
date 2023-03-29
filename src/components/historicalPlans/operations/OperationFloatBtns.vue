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
              name: 'OperationAdd',
              params: {
                surgeryHistoryClientToken:
                  filterOperationData.surgeryHistoryClientToken,
                reservationToken: filterOperationData.reservationToken,
              },
            }"
            class=""
          >
            {{ $t("historicalPlans.operations.operation.add") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link
            :to="{
              name: 'OperationAdd',
              params: {
                surgeryHistoryClientToken:
                  filterOperationData.surgeryHistoryClientToken,
                reservationToken: filterOperationData.reservationToken,
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
          :id="'surgeryHistoryClientToken'"
          :value="filterData.surgeryHistoryClientToken"
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
        <CustomSelectBox
          :className="'col-md-12'"
          :id="'surgeryPlaceTypeToken'"
          :value="filterData.surgeryPlaceTypeToken"
          :options="surgeryPlaceTypeTokenOptions"
          v-on:changeValue="filterData.surgeryPlaceTypeToken = $event"
          :title="$t('selectSurgeryPlaceType')"
          :imgName="'type.svg'"
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
  name: "OperationFloatBtns",
  mixins: [createToastMixin],
  props: {
    filterOperationData: {
      type: Object,
    },
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      filterData: this.filterOperationData,
      reservationStatusTokenOptions: [],
      clientData: new Client(),
      clientTokenOptions: [],
      reservationData: new ServicesReservation(),
      reservationTokenOptions: [],
      surgeryPlaceTypeTokenOptions: [],
    };
  },
  components: {
    CustomInput,
    CustomSelectBox,
  },
  methods: {
    async getDialogOfSurgeryPlaceTypes() {
      this.isLoading = true;
      this.surgeryPlaceTypeTokenOptions = [];
      this.surgeryPlaceTypeTokenOptions.push({
        value: "",
        text: this.$t("selectSurgeryPlaceType"),
      });

      let surgeryPlaceTypes =
        this.$store.getters.userData.constantLists.listSurgeryPlaceType;
      for (let item in surgeryPlaceTypes) {
        this.surgeryPlaceTypeTokenOptions.push({
          value: surgeryPlaceTypes[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            surgeryPlaceTypes[item]["itemNameAr"],
            surgeryPlaceTypes[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
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
      this.reservationData.clientToken =
        this.filterData.surgeryHistoryClientToken;
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
      this.filterData.surgeryHistoryClientToken = data;
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
    this.getDialogOfSurgeryPlaceTypes();
  },
};
</script>
