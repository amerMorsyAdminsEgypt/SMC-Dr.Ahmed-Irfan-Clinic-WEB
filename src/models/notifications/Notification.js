import { PAGE_SIZE, USER_VERSION, STATUS } from "@/utils/constants";
import { PAGE_GO_TO } from "@/utils/constantLists";
import axios from "axios";
import router from "@/router";
import store from "@/store";

export default class Notification {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.notificationToken = "";
    this.dateTime = "";
    this.dateTimeAgo = "";
    this.titleCurrent = "";
    this.titleAr = "";
    this.titleEn = "";
    this.titleUnd = "";
    this.bodyCurrent = "";
    this.bodyAr = "";
    this.bodyEn = "";
    this.bodyUnd = "";
    this.statusOpen = false;
    this.statusRead = false;
    this.userToken = "";
    this.userFireBaseId = "";
    this.userPlatFormToken = "";
    this.itemToken = "";
    this.pageGoToToken = "";
    this.pageGoToNameAr = "";
    this.pageGoToNameEn = "";
    this.pageGoToNameUnd = "";
    this.notificationArchiveStatus = false;
  }
  fillData(data) {
    this.notificationToken = data.notificationToken;
    this.dateTime = data.dateTime;
    this.dateTimeAgo = data.dateTimeAgo;
    this.titleCurrent = data.titleCurrent;
    this.titleAr = data.titleAr;
    this.titleEn = data.titleEn;
    this.titleUnd = data.titleUnd;
    this.bodyCurrent = data.bodyCurrent;
    this.bodyAr = data.bodyAr;
    this.bodyEn = data.bodyEn;
    this.bodyUnd = data.bodyUnd;
    this.statusOpen = data.statusOpen;
    this.statusRead = data.statusRead;
    this.userToken = data.userToken;
    this.userFireBaseId = data.userFireBaseId;
    this.userPlatFormToken = data.userPlatFormToken;
    this.itemToken = data.itemToken;
    this.pageGoToToken = data.pageGoToToken;
    this.pageGoToNameAr = data.pageGoToNameAr;
    this.pageGoToNameEn = data.pageGoToNameEn;
    this.pageGoToNameUnd = data.pageGoToNameUnd;
    this.notificationArchiveStatus = data.notificationArchiveStatus;
  }

  async getAllNotifications(
    language,
    userAuthorizeToken,
    selfPage,
    pageSize = PAGE_SIZE
  ) {
    try {
      let response = await axios.get(
        `/Notifications/GetAllNotifications?language=${language}&userAuthorizeToken=${userAuthorizeToken}&paginationStatus=true&page=${selfPage}&pageSize=${pageSize}&filterStatus=true&userPlatFormToken=${USER_VERSION.userPlatFormToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getNotificationDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Notifications/GetNotificationDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&notificationToken=${this.notificationToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getCountNotReadNotifications(language, userAuthorizeToken) {
    let notificationsCount = 0;
    try {
      let response = await axios.get(
        `/Notifications/GetCountNotReadNotfcations?language=${language}&userAuthorizeToken=${userAuthorizeToken}&userPlatFormToken=${USER_VERSION.userPlatFormToken}`
      );
      if (response.data.status == STATUS.SUCCESS) {
        if (response.data.notificationsCount > 99) {
          notificationsCount = "+99";
        } else {
          notificationsCount = response.data.notificationsCount;
        }
      } else if (
        response.data.status == STATUS.INVALID_TOKEN ||
        response.data.status == STATUS.VERSION
      ) {
        store.dispatch("logoutUser");
      }
      return notificationsCount;
    } catch (error) {
      return notificationsCount;
    }
  }

  async readNotification(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      notificationToken: this.notificationToken,
      statusRead: true,
    };

    try {
      let response = await axios.post(`/Notifications/ReadNotification`, data);

      if (response.data.status == STATUS.SUCCESS) {
        this.goToDetails();
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        this.$store.dispatch("updateUserData", null);
        this.$router.push("/").catch(() => {});
      } else {
        return response;
      }
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async goToDetails() {
    switch (this.pageGoToToken) {
      case PAGE_GO_TO.News:
        router.push(`/news-item/${this.itemToken}`).catch(() => {});
        break;
      case PAGE_GO_TO.Offers:
        router.push(`/offer-item/${this.itemToken}`).catch(() => {});
        break;
      default:
        // console.log(this.$t("errorCatch"));
        // break;
        return this.$t("errorCatch");
    }
  }

  async readAllNotifications(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      statusRead: true,
    };

    try {
      let response = await axios.post(
        `/Notifications/ReadAllNotification`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async openAllNotifications(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      statusOpen: true,
    };

    try {
      let response = await axios.post(
        `/Notifications/OpenAllNotification`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveNotification(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      notificationToken: this.notificationToken,
    };

    try {
      let response = await axios.post(
        `/Notifications/ArchiveNotification`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
  async archiveAllNotifications(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
    };

    try {
      let response = await axios.post(
        `/Notifications/ArchiveAllNotfcation`,
        data
      );
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
