<template>
  <div class="flip-card col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="imgSrc" :onerror="`this.src='${defaultImg}'`" alt="Image" />
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('serviceName')">
            {{ serviceData.serviceNameCurrent }}
          </h4>
        </div>
        <div class="flip-card-title-top">
          <h5 class="cut-1line" :title="$t('servicePrice')">
            <b-icon
              icon="cash"
              animation="throb"
              variant="info"
              scale="0.9"
            ></b-icon>
            {{ $t("price") }} :
            {{ serviceData.servicePrice }}
          </h5>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-title-top">
          <h5 class="cut-1line" :title="$t('servicePrice')">
            <b-icon
              icon="cash"
              animation="throb"
              variant="info"
              scale="0.9"
            ></b-icon>
            {{ $t("price") }} :
            {{ serviceData.servicePrice }}
          </h5>
        </div>
        <div class="flip-card-back-icons">
          <button
            v-b-modal.ServiceInfo
            class="btn p-0"
            :title="$t('info')"
            @click="setServiceData(serviceData)"
          >
            <img src="@/assets/images/info.svg" class="icon-lg" />
          </button>
          <router-link
            :to="`/edit-service/${serviceData.serviceToken}`"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
          <button
            v-b-modal.ServiceDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setServiceData(serviceData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
          <!-- <br /> -->
        </div>
        <div class="flip-card-title">
          <h4 class="cut-1line" :title="$t('serviceName')">
            {{ serviceData.serviceNameCurrent }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_SERVICES_IMG from "@/assets/images/services.svg";

export default {
  name: "ServiceCard",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_SERVICES_IMG,
    };
  },
  props: ["serviceData"],
  methods: {
    setServiceData() {
      this.$emit("setServiceData", this.serviceData);
    },
  },
  computed: {
    employeeName: function () {
      return this.language == "ar"
        ? this.serviceData.employeeNameAr
        : this.serviceData.employeeNameEn;
    },
    serviceOfferStatus: function () {
      if (this.serviceData.offerStatus) return "status-green";
      else return "status-red";
    },
    imgSrc: function () {
      return BASE_URL + this.serviceData.serviceImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
