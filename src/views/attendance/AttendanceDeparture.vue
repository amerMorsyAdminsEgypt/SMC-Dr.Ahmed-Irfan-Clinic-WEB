<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <div v-if="employeesData" class="form-footer">
      <div>
        <input
          type="checkbox"
          id="selectAll"
          @click="selectAll"
          v-model="allSelected"
          class="checkbox"
        />
        <label class="mt-1 ml-2" for="selectAll">{{ $t("selectAll") }}</label>
      </div>

      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="addDepartureList"
      >
        {{ $t("checkOut") }}
      </button>
    </div>

    <div v-if="employeesData">
      <div class="row">
        <div
          class="flip-card col-12 col-sm-6 col-md-4 col-lg-3"
          v-for="employee in employeesData"
          :key="employee.employeeToken"
        >
          <div class="card-inner">
            <div class="card-front">
              <div class="flip-card-title-top">
                <h6 class="cut-1line">{{ employee.employeeCode }}</h6>
              </div>
              <img
                :src="baseUrl + employee.employeeImagePath"
                :onerror="`this.src='${defaultImg}'`"
                alt="Image"
              />
              <div class="flip-card-title">
                <h4 class="cut-1line">
                  {{
                    language == "ar"
                      ? employee.employeeNameAr
                      : employee.employeeNameEn
                  }}
                </h4>
              </div>
              <input
                type="checkbox"
                v-model="employeesIds"
                @click="select"
                :value="employee.employeeToken"
                class="checkbox item-right-top"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <EmployeeFloatBtns
      :filterOnly="true"
      :textSearch="textSearch"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/user.jpg";
import axios from "axios";
import { mapGetters } from "vuex";
import EmployeeFloatBtns from "@/components/employees/employees/EmployeeFloatBtns.vue";

export default {
  name: "AttendanceDeparture",
  components: {
    PreLoader,
    ExceptionWithImg,
    EmployeeFloatBtns,
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
      typeToken: "",
      baseUrl: BASE_URL,
      defaultImg: DEFAULT_IMG,
      isAttend: true,
      employeesData: null,
      employeeData: {},
      allSelected: false,
      employeesIds: [],
    };
  },
  methods: {
    selectAll() {
      this.allSelected = !this.allSelected;
      this.employeesIds = [];

      if (this.allSelected) {
        for (let employee in this.employeesData) {
          this.employeesIds.push(this.employeesData[employee].employeeToken);
        }
      }
    },
    select() {
      if (this.employeesData.length == this.employeesIds.length)
        this.allSelected = true;
      else this.allSelected = false;
    },
    search(text, employeeTypeToken) {
      this.textSearch = text;
      this.typeToken = employeeTypeToken;
      this.getEmployeesToAttendanceOrDeparture();
    },
    async getEmployeesToAttendanceOrDeparture() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `/EmployeesAttendance/GetEmployeesToAttendanceOrDeparture?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&isAttend=${this.isAttend}&employeeTypeToken=${this.typeToken}&filterStatus=true&textSearch=${this.textSearch}`
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.employeesData = response.data.employeesData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.employeesData = null;
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.employeesData = null;
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.employeesData = null;
      }
      this.isLoading = false;
    },
    async addDepartureList() {
      this.isLoading = true;
      const data = {
        language: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
        placeName: this.$t("addedFromManagment"),
        listEmployeesTokens: this.employeesIds,
      };

      try {
        const response = await axios.post(
          `/EmployeesAttendance/AddDepartureList`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.employeesIds = [];
          this.getEmployeesToAttendanceOrDeparture();
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
  watch: {
    employeesIds: function (val) {
      if (this.employeesData.length == val.length) this.allSelected = true;
      else this.allSelected = false;
    },
  },
  async created() {
    this.getEmployeesToAttendanceOrDeparture();
  },
};
</script>

<style scoped lang="scss"></style>
