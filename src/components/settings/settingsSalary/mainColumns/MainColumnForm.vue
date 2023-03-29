<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <form
      autocomplete="off"
      method="post"
      @submit.prevent="addOrUpdateMainColumn"
    >
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'mainColumnNameAr'"
            :value="mainColumnData.mainColumnNameAr"
            :title="$t('mainColumnNameAr')"
            :imgName="'main-columns.svg'"
            v-on:changeValue="mainColumnData.mainColumnNameAr = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'mainColumnNameEn'"
            :value="mainColumnData.mainColumnNameEn"
            :title="$t('mainColumnNameEn')"
            :imgName="'main-columns.svg'"
            v-on:changeValue="mainColumnData.mainColumnNameEn = $event"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'mainColumnNameUnd'"
            :value="mainColumnData.mainColumnNameUnd"
            :title="$t('mainColumnNameUnd')"
            :imgName="'main-columns.svg'"
            v-on:changeValue="mainColumnData.mainColumnNameUnd = $event"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'mainColumnNote'"
            :value="mainColumnData.mainColumnNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="mainColumnData.mainColumnNote = $event"
          />

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-6'"
                :id="'employeeCodeInOutColumnName'"
                :value="mainColumnData.employeeCodeInOutColumnName"
                v-on:changeValue="
                  mainColumnData.employeeCodeInOutColumnName = $event
                "
                :title="$t('employeeCodeInOutColumnName')"
                :imgName="'number.svg'"
              />
              <CustomCheckbox
                :className="'col-md-6'"
                :value="mainColumnData.employeeCodeInOutFindStatus"
                v-on:changeValue="
                  mainColumnData.employeeCodeInOutFindStatus = $event
                "
                :title="$t('activationStatus')"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-6'"
                :id="'branchCodeInOutColumnName'"
                :value="mainColumnData.branchCodeInOutColumnName"
                v-on:changeValue="
                  mainColumnData.branchCodeInOutColumnName = $event
                "
                :title="$t('branchCodeInOutColumnName')"
                :imgName="'number.svg'"
              />
              <CustomCheckbox
                :className="'col-md-6'"
                :value="mainColumnData.branchCodeInOutFindStatus"
                v-on:changeValue="
                  mainColumnData.branchCodeInOutFindStatus = $event
                "
                :title="$t('activationStatus')"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-6'"
                :id="'dateTimeInColumnName'"
                :value="mainColumnData.dateTimeInColumnName"
                v-on:changeValue="mainColumnData.dateTimeInColumnName = $event"
                :title="$t('dateTimeInColumnName')"
                :imgName="'dateAndTime.svg'"
              />
              <CustomCheckbox
                :className="'col-md-6'"
                :value="mainColumnData.dateTimeInFindStatus"
                v-on:changeValue="mainColumnData.dateTimeInFindStatus = $event"
                :title="$t('activationStatus')"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-4'"
                :id="'dateInColumnName'"
                :value="mainColumnData.dateInColumnName"
                v-on:changeValue="mainColumnData.dateInColumnName = $event"
                :title="$t('dateInColumnName')"
                :imgName="'date.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="'timeInColumnName'"
                :value="mainColumnData.timeInColumnName"
                v-on:changeValue="mainColumnData.timeInColumnName = $event"
                :title="$t('timeInColumnName')"
                :imgName="'time.svg'"
              />
              <CustomCheckbox
                :className="'col-md-4'"
                :value="mainColumnData.dateTimeSeparatedInFindStatus"
                v-on:changeValue="
                  mainColumnData.dateTimeSeparatedInFindStatus = $event
                "
                :title="$t('activationStatus')"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-6'"
                :id="'dateTimeOutColumnName'"
                :value="mainColumnData.dateTimeOutColumnName"
                v-on:changeValue="mainColumnData.dateTimeOutColumnName = $event"
                :title="$t('dateTimeOutColumnName')"
                :imgName="'dateAndTime.svg'"
              />
              <CustomCheckbox
                :className="'col-md-6'"
                :value="mainColumnData.dateTimeOutFindStatus"
                v-on:changeValue="mainColumnData.dateTimeOutFindStatus = $event"
                :title="$t('activationStatus')"
              />
            </div>
          </div>

          <div class="my-card col-md-12">
            <div class="row">
              <CustomInput
                :className="'col-md-4'"
                :id="'dateOutColumnName'"
                :value="mainColumnData.dateOutColumnName"
                v-on:changeValue="mainColumnData.dateOutColumnName = $event"
                :title="$t('dateOutColumnName')"
                :imgName="'date.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="'timeOutColumnName'"
                :value="mainColumnData.timeOutColumnName"
                v-on:changeValue="mainColumnData.timeOutColumnName = $event"
                :title="$t('timeOutColumnName')"
                :imgName="'time.svg'"
              />
              <CustomCheckbox
                :className="'col-md-4'"
                :value="mainColumnData.dateTimeSeparatedOutFindStatus"
                v-on:changeValue="
                  mainColumnData.dateTimeSeparatedOutFindStatus = $event
                "
                :title="$t('activationStatus')"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/main-columns" class="btn btn-cancel">
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
import CustomCheckbox from "@/components/general/CustomCheckbox.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "MainColumnForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    CustomCheckbox,
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
    };
  },
  props: ["mainColumnData", "submitName"],
  methods: {
    async addOrUpdateMainColumn() {
      this.$emit("addOrUpdateMainColumn");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  watch: {},
  async created() {},
};
</script>

<style lang="scss"></style>
