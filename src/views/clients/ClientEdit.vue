<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ClientForm
      v-if="!isLoading"
      :clientData="clientData"
      :imageSrc="imageSrc"
      :submitName="$t('edit')"
      v-on:addOrUpdateClient="updateClient"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG_CLIENT from "@/assets/images/clients.svg";
// import { date2slash, date2dash, timeTo12, timeTo24 } from "@/utils/functions";
import ClientForm from "@/components/clients/ClientForm.vue";
import Client from "@/models/clients/Client";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ClientEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ClientForm,
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
      imageSrc: DEFAULT_IMG_CLIENT,
      clientData: new Client(),
      clientToken: this.$route.params.clientToken,
    };
  },
  methods: {
    async getClientDetails() {
      this.isLoading = true;
      this.clientData.clientToken = this.clientToken;
      try {
        let response = await this.clientData.getClientDetails(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.clientData.fillData(response.data.clientData);
          this.clientData.image = "";
          this.imageSrc = BASE_URL + this.clientData.clientImagePath;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.clientData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.clientData = null;
      }
      this.isLoading = false;
    },
    async updateClient() {
      this.isLoading = true;
      try {
        let response = await this.clientData.addOrUpdateClient(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router.push("/clients");
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
    this.getClientDetails();
  },
};
</script>

<style scoped lang="scss"></style>
