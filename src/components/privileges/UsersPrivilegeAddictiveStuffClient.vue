<template>
  <div class="">
    <b-button v-b-toggle.diseasesAndHabits class="btn btn-lg btn-collapse">
      {{ $t("historicalPlans.diseasesAndHabits.modelName") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="diseasesAndHabits">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="addictiveStuffClientView"
              v-model="
                usersPrivilegeAddictiveStuffClient.addictiveStuffClientView
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="addictiveStuffClientView">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="addictiveStuffClientAdd"
              v-model="
                usersPrivilegeAddictiveStuffClient.addictiveStuffClientAdd
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="addictiveStuffClientAdd">{{
              $t("add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="addictiveStuffClientUpdate"
              v-model="
                usersPrivilegeAddictiveStuffClient.addictiveStuffClientUpdate
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="addictiveStuffClientUpdate">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="addictiveStuffClientArchive"
              v-model="
                usersPrivilegeAddictiveStuffClient.addictiveStuffClientArchive
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="addictiveStuffClientArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="addictiveStuffClientDelete"
              v-model="
                usersPrivilegeAddictiveStuffClient.addictiveStuffClientDelete
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="addictiveStuffClientDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="addictiveStuffClientRestore"
              v-model="
                usersPrivilegeAddictiveStuffClient.addictiveStuffClientRestore
              "
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="addictiveStuffClientRestore">{{
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
  name: "UsersPrivilegeAddictiveStuffClient",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeAddictiveStuffClient"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
