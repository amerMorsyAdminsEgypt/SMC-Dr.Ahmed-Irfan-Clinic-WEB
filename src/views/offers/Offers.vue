<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="offersData">
      <div class="container-fluid">
        <div v-if="paginationData.selfPage == 1" class="row first-row">
          <div
            v-if="offersData.length > 0"
            class="col-12 col-sm-12 col-md-12 col-lg-8 col main"
          >
            <OfferCard
              :offerData="offersData[0]"
              v-on:setOfferData="offerData.fillData($event)"
            />
          </div>
          <div
            v-if="offersData.length >= 1"
            class="col-12 col-sm-12 col-md-12 col-lg-4 no-padding col"
          >
            <div class="row">
              <div class="col-12 col-sm-12 col-md-6 col-lg-12 col half-height">
                <OfferCard
                  :offerData="offersData[1]"
                  v-on:setOfferData="offerData.fillData($event)"
                />
              </div>
              <div
                v-if="offersData.length >= 2"
                class="col-12 col-sm-12 col-md-6 col-lg-12 half-height second"
              >
                <OfferCard
                  :offerData="offersData[2]"
                  v-on:setOfferData="offerData.fillData($event)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(item, index) in offersData.slice(3)"
            :key="index"
            class="col-12 col-sm-12 col-md-6 col-lg-4 col"
          >
            <OfferCard
              :offerData="item"
              v-on:setOfferData="offerData.fillData($event)"
            />
          </div>
        </div>
      </div>

      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />

      <OfferDelete :offerData="offerData" v-on:refresh="getAllOffers()" />
    </div>

    <OfferBtns :textSearch="textSearch" v-on:search="search" />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import OfferCard from "@/components/offers/OfferCard.vue";
import OfferDelete from "@/components/offers/OfferDelete.vue";
import OfferBtns from "@/components/offers/OfferBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Offer from "@/models/offers/Offer";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Offers",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    OfferCard,
    OfferDelete,
    OfferBtns,
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
      offersData: null,
      offerData: new Offer(),
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllOffers();
    },
    search(text) {
      this.textSearch = text;
      this.getAllOffers();
    },
    async getAllOffers() {
      this.isLoading = true;
      this.offersData = null;
      try {
        const response = await axios.get(
          `/Offers/GetAllOffers?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&filterStatus=true&newsMediaTypeToken=&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages: response.data.offersPagination.totalPages,
            totalItems: response.data.offersPagination.totalItems,
            countItemsInPage: response.data.offersPagination.countItemsInPage,
            selfPage: response.data.offersPagination.selfPage,
          };
          this.offersData = response.data.offersPagination.offersData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
      }
      this.isLoading = false;
    },
  },
  computed: {},
  async created() {
    this.getAllOffers();
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
