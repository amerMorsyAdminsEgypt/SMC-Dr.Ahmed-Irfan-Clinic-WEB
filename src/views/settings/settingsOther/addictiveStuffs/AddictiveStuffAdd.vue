<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AddictiveStuffForm
      v-if="!isLoading"
      :addictiveStuffData="addictiveStuffData"
      :submitName="$t('add')"
      v-on:addOrUpdateAddictiveStuff="addOrUpdateAddictiveStuff"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AddictiveStuffForm from "@/components/settings/settingsOther/addictiveStuffs/AddictiveStuffForm.vue";
import AddictiveStuff from "@/models/settings/settingsOther/addictiveStuffs/AddictiveStuff";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "AddictiveStuffAdd",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AddictiveStuffForm,
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

      addictiveStuffData: new AddictiveStuff(),
    };
  },
  methods: {
    async addOrUpdateAddictiveStuff() {
      this.isLoading = true;
      try {
        let response = await this.addictiveStuffData.addOrUpdateAddictiveStuff(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.addictiveStuffData.setInitialValue();
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
