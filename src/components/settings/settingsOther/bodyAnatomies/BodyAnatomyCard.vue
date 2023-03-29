<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('bodyAnatomies.name')">
            {{ bodyAnatomyData.bodyAnatomyNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-back-icons">
          <button
            v-b-modal.BodyAnatomyInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setBodyAnatomyData(bodyAnatomyData)"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="`/edit-body-anatomy/${bodyAnatomyData.bodyAnatomyToken}`"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.BodyAnatomyDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setBodyAnatomyData(bodyAnatomyData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <!-- <br /> -->
        </div>
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('bodyAnatomies.name')">
            {{ bodyAnatomyData.bodyAnatomyNameCurrent }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/anatomy.svg";

export default {
  name: "BodyAnatomyCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
    };
  },
  props: ["bodyAnatomyData"],
  methods: {
    setBodyAnatomyData() {
      this.$emit("setBodyAnatomyData", this.bodyAnatomyData);
    },
  },
  computed: {
    employeeName: function () {
      return this.language == "ar"
        ? this.bodyAnatomyData.employeeNameAr
        : this.bodyAnatomyData.employeeNameEn;
    },
    bodyAnatomyOfferStatus: function () {
      if (this.bodyAnatomyData.offerStatus) return "status-green";
      else return "status-red";
    },
    imgSrc: function () {
      return BASE_URL + this.bodyAnatomyData.bodyAnatomyImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
