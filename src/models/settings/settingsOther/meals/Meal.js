import { STATUS, PAGE_SIZE, BASE_URL } from "@/utils/constants";
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store";
import router from "@/router";

export default class Meal {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.image = "";
    this.mealToken = "";
    this.mealsTypeToken = "";
    this.mealsTypeNameCurrent = "";
    this.mealNameCollecation = "";
    this.mealNameCurrent = "";
    this.mealNameAr = "";
    this.mealNameEn = "";
    this.mealNameUnd = "";
    this.mealImagePath = "";
    this.mealNotes = "";
    this.mealArchiveStatus = "";
    this.filter = {
      mealsTypeToken: "",
    };
  }
  fillData(data) {
    this.mealToken = data.mealToken;
    this.mealsTypeToken = data.mealsTypeToken;
    this.mealsTypeNameCurrent = data.mealsTypeNameCurrent;
    this.mealNameCollecation = data.mealNameCollecation;
    this.mealNameCurrent = data.mealNameCurrent;
    this.mealNameAr = data.mealNameAr;
    this.mealNameEn = data.mealNameEn;
    this.mealNameUnd = data.mealNameUnd;
    this.mealImagePath = data.mealImagePath;
    this.mealNotes = data.mealNotes;
    this.mealArchiveStatus = data.mealArchiveStatus;
  }

  async getAllMeals(language, userAuthorizeToken, selfPage, textSearch) {
    try {
      let response = await axios.get(
        `/Meals/GetAllMeals?language=${language}&userAuthorizeToken=${userAuthorizeToken}&page=${selfPage}&pageSize=${PAGE_SIZE}&filterStatus=true&mealsTypeToken=${this.filter.mealsTypeToken}&textSearch=${textSearch}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getMealDetails(language, userAuthorizeToken) {
    try {
      let response = await axios.get(
        `/Meals/GetMealDetails?language=${language}&userAuthorizeToken=${userAuthorizeToken}&mealToken=${this.mealToken}`
      );
      return response;
    } catch (error) {
      return this.$t("errorCatch");
    }
  }

  async getDialogOfMeals(language, userAuthorizeToken) {
    let options = [];
    try {
      let response = await axios.get(
        `/Meals/GetDialogOfMeals?language=${language}&userAuthorizeToken=${userAuthorizeToken}`
      );
      const itemsData = response.data.itemsData;
      if (response.data.status == STATUS.SUCCESS) {
        for (let item in itemsData) {
          options.push({
            value: itemsData[item]["itemToken"],
            text: itemsData[item]["itemName"],
            image: BASE_URL + itemsData[item]["itemImagePath"],
          });
        }
      } else if (response.data.status == STATUS.INVALID_TOKEN) {
        store.dispatch("updateUserData", null);
        router.push("/").catch(() => {});
      } else {
        options.push({
          value: "",
          text: response.data.msg,
          image: "",
        });
      }
      return options;
    } catch (error) {
      options.push({
        value: "",
        text: i18n.t("errorCatch"),
        image: "",
      });
      return options;
    }
  }

  async addOrUpdateMeal(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      image: this.image,
      mealToken: this.mealToken,
      mealsTypeToken: this.mealsTypeToken,
      mealsTypeNameCurrent: this.mealsTypeNameCurrent,
      mealNameCollecation: this.mealNameCollecation,
      mealNameCurrent: this.mealNameCurrent,
      mealNameAr: this.mealNameAr,
      mealNameEn: this.mealNameEn,
      mealNameUnd: this.mealNameUnd,
      mealImagePath: this.mealImagePath,
      mealNotes: this.mealNotes,
    };

    if (this.image != "" && this.image != undefined) {
      var formData = new FormData();
      formData.append("image", this.image);
      formData.append("data", JSON.stringify(data));
    }

    try {
      let response = "";
      if (this.mealToken == "" || this.mealToken == undefined) {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Meals/AddMealWithMedia`, formData);
        } else {
          response = await axios.post(`/Meals/AddMeal`, data);
        }
      } else {
        if (this.image != "" && this.image != undefined) {
          response = await axios.post(`/Meals/UpdateMealWithMedia`, formData);
        } else {
          response = await axios.post(`/Meals/UpdateMeal`, data);
        }
      }
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }

  async archiveMeal(language, userAuthorizeToken) {
    var data = {
      language: language,
      userAuthorizeToken: userAuthorizeToken,
      mealToken: this.mealToken,
    };

    try {
      let response = await axios.post(`/Meals/ArchiveMeal`, data);
      return response;
    } catch (e) {
      return this.$t("errorCatch");
    }
  }
}
