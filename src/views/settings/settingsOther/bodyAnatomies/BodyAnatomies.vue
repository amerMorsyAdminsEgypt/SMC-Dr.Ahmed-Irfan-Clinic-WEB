<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="bodyAnatomiesData">
      <div class="row">
        <BodyAnatomyCard
          v-for="bodyAnatomy in bodyAnatomiesData"
          :key="bodyAnatomy.bodyAnatomyToken"
          :bodyAnatomyData="bodyAnatomy"
          v-on:setBodyAnatomyData="bodyAnatomyData.fillData($event)"
        />
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
      <BodyAnatomyInfo :bodyAnatomyData="bodyAnatomyData" />
      <BodyAnatomyDelete
        :bodyAnatomyData="bodyAnatomyData"
        v-on:refresh="getAllBodyAnatomies()"
      />
    </div>

    <BodyAnatomyBtns
      :textSearch="textSearch"
      :bodyAnatomyTypeToken="bodyAnatomyTypeToken"
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
import BodyAnatomyCard from "@/components/settings/settingsOther/bodyAnatomies/BodyAnatomyCard.vue";
import BodyAnatomyInfo from "@/components/settings/settingsOther/bodyAnatomies/BodyAnatomyInfo.vue";
import BodyAnatomyDelete from "@/components/settings/settingsOther/bodyAnatomies/BodyAnatomyDelete.vue";
import BodyAnatomyBtns from "@/components/settings/settingsOther/bodyAnatomies/BodyAnatomyBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
// import GeneralSpecialty from "@/models/settings/settingsOther/generalSpecialties/GeneralSpecialty";
import BodyAnatomy from "@/models/settings/settingsOther/bodyAnatomies/BodyAnatomy";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BodyAnatomies",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    BodyAnatomyCard,
    BodyAnatomyInfo,
    BodyAnatomyDelete,
    BodyAnatomyBtns,
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
      bodyAnatomyTypeToken: "",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      bodyAnatomiesData: null,
      bodyAnatomyData: new BodyAnatomy(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllBodyAnatomies();
    },
    search(type, general, special, text) {
      this.bodyAnatomyTypeToken = type;
      this.generalSpecialtyToken = general;
      this.specialSpecialtyToken = special;
      this.textSearch = text;
      this.getAllBodyAnatomies();
    },
    async getAllBodyAnatomies() {
      this.isLoading = true;
      this.bodyAnatomyData.filter.bodyAnatomyTypeToken =
        this.bodyAnatomyTypeToken;
      this.bodyAnatomyData.filter.generalSpecialtyToken =
        this.generalSpecialtyToken;
      this.bodyAnatomyData.filter.specialSpecialtyToken =
        this.specialSpecialtyToken;
      try {
        const response = await this.bodyAnatomyData.getAllBodyAnatomies(
          this.language,
          this.userAuthorizeToken,
          this.selfPage,
          this.textSearch
        );

        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.bodyAnatomyPagination.totalPages,
            totalItems: response.data.bodyAnatomyPagination.totalItems,
            countItemsInPage:
              response.data.bodyAnatomyPagination.countItemsInPage,
            selfPage: response.data.bodyAnatomyPagination.selfPage,
          };
          this.bodyAnatomiesData =
            response.data.bodyAnatomyPagination.bodyAnatomyData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.bodyAnatomiesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.bodyAnatomiesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.bodyAnatomiesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.bodyAnatomiesData = null;
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.bodyAnatomyTypeToken = this.$route.params.bodyAnatomyTypeToken
      ? this.$route.params.bodyAnatomyTypeToken
      : "";
    this.getAllBodyAnatomies();
  },
};
</script>
