<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="bodyAnatomyTypesData">
      <div class="row">
        <BodyAnatomyTypeCard
          v-for="type in bodyAnatomyTypesData"
          :key="type.bodyAnatomyTypeToken"
          :bodyAnatomyTypeData="type"
          v-on:setBodyAnatomyTypeData="bodyAnatomyTypeData.fillData($event)"
        />
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <BodyAnatomyTypeInfo :bodyAnatomyTypeData="bodyAnatomyTypeData" />
      <BodyAnatomyTypeDelete
        :bodyAnatomyTypeData="bodyAnatomyTypeData"
        v-on:refresh="getAllBodyAnatomyTypes()"
      />
    </div>

    <BodyAnatomyTypeFloatBtns
      :textSearch="textSearch"
      :generalSpecialtyToken="generalSpecialtyToken"
      :specialSpecialtyToken="specialSpecialtyToken"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import BodyAnatomyTypeCard from "@/components/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypeCard.vue";
import BodyAnatomyTypeInfo from "@/components/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypeInfo.vue";
import BodyAnatomyTypeDelete from "@/components/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypeDelete.vue";
import BodyAnatomyTypeFloatBtns from "@/components/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyTypeFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import BodyAnatomyType from "@/models/settings/settingsOther/bodyAnatomyTypes/BodyAnatomyType";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BodyAnatomyTypes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BodyAnatomyTypeCard,
    BodyAnatomyTypeInfo,
    BodyAnatomyTypeDelete,
    BodyAnatomyTypeFloatBtns,
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
      bodyAnatomyTypesData: null,
      bodyAnatomyTypeData: new BodyAnatomyType(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllBodyAnatomyTypes();
    },
    search(general, special, text) {
      this.generalSpecialtyToken = general;
      this.specialSpecialtyToken = special;
      this.textSearch = text;
      this.getAllBodyAnatomyTypes();
    },
    async getAllBodyAnatomyTypes() {
      this.isLoading = true;
      this.bodyAnatomyTypeData.filter.generalSpecialtyToken =
        this.generalSpecialtyToken;
      this.bodyAnatomyTypeData.filter.specialSpecialtyToken =
        this.specialSpecialtyToken;
      try {
        const response = await this.bodyAnatomyTypeData.getAllBodyAnatomyTypes(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.bodyAnatomyTypesPagination.totalPages,
            totalItems: response.data.bodyAnatomyTypesPagination.totalItems,
            countItemsInPage:
              response.data.bodyAnatomyTypesPagination.countItemsInPage,
            selfPage: response.data.bodyAnatomyTypesPagination.selfPage,
          };
          this.bodyAnatomyTypesData =
            response.data.bodyAnatomyTypesPagination.bodyAnatomyTypesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.bodyAnatomyTypesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.bodyAnatomyTypesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.bodyAnatomyTypesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.bodyAnatomyTypesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllBodyAnatomyTypes();
  },
};
</script>
