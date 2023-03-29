<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addRevenue">
      <div class="row">
        <div
          class="imgView"
          :style="{ 'background-image': `url(${imageSrc})` }"
          :onerror="`this.src='${defaultImg}'`"
          alt="Image"
          @click="selectImage"
        ></div>
        <!-- @input="pickFile" -->
        <input
          ref="fileInput"
          type="file"
          v-on:change="pickFile"
          class="d-none"
          accept=".jpg, .jpeg, .png"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="revenueData.revenuesTypeToken"
              :options="revenuesTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/revenues-types.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="revenueData.treasuryToken"
              :options="treasuryTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/treasuries.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="revenueData.branchToken"
              :options="branchTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/branches.svg" />
          </div>
          <DatePicker
            :className="'col-md-6'"
            :id="'revenuesDatePayed'"
            :value="revenueData.revenuesDatePayed"
            :title="$t('date')"
            :language="language"
            v-on:changeValue="revenueData.revenuesDatePayed = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'revenuesMoneyValue'"
            :value="revenueData.revenuesMoneyValue"
            :title="$t('money')"
            :imgName="'money.svg'"
            v-on:changeValue="revenueData.revenuesMoneyValue = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'revenuesNotes'"
            :value="revenueData.revenuesNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="revenueData.revenuesNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/revenues" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DEFAULT_IMG_REVENUE from "@/assets/images/revenues.svg";
import axios from "axios";
import DatePicker from "@/components/general/DatePicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "RevenueForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    DatePicker,
    CustomInput,
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
      defaultImg: DEFAULT_IMG_REVENUE,
      revenuesTypeTokenOptions: [],
      treasuryTokenOptions: [],
      branchTokenOptions: [],
    };
  },
  props: ["revenueData", "imageSrc", "submitName"],
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        this.revenueData.image = file[0];
      } else {
        this.imageSrc = DEFAULT_IMG_REVENUE;
        this.revenueData.image = "";
      }
    },
    async getDialogOfRevenuesTypes() {
      this.isLoading = true;
      this.revenuesTypeTokenOptions = [];
      this.revenuesTypeTokenOptions.push({
        value: "",
        text: this.$t("selectRevenueType"),
      });
      try {
        const response = await axios.get(
          `/RevenuesTypes/GetDialogOfRevenuesTypes?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.revenuesTypeTokenOptions.push({
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
    async getDialogOfTreasuries() {
      this.isLoading = true;
      this.treasuryTokenOptions = [];
      this.treasuryTokenOptions.push({
        value: "",
        text: this.$t("selectTreasury"),
      });
      try {
        const response = await axios.get(
          `/Treasuries/GetDialogOfTreasuries?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.treasuryTokenOptions.push({
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
    async getDialogOfBranches() {
      this.isLoading = true;
      this.branchTokenOptions = [];
      this.branchTokenOptions.push({
        value: "",
        text: this.$t("selectBranch"),
      });
      try {
        const response = await axios.get(
          `/Branches/GetDialogOfBranches?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.branchTokenOptions.push({
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
    async addRevenue() {
      this.$emit("addRevenue");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfRevenuesTypes();
    this.getDialogOfTreasuries();
    this.getDialogOfBranches();
  },
};
</script>

<style lang="scss"></style>
