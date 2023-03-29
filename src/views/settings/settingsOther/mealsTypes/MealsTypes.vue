<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="mealsTypesData">
      <div class="row">
        <MealsTypeCard
          v-for="type in mealsTypesData"
          :key="type.mealsTypeToken"
          :mealsTypeData="type"
          v-on:setMealsTypeData="mealsTypeData.fillData($event)"
        />
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <MealsTypeInfo :mealsTypeData="mealsTypeData" />
      <MealsTypeDelete
        :mealsTypeData="mealsTypeData"
        v-on:refresh="getAllMealsTypes()"
      />
    </div>

    <MealsTypeFloatBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import MealsTypeCard from "@/components/settings/settingsOther/mealsTypes/MealsTypeCard.vue";
import MealsTypeInfo from "@/components/settings/settingsOther/mealsTypes/MealsTypeInfo.vue";
import MealsTypeDelete from "@/components/settings/settingsOther/mealsTypes/MealsTypeDelete.vue";
import MealsTypeFloatBtns from "@/components/settings/settingsOther/mealsTypes/MealsTypeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import MealsType from "@/models/settings/settingsOther/mealsTypes/MealsType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "MealsTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    MealsTypeCard,
    MealsTypeInfo,
    MealsTypeDelete,
    MealsTypeFloatBtns,
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
      mealsTypesData: null,
      mealsTypeData: new MealsType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllMealsTypes();
    },
    search(text) {
      this.textSearch = text;
      this.getAllMealsTypes();
    },
    async getAllMealsTypes() {
      this.isLoading = true;
      try {
        const response = await this.mealsTypeData.getAllMealsTypes(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.mealsTypesPagination.totalPages,
            totalItems: response.data.mealsTypesPagination.totalItems,
            countItemsInPage:
              response.data.mealsTypesPagination.countItemsInPage,
            selfPage: response.data.mealsTypesPagination.selfPage,
          };
          this.mealsTypesData =
            response.data.mealsTypesPagination.mealsTypesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.mealsTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.mealsTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.mealsTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.mealsTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllMealsTypes();
  },
};
</script>
