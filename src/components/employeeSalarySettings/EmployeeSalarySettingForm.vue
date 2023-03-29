<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6">
            <input
              name="sectorNameAr"
              id="sectorNameAr"
              type="text"
              v-model="sectorData.sectorNameAr"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="sectorNameAr">{{ $t("sectorNameAr") }}</label>
            <img src="@/assets/images/sectors.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <input
              name="sectorNameEn"
              id="sectorNameEn"
              type="text"
              v-model="sectorData.sectorNameEn"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="sectorNameEn">{{ $t("sectorNameEn") }}</label>
            <img src="@/assets/images/sectors.svg" />
          </div>
          <TextArea
            :className="'col-md-12'"
            :id="'sectorNotes'"
            :value="sectorData.sectorNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="sectorData.sectorNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateSector"
        >
          {{ submitName }}
        </button>
        <router-link to="/sectors" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "SectorForm",
  components: {
    TextArea,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["sectorData", "submitName"],
  methods: {
    async addOrUpdateSector() {
      this.$emit("addOrUpdateSector");
    },
  },
};
</script>

<style scoped lang="scss"></style>
