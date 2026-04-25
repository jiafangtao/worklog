<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskItem from './TaskItem.vue'

const taskStore = useTaskStore()

const newTitle = ref('')
const newDescription = ref('')

function addTask() {
  const title = newTitle.value.trim()
  if (!title) return
  taskStore.addTask(title, newDescription.value.trim())
  newTitle.value = ''
  newDescription.value = ''
}
</script>

<template>
  <div class="tasks-panel">
    <h2>Tasks</h2>

    <form class="add-form" @submit.prevent="addTask">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Task title"
        class="input"
        required
      />
      <input
        v-model="newDescription"
        type="text"
        placeholder="Description (optional)"
        class="input"
      />
      <button type="submit" class="btn btn-primary">Add Task</button>
    </form>

    <div v-if="taskStore.inProgressTasks.length" class="task-group">
      <h3>In Progress</h3>
      <TaskItem
        v-for="task in taskStore.inProgressTasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <div v-if="taskStore.todoTasks.length" class="task-group">
      <h3>To Do</h3>
      <TaskItem
        v-for="task in taskStore.todoTasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <div v-if="taskStore.doneTasks.length" class="task-group">
      <h3>Done</h3>
      <TaskItem
        v-for="task in taskStore.doneTasks"
        :key="task.id"
        :task="task"
      />
    </div>

    <p v-if="!taskStore.tasks.length" class="empty-hint">
      No tasks yet. Add one above to get started.
    </p>
  </div>
</template>

<style scoped>
.tasks-panel {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.25rem;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 0.9rem;
}

.input:focus {
  outline: 2px solid hsla(160, 100%, 37%, 0.5);
  outline-offset: -1px;
}

.btn {
  padding: 0.5rem 1rem;
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

.btn-primary:hover {
  background: hsla(160, 100%, 30%, 1);
}

.task-group {
  margin-bottom: 1rem;
}

.task-group h3 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  opacity: 0.6;
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--color-border);
}

.empty-hint {
  text-align: center;
  opacity: 0.5;
  font-size: 0.9rem;
  padding: 2rem 0;
}
</style>
