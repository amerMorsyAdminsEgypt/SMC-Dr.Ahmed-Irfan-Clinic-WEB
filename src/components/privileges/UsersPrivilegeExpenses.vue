<template>
  <div class="">
    <b-button v-b-toggle.expenses class="btn btn-lg btn-collapse">
      {{ $t("expenses") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="expenses">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="expensesView"
              v-model="usersPrivilegeExpenses.expensesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="expensesView">{{ $t("view") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="expensesAdd"
              v-model="usersPrivilegeExpenses.expensesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="expensesAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="expensesRefund"
              v-model="usersPrivilegeExpenses.expensesRefund"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="expensesRefund">{{
              $t("refund")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeExpenses",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeExpenses"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
