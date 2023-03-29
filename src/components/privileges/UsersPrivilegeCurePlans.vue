<template>
  <div class="">
    <b-button v-b-toggle.curePlans class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.curePlans.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="curePlans">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="curePlansView"
              v-model="usersPrivilegeCurePlans.curePlansView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="curePlansView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="curePlansAdd"
              v-model="usersPrivilegeCurePlans.curePlansAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="curePlansAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="curePlansUpdate"
              v-model="usersPrivilegeCurePlans.curePlansUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="curePlansUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="curePlansArchive"
              v-model="usersPrivilegeCurePlans.curePlansArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="curePlansArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="curePlansDelete"
              v-model="usersPrivilegeCurePlans.curePlansDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="curePlansDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="curePlansRestore"
              v-model="usersPrivilegeCurePlans.curePlansRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="curePlansRestore">{{
              $t("restore")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "UsersPrivilegeCurePlans",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeCurePlans"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
