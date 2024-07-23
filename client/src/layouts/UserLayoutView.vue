<script setup>
import { RouterView } from 'vue-router';
import Navbar from "@/shared/components/Navbar.vue";
import Footer from '@/shared/components/Footer.vue';
</script>

<template>
        <v-layout>
                <Navbar layoutRole="User" />
                <v-main>
                        <RouterView></RouterView>
                </v-main>
        </v-layout>
        <v-layout>
                <Footer layoutRole="User" />
        </v-layout>
</template>

<style scoped></style>
