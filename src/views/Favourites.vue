<template>
  <Grid :items="favourite" />
</template>

<script>
import { mapState } from 'vuex';
import Grid from '@/components/Grid.vue';

export default {
  name: 'Favourites',
  components: {
    Grid,
  },
  computed: {
    ...mapState(['favourite']),
  },
};
</script>
