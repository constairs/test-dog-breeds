<template>
  <div
    class="grid-item"
    :style="{ backgroundImage: `url(${item})` }"
  >
    <button
      class="favourite-btn"
      :class="{ 'active': active }"
      @click="$emit('click-item')"
    >
      <img
        svg-inline
        src="../assets/images/heart.svg"
        alt="add/remove favourite button">
    </button>
  </div>
</template>

<script>

export default {
  name: 'GridItem',
  props: {
    item: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.grid-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background-position: center center;
  background-size: cover;
  min-height: 16rem;

  .favourite-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    background: rgba(0, 0, 0, .33);
    border: none;
    border-radius: 0.25rem;
    opacity: 0;
    transition: all .2s ease-in;

    .svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    &.active {
      .svg {
        fill: #fff;
      }
    }
  }

  &:hover {
    .favourite-btn {
      opacity: 1;
    }
  }
}
</style>
