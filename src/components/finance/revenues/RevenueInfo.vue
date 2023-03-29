<template>
  <b-modal id="RevenueInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/revenues.svg" class="icon-lg" />
        {{ $t("revenueData") }}
      </h3>
    </template>
    <div class="img-info">
      <img
        :src="revenueData.imageSrc"
        :onerror="`this.src='${defaultImg}'`"
        alt="Image"
      />
    </div>

    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="revenueData.revenuesCode"
        :title="$t('revenueCode')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="revenueData.revenuesMoneyValue + $t('EGP')"
        :title="$t('money')"
        :imgName="'money.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="revenueData.treasuryNameCurrent"
        :title="$t('treasuryName')"
        :imgName="'treasuries.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="revenueData.branchNameCurrent"
        :title="$t('branchName')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="revenueData.revenuesTypeNameCurrent"
        :title="$t('revenueType')"
        :imgName="'revenues-types.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="revenueData.userNameCurrent"
        :title="$t('userMakeAction')"
        :imgName="'man.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="timeToLang(revenueData.revenuesDateTimeAction)"
        :title="$t('dateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-12'"
        :value="isDataExist(revenueData.revenuesNotes)"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        v-if="revenueData.revenuesReturnedStatus"
        :className="'col-lg-6'"
        :value="isDataExist(revenueData.userNameCurrentReturned)"
        :title="$t('userMakeRefund')"
        :imgName="'man.svg'"
      />
      <DataLabelGroup
        v-if="revenueData.revenuesReturnedStatus"
        :className="'col-lg-6'"
        :value="timeToLang(revenueData.revenuesReturnedDateTime)"
        :title="$t('dateTimeRefund')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        v-if="revenueData.revenuesReturnedStatus"
        :className="'col-lg-12'"
        :value="isDataExist(revenueData.revenuesReturnedNote)"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DEFAULT_IMG_REVENUE from "@/assets/images/revenues.svg";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "RevenueInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG_REVENUE,
    };
  },
  props: ["revenueData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
};
</script>

<style scoped lang="scss"></style>
