import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLogStore } from './logStore'
import { useTaskStore } from './taskStore'

export type TimerMode = 'stopwatch' | 'pomodoro'
export type PomodoroPhase = 'focus' | 'break'

const POMODORO_FOCUS_SEC = 25 * 60
const POMODORO_BREAK_SEC = 5 * 60

export const useTimerStore = defineStore('timer', () => {
  const activeTaskId = ref<string | null>(null)
  const startTime = ref<string | null>(null)
  const elapsedSec = ref(0)
  const isRunning = ref(false)
  const mode = ref<TimerMode>('stopwatch')
  const pomodoroPhase = ref<PomodoroPhase>('focus')

  let intervalId: ReturnType<typeof setInterval> | null = null

  const pomodoroLimit = computed(() =>
    pomodoroPhase.value === 'focus' ? POMODORO_FOCUS_SEC : POMODORO_BREAK_SEC
  )

  const pomodoroRemaining = computed(() =>
    Math.max(0, pomodoroLimit.value - elapsedSec.value)
  )

  const activeTaskTitle = computed(() => {
    if (!activeTaskId.value) return null
    const taskStore = useTaskStore()
    const task = taskStore.getTask(activeTaskId.value)
    return task?.title ?? null
  })

  function tick() {
    if (!isRunning.value) return
    const now = Date.now()
    elapsedSec.value = Math.floor((now - new Date(startTime.value!).getTime()) / 1000)

    if (mode.value === 'pomodoro' && elapsedSec.value >= pomodoroLimit.value) {
      finishPomodoroCycle()
    }
  }

  function startTimer(taskId: string) {
    if (isRunning.value) stop()
    activeTaskId.value = taskId
    startTime.value = new Date().toISOString()
    elapsedSec.value = 0
    isRunning.value = true
    if (mode.value === 'pomodoro') pomodoroPhase.value = 'focus'
    intervalId = setInterval(tick, 1000)

    const taskStore = useTaskStore()
    const task = taskStore.getTask(taskId)
    if (task && task.status === 'todo') {
      taskStore.setInProgress(taskId)
    }
  }

  function pause() {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function resume() {
    if (!activeTaskId.value || !startTime.value) return
    const pausedElapsed = elapsedSec.value
    startTime.value = new Date(Date.now() - pausedElapsed * 1000).toISOString()
    isRunning.value = true
    intervalId = setInterval(tick, 1000)
  }

  function stop() {
    if (activeTaskId.value && startTime.value && elapsedSec.value > 0) {
      const logStore = useLogStore()
      logStore.addEntry({
        taskId: activeTaskId.value,
        startTime: startTime.value,
        endTime: new Date().toISOString(),
        durationSec: elapsedSec.value
      })
    }
    resetState()
  }

  function reset() {
    resetState()
  }

  function resetState() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    activeTaskId.value = null
    startTime.value = null
    elapsedSec.value = 0
    isRunning.value = false
    pomodoroPhase.value = 'focus'
  }

  function setMode(newMode: TimerMode) {
    if (isRunning.value) return
    mode.value = newMode
    pomodoroPhase.value = 'focus'
  }

  function finishPomodoroCycle() {
    if (pomodoroPhase.value === 'focus') {
      if (activeTaskId.value && startTime.value) {
        const logStore = useLogStore()
        logStore.addEntry({
          taskId: activeTaskId.value,
          startTime: startTime.value,
          endTime: new Date().toISOString(),
          durationSec: POMODORO_FOCUS_SEC
        })
      }
      pomodoroPhase.value = 'break'
      startTime.value = new Date().toISOString()
      elapsedSec.value = 0
    } else {
      resetState()
    }
  }

  function hydrateRunningTimer() {
    if (isRunning.value && startTime.value) {
      elapsedSec.value = Math.floor(
        (Date.now() - new Date(startTime.value).getTime()) / 1000
      )
      intervalId = setInterval(tick, 1000)
    }
  }

  return {
    activeTaskId,
    startTime,
    elapsedSec,
    isRunning,
    mode,
    pomodoroPhase,
    pomodoroLimit,
    pomodoroRemaining,
    activeTaskTitle,
    startTimer,
    pause,
    resume,
    stop,
    reset,
    setMode,
    hydrateRunningTimer
  }
}, { persist: true })
