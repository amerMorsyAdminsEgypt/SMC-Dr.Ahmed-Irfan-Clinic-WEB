<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="getEmployeePayroll">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-12">
            <b-form-select
              v-model="calculatePayrollData.employeeToken"
              :options="employeeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/man.svg" />
          </div>

          <CustomInput
            :className="'col-md-6'"
            :id="'month'"
            :value="calculatePayrollData.month"
            :title="$t('month')"
            :imgName="'date.svg'"
            v-on:changeValue="calculatePayrollData.month = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'year'"
            :value="calculatePayrollData.year"
            :title="$t('year')"
            :imgName="'year.svg'"
            v-on:changeValue="calculatePayrollData.year = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <!-- <router-link to="/settings-salary" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link> -->
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import CustomInput from "@/components/general/CustomInput.vue";

export default {
  name: "CalculatePayrollForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
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
      employeeTokenOptions: [],
    };
  },
  props: ["calculatePayrollData", "submitName"],
  methods: {
    async getEmployeePayroll() {
      this.$emit("getEmployeePayroll");
    },
    async getDialogOfEmployees() {
      this.isLoading = true;
      this.employeeTokenOptions = [];
      this.employeeTokenOptions.push({
        value: "",
        text: this.$t("allEmployees"),
      });
      try {
        const response = await axios.get(
          `/Employees/GetDialogOfEmployees?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.employeeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
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
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfEmployees();
  },
};
</script>

<style lang="scss"></style>
