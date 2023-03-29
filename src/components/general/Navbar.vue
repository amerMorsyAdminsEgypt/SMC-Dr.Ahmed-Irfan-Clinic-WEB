<template>
  <nav>
    <PreLoader v-if="isLoading" />
    <input type="checkbox" id="show-menu" @click="changeMenuStatus" />
    <label for="show-menu" class="menu-icon"><i class="fa fa-bars"></i></label>
    <!-- <span class="logo-icon" :title="$t('projectName')">
      <img src="@/assets/images/logo.png" class="logo" />
    </span> -->
    <div class="page-name">
      <!-- <img src="@/assets/images/homepage.svg" /> -->
      <img :src="require('@/assets/images/' + pageIcon)" />
      <h3>{{ pageName }}</h3>
    </div>
    <div class="notifications-icon">
      <b-dropdown variant="link" no-caret @show="openAllNotifications()">
        <template #button-content>
          <img class="icon" src="@/assets/images/notifications.svg" />
          <b-badge
            v-if="notificationsCount != 0"
            variant="danger"
            class="count-notifications"
            >{{ notificationsCount }}</b-badge
          >
        </template>

        <!-- <b-dropdown-item
          v-for="(notification, index) in notificationsData"
          :key="index"
          :class="{ 'read-done': notification.statusRead == true }"
          @click="readNotification(notification)"
        >
          <h6 class="notifications-title">
            {{ isDataExist(notification.titleCurrent) }}
          </h6>
          <p class="notifications-description cut-1line">
            {{ isDataExist(notification.bodyCurrent) }}
          </p>
        </b-dropdown-item> -->

        <div v-if="notificationsData" class="dropdown-list">
          <div
            v-for="(notification, index) in notificationsData"
            :key="index"
            class="list-item"
            :class="{ 'read-done': notification.statusRead == true }"
          >
            <div
              class="list-item-content"
              @click="readNotification(notification)"
            >
              <h5 class="list-item-title cut-2line">
                <span
                  class="status-circle"
                  :class="{
                    'status-red': notification.statusRead != true,
                    'status-grey': notification.statusRead == true,
                  }"
                ></span>
                {{ isDataExist(notification.titleCurrent) }}
              </h5>
              <p class="list-item-description cut-2line">
                {{ isDataExist(notification.bodyCurrent) }}
              </p>
              <span class="list-item-date">
                {{ isDataExist(notification.dateTimeAgo) }}
              </span>
            </div>
          </div>
        </div>
        <b-dropdown-item v-else>
          <h6 class="notifications-title">{{ exceptionMsg }}</h6>
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item to="/notifications">
          <h6>{{ $t("notifications.showAll") }}</h6>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="user-icon" v-if="userData">
      <b-dropdown id="dropdown-user">
        <template #button-content>
          <img
            :src="employeeImage"
            :onerror="`this.src='${defaultImg}'`"
            alt="images"
          />
        </template>
        <div class="text-center">
          <img
            :src="employeeImage"
            :onerror="`this.src='${defaultImg}'`"
            alt="images"
            class="img-profile"
          />
          <b-dropdown-item>{{ employeeName }}</b-dropdown-item>
        </div>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item v-if="language == 'en'" @click="changeLanguage('ar')">
          <img src="@/assets/images/lang-ar.svg" />
          العربية
        </b-dropdown-item>
        <b-dropdown-item v-if="language == 'ar'" @click="changeLanguage('en')">
          <img src="@/assets/images/lang-en.svg" />
          English
        </b-dropdown-item>
        <!-- <b-dropdown-item v-if="theme == 'dark'" @click="changeTheme('light')">
          <img src="@/assets/images/mode-light.svg" />
          {{ $t("lightMode") }}
        </b-dropdown-item>
        <b-dropdown-item v-if="theme == 'light'" @click="changeTheme('dark')">
          <img src="@/assets/images/mode-dark.svg" />
          {{ $t("darkMode") }}
        </b-dropdown-item> -->
        <b-dropdown-item v-b-modal.UserChangePassword>
          <img src="@/assets/images/changePassword.svg" />
          {{ $t("changePassword") }}
        </b-dropdown-item>
        <b-dropdown-item v-b-modal.UserLogOut>
          <img src="@/assets/images/logout.svg" />
          {{ $t("logout") }}
        </b-dropdown-item>
        <!-- <b-dropdown-item active>Active action</b-dropdown-item> -->
      </b-dropdown>
    </div>

    <UserChangePassword v-on:logout="logout" />
    <UserLogOut v-on:logout="logout" />
  </nav>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import { BASE_URL, STATUS } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/user.jpg";
