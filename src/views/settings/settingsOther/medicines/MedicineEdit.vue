<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicineForm
      v-if="!isLoading"
      :medicineData="medicineData"
      :submitName="$t('edit')"
      v-on:addOrUpdateMedicine="updateMedicine"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicineForm from "@/components/settings/settingsOther/medicines/MedicineForm.vue";
import Medicine from "@/models/settings/settingsOther/medicines/Medicine";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicineEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicineForm,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      medicineData: new Medicine(),
      medicineToken: this.$route.params.medicineToken,
    };
  },
  methods: {
    async getMedicineDetails() {
      this.isLoading = true;
      this.medicineData.medicineToken = this.medicineToken;
      try {
        let response = await this.medicineData.getMedicineDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.medicineData.fillData(response.data.medicinesData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.medicineData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.medicineData = null;
      }
      this.isLoading = false;
    },
    async updateMedicine() {
      this.isLoading = true;
      try {
        let response = await this.medicineData.addOrUpdateMedicine(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/medicines");
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
  },
  async created() {
    this.getMedicineDetails();
  },
};
</script>

<style scoped lang="scss"></style>
