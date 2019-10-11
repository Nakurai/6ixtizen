<template>
  <div class="home">
    <div>
      <div>
        <v-date-picker mode="single" v-model="dateFirstEntry">
          <button>{{dateFirstEntry?"First entry: "+moment(dateFirstEntry).format("YYYY-MM-DD"):"Pick your date of first entry"}}</button>
        </v-date-picker>
      </div>
      <div>
        <v-date-picker mode="single" v-model="datePr">
          <button>{{datePr?"PR date: "+moment(datePr).format("YYYY-MM-DD"):"Pick the date you became a PR"}}</button>
        </v-date-picker>
      </div>
    </div>
    <div v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry">
      <p>{{$store.getters.daysBeforeApplication}} days</p>
    </div>
    <div v-if="$store.state.calendar.datePr && $store.state.calendar.dateFirstEntry">
      {{this.showNewTripModal?"true":false}}
      <fab @click.native="toggleNewTripModal" :ripple-show="false"></fab>
      <p>All your trips abroad since your date of first entry ({{moment(dateFirstEntry).format("YYYY-MM-DD")}})</p>
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
import fab from "vue-fab";
// @ is an alias to /src

export default {
  name: "home",
  components: { fab },
  data() {
    return {
      moment: moment,
      showNewTripModal: false,
      newTrip: {
        dates: {
          start: new Date(),
          end: new Date()
        },
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
      console.log("in toggle modal");
      this.showNewTripModal = !this.showNewTripModal;
    },
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
