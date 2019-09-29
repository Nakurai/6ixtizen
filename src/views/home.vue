<template>
  <div class="home">
    <div>
      <p>
        <label for="dateFirstEntry">
          Date of first entry in Canada:
          <br />
          <input id="dateFirstEntry" v-model="dateFirstEntry" type="date" placeholder="YYYY-MM-DD" />
        </label>
        <br />
        <label for="datePr">
          Date you became PR:
          <br />
          <input id="datePr" v-model="datePr" type="date" placeholder="YYYY-MM-DD" />
        </label>
      </p>
    </div>
    <div>
      <p>{{$store.getters.daysBeforeApplication}} days</p>
    </div>
    <div>
      <p>All your trips abroad since your date of entry ({{dateFirstEntry}})</p>
      <ul>
        <li :key="t.id" v-for="t in tripsAfterPr">{{displayTrip(t)}}</li>
      </ul>
      <ul>
        <li :key="t.id" v-for="t in tripsBeforePr">{{displayTrip(t)}}</li>
      </ul>
      <form @submit="addNewTrip">
        <label for="newTripFrom">
          from
          <input id="newTripFrom" v-model="newTrip.from" type="date" placeholder="YYYY-MM-DD" />
        </label>
        <label for="newTripTo">
          to
          <input id="newTripTo" v-model="newTrip.to" type="date" placeholder="YYYY-MM-DD" />
        </label>
        <br />
        <input type="submit" value="add a trip" />
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// @ is an alias to /src

// entry date: 2016 12 28
// PR date: 2019 01 14
// trips:

export default {
  name: "home",
  components: {},
  data() {
    return {
      trips: this.$store.state.trips,
      newTrip: {
        from: null,
        to: null
      }
    };
  },
  computed: {
    datePr: {
      get() {
        return this.$store.state.datePr;
      },
      set(value) {
        this.$store.dispatch("changeStore", { datePr: value });
      }
    },
    dateFirstEntry: {
      get() {
        return this.$store.state.dateFirstEntry;
      },
      set(value) {
        this.$store.dispatch("changeStore", { dateFirstEntry: value });
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
    addNewTrip(event) {
      event.preventDefault();
      if (this.newTrip.from < this.newTrip.to) {
        this.trips.push({
          from: this.newTrip.from,
          to: this.newTrip.to,
          duration: moment(this.newTrip.to).diff(
            moment(this.newTrip.from),
            "days"
          )
        });
        this.newTrip.from = null;
        this.newTrip.to = null;
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
