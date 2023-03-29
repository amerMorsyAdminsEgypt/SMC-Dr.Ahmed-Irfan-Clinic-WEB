<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addOrUpdateCity()">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-6">
            <b-form-select
              v-model="cityData.countryToken"
              :options="countryTokenOptions"
              class="form-control"
              @change="changeGovernate()"
            ></b-form-select>
            <img src="@/assets/images/country.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="cityData.governateToken"
              :options="governateTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/governate.svg" />
          </div>
          <CustomInput
            :className="'col-md-4'"
            :id="'CityNameAr'"
            :value="cityData.cityNameAr"
            :title="$t('cities.nameAr')"
            :imgName="'city.svg'"
            v-on:changeValue="cityData.cityNameAr = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'CityNameEn'"
            :value="cityData.cityNameEn"
            :title="$t('cities.nameEn')"
            :imgName="'city.svg'"
            v-on:changeValue="cityData.cityNameEn = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'CityNameUnd'"
            :value="cityData.cityNameUnd"
            :title="$t('cities.nameUnd')"
            :imgName="'city.svg'"
            v-on:changeValue="cityData.cityNameUnd = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/cities" class="btn btn-cancel">
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
import { STATUS } from "@/utils/constants";
import Country from "@/models/settings/settingsOther/countries/Country";
import Governate from "@/models/settings/settingsOther/governates/Governate";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "CityForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
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
      countryData: new Country(),
      countryTokenOptions: [],
      governateData: new Governate(),
      governateTokenOptions: [],
      filterStatus: "",
      countryToken: this.cityData.countryToken,
    };
  },
  props: ["cityData", "submitName"],
  methods: {
    async getDialogOfCountries() {
      this.isLoading = true;
      this.countryTokenOptions = [];
      this.countryTokenOptions.push({
        value: "",
        text: this.$t("countries.select"),
      });
      try {
        const response = await this.countryData.getDialogOfCountries(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.countryTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.countryTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeGovernate() {
      this.filterStatus = true;
      this.cityData.governateToken = "";
      this.getDialogOfGovernates(this.filterStatus, this.cityData.countryToken);
    },
    async getDialogOfGovernates(filterStatus, countryToken) {
      this.isLoading = true;
      this.governateTokenOptions = [];
      this.governateTokenOptions.push({
        value: "",
        text: this.$t("governates.select"),
      });
      try {
        const response = await this.governateData.getDialogOfGovernates(
          this.language,
          this.userAuthorizeToken,
          filterStatus,
          countryToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.governateTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.governateTokenOptions = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateCity() {
      this.$emit("addOrUpdateCity");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfCountries();
    this.getDialogOfGovernates(this.filterStatus, this.cityData.countryToken);
  },
};
</script>

<style lang="scss"></style>
