<template>
  <b-modal id="MedicalAlertDownload" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/pdf.svg" class="icon-lg" />
        {{ $t("viewAndSend") }}
      </h3>
    </template>

    <form autocomplete="off" method="post">
      <div class="row">
        <CustomInput
          :className="'col-md-12'"
          :id="'sendTo'"
          :value="filterMedicalAlertData.sendTo"
          v-on:changeValue="filterMedicalAlertData.sendTo = $event"
          :title="$t('email')"
          :imgName="'email.svg'"
        />
      </div>

      <div class="modal-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="downloadMedicalAlert"
        >
          {{ $t("viewAndSend") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-cancel"
          @click.prevent="$bvModal.hide('MedicalAlertDownload')"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import CustomInput from "@/components/general/CustomInput.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MedicalAlertDownload",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
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
    };
  },
  methods: {
    async downloadMedicalAlert() {
      this.isLoading = true;
      try {
        let response = await this.filterMedicalAlertData.downloadMedicalAlert(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("MedicalAlertDownload");
          this.$emit("refresh");
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
  props: ["filterMedicalAlertData"],
  computed: {},
};
</script>

<style scoped lang="scss"></style>
