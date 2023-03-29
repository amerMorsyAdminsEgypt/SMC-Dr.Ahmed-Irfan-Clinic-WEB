<template>
  <div class="limiter">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="@/assets/images/illustrator-login.svg" alt="IMG" />
        </div>

        <form
          class="login100-form validate-form"
          method="post"
          @submit.prevent="loginSubmit"
        >
          <div class="container-logo">
            <img src="@/assets/images/logo.png" alt="LOGO" class="logo" />
          </div>

          <div
            class="form-label-group validate-input"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input
              name="userNameOrPhoneOrEmail"
              id="userNameOrPhoneOrEmail"
              type="text"
              class="form-control"
              placeholder=" "
              maxlength="20"
              v-model="userNameOrPhoneOrEmail"
            />
            <label for="userNameOrPhoneOrEmail">
              {{ $t("userNameOrPhoneOrEmail") }}
            </label>
            <img src="@/assets/images/man.svg" />
          </div>

          <div
            class="form-label-group validate-input"
            data-validate="Password is required"
          >
            <input
              name="userPassword"
              id="userPassword"
              v-bind:type="[showPassword ? 'text' : 'password']"
              class="form-control password"
              placeholder=" "
              v-model="password"
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

          <div class="rememberMe-forgotPassword">
            <!-- <div class="form-group">
              <input
                type="checkbox"
                value="1"
                id="rememberMe"
                class="form-check-input"
              />
              <label for="rememberMe" class="form-check-label">
                {{ $t("rememberMe") }}
              </label>
            </div> -->
            <!-- <div class="forget-password">
              <router-link to="/forget-password" class="nav-link">
                {{ $t("forgotPassword") }}
              </router-link>
            </div> -->
          </div>

          <div class="container-login100-form-btn">
            <button name="login" type="submit" class="login100-form-btn">
              {{ $t("login") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, USER_VERSION } from "@/utils/constants";
import { numberToEn } from "@/utils/functions";
// import { EMPLOYEE_TYPE } from "@/utils/constantLists";
import axios from "axios";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "LoginForm",
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
      userNameOrPhoneOrEmail: "",
      password: "",
      showPassword: false,
      filedType: "password",
    };
  },
  methods: {
    async loginSubmit() {
      this.isLoading = true;
      const data = {
        language: this.language,
        user: numberToEn(this.userNameOrPhoneOrEmail),
        userPassword: this.password,
        userPlatFormToken: USER_VERSION.userPlatFormToken,
        userFirebaseToken: USER_VERSION.userFirebaseToken,
        userVersionNumber: USER_VERSION.userVersionNumber,
        deviceNameEn: USER_VERSION.deviceNameEn,
        deviceVersion: USER_VERSION.deviceVersion,
      };
      try {
        const response = await axios.post(`/Users/EmployeeLogin`, data);
        if (response.data.status == STATUS.SUCCESS) {
          // if (
          //   response.data.employeeProfileData.employeePersonalData
          //     .employeeTypeToken == EMPLOYEE_TYPE.Admin ||
          //   response.data.employeeProfileData.employeePersonalData
          //     .employeeTypeToken == EMPLOYEE_TYPE.FounderOfSystem
          // ) {
          this.showMsg(response.data.msg, true);
          this.$store.dispatch(
            "updateUserData",
            response.data.employeeProfileData
          );
          this.$router.push("/news");
          // } else {
          //   this.showMsg(
          //     this.$t("youDoNotHaveThisPermissionPleaseContactTheManagement")
          //   );
          // }
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    togglePassword() {
      if (this.filedType === "password") {
        this.filedType = "text";
      } else {
        this.filedType = "password";
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss"></style>
