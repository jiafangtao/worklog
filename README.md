# worklog

A personal GTD (Get Things Done) app for logging daily work.

## Features

- **Task management** -- create, track, and complete tasks with todo / in-progress / done workflow
- **Stopwatch & Pomodoro timer** -- track time spent on each task with a stopwatch or 25/5 pomodoro cycle
- **Statistics** -- daily, weekly, and monthly summaries with progress bars
- **Offline-first** -- all data stored in the browser's `localStorage`, no server required

## Tech Stack

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Pinia (state management with localStorage persistence)
- Vue Router
- Vite

## How to Run

```bash
cd worklog.vue
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run docker:package  # build Docker image
```
