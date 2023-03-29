<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <ServiceResponsibleBonuseForm
      v-if="!isLoading"
      :employeeToken="employeeToken"
      :serviceResponsibleBonuseData="serviceResponsibleBonuseData"
      :submitName="$t('edit')"
      v-on:addOrUpdateServiceResponsibleBonuse="updateServiceResponsibleBonuse"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import ServiceResponsibleBonuseForm from "@/components/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonuseForm.vue";
import ServiceResponsibleBonuse from "@/models/settings/settingsOther/serviceResponsibleBonuses/ServiceResponsibleBonuse";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServiceResponsibleBonuseEdit",
  props: {
    employeeToken: {
      type: String,
      default: "",
    },
  },
  watch: {
    employeeToken(val) {
      let employeeToken = val || this.$route.params.employeeToken;
      if (!employeeToken) {
        this.exceptionMsg = this.$t("insuranceCompanies.select");
        this.$router
          .push({ name: "ServiceResponsibleBonuses" })
          .catch(() => {});
        this.isLoading = false;
      }
    },
  },
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    ServiceResponsibleBonuseForm,
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
      serviceResponsibleBonuseData: new ServiceResponsibleBonuse(),
      serviceResponsibleBonuseToken:
        this.$route.params.serviceResponsibleBonuseToken,
    };
  },
  methods: {
    async getServiceResponsibleBonuseDetails() {
      this.isLoading = true;
      this.serviceResponsibleBonuseData.employeeToken = this.employeeToken;
      try {
        let response =
          await this.serviceResponsibleBonuseData.getServiceResponsibleBonuseDetails(
            this.language,
            this.userAuthorizeToken
          );
        if (
          response.data.status == STATUS.SUCCESS ||
          response.data.status == STATUS.NO_CONTENT
        ) {
          this.serviceResponsibleBonuseData.fillData(
            response.data.serviceResponsibleBonusesData
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
          this.serviceResponsibleBonuseData = null;
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.serviceResponsibleBonuseData = null;
      }
      this.isLoading = false;
    },
    async updateServiceResponsibleBonuse() {
      this.serviceResponsibleBonuseData.employeeToken = this.employeeToken;
      this.isLoading = true;
      try {
        let response =
          await this.serviceResponsibleBonuseData.updateServiceResponsibleBonuse(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$router
            .push({
              name: "ServiceResponsibleBonuses",
              params: {
                employeeToken: this.employeeToken,
              },
            })
            .catch(() => {});
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        console.log(e);
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {
    let employeeToken = this.employeeToken || this.$route.params.employeeToken;
    if (!employeeToken) {
      this.exceptionMsg = this.$t("insuranceCompanies.select");
      this.$router.push({ name: "ServiceResponsibleBonuses" }).catch(() => {});
      this.isLoading = false;
    }
    this.getServiceResponsibleBonuseDetails();
  },
};
</script>

<style scoped lang="scss"></style>
