<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <router-link
        :to="{
          name: 'MedicalInsuranceLevelAdd',
          params: {
            insuranceCompanyToken: insuranceCompanyToken,
          },
        }"
        class=""
      >
        <li>
          <span class="fab-label">
            {{ $t("medicalInsuranceLevels.add") }}
          </span>
          <div class="fab-icon-holder">
            <img src="@/assets/images/plus.svg" />
          </div>
        </li>
      </router-link>
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
  name: "MedicalInsuranceLevelBtns",
  props: {
    textSearch: {
      type: String,
      default: "",
    },
    insuranceCompanyToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
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
    search() {
      this.close();
      this.$emit("search", this.text);
    },
    // goToAddPage() {
    //   this.$router
    //     .push({
    //       name: "MedicalInsuranceLevelAdd",
    //       params: {
    //         insuranceCompanyToken: this.insuranceCompanyToken,
    //       },
    //     })
    //     .catch(() => {});
    // },
  },
};
</script>
