<template>
  <div v-if="jobsData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("nameAr") }}</th>
            <th>{{ $t("nameEn") }}</th>
            <th>{{ $t("notes") }}</th>
            <th>{{ $t("sectorName") }}</th>
            <th>{{ $t("edit") }}</th>
            <th>{{ $t("delete") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(job, index) in jobsData" :key="job.jobToken">
            <td>{{ ++index }}</td>
            <td>{{ job.jobNameAr }}</td>
            <td>{{ job.jobNameEn }}</td>
            <td>
              {{ job.jobNotes ? job.jobNotes : $t("notFound") }}
            </td>
            <td>
              {{ job.sectorNameCurrent }}
            </td>
            <td>
              <router-link
                :to="`/edit-job/${job.jobToken}`"
                :title="$t('edit')"
              >
                <img src="@/assets/images/pencil.svg" class="icon-lg" />
              </router-link>
            </td>
            <td>
              <button
                v-b-modal.JobDelete
                class="btn p-0"
                :title="$t('delete')"
                @click="setJobData(job)"
              >
                <img src="@/assets/images/trash.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobsTable",
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["jobsData", "jobData"],
  methods: {
    setJobData(jobData) {
      this.$emit("setJobData", jobData);
    },
    timeE2A(time) {
      if (time.indexOf("AM") > -1) return time.replace("AM", "ص");
      else if (time.indexOf("PM") > -1) return time.replace("PM", "م");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
