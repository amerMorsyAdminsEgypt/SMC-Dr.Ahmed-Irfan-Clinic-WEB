<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <EmployeesSliceForm
      v-if="!isLoading"
      :sliceData="sliceData"
      :submitName="$t('add')"
      v-on:addOrUpdateEmployeesMoveSlides="addEmployeesMoveSlides()"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import EmployeesSliceForm from "@/components/slices/EmployeesSliceForm.vue";

export default {
  name: "EmployeeSlicesAdd",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeesSliceForm,
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
      sliceData: {
        employeeToken: this.$route.params.employeeToken,
        moveSlidesNote: "",
        activationStatus: true,
        employeesMoveSlidesDetailsData: [
          {
            moveSlidDetailsFrom: 0,
            moveSlidDetailsTo: "",
            moveSlidDetailsPrice: "",
            moveSlidDetailsNote: "",
          },
        ],
      },
    };
  },
  methods: {
    async addEmployeesMoveSlides() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        employeeToken: this.sliceData.employeeToken,
        moveSlidesNote: this.sliceData.moveSlidesNote,
        activationStatus: this.sliceData.activationStatus,
        employeesMoveSlidesDetailsData:
          this.sliceData.employeesMoveSlidesDetailsData,
      };

      try {
        const response = await axios.post(
          `/EmployeesMoveSlides//AddEmployeesMoveSlides`,
          data
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/employee-slices/" + this.sliceData.employeeToken);
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
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
