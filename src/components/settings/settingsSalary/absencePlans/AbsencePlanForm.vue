<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'absencePlansNameAr'"
            :value="absencePlanData.absencePlansNameAr"
            v-on:changeValue="absencePlanData.absencePlansNameAr = $event"
            :title="$t('nameAr')"
            :imgName="'absence-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'absencePlansNameEn'"
            :value="absencePlanData.absencePlansNameEn"
            v-on:changeValue="absencePlanData.absencePlansNameEn = $event"
            :title="$t('nameEn')"
            :imgName="'absence-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'absencePlansNameUnd'"
            :value="absencePlanData.absencePlansNameUnd"
            v-on:changeValue="absencePlanData.absencePlansNameUnd = $event"
            :title="$t('nameUnd')"
            :imgName="'absence-plans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="'absencePlansCode'"
            :value="absencePlanData.absencePlansCode"
            v-on:changeValue="absencePlanData.absencePlansCode = $event"
            :title="$t('absencePlansCode')"
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-12'"
            :id="'absencePlansNote'"
            :value="absencePlanData.absencePlansNote"
            v-on:changeValue="absencePlanData.absencePlansNote = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div v-if="submitName == $t('add')">
        <div
          class="my-card"
          v-for="(
            absencePlan, index
          ) in absencePlanData.absencePlansSlidesDetailsData"
          :key="index"
        >
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
                  ? absencePlan.workShiftsNumberFrom
                  : absencePlanData.absencePlansSlidesDetailsData[index - 1]
                      .workShiftsNumberTo
              "
              :title="$t('workShiftsNumberFrom')"
              :imgName="'number.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`absencePlansSlidesDetailsData[${index}][workShiftsNumberTo]`"
              :value="absencePlan.workShiftsNumberTo"
              :title="$t('workShiftsNumberTo')"
              :imgName="'number.svg'"
              v-on:changeValue="absencePlan.workShiftsNumberTo = $event"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`absencePlansSlidesDetailsData[${index}][priceFactor]`"
              :value="absencePlan.priceFactor"
              :title="$t('priceFactor')"
              :imgName="'money.svg'"
              v-on:changeValue="absencePlan.priceFactor = $event"
            />

            <TextArea
              :className="'col-md-6'"
              :id="`absencePlansSlidesDetailsData[${index}][absencePlansSlidesDetailsNote]`"
              :value="absencePlan.absencePlansSlidesDetailsNote"
              :title="$t('notes')"
              :imgName="'notes.svg'"
              v-on:changeValue="
                absencePlan.absencePlansSlidesDetailsNote = $event
              "
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
          @click.prevent="addOrUpdateAbsencePlan"
        >
          {{ submitName }}
        </button>
        <router-link :to="'/absence-plans/'" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import AbsencePlansSlideDetails from "@/models/settings/settingsSalary/absencePlans/AbsencePlansSlideDetails";

export default {
  name: "EmployeesSliceForm",
  components: {
    DataLabelGroup,
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
    };
  },
  props: ["absencePlanData", "submitName"],
  methods: {
    addSlice() {
      this.absencePlanData.absencePlansSlidesDetailsData.push(
        new AbsencePlansSlideDetails()
      );
    },
    removeSlice(index) {
      this.absencePlanData.absencePlansSlidesDetailsData.splice(index, 1);
    },
    async addOrUpdateAbsencePlan() {
      this.$emit("addOrUpdateAbsencePlan");
    },
  },
  async created() {},
};
</script>

<style scoped lang="scss"></style>
