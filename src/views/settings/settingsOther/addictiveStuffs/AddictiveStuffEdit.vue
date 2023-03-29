<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AddictiveStuffForm
      v-if="!isLoading"
      :addictiveStuffData="addictiveStuffData"
      :submitName="$t('edit')"
      v-on:addOrUpdateAddictiveStuff="updateAddictiveStuff"
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
  name: "AddictiveStuffEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    AddictiveStuffForm,
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
      addictiveStuffData: new AddictiveStuff(),
      addictiveStuffToken: this.$route.params.addictiveStuffToken,
    };
  },
  methods: {
    async getAddictiveStuffDetails() {
      this.isLoading = true;
      this.addictiveStuffData.addictiveStuffToken = this.addictiveStuffToken;
      try {
        let response = await this.addictiveStuffData.getAddictiveStuffDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.addictiveStuffData.fillData(response.data.addictiveStuffData);
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.addictiveStuffData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.addictiveStuffData = null;
      }
      this.isLoading = false;
    },
    async updateAddictiveStuff() {
      this.isLoading = true;
      try {
        let response = await this.addictiveStuffData.addOrUpdateAddictiveStuff(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push({ name: "AddictiveStuffs" });
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
    this.getAddictiveStuffDetails();
  },
};
</script>

<style scoped lang="scss"></style>
