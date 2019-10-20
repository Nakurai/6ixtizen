<template>
  <div class="flex-center">
    <div class="dt-input">
      <v-date-picker mode="single" v-model="dateFirstEntry">
        <at-button
          size="large"
        >{{dateFirstEntry?"First entry: "+moment(dateFirstEntry).format("Do MMM YYYY"):"Pick your date of first entry"}}</at-button>
      </v-date-picker>
    </div>
    <div class="dt-input">
      <v-date-picker mode="single" v-model="datePr">
        <at-button
          size="large"
        >{{datePr?"PR date: "+moment(datePr).format("Do MMM YYYY"):"Pick the date you became a PR"}}</at-button>
      </v-date-picker>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// @ is an alias to /src

export default {
  name: "init-date",
  components: {},
  data() {
    return {
      moment: moment
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
  methods: {}
};
</script>

<style>
.dt-input {
  margin-bottom: 10px;
}
</style>
