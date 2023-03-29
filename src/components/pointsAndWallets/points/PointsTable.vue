<template>
  <div v-if="pointsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("clientName") }}</th>
            <th>{{ $t("operationType") }}</th>
            <th>{{ $t("pointsAndWallets.points.points") }}</th>
            <th>{{ $t("pointsAndWallets.points.allPoints") }}</th>
            <th>{{ $t("operationEmployeeName") }}</th>
            <th>{{ $t("actionDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(point, index) in pointsData" :key="index">
            <td>{{ ++index }}</td>
            <td>{{ isDataExist(point.clientNameCurrent) }}</td>
            <td>{{ isDataExist(point.transactionPointsTypeNameCurrent) }}</td>
            <td>{{ point.transactionPointsValue }}</td>
            <td>{{ point.transactionPointsNewValue }}</td>
            <td>{{ isDataExist(point.userMakeActionNameCurrent) }}</td>
            <td>
              {{ formateDateTimeLang(point.actionDate, point.actionTime) }}
            </td>
            <td>{{ isDataExist(point.notes) }}</td>
            <td>
              <button
                v-b-modal.PointInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setPointData(point)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  setDataMultiLang,
  timeToLang,
  isDataExist,
  moneyFormat,
  formateDateTimeLang,
} from "@/utils/functions";

export default {
  name: "PointsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["pointsData", "pointData"],
  methods: {
    setPointData(pointData) {
      this.$emit("setPointData", pointData);
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
    moneyFormat(money) {
      return moneyFormat(money);
    },
    formateDateTimeLang(date, time) {
      return formateDateTimeLang(date, time, this.language);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
