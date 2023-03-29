<template>
  <div>
    <div class="statistics-cards">
      <Sectors :sectors="additionalSettingsStatisticsData.sectors" />
      <Jobs :jobs="additionalSettingsStatisticsData.jobs" />
      <Qualifications
        :qualifications="additionalSettingsStatisticsData.qualifications"
      />

      <ReveneusTypes
        :reveneusTypes="additionalSettingsStatisticsData.reveneusTypes"
      />
      <ExpensesTypes
        :expensesTypes="additionalSettingsStatisticsData.expensesTypes"
      />

      <NewsCategories
        :newsCategories="additionalSettingsStatisticsData.newsCategories"
      />
      <GeneralSpecialties
        :generalSpecialties="
          additionalSettingsStatisticsData.generalSpecialties
        "
      />
      <SpecialSpecialties
        :specialSpecialties="
          additionalSettingsStatisticsData.specialSpecialties
        "
      />

      <ServicesTypes
        :servicesTypes="additionalSettingsStatisticsData.servicesTypes"
      />
      <Services :services="additionalSettingsStatisticsData.services" />

      <MedicinesTypes
        :medicinesTypes="additionalSettingsStatisticsData.medicinesTypes"
      />
      <Medicines :medicines="additionalSettingsStatisticsData.medicines" />

      <RequirementsRays
        :requirementsRays="additionalSettingsStatisticsData.requirementsRays"
      />
      <RequirementsAnalysis
        :requirementsAnalysis="
          additionalSettingsStatisticsData.requirementsAnalysis
        "
      />

      <BloodTypes :bloodTypes="additionalSettingsStatisticsData.bloodTypes" />
      <MethodPaids
        :methodPaids="additionalSettingsStatisticsData.methodPaids"
      />
      <ScientificDegrees
        :scientificDegrees="additionalSettingsStatisticsData.scientificDegrees"
      />

      <Countries :countries="additionalSettingsStatisticsData.countries" />
      <Governates :governates="additionalSettingsStatisticsData.governates" />
      <Cities :cities="additionalSettingsStatisticsData.cities" />
      <Districts :districts="additionalSettingsStatisticsData.districts" />

      <InsuranceCompanies
        :insuranceCompanies="
          additionalSettingsStatisticsData.insuranceCompanies
        "
      />
      <BodyAnatomy
        :bodyAnatomy="additionalSettingsStatisticsData.bodyAnatomy"
      />
      <BodyAnatomyTypes
        :bodyAnatomyTypes="additionalSettingsStatisticsData.bodyAnatomyTypes"
      />

      <Surgries :surgries="additionalSettingsStatisticsData.surgries" />
      <MealsTypes :mealsTypes="additionalSettingsStatisticsData.mealsTypes" />
      <Meals :meals="additionalSettingsStatisticsData.meals" />
      <ActiveSubstances
        :activeSubstances="additionalSettingsStatisticsData.activeSubstances"
      />

      <QuestionsTypes
        :questionsTypes="additionalSettingsStatisticsData.questionsTypes"
      />
      <Questions :questions="additionalSettingsStatisticsData.questions" />
      <AddictiveStuffHabits
        :addictiveStuffHabits="
          additionalSettingsStatisticsData.addictiveStuffHabits
        "
      />
      <AddictiveStuffChronicDiseases
        :addictiveStuffChronicDiseases="
          additionalSettingsStatisticsData.addictiveStuffChronicDiseases
        "
      />
    </div>
  </div>
</template>

<script>
import Sectors from "@/components/statistics/additionalSettingsStatistics/Sectors.vue";
import Jobs from "@/components/statistics/additionalSettingsStatistics/Jobs.vue";
import Qualifications from "@/components/statistics/additionalSettingsStatistics/Qualifications.vue";
import ReveneusTypes from "@/components/statistics/additionalSettingsStatistics/ReveneusTypes.vue";
import ExpensesTypes from "@/components/statistics/additionalSettingsStatistics/ExpensesTypes.vue";
import NewsCategories from "@/components/statistics/additionalSettingsStatistics/NewsCategories.vue";
import GeneralSpecialties from "@/components/statistics/additionalSettingsStatistics/GeneralSpecialties.vue";
import SpecialSpecialties from "@/components/statistics/additionalSettingsStatistics/SpecialSpecialties.vue";
import ServicesTypes from "@/components/statistics/additionalSettingsStatistics/ServicesTypes.vue";
import Services from "@/components/statistics/additionalSettingsStatistics/Services.vue";
import MedicinesTypes from "@/components/statistics/additionalSettingsStatistics/MedicinesTypes.vue";
import Medicines from "@/components/statistics/additionalSettingsStatistics/Medicines.vue";
import RequirementsRays from "@/components/statistics/additionalSettingsStatistics/RequirementsRays.vue";
import RequirementsAnalysis from "@/components/statistics/additionalSettingsStatistics/RequirementsAnalysis.vue";
import BloodTypes from "@/components/statistics/additionalSettingsStatistics/BloodTypes.vue";
import MethodPaids from "@/components/statistics/additionalSettingsStatistics/MethodPaids.vue";
import ScientificDegrees from "@/components/statistics/additionalSettingsStatistics/ScientificDegrees.vue";
import Countries from "@/components/statistics/additionalSettingsStatistics/Countries.vue";
import Governates from "@/components/statistics/additionalSettingsStatistics/Governates.vue";
import Cities from "@/components/statistics/additionalSettingsStatistics/Cities.vue";
import Districts from "@/components/statistics/additionalSettingsStatistics/Districts.vue";
import InsuranceCompanies from "@/components/statistics/additionalSettingsStatistics/InsuranceCompanies.vue";
import BodyAnatomy from "@/components/statistics/additionalSettingsStatistics/BodyAnatomy.vue";
import BodyAnatomyTypes from "@/components/statistics/additionalSettingsStatistics/BodyAnatomyTypes.vue";
import Surgries from "@/components/statistics/additionalSettingsStatistics/Surgries.vue";
import MealsTypes from "@/components/statistics/additionalSettingsStatistics/MealsTypes.vue";
import Meals from "@/components/statistics/additionalSettingsStatistics/Meals.vue";
import ActiveSubstances from "@/components/statistics/additionalSettingsStatistics/ActiveSubstances.vue";
import QuestionsTypes from "@/components/statistics/additionalSettingsStatistics/QuestionsTypes.vue";
import Questions from "@/components/statistics/additionalSettingsStatistics/Questions.vue";
import AddictiveStuffHabits from "@/components/statistics/additionalSettingsStatistics/AddictiveStuffHabits.vue";
import AddictiveStuffChronicDiseases from "@/components/statistics/additionalSettingsStatistics/AddictiveStuffChronicDiseases.vue";

export default {
  name: "AdditionalSettingsStatisticsComponent",
  props: ["additionalSettingsStatisticsData"],
  components: {
    Sectors,
    Jobs,
    Qualifications,
    ReveneusTypes,
    ExpensesTypes,
    NewsCategories,
    GeneralSpecialties,
    SpecialSpecialties,
    ServicesTypes,
    Services,
    MedicinesTypes,
    Medicines,
    RequirementsRays,
    RequirementsAnalysis,
    BloodTypes,
    MethodPaids,
    ScientificDegrees,
    Countries,
    Governates,
    Cities,
    Districts,
    InsuranceCompanies,
    BodyAnatomy,
    BodyAnatomyTypes,
    Surgries,
    MealsTypes,
    Meals,
    ActiveSubstances,
    QuestionsTypes,
    Questions,
    AddictiveStuffHabits,
    AddictiveStuffChronicDiseases,
  },
};
</script>
