<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link :to="{ name: 'MealAdd' }" class="">
            {{ $t("meals.add") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link :to="{ name: 'MealAdd' }" class="">
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
          <b-form-select
            v-model="type"
            :options="mealTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/meals-types.svg" />
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
import { STATUS } from "@/utils/constants";
import MealsType from "@/models/settings/settingsOther/mealsTypes/MealsType";

export default {
  name: "MealBtns",
  props: {
    mealsTypeToken: {
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
      mealsTypeData: new MealsType(),
      mealTypeTokenOptions: [],
      type: this.mealsTypeToken,
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
    async getDialogOfMealsTypes() {
      this.isLoading = true;
      this.mealTypeTokenOptions = [];
      this.mealTypeTokenOptions.push({
        value: "",
        text: this.$t("mealsTypes.select"),
      });
      try {
        const response = await this.mealsTypeData.getDialogOfMealsTypes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.mealTypeTokenOptions.push({
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
        this.mealTypeTokenOptions = null;
      }
      this.isLoading = false;
    },

    search() {
      this.close();
      this.$emit("search", this.type, this.text);
    },
  },
  async created() {
    this.getDialogOfMealsTypes();
  },
};
</script>
