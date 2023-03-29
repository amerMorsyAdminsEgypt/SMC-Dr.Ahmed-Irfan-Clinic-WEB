<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form autocomplete="off" method="post" @submit.prevent="addOrUpdateMeal()">
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
              v-model="mealData.mealsTypeToken"
              :options="mealTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/meals-types.svg" />
          </div>
          <!-- name -->
          <CustomInput
            :className="'col-md-6 col-lg-4'"
            :id="'mealNameAr'"
            :value="mealData.mealNameAr"
            :title="$t('meals.nameAr')"
            :imgName="'meal.svg'"
            v-on:changeValue="mealData.mealNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6 col-lg-4'"
            :id="'mealNameEn'"
            :value="mealData.mealNameEn"
            :title="$t('meals.nameEn')"
            :imgName="'meal.svg'"
            v-on:changeValue="mealData.mealNameEn = $event"
          />
          <CustomInput
            :className="'col-md-12 col-lg-4'"
            :id="'mealNameUnd'"
            :value="mealData.mealNameUnd"
            :title="$t('meals.nameUnd')"
            :imgName="'meal.svg'"
            v-on:changeValue="mealData.mealNameUnd = $event"
          />
          <!-- description -->
          <TextArea
            :className="'col-md-12'"
            :id="'mealNotes'"
            :value="mealData.mealNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="mealData.mealNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'Meals' }" class="btn btn-cancel">
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
import { STATUS } from "@/utils/constants";
import DEFAULT_IMG from "@/assets/images/meal.svg";
import MealsType from "@/models/settings/settingsOther/mealsTypes/MealsType";

export default {
  name: "MealForm",
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
      mealsTypeData: new MealsType(),
      mealTypeTokenOptions: [],
    };
  },
  props: ["mealData", "imageSrc", "submitName"],
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
        this.mealData.image = file[0];
      } else {
        this.src = DEFAULT_IMG;
        this.mealData.image = "";
      }
      // console.log(this.imageSrc);
    },
    async changeSector() {
      this.mealData.employeeJobToken = "";
      this.getDialogOfJobs(this.mealData.employeeSectorToken);
    },
    async addOrUpdateMeal() {
      this.$emit("addOrUpdateMeal", this.mealData);
    },
    async getDialogOfMealsTypes() {
      this.isLoading = true;
      this.mealTypeTokenOptions = [];
      this.mealTypeTokenOptions.push({
        value: "",
        text: this.$t("mealsTypes.select"),
      });
      try {
        const response = await this.mealsTypeData.getDialogOfMealsTypes(
          this.language,
          this.userAuthorizeToken
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.mealTypeTokenOptions.push({
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
        this.mealTypeTokenOptions = null;
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
    this.getDialogOfMealsTypes();
  },
};
</script>

<style lang="scss"></style>
