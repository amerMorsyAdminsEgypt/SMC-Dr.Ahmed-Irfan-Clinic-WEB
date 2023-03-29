<template>
  <b-modal
    id="WaitForComeBackServicesReservation"
    scrollable
    centered
    hide-footer
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/waiting-back.svg" class="icon-lg" />
        {{ $t("waitForComeBackServicesReservation") }}
      </h3>
    </template>
    <form autocomplete="off" method="post">
      <div class="row">
        <TextArea
          :className="'col-md-12'"
          :id="'note'"
          :value="servicesReservationData.note"
          :title="$t('notes')"
          :imgName="'notes.svg'"
          v-on:changeValue="servicesReservationData.note = $event"
        />
      </div>
      <div class="modal-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="waitForComeBackServicesReservation"
        >
          {{ $t("ok") }}
        </button>
        <button
          name="submit"
          type="submit"
          class="btn btn-cancel"
          @click.prevent="$bvModal.hide('WaitForComeBackServicesReservation')"
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
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WaitForComeBackServicesReservation",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TextArea,
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
    async waitForComeBackServicesReservation() {
      this.isLoading = true;
      try {
        let response =
          await this.servicesReservationData.waitForComeBackServicesReservation(
            this.language,
            this.userAuthorizeToken
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("WaitForComeBackServicesReservation");
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
  props: ["servicesReservationData"],
  computed: {},
  async created() {},
};
</script>

<style scoped lang="scss"></style>
