<template>
  <div class="">
    <b-button v-b-toggle.revenues class="btn btn-lg btn-collapse">
      {{ $t("revenues") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="revenues">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="revenuesView"
              v-model="usersPrivilegeRevenus.revenuesView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="revenuesView">{{ $t("view") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="revenuesAdd"
              v-model="usersPrivilegeRevenus.revenuesAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="revenuesAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="revenuesRefund"
              v-model="usersPrivilegeRevenus.revenuesRefund"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="revenuesRefund">{{
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
  name: "UsersPrivilegeRevenus",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeRevenus"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
