<template>
    <div id="google-btn" class="mb-4 mt-5"></div>
</template>

<script setup>
import router from '@/router';
import { authService } from '@/services/authService';
import { onMounted } from 'vue';

const signInWithGoogle = async (resp) => {
    const credential = resp.credential;
    if (credential) {
        const googleUserData = JSON.parse(atob(credential.split(".")[1]));
        if (googleUserData.email_verified === true) {
            try {
                const data = await authService.signInWithGoogle(googleUserData);
                if (data.role === "Admin") {
                    return router.push({ name: "Dashboard" });
                } else {
                    return router.push({ name: "LandingPage" });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("email is not verified by google!");
        }
    } else {
        console.log("Error with google sign in!", resp);
    }
}

onMounted(() => {
    google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (resp) => {
            signInWithGoogle(resp);
        }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: "filled_blue",
        size: "large",
        shape: "rectangle",
        auto_select: false,
        width: 310,
    });
});

</script>

<style lang="scss" scoped></style>