<template>
  <div class="tripTimeline">
    <at-timeline style="padding: 10px;" v-if="timeline.length!=0">
      <at-timeline-item :key="'timeline'+index" v-for="(t, index) in timeline">
        <div
          v-if="t.id"
          @click="confirmDeleteTrip(t)"
        >{{`${t.duration}d ${t.location ? "in " + t.location : ""}`}}</div>
        <div v-else>{{t}}</div>
      </at-timeline-item>
    </at-timeline>

    <at-modal
      v-model="showDeleteModal"
      title="Delete trip"
      @on-confirm="yesDeleteTrip"
      @on-cancel="noDeleteTrip"
      width="300"
    >
      <p class="trip-item">Do you want to delete this trip?</p>
    </at-modal>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "trip-timeline",
  data() {
    return {
      moment: moment,
      showDeleteModal: false,
      tripToDelete: null
    };
  },
  computed: {
    timeline() {
      if (this.tripsAfterPr.length + this.tripsBeforePr.length === 0) {
        return [
          "No trips taken. Trips affect your application date. Click on the button below to add every trips taken out of Canada since your date of first entry."
        ];
      } else {
        return this.tripsAfterPr
          .concat(["Your PR"])
          .concat(this.tripsBeforePr)
          .concat(["Date of first entry"]);
      }
    },
    datePr: {
      get() {
        return this.$store.state.calendar.datePr;
      },
      set(value) {
        this.$store.dispatch("changeCalendar", { datePr: value });
      }
    },
    dateFirstEntry: {
      get() {
        return this.$store.state.calendar.dateFirstEntry;
      },
      set(value) {
        this.$store.dispatch("changeCalendar", {
          dateFirstEntry: value
        });
      }
    },
    tripsBeforePr() {
      return this.$store.getters.tripsCompareToPr("before");
    },
    tripsAfterPr() {
      return this.$store.getters.tripsCompareToPr("after");
    }
  },
  methods: {
    confirmDeleteTrip(trip) {
      if (trip.id) {
        this.tripToDelete = trip;
        this.showDeleteModal = true;
      }
    },
    async yesDeleteTrip() {
      this.$store.dispatch("deleteTrip", this.tripToDelete);
      this.tripToDelete = null;
      this.showDeleteModal = false;
    },
    noDeleteTrip() {
      this.tripToDelete = null;
      this.showDeleteModal = false;
    }
  }
};
</script>

<style>
.trip-item {
  font-size: 1.5em;
}
</style>
