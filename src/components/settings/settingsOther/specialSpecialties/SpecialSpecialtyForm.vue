<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      v-else
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateSpecialSpecialty()"
    >
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="generalSpecialtyTokenOptions.length > 1"
            :className="'col-12'"
            :id="'generalSpecialtyToken'"
            :value="specialSpecialtyData.generalSpecialtyToken"
            :options="generalSpecialtyTokenOptions"
            v-on:changeValue="
              specialSpecialtyData.generalSpecialtyToken = $event
            "
            :title="$t('selectGeneralSpeciality')"
            :imgName="'general-specialities.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'specialSpecialtyNameAr'"
            :value="specialSpecialtyData.specialSpecialtyNameAr"
            v-on:changeValue="
              specialSpecialtyData.specialSpecialtyNameAr = $event
            "
            :title="$t('nameAr')"
            :imgName="'special-spcialities.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'specialSpecialtyNameEn'"
            :value="specialSpecialtyData.specialSpecialtyNameEn"
            v-on:changeValue="
              specialSpecialtyData.specialSpecialtyNameEn = $event
            "
            :title="$t('nameEn')"
            :imgName="'special-spcialities.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'specialSpecialtyNameUnd'"
            :value="specialSpecialtyData.specialSpecialtyNameUnd"
            v-on:changeValue="
              specialSpecialtyData.specialSpecialtyNameUnd = $event
            "
            :title="$t('nameUnd')"
            :imgName="'special-spcialities.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'specialSpecialtyDescriptionAr'"
            :value="specialSpecialtyData.specialSpecialtyDescriptionAr"
            v-on:changeValue="
              specialSpecialtyData.specialSpecialtyDescriptionAr = $event
            "
            :title="$t('specialSpecialtyDescriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'specialSpecialtyDescriptionEn'"
            :value="specialSpecialtyData.specialSpecialtyDescriptionEn"
            v-on:changeValue="
              specialSpecialtyData.specialSpecialtyDescriptionEn = $event
            "
            :title="$t('specialSpecialtyDescriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'specialSpecialtyDescriptionUnd'"
            :value="specialSpecialtyData.specialSpecialtyDescriptionUnd"
            v-on:changeValue="
              specialSpecialtyData.specialSpecialtyDescriptionUnd = $event
            "
            :title="$t('specialSpecialtyDescriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'specialSpecialtyNotes'"
            :value="specialSpecialtyData.specialSpecialtyNotes"
            v-on:changeValue="
              specialSpecialtyData.specialSpecialtyNotes = $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/special-specialties" class="btn btn-cancel">
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
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";

export default {
  name: "SpecialSpecialtyForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomSelectBox,
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
      generalSpecialtyTokenOptions: [],
    };
  },
  props: ["specialSpecialtyData", "submitName"],
  methods: {
    async addOrUpdateSpecialSpecialty() {
      this.$emit("addOrUpdateSpecialSpecialty");
    },
    async getDialogOfGeneralSpecialties() {
      this.isLoading = true;
      this.generalSpecialtyTokenOptions = [];
      try {
        const response = await axios.get(
          `/GeneralSpecialties/GetDialogOfGeneralSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.generalSpecialtyTokenOptions.push({
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
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      if (
        this.generalSpecialtyTokenOptions.length == 1 &&
        this.submitName == this.$t("add")
      ) {
        this.specialSpecialtyData.generalSpecialtyToken =
          this.generalSpecialtyTokenOptions[0].value;
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getDialogOfGeneralSpecialties();
  },
};
</script>
