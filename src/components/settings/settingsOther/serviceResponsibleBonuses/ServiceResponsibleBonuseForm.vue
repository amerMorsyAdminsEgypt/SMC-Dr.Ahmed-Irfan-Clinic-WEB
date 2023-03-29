<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateServiceResponsibleBonuse()"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'serviceResponsibleBonuseCode'"
            :value="serviceResponsibleBonuseData.serviceResponsibleBonuseCode"
            v-on:changeValue="
              serviceResponsibleBonuseData.serviceResponsibleBonuseCode = $event
            "
            :title="$t('code')"
            :imgName="'code.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'serviceResponsibleBonuseNote'"
            :value="serviceResponsibleBonuseData.serviceResponsibleBonuseNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="
              serviceResponsibleBonuseData.serviceResponsibleBonuseNote = $event
            "
          />
        </div>

        <div
          v-if="
            serviceResponsibleBonuseData.serviceResponsibleBonusesDetailsData
          "
        >
          <div
            class="my-card"
            v-for="(
              slice, index
            ) in serviceResponsibleBonuseData.serviceResponsibleBonusesDetailsData"
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
                :id="`serviceResponsibleBonusesDetailsData[${index}][serviceToken]`"
                :options="serviceTokenOptions"
                :value="slice.serviceToken"
                v-on:changeValue="slice.serviceToken = $event"
                :title="$t('selectService')"
                :imgName="'services.svg'"
              />
              <CustomInputFloat
                :className="'col-md-6'"
                :id="`serviceResponsibleBonusesDetailsData[${index}][discountPercentage]`"
                :value="slice.discountPercentage"
                v-on:changeValue="slice.discountPercentage = $event"
                :title="$t('serviceResponsibleBonuses.discountPercentage')"
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
            name: 'ServiceResponsibleBonuses',
            params: { employeeToken: employeeToken },
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
import ServiceResponsibleBonusesDetailsData from "@/models/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonusesDetailsData";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import CustomInputFloat from "@/components/general/CustomInputFloat.vue";
import TextArea from "@/components/general/TextArea.vue";
import axios from "axios";
import { STATUS } from "@/utils/constants";

export default {
  name: "ServiceResponsibleBonuseForm",
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
  props: ["serviceResponsibleBonuseData", "submitName", "employeeToken"],
  methods: {
    addSlice() {
      this.serviceResponsibleBonuseData.serviceResponsibleBonusesDetailsData.push(
        new ServiceResponsibleBonusesDetailsData()
      );
    },
    removeSlice(index) {
      this.serviceResponsibleBonuseData.serviceResponsibleBonusesDetailsData.splice(
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

    async addOrUpdateServiceResponsibleBonuse() {
      this.$emit("addOrUpdateServiceResponsibleBonuse");
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
