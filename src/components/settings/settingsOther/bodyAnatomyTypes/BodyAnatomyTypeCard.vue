<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('bodyAnatomyTypes.name')">
            {{ bodyAnatomyTypeData.bodyAnatomyTypeNameCurrent }}
          </h4>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-back-icons">
          <router-link
            :to="`/body-anatomies/${bodyAnatomyTypeData.bodyAnatomyTypeToken}`"
            :title="$t('bodyAnatomies.modelName')"
          >
            <img src="@/assets/images/anatomy.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.BodyAnatomyTypeInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setBodyAnatomyTypeData(bodyAnatomyTypeData)"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="`/edit-body-anatomy-type/${bodyAnatomyTypeData.bodyAnatomyTypeToken}`"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.BodyAnatomyTypeDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setBodyAnatomyTypeData(bodyAnatomyTypeData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <!-- <br /> -->
        </div>
        <router-link
          :to="`/body-anatomies/${bodyAnatomyTypeData.bodyAnatomyTypeToken}`"
          :title="$t('bodyAnatomies.modelName')"
        >
          <div class="flip-card-title">
            <h4 class="cut-1line" :title="$t('bodyAnatomies.modelName')">
              {{ bodyAnatomyTypeData.bodyAnatomyTypeNameCurrent }}
            </h4>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/anatomy-types.svg";

export default {
  name: "BodyAnatomyTypeCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG,
    };
  },
  props: ["bodyAnatomyTypeData"],
  methods: {
    setBodyAnatomyTypeData() {
      this.$emit("setBodyAnatomyTypeData", this.bodyAnatomyTypeData);
    },
  },
  computed: {
    imgSrc: function () {
      return BASE_URL + this.bodyAnatomyTypeData.bodyAnatomyTypeImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
