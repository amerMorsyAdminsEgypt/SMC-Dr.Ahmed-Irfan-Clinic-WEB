<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <input
              name="qualificationNameAr"
              id="qualificationNameAr"
              type="text"
              v-model="qualificationData.qualificationNameAr"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="qualificationNameAr">{{
              $t("qualificationNameAr")
            }}</label>
            <img src="@/assets/images/qualifications.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <input
              name="qualificationNameEn"
              id="qualificationNameEn"
              type="text"
              v-model="qualificationData.qualificationNameEn"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="qualificationNameEn">{{
              $t("qualificationNameEn")
            }}</label>
            <img src="@/assets/images/qualifications.svg" />
          </div>
          <TextArea
            :className="'col-md-12'"
            :id="'qualificationNotes'"
            :value="qualificationData.qualificationNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="qualificationData.qualificationNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateQualification"
        >
          {{ submitName }}
        </button>
        <router-link to="/qualifications" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "QualificationForm",
  components: {
    TextArea,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["qualificationData", "submitName"],
  methods: {
    async addOrUpdateQualification() {
      this.$emit("addOrUpdateQualification");
    },
  },
};
</script>

<style scoped lang="scss"></style>
