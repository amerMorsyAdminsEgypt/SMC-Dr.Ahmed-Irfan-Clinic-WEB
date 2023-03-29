<template>
  <b-modal id="ClientQRCode" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/clients.svg" class="icon-lg" />
        {{ clientData.clientNameCurrent }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="clientData.clientCode"
        :title="$t('clientCode')"
        :imgName="'number.svg'"
      />
    </div>
    <div class="img-info">
      <qrcode-vue :value="clientData.clientCode" :size="300" level="H" />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { isDataExist } from "@/utils/functions";
import QrcodeVue from "qrcode.vue";

export default {
  name: "ClientQRCode",
  components: {
    DataLabelGroup,
    QrcodeVue,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["clientData"],
  methods: {
    isDataExist(data) {
      return isDataExist(data);
    },
  },
};
</script>

<style scoped lang="scss"></style>
