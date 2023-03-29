<template>
  <div v-if="addictiveStuffsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("type") }}</th>
            <th>{{ $t("name") }}</th>
            <th>{{ $t("details") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(addictiveStuff, index) in addictiveStuffsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(addictiveStuff.addictiveStuffTypeNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(addictiveStuff.addictiveStuffNameCurrent) }}
            </td>
            <td>
              {{ isDataExist(addictiveStuff.addictiveStuffDetailsCurrnet) }}
            </td>
            <td>{{ isDataExist(addictiveStuff.addictiveStuffNotes) }}</td>
            <td>
              <button
                v-b-modal.AddictiveStuffInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setAddictiveStuffData(addictiveStuff)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'AddictiveStuffEdit',
                  params: {
                    addictiveStuffToken: addictiveStuff.addictiveStuffToken,
                  },
                }"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.AddictiveStuffDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setAddictiveStuffData(addictiveStuff)"
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
  name: "AddictiveStuffsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["addictiveStuffsData", "addictiveStuffData"],
  methods: {
    setAddictiveStuffData(addictiveStuffData) {
      this.$emit("setAddictiveStuffData", addictiveStuffData);
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
