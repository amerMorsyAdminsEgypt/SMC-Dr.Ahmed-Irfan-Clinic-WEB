<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateDistrict()"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-4">
            <b-form-select
              v-model="districtData.countryToken"
              :options="countryTokenOptions"
              class="form-control"
              @change="changeGovernate()"
            ></b-form-select>
            <img src="@/assets/images/country.svg" />
          </div>
          <div class="form-label-group col-4">
            <b-form-select
              v-model="districtData.governateToken"
              :options="governateTokenOptions"
              class="form-control"
              @change="changeCity()"
            ></b-form-select>
            <img src="@/assets/images/governate.svg" />
          </div>
          <div class="form-label-group col-4">
            <b-form-select
              v-model="districtData.cityToken"
              :options="cityTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/city.svg" />
          </div>

          <CustomInput
            :className="'col-md-4'"
            :id="'DistrictNameAr'"
            :value="districtData.districtNameAr"
            :title="$t('districts.nameAr')"
            :imgName="'district.svg'"
            v-on:changeValue="districtData.districtNameAr = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'DistrictNameEn'"
            :value="districtData.districtNameEn"
            :title="$t('districts.nameEn')"
            :imgName="'district.svg'"
            v-on:changeValue="districtData.districtNameEn = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'DistrictNameUnd'"
            :value="districtData.districtNameUnd"
            :title="$t('districts.nameUnd')"
            :imgName="'district.svg'"
            v-on:changeValue="districtData.districtNameUnd = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/districts" class="btn btn-cancel">
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
import City from "@/models/settings/settingsOther/cities/City";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "DistrictForm",
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
      governateData: new Governate(),
      cityData: new City(),
      countryTokenOptions: [],
      governateTokenOptions: [],
      cityTokenOptions: [],
      filterStatus: "",
    };
  },
  props: ["districtData", "submitName"],
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
      this.districtData.governateToken = "";
      this.districtData.cityToken = "";
      this.getDialogOfGovernates(
        this.filterStatus,
        this.districtData.countryToken
      );
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
    async changeCity() {
      this.filterStatus = true;
      this.districtData.cityToken = "";
      this.getDialogOfCities(
        this.filterStatus,
        this.districtData.governateToken
      );
    },
    async getDialogOfCities(filterStatus, governateToken) {
      this.isLoading = true;
      this.cityTokenOptions = [];
      this.cityTokenOptions.push({
        value: "",
        text: this.$t("cities.select"),
      });
      try {
        const response = await this.cityData.getDialogOfCities(
          this.language,
          this.userAuthorizeToken,
          filterStatus,
          governateToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.cityTokenOptions.push({
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
        this.showMsg(this.$t("errorCatch"));
        this.cityTokenOptions = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateDistrict() {
      // console.log(this.districtData);
      this.$emit("addOrUpdateDistrict");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfCountries();
    this.getDialogOfGovernates(
      this.filterStatus,
      this.districtData.countryToken
    );
    this.getDialogOfCities(this.filterStatus, this.districtData.governateToken);
  },
};
</script>

<style lang="scss"></style>
