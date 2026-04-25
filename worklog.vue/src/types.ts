export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  createdAt: string
  completedAt?: string
}

export interface TimeEntry {
  id: string
  taskId: string
  startTime: string
  endTime: string
  durationSec: number
}
