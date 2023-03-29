<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <MedicinesTypeForm
      v-if="!isLoading"
      :medicinesTypeData="medicinesTypeData"
      :submitName="$t('add')"
      v-on:addOrUpdateMedicinesType="addOrUpdateMedicinesType"
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
  name: "MedicinesTypeAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MedicinesTypeForm,
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

      medicinesTypeData: new MedicinesType(),
    };
  },
  methods: {
    async addOrUpdateMedicinesType() {
      this.isLoading = true;
      try {
        let response = await this.medicinesTypeData.addOrUpdateMedicinesType(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.medicinesTypeData.setInitialValue();
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
  async created() {},
};
</script>

<style scoped lang="scss"></style>
