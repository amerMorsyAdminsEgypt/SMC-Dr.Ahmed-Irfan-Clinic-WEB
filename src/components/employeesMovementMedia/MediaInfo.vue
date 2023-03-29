<template>
  <div class="">
    <div class="media-info">
      <img
        v-if="employeesMovementMediaData.mediaTypeToken == 'MET-1'"
        :src="medidaSrc"
        onerror="this.src='https://api-premco-v1.adminssw.com//_DefaultFiles/employee.png'"
        alt="Image"
      />
      <video
        v-if="employeesMovementMediaData.mediaTypeToken == 'MET-2'"
        controls
      >
        <source :src="medidaSrc" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="row mt-2">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeesMovementMediaData.movementMediaNameAr"
        :title="$t('nameAr')"
        :imgName="'media.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeesMovementMediaData.movementMediaNameEn"
        :title="$t('nameEn')"
        :imgName="'media.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeesMovementMediaData.movementMediaDescriptionAr"
        :title="$t('descriptionAr')"
        :imgName="'info.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="employeesMovementMediaData.movementMediaDescriptionEn"
        :title="$t('descriptionEn')"
        :imgName="'info.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          setDataMultiLang(
            language,
            employeesMovementMediaData.addedByUserNameAr,
            employeesMovementMediaData.addedByUserNameEn
          )
        "
        :title="$t('userMakeAction')"
        :imgName="'man.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          setDataMultiLang(
            language,
            employeesMovementMediaData.movementTypeNameAr,
            employeesMovementMediaData.movementTypeNameEn
          )
        "
        :title="$t('movementTypeName')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="employeesMovementMediaData.movementMediaNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </div>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { BASE_URL } from "@/utils/constants";

export default {
  name: "MediaInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeesMovementMediaData"],
  methods: {
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  computed: {
    medidaSrc: function () {
      return BASE_URL + this.employeesMovementMediaData.movementMediaPath;
    },
  },
};
</script>

<style lang="scss">
.media-info {
  text-align: center;
  width: 100%;
  video,
  img {
    max-width: 100% !important;
    max-height: 70vh !important;
  }
}
</style>
