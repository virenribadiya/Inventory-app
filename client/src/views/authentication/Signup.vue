<script setup>
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';
import { authService } from '@/services/authService';
import SignInWithGoogle from '@/shared/components/SignInWithGoogle.vue';
import router from '@/router';

const singupFormData = reactive({
    name: "",
    email: "",
    password: "",
    rePassword: ""
});

const rules = computed(() => {
    return {
        name: { required: helpers.withMessage("", required) },
        email: {
            required: helpers.withMessage("", required),
            email: helpers.withMessage("Enter valid email.", email)
        },
        password: {
            required: helpers.withMessage("", required),
            minLength: helpers.withMessage("Password must be at least 8 characters.", minLength(8))
        },
        rePassword: {
            required: helpers.withMessage("", required),
            sameAs: helpers.withMessage("Password is not same.", sameAs(singupFormData.password))
        }
    }
})

const v$ = useVuelidate(rules, singupFormData);

const submitSignupForm = async () => {
    const isValidate = await v$.value.$validate();
    if (isValidate) {
        try {
            const data = await authService.doRegiter(singupFormData);
            if (data.role === "User") {
                return router.push({ name: "LandingPage" });
            } else {
                return router.push({ name: "Dashboard" });
            }
        } catch (error) {
            console.log(error);
        }
    }
}
</script>

<template>
    <div>
        <div class="d-flex justify-center align-center my-5">
            <v-img class="" max-width="38" src="trolley.png"></v-img>
            <div class="px-4" style="font-size: 31px;">FashionFusion</div>
        </div>

        <v-card class="mx-auto pa-6 pb-8 mt-5 border" max-width="360" rounded="lg" variant="flat">
            <v-card-title class="pa-0 pb-3 amazon-ember-26">
                Create account
            </v-card-title>

            <form ref="form">

                <div class="amazon-ember-13 font-weight-bold pa-1">Your name</div>

                <v-text-field v-model="singupFormData.name" @input="v$.name.$reset" @focus="v$.name.$reset"
                    density="compact" placeholder="First and last name" variant="outlined"
                    :error-messages="v$.name.$errors.map(e => e.$message)"></v-text-field>

                <div class="amazon-ember-13 font-weight-bold pa-1">Email</div>

                <v-text-field v-model="singupFormData.email" @input="v$.email.$reset" @focus="v$.email.$reset"
                    density="compact" variant="outlined"
                    :error-messages="v$.email.$errors.map(e => e.$message)"></v-text-field>

                <div class="amazon-ember-13 font-weight-bold pa-1 d-flex align-center justify-space-between">
                    Password
                </div>

                <v-text-field v-model="singupFormData.password" @input="v$.password.$reset" @focus="v$.password.$reset"
                    type='password' density="compact" placeholder="Atleast 8 characters" variant="outlined"
                    :error-messages="v$.password.$errors.map(e => e.$message)">
                </v-text-field>

                <div class="amazon-ember-13 font-weight-bold pa-1 d-flex align-center justify-space-between">
                    Password again
                </div>

                <v-text-field v-model="singupFormData.rePassword" @input="v$.rePassword.$reset"
                    @focus="v$.rePassword.$reset" type='password' density="compact" variant="outlined"
                    :error-messages="v$.rePassword.$errors.map(e => e.$message)">
                </v-text-field>

                <v-btn @click="submitSignupForm" class="mb-2 mt-4 amazon-ember-13 text-none" color="yellow-darken-1"
                    size="large" density="comfortable" block>
                    Create your account
                </v-btn>

            </form>

            <SignInWithGoogle></SignInWithGoogle>

            <div class="d-flex align-center justify-between amazon-ember-13 mb-3">
                <v-divider></v-divider> <span class="mx-2" style="white-space: nowrap; color: grey;">Already on
                    FashionFusion?</span> <v-divider></v-divider>
            </div>

            <v-btn class="amazon-ember-13 text-none border" @click="$router.push({ name: 'Login' })" elevation="0"
                block>
                Sign in
            </v-btn>

        </v-card>
    </div>
</template>

<style scoped>
.amazon-ember-13 {
    font-size: 13px;
    font-family: 'Amazon Ember Regular';
    color: #111111;
}

.amazon-ember-26 {
    font-size: 26px;
    font-family: 'Amazon Ember Regular';
    color: #111111;
}
</style>