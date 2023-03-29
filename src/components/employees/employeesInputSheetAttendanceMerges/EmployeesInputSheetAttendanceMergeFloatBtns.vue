<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link
            to="/add-employees-input-sheet-attendance-merge"
            class=""
          >
            {{ $t("employeesInputSheetAttendanceMergeAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link
            to="/add-employees-input-sheet-attendance-merge"
            class=""
          >
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
        <!-- <div class="form-label-group col-12">
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
        </div> -->

        <div class="form-label-group col-12">
          <input
            name="month"
            id="month"
            type="text"
            v-model="month"
            class="form-control"
            placeholder=" "
            maxlength="2"
          />
          <label for="month">{{ $t("month") }}</label>
          <img src="@/assets/images/date.svg" />
        </div>

        <div class="form-label-group col-12">
          <input
            name="year"
            id="year"
            type="text"
            v-model="year"
            class="form-control"
            placeholder=" "
            maxlength="4"
          />
          <label for="year">{{ $t("year") }}</label>
          <img src="@/assets/images/year.svg" />
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
export default {
  name: "EmployeesInputSheetAttendanceMergeFloatBtns",
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    mergeMonth: {
      type: String,
      default: "",
    },
    mergeYear: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: this.textSearch,
      month: this.mergeMonth,
      year: this.mergeYear,
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
      this.$emit("search", this.text, this.month, this.year);
    },
  },
};
</script>
