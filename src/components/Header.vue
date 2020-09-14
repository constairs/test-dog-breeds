<template>
  <header class="header">
    <NavList @change-route="onSelectBreed(null)" />
    <select
      name="breed-select"
      id="breed-select"
      class="breed-select"
      :value="selectedBreed"
      @change="onSelectBreed($event.target.value, { resetToHome: true })"
    >
      <option
        v-for="(breed, idx) in options"
        :key="breed"
        :value="idx === 0 ? null : breed">
        {{ breed }}
      </option>
    </select>
    <button
      type="button"
      class="reset-button"
      :disabled="!selectedBreed"
      @click="onSelectBreed(null, { resetToHome: true })">
      Reset selection
    </button>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import NavList from '@/components/NavList.vue';

export default {
  name: 'Header',
  components: {
    NavList,
  },
  computed: {
    ...mapState(['breedsOptions', 'selectedBreed']),
    options() {
      return (['Select breed', ...this.breedsOptions]);
    },
  },
  methods: {
    onSelectBreed(value, { resetToHome } = { resetToHome: false }) {
      this.$store.dispatch('setBreed', value);
      if (value) {
        this.$router.push(`/breed/${value}`);
      }
      if (resetToHome && !value) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
}

.breed-select {
  height: 2rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  padding-left: 0.5rem;
}

.reset-button {
  height: 2rem;
  border-radius: 0.25rem;
  background-color: lightseagreen;
  border: none;
  color: #ffffff;

  &:disabled {
    background-color: #ccc;
    color: #999;
  }
}
</style>
