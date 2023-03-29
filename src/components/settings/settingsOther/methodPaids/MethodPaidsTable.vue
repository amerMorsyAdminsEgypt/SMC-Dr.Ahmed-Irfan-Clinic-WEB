<template>
  <div v-if="methodPaidsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(methodPaid, index) in methodPaidsData" :key="index">
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(methodPaid.methodPaidNameCurrent) }}
            </td>
            <td>{{ isDataExist(methodPaid.methodPaidNotes) }}</td>
            <td>
              <button
                v-b-modal.MethodPaidInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setMethodPaidData(methodPaid)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="`/edit-method-paid/${methodPaid.methodPaidToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.MethodPaidDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setMethodPaidData(methodPaid)"
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "MethodPaidsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["methodPaidsData", "methodPaidData"],
  methods: {
    setMethodPaidData(methodPaidData) {
      this.$emit("setMethodPaidData", methodPaidData);
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
  computed: {},
};
</script>

<style lang="scss"></style>
