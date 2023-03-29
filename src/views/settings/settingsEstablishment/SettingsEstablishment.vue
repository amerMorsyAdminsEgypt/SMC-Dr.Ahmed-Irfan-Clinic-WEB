<template>
  <div class="">
    <div class="reports-cards">
      <div class="reports-card">
        <router-link to="/months-establishment-settings" class="">
          <img src="@/assets/images/months-settings.svg" />{{
            $t("establishmentMonthsSettings")
          }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/year-establishment-settings" class="">
          <img src="@/assets/images/year-settings.svg" />{{
            $t("establishmentYearSettings")
          }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsEstablishment",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss"></style>
