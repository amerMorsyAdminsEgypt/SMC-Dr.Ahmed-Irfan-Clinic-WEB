<template>
  <div v-if="questionPlans.questionPlansData" class="">
    <div
      v-for="(Question, index) in questionPlans.questionPlansData"
      :key="index"
      class="container-collapse-with-btns"
    >
      <b-button
        v-b-toggle="`item${index}`"
        class="btn btn-lg btn-collapse collapse-data"
      >
        <div class="p-t-container">
          <div class="row collapse-title">
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("name")}:  ${isDataExist(
                  Question.mainReservationData.clientNameCurrent
                )}  ${$t("quma")} `
              }}
            </div>
            <div class="col-md-12 col-lg-12">
              {{
                `${$t("reservationCode")}:  ${isDataExist(
                  Question.mainReservationData.reservationCode
                )}  ${$t("quma")} `
              }}
              {{
                `${$t("onDate")}:  ${isDataExist(
                  Question.mainReservationData.reservationDate
                )}  ${$t("quma")}  `
              }}
              {{
                `${$t("specialSpecialty")}:  ${isDataExist(
                  Question.mainReservationData.specialSpecialtyNameCurrent
                )}  ${$t("quma")}  `
              }}
              {{
                `${
                  Question.employeeJobNameCurrentInReport
                    ? Question.employeeJobNameCurrentInReport
                    : $t("responsibleForProvidingTheService")
                }:  ${Question.employeeNameCurrentInReport}`
              }}
            </div>
          </div>
          <div class="collapse-icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </div>
      </b-button>
      <div class="collapse-actions btn-collapse">
        <div class="">
          <router-link
            :to="{
              name: 'QuestionPlanEdit',
              params: {
                clientToken: questionPlans.filterData.clientToken,
                reservationToken: questionPlans.filterData.reservationToken,
                questionPlanToken: Question.questionPlanToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </div>
        <div class="">
          <button
            v-b-modal.QuestionPlanDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setQuestionPlanData(Question)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </div>
        <div class="">
          <button
            v-b-modal.QuestionPlanDownload
            class="btn p-0"
            :title="$t('viewAndSend')"
            @click="setQuestionPlanData(Question)"
          >
            <img src="@/assets/images/pdf.svg" class="icon-lg" />
          </button>
        </div>
      </div>
      <b-collapse :id="`item${index}`">
        <div class="my-card">
          <span class="my-card-title">{{
            $t("historicalPlans.questionPlans.modelName")
          }}</span>
          <div class="table-container">
            <table class="my-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t("questionsTypes.modelName") }}</th>
                  <th>{{ $t("questions.modelName") }}</th>
                  <th>{{ $t("historicalPlans.questionPlans.answerText") }}</th>
                  <th>
                    {{ $t("historicalPlans.questionPlans.answerTrueOrFalse") }}
                  </th>
                  <th>{{ $t("notes") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    questionPlan, indexMed
                  ) in Question.questionPlanDetailsData"
                  :key="indexMed"
                >
                  <td>{{ ++indexMed }}</td>
                  <td>
                    {{ isDataExist(questionPlan.questionsTypeNameCurrent) }}
                  </td>
                  <td>
                    {{ isDataExist(questionPlan.questionNameCurrent) }}
                  </td>
                  <td>
                    {{ isDataExist(questionPlan.questionAnswerTextCurrent) }}
                  </td>
                  <td>
                    {{
                      questionPlan.questionAnswerTrueOrFalse
                        ? $t("historicalPlans.questionPlans.answerTrue")
                        : $t("historicalPlans.questionPlans.answerFalse")
                    }}
                  </td>
                  <td>
                    {{ isDataExist(questionPlan.questionPlanNotes) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import { setDataMultiLang, timeToLang, isDataExist } from "@/utils/functions";

export default {
  name: "QuestionPlansTable",
  components: {},
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      baseUrl: BASE_URL,
    };
  },
  props: ["questionPlans", "filterData"],
  // props: ["questionPlansData", "questionPlanData"],
  methods: {
    setQuestionPlanData(questionPlanData) {
      this.$emit("setQuestionPlanData", questionPlanData);
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
