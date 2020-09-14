<template>
  <div>
    <div v-if="items.length" class="grid">
      <GridItem
        v-for="a in items"
        :key="`${a.value}${Math.random()}`"
        :item="a.value"
        :active="a.isFavourite"
        @click-item="onClickItem(a)"
      />
    </div>
    <div
      v-if="loading"
      class="preloader"
    >
      Загружаем...
    </div>
    <ToTopButton />
  </div>
</template>

<script>
import GridItem from '@/components/GridItem.vue';
import ToTopButton from '@/components/ToTopButton.vue';

export default {
  name: 'Grid',
  components: {
    GridItem,
    ToTopButton,
  },
  props: {
    items: {
      type: Array,
      default() { return []; },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickItem(item) {
      if (!item.isFavourite) {
        const breedItem = {
          ...item,
          isFavourite: true,
        };
        this.$store.dispatch('addBreedToFavourite', breedItem);
        this.$emit('select-item', breedItem);
      } else {
        this.$store.dispatch('removeBreedFromFavourite', item.value);
        this.$emit('select-item', {
          ...item,
          isFavourite: false,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;

  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 556px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
