<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="questionsTypesData">
      <div class="row">
        <QuestionsTypeCard
          v-for="type in questionsTypesData"
          :key="type.questionsTypeToken"
          :questionsTypeData="type"
          v-on:setQuestionsTypeData="questionsTypeData.fillData($event)"
        />
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <QuestionsTypeInfo :questionsTypeData="questionsTypeData" />
      <QuestionsTypeDelete
        :questionsTypeData="questionsTypeData"
        v-on:refresh="getAllQuestionsTypes()"
      />
    </div>

    <QuestionsTypeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import QuestionsTypeCard from "@/components/settings/settingsOther/questionsTypes/QuestionsTypeCard.vue";
import QuestionsTypeInfo from "@/components/settings/settingsOther/questionsTypes/QuestionsTypeInfo.vue";
import QuestionsTypeDelete from "@/components/settings/settingsOther/questionsTypes/QuestionsTypeDelete.vue";
import QuestionsTypeFloatBtns from "@/components/settings/settingsOther/questionsTypes/QuestionsTypeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import QuestionsType from "@/models/settings/settingsOther/questionsTypes/QuestionsType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "QuestionsTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    QuestionsTypeCard,
    QuestionsTypeInfo,
    QuestionsTypeDelete,
    QuestionsTypeFloatBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      generalSpecialtyToken: "",
      specialSpecialtyToken: "",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      questionsTypesData: null,
      questionsTypeData: new QuestionsType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllQuestionsTypes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllQuestionsTypes();
    },
    async getAllQuestionsTypes() {
      this.isLoading = true;
      try {
        const response = await this.questionsTypeData.getAllQuestionsTypes(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.questionsTypesPagination.totalPages,
            totalItems: response.data.questionsTypesPagination.totalItems,
            countItemsInPage:
              response.data.questionsTypesPagination.countItemsInPage,
            selfPage: response.data.questionsTypesPagination.selfPage,
          };
          this.questionsTypesData =
            response.data.questionsTypesPagination.questionsTypesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.questionsTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.questionsTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.questionsTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.questionsTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllQuestionsTypes();
  },
};
</script>
