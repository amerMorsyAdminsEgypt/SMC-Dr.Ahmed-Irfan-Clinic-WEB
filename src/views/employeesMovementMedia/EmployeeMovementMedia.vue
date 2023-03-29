<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesMovementMediaData">
      <div class="row">
        <MediaCard
          v-for="media in employeesMovementMediaData"
          :key="media.movementMediaToken"
          :mediaData="media"
          v-on:setmediaData="mediaData = $event"
        />
      </div>
      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, PAGE_SIZE } from "@/utils/constants";
import axios from "axios";
import { mapGetters } from "vuex";
import MediaCard from "@/components/employeesMovementMedia/MediaCard.vue";
import Pagination from "@/components/general/Pagination.vue";

export default {
  name: "EmployeeMovementMedia",
  components: {
    PreLoader,
    ExceptionWithImg,
    MediaCard,
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
      movementToken: this.$route.params.movementToken,
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
      },
      employeesMovementMediaData: null,
      mediaData: {},
    };
  },
  methods: {
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllEmployeesMovementMedia();
    },
    search(text) {
      this.textSearch = text;
      this.getAllEmployeesMovementMedia();
    },
    async getAllEmployeesMovementMedia() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesMovementMedia/GetAllEmployeesMovementMedia?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&page=${this.paginationData.selfPage}&paginationStatus=true&pageSize=${PAGE_SIZE}&movementToken=${this.movementToken}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.employeesMovementMediaPagination.totalPages,
            totalItems:
              response.data.employeesMovementMediaPagination.totalItems,
            countItemsInPage:
              response.data.employeesMovementMediaPagination.countItemsInPage,
            selfPage: response.data.employeesMovementMediaPagination.selfPage,
          };
          this.employeesMovementMediaData =
            response.data.employeesMovementMediaPagination.employeesMovementMediaData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesMovementMediaData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesMovementMediaData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesMovementMediaData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesMovementMediaData = null;
      }
      this.isLoading = false;
    },
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  async created() {
    this.getAllEmployeesMovementMedia();
  },
};
</script>
