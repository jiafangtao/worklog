<script setup lang="ts">
import { computed } from 'vue'
import { useLogStore } from '@/stores/logStore'

const logStore = useLogStore()

const totalSec = computed(() => logStore.totalDuration(logStore.thisWeekEntries))
const sessions = computed(() => logStore.thisWeekEntries.length)

function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

const goalSec = 40 * 3600
const progress = computed(() => Math.min(100, (totalSec.value / goalSec) * 100))
</script>

<template>
  <div class="stat-card">
    <h3>This Week</h3>
    <div class="stat-value">{{ formatDuration(totalSec) }}</div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="stat-meta">
      {{ sessions }} session{{ sessions !== 1 ? 's' : '' }}
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
}

h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
  margin-bottom: 0.35rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.progress-bar {
  height: 6px;
  background: var(--color-background-mute);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: hsla(160, 100%, 37%, 1);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.stat-meta {
  font-size: 0.78rem;
  opacity: 0.55;
}
</style>
