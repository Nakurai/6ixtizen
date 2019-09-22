<template>
  <div class="home">
    <div>
      <p>
        <label for="dateFirstEntry">
          date of first entry:
          <span id="dateFirstEntryString"></span>
          <br />
          <input id="dateFirstEntry" v-model="firstEntryDate" type="date" placeholder="YYYY-MM-DD" />
        </label>
        <br />
        <label for="datePr">
          date you became PR:
          <br />

          <input id="datePr" v-model="prDate" type="date" placeholder="YYYY-MM-DD" />
        </label>
      </p>
    </div>
    <div>
      <p>{{daysBeforeApplication}} days</p>
    </div>
    <div>
      <p>All your trips abroad since your date of entry ({{firstEntryDate}})</p>
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
      prDate: "2019-01-14",
      firstEntryDate: "2016-12-28",
      trips: [
        { id: 0, from: "2015-12-28", to: "2016-01-15", duration: 19 },
        { id: 1, from: "2019-06-16", to: "2019-06-28", duration: 12 }
      ],
      newTrip: {
        from: null,
        to: null
      }
    };
  },
  computed: {
    daysBeforeApplication() {
      if (!this.prDate) {
        return null;
      }
      let today = moment();
      let pr = moment(this.prDate);
      let firstEntry = moment(this.firstEntryDate);
      let daysBetweenFirstEntryAndPr =
        pr.diff(firstEntry, "days") - this.nbDaysAbroadBeforePr;
      // every days spent in Canada after the date of first entry and before becoming a PR is discounted, with a max of 365 days
      let bonusFirstEntryDays =
        daysBetweenFirstEntryAndPr > 365 ? 365 : daysBetweenFirstEntryAndPr;
      let defaultNUmberOfDays = 1096; // three years
      let daysSincePr = today.diff(pr, "days");

      return (
        defaultNUmberOfDays -
        daysSincePr -
        bonusFirstEntryDays +
        this.nbDaysAbroadAfterPr
      );
    },
    tripsBeforePr() {
      return this.tripsCompareToPr("before");
    },
    tripsAfterPr() {
      return this.tripsCompareToPr("after");
    },
    nbDaysAbroadBeforePr() {
      return this.trips
        .map(curr => this.nbTripDaysBeforeAndAfterDate(curr, this.prDate))
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.before,
          0
        );
    },
    nbDaysAbroadAfterPr() {
      return this.trips
        .map(curr => this.nbTripDaysBeforeAndAfterDate(curr, this.prDate))
        .reduce(
          (accumulator, currentValue) => accumulator + currentValue.after,
          0
        );
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
    },
    nbTripDaysBeforeAndAfterDate(trip, limitDate) {
      let from = moment(trip.from);
      let to = moment(trip.to);
      let limit = moment(limitDate);
      if (limit >= to) {
        return { before: to.diff(from, "days"), after: 0 };
      } else if (limit <= from) {
        return { before: 0, after: to.diff(from, "days") };
      } else {
        return {
          before: limit.diff(from, "days"),
          after: to.diff(limit, "days")
        };
      }
    },
    tripsCompareToPr(comparison) {
      let pr = moment(this.prDate);
      return this.trips
        .filter(t => {
          let to = moment(t.to);
          if (
            (pr < to && comparison === "after") ||
            (pr > to && comparison === "before")
          )
            return true;

          return false;
        })
        .sort((trip1, trip2) => {
          return trip1.from <= trip2.from;
        });
    }
  }
};
</script>
