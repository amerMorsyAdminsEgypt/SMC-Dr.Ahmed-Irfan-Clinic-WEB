<template>
  <div>
    <div class="row">
      <div class="col-sm-6 col-lg-4">
        <Branches :branches="branchesInformationStatisticsData.branches" />
      </div>

      <div class="col-sm-6 col-lg-4">
        <Buildings :buildings="branchesInformationStatisticsData.buildings" />
      </div>

      <div class="col-sm-6 col-lg-4">
        <Floors :floors="branchesInformationStatisticsData.floors" />
      </div>

      <div class="col-sm-6 col-lg-4">
        <Chambers :chambers="branchesInformationStatisticsData.chambers" />
      </div>

      <div class="col-sm-6 col-lg-4">
        <Offices :offices="branchesInformationStatisticsData.offices" />
      </div>

      <div class="col-sm-6 col-lg-4">
        <OfficesTimes
          :officesTimes="branchesInformationStatisticsData.officesTimes"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Branches from "@/components/statistics/branchesStatistics/Branches.vue";
import Buildings from "@/components/statistics/branchesStatistics/Buildings.vue";
import Floors from "@/components/statistics/branchesStatistics/Floors.vue";
import Chambers from "@/components/statistics/branchesStatistics/Chambers.vue";
import Offices from "@/components/statistics/branchesStatistics/Offices.vue";
import OfficesTimes from "@/components/statistics/branchesStatistics/OfficesTimes.vue";

export default {
  name: "BranchesStatistics",
  props: ["branchesInformationStatisticsData"],
  components: {
    Branches,
    Buildings,
    Floors,
    Chambers,
    Offices,
    OfficesTimes,
  },
};
</script>
