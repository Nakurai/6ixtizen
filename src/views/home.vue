<template>
  <div class="home">
    <countdown />
    <initDate v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry" />
    <div v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry">
      <br />
      <tripTimeline />

      <at-modal v-model="showNewTripModal" :showFooter="false" width="300">
        <newTrip v-show="showNewTripModal" @cancel="toggleNewTripModal" @input="addNewTrip"></newTrip>
      </at-modal>

      <fab @click.native="toggleNewTripModal" :ripple-show="false"></fab>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import fab from "vue-fab";
import newTrip from "@/components/new-trip-form";
import initDate from "@/components/init-date";
import tripTimeline from "@/components/trip-timeline";
import countdown from "@/components/countdown";

export default {
  name: "home",
  components: { fab, newTrip, initDate, tripTimeline, countdown },
  data() {
    return {
      moment: moment,
      showNewTripModal: false
    };
  },
  computed: {
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
    }
  },
  methods: {
    toggleNewTripModal() {
      this.showNewTripModal = !this.showNewTripModal;
    },
    async addNewTrip(trip) {
      try {
        let duration = moment(trip.dates.end).diff(
          moment(trip.dates.start),
          "days"
        );
        if (duration === 0) {
          duration = 1;
        }
        await this.$store.dispatch("addTrip", {
          from: trip.dates.start,
          to: trip.dates.end,
          location: trip.location,
          duration: duration
        });
        this.showNewTripModal = false;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
