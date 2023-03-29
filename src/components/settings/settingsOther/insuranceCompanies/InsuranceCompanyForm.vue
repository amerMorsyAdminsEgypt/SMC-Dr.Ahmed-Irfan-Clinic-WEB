<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateInsuranceCompany()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'InsuranceCompanyNameAr'"
            :value="insuranceCompanyData.insuranceCompanyNameAr"
            :title="$t('insuranceCompanies.nameAr')"
            :imgName="'insurance-companies.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyNameAr = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'InsuranceCompanyNameEn'"
            :value="insuranceCompanyData.insuranceCompanyNameEn"
            :title="$t('insuranceCompanies.nameEn')"
            :imgName="'insurance-companies.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyNameEn = $event
            "
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'InsuranceCompanyNameUnd'"
            :value="insuranceCompanyData.insuranceCompanyNameUnd"
            :title="$t('insuranceCompanies.nameUnd')"
            :imgName="'insurance-companies.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyNameUnd = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'InsuranceCompanyAddressAr'"
            :value="insuranceCompanyData.insuranceCompanyAddressAr"
            :title="$t('insuranceCompanies.addressAr')"
            :imgName="'address.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyAddressAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'InsuranceCompanyAddressEn'"
            :value="insuranceCompanyData.insuranceCompanyAddressEn"
            :title="$t('insuranceCompanies.addressEn')"
            :imgName="'address.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyAddressEn = $event
            "
          />

          <TextArea
            :className="'col-md-6'"
            :id="'InsuranceCompanyAddressUnd'"
            :value="insuranceCompanyData.insuranceCompanyAddressUnd"
            :title="$t('insuranceCompanies.addressUnd')"
            :imgName="'address.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyAddressUnd = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'InsuranceCompanyDescriptionAr'"
            :value="insuranceCompanyData.insuranceCompanyDescriptionAr"
            :title="$t('insuranceCompanies.descriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyDescriptionAr = $event
            "
          />
          <TextArea
            :className="'col-md-6'"
            :id="'InsuranceCompanyDescriptionEn'"
            :value="insuranceCompanyData.insuranceCompanyDescriptionEn"
            :title="$t('insuranceCompanies.descriptionEn')"
            :imgName="'description.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyDescriptionEn = $event
            "
          />

          <TextArea
            :className="'col-md-12'"
            :id="'InsuranceCompanyDescriptionUnd'"
            :value="insuranceCompanyData.insuranceCompanyDescriptionUnd"
            :title="$t('insuranceCompanies.descriptionUnd')"
            :imgName="'description.svg'"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyDescriptionUnd = $event
            "
          />
          <TelPicker
            :className="'col-md-6 col-lg-6'"
            v-on:changeCC="
              insuranceCompanyData.insuranceCompanyCCWithCCName = $event
            "
            :value="insuranceCompanyData.insuranceCompanyCCWithCCName"
            :id="'insuranceCompanyCCWithCCName'"
          />
          <CustomInput
            :className="'col-md-6 col-lg-6'"
            :id="'InsuranceCompanyPhone'"
            :value="insuranceCompanyData.insuranceCompanyPhone"
            v-on:changeValue="
              insuranceCompanyData.insuranceCompanyPhone = $event
            "
            :title="$t('insuranceCompanies.phone')"
            :imgName="'phone.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/insurance-companies" class="btn btn-cancel">
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
import createToastMixin from "@/utils/create-toast-mixin";
import TelPicker from "@/components/general/TelPicker.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "InsuranceCompanyForm",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    TelPicker,
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
      filterStatus: "",
    };
  },
  props: ["insuranceCompanyData", "submitName"],
  methods: {
    async addOrUpdateInsuranceCompany() {
      // console.log(this.insuranceCompanyData);
      this.$emit("addOrUpdateInsuranceCompany");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {},
};
</script>

<style lang="scss"></style>
