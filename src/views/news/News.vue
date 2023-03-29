<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="newssData">
      <div class="container-fluid">
        <div v-if="paginationData.selfPage == 1" class="row first-row">
          <div
            v-if="newssData.length > 0"
            class="col-12 col-sm-12 col-md-12 col-lg-8 col main"
          >
            <NewsCard
              :newsData="newssData[0]"
              v-on:setNewsData="newsData.fillData($event)"
            />
          </div>
          <div
            v-if="newssData.length >= 1"
            class="col-12 col-sm-12 col-md-12 col-lg-4 no-padding col"
          >
            <div class="row">
              <div class="col-12 col-sm-12 col-md-6 col-lg-12 col half-height">
                <NewsCard
                  :newsData="newssData[1]"
                  v-on:setNewsData="newsData.fillData($event)"
                />
              </div>
              <div
                v-if="newssData.length >= 2"
                class="col-12 col-sm-12 col-md-6 col-lg-12 half-height second"
              >
                <NewsCard
                  :newsData="newssData[2]"
                  v-on:setNewsData="newsData.fillData($event)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(item, index) in newssData.slice(3)"
            :key="index"
            class="col-12 col-sm-12 col-md-6 col-lg-4 col"
          >
            <NewsCard
              :newsData="item"
              v-on:setNewsData="newsData.fillData($event)"
            />
          </div>
        </div>
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />

      <NewsDelete :newsData="newsData" v-on:refresh="getAllNews()" />
    </div>

    <NewsBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import NewsCard from "@/components/news/NewsCard.vue";
import NewsDelete from "@/components/news/NewsDelete.vue";
import NewsBtns from "@/components/news/NewsBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import News from "@/models/news/News";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "News",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    NewsCard,
    NewsDelete,
    NewsBtns,
    Pagination,
  },
  data() {
    return {
      isLoading: true,
      exceptionMsg: null,
      exceptionImg: null,
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      listMediaTypes: this.$store.getters.userData.constantLists.listMediaType,
      language: localStorage.getItem("userLanguage") || "ar",
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      newssData: null,
      newsData: new News(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllNews();
    },
    search(text) {
      this.textSearch = text;
      this.getAllNews();
    },
    async getAllNews() {
      this.isLoading = true;
      this.newssData = null;
      try {
        const response = await axios.get(
          `/News/GetAllNews?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&newsMediaTypeToken=&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.newsPagination.totalPages,
            totalItems: response.data.newsPagination.totalItems,
            countItemsInPage: response.data.newsPagination.countItemsInPage,
            selfPage: response.data.newsPagination.selfPage,
          };
          this.newssData = response.data.newsPagination.newsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllNews();
  },
};
</script>

<style scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .first-row {
    margin-top: -15px;
  }
  .no-padding {
    padding: 0;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .first-row {
    margin-top: -15px;
  }
  .no-padding {
    padding: 0;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .half-height figure.card {
    height: 219px;
  }

  .half-height img.mainImg {
    min-height: 150px;
  }
  .main figure.card {
    height: 450px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}
</style>
