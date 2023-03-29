<template>
  <div class="">
    <form>
      <div
        class="my-card"
        v-for="(slice, index) in employeesMoveSlidesDetailsData"
        :key="index"
      >
        <span class="remove-slice-container">
          <button
            @click="removeSlice(index)"
            type="button"
            class="btn btn-remove-slice"
          >
            ×
          </button>
        </span>
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
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
          </div>
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
          <div class="form-label-group col-md-6 col-lg-12">
            <input
              :name="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsNote]`"
              :id="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsNote]`"
              type="text"
              v-model="slice.moveSlidDetailsNote"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label
              :for="`employeesMoveSlidesDetailsData[${index}][moveSlidDetailsNote]`"
              >{{ $t("notes") }}</label
            >
            <img src="@/assets/images/notes.svg" />
          </div>
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
          @click.prevent="submit"
        >
          {{ $t("add") }}
        </button>
        <router-link to="/employees" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "About",
  data: () => ({
    employeesMoveSlidesDetailsData: [
      {
        moveSlidDetailsFrom: "",
        moveSlidDetailsTo: "",
        moveSlidDetailsPrice: "",
        moveSlidDetailsNote: "",
      },
    ],
  }),
  methods: {
    addSlice() {
      this.employeesMoveSlidesDetailsData.push({
        moveSlidDetailsFrom: "",
        moveSlidDetailsTo: "",
        moveSlidDetailsPrice: "",
        moveSlidDetailsNote: "",
      });
    },
    removeSlice(index) {
      this.employeesMoveSlidesDetailsData.splice(index, 1);
    },

    submit() {
      const data = {
        employeesMoveSlidesDetailsData: this.employeesMoveSlidesDetailsData,
      };
      alert(JSON.stringify(data, null, 2));
    },
  },
};
</script>

<style>
.add-slice-container {
  position: relative;
}
.remove-slice-container {
  position: absolute;
}
.btn-add-slice {
  position: absolute;
  top: -35px;
  left: -7px;
  right: auto;
  background: #007bff !important;
  color: #fff !important;
  border-radius: 50px !important;
  width: 32px;
  height: 32px;
  font-size: 22px !important;
  padding: 0 !important;
}
.btn-remove-slice {
  position: absolute;
  top: -30px;
  left: -30px;
  right: -30px;
  background: #ec192e !important;
  color: #fff !important;
  border-radius: 50px !important;
  width: 32px;
  height: 32px;
  font-size: 22px !important;
  padding: 0 !important;
}
</style>
