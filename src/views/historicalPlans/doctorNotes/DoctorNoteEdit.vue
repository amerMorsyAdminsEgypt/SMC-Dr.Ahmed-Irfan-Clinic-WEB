<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <DoctorNoteForm
      v-if="!isLoading"
      v-on:addOrUpdateDoctorNote="updateDoctorNote()"
      :doctorNoteData="doctorNoteData"
      :submitName="$t('edit')"
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
  name: "DoctorNoteEdit",
  mixins: [createToastMixin],
  props: ["clientToken", "doctorNoteToken"],
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
    async getDoctorNoteDetails() {
      this.isLoading = true;
      try {
        let response = await this.doctorNoteData.getDoctorNoteDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.doctorNoteData.fillData(response.data.doctorNoteData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.doctorNoteData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.doctorNoteData = null;
      }
      this.isLoading = false;
    },
    async updateDoctorNote() {
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
      this.doctorNoteData.doctorNoteToken = this.doctorNoteToken
        ? this.doctorNoteToken
        : "";
    },
  },
  async created() {
    this.setFilter();
    this.getDoctorNoteDetails();
  },
};
</script>

<style scoped lang="scss"></style>
