<template>
  <div>
    <div class="row">
      <div class="col-sm-6 col-lg-4">
        <EmployeesStatistics
          :employeesStatistics="generalStatisticsData.employeesStatistics"
        />
      </div>

      <div class="col-sm-6 col-lg-4">
        <ClientsStatistics
          :clientsStatistics="generalStatisticsData.clientsStatistics"
        />
      </div>

      <div class="col-sm-6 col-lg-4">
        <TreasuriesStatistics
          :treasuriesStatistics="generalStatisticsData.treasuriesStatistics"
        />
      </div>

      <div class="col-sm-6 col-lg-4">
        <NewsStatistics
          :newsStatistics="generalStatisticsData.newsStatistics"
        />
      </div>

      <div class="col-sm-6 col-lg-4">
        <OffersStatistics
          :offersStatistics="generalStatisticsData.offersStatistics"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EmployeesStatistics from "@/components/statistics/generalStatistics/EmployeesStatistics.vue";
import ClientsStatistics from "@/components/statistics/generalStatistics/ClientsStatistics.vue";
import TreasuriesStatistics from "@/components/statistics/generalStatistics/TreasuriesStatistics.vue";
import NewsStatistics from "@/components/statistics/generalStatistics/NewsStatistics.vue";
import OffersStatistics from "@/components/statistics/generalStatistics/OffersStatistics.vue";

export default {
  name: "GeneralStatistics",
  props: ["generalStatisticsData"],
  components: {
    EmployeesStatistics,
    ClientsStatistics,
    TreasuriesStatistics,
    NewsStatistics,
    OffersStatistics,
  },
};
</script>
