<template>
  <div class="navbar">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const Navbar = {
  name: 'Navbar'
  // Your component's properties, methods, etc. go here
}

//export { Navbar }
</script>

<style scoped>
div.navbar {
  float: left;
  position: fixed;
  left: 0;
  top: 0;
  min-height: 50px;
}

nav {
  float: right;
}
</style>
