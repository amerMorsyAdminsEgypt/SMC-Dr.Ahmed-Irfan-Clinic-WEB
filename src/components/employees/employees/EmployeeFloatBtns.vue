<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li v-if="!filterOnly">
        <span class="fab-label">
          <router-link to="/add-employee" class="">
            {{ $t("employeeAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link to="/add-employee" class="">
            <img src="@/assets/images/addUser.svg" />
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
            v-model="employeeTypeToken"
            :options="employeeTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/man.svg" />
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

export default {
  name: "EmployeeFloatBtns",
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    typeToken: {
      type: String,
      default: "",
    },
    filterOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      text: this.textSearch,
      employeeTypeToken: this.typeToken,
      employeeTypeTokenOptions: [],
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
      this.$emit("search", this.text, this.employeeTypeToken);
    },
    async getDialogOfEmployeeTypes() {
      this.isLoading = true;
      this.employeeTypeTokenOptions = [];
      this.employeeTypeTokenOptions.push({
        value: "",
        text: this.$t("selectEmployeeType"),
      });
      let items = this.$store.getters.userData.constantLists.listEmployeeType;
      for (let item in items) {
        this.employeeTypeTokenOptions.push({
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
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    this.getDialogOfEmployeeTypes();
  },
};
</script>
