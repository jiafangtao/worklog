<script setup lang="ts">
import type { Task } from '@/types'
import { useTaskStore } from '@/stores/taskStore'
import { useTimerStore } from '@/stores/timerStore'

const props = defineProps<{ task: Task }>()

const taskStore = useTaskStore()
const timerStore = useTimerStore()

function startTimer() {
  timerStore.startTimer(props.task.id)
}
</script>

<template>
  <div class="task-item" :class="`status-${task.status}`">
    <div class="task-body">
      <span class="task-title">{{ task.title }}</span>
      <span v-if="task.description" class="task-desc">{{ task.description }}</span>
    </div>
    <div class="task-actions">
      <button
        v-if="task.status !== 'done'"
        class="btn btn-sm btn-start"
        title="Start timer"
        @click="startTimer"
      >
        &#9654;
      </button>
      <button
        v-if="task.status !== 'done'"
        class="btn btn-sm btn-complete"
        title="Mark done"
        @click="taskStore.completeTask(task.id)"
      >
        &#10003;
      </button>
      <button
        v-if="task.status === 'done'"
        class="btn btn-sm btn-reopen"
        title="Reopen"
        @click="taskStore.reopen(task.id)"
      >
        &#8634;
      </button>
      <button
        class="btn btn-sm btn-delete"
        title="Delete"
        @click="taskStore.deleteTask(task.id)"
      >
        &#10005;
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.4rem;
  background: var(--color-background);
  border: 1px solid var(--color-border);
}

.task-item.status-in-progress {
  border-left: 3px solid hsla(160, 100%, 37%, 1);
}

.task-item.status-done {
  opacity: 0.55;
}

.task-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.task-title {
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-done .task-title {
  text-decoration: line-through;
}

.task-desc {
  font-size: 0.8rem;
  opacity: 0.65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-actions {
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
}

.btn-sm {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background-soft);
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0;
}

.btn-sm:hover {
  background: var(--color-background-mute);
}

.btn-start:hover {
  color: hsla(160, 100%, 37%, 1);
  border-color: hsla(160, 100%, 37%, 0.5);
}

.btn-complete:hover {
  color: hsla(160, 100%, 37%, 1);
  border-color: hsla(160, 100%, 37%, 0.5);
}

.btn-delete:hover {
  color: hsl(0, 70%, 55%);
  border-color: hsl(0, 70%, 55%, 0.5);
}

.btn-reopen:hover {
  color: hsl(40, 90%, 50%);
  border-color: hsl(40, 90%, 50%, 0.5);
}
</style>
