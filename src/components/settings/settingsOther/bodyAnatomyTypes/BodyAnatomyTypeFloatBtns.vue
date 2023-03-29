<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link to="/add-body-anatomy-type" class="">
            {{ $t("bodyAnatomyTypes.add") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link to="/add-body-anatomy-type" class="">
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
        <div class="form-label-group col-6">
          <b-form-select
            v-model="general"
            :options="generalSpecialtyTokenOptions"
            @change="changeSpecialSpecialty()"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/general-specialities.svg" />
        </div>
        <div class="form-label-group col-6">
          <b-form-select
            v-model="special"
            :options="specialSpecialtyTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/special-spcialities.svg" />
        </div>
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
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import axios from "axios";

export default {
  name: "BodyAnatomyTypeFloatBtns",
  props: {
    generalSpecialtyToken: {
      type: String,
      default: "",
    },
    specialSpecialtyToken: {
      type: String,
      default: "",
    },
    textSearch: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      language: localStorage.getItem("userLanguage") || "ar",
      generalSpecialtyTokenOptions: [],
      specialSpecialtyTokenOptions: [],
      general: this.generalSpecialtyToken,
      special: this.specialSpecialtyToken,
      text: this.textSearch,
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
    async getDialogOfGeneralSpecialties() {
      this.isLoading = true;
      this.generalSpecialtyTokenOptions = [];
      this.generalSpecialtyTokenOptions.push({
        value: "",
        text: this.$t("selectGeneralSpecialtyToken"),
      });
      try {
        const response = await axios.get(
          `/GeneralSpecialties/GetDialogOfGeneralSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.generalSpecialtyTokenOptions.push({
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
        this.generalSpecialtyTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeSpecialSpecialty() {
      this.special = "";
      this.getDialogOfSpecialSpecialties(this.general);
    },
    async getDialogOfSpecialSpecialties(generalSpecialtyToken) {
      this.isLoading = true;
      generalSpecialtyToken = generalSpecialtyToken
        ? generalSpecialtyToken
        : IMPOSSIBLE_TOKEN;
      this.specialSpecialtyTokenOptions = [];
      this.specialSpecialtyTokenOptions.push({
        value: "",
        text: this.$t("selectSpecialSpecialtyToken"),
      });
      try {
        const response = await axios.get(
          `/SpecialSpecialties/GetDialogOfSpecialSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&generalSpecialtyToken=${generalSpecialtyToken}&filterStatus=true`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.specialSpecialtyTokenOptions.push({
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
        this.specialSpecialtyTokenOptions = null;
      }
      this.isLoading = false;
    },
    search() {
      this.close();
      this.$emit("search", this.general, this.special, this.text);
    },
  },
  async created() {
    this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties(this.general);
  },
};
</script>
