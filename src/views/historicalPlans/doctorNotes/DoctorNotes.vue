<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="doctorNotesData">
      <DoctorNotesTable
        v-on:setDoctorNoteData="doctorNoteData.fillData($event)"
        :doctorNotesData="doctorNotesData"
        :doctorNoteData="doctorNoteData"
      />

      <Pagination
        v-if="!isLoading"
        :paginationData="filterDoctorNoteData.paginationData"
        v-on:changePage="changePage"
      />

      <DoctorNoteDelete
        :filterDoctorNoteData="doctorNoteData"
        v-on:refresh="getAllDoctorNotes()"
      />
    </div>

    <DoctorNoteFloatBtns
      :filterDoctorNoteData="filterDoctorNoteData"
      v-on:search="search($event)"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import DoctorNotesTable from "@/components/historicalPlans/doctorNotes/DoctorNotesTable.vue";
import DoctorNoteDelete from "@/components/historicalPlans/doctorNotes/DoctorNoteDelete.vue";
import DoctorNoteFloatBtns from "@/components/historicalPlans/doctorNotes/DoctorNoteFloatBtns.vue";
import Pagination from "@/components/general/Pagination.vue";
import DoctorNote from "@/models/historicalPlans/doctorNotes/DoctorNote";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "DoctorNotes",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    DoctorNotesTable,
    DoctorNoteDelete,
    DoctorNoteFloatBtns,
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
      doctorNotesData: null,
      doctorNoteData: new DoctorNote(),
      filterDoctorNoteData: new DoctorNote(),
    };
  },
  methods: {
    changePage(page) {
      this.filterDoctorNoteData.paginationData.selfPage = page;
      this.getAllDoctorNotes();
    },
    search(data) {
      this.$store.dispatch(
        "updateHistoricalPlansClientToken",
        data.clientToken
      );
      this.filterDoctorNoteData.fillData(data);
      this.doctorNotesData = null;
      this.getAllDoctorNotes();
    },
    async getAllDoctorNotes() {
      this.isLoading = true;
      try {
        let response = await this.filterDoctorNoteData.getAllDoctorNotes(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.doctorNotesData =
            response.data.doctorNotesPagination.doctorNotesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.doctorNotesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.doctorNotesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.doctorNotesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        this.showMsg(this.$t("errorCatch"));
        this.doctorNotesData = null;
      }
      this.isLoading = false;
    },
    setFilter() {
      this.filterDoctorNoteData.clientToken = this.$store.getters
        .historicalPlans.clientToken
        ? this.$store.getters.historicalPlans.clientToken
        : "";
    },
  },
  computed: {},
  async created() {
    this.setFilter();
    this.getAllDoctorNotes();
  },
};
</script>
