<template>
  <button
    v-show="show"
    class="scroll-to-top"
    @click="scrollToTop">
    To top
  </button>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  name: 'ToTopButton',
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.debouncedHandler);
  },
  destroyed() {
    window.addEventListener('scroll', this.debouncedHandler);
  },
  computed: {
    debouncedHandler() {
      return debounce(this.showToTopBtn, 300);
    },
  },
  methods: {
    showToTopBtn() {
      this.show = document.documentElement.scrollTop > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="scss">
.scroll-to-top {
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  background-color: lightseagreen;
  border: none;
  color: #ffffff;
  font-weight: bold;
}
</style>
