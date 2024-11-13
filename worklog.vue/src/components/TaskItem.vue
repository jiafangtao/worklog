<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <button @click="completeTask">Complete</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Unnamed')
const description = ref('Put description here')

const completeTask = () => {
  alert('Task completes')
}
</script>

<style scoped>
/* Styles specific to this component */
div {
  min-width: 200px;
  max-width: 400px;
  padding-left: 0;
}
</style>
