<template>
  <div v-if="notificationsData" class="">
    <div class="table-header">
      <button class="btn btn-primary" @click="readAllNotifications()">
        {{ $t("notifications.readAllNotifications") }}
      </button>
      <button class="btn btn-primary" @click="archiveAllNotifications()">
        {{ $t("notifications.deleteAllNotifications") }}
      </button>
    </div>

    <div class="list">
      <div
        v-for="(notification, index) in notificationsData"
        :key="index"
        class="list-item"
        :class="{ 'read-done': notification.statusRead == true }"
      >
        <div class="list-item-content" @click="readNotification(notification)">
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
        <div class="list-item-delete">
          <button
            v-b-modal.NotificationDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setNotificationData(notification)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "NotificationsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["notificationsData", "notificationData"],
  methods: {
    setNotificationData(notificationData) {
      this.$emit("setNotificationData", notificationData);
    },
    readNotification(notificationData) {
      this.$emit("readNotification", notificationData);
    },
    readAllNotifications() {
      this.$emit("readAllNotifications");
    },
    archiveAllNotifications() {
      this.$emit("archiveAllNotifications");
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
