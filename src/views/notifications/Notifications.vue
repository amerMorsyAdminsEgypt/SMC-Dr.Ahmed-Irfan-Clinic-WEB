<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="notificationsData">
      <NotificationsTable
        :notificationsData="notificationsData"
        :notificationData="notificationData"
        v-on:setNotificationData="notificationData.fillData($event)"
        v-on:readNotification="readNotification($event)"
        v-on:readAllNotifications="readAllNotifications()"
        v-on:archiveAllNotifications="archiveAllNotifications()"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <NotificationDelete
        :notificationData="notificationData"
        v-on:refresh="getAllNotifications()"
      />
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE, USER_VERSION } from "@/utils/constants";
// import { PAGE_GO_TO } from "@/utils/constantLists";
import axios from "axios";
import NotificationsTable from "@/components/notifications/NotificationsTable.vue";
import NotificationDelete from "@/components/notifications/NotificationDelete.vue";
import Pagination from "@/components/general/Pagination.vue";
import Notification from "@/models/notifications/Notification";
import PaginationData from "@/models/general/PaginationData";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Notifications",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    NotificationsTable,
    NotificationDelete,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      paginationData: new PaginationData(),
      notificationsData: null,
      notificationData: new Notification(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllNotifications();
    },
    search(text) {
      this.textSearch = text;
      this.getAllNotifications();
    },
    async getAllNotifications() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/Notifications/GetAllNotifications?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&userPlatFormToken=${USER_VERSION.userPlatFormToken}&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData.fillData(response.data.notificationsPagination);
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
      this.isLoading = false;
    },
    async readAllNotifications() {
      this.isLoading = true;
      try {
        let response = await this.notificationData.readAllNotifications(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.getAllNotifications();
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
    async archiveAllNotifications() {
      this.isLoading = true;
      try {
        let response = await this.notificationData.archiveAllNotifications(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.getAllNotifications();
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
  },
  computed: {},
  async created() {
    this.getAllNotifications();
  },
};
</script>
