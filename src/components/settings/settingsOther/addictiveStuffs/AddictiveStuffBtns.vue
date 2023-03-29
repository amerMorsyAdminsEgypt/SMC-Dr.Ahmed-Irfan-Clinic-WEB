<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link :to="{ name: 'AddictiveStuffAdd' }" class="">
            {{ $t("addictiveStuffs.add") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link :to="{ name: 'AddictiveStuffAdd' }" class="">
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
          <b-form-select
            v-model="addictiveStuffType"
            :options="addictiveStuffTypeTokenOptions"
            class="form-control"
          ></b-form-select>
          <img src="@/assets/images/type.svg" />
        </div>
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
export default {
  name: "AddictiveStuffBtns",
  props: {
    addictiveStuffTypeToken: {
      type: String,
      default: "",
    },
    textSearch: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      addictiveStuffTypeTokenOptions: [],
      text: this.textSearch,
      addictiveStuffType: this.addictiveStuffTypeToken,
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
    async getDialogOfAddictiveStuffTypes() {
      this.isLoading = true;
      this.addictiveStuffTypeTokenOptions = [];
      this.addictiveStuffTypeTokenOptions.push({
        value: "",
        text: this.$t("selectAddictiveStuffType"),
      });
      try {
        const itemsData =
          this.$store.getters.userData.constantLists.listAddictiveStuffType;
        if (itemsData.length > 0) {
          for (let item in itemsData) {
            this.addictiveStuffTypeTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.addictiveStuffTypeTokenOptions = null;
      }
      this.isLoading = false;
    },
    search() {
      this.close();
      this.$emit("search", this.addictiveStuffType, this.text);
    },
  },
  async created() {
    this.getDialogOfAddictiveStuffTypes();
  },
};
</script>
