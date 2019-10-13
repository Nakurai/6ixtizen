<template>
  <form name="newTrip" @submit="saveTrip">
    Range date:
    <v-date-picker mode="range" is-inline v-model="newTrip.dates" />
    <label for>
      Location:
      <br />
      <input type="text" placeholder="ex: france" v-model="newTrip.location" />
    </label>
    <br />
    <input type="submit" value="Save" />
    <button @click="$emit('cancel')">Cancel</button>
  </form>
</template>

<script>
// import moment from "moment";
// @ is an alias to /src

export default {
  name: "new-trip",
  components: {},
  data() {
    return {
      newTrip: {
        dates: {
          start: new Date(),
          end: new Date()
        },
        location: null
      }
    };
  },
  computed: {},
  methods: {
    saveTrip(event) {
      event.preventDefault();
      if (
        this.newTrip.dates.start &&
        this.newTrip.dates.end &&
        this.newTrip.dates.start <= this.newTrip.dates.end
      ) {
        this.$emit("input", this.newTrip);
        this.resetForm();
      }
    },
    resetForm() {
      this.newTrip = {
        dates: {
          start: new Date(),
          end: new Date()
        },
        location: null
      };
    }
  }
};
</script>
