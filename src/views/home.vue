<template>
  <div class="home">
    <initDate></initDate>
    <div v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry">
      <p>{{$store.getters.daysBeforeApplication}} days</p>
    </div>

    <div v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry">
      {{this.showNewTripModal?"true":false}}
      <fab @click.native="toggleNewTripModal" :ripple-show="false"></fab>
      <p>All your trips abroad since your date of first entry ({{moment(dateFirstEntry).format("YYYY Do MM")}})</p>
      <!-- <ul>
        <li :key="t.id" v-for="t in tripsAfterPr">{{displayTrip(t)}}</li>
      </ul>-->
      <tripTable :trips="tripsAfterPr"></tripTable>
      <!-- <ul>
        <li :key="t.id" v-for="t in tripsBeforePr">{{displayTrip(t)}}</li>
      </ul>-->
      <at-modal v-model="showNewTripModal">
        <newTrip v-show="showNewTripModal" @cancel="toggleNewTripModal" @input="addNewTrip"></newTrip>
        <div slot="footer"></div>
      </at-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import fab from "vue-fab";
import newTrip from "@/components/new-trip-form";
import initDate from "@/components/init-date";
import tripTable from "@/components/trip-table";
// @ is an alias to /src

export default {
  name: "home",
  components: { fab, newTrip, initDate, tripTable },
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
    },
    tripsBeforePr() {
      return this.$store.getters.tripsCompareToPr("before");
    },
    tripsAfterPr() {
      return this.$store.getters.tripsCompareToPr("after");
    }
  },
  methods: {
    toggleNewTripModal() {
      this.showNewTripModal = !this.showNewTripModal;
    },
    async addNewTrip(trip) {
      try {
        await this.$store.dispatch("addTrip", {
          from: trip.dates.start,
          to: trip.dates.end,
          location: trip.location,
          duration: moment(trip.dates.end).diff(
            moment(trip.dates.start),
            "days"
          )
        });
        this.showNewTripModal = false;
      } catch (error) {
        console.error(error);
      }
    },
    displayTrip(t) {
      let formattedFrom = moment(t.from).format("MMM Do YYYY");
      let formattedTo = moment(t.to).format("MMM Do YYYY");
      return `${formattedFrom} -> ${formattedTo} (${t.duration}d)`;
    }
  }
};
</script>
