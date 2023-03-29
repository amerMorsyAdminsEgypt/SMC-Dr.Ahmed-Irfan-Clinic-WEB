<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateAddictiveStuff()"
    >
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <b-form-select
              v-model="addictiveStuffData.addictiveStuffTypeToken"
              :options="addictiveStuffTypeTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/type.svg" />
          </div>
          <CustomInput
            :className="'col-md-6'"
            :id="'addictiveStuffNameAr'"
            :value="addictiveStuffData.addictiveStuffNameAr"
            :title="$t('nameAr')"
            :imgName="'habits.svg'"
            v-on:changeValue="addictiveStuffData.addictiveStuffNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'addictiveStuffNameEn'"
            :value="addictiveStuffData.addictiveStuffNameEn"
            :title="$t('nameEn')"
            :imgName="'habits.svg'"
            v-on:changeValue="addictiveStuffData.addictiveStuffNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'addictiveStuffNameUnd'"
            :value="addictiveStuffData.addictiveStuffNameUnd"
            :title="$t('nameUnd')"
            :imgName="'habits.svg'"
            v-on:changeValue="addictiveStuffData.addictiveStuffNameUnd = $event"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'addictiveStuffDetailsAr'"
            :value="addictiveStuffData.addictiveStuffDetailsAr"
            :title="$t('detailsAr')"
            v-on:changeValue="
              addictiveStuffData.addictiveStuffDetailsAr = $event
            "
            :imgName="'description.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'addictiveStuffDetailsEn'"
            :value="addictiveStuffData.addictiveStuffDetailsEn"
            :title="$t('detailsEn')"
            v-on:changeValue="
              addictiveStuffData.addictiveStuffDetailsEn = $event
            "
            :imgName="'description.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="'addictiveStuffDetailsUnd'"
            :value="addictiveStuffData.addictiveStuffDetailsUnd"
            :title="$t('detailsUnd')"
            v-on:changeValue="
              addictiveStuffData.addictiveStuffDetailsUnd = $event
            "
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="'addictiveStuffNotes'"
            :value="addictiveStuffData.addictiveStuffNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="addictiveStuffData.addictiveStuffNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link :to="{ name: 'AddictiveStuffs' }" class="btn btn-cancel">
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

export default {
  name: "AddictiveStuffForm",
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
      addictiveStuffTypeTokenOptions: [],
    };
  },
  props: ["addictiveStuffData", "submitName"],
  methods: {
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

    async addOrUpdateAddictiveStuff() {
      this.$emit("addOrUpdateAddictiveStuff");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {
    this.getDialogOfAddictiveStuffTypes();
  },
};
</script>

<style lang="scss"></style>
