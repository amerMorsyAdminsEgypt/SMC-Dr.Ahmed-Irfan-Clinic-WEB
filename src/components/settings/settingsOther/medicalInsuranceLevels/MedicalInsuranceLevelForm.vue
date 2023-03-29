<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMedicalInsuranceLevel()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalInsuranceLevelCode'"
            :value="medicalInsuranceLevelData.medicalInsuranceLevelCode"
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelCode = $event
            "
            :title="$t('code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalInsuranceLevelNameAr'"
            :value="medicalInsuranceLevelData.medicalInsuranceLevelNameAr"
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelNameAr = $event
            "
            :title="$t('nameAr')"
            :imgName="'medicalInsuranceLevel.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalInsuranceLevelNameEn'"
            :value="medicalInsuranceLevelData.medicalInsuranceLevelNameEn"
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelNameEn = $event
            "
            :title="$t('nameEn')"
            :imgName="'medicalInsuranceLevel.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'medicalInsuranceLevelNameUnd'"
            :value="medicalInsuranceLevelData.medicalInsuranceLevelNameUnd"
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelNameUnd = $event
            "
            :title="$t('nameUnd')"
            :imgName="'medicalInsuranceLevel.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`colorToken`"
            :options="colorTokenOptions"
            :value="medicalInsuranceLevelData.colorToken"
            v-on:changeValue="medicalInsuranceLevelData.colorToken = $event"
            :title="$t('colors.select')"
            :imgName="'colors.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'medicalInsuranceLevelDescriptionAr'"
            :value="
              medicalInsuranceLevelData.medicalInsuranceLevelDescriptionAr
            "
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelDescriptionAr =
                $event
            "
            :title="$t('descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'medicalInsuranceLevelDescriptionEn'"
            :value="
              medicalInsuranceLevelData.medicalInsuranceLevelDescriptionEn
            "
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelDescriptionEn =
                $event
            "
            :title="$t('descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'medicalInsuranceLevelDescriptionUnd'"
            :value="
              medicalInsuranceLevelData.medicalInsuranceLevelDescriptionUnd
            "
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelDescriptionUnd =
                $event
            "
            :title="$t('descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'medicalInsuranceLevelNote'"
            :value="medicalInsuranceLevelData.medicalInsuranceLevelNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              medicalInsuranceLevelData.medicalInsuranceLevelNote = $event
            "
          />
        </div>

        <div v-if="medicalInsuranceLevelData.medicalInsuranceLevelServicesData">
          <div
            class="my-card"
            v-for="(
              slice, index
            ) in medicalInsuranceLevelData.medicalInsuranceLevelServicesData"
            :key="index"
          >
            <span class="my-card-title">{{ index + 1 }}</span>
            <!-- <span class="remove-slice-container" v-if="index != 0">
              <button
                @click="removeSlice(index)"
                type="button"
                class="btn btn-remove-slice"
              >
                ×
              </button>
            </span> -->
            <div class="row">
              <!-- <CustomSelectBox
                :className="'col-md-6'"
                :id="`medicalInsuranceLevelServicesData[${index}][serviceToken]`"
                :options="serviceTokenOptions"
                :value="slice.serviceToken"
                v-on:changeValue="slice.serviceToken = $event"
                :title="$t('selectService')"
                :imgName="'services.svg'"
              /> -->
              <DataLabelGroup
                :className="'col-md-6'"
                :value="slice.serviceNameCurrent"
                :title="$t('serviceName')"
                :imgName="'services.svg'"
              />
              <CustomInputFloat
                :className="'col-md-6'"
                :id="`medicalInsuranceLevelServicesData[${index}][discountPercentage]`"
                :value="slice.discountPercentage"
                v-on:changeValue="slice.discountPercentage = $event"
                :title="$t('insuranceCompanyServices.discountPercentage')"
                :imgName="'percentage.svg'"
              />
            </div>
          </div>

          <!-- <div class="add-slice-container">
            <button
              @click="addSlice"
              type="button"
              class="btn btn-add-slice"
              :title="$t('addSlice')"
            >
              +
            </button>
          </div> -->
        </div>
      </div>
      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'MedicalInsuranceLevels',
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
// import MedicalInsuranceLevelServicesData from "@/models/settings/settingsOther/medicalInsuranceLevelServices/MedicalInsuranceLevelServicesData";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import TextArea from "@/components/general/TextArea.vue";
import axios from "axios";
import { STATUS } from "@/utils/constants";
import Color from "@/models/settings/settingsOther/colors/Color";

export default {
  name: "MedicalInsuranceLevelForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomSelectBox,
    CustomInputFloat,
    DataLabelGroup,
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
      colorData: new Color(),
      colorTokenOptions: [],
    };
  },
  props: ["medicalInsuranceLevelData", "submitName", "insuranceCompanyToken"],
  methods: {
    // addSlice() {
    //   this.medicalInsuranceLevelData.medicalInsuranceLevelServicesData.push(
    //     new MedicalInsuranceLevelServicesData()
    //   );
    // },
    // removeSlice(index) {
    //   this.medicalInsuranceLevelData.medicalInsuranceLevelServicesData.splice(
    //     index,
    //     1
    //   );
    // },

    async getDialogOfColors() {
      this.isLoading = true;
      this.colorTokenOptions = await this.colorData.getDialogOfColors(
        this.language,
        this.userAuthorizeToken
      );
      this.isLoading = false;
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

    async addOrUpdateMedicalInsuranceLevel() {
      this.$emit("addOrUpdateMedicalInsuranceLevel");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfColors();
    this.getDialogOfServices();
  },
};
</script>
