<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateWorkPlan"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'workPlanNameAr'"
            :value="workPlanData.workPlanNameAr"
            :title="$t('nameAr')"
            :imgName="'work-plans.svg'"
            v-on:changeValue="workPlanData.workPlanNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'workPlanNameEn'"
            :value="workPlanData.workPlanNameEn"
            :title="$t('nameEn')"
            :imgName="'work-plans.svg'"
            v-on:changeValue="workPlanData.workPlanNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'workPlanNameUnd'"
            :value="workPlanData.workPlanNameUnd"
            :title="$t('nameUnd')"
            :imgName="'work-plans.svg'"
            v-on:changeValue="workPlanData.workPlanNameUnd = $event"
          />

          <TextArea
            :className="'col-md-6'"
            :id="'workPlanNotes'"
            :value="workPlanData.workPlanNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="workPlanData.workPlanNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/work-plans" class="btn btn-cancel">
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
  name: "WorkPlanDayForm",
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
    };
  },
  props: ["workPlanData", "submitName"],
  methods: {
    async addOrUpdateWorkPlan() {
      this.$emit("addOrUpdateWorkPlan");
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
