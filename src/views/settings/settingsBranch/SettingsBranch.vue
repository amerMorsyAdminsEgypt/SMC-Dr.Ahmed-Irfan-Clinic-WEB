<template>
  <div class="">
    <div class="reports-cards">
      <div class="reports-card">
        <router-link to="/buildings" class="">
          <img src="@/assets/images/buildings.svg" />{{ $t("buildings") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/floors" class="">
          <img src="@/assets/images/floors.svg" />{{ $t("floors") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/chambers" class="">
          <img src="@/assets/images/chambers.svg" />{{ $t("chambers") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/offices" class="">
          <img src="@/assets/images/office.svg" />{{ $t("offices") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/offices-times" class="">
          <img src="@/assets/images/time.svg" />{{ $t("officesTimes") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsBranch",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss"></style>
