<template>
  <at-table :columns="columns" :data="tripsToDisplay" stripe></at-table>
</template>

<script>
import moment from "moment";

export default {
  name: "trip-table",
  components: {},
  props: { trips: Array },
  data() {
    return {
      columns: [
        {
          title: "Start",
          key: "from"
        },
        {
          title: "End",
          key: "to"
        },
        {
          title: "Location",
          key: "location"
        }
      ]
    };
  },
  computed: {
    tripsToDisplay() {
      return this.trips.map(t => {
        return {
          from: moment(t.from).format("DD MMM YYYY"),
          to: moment(t.to).format("DD MMM YYYY"),
          location: t.location
        };
      });
    }
  }
};
</script>

<style>
</style>