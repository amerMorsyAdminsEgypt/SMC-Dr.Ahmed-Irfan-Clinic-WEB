<template>
  <b-modal
    id="AddictiveStuffClientInfo"
    scrollable
    size="lg"
    centered
    hide-footer
  >
    <template #modal-title>
      <h3>
        <img src="@/assets/images/historicalPlans.svg" class="icon-lg" />
        {{ title }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-md-12'"
        :value="addictiveStuffClientData.addictiveStuffClientNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="addictiveStuffClientData.InjuryDetailsCurrent"
        :title="details"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="addictiveStuffClientData.recoveryNotes"
        :title="$t('addictiveStuffs.recoveryNotes')"
        :imgName="'notes.svg'"
      />
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang } from "@/utils/functions";
import { ADDICTIVESTUFFS_TYPE_TOKENS } from "@/utils/constantLists";
export default {
  name: "AddictiveStuffClientInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      addictiveStuffTypeToken: ADDICTIVESTUFFS_TYPE_TOKENS,
    };
  },
  props: ["addictiveStuffClientData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
  },
  computed: {
    title() {
      if (
        this.addictiveStuffClientData.addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.habits.data");
      } else {
        return this.$t("addictiveStuffs.chronicDiseases.data");
      }
    },
    details() {
      if (
        this.addictiveStuffClientData.addictiveStuffTypeToken ==
        this.addictiveStuffTypeToken.Habits
      ) {
        return this.$t("addictiveStuffs.injuryHabit.details");
      } else {
        return this.$t("addictiveStuffs.injury.details");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
