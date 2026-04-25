<script setup lang="ts">
import Tasks from '@/components/Tasks.vue'
import Clock from '@/components/Clock.vue'
import DailyStat from '@/components/DailyStat.vue'
import WeeklyStat from '@/components/WeeklyStat.vue'
import MonthlyStat from '@/components/MonthlyStat.vue'
</script>

<template>
  <main class="dashboard">
    <section class="column tasks-column">
      <Tasks />
    </section>
    <section class="column right-column">
      <Clock />
      <div class="stats-grid">
        <DailyStat />
        <WeeklyStat />
        <MonthlyStat />
      </div>
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  min-width: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .dashboard {
    flex-direction: row;
  }

  .tasks-column {
    flex: 1 1 55%;
  }

  .right-column {
    flex: 1 1 45%;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
