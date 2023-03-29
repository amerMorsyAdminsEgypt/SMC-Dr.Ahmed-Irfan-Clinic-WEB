<template>
  <div class="">
    <b-button v-b-toggle.treasuriesTransactions class="btn btn-lg btn-collapse">
      {{ $t("treasuriesTransactions") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="treasuriesTransactions">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="treasuriesTransactionsView"
              v-model="
                usersPrivilegeTreasuriesTransaction.treasuriesTransactionsView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="treasuriesTransactionsView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="depositToTreasury"
              v-model="usersPrivilegeTreasuriesTransaction.depositToTreasury"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="depositToTreasury">{{
              $t("depositToTreasury")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="dropdownFromTreasury"
              v-model="usersPrivilegeTreasuriesTransaction.dropdownFromTreasury"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="dropdownFromTreasury">{{
              $t("dropdownFromTreasury")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeTreasuriesTransaction",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeTreasuriesTransaction"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
