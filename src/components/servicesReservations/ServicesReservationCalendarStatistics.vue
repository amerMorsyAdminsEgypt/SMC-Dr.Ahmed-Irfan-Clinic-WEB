<template>
  <div class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th class="pending">
            {{ $t("ReservationStatus.pending") }}: ({{
              reservationsStatistics.pending
            }})
          </th>
          <th class="current">
            {{ $t("ReservationStatus.current") }}: ({{
              reservationsStatistics.current
            }})
          </th>
          <th class="attended">
            {{ $t("ReservationStatus.attended") }}: ({{
              reservationsStatistics.attended
            }})
          </th>
          <th class="entered">
            {{ $t("ReservationStatus.entered") }}: ({{
              reservationsStatistics.entered
            }})
          </th>
          <th class="waitingReEntry">
            {{ $t("ReservationStatus.waitingReEntry") }}: ({{
              reservationsStatistics.waitingReEntry
            }})
          </th>
          <th class="finished">
            {{ $t("ReservationStatus.finished") }}: ({{
              reservationsStatistics.finished
            }})
          </th>
          <th class="waitingApprovalCancel">
            {{ $t("ReservationStatus.waitingApprovalCancel") }}: ({{
              reservationsStatistics.waitingApprovalCancel
            }})
          </th>
          <!-- <th class="canceledBeforeApproval">{{ $t("ReservationStatus.canceledBeforeApproval") }}: ({{ reservationsStatistics.canceledBeforeApproval }})</th>
          <th class="canceledAfterApproval">{{ $t("ReservationStatus.canceledAfterApproval") }}: ({{ reservationsStatistics.canceledAfterApproval }})</th> -->
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: "ServicesReservationCalendarStatistics",
  props: {
    reservationsStatistics: {
      type: Object,
    },
  },
};
</script>
