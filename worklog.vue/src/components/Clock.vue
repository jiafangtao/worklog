<template>
  <div>
    <h1>Focus on {{ title }}</h1>
    <p>A digital or analog clock goes here</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('foo')
</script>

<style scoped>
/* Styles specific to this component */
div {
  min-width: 200px;
  max-width: 400px;
  padding-left: 0;
}
</style>
