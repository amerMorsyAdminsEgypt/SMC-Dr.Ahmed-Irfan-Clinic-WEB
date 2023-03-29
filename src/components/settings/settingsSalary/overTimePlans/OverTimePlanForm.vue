<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'overTimePlansNameAr'"
            :value="overTimePlanData.overTimePlansNameAr"
            v-on:changeValue="overTimePlanData.overTimePlansNameAr = $event"
            :title="$t('nameAr')"
            :imgName="'overtime-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'overTimePlansNameEn'"
            :value="overTimePlanData.overTimePlansNameEn"
            v-on:changeValue="overTimePlanData.overTimePlansNameEn = $event"
            :title="$t('nameEn')"
            :imgName="'overtime-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'overTimePlansNameUnd'"
            :value="overTimePlanData.overTimePlansNameUnd"
            v-on:changeValue="overTimePlanData.overTimePlansNameUnd = $event"
            :title="$t('nameUnd')"
            :imgName="'overtime-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'overTimePlansCode'"
            :value="overTimePlanData.overTimePlansCode"
            v-on:changeValue="overTimePlanData.overTimePlansCode = $event"
            :title="$t('overTimePlansCode')"
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'overTimePlansNote'"
            :value="overTimePlanData.overTimePlansNote"
            v-on:changeValue="overTimePlanData.overTimePlansNote = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div v-if="submitName == $t('add')">
        <div
          class="my-card"
          v-for="(
            overTimePlan, index
          ) in overTimePlanData.overTimePlansSlidesDetailsData"
          :key="index"
        >
          <span class="my-card-title">{{ index + 1 }}</span>

          <span class="remove-slice-container" v-if="index != 0">
            <button
              @click="removeSlice(index)"
              type="button"
              class="btn btn-remove-slice"
            >
              ×
            </button>
          </span>
          <div class="row">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                index == 0
                  ? timeToLang(overTimePlan.timeFrom)
                  : timeToLang(
                      overTimePlanData.overTimePlansSlidesDetailsData[index - 1]
                        .timeTo
                    )
              "
              :title="$t('timeFrom')"
              :imgName="'time.svg'"
            />
            <TimePicker
              :className="'col-md-6'"
              :value="overTimePlan.timeTo"
              v-on:changeValue="overTimePlan.timeTo = $event"
              :title="$t('timeTo')"
              :language="language"
            />

            <CustomInput
              :className="'col-md-6'"
              :id="`overTimePlansSlidesDetailsData[${index}][overTimePriceFactor]`"
              :value="overTimePlan.overTimePriceFactor"
              v-on:changeValue="overTimePlan.overTimePriceFactor = $event"
              :title="$t('overTimePriceFactor')"
              :imgName="'number.svg'"
            />

            <div class="form-label-group col-md-6">
              <b-form-select
                v-model="overTimePlan.dayTypeToken"
                :options="dayTypeTokenOptions"
                class="form-control"
              ></b-form-select>
              <img src="@/assets/images/type.svg" />
            </div>

            <TextArea
              :className="'col-md-12'"
              :id="`overTimePlansSlidesDetailsData[${index}][overTimePlansSlidesDetailsNote]`"
              :value="overTimePlan.overTimePlansSlidesDetailsNote"
              v-on:changeValue="
                overTimePlan.overTimePlansSlidesDetailsNote = $event
              "
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </div>
        </div>

        <div class="add-slice-container">
          <button
            @click="addSlice"
            type="button"
            class="btn btn-add-slice"
            :title="$t('addSlice')"
          >
            +
          </button>
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateOverTimePlan"
        >
          {{ submitName }}
        </button>
        <router-link :to="'/overtime-plans/'" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { timeToLang, setDataMultiLang } from "@/utils/functions";
import CustomInput from "@/components/general/CustomInput.vue";
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import TimePicker from "@/components/general/TimePicker.vue";
import TextArea from "@/components/general/TextArea.vue";
import OverTimePlansSlideDetails from "@/models/settings/settingsSalary/overTimePlans/OverTimePlansSlideDetails";

export default {
  name: "EmployeesSliceForm",
  components: {
    CustomInput,
    DataLabelGroup,
    TimePicker,
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
      dayTypeTokenOptions: [],
    };
  },
  props: ["overTimePlanData", "submitName"],
  methods: {
    addSlice() {
      this.overTimePlanData.overTimePlansSlidesDetailsData.push(
        new OverTimePlansSlideDetails()
      );
    },
    removeSlice(index) {
      this.overTimePlanData.overTimePlansSlidesDetailsData.splice(index, 1);
    },
    async addOrUpdateOverTimePlan() {
      this.$emit("addOrUpdateOverTimePlan");
    },
    async getDialogOfDayTypes() {
      this.isLoading = true;
      this.dayTypeTokenOptions = [];
      this.dayTypeTokenOptions.push({
        value: "",
        text: this.$t("selectDayType"),
      });
      let items = this.$store.getters.userData.constantLists.listDayType;
      for (let item in items) {
        this.dayTypeTokenOptions.push({
          value: items[item]["itemToken"],
          text: this.setDataMultiLang(
            this.language,
            items[item]["itemNameAr"],
            items[item]["itemNameEn"]
          ),
        });
      }
      this.isLoading = false;
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  async created() {
    if (this.submitName == this.$t("add")) {
      this.getDialogOfDayTypes();
    }
  },
};
</script>

<style scoped lang="scss"></style>
