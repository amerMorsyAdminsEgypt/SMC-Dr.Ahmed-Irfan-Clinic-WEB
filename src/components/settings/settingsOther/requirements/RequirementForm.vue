<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateRequirement()"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <b-form-select
              v-model="requirementData.requirementTypeToken"
              :options="requirementTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/requirement-types.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="'requirementNameAr'"
            :value="requirementData.requirementNameAr"
            :title="$t('nameAr')"
            :imgName="'requirements.svg'"
            v-on:changeValue="requirementData.requirementNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'requirementNameEn'"
            :value="requirementData.requirementNameEn"
            :title="$t('nameEn')"
            :imgName="'requirements.svg'"
            v-on:changeValue="requirementData.requirementNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'requirementNameUnd'"
            :value="requirementData.requirementNameUnd"
            :title="$t('nameUnd')"
            :imgName="'requirements.svg'"
            v-on:changeValue="requirementData.requirementNameUnd = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'requirementNote'"
            :value="requirementData.requirementNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="requirementData.requirementNote = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/requirements" class="btn btn-cancel">
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
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "RequirementForm",
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
      requirementTypeTokenOptions: [],
    };
  },
  props: ["requirementData", "submitName"],
  methods: {
    async getDialogOfRequirementTypes() {
      this.isLoading = true;
      this.requirementTypeTokenOptions = [];
      this.requirementTypeTokenOptions.push({
        value: "",
        text: this.$t("selectRequirementType"),
      });
      try {
        const itemsData =
          this.$store.getters.userData.constantLists.listRequirementType;
        if (itemsData.length > 0) {
          for (let item in itemsData) {
            this.requirementTypeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.requirementTypeTokenOptions = null;
      }
      this.isLoading = false;
    },

    async addOrUpdateRequirement() {
      this.$emit("addOrUpdateRequirement");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfRequirementTypes();
  },
};
</script>

<style lang="scss"></style>
