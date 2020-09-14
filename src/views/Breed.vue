<template>
  <Grid
    :items="breeds"
    :loading="loading"
    @select-item="selectItem"
  />
</template>

<script>
import PageMixin from '@/assets/js/page-mixin';

export default {
  name: 'Breed',
  mixins: [PageMixin],
};
</script>
