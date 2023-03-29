<template>
  <nav class="navbar-login">
    <!-- <span class="logo-icon" :title="$t('projectName')">
      <img src="@/assets/images/logo.png" class="logo" />
    </span> -->
    <div class="project-name">
      <router-link to="/">
        <img src="@/assets/images/logo.png" />
        <h3>{{ $t("projectName") }}</h3>
      </router-link>
    </div>
    <div class="login-icon">
      <router-link to="/login" class="nav-link">
        {{ $t("login") }}
      </router-link>
    </div>
    <div class="lang-icon">
      <button v-if="language == 'en'" @click="changeLanguage('ar')">
        <img src="@/assets/images/lang-ar.svg" />
      </button>
      <button v-if="language == 'ar'" @click="changeLanguage('en')">
        <img src="@/assets/images/lang-en.svg" />
      </button>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavbarLogin",
  data() {
    return {
      isLoading: false,
      language: localStorage.getItem("userLanguage") || "ar",
      theme: localStorage.getItem("userTheme") || "dark",
    };
  },
  methods: {
    // changeLanguage(lang) {
    //   localStorage.setItem("userLanguage", lang);
    //   window.location.reload();
    // },
    changeLanguage(lang) {
      this.isLoading = true;
      localStorage.setItem("userLanguage", lang);
      window.location.reload();
    },
    changeTheme(theme) {
      localStorage.setItem("userTheme", theme);
      window.location.reload();
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
};
</script>

<style lang="scss"></style>
