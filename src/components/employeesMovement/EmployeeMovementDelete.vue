<template>
  <b-modal id="EmployeeMovementDelete" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDelete") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="finalDeleteEmployeesMovement"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('EmployeeMovementDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeeMovementDelete",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
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
    async finalDeleteEmployeesMovement() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        movementToken: this.movementData.movementToken,
      };

      try {
        const response = await axios.post(
          `/EmployeesMovement//FinalDeleteEmployeesMovement`,
          data
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("EmployeeMovementDelete");
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
  props: ["movementData"],
  computed: {},
};
</script>

<style scoped lang="scss"></style>
