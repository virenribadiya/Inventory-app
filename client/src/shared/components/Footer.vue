<template>
    <v-app-bar v-if="layoutRole === 'Admin'" location="bottom" height="auto" :elevation="2">
        <v-footer class="bg-blue-darken-2 text-center d-flex flex-column">
            Footer Works!!
        </v-footer>
    </v-app-bar>
    <v-footer v-if="layoutRole==='User'" class="bg-blue-darken-2 text-center d-flex flex-column">
        Footer Works!!
    </v-footer>
</template>

<script setup>
const props = defineProps({
    layoutRole: {
        type: String,
        required: true
    },
})
</script>

<style scoped></style>