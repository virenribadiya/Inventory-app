<script setup>
import router from '@/router';
import { authService } from '@/services/authService';
import SignInWithGoogle from '@/shared/components/SignInWithGoogle.vue';
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';

const visible = ref(false);

const loginFormData = reactive({
    email: "",
    password: ""
})

const rules = {
    email: { required: helpers.withMessage("", required), email: helpers.withMessage("Enter valid email.", email) },
    password: { required: helpers.withMessage("", required) }
}

const v$ = useVuelidate(rules, loginFormData);

const submitLoginForm = async () => {
    const isValidate = await v$.value.$validate();
    if (isValidate) {
        try {
            const data = await authService.doLogin(loginFormData);
            if (data.role === "Admin") {
                return router.push({ name: "Dashboard" });
            } else {
                return router.push({ name: "LandingPage" });
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

        <form>
            <v-card class="mx-auto pa-6 pb-8 mt-5 border" max-width="360" rounded="lg" variant="flat">
                <v-card-title class="pa-0 pb-3 amazon-ember-26">
                    Sign in
                </v-card-title>

                <div class="amazon-ember-13 font-weight-bold pa-1">Email</div>

                <v-text-field v-model="loginFormData.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                    @input="v$.email.$reset" @focus="v$.email.$reset" density="compact" variant="outlined" class="mb-0">
                </v-text-field>

                <div class="amazon-ember-13 font-weight-bold pa-1 d-flex align-center justify-space-between">
                    Password

                    <a class="text-decoration-none font-weight-light" href="#" rel="noopener noreferrer"
                        target="_blank">
                        Forgot password?</a>
                </div>

                <v-text-field v-model="loginFormData.password" @input="v$.password.$reset" @focus="v$.password.$reset"
                    :error-messages="v$.password.$errors.map(e => e.$message)"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" variant="outlined" @click:append-inner="visible = !visible">
                </v-text-field>

                <v-btn @click="submitLoginForm" class="my-2 amazon-ember-13 text-none" color="yellow-darken-1"
                    size="large" density="comfortable" block>
                    Sign in
                </v-btn>

                <SignInWithGoogle></SignInWithGoogle>

                <div class="d-flex align-center justify-between amazon-ember-13 mb-3">
                    <v-divider></v-divider> <span class="mx-2" style="white-space: nowrap; color: grey;">New to
                        FashionFusion?</span> <v-divider></v-divider>
                </div>

                <v-btn class="amazon-ember-13 text-none border" @click="$router.push({ name: 'Signup' })" elevation="0"
                    block>
                    Create your account
                </v-btn>
            </v-card>
        </form>
    </div>



    <!-- <v-divider class="mt-7" :thickness="2"></v-divider> -->
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