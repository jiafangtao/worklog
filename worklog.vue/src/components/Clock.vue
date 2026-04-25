<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTimerStore } from '@/stores/timerStore'

const timer = useTimerStore()

onMounted(() => {
  timer.hydrateRunningTimer()
})

const display = computed(() => {
  const seconds =
    timer.mode === 'pomodoro' ? timer.pomodoroRemaining : timer.elapsedSec
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
})

const phaseLabel = computed(() => {
  if (timer.mode !== 'pomodoro') return null
  return timer.pomodoroPhase === 'focus' ? 'Focus' : 'Break'
})
</script>

<template>
  <div class="clock-panel">
    <h2>Timer</h2>

    <div class="mode-toggle">
      <button
        :class="{ active: timer.mode === 'stopwatch' }"
        :disabled="timer.isRunning"
        @click="timer.setMode('stopwatch')"
      >
        Stopwatch
      </button>
      <button
        :class="{ active: timer.mode === 'pomodoro' }"
        :disabled="timer.isRunning"
        @click="timer.setMode('pomodoro')"
      >
        Pomodoro
      </button>
    </div>

    <div v-if="timer.activeTaskTitle" class="task-label">
      Working on: <strong>{{ timer.activeTaskTitle }}</strong>
    </div>
    <div v-else class="task-label hint">
      Start a timer from a task's &#9654; button
    </div>

    <div v-if="phaseLabel" class="phase-badge" :class="timer.pomodoroPhase">
      {{ phaseLabel }}
    </div>

    <div class="timer-display">{{ display }}</div>

    <div class="controls">
      <button
        v-if="timer.isRunning"
        class="btn btn-warn"
        @click="timer.pause()"
      >
        Pause
      </button>
      <button
        v-if="!timer.isRunning && timer.activeTaskId && timer.elapsedSec > 0"
        class="btn btn-primary"
        @click="timer.resume()"
      >
        Resume
      </button>
      <button
        v-if="timer.activeTaskId"
        class="btn btn-danger"
        @click="timer.stop()"
      >
        Stop
      </button>
      <button
        v-if="timer.activeTaskId && !timer.isRunning"
        class="btn btn-muted"
        @click="timer.reset()"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<style scoped>
.clock-panel {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.25rem;
  text-align: center;
}

h2 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.mode-toggle {
  display: inline-flex;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.mode-toggle button {
  padding: 0.35rem 0.9rem;
  border: none;
  background: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.85rem;
}

.mode-toggle button.active {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
  font-weight: 600;
}

.mode-toggle button:disabled:not(.active) {
  opacity: 0.4;
  cursor: not-allowed;
}

.task-label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.task-label.hint {
  opacity: 0.5;
  font-size: 0.85rem;
}

.phase-badge {
  display: inline-block;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.75rem;
}

.phase-badge.focus {
  background: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 30%, 1);
}

.phase-badge.break {
  background: hsla(40, 100%, 50%, 0.15);
  color: hsl(40, 80%, 40%);
}

.timer-display {
  font-size: 3rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  margin: 0.5rem 0 1rem;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
}

.btn-primary {
  background: hsla(160, 100%, 37%, 1);
  color: #fff;
}

.btn-warn {
  background: hsl(40, 90%, 50%);
  color: #fff;
}

.btn-danger {
  background: hsl(0, 70%, 55%);
  color: #fff;
}

.btn-muted {
  background: var(--color-background-mute);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn:hover {
  opacity: 0.85;
}
</style>
