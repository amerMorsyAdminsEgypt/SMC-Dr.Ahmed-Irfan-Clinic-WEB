<template>
  <!-- <div class="small"> -->
  <div class="">
    <!-- <vue-cal style="height: 250px" /> -->
    <vue-cal
      id="vuecal"
      :events="events"
      selected-date="2022-06-19"
      :time-from="0 * 60"
      :time-to="24 * 60"
      :time-step="30"
      :hide-weekends="false"
      events-count-on-year-view
      :events-on-month-view="true"
      :dbl-click-to-navigate="false"
      :hide-view-selector="false"
      :time-cell-height="timeCellHeight"
      locale="en"
      active-view="month"
      :min-event-width="minEventWidth"
      :on-event-click="echo"
    >
      <!-- :on-event-click="counter++;echo();" -->
      <!-- :editable-events="{ title: true, drag: true, resize: true, delete: true, create: true }" -->
      <!-- :time-from="9 * 60" -->
      <!-- :time-to="19 * 60" -->
      <!-- locale="zh-cn" -->
      <!-- style="height: 90vh" -->
      <!-- events-on-month-view="short" -->
      <!-- :time="false" -->

      <!-- <template v-slot:cell-content="{ cell, view, goNarrower, events }">
        <div class="vuecal__cell-date" :class="view.id" @click="goNarrower">
          <span class="clickable">{{ cell.content }}</span>
        </div>
        <span
          class="vuecal__cell-events-count"
          v-if="view.id === 'month' &amp;&amp; events.length"
          >{{ events.length }}</span
        >
        <span
          class="vuecal__no-event"
          v-if="['week', 'day'].includes(view.id) &amp;&amp; !events.length"
          >Nothing here 👌</span
        >
      </template> -->
      <!-- <span slot="title">👌 {{ title }} 👌</span> -->
      <!-- <template v-slot:title="{ title }">👌 {{ title }} 👌</template>-->
      <template v-slot:no-event>No event 👌</template>
      <template v-slot:title="{ title, view }">
        👌 {{ title }} 👌 {{ view.startDate.getFullYear() }}-{{
          (view.startDate.getMonth() + 1) | addZero
        }}{{ view.startDate.getMonth() + 1 }}
        <span v-if="view.id === 'day'"
          >-{{ view.startDate.getDate() | addZero
          }}{{ view.startDate.getDate() }}</span
        >
      </template>
      <template v-slot:time-cell="{ hours, minutes }">
        <div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }">
          <strong v-if="!minutes" style="font-size: 15px"
            >{{ hours | addZero }}{{ hours }}</strong
          >
          <span v-else style="font-size: 11px"
            >{{ minutes | addZero }}{{ minutes }}</span
          >
        </div>
      </template>
      <template v-slot:event="{ event }">
        <div class="vuecal__event-title" v-html="event.title"></div>
        <hr />
        <span class="vuecal__event-time"
          ><strong>Event start:</strong
          ><span>{{ event.start.formatTime() }}</span
          ><br /><strong>Event end:</strong
          ><span>{{ event.end.formatTime() }}</span></span
        >
      </template>
      <!-- <template v-slot:event="{ event, view }">
        <div class="boxevent">
          <div class="vuecal__event-title" v-if="view === 'month'">
            {{ event.title }}
          </div>
          <div class="vuecal__event-title" v-else-if="view === 'week'">
            {{ event.title }}
          </div>
          <span v-else>{{ event.title }}{{ view }}</span>
        </div>
      </template> -->
      <!-- <template v-slot:split-label="{ split, view }">
        <i class="icon material-icons">person</i>
        <strong :style="`color: ${split.color}`">{{ split.label }}</strong>
      </template> -->
      <template v-slot:arrow-prev>◀</template>
      <template v-slot:arrow-next>▶</template>
    </vue-cal>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/ar.js";

export default {
  name: "Test",
  components: {
    VueCal,
  },
  data() {
    return {
      counter: 0,
      minEventWidth: 0,
      timeCellHeight: 40,
      now: new Date(),
      events: [
        {
          start: "2022-06-19 10:35",
          end: "2022-06-19 11:30",
          title: "Doctor appointment",
        },
        {
          start: "2022-06-19 10:00",
          end: "2022-06-19 11:00",
          title: "Doctor appointment",
        },
        {
          start: "2022-06-19 18:30",
          end: "2022-06-19 19:15",
          title: "Dentist appointment",
        },
        {
          start: "2022-06-20 18:30",
          end: "2022-06-20 20:30",
          title: "Crossfit",
        },
        {
          start: "2022-06-21 11:00",
          end: "2022-06-21 13:00",
          title: "Brunch with Jane",
        },
        {
          start: "2022-06-21 19:30",
          end: "2022-06-21 23:00",
          title: "Swimming lesson",
        },
        {
          start: "2023-07-30 19:30",
          end: "2023-07-30 23:00",
          title: "Swimming lesson",
        },
        {
          start: "2022-06-19 12:00",
          end: "2022-06-19 14:00",
          title: "LUNCH",
          content: "<i class='fa fa-angle-down' aria-hidden='true'></i>",
          class: "lunch",
          background: true,
        },
        {
          start: "2022-06-20 12:00",
          end: "2022-06-20 14:00",
          title: "LUNCH",
          class: "lunch",
          background: true,
        },
      ],
    };
  },
  filters: {
    addZero(val) {
      return val < 10 ? "0" : "";
    },
  },
  methods: {
    echo(event, e) {
      console.log(event);
      e.stopPropagation();
    },
    scrollToCurrentTime() {
      const calendar = document.querySelector("#vuecal .vuecal__bg");
      const hours = this.now.getHours() + this.now.getMinutes() / 60;
      calendar.scrollTo({
        top: hours * this.timeCellHeight,
        behavior: "smooth",
      });
    },
  },
  // mounted() {},
  // watch: {},
  // async created() {},
};
</script>

<style lang="scss">
.small {
  max-width: 600px;
  margin: 0px auto;
}
</style>
