<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li v-if="currentSubPage === 'clients'">
        <span class="fab-label">
          <router-link to="/add-client" class="">
            {{ $t("clientAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link to="/add-client" class="">
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
      <li>
        <span class="fab-label" @click="open">
          {{ $t("filter") }}
        </span>
        <div class="fab-icon-holder" @click="open">
          <img src="@/assets/images/filter.svg" />
        </div>
      </li>
    </ul>

    <vue-bottom-sheet ref="EmployeeBottomSheet">
      <div class="row">
        <div class="form-label-group col-12">
          <input
            name="textSearch"
            id="textSearch"
            type="text"
            v-model="text"
            class="form-control"
            placeholder=" "
            maxlength="50"
          />
          <label for="textSearch">{{ $t("search") }}</label>
          <img src="@/assets/images/search.svg" />
        </div>

        <div class="form-label-group col-12">
          <b-form-select
            v-model="gender"
            :options="clientGenderTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/gender.svg" />
        </div>
        <div class="form-label-group col-12">
          <b-form-select
            v-model="clientType"
            :options="clientTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div>
        <div
          class="form-label-group col-12"
          v-if="currentSubPage === 'clientsOperations'"
        >
          <b-form-select
            v-model="surgeryPlaceType"
            :options="surgeryPlaceTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="search"
        >
          {{ $t("search") }}
        </button>
        <button class="btn btn-cancel" @click.prevent="close">
          {{ $t("cancel") }}
        </button>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
import { setDataMultiLang } from "@/utils/functions";

export default {
  name: "ClientFloatBtns",
  props: {
    currentSubPage: {
      type: String,
      default: "",
    },
    textSearch: {
      type: String,
      default: "",
    },
    clientGenderToken: {
      type: String,
      default: "",
    },
    clientTypeToken: {
      type: String,
      default: "",
    },
    surgeryPlaceTypeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: this.textSearch,
      gender: this.clientGenderToken,
      clientType: this.clientTypeToken,
      surgeryPlaceType: this.surgeryPlaceTypeToken,
      clientGenderTokenOptions: [],
      clientTypeTokenOptions: [],
      surgeryPlaceTypeTokenOptions: [],
    };
  },
  components: {},
  methods: {
    open() {
      this.$refs.EmployeeBottomSheet.open();
    },
    close() {
      this.$refs.EmployeeBottomSheet.close();
    },
    search() {
      this.close();
      this.$emit(
        "search",
        this.text,
        this.gender,
        this.clientType,
        this.surgeryPlaceType
      );
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    async getDialogOfGenders() {
      this.isLoading = true;
      this.clientGenderTokenOptions = [];
      this.clientGenderTokenOptions.push({
        value: "",
        text: this.$t("selectGender"),
      });
      let genders = this.$store.getters.userData.constantLists.listGender;
      for (let item in genders) {
        this.clientGenderTokenOptions.push({
          value: genders[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            genders[item]["itemNameAr"],
            genders[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfSurgeryPlaceTypes() {
      this.isLoading = true;
      this.surgeryPlaceTypeTokenOptions = [];
      this.surgeryPlaceTypeTokenOptions.push({
        value: "",
        text: this.$t("selectSurgeryPlaceType"),
      });
      let surgeryPlaceTypes =
        this.$store.getters.userData.constantLists.listSurgeryPlaceType;
      for (let item in surgeryPlaceTypes) {
        this.surgeryPlaceTypeTokenOptions.push({
          value: surgeryPlaceTypes[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            surgeryPlaceTypes[item]["itemNameAr"],
            surgeryPlaceTypes[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    async getDialogOfClientType() {
      this.isLoading = true;
      this.clientTypeTokenOptions = [];
      this.clientTypeTokenOptions.push({
        value: "",
        text: this.$t("selectClientType"),
      });
      let itemsData = this.$store.getters.userData.constantLists.listClientType;
      for (let item in itemsData) {
        this.clientTypeTokenOptions.push({
          value: itemsData[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            itemsData[item]["itemNameAr"],
            itemsData[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.getDialogOfGenders();
    this.getDialogOfClientType();
    this.getDialogOfSurgeryPlaceTypes();
  },
};
</script>
