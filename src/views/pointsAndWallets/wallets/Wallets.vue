<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="walletsData">
      <WalletsTable
        :walletsData="walletsData"
        :walletData="walletData"
        v-on:setWalletData="walletData.fillData($event)"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterWalletData.paginationData"
        v-on:changePage="changePage"
      />
      <WalletInfo :walletData="walletData" />
    </div>

    <WalletFloatBtns
      :filterWalletData="filterWalletData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import WalletsTable from "@/components/pointsAndWallets/wallets/WalletsTable.vue";
import WalletInfo from "@/components/pointsAndWallets/wallets/WalletInfo.vue";
import WalletFloatBtns from "@/components/pointsAndWallets/wallets/WalletFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import Wallet from "@/models/pointsAndWallets/wallets/Wallet";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "Wallets",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    WalletsTable,
    WalletInfo,
    WalletFloatBtns,
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
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      walletsData: null,
      walletData: new Wallet(),
      filterWalletData: new Wallet(),
    };
  },
  methods: {
    changePage(page) {
      this.filterWalletData.paginationData.selfPage = page;
      this.getAllWalletTransactions();
    },
    search(data) {
      this.$store.dispatch("updateWalletsClientToken", data.clientToken);
      // this.$store.dispatch(
      //   "updateWalletsReservationToken",
      //   data.reservationToken
      // );
      this.filterWalletData.fillData(data);
      this.walletsData = null;
      this.getAllWalletTransactions();
    },
    async getAllWalletTransactions() {
      this.isLoading = true;
      try {
        let response = await this.filterWalletData.getAllWalletTransactions(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.walletsData =
            response.data.walletTransactionssPagination.walletTransactionsData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.walletsData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.walletsData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.walletsData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.servicesReservationsData = null;
      }
      this.isLoading = false;
    },
    filter() {
      this.filterWalletData.clientToken = this.$store.getters.wallets
        .clientToken
        ? this.$store.getters.wallets.clientToken
        : "";
      // this.filterWalletData.reservationToken = this.$store.getters.wallets
      //   .reservationToken
      //   ? this.$store.getters.wallets.reservationToken
      //   : "";
    },
  },
  computed: {},
  async created() {
    this.filter();
    this.getAllWalletTransactions();
  },
};
</script>
