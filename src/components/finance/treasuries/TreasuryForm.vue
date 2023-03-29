<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateTreasury"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="treasuryData.branchToken"
              :options="branchTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/branches.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="'treasuryNameAr'"
            :value="treasuryData.treasuryNameAr"
            :title="$t('treasuryNameAr')"
            :imgName="'treasuries.svg'"
            v-on:changeValue="treasuryData.treasuryNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'treasuryNameEn'"
            :value="treasuryData.treasuryNameEn"
            :title="$t('treasuryNameEn')"
            :imgName="'treasuries.svg'"
            v-on:changeValue="treasuryData.treasuryNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'treasuryNameUnd'"
            :value="treasuryData.treasuryNameUnd"
            :title="$t('treasuryNameUnd')"
            :imgName="'treasuries.svg'"
            v-on:changeValue="treasuryData.treasuryNameUnd = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'treasuryCode'"
            :value="treasuryData.treasuryCode"
            :title="$t('treasuryCode')"
            :imgName="'number.svg'"
            v-on:changeValue="treasuryData.treasuryCode = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'treasuryNote'"
            :value="treasuryData.treasuryNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="treasuryData.treasuryNote = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/treasuries" class="btn btn-cancel">
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
import DEFAULT_IMG from "@/assets/images/treasuries.svg";
import axios from "axios";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "TreasuryForm",
  components: {
    PreLoader,
    ExceptionWithImg,
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
      defaultImg: DEFAULT_IMG,
      branchTokenOptions: [],
    };
  },
  props: ["treasuryData", "submitName"],
  methods: {
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
    async addOrUpdateTreasury() {
      this.$emit("addOrUpdateTreasury");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfBranches();
  },
};
</script>

<style lang="scss"></style>
