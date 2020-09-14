<template>
  <div id="app">
    <Header />
    <RouterView />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('getBreedList');
  },
};
</script>

<style lang="scss">
body {
  font-size: 16px;
  font-family: -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  Oxygen-Sans,
  Ubuntu,
  Cantarell,
  "Helvetica Neue",
  sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b2b2b;
  margin: 4rem auto;
  max-width: 1200px;
}
</style>
