<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <TextArea
            :className="'col-md-12'"
            :id="'moveSlidesNote'"
            :value="sliceData.moveSlidesNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="sliceData.moveSlidesNote = $event"
          />

          <div class="form-label-group col-md-12">
            <input
              type="checkbox"
              id="activationStatus"
              v-model="sliceData.activationStatus"
              class="checkbox"
            />
            <label class="mt-1" for="activationStatus">
              {{ $t("activateSlice") }}
            </label>
          </div>
        </div>
      </div>

      <div
        class="my-card"
        v-for="(slice, index) in sliceData.employeesMoveSlidesDetailsData"
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
            :className="'col-md-6 col-lg-4'"
            :value="
              index == 0
                ? slice.moveSlidDetailsFrom
                : sliceData.employeesMoveSlidesDetailsData[index - 1]
                    .moveSlidDetailsTo
            "
            :title="$t('sliceStart')"
            :imgName="'kilometer.svg'"
          />
          <!-- <div class="form-label-group col-md-6 col-lg-4">
            <input
              :name="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsFrom]`"
              :id="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsFrom]`"
              type="text"
              v-model="slice.moveSlidDetailsFrom"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label
              :for="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsFrom]`"
              >{{ $t("sliceStart") }}</label
            >
            <img src="@/assets/images/kilometer.svg" />
          </div> -->
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              :name="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsTo]`"
              :id="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsTo]`"
              type="text"
              v-model="slice.moveSlidDetailsTo"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label
              :for="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsTo]`"
              >{{ $t("sliceEnd") }}</label
            >
            <img src="@/assets/images/kilometer2.svg" />
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              :name="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsPrice]`"
              :id="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsPrice]`"
              type="text"
              v-model="slice.moveSlidDetailsPrice"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label
              :for="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsPrice]`"
              >{{ $t("slicePrice") }}</label
            >
            <img src="@/assets/images/money.svg" />
          </div>
          <TextArea
            :className="'col-md-6 col-lg-12'"
            :id="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsNote]`"
            :value="slice.moveSlidDetailsNote"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="slice.moveSlidDetailsNote = $event"
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

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateEmployeesMoveSlides"
        >
          {{ submitName }}
        </button>
        <router-link
          :to="'/employee-slices/' + this.sliceData.employeeToken"
          class="btn btn-cancel"
        >
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "EmployeesSliceForm",
  components: {
    DataLabelGroup,
    TextArea,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["sliceData", "submitName"],
  methods: {
    addSlice() {
      this.sliceData.employeesMoveSlidesDetailsData.push({
        moveSlidDetailsFrom: "",
        moveSlidDetailsTo: "",
        moveSlidDetailsPrice: "",
        moveSlidDetailsNote: "",
      });
    },
    removeSlice(index) {
      this.sliceData.employeesMoveSlidesDetailsData.splice(index, 1);
    },
    async addOrUpdateEmployeesMoveSlides() {
      this.$emit("addOrUpdateEmployeesMoveSlides");
    },
  },
};
</script>

<style scoped lang="scss"></style>
