<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <RouterLink to="/" class="brand-link">Worklog</RouterLink>
    </div>
    <div class="navbar-links">
      <RouterLink to="/">Dashboard</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand-link {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.navbar-links a {
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.navbar-links a.router-link-exact-active {
  background: hsla(160, 100%, 37%, 0.15);
  font-weight: 600;
}
</style>
