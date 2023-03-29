<template>
  <b-modal id="WorkPlanShiftEdit" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/plus.svg" class="icon-lg" />
        {{ $t("WorkPlanShiftEdit") }}
      </h3>
    </template>

    <div class="row">
      <div class="form-label-group col-12">
        <b-form-select
          v-model="workPlanShiftData.workShiftToken"
          :options="workShiftTokenOptions"
          class="form-control"
        ></b-form-select>
        <img src="@/assets/images/type.svg" />
      </div>
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="updateWorkPlanShift"
      >
        {{ $t("edit") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('WorkPlanShiftEdit')"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import WorkShift from "@/models/settings/settingsSalary/workShifts/WorkShift";
import { setDataMultiLang } from "@/utils/functions";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkPlanShiftEdit",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      workShiftTokenList: [],
      workShiftTokenOptions: [],
      workShiftData: new WorkShift(),
    };
  },
  methods: {
    async getDialogOfWorkShifts() {
      this.isLoading = true;
      try {
        let response = await this.workShiftData.getDialogOfWorkShifts(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.workShiftTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text: itemsData[item]["itemName"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async updateWorkPlanShift() {
      this.isLoading = true;
      try {
        let response = await this.workPlanShiftData.updateWorkPlanShift(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.workShiftTokenList = [];
          this.$bvModal.hide("WorkPlanShiftEdit");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  props: ["workPlanShiftData"],
  computed: {},
  async created() {
    this.getDialogOfWorkShifts();
  },
};
</script>

<style scoped lang="scss"></style>
