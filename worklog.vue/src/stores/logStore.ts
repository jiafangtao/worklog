import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { TimeEntry } from '@/types'

export const useLogStore = defineStore('logs', () => {
  const entries = ref<TimeEntry[]>([])

  function addEntry(entry: Omit<TimeEntry, 'id'>) {
    entries.value.push({ ...entry, id: crypto.randomUUID() })
  }

  function clearOldEntries(beforeDate: string) {
    entries.value = entries.value.filter((e) => e.endTime >= beforeDate)
  }

  const todayEntries = computed(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    return entries.value.filter((e) => new Date(e.endTime) >= start)
  })

  const thisWeekEntries = computed(() => {
    const now = new Date()
    const day = now.getDay()
    const start = new Date(now)
    start.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
    start.setHours(0, 0, 0, 0)
    return entries.value.filter((e) => new Date(e.endTime) >= start)
  })

  const thisMonthEntries = computed(() => {
    const start = new Date()
    start.setDate(1)
    start.setHours(0, 0, 0, 0)
    return entries.value.filter((e) => new Date(e.endTime) >= start)
  })

  function totalDuration(list: TimeEntry[]) {
    return list.reduce((sum, e) => sum + e.durationSec, 0)
  }

  return {
    entries,
    addEntry,
    clearOldEntries,
    todayEntries,
    thisWeekEntries,
    thisMonthEntries,
    totalDuration
  }
}, { persist: true })
