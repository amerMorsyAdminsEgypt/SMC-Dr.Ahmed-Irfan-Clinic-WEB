<template>
  <b-modal id="WorkPlanDayEdit" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/pencil.svg" class="icon-lg" />
        {{ $t("edit") }}
      </h3>
    </template>

    <div class="row">
      <div class="form-label-group col-12">
        <b-form-select
          v-model="workPlanDayData.dayStatusToken"
          :options="dayStatusTokenOptions"
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
        @click.prevent="updateWorkPlanDay"
      >
        {{ $t("edit") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('WorkPlanDayEdit')"
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
import { setDataMultiLang } from "@/utils/functions";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "WorkPlanDayEdit",
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
      dayStatusTokenOptions: [],
    };
  },
  methods: {
    async getDialogOfDayStatus() {
      // this.isLoading = true;
      this.dayStatusTokenOptions = [];
      this.dayStatusTokenOptions.push({
        value: "",
        text: this.$t("selectDayStatus"),
      });
      let list = this.$store.getters.userData.constantLists.listDayType;
      for (let item in list) {
        this.dayStatusTokenOptions.push({
          value: list[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            list[item]["itemNameAr"],
            list[item]["itemNameEn"]
          ),
        });
      }
      // this.isLoading = false;
    },
    async updateWorkPlanDay() {
      this.isLoading = true;
      try {
        let response = await this.workPlanDayData.updateWorkPlanDay(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("WorkPlanDayEdit");
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
    this.getDialogOfDayStatus();
  },
};
</script>

<style scoped lang="scss"></style>
