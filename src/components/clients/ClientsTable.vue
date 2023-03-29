<template>
  <div v-if="clientsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th rowspan="2">#</th>
            <th colspan="3">{{ $t("clientData") }}</th>
            <th colspan="3">
              {{ $t("historicalPlans.operations.modelName") }}
            </th>
          </tr>
          <tr>
            <th>{{ $t("image") }}</th>
            <th>{{ $t("code") }}</th>
            <th>{{ $t("name") }}</th>
            <th>
              {{ $t("historicalPlans.operations.insideCount") }}
            </th>
            <th>
              {{ $t("historicalPlans.operations.outsideCount") }}
            </th>
            <th>{{ $t("info") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(clientData, index) in clientsData"
            :key="clientData.clientToken"
          >
            <td>{{ ++index }}</td>
            <td>
              <img
                class="item-img-table"
                :src="`${baseUrl}${clientData.clientImagePath}`"
                :onerror="`this.src='${defaultImg}'`"
                alt="Image"
              />
            </td>
            <td>{{ isDataExist(clientData.clientCode) }}</td>
            <td>
              {{ isDataExist(clientData.clientNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(clientData.clientSurgriesCountInsideCenter) }}
            </td>
            <td>
              {{ isDataExist(clientData.clientSurgriesCountOutsideCenter) }}
            </td>
            <td>
              <button
                class="btn p-0"
                :title="$t('surgeries.modelName')"
                @click="goToOperations(clientData)"
              >
                <img
                  src="@/assets/images/medical-operations.svg"
                  class="icon-lg"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import DEFAULT_IMG_CLIENT from "@/assets/images/clients.svg";
import { REQUIREMENTS_TYPE_TOKENS } from "@/utils/constantLists";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "ClientsTable",
  components: {},
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      defaultImg: DEFAULT_IMG_CLIENT,
      requirementsTypeTokens: REQUIREMENTS_TYPE_TOKENS,
      baseUrl: BASE_URL,
    };
  },
  props: ["clientsData", "surgeryPlaceTypeToken"],
  methods: {
    goToOperations(clientData) {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        clientData.clientToken
      );
      this.$store.dispatch(
        "updateHistoricalPlansSurgeryPlaceTypeToken",
        this.surgeryPlaceTypeToken
      );
      this.$store.dispatch("updateHistoricalPlansReservationToken", "");
      this.$router.push({ name: "Operations" }).catch(() => {});
    },
    setClientData(clientData) {
      this.$emit("setClientData", clientData);
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
  computed: {
    imgSrc: function () {
      return BASE_URL + this.clientData.clientImagePath;
    },
  },
};
</script>

<style lang="scss"></style>
