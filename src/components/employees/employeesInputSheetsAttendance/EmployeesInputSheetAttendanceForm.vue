<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addEmployeesInputSheetAttendance"
    >
      <div class="my-card">
        <div class="row">
          <b-form-file
            class="col-md-12 mb-3"
            v-model="employeesInputSheetAttendanceData.sheet"
            placeholder=" "
            accept=".xls, .xlsx"
          ></b-form-file>

          <CustomInput
            :className="'col-md-6'"
            :id="'inputSheetAttendaceYear'"
            :value="employeesInputSheetAttendanceData.inputSheetAttendaceYear"
            v-on:changeValue="
              employeesInputSheetAttendanceData.inputSheetAttendaceYear = $event
            "
            :title="$t('inputSheetAttendaceYear')"
            :imgName="'year.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'inputSheetAttendaceMonth'"
            :value="employeesInputSheetAttendanceData.inputSheetAttendaceMonth"
            v-on:changeValue="
              employeesInputSheetAttendanceData.inputSheetAttendaceMonth =
                $event
            "
            :title="$t('inputSheetAttendaceMonth')"
            :imgName="'date.svg'"
          />

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="employeesInputSheetAttendanceData.sheetTypeStatusToken"
              :options="sheetTypeStatusTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/sheets.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <b-form-select
              v-model="employeesInputSheetAttendanceData.mainColumnToken"
              :options="mainColumnTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/main-columns.svg" />
          </div>
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          to="/employees-input-sheets-attendance"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
// import axios from "axios";
import MainColumn from "@/models/settings/settingsSalary/mainColumns/MainColumn";
import CustomInput from "@/components/general/CustomInput.vue";

export default {
  name: "EmployeesInputSheetAttendanceForm",
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
      sheetTypeStatusTokenOptions: [],
      mainColumnData: new MainColumn(),
      mainColumnTokenOptions: [],
    };
  },
  props: ["employeesInputSheetAttendanceData", "submitName"],
  methods: {
    async getDialogOfSheetAttendaceTypes() {
      this.isLoading = true;
      this.sheetTypeStatusTokenOptions = [];
      this.sheetTypeStatusTokenOptions.push({
        value: "",
        text: this.$t("selectSheetTypeStatus"),
      });
      let items =
        this.$store.getters.userData.constantLists.listSheetAttendaceType;
      for (let item in items) {
        this.sheetTypeStatusTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfMainColumns() {
      this.isLoading = true;
      this.mainColumnTokenOptions = [];
      this.mainColumnTokenOptions.push({
        value: "",
        text: this.$t("selectMainColumn"),
      });
      try {
        let response = await this.mainColumnData.getDialogOfMainColumns(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.mainColumnTokenOptions.push({
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
      }
      this.isLoading = false;
    },
    async addEmployeesInputSheetAttendance() {
      this.$emit("addEmployeesInputSheetAttendance");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfSheetAttendaceTypes();
    this.getDialogOfMainColumns();
  },
};
</script>

<style lang="scss"></style>
