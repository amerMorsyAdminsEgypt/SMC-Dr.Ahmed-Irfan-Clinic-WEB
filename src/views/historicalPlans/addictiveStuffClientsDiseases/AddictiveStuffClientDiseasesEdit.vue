<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <AddictiveStuffClientForm
      v-if="!isLoading"
      v-on:addOrUpdateAddictiveStuffClient="updateAddictiveStuffClient()"
      :addictiveStuffClientData="addictiveStuffClientData"
      :submitName="$t('edit')"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import AddictiveStuffClientForm from "@/components/historicalPlans/addictiveStuffClients/AddictiveStuffClientForm.vue";
import AddictiveStuffClient from "@/models/historicalPlans/addictiveStuffClients/AddictiveStuffClient";
import createToastMixin from "@/utils/create-toast-mixin";
import { ADDICTIVESTUFFS_TYPE_TOKENS } from "@/utils/constantLists";

export default {
  name: "AddictiveStuffClientDiseasesEdit",
  mixins: [createToastMixin],
  props: ["clientToken", "addictiveStuffClientToken"],
  components: {
    PreLoader,
    ExceptionWithImg,
    AddictiveStuffClientForm,
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
      addictiveStuffClientData: new AddictiveStuffClient(),
      addictiveStuffTypeToken: ADDICTIVESTUFFS_TYPE_TOKENS.Diseases,
    };
  },
  methods: {
    async getAddictiveStuffClientDetalis() {
      this.isLoading = true;
      try {
        let response =
          await this.addictiveStuffClientData.getAddictiveStuffClientDetalis(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.addictiveStuffClientData.fillData(
            response.data.addictiveStuffClientData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.addictiveStuffClientData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.addictiveStuffClientData = null;
      }
      this.isLoading = false;
    },
    async updateAddictiveStuffClient() {
      this.isLoading = true;
      try {
        let response =
          await this.addictiveStuffClientData.addOrUpdateAddictiveStuffClient(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router
            .push({ name: "AddictiveStuffClientsDiseases" })
            .catch(() => {});
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
      this.addictiveStuffClientData.clientToken = this.clientToken
        ? this.clientToken
        : "";
      this.addictiveStuffClientData.addictiveStuffClientToken = this
        .addictiveStuffClientToken
        ? this.addictiveStuffClientToken
        : "";
      this.addictiveStuffClientData.addictiveStuffTypeToken = this
        .addictiveStuffTypeToken
        ? this.addictiveStuffTypeToken
        : "";
    },
  },
  async created() {
    this.setFilter();
    this.getAddictiveStuffClientDetalis();
  },
};
</script>

<style scoped lang="scss"></style>
