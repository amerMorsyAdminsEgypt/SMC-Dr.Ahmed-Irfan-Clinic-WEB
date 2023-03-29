<template>
  <b-modal id="UserLogOut" scrollable centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToLogout") }}
      <img src="@/assets/images/logout.svg" class="icon-lg" />
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="logout"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('UserLogOut')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "UserLogOut",
  components: {},
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped lang="scss"></style>
