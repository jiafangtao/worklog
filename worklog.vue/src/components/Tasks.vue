<template>
    <div class="tasks">
        <TaskItem />
        <TaskItem />
        <TaskItem />
    </div>
</template>

<script setup lang="ts">

    import TaskItem from "./TaskItem.vue";

    const name: String = 'Tasks';
    function foo() {
        // Your component's methods go here
    }

    function mounted() {
        // Code to run when the component is mounted goes here
    }

</script>

<style scoped>
/* Your component's styles go here */

div.tasks {
    border-radius: 5px;
    border-style: solid;
    padding: 5px 5px;
}

</style>