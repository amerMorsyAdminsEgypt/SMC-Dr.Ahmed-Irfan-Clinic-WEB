<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateGovernate()"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <b-form-select
              v-model="governateData.countryToken"
              :options="countryTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/country.svg" />
          </div>
          <CustomInput
            :className="'col-md-4'"
            :id="'GovernateNameAr'"
            :value="governateData.governateNameAr"
            :title="$t('governates.nameAr')"
            :imgName="'governate.svg'"
            v-on:changeValue="governateData.governateNameAr = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'GovernateNameEn'"
            :value="governateData.governateNameEn"
            :title="$t('governates.nameEn')"
            :imgName="'governate.svg'"
            v-on:changeValue="governateData.governateNameEn = $event"
          />
          <CustomInput
            :className="'col-md-4'"
            :id="'GovernateNameUnd'"
            :value="governateData.governateNameUnd"
            :title="$t('governates.nameUnd')"
            :imgName="'governate.svg'"
            v-on:changeValue="governateData.governateNameUnd = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/governates" class="btn btn-cancel">
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
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "GovernateForm",
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
      countryTokenOptions: [],
      countryData: new Country(),
    };
  },
  props: ["governateData", "submitName"],
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
    async addOrUpdateGovernate() {
      this.$emit("addOrUpdateGovernate");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfCountries();
  },
};
</script>

<style lang="scss"></style>
