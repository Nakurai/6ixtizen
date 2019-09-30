<template>
  <div class="home">
    <div>
      <div>
        <label for="dateFirstEntry">
          Date of first entry in Canada
          <input
            id="dateFirstEntry"
            v-model="dateFirstEntry"
            type="date"
            placeholder="YYYY-MM-DD"
          />
        </label>
        <v-calendar />
      </div>
      <div>
        <label for="datePr">
          Date you became PR:
          <br />
          <input id="datePr" v-model="datePr" type="date" placeholder="YYYY-MM-DD" />
        </label>
      </div>
    </div>
    <div v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry">
      <p>{{$store.getters.daysBeforeApplication}} days</p>
    </div>
    <div v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry">
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
        <label for="newTripLocation">
          Location:
          <input
            id="newTripLocation"
            v-model="newTrip.location"
            type="text"
            placeholder="ex: France"
          />
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
      newTrip: {
        from: null,
        to: null,
        location: null
      }
    };
  },
  computed: {
    datePr: {
      get() {
        return this.$store.state.calendar.datePr;
      },
      set(value) {
        this.$store.dispatch("changeStore", { datePr: value });
      }
    },
    dateFirstEntry: {
      get() {
        return this.$store.state.calendar.dateFirstEntry;
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
    async addNewTrip(event) {
      try {
        event.preventDefault();
        if (
          this.newTrip.from &&
          this.newTrip.to &&
          this.newTrip.from < this.newTrip.to
        ) {
          await this.$store.dispatch("addTrip", {
            from: this.newTrip.from,
            to: this.newTrip.to,
            location: this.newTrip.location,
            duration: moment(this.newTrip.to).diff(
              moment(this.newTrip.from),
              "days"
            )
          });
          this.newTrip.from = null;
          this.newTrip.to = null;
          this.newTrip.location = null;
        }
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
