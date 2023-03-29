<template>
  <b-modal id="EmployeesSettlementDone" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/points.svg" class="icon-lg" />
        {{ $t("settlement") }}
      </h3>
    </template>
    <div class="row">
      <div class="form-label-group col-12">
        <b-form-select
          v-model="settlementTypeToken"
          :options="settlementTypeTokenOptions"
          class="form-control"
        ></b-form-select>
        <img src="@/assets/images/type.svg" />
      </div>

      <div class="form-label-group col-12">
        <input
          name="settlementValue"
          id="settlementValue"
          type="text"
          v-model="settlementValue"
          class="form-control"
          placeholder=" "
          maxlength="50"
        />
        <label for="settlementValue">{{ $t("settlementValue") }}</label>
        <img src="@/assets/images/money.svg" />
      </div>

      <TextArea
        :className="'col-12'"
        :id="'settlementNote'"
        :value="settlementNote"
        :title="$t('notes')"
        :imgName="'notes.svg'"
        v-on:changeValue="settlementNote = $event"
      />
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="addEmployeesSettlementMovement"
      >
        {{ $t("settlement") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('EmployeesSettlementDone')"
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
import axios from "axios";
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "EmployeesSettlementDone",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TextArea,
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
      settlementTypeToken: "",
      settlementValue: "",
      settlementNote: "",

      settlementTypeTokenOptions: [
        { value: "", text: this.$t("selectSettlementType") },
        { value: "STT-1", text: this.$t("settlementNormal") },
        { value: "STT-2", text: this.$t("settlementIncrease") },
        { value: "STT-3", text: this.$t("settlementDecrease") },
      ],
    };
  },
  methods: {
    async addEmployeesSettlementMovement() {
      this.isLoading = true;
      if (!this.settlementTypeToken) {
        this.showMsg(this.$t("pleaseSelectSettlementType"));
      } else {
        const data = {
          language: this.language,
          userAuthorizeToken: this.userAuthorizeToken,
          employeeToken: this.employeeSettlementData.employeeToken,
          settlementYear: this.employeeSettlementData.settlementYear,
          settlementMonth: this.employeeSettlementData.settlementMonth,
          settlementTypeToken: this.settlementTypeToken,
          settlementValue: this.settlementValue,
          settlementNote: this.settlementNote,
        };

        try {
          const response = await axios.post(
            `/EmployeesSettlementMovement/AddEmployeesSettlementMovement`,
            data
          );
          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.$bvModal.hide("EmployeesSettlementDone");
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
      }
      this.isLoading = false;
    },
  },
  props: ["employeeSettlementData"],
  computed: {},
};
</script>

<style scoped lang="scss"></style>
