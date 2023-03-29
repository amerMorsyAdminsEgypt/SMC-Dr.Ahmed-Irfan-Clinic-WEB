<template>
  <b-modal id="WorkPlanShiftsAdd" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/plus.svg" class="icon-lg" />
        {{ $t("WorkPlanShiftsAdd") }}
      </h3>
    </template>

    <div class="row">
      <b-form-group
        :label="$t('WorkPlanShiftsSelect')"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-checkbox-group
          v-model="workShiftTokenList"
          :options="workShiftTokenOptions"
          :aria-describedby="ariaDescribedby"
          switches
          stacked
        ></b-form-checkbox-group>
      </b-form-group>
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="addWorkPlansShifts"
      >
        {{ $t("add") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('WorkPlanShiftsAdd')"
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
import WorkPlanShift from "@/models/settings/settingsSalary/workPlanShifts/WorkPlanShift";
import { setDataMultiLang } from "@/utils/functions";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkPlanShiftsAdd",
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
      workPlanShiftData: new WorkPlanShift(),
    };
  },
  methods: {
    async getWorkShiftDetails() {
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
    async addWorkPlansShifts() {
      this.isLoading = true;
      try {
        let response = await this.workPlanShiftData.addWorkPlansShifts(
          this.language,
          this.userAuthorizeToken,
          this.workPlanDayData.workPlanDayToken,
          this.workShiftTokenList
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.workShiftTokenList = [];
          this.$bvModal.hide("WorkPlanShiftsAdd");
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
  props: ["workPlanDayData"],
  computed: {},
  async created() {
    this.getWorkShiftDetails();
  },
};
</script>

<style scoped lang="scss"></style>
