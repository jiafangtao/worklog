import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Task } from '@/types'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const todoTasks = computed(() => tasks.value.filter((t) => t.status === 'todo'))
  const inProgressTasks = computed(() => tasks.value.filter((t) => t.status === 'in-progress'))
  const doneTasks = computed(() => tasks.value.filter((t) => t.status === 'done'))

  const todayCompleted = computed(() => {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    return doneTasks.value.filter(
      (t) => t.completedAt && new Date(t.completedAt) >= todayStart
    )
  })

  function addTask(title: string, description: string) {
    tasks.value.push({
      id: crypto.randomUUID(),
      title,
      description,
      status: 'todo',
      createdAt: new Date().toISOString()
    })
  }

  function updateTask(id: string, updates: Partial<Pick<Task, 'title' | 'description'>>) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) Object.assign(task, updates)
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function completeTask(id: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = 'done'
      task.completedAt = new Date().toISOString()
    }
  }

  function setInProgress(id: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = 'in-progress'
      task.completedAt = undefined
    }
  }

  function reopen(id: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.status = 'todo'
      task.completedAt = undefined
    }
  }

  function getTask(id: string) {
    return tasks.value.find((t) => t.id === id)
  }

  return {
    tasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    todayCompleted,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    setInProgress,
    reopen,
    getTask
  }
}, { persist: true })
