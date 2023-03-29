<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="storeData.storeNameCurrent">
            {{ storeData.storeNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-back-icons">
          <button
            v-b-modal.StoreInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setStoreData"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="'/edit-store/' + storeData.storeToken"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <br />
          <button
            v-b-modal.StoreDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setStoreData"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <button @click="goToStoresTimes()" :title="$t('storesTimes')">
            <img src="@/assets/images/time.svg" class="icon-lg" />
          </button>
        </div>
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="storeData.storeNameCurrent">
            {{ storeData.storeNameCurrent }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG_BRANCH from "@/assets/images/branches.svg";

export default {
  name: "StoreCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG_BRANCH,
    };
  },
  props: ["storeData"],
  methods: {
    setStoreData() {
      this.$emit("setStoreData", this.storeData);
    },
    goToStoresTimes() {
      this.$store.dispatch("updateStoreToken", this.storeData.storeToken);
      this.$router.push("/stores-times").catch(() => {});
    },
  },
  computed: {
    imgSrc: function () {
      return BASE_URL + this.storeData.storeImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
