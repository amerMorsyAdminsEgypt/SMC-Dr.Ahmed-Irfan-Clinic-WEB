<template>
  <div class="">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-12">
            <b-form-select
              v-model="jobData.sectorToken"
              :options="sectorTokenOptions"
              class="form-control"
            ></b-form-select>
            <img src="@/assets/images/sectors.svg" />
          </div>

          <div class="form-label-group col-md-6">
            <input
              name="jobNameAr"
              id="jobNameAr"
              type="text"
              v-model="jobData.jobNameAr"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="jobNameAr">{{ $t("jobNameAr") }}</label>
            <img src="@/assets/images/jobs.svg" />
          </div>
          <div class="form-label-group col-md-6">
            <input
              name="jobNameEn"
              id="jobNameEn"
              type="text"
              v-model="jobData.jobNameEn"
              class="form-control"
              placeholder=" "
              maxlength="50"
            />
            <label for="jobNameEn">{{ $t("jobNameEn") }}</label>
            <img src="@/assets/images/jobs.svg" />
          </div>
          <TextArea
            :className="'col-md-12'"
            :id="'jobNotes'"
            :value="jobData.jobNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
            v-on:changeValue="jobData.jobNotes = $event"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="addOrUpdateJob"
        >
          {{ submitName }}
        </button>
        <router-link to="/jobs" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { STATUS } from "@/utils/constants";
import axios from "axios";
import TextArea from "@/components/general/TextArea.vue";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "JobForm",
  mixins: [createToastMixin],
  components: {
    TextArea,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken,
      sectorTokenOptions: [],
    };
  },
  props: ["jobData", "submitName"],
  methods: {
    async getDialogOfSectors() {
      this.isLoading = true;
      this.sectorTokenOptions = [];
      this.sectorTokenOptions.push({
        value: "",
        text: this.$t("selectSector"),
      });
      try {
        const response = await axios.get(
          `/Sectors/GetDialogOfSectors?language=${this.language}&userAuthorizeToken=${this.userAuthorizeToken}`
        );
        const itemsData = response.data.itemsData;
        if (response.data.status == STATUS.SUCCESS) {
          for (let item in itemsData) {
            this.sectorTokenOptions.push({
              value: itemsData[item]["itemToken"],
              text:
                this.language == "en"
                  ? itemsData[item]["itemNameEn"]
                  : itemsData[item]["itemNameAr"],
            });
          }
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        }
        this.isLoading = false;
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
        this.sectorTokenOptions = null;
      }
      this.isLoading = false;
    },
    async addOrUpdateJob() {
      this.$emit("addOrUpdateJob");
    },
  },
  async created() {
    this.getDialogOfSectors();
  },
};
</script>

<style scoped lang="scss"></style>
