<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMedicine()"
    >
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="'medicinesTypeToken'"
            :value="medicineData.medicinesTypeToken"
            :title="$t('selectMedicinesType')"
            :options="medicinesTypeTokenOptions"
            :imgName="'medicines-types.svg'"
            v-on:changeValue="medicineData.medicinesTypeToken = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'medicineNameAr'"
            :value="medicineData.medicineNameAr"
            :title="$t('nameAr')"
            :imgName="'medicines.svg'"
            v-on:changeValue="medicineData.medicineNameAr = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'medicineNameEn'"
            :value="medicineData.medicineNameEn"
            :title="$t('nameEn')"
            :imgName="'medicines.svg'"
            v-on:changeValue="medicineData.medicineNameEn = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'medicineNameUnd'"
            :value="medicineData.medicineNameUnd"
            :title="$t('nameUnd')"
            :imgName="'medicines.svg'"
            v-on:changeValue="medicineData.medicineNameUnd = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'medicineNotes'"
            :value="medicineData.medicineNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="medicineData.medicineNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/medicines" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
// import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import TextArea from "@/components/general/TextArea.vue";
import axios from "axios";
import { STATUS } from "@/utils/constants";

export default {
  name: "MedicineForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    // CustomInput,
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
      medicinesTypeTokenOptions: [],
    };
  },
  props: ["medicineData", "submitName"],
  methods: {
    async getDialogOfMedicinesTypes() {
      this.isLoading = true;
      this.medicinesTypeTokenOptions = [];
      this.medicinesTypeTokenOptions.push({
        value: "",
        text: this.$t("selectMedicinesType"),
      });
      try {
        const response = await axios.get(
          `/MedicinesTypes/GetDialogOfMedicinesTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.medicinesTypeTokenOptions.push({
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
        this.medicinesTypeTokenOptions = null;
      }
      this.isLoading = false;
    },

    async addOrUpdateMedicine() {
      this.$emit("addOrUpdateMedicine");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfMedicinesTypes();
  },
};
</script>

<style lang="scss"></style>
