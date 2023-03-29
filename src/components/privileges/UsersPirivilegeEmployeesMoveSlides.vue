<template>
  <div class="">
    <b-button
      v-b-toggle.usersPirivilegeEmployeesMoveSlides
      class="btn btn-lg btn-collapse"
    >
      {{ $t("slices") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="usersPirivilegeEmployeesMoveSlides">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMoveSlidesView"
              v-model="
                usersPirivilegeEmployeesMoveSlides.employeesMoveSlidesView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMoveSlidesView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMoveSlidesViewSelf"
              v-model="
                usersPirivilegeEmployeesMoveSlides.employeesMoveSlidesViewSelf
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMoveSlidesViewSelf">{{
              $t("viewSelf")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMoveSlidesAdd"
              v-model="
                usersPirivilegeEmployeesMoveSlides.employeesMoveSlidesAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMoveSlidesAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMoveSlidesUpdate"
              v-model="
                usersPirivilegeEmployeesMoveSlides.employeesMoveSlidesUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMoveSlidesUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMoveSlidesArchive"
              v-model="
                usersPirivilegeEmployeesMoveSlides.employeesMoveSlidesArchive
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMoveSlidesArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMoveSlidesDelete"
              v-model="
                usersPirivilegeEmployeesMoveSlides.employeesMoveSlidesDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMoveSlidesDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="employeesMoveSlidesRestore"
              v-model="
                usersPirivilegeEmployeesMoveSlides.employeesMoveSlidesRestore
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="employeesMoveSlidesRestore">{{
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
  name: "UsersPirivilegeEmployeesMoveSlides",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPirivilegeEmployeesMoveSlides"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
