<script setup>
import { RouterView} from 'vue-router';
import Navbar from "@/shared/components/Navbar.vue";
import Footer from '@/shared/components/Footer.vue';

</script>

<template>
        <v-layout>
                <Navbar layoutRole="Admin" />
                <v-main>
                        <RouterView class="pa-5" style="border: 2px solid red;"></RouterView>
                </v-main>
                <Footer layoutRole="Admin" />
        </v-layout>
</template>

<style scoped></style>
