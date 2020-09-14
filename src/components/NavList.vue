<template>
  <nav>
    <ul
      class="nav-list"
      @click="$emit('change-route')">
      <li>
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink to="/favourites">Favorites</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavLinks',
};
</script>

<style lang="scss">
.nav-list {
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 2rem;

  li {
    margin-right: 1rem;

    a {
      text-decoration: none;
      color: lightseagreen;
    }
  }

  .router-link-exact-active {
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>
