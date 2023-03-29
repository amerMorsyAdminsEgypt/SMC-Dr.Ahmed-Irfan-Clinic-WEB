<template>
  <div class="">
    <b-button
      v-b-toggle.ServiceResponsibleBonuses
      class="btn btn-lg btn-collapse"
    >
      {{ $t("serviceResponsibleBonuses.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="ServiceResponsibleBonuses">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceResponsibleBonusesView"
              v-model="
                usersPrivilegeServiceResponsibleBonuses.serviceResponsibleBonusesView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceResponsibleBonusesView">{{
              $t("view")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="serviceResponsibleBonusesUpdate"
              v-model="
                usersPrivilegeServiceResponsibleBonuses.serviceResponsibleBonusesUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="serviceResponsibleBonusesUpdate">{{
              $t("edit")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeServiceResponsibleBonuses",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeServiceResponsibleBonuses"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
