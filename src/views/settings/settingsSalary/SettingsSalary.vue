<template>
  <div class="">
    <div class="reports-cards">
      <div class="reports-card">
        <router-link to="/work-shifts" class="">
          <img src="@/assets/images/work-shifts.svg" />
          {{ $t("workShifts") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/work-plans" class="">
          <img src="@/assets/images/work-plans.svg" />
          {{ $t("workPlans") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/salary-effects" class="">
          <img src="@/assets/images/salary-effects.svg" />
          {{ $t("salaryEffects") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/balances-plans" class="">
          <img src="@/assets/images/balances-plans.svg" />
          {{ $t("balancesPlans") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/official-holidays" class="">
          <img src="@/assets/images/holiday.svg" />
          {{ $t("officialHolidays") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/official-holidays-plans" class="">
          <img src="@/assets/images/official-holidays-plans.svg" />
          {{ $t("officialHolidaysPlans") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/allowances" class="">
          <img src="@/assets/images/allowances.svg" />
          {{ $t("allowances") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/allowances-plans" class="">
          <img src="@/assets/images/allowances-plans.svg" />
          {{ $t("allowancesPlans") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/month-allowances-plans" class="">
          <img src="@/assets/images/month-allowances-plans.svg" />
          {{ $t("monthAllowancesPlans") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/overtime-plans" class="">
          <img src="@/assets/images/overtime-plans.svg" />
          {{ $t("overTimePlans") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/absence-plans" class="">
          <img src="@/assets/images/absence-plans.svg" />
          {{ $t("absencePlans") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/main-columns" class="">
          <img src="@/assets/images/main-columns.svg" />
          {{ $t("mainColumns") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/insurances-plans" class="">
          <img src="@/assets/images/insurances-plans.svg" />
          {{ $t("insurancesPlans") }}
        </router-link>
      </div>

      <!-- <div class="reports-card">
        <router-link to="/calculate-payroll" class="">
          <img src="@/assets/images/payroll.svg" />
          {{ $t("calculatePayroll") }}
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsAdditional",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss"></style>
