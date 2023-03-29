<template>
  <div class="">
    <div class="reports-cards">
      <div class="reports-card">
        <router-link to="/sectors" class="">
          <img src="@/assets/images/sectors.svg" />{{ $t("sectors") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/jobs" class="">
          <img src="@/assets/images/jobs.svg" />{{ $t("jobs") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/qualifications" class="">
          <img src="@/assets/images/qualifications.svg" />
          {{ $t("qualifications") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/revenues-types" class="">
          <img src="@/assets/images/revenues-types.svg" />
          {{ $t("revenuesTypes") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/expenses-types" class="">
          <img src="@/assets/images/expenses-types.svg" />
          {{ $t("expensesTypes") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/news-categories" class="">
          <img src="@/assets/images/category.svg" />
          {{ $t("newsCategories") }}
        </router-link>
      </div>

      <!-- <div class="reports-card">
        <router-link to="/general-specialties" class="">
          <img src="@/assets/images/general-specialities.svg" />
          {{ $t("generalSpecialties") }}
        </router-link>
      </div> -->

      <div class="reports-card">
        <router-link to="/special-specialties" class="">
          <img src="@/assets/images/special-spcialities.svg" />
          {{ $t("specialSpecialties") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/services-types" class="">
          <img src="@/assets/images/services-types.svg" />
          {{ $t("servicesTypes") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/services" class="">
          <img src="@/assets/images/services.svg" />
          {{ $t("services") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/medicines-types" class="">
          <img src="@/assets/images/medicines-types.svg" />
          {{ $t("medicinesTyps") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/medicines" class="">
          <img src="@/assets/images/medicines.svg" />
          {{ $t("medicines") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/requirements" class="">
          <img src="@/assets/images/requirements.svg" />
          {{ $t("requirements") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/blood-types" class="">
          <img src="@/assets/images/blood-types.svg" />
          {{ $t("bloodTypes") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/method-paids" class="">
          <img src="@/assets/images/method-paids.svg" />
          {{ $t("methodPaids") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/scientific-degrees" class="">
          <img src="@/assets/images/scientific-degrees.svg" />
          {{ $t("scientificDegrees") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/countries" class="">
          <img src="@/assets/images/country.svg" />
          {{ $t("setting.others.countries") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/governates" class="">
          <img src="@/assets/images/governate.svg" />
          {{ $t("setting.others.governates") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/cities" class="">
          <img src="@/assets/images/city.svg" />
          {{ $t("setting.others.cities") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/districts" class="">
          <img src="@/assets/images/district.svg" />
          {{ $t("setting.others.districts") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/insurance-companies" class="">
          <img src="@/assets/images/insurance-companies.svg" />
          {{ $t("setting.others.insuranceCompanies") }}
        </router-link>
      </div>
      <!-- <div class="reports-card">
        <router-link :to="{ name: 'InsuranceCompanyServices' }" class="">
          <img src="@/assets/images/insuranceCompanyService.svg" />
          {{ $t("insuranceCompanyServices.modelName") }}
        </router-link>
      </div> -->
      <div class="reports-card">
        <router-link to="/body-anatomy-types" class="">
          <img src="@/assets/images/anatomy-types.svg" />
          {{ $t("bodyAnatomyTypes.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link to="/body-anatomies" class="">
          <img src="@/assets/images/anatomy.svg" />
          {{ $t("bodyAnatomies.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'Surgeries' }" class="">
          <img src="@/assets/images/medical-operations.svg" />
          {{ $t("surgeries.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'MealsTypes' }" class="">
          <img src="@/assets/images/meals-types.svg" />
          {{ $t("mealsTypes.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'Meals' }" class="">
          <img src="@/assets/images/meal.svg" />
          {{ $t("meals.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'ActiveSubstances' }" class="">
          <img src="@/assets/images/active-substance.svg" />
          {{ $t("activeSubstances.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'Colors' }" class="">
          <img src="@/assets/images/colors.svg" />
          {{ $t("colors.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'QuestionsTypes' }" class="">
          <img src="@/assets/images/questions.svg" />
          {{ $t("questionsTypes.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'Questions' }" class="">
          <img src="@/assets/images/questions.svg" />
          {{ $t("questions.modelName") }}
        </router-link>
      </div>
      <div class="reports-card">
        <router-link :to="{ name: 'AddictiveStuffs' }" class="">
          <img src="@/assets/images/habits.svg" />
          {{ $t("addictiveStuffs.modelName") }}
        </router-link>
      </div>
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
