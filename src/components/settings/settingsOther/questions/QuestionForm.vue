<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateQuestion()"
    >
      <div class="row">
        <div
          class="imgView"
          :style="{ 'background-image': `url(${src})` }"
          :onerror="`this.src='${defaultImg}'`"
          alt="Image"
          @click="selectImage"
        ></div>
        <!-- @input="pickFile" -->
        <input
          ref="fileInput"
          type="file"
          v-on:change="pickFile"
          class="d-none"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <b-form-select
              v-model="questionData.questionsTypeToken"
              :options="questionTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/questions.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="questionData.generalSpecialtyToken"
              :options="generalSpecialtyTokenOptions"
              @change="changeSpecialSpecialty()"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/general-specialities.svg" />
          </div>
          <div class="form-label-group col-6">
            <b-form-select
              v-model="questionData.specialSpecialtyToken"
              :options="specialSpecialtyTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/special-spcialities.svg" />
          </div>
          <!-- name -->
          <CustomInput
            :className="'col-md-6 col-lg-4'"
            :id="'questionNameAr'"
            :value="questionData.questionNameAr"
            :title="$t('questions.nameAr')"
            :imgName="'questions.svg'"
            v-on:changeValue="questionData.questionNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6 col-lg-4'"
            :id="'questionNameEn'"
            :value="questionData.questionNameEn"
            :title="$t('questions.nameEn')"
            :imgName="'questions.svg'"
            v-on:changeValue="questionData.questionNameEn = $event"
          />
          <CustomInput
            :className="'col-md-12 col-lg-4'"
            :id="'questionNameUnd'"
            :value="questionData.questionNameUnd"
            :title="$t('questions.nameUnd')"
            :imgName="'questions.svg'"
            v-on:changeValue="questionData.questionNameUnd = $event"
          />
          <!-- description -->
          <TextArea
            :className="'col-md-12'"
            :id="'questionNotes'"
            :value="questionData.questionNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="questionData.questionNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link
          :to="{
            name: 'Questions',
            params: {
              questionsTypeToken: questionData.questionsTypeToken,
              generalSpecialtyToken: questionData.generalSpecialtyToken,
              specialSpecialtyToken: questionData.specialSpecialtyToken,
            },
          }"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import { STATUS, IMPOSSIBLE_TOKEN } from "@/utils/constants";
import axios from "axios";
import DEFAULT_IMG from "@/assets/images/questions.svg";
import QuestionsType from "@/models/settings/settingsOther/questionsTypes/QuestionsType";

export default {
  name: "QuestionForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      defaultImg: DEFAULT_IMG,
      src: this.imageSrc,
      questionsTypeData: new QuestionsType(),
      questionTypeTokenOptions: [],
      generalSpecialtyTokenOptions: [],
      specialSpecialtyTokenOptions: [],
    };
  },
  props: ["questionData", "imageSrc", "submitName"],
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.src = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
        this.questionData.image = file[0];
      } else {
        this.src = DEFAULT_IMG;
        this.questionData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async changeSector() {
      this.questionData.employeeJobToken = "";
      this.getDialogOfJobs(this.questionData.employeeSectorToken);
    },
    async addOrUpdateQuestion() {
      this.$emit("addOrUpdateQuestion", this.questionData);
    },
    async getDialogOfQuestionsTypes() {
      this.isLoading = true;
      this.questionTypeTokenOptions = [];
      this.questionTypeTokenOptions.push({
        value: "",
        text: this.$t("questionsTypes.select"),
      });
      try {
        const response = await this.questionsTypeData.getDialogOfQuestionsTypes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.questionTypeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.questionTypeTokenOptions = null;
      }
      this.isLoading = false;
    },
    async getDialogOfGeneralSpecialties() {
      this.isLoading = true;
      this.generalSpecialtyTokenOptions = [];
      this.generalSpecialtyTokenOptions.push({
        value: "",
        text: this.$t("selectGeneralSpecialtyToken"),
      });
      try {
        const response = await axios.get(
          `/GeneralSpecialties/GetDialogOfGeneralSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.generalSpecialtyTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.generalSpecialtyTokenOptions = null;
      }
      this.isLoading = false;
    },
    async changeSpecialSpecialty() {
      this.questionData.specialSpecialtyToken = "";
      this.getDialogOfSpecialSpecialties(
        this.questionData.generalSpecialtyToken
      );
    },
    async getDialogOfSpecialSpecialties(generalSpecialtyToken) {
      this.isLoading = true;
      generalSpecialtyToken = generalSpecialtyToken
        ? generalSpecialtyToken
        : IMPOSSIBLE_TOKEN;
      this.specialSpecialtyTokenOptions = [];
      this.specialSpecialtyTokenOptions.push({
        value: "",
        text: this.$t("selectSpecialSpecialtyToken"),
      });
      try {
        const response = await axios.get(
          `/SpecialSpecialties/GetDialogOfSpecialSpecialties?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}&generalSpecialtyToken=${generalSpecialtyToken}&filterStatus=true`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.specialSpecialtyTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.specialSpecialtyTokenOptions = null;
      }
      this.isLoading = false;
    },

    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {
    // generalSpecialtyToken: function (v) {
    //   console.log(v);
    //   this.getDialogOfSpecialSpecialties();
    // },
  },
  async created() {
    this.getDialogOfQuestionsTypes();
    this.getDialogOfGeneralSpecialties();
    this.getDialogOfSpecialSpecialties(this.questionData.generalSpecialtyToken);
  },
};
</script>

<style lang="scss"></style>
