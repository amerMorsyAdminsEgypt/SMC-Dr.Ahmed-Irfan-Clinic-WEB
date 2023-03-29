import Sectors from "./Sectors";
import Jobs from "./Jobs";
import Qualifications from "./Qualifications";
import ReveneusTypes from "./ReveneusTypes";
import ExpensesTypes from "./ExpensesTypes";
import NewsCategories from "./NewsCategories";
import GeneralSpecialties from "./GeneralSpecialties";
import SpecialSpecialties from "./SpecialSpecialties";
import ServicesTypes from "./ServicesTypes";
import Services from "./Services";
import MedicinesTypes from "./MedicinesTypes";
import Medicines from "./Medicines";
import RequirementsRays from "./RequirementsRays";
import RequirementsAnalysis from "./RequirementsAnalysis";
import BloodTypes from "./BloodTypes";
import MethodPaids from "./MethodPaids";
import ScientificDegrees from "./ScientificDegrees";
import Countries from "./Countries";
import Governates from "./Governates";
import Cities from "./Cities";
import Districts from "./Districts";
import InsuranceCompanies from "./InsuranceCompanies";
import BodyAnatomy from "./BodyAnatomy";
import BodyAnatomyTypes from "./BodyAnatomyTypes";
import Surgries from "./Surgries";
import MealsTypes from "./MealsTypes";
import Meals from "./Meals";
import ActiveSubstances from "./ActiveSubstances";
import QuestionsTypes from "./QuestionsTypes";
import Questions from "./Questions";
import AddictiveStuffHabits from "./AddictiveStuffHabits";
import AddictiveStuffChronicDiseases from "./AddictiveStuffChronicDiseases";

import axios from "axios";

export default class BranchesStatistic {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.sectors = new Sectors();
    this.jobs = new Jobs();
    this.qualifications = new Qualifications();
    this.reveneusTypes = new ReveneusTypes();
    this.expensesTypes = new ExpensesTypes();
    this.newsCategories = new NewsCategories();
    this.generalSpecialties = new GeneralSpecialties();
    this.specialSpecialties = new SpecialSpecialties();
    this.servicesTypes = new ServicesTypes();
    this.services = new Services();
    this.medicinesTypes = new MedicinesTypes();
    this.medicines = new Medicines();
    this.requirementsRays = new RequirementsRays();
    this.requirementsAnalysis = new RequirementsAnalysis();
    this.bloodTypes = new BloodTypes();
    this.methodPaids = new MethodPaids();
    this.scientificDegrees = new ScientificDegrees();
    this.countries = new Countries();
    this.governates = new Governates();
    this.cities = new Cities();
    this.districts = new Districts();
    this.insuranceCompanies = new InsuranceCompanies();
    this.bodyAnatomy = new BodyAnatomy();
    this.bodyAnatomyTypes = new BodyAnatomyTypes();
    this.surgries = new Surgries();
    this.mealsTypes = new MealsTypes();
    this.meals = new Meals();
    this.activeSubstances = new ActiveSubstances();
    this.questionsTypes = new QuestionsTypes();
    this.questions = new Questions();
    this.addictiveStuffHabits = new AddictiveStuffHabits();
    this.addictiveStuffChronicDiseases = new AddictiveStuffChronicDiseases();
  }
  fillData(data) {
    this.sectors.fillData(data.sectors);
    this.jobs.fillData(data.jobs);
    this.qualifications.fillData(data.qualifications);
    this.reveneusTypes.fillData(data.reveneusTypes);
    this.expensesTypes.fillData(data.expensesTypes);
    this.newsCategories.fillData(data.newsCategories);
    this.generalSpecialties.fillData(data.generalSpecialties);
    this.specialSpecialties.fillData(data.specialSpecialties);
    this.servicesTypes.fillData(data.servicesTypes);
    this.services.fillData(data.services);
    this.medicinesTypes.fillData(data.medicinesTypes);
    this.medicines.fillData(data.medicines);
    this.requirementsRays.fillData(data.requirementsRays);
    this.requirementsAnalysis.fillData(data.requirementsAnalysis);
    this.bloodTypes.fillData(data.bloodTypes);
    this.methodPaids.fillData(data.methodPaids);
    this.scientificDegrees.fillData(data.scientificDegrees);
    this.countries.fillData(data.countries);
    this.governates.fillData(data.governates);
    this.cities.fillData(data.cities);
    this.districts.fillData(data.districts);
    this.insuranceCompanies.fillData(data.insuranceCompanies);
    this.bodyAnatomy.fillData(data.bodyAnatomy);
    this.bodyAnatomyTypes.fillData(data.bodyAnatomyTypes);
    this.surgries.fillData(data.surgries);
    this.mealsTypes.fillData(data.mealsTypes);
    this.meals.fillData(data.meals);
    this.activeSubstances.fillData(data.activeSubstances);
    this.questionsTypes.fillData(data.questionsTypes);
    this.questions.fillData(data.questions);
    this.addictiveStuffHabits.fillData(data.addictiveStuffHabits);
    this.addictiveStuffChronicDiseases.fillData(
      data.addictiveStuffHabitsHabits
    );
  }

  async getAdditionalSettingsStatistics(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Statistics/GetAdditionalSettingsStatistics?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }
}
