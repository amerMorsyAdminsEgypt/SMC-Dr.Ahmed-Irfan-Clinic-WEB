<template>
  <b-modal id="BranchInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/branches.svg" class="icon-lg" />
        {{ $t("branchData") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.establishmentNameCurrent"
        :title="$t('establishmentName')"
        :imgName="'establishment.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchNameAr"
        :title="$t('branchNameAr')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchNameEn"
        :title="$t('branchNameEn')"
        :imgName="'branches.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchNameUnd"
        :title="$t('branchNameUnd')"
        :imgName="'branches.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchAddressAr"
        :title="$t('addressAr')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchAddressEn"
        :title="$t('addressEn')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchAddressUnd"
        :title="$t('addressUnd')"
        :imgName="'address.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchFirstPhoneWithCC"
        :title="$t('phone1')"
        :imgName="'phone.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchSecondPhoneWithCC"
        :title="$t('phone2')"
        :imgName="'phone.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchLandLineWithCC"
        :title="$t('phoneLandline')"
        :imgName="'phone-landline.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="`${branchData.branchLatitude}, ${branchData.branchLongitude}`"
        :title="$t('locationCoordinates')"
        :imgName="'location.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="`${branchData.branchEndLatitude}, ${branchData.branchEndLongitude}`"
        :title="$t('locationCoordinatesNearestPoint')"
        :imgName="'location.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchDistance"
        :title="$t('distance')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="branchData.branchNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";

export default {
  name: "BranchInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["branchData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
};
</script>

<style scoped lang="scss"></style>
