<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label" @click="goToAddBranchTime()">
          {{ $t("branchTimeAdd") }}
        </span>
        <div class="fab-icon-holder" @click="goToAddBranchTime()">
          <img src="@/assets/images/plus.svg" />
        </div>
        <!-- <span class="fab-label">
          <router-link :to="'/add-branch-time/' + branch" class="">
            {{ $t("branchTimeAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link :to="'/add-branch-time/' + branch" class="">
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div> -->
      </li>
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="EmployeeBottomSheet">
      <div class="row">
        <div class="form-label-group col-12">
          <input
            name="textSearch"
            id="textSearch"
            type="text"
            v-model="text"
            class="form-control"
            placeholder=" "
            maxlength="50"
          />
          <label for="textSearch">{{ $t("search") }}</label>
          <img src="@/assets/images/search.svg" />
        </div>

        <div class="form-label-group col-12">
          <b-form-select
            v-model="day"
            :options="dayTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/date.svg" />
        </div>

        <div class="form-label-group col-12">
          <b-form-select
            v-model="branch"
            :options="branchTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/branches.svg" />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="search"
        >
          {{ $t("search") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { setDataMultiLang } from "@/utils/functions";
import { STATUS } from "@/utils/constants";
import axios from "axios";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "BranchTimeFloatBtns",
  mixins: [createToastMixin],
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    dayToken: {
      type: String,
      default: "",
    },
    branchToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      text: this.textSearch,
      day: this.dayToken,
      branch: this.branchToken,
      dayTokenOptions: [],
      branchTokenOptions: [],
    };
  },
  components: {},
  methods: {
    open() {
      this.$refs.EmployeeBottomSheet.open();
    },
    close() {
      this.$refs.EmployeeBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit("search", this.text, this.day, this.branch);
    },
    async getDialogOfDays() {
      this.isLoading = true;
      this.dayTokenOptions = [];
      this.dayTokenOptions.push({
        value: "",
        text: this.$t("selectDay"),
      });
      let days = this.$store.getters.userData.constantLists.listDaysOfWeekData;
      for (let item in days) {
        this.dayTokenOptions.push({
          value: days[item]["itemToken"],
          text: setDataMultiLang(
            this.language,
            days[item]["itemNameAr"],
            days[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfBranches() {
      this.isLoading = true;
      this.branchTokenOptions = [];
      this.branchTokenOptions.push({
        value: "",
        text: this.$t("selectBranch"),
      });
      try {
        const response = await axios.get(
          `/Branches/GetDialogOfBranches?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.branchTokenOptions.push({
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
    goToAddBranchTime() {
      this.$store.dispatch("updateBranchToken", this.branch);
      this.$router.push("/add-branch-time").catch(() => {});
    },
  },
  async created() {
    this.getDialogOfDays();
    this.getDialogOfBranches();
  },
};
</script>
