<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link to="/add-job" class="">
            {{ $t("jobAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link to="/add-job" class="">
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
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
            v-model="sToken"
            :options="sectorTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/sectors.svg" />
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
import { STATUS } from "@/utils/constants";
import axios from "axios";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "JobsFloatBtns",
  mixins: [createToastMixin],
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    sectorToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      text: this.textSearch,
      sToken: this.sectorToken,
      sectorTokenOptions: [],
    };
  },
  methods: {
    async getDialogOfSectors() {
      this.isLoading = true;
      this.sectorTokenOptions = [];
      this.sectorTokenOptions.push({
        value: "",
        text: this.$t("selectSector"),
      });
      try {
        const response = await axios.get(
          `/Sectors/GetDialogOfSectors?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.sectorTokenOptions.push({
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
    open() {
      this.$refs.EmployeeBottomSheet.open();
    },
    close() {
      this.$refs.EmployeeBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit("search", this.text, this.sToken);
    },
  },
  async created() {
    this.getDialogOfSectors();
  },
};
</script>
