<template>
  <div class="countdown">
    {{$store.getters.daysBeforeApplication}} days
    <br />before application
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "countdown",
  data() {
    return {
      moment: moment
    };
  },
  computed: {},
  methods: {}
};
</script>
<style>
.countdown {
  padding-top: 25px;
  padding-bottom: 25px;
  /* margin-top: 25px; */
  margin-bottom: 25px;
  border-radius: 4px;
  border: 1px solid grey;
  font-size: 2em;
  text-align: center;
}
</style>
