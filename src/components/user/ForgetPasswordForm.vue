<template>
  <div class="limiter">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img
            src="@/assets/images/illustrator-forgot-password.svg"
            alt="IMG"
          />
        </div>

        <form
          v-if="sendOtpStatus"
          class="login100-form validate-form"
          method="post"
          @submit.prevent="checkEmployee"
        >
          <div class="container-logo">
            <img src="@/assets/images/logo.png" alt="LOGO" class="logo" />
          </div>

          <div class="form-label-group">
            <input
              name="userPhoneOrEmail"
              id="userPhoneOrEmail"
              type="text"
              class="form-control"
              placeholder=" "
              maxlength="20"
              v-model="userPhoneOrEmail"
            />
            <label for="userPhoneOrEmail">
              {{ $t("userPhoneOrEmail") }}
            </label>
            <img src="@/assets/images/man.svg" />
          </div>
          <div id="recaptcha-container"></div>

          <div class="container-login100-form-btn">
            <button
              name="sendConfirmCode"
              type="submit"
              class="login100-form-btn"
            >
              {{ $t("sendConfirmCode") }}
            </button>
          </div>
        </form>

        <form
          v-if="verifyOtpStatus"
          class="login100-form validate-form"
          method="post"
          @submit.prevent="verifyOtp"
        >
          <div class="container-logo">
            <img src="@/assets/images/logo.png" alt="LOGO" class="logo" />
          </div>

          <div class="form-label-group">
            <input
              name="verificationCode"
              id="verificationCode"
              type="text"
              class="form-control"
              placeholder=" "
              maxlength="20"
              v-model="verificationCode"
            />
            <label for="verificationCode">
              {{ $t("verificationCode") }}
            </label>
            <img src="@/assets/images/verification-code.svg" />
          </div>

          <div class="container-login100-form-btn">
            <button name="confirm" type="submit" class="login100-form-btn">
              {{ $t("confirm") }}
            </button>
          </div>
        </form>

        <form
          v-if="changePasswordStatus"
          class="login100-form validate-form"
          method="post"
          @submit.prevent="changeUserPassword"
        >
          <div class="container-logo">
            <img src="@/assets/images/logo.png" alt="LOGO" class="logo" />
          </div>

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

          <div class="container-login100-form-btn">
            <button name="change" type="submit" class="login100-form-btn">
              {{ $t("confirm") }}
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
import { STATUS } from "@/utils/constants";
import { validEmail, validNumber } from "@/utils/functions";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ForgetPasswordForm",
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
      userPhoneOrEmail: "",
      appVerifier: "",
      verificationCode: "",
      sendOtpStatus: true,
      verifyOtpStatus: false,
      changePasswordStatus: false,
      userToken: "",
      userPassword: "",
      userPasswordConfirm: "",
      showPassword: false,
      showPasswordConfirm: false,
    };
  },
  methods: {
    async checkEmployee() {
      this.isLoading = true;
      const data = {
        language: this.language,
        user: this.userPhoneOrEmail,
      };
      if (!data.user || (!validEmail(data.user) && !validNumber(data.user))) {
        this.showMsg(this.$t("pleaseInsertPhoneOrEmailRight"));
      } else {
        try {
          const response = await axios.post(`/Users//CheckEmployee`, data);
          if (response.data.status == STATUS.SUCCESS) {
            this.userToken =
              response.data.employeeProfileData.userPersonalData.userToken;
            if (validNumber(data.user)) {
              this.sendOtp(
                response.data.employeeProfileData.employeePersonalData
                  .employeePhoneWithCC
              );
            }
            // this.$router.push("/employees");
          } else {
            this.userToken = "";
            this.showMsg(response.data.msg);
          }
        } catch (e) {
          this.userToken = "";
          this.showMsg(this.$t("errorCatch"));
        }
      }
      this.isLoading = false;
    },
    async changeUserPassword() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userToken: this.userToken,
        userPassword: this.userPassword,
      };

      if (this.userPassword !== this.userPasswordConfirm) {
        this.showMsg(this.$t("twoPasswordsDoesNotMatched"));
      } else {
        try {
          const response = await axios.post(`/Users//ChangeUserPassword`, data);
          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.$router.push("/login").catch(() => {});
          } else {
            this.showMsg(response.data.msg);
          }
        } catch (e) {
          this.showMsg(this.$t("errorCatch"));
        }
      }
      this.isLoading = false;
    },
    async sendOtp(userPhone) {
      let appVerifier = this.appVerifier;
      try {
        const response = await firebase
          .auth()
          .signInWithPhoneNumber(userPhone, appVerifier);
        console.log(response);
        window.confirmationResult = response.verificationId;
        this.sendOtpStatus = false;
        this.verifyOtpStatus = true;
        this.changePasswordStatus = false;
      } catch (e) {
        this.userToken = "";
        this.sendOtpStatus = true;
        this.verifyOtpStatus = false;
        this.changePasswordStatus = false;
        this.showMsg(this.$t("errorCatch"));
      }

      // .then(function (confirmationResult) {
      //   // SMS sent. Prompt user to type the code from the message, then sign the
      //   // user in with confirmationResult.confirm(code).
      //   window.confirmationResult = confirmationResult;
      //   // this.showMsg(this.$t("success"));
      //   this.sendStatus = true;
      // })
      // .catch(function (error) {
      //   console.log(error.message);
      //   // this.showMsg(error.message);
      // });
    },
    async verifyOtp() {
      let code = this.verificationCode;
      window.confirmationResult
        .confirm(code)
        .then(function (result) {
          // User signed in successfully.
          var user = result.user;
          console.log(user);
          this.sendOtpStatus = false;
          this.verifyOtpStatus = false;
          this.changePasswordStatus = true;
        })
        .catch(function (error) {
          this.showMsg(error);
        });
    },
    initReCaptcha() {
      setTimeout(() => {
        // let vm = this;
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function () {
              // callback: function (response) {
              // console.log(response);
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function () {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  async created() {
    // SITE_KEY 6Lef_r0bAAAAACCqt-2UDVg1MqI0LIXPweLY4jVn
    // SECRET_KEY 6Lef_r0bAAAAAKojtWirhzD4U-8G45zoowbsE56X
    this.initReCaptcha();
  },
};
</script>