import { isDataExist } from "@/utils/functions";
import { mapGetters } from "vuex";
import UserChangePassword from "@/components/user/UserChangePassword.vue";
import UserLogOut from "@/components/user/UserLogOut.vue";
import Notification from "@/models/notifications/Notification";

export default {
  name: "Navbar",
  components: {
    PreLoader,
    UserChangePassword,
    UserLogOut,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      theme: localStorage.getItem("userTheme") || "light",
      checked: false,
      pageName: this.$t("homePage"),
      pageIcon: "homepage.svg",
      defaultImg: DEFAULT_IMG,
      notificationData: new Notification(),
      notificationsData: null,
      notificationsErrorMsg: null,
      notificationsCount: 0,
    };
  },
  methods: {
    logout() {
      this.isLoading = true;
      this.$store.dispatch("updateUserData", null);
      this.$router.push("/").catch(() => {});
    },
    changeLanguage(lang) {
      this.isLoading = true;
      localStorage.setItem("userLanguage", lang);
      window.location.reload();
    },
    changeTheme(theme) {
      this.isLoading = true;
      localStorage.setItem("userTheme", theme);
      window.location.reload();
    },
    changeMenuStatus() {
      this.$emit("changeMenuStatus");
    },
    async getAllNotifications() {
      try {
        let response = await this.notificationData.getAllNotifications(
          this.language,
          this.userAuthorizeToken,
          1,
          5
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.notificationsData =
            response.data.notificationsPagination.notificationsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.notificationsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.notificationsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.notificationsData = null;
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.notificationsData = null;
        this.exceptionMsg = this.$t("errorCatch");
      }
    },
    async getCountNotReadNotifications() {
      this.isLoading = true;
      try {
        this.notificationsCount =
          await this.notificationData.getCountNotReadNotifications(
            this.language,
            this.userAuthorizeToken
          );
      } catch (e) {
        this.notificationsCount = 0;
      }
      this.isLoading = false;
    },
    async openAllNotifications() {
      try {
        let response = await this.notificationData.openAllNotifications(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.notificationsCount = 0;
          this.getAllNotifications();
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.notificationsCount = 0;
        }
      } catch (e) {
        this.notificationsCount = 0;
      }
    },
    async readNotification(notification) {
      this.isLoading = true;
      try {
        this.notificationData.fillData(notification);
        await this.notificationData.readNotification(
          this.language,
          this.userAuthorizeToken
        );
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    getPageInfo() {
      this.pageName = this.$route.meta.pageName || this.$t("homePage");
      this.pageIcon = this.$route.meta.pageIcon || "homepage.svg";
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {
    ...mapGetters(["userData"]),
    employeeName: function () {
      if (this.userData) {
        return this.language == "ar"
          ? this.userData.employeePersonalData.employeeNameAr
          : this.userData.employeePersonalData.employeeNameEn;
      } else {
        return null;
      }
    },
    employeeImage: function () {
      return BASE_URL + this.userData.employeePersonalData.employeeImagePath;
    },
  },
  watch: {
    $route() {
      this.getPageInfo();
      this.getCountNotReadNotifications();
    },
  },
  async created() {
    this.getPageInfo();
    this.getCountNotReadNotifications();
  },
};
</script>

<style lang="scss"></style>
