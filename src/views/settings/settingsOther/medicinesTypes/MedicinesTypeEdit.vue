<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicinesTypeForm
      v-if="!isLoading"
      :medicinesTypeData="medicinesTypeData"
      :submitName="$t('edit')"
      v-on:addOrUpdateMedicinesType="updateMedicinesType"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MedicinesTypeForm from "@/components/settings/settingsOther/medicinesTypes/MedicinesTypeForm.vue";
import MedicinesType from "@/models/settings/settingsOther/medicinesTypes/MedicinesType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicinesTypeEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicinesTypeForm,
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
      medicinesTypeData: new MedicinesType(),
      medicinesTypeToken: this.$route.params.medicinesTypeToken,
    };
  },
  methods: {
    async getMedicinesTypeDetails() {
      this.isLoading = true;
      this.medicinesTypeData.medicinesTypeToken = this.medicinesTypeToken;
      try {
        let response = await this.medicinesTypeData.getMedicinesTypeDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.medicinesTypeData.fillData(response.data.medicinesTypeData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.medicinesTypeData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.medicinesTypeData = null;
      }
      this.isLoading = false;
    },
    async updateMedicinesType() {
      this.isLoading = true;
      try {
        let response = await this.medicinesTypeData.addOrUpdateMedicinesType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/medicines-types");
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
    this.getMedicinesTypeDetails();
  },
};
</script>

<style scoped lang="scss"></style>
