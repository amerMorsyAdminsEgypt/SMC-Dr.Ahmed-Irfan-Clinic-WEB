<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
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
        <div v-if="!noSettlementMonth" class="form-label-group col-12">
          <input
            name="settlementMonth"
            id="settlementMonth"
            type="text"
            v-model="settlementMonth"
            class="form-control"
            placeholder=" "
            maxlength="2"
          />
          <label for="settlementMonth">{{ $t("month") }}</label>
          <img src="@/assets/images/date.svg" />
        </div>

        <div class="form-label-group col-12">
          <input
            name="settlementYear"
            id="settlementYear"
            type="text"
            v-model="settlementYear"
            class="form-control"
            placeholder=" "
            maxlength="4"
          />
          <label for="settlementYear">{{ $t("year") }}</label>
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
  name: "EmployeesSettlementFloatBtns",
  props: ["settlementYear", "settlementMonth", "noSettlementMonth"],
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  methods: {
    open() {
      this.$refs.EmployeeBottomSheet.open();
    },
    close() {
      this.$refs.EmployeeBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit("search", this.settlementYear, this.settlementMonth);
    },
  },
};
</script>
