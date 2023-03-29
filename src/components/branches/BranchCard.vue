<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="branchData.branchNameCurrent">
            {{ branchData.branchNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-title-top">
          <h6 class="cut-1line">{{ branchData.establishmentNameCurrent }}</h6>
        </div>
        <div class="flip-card-back-icons">
          <button
            v-b-modal.BranchInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setBranchData"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="'/edit-branch/' + branchData.branchToken"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <br />
          <button
            v-b-modal.BranchDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setBranchData"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <button @click="goToBranchesTimes()" :title="$t('branchesTimes')">
            <img src="@/assets/images/time.svg" class="icon-lg" />
          </button>
        </div>
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="branchData.branchNameCurrent">
            {{ branchData.branchNameCurrent }}
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
  name: "BranchCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG_BRANCH,
    };
  },
  props: ["branchData"],
  methods: {
    setBranchData() {
      this.$emit("setBranchData", this.branchData);
    },
    goToBranchesTimes() {
      this.$store.dispatch("updateBranchToken", this.branchData.branchToken);
      this.$router.push("/branches-times").catch(() => {});
    },
  },
  computed: {
    imgSrc: function () {
      return BASE_URL + this.branchData.branchImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
