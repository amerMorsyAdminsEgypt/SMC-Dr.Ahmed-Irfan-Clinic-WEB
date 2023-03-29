<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <DoctorNoteForm
      v-if="!isLoading"
      v-on:addOrUpdateDoctorNote="addDoctorNote()"
      :doctorNoteData="doctorNoteData"
      :submitName="$t('add')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DoctorNoteForm from "@/components/historicalPlans/doctorNotes/DoctorNoteForm.vue";
import DoctorNote from "@/models/historicalPlans/doctorNotes/DoctorNote";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "DoctorNoteAdd",
  mixins: [createToastMixin],
  props: ["clientToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    DoctorNoteForm,
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
      doctorNoteData: new DoctorNote(),
    };
  },
  methods: {
    async addDoctorNote() {
      this.isLoading = true;
      try {
        let response = await this.doctorNoteData.addOrUpdateDoctorNote(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.doctorNoteData.setInitialValue();
          this.setFilter();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    setFilter() {
      this.doctorNoteData.clientToken = this.clientToken
        ? this.clientToken
        : "";
    },
  },
  async created() {
    this.setFilter();
  },
};
</script>

<style scoped lang="scss"></style>
