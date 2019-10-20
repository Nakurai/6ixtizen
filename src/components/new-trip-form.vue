<template>
  <form name="newTrip" @submit="saveTrip" class="flex-center">
    Pick start and end date:
    <v-date-picker mode="range" is-inline v-model="newTrip.dates" />
    <br />
    <label for>
      Enter any location:
      <br />
      <input type="text" placeholder="ex: france" v-model="newTrip.location" />
    </label>
    <br />
    <br />
    <div class="row at-row no-gutter flex-center">
      <div class="col-sm-6" style="width: 50%;">
        <at-button style="width: 100%;" size="large" @click="saveTrip">Save</at-button>
      </div>
      <div class="col-sm-6" style="width: 50%;">
        <at-button style="width: 100%;" size="large" @click="$emit('cancel')">Cancel</at-button>
      </div>
    </div>
  </form>
</template>

<script>
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
        this.newTrip.location &&
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
<style>
</style>
