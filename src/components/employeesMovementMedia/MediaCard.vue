<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card-inner">
      <router-link
        :to="'/employee-movement-media-info/' + mediaData.movementMediaToken"
      >
        <div class="card-front">
          <div class="flip-card-title-top">
            <h4 class="cut-1line" :title="movementMediaName">
              {{ movementMediaName }}
            </h4>
          </div>
          <span class="employee-status" :class="movementTypeStatus"></span>
          <img
            v-if="mediaData.mediaTypeToken == 'MET-1'"
            :src="medidaSrc"
            onerror="this.src='https://api-premco-v1.adminssw.com//_DefaultFiles/employee.png'"
            alt="Image"
          />
          <video v-if="mediaData.mediaTypeToken == 'MET-2'">
            <source :src="medidaSrc" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";

export default {
  name: "EmployeeCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["mediaData"],
  methods: {
    setEmployeeData() {
      this.$emit("setEmployeeData", this.mediaData);
    },
  },
  computed: {
    movementMediaName: function () {
      return this.language == "ar"
        ? this.mediaData.movementMediaNameAr
        : this.mediaData.movementMediaNameEn;
    },
    mediaTypeName: function () {
      return this.language == "ar"
        ? this.mediaData.mediaTypeNameAr
        : this.mediaData.mediaTypeNameEn;
    },
    movementTypeStatus: function () {
      if (this.mediaData.movementTypeToken == "EMS-1") return "status-green";
      else if (this.mediaData.movementTypeToken == "EMS-2") return "status-red";
      else return "status-yellow";
    },
    medidaSrc: function () {
      return BASE_URL + this.mediaData.movementMediaPath;
    },
  },
};
</script>

<style lang="scss"></style>
