<template>
    <div class="stat">
        <h1>Daily</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    // total planned time in minutes
    const totalTime = ref(120);

    // time for finished tasks so far
    const achievedTime = ref(90);
    
</script>

<style scoped>
/* Styles specific to this component */

</style>