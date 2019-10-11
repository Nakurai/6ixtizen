<template>
  <div id="app">
    <div v-if="isLoading">Loading your data...</div>
    <div v-if="!isLoading && error">{{error}}</div>
    <router-view v-if="!isLoading && !error" />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      isLoading: true,
      error: null
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("loadFromDb");
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<style>
html {
  font-family: "Roboto", sans-serif;
  touch-action: manipulation;
}
</style>
