<template>
  <b-modal id="UserChangePassword" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/changePassword.svg" class="icon-lg" />
        {{ $t("changePassword") }}
      </h3>
    </template>
    <div class="row">
      <div class="form-label-group col-md-12">
        <input
          name="userPassword"
          id="userPassword"
          v-bind:type="[showPassword ? 'text' : 'password']"
          class="form-control password"
          placeholder=" "
          v-model="userPassword"
          maxlength="30"
        />
        <label for="userPassword">{{ $t("password") }}</label>
        <img src="@/assets/images/passwordlock.svg" />
        <span class="toggle-password">
          <img
            :src="
              require('@/assets/images/eye-' +
                [showPassword ? 'show' : 'hide'] +
                '.svg')
            "
            @click="showPassword = !showPassword"
          />
        </span>
      </div>

      <div class="form-label-group col-md-12">
        <input
          name="userPasswordConfirm"
          id="userPasswordConfirm"
          v-bind:type="[showPasswordConfirm ? 'text' : 'password']"
          class="form-control password"
          placeholder=" "
          v-model="userPasswordConfirm"
          maxlength="30"
        />
        <label for="userPasswordConfirm">{{ $t("passwordConfirm") }}</label>
        <img src="@/assets/images/passwordlock.svg" />
        <span class="toggle-password">
          <img
            :src="
              require('@/assets/images/eye-' +
                [showPasswordConfirm ? 'show' : 'hide'] +
                '.svg')
            "
            @click="showPasswordConfirm = !showPasswordConfirm"
          />
        </span>
      </div>
    </div>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeUserPassword"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('UserChangePassword')"
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
  name: "UserChangePassword",
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
      userPassword: "",
      userPasswordConfirm: "",
      showPassword: false,
      showPasswordConfirm: false,
    };
  },
  methods: {
    async changeUserPassword() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        userToken: this.$store.getters.userData.userPersonalData.userToken,
        userPassword: this.userPassword,
      };

      if (this.userPassword !== this.userPasswordConfirm) {
        this.showMsg(this.$t("twoPasswordsDoesNotMatched"));
      } else {
        try {
          const response = await axios.post(`/Users//ChangeUserPassword`, data);
          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.$bvModal.hide("UserChangePassword");
            this.$emit("logout");
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
      }
      this.isLoading = false;
    },
  },
  props: [],
  computed: {},
};
</script>

<style scoped lang="scss"></style>
