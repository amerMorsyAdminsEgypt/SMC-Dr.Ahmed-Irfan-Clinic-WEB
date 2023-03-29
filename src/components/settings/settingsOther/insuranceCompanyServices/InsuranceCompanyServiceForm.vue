<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateInsuranceCompanyService()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'insuranceCompanyServiceCode'"
            :value="insuranceCompanyServiceData.insuranceCompanyServiceCode"
            v-on:changeValue="
              insuranceCompanyServiceData.insuranceCompanyServiceCode = $event
            "
            :title="$t('code')"
            :imgName="'code.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyServiceNote'"
            :value="insuranceCompanyServiceData.insuranceCompanyServiceNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              insuranceCompanyServiceData.insuranceCompanyServiceNote = $event
            "
          />
        </div>

        <div
          v-if="insuranceCompanyServiceData.insuranceCompanyServicesDetailsData"
        >
          <div
            class="my-card"
            v-for="(
              slice, index
            ) in insuranceCompanyServiceData.insuranceCompanyServicesDetailsData"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>
            <span class="remove-slice-container">
              <button
                @click="removeSlice(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span>
            <div class="row">
              <CustomSelectBox
                :className="'col-md-6'"
                :id="`insuranceCompanyServicesDetailsData[${index}][serviceToken]`"
                :options="serviceTokenOptions"
                :value="slice.serviceToken"
                v-on:changeValue="slice.serviceToken = $event"
                :title="$t('selectService')"
                :imgName="'services.svg'"
              />
              <CustomInputFloat
                :className="'col-md-6'"
                :id="`insuranceCompanyServicesDetailsData[${index}][discountPercentage]`"
                :value="slice.discountPercentage"
                v-on:changeValue="slice.discountPercentage = $event"
                :title="$t('insuranceCompanyServices.discountPercentage')"
                :imgName="'percentage.svg'"
              />
            </div>
          </div>

          <div class="add-slice-container">
            <button
              @click="addSlice"
              type="button"
              class="btn btn-add-slice"
              :title="$t('addSlice')"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'InsuranceCompanyServices',
            params: { insuranceCompanyToken: insuranceCompanyToken },
          }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import InsuranceCompanyServicesDetailsData from "@/models/settings/settingsOther/insuranceCompanyServicesDetails/InsuranceCompanyServicesDetailsData";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import TextArea from "@/components/general/TextArea.vue";
import axios from "axios";
import { STATUS } from "@/utils/constants";

export default {
  name: "InsuranceCompanyServiceForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomSelectBox,
    CustomInputFloat,
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
      serviceTokenOptions: [],
    };
  },
  props: ["insuranceCompanyServiceData", "submitName", "insuranceCompanyToken"],
  methods: {
    addSlice() {
      this.insuranceCompanyServiceData.insuranceCompanyServicesDetailsData.push(
        new InsuranceCompanyServicesDetailsData()
      );
    },
    removeSlice(index) {
      this.insuranceCompanyServiceData.insuranceCompanyServicesDetailsData.splice(
        index,
        1
      );
    },

    async getDialogOfServices() {
      this.isLoading = true;
      this.serviceTokenOptions = [];
      this.serviceTokenOptions.push({
        value: "",
        text: this.$t("selectService"),
      });
      try {
        const response = await axios.get(
          `/Services/GetDialogOfServices?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.serviceTokenOptions.push({
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
        this.serviceTokenOptions = null;
      }
      this.isLoading = false;
    },

    async addOrUpdateInsuranceCompanyService() {
      this.$emit("addOrUpdateInsuranceCompanyService");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfServices();
  },
};
</script>

<style lang="scss"></style>
