<template>
  <div class="">
    <b-button v-b-toggle.news class="btn btn-lg btn-collapse">
      {{ $t("news") }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse id="news">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="newsView"
              v-model="usersPrivilegeNews.newsView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="newsView">{{ $t("view") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="newsAdd"
              v-model="usersPrivilegeNews.newsAdd"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="newsAdd">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="newsUpdate"
              v-model="usersPrivilegeNews.newsUpdate"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="newsUpdate">{{ $t("edit") }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="newsArchive"
              v-model="usersPrivilegeNews.newsArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="newsArchive">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="newsDelete"
              v-model="usersPrivilegeNews.newsDelete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="newsDelete">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              id="newsRestore"
              v-model="usersPrivilegeNews.newsRestore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" for="newsRestore">{{
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
  name: "UsersPrivilegeNews",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["usersPrivilegeNews"],
  methods: {},
};
</script>

<style scoped lang="scss"></style>
